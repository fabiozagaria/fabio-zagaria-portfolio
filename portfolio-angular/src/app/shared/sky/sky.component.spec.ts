import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from '../../core/theme.service';
import { KitLoader, type SkyController } from './kit-loader.service';
import { SkyComponent } from './sky.component';

@Component({
  standalone: true,
  imports: [SkyComponent],
  template: `<div style="position: relative"><app-sky [variant]="variant()" /></div>`,
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
  let controller: { [K in keyof SkyController]: ReturnType<typeof vi.fn> };
  let mountSky: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    stubMotion(false);
    controller = { pause: vi.fn(), resume: vi.fn(), setPalette: vi.fn(), destroy: vi.fn() };
    mountSky = vi.fn().mockResolvedValue(controller);
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: KitLoader, useValue: { mountSky, loadMoments: vi.fn() } }],
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

  it('mounts the painted sky with the hero params', async () => {
    await render();
    expect(mountSky).toHaveBeenCalledTimes(1);
    const options = mountSky.mock.calls[0][1];
    expect(options.seed).toBe(7);
    expect(options.params.drift).toBe(0.05);
  });

  it('uses the band params for variant band', async () => {
    await render('band');
    const options = mountSky.mock.calls[0][1];
    expect(options.seed).toBe(11);
    expect(options.params.horizon).toBe(0.62);
  });

  it('toggles pause and resume and the button label', async () => {
    const { fixture, element } = await render();
    const button = element.querySelector<HTMLButtonElement>('.c-sky__pause')!;
    expect(button.textContent?.trim()).toBe('Ferma il cielo');

    button.click();
    fixture.detectChanges();
    expect(controller.pause).toHaveBeenCalledTimes(1);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.textContent?.trim()).toBe('Fai muovere il cielo');

    button.click();
    fixture.detectChanges();
    expect(controller.resume).toHaveBeenCalledTimes(1);
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.textContent?.trim()).toBe('Ferma il cielo');
  });

  it('repaints when the theme changes', async () => {
    const { fixture } = await render();
    controller.setPalette.mockClear();
    TestBed.inject(ThemeService).dark.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(controller.setPalette).toHaveBeenCalledTimes(1);
    expect(controller.setPalette.mock.calls[0][0]).toEqual(
      expect.objectContaining({ bg: expect.any(String), accent: expect.any(String) }),
    );
  });

  it('destroys the effect when the component is destroyed', async () => {
    const { fixture } = await render();
    fixture.destroy();
    expect(controller.destroy).toHaveBeenCalledTimes(1);
  });

  it('hides the pause button under reduced motion', async () => {
    stubMotion(true);
    const { element } = await render();
    expect(element.querySelector('.c-sky__pause')).toBeNull();
  });

  it('keeps the page usable when the sky fails to mount', async () => {
    mountSky.mockRejectedValue(new Error('no webgl'));
    const { element } = await render();
    const sky = element.querySelector('app-sky')!;
    expect(sky.classList.contains('c-sky--fallback')).toBe(true);
    expect(element.querySelector('.c-sky__pause')).toBeNull();
  });

  it('hides the pause button when the kit falls back to a still picture', async () => {
    mountSky.mockImplementation(async (el: HTMLElement) => {
      el.dataset['fxFallback'] = 'no-webgl';
      return controller;
    });
    const { element } = await render();
    expect(element.querySelector('.c-sky__pause')).toBeNull();
  });

  it('hides the pause button when reduced motion is switched on later', async () => {
    const { fixture, element } = await render();
    expect(element.querySelector('.c-sky__pause')).not.toBeNull();
    motionListeners.forEach((listener) => listener({ matches: true }));
    fixture.detectChanges();
    expect(element.querySelector('.c-sky__pause')).toBeNull();
  });
});
