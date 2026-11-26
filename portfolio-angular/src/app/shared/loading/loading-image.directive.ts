import { afterNextRender, DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

/** Keeps the image's reserved space while its real resource is loading. */
import { LanguageService } from '../../core/language.service';

@Directive({
  selector: 'a[appLoadingImage]',
  host: {
    '[class.image-loading]': 'loading()',
    '[class.image-failed]': 'failed()',
    '[attr.aria-busy]': 'loading()',
    '[attr.aria-label]':
      "failed() ? language.translate('Anteprima non disponibile. Apri l’immagine originale in una nuova scheda.') : null",
  },
})
export class LoadingImageDirective {
  protected readonly language = inject(LanguageService);
  readonly loading = signal(true);
  readonly failed = signal(false);
  private readonly element = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const image = this.element.nativeElement.querySelector('img');
      if (!image) {
        this.finish(false);
        return;
      }
      const loaded = () => this.finish(false);
      const failed = () => this.finish(true);
      image.addEventListener('load', loaded);
      image.addEventListener('error', failed);
      destroyRef.onDestroy(() => {
        image.removeEventListener('load', loaded);
        image.removeEventListener('error', failed);
      });
      if (image.complete) this.finish(image.naturalWidth === 0);
    });
  }

  finish(failed: boolean): void {
    this.failed.set(failed);
    this.loading.set(false);
  }
}
