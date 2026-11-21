import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  CV,
  CV_DOWNLOAD_NAME,
  CV_DOWNLOAD_URL,
  CV_VIEW_URL,
  cvUpdatedLabel,
} from '../../data/cv.data';
import { GithubCardComponent } from '../../shared/github-card/github-card.component';
import { LinkedinCardComponent } from '../../shared/linkedin-card/linkedin-card.component';
import { LinkedinPostsComponent } from '../../shared/linkedin-posts/linkedin-posts.component';
import { SkyComponent } from '../../shared/sky/sky.component';

const MESSAGE_VISIBLE_MS = 5000;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [GithubCardComponent, LinkedinCardComponent, LinkedinPostsComponent, SkyComponent],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly email = 'zagariafabio1999@gmail.com';
  /** Link e data vengono da `cv.data.ts`: l'unico posto da aggiornare a ogni nuovo CV. */
  readonly cv = {
    view: CV_VIEW_URL,
    download: CV_DOWNLOAD_URL,
    downloadName: CV_DOWNLOAD_NAME,
    updatedAt: CV.updatedAt,
    updatedLabel: cvUpdatedLabel(),
  };
  readonly copyMessage = signal('');

  private readonly address = viewChild.required<ElementRef<HTMLElement>>('address');
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  /**
   * Il pulsante «Scrivimi» apre il programma di posta, che chi usa un webmail non ha: per questo
   * l'indirizzo si può anche copiare. Se il browser rifiuta l'accesso agli appunti, l'indirizzo
   * viene selezionato e un messaggio spiega come finire a mano.
   */
  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.say('Indirizzo copiato');
    } catch {
      this.selectAddress();
      this.say('Non sono riuscito a copiare: ho selezionato l’indirizzo, copialo a mano');
    }
  }

  private selectAddress(): void {
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(this.address().nativeElement);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  private say(message: string): void {
    this.copyMessage.set(message);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copyMessage.set(''), MESSAGE_VISIBLE_MS);
  }
}
