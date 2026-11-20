import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KitLoader } from './kit-loader.service';
import { MomentDirective } from './moment.directive';

@Component({
  standalone: true,
  imports: [MomentDirective],
  template: `<p appMoment="word-highlight">Ogni scheda dice che cosa è stato fatto.</p>`,
})
class HostComponent {}

describe('MomentDirective', () => {
  let mount: ReturnType<typeof vi.fn>;
  let destroy: ReturnType<typeof vi.fn>;
  let loadMoments: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    destroy = vi.fn();
    mount = vi.fn().mockResolvedValue({ destroy });
    loadMoments = vi.fn().mockResolvedValue({ mount });
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: KitLoader, useValue: { loadMoments, mountSky: vi.fn() } }],
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p')!;
    return { fixture, paragraph };
  }

  it('mounts the named moment on its host', async () => {
    const { paragraph } = await render();
    expect(paragraph.getAttribute('data-moment')).toBe('word-highlight');
    expect(mount).toHaveBeenCalledWith(paragraph);
  });

  it('destroys the moment with the view', async () => {
    const { fixture } = await render();
    fixture.destroy();
    expect(destroy).toHaveBeenCalledTimes(1);
  });

  it('keeps the full text when the moment fails', async () => {
    loadMoments.mockRejectedValue(new Error('offline'));
    const { paragraph } = await render();
    expect(paragraph.textContent).toBe('Ogni scheda dice che cosa è stato fatto.');
    expect(paragraph.getAttribute('style') ?? '').not.toContain('opacity');
  });
});
