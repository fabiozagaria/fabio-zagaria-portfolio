import { TranslatePipe } from '../../core/translate.pipe';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { SkyEngineFactory, type SkyEngine, type SkyVariant } from './sky-engine';

function reducedMotionQuery(): MediaQueryList | null {
  return typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
}

/**
 * The sky behind a hero or a page title: a starry night in the dark theme and
 * the sun with clouds in the light theme, blended when the theme changes. It
 * follows the pointer and the finger over its section without blocking scroll.
 * Decorative and hidden from assistive technology, except for its pause control.
 */
@Component({
  imports: [TranslatePipe],
  selector: 'app-sky',
  standalone: true,
  template: `
    <canvas #canvas class="c-sky__canvas" aria-hidden="true"></canvas>
    @if (live()) {
      <button
        type="button"
        class="c-sky__pause"
        [attr.aria-pressed]="paused()"
        (click)="togglePause()"
      >
        {{ (paused() ? 'Fai muovere il cielo' : 'Ferma il cielo') | translate }}
      </button>
    }
  `,
  styleUrl: './sky.component.css',
  host: {
    class: 'c-sky',
    '[class.c-sky--band]': "variant() === 'band'",
    '[class.c-sky--fallback]': 'failed()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkyComponent {
  readonly variant = input<SkyVariant>('hero');

  protected readonly paused = signal(false);
  protected readonly failed = signal(false);
  private readonly mounted = signal(false);
  private readonly reduced = signal(reducedMotionQuery()?.matches ?? false);
  protected readonly live = () => this.mounted() && !this.reduced() && !this.failed();

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly factory = inject(SkyEngineFactory);
  private readonly theme = inject(ThemeService);
  private engine: SkyEngine | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => this.mount(destroyRef));

    effect(() => {
      const dark = this.theme.dark();
      untracked(() => this.engine?.setDark(dark, !this.reduced()));
    });

    const motion = reducedMotionQuery();
    const onMotion = (event: { matches: boolean }) => this.reduced.set(event.matches);
    motion?.addEventListener?.('change', onMotion);

    destroyRef.onDestroy(() => {
      motion?.removeEventListener?.('change', onMotion);
      this.engine?.destroy();
      this.engine = null;
    });
  }

  protected togglePause(): void {
    if (!this.engine) return;
    if (this.paused()) this.engine.resume();
    else this.engine.pause();
    this.paused.update((paused) => !paused);
  }

  private mount(destroyRef: DestroyRef): void {
    const canvas = this.canvas().nativeElement;
    try {
      this.engine = this.factory.create(canvas, {
        variant: this.variant(),
        dark: this.theme.dark(),
        reduced: this.reduced(),
      });
    } catch {
      this.failed.set(true);
      return;
    }
    this.mounted.set(true);

    // Pointer and finger over the whole section; passive, so scrolling is never blocked.
    const area = this.host.parentElement ?? this.host;
    const aim = (x: number, y: number) => {
      const box = canvas.getBoundingClientRect();
      this.engine?.aim(x - box.left, y - box.top);
    };
    const onPointer = (event: PointerEvent) => aim(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches?.[0];
      if (touch) aim(touch.clientX, touch.clientY);
    };
    const onLeave = () => this.engine?.release();
    const listeners: [string, EventListener][] = [
      ['pointermove', onPointer as EventListener],
      ['touchmove', onTouch as EventListener],
      ['pointerleave', onLeave],
      ['touchend', onLeave],
    ];
    for (const [type, listener] of listeners)
      area.addEventListener(type, listener, { passive: true });
    destroyRef.onDestroy(() => {
      for (const [type, listener] of listeners) area.removeEventListener(type, listener);
    });
  }
}
