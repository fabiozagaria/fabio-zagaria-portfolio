import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

const EASING = 0.08;

/**
 * A soft light that follows the pointer (mouse, pen or finger) over its host
 * and drifts back to rest when the pointer leaves. Listeners are passive, so
 * it never blocks scrolling; under reduced motion the light stays at rest.
 */
@Directive({
  selector: '[appSkyLight]',
  standalone: true,
  host: { class: 'c-sky-light' },
})
export class SkyLightDirective {
  readonly rest = input<[number, number]>([0.78, 0.22]);
  readonly radius = input<number>(520);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const el = this.host;
    let [x, y] = this.rest();
    let [targetX, targetY] = [x, y];
    let frame = 0;

    const paint = (): void => {
      el.style.setProperty('--light-x', `${+(x * 100).toFixed(2)}%`);
      el.style.setProperty('--light-y', `${+(y * 100).toFixed(2)}%`);
    };
    el.style.setProperty('--light-r', `${this.radius()}px`);
    paint();

    const reduced =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const step = (): void => {
      x += (targetX - x) * EASING;
      y += (targetY - y) * EASING;
      const settled = Math.abs(targetX - x) < 0.001 && Math.abs(targetY - y) < 0.001;
      if (settled) [x, y] = [targetX, targetY];
      paint();
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const wake = (): void => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    const aim = (clientX: number, clientY: number): void => {
      const box = el.getBoundingClientRect();
      if (!box.width || !box.height) return;
      targetX = Math.min(1, Math.max(0, (clientX - box.left) / box.width));
      targetY = Math.min(1, Math.max(0, (clientY - box.top) / box.height));
      wake();
    };
    const onMove = (event: PointerEvent): void => aim(event.clientX, event.clientY);
    // While a finger scrolls the page the browser cancels the pointer, so
    // touches are followed through their own passive events.
    const onTouch = (event: TouchEvent): void => {
      const touch = event.touches?.[0];
      if (touch) aim(touch.clientX, touch.clientY);
    };
    const onLeave = (): void => {
      [targetX, targetY] = this.rest();
      wake();
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
    el.addEventListener('touchmove', onTouch, { passive: true });
    el.addEventListener('touchend', onLeave, { passive: true });
    this.destroyRef.onDestroy(() => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('touchmove', onTouch);
      el.removeEventListener('touchend', onLeave);
      cancelAnimationFrame(frame);
    });
  }
}
