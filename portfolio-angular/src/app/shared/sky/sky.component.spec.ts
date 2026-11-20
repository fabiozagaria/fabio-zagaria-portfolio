import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from '../../core/theme.service';
import { SkyEngineFactory, type SkyEngine } from './sky-engine';
import { SkyComponent } from './sky.component';

@Component({
  standalone: true,
  imports: [SkyComponent],
  template: `<section style="position: relative"><app-sky [variant]="variant()" /></section>`,
})
class HostComponent {
  readonly variant = input<'hero' | 'band'>('hero');
}

let motionListeners: ((event: { matches: boolean }) => void)[] = [];

function stubMotion(reduced: boolean): void {
  motionListeners = [];
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce') ? reduced : false,
    addEventListener: (_: string, listener: (event: { matches: boolean }) => void) =>
      motionListeners.push(listener),
    removeEventListener: () => undefined,
  }));
}

describe('SkyComponent', () => {
  let engine: { [K in keyof SkyEngine]: ReturnType<typeof vi.fn> };
  let create: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    stubMotion(false);
    engine = {
      setDark: vi.fn(),
      aim: vi.fn(),
      release: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      destroy: vi.fn(),
    };
    create = vi.fn().mockReturnValue(engine);
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: SkyEngineFactory, useValue: { create } }],
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  async function render(variant: 'hero' | 'band' = 'hero') {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentRef.setInput('variant', variant);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('draws the sky on its canvas with the hero variant and the current theme', async () => {
    TestBed.inject(ThemeService).dark.set(true);
    const { element } = await render();
    expect(create).toHaveBeenCalledTimes(1);
    const [canvas, options] = create.mock.calls[0];
    expect(canvas).toBe(element.querySelector('canvas.c-sky__canvas'));
    expect(options).toEqual({ variant: 'hero', dark: true, reduced: false });
  });

  it('uses the band variant behind page titles', async () => {
    await render('band');
    expect(create.mock.calls[0][1].variant).toBe('band');
  });

  it('toggles pause and resume and the button label', async () => {
    const { fixture, element } = await render();
    const button = element.querySelector<HTMLButtonElement>('.c-sky__pause')!;
    expect(button.textContent?.trim()).toBe('Ferma il cielo');

    button.click();
    fixture.detectChanges();
    expect(engine.pause).toHaveBeenCalledTimes(1);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.textContent?.trim()).toBe('Fai muovere il cielo');

    button.click();
    fixture.detectChanges();
    expect(engine.resume).toHaveBeenCalledTimes(1);
    expect(button.getAttribute('aria-pressed')).toBe('false');
  });

  it('turns night into day with an animated transition when the theme changes', async () => {
    TestBed.inject(ThemeService).dark.set(true);
    const { fixture } = await render();
    engine.setDark.mockClear();
    TestBed.inject(ThemeService).dark.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(engine.setDark).toHaveBeenCalledWith(false, true);
  });

  it('switches the theme at once under reduced motion', async () => {
    stubMotion(true);
    const { fixture } = await render();
    engine.setDark.mockClear();
    TestBed.inject(ThemeService).dark.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(engine.setDark).toHaveBeenCalledWith(true, false);
  });

  it('follows the pointer and the finger over its section and lets go when they leave', async () => {
    const { element } = await render();
    const section = element.querySelector('section')!;
    section.dispatchEvent(new PointerEvent('pointermove', { clientX: 120, clientY: 80 }));
    expect(engine.aim).toHaveBeenCalledWith(120, 80);

    const touch = new Event('touchmove') as Event & {
      touches?: { clientX: number; clientY: number }[];
    };
    touch.touches = [{ clientX: 40, clientY: 30 }];
    section.dispatchEvent(touch);
    expect(engine.aim).toHaveBeenLastCalledWith(40, 30);

    section.dispatchEvent(new Event('touchmove'));
    section.dispatchEvent(new PointerEvent('pointerleave'));
    expect(engine.release).toHaveBeenCalled();
  });

  it('destroys the sky when the component is destroyed', async () => {
    const { fixture } = await render();
    fixture.destroy();
    expect(engine.destroy).toHaveBeenCalledTimes(1);
  });

  it('hides the pause button under reduced motion', async () => {
    stubMotion(true);
    const { element } = await render();
    expect(create.mock.calls[0][1].reduced).toBe(true);
    expect(element.querySelector('.c-sky__pause')).toBeNull();
  });

  it('hides the pause button when reduced motion is switched on later', async () => {
    const { fixture, element } = await render();
    expect(element.querySelector('.c-sky__pause')).not.toBeNull();
    motionListeners.forEach((listener) => listener({ matches: true }));
    fixture.detectChanges();
    expect(element.querySelector('.c-sky__pause')).toBeNull();
  });

  it('keeps the page usable when the canvas cannot draw', async () => {
    create.mockImplementation(() => {
      throw new Error('no 2d context');
    });
    const { element } = await render();
    expect(element.querySelector('app-sky')!.classList.contains('c-sky--fallback')).toBe(true);
    expect(element.querySelector('.c-sky__pause')).toBeNull();
  });
});
