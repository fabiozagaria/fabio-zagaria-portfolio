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
import { KitLoader, type SkyController, type SkyPalette } from './kit-loader.service';

type SkyVariant = 'hero' | 'band';

const HERO_PARAMS = {
  drift: 0.05,
  blur: 0.85,
  brush: 0.45,
  grain: 0.015,
  calm: 0.7,
  calmX: 0.3,
  calmY: 0.6,
  horizon: 0.66,
  hillY: 0.22,
};

const SKY = {
  hero: { seed: 7, params: HERO_PARAMS },
  band: { seed: 11, params: { ...HERO_PARAMS, horizon: 0.62, hillY: 0.12 } },
} as const;

function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Reads the live Calm tokens, so the sky follows the current theme. */
function readPalette(): SkyPalette {
  const style = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
  return {
    bg: token('--calm-page', '#f2f6f5'),
    surface: token('--calm-surface', '#ffffff'),
    ink: token('--calm-ink', '#1f3a3d'),
    muted: token('--calm-muted', '#5b7478'),
    accent: token('--calm-accent', '#2f7d84'),
    accentInk: token('--calm-on-accent', '#ffffff'),
  };
}

/**
 * The painted sky ("Cielo dipinto"): a slow Taste Skill effect behind a hero
 * or a page title. Decorative, hidden from assistive technology except for its
 * pause control; still under reduced motion; a CSS ground if WebGL is missing.
 */
@Component({
  selector: 'app-sky',
  standalone: true,
  template: `
    <div #ground class="c-sky__ground" aria-hidden="true"></div>
    @if (live()) {
      <button
        type="button"
        class="c-sky__pause"
        [attr.aria-pressed]="paused()"
        (click)="togglePause()"
      >
        {{ paused() ? 'Fai muovere il cielo' : 'Ferma il cielo' }}
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
  private readonly reduced = signal(prefersReducedMotion());
  private readonly still = signal(false);
  protected readonly live = () =>
    this.mounted() && !this.reduced() && !this.failed() && !this.still();

  private readonly ground = viewChild.required<ElementRef<HTMLElement>>('ground');
  private readonly loader = inject(KitLoader);
  private readonly theme = inject(ThemeService);
  private controller: SkyController | null = null;
  private destroyed = false;

  constructor() {
    afterNextRender(() => void this.mount());

    effect(() => {
      this.theme.dark();
      untracked(() => this.controller?.setPalette(readPalette()));
    });

    const motion =
      typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
    const onMotion = (event: { matches: boolean }) => this.reduced.set(event.matches);
    motion?.addEventListener?.('change', onMotion);

    inject(DestroyRef).onDestroy(() => {
      motion?.removeEventListener?.('change', onMotion);
      this.destroyed = true;
      this.controller?.destroy();
      this.controller = null;
    });
  }

  protected togglePause(): void {
    if (!this.controller) return;
    if (this.paused()) this.controller.resume();
    else this.controller.pause();
    this.paused.update((paused) => !paused);
  }

  private async mount(): Promise<void> {
    const { seed, params } = SKY[this.variant()];
    try {
      const controller = await this.loader.mountSky(this.ground().nativeElement, {
        seed,
        palette: readPalette(),
        params: { ...params },
      });
      if (this.destroyed) {
        controller.destroy();
        return;
      }
      this.controller = controller;
      // Without WebGL the kit paints a still CSS picture: nothing to pause.
      this.still.set(Boolean(this.ground().nativeElement.dataset['fxFallback']));
      this.mounted.set(true);
    } catch {
      this.failed.set(true);
    }
  }
}
