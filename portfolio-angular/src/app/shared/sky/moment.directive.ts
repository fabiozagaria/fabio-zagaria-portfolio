import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { KitLoader } from './kit-loader.service';

/**
 * Mounts one Taste Skill moment (for example "word-highlight") on its host
 * and tears it down with the view. If the kit cannot load, the host keeps
 * its plain, fully visible content.
 */
@Directive({
  selector: '[appMoment]',
  standalone: true,
  host: { '[attr.data-moment]': 'appMoment()' },
})
export class MomentDirective {
  readonly appMoment = input.required<string>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly loader = inject(KitLoader);
  private api: { destroy?(): void } | null = null;
  private destroyed = false;

  constructor() {
    afterNextRender(() => void this.mount());
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.api?.destroy?.();
      this.api = null;
    });
  }

  private async mount(): Promise<void> {
    try {
      const moments = await this.loader.loadMoments();
      const api = await moments.mount(this.host);
      if (this.destroyed) api?.destroy?.();
      else this.api = api;
    } catch {
      // The text stays as written: nothing was hidden before the moment ran.
    }
  }
}
