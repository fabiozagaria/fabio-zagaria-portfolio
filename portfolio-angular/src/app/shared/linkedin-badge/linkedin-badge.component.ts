import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';

const PROFILE_VANITY = 'fabiozagaria';
const PROFILE_URL = `https://it.linkedin.com/in/${PROFILE_VANITY}?trk=profile-badge`;
const BADGE_SCRIPT = 'https://platform.linkedin.com/badges/js/profile.js';

/**
 * Badge del profilo LinkedIn caricato solo su richiesta. Lo script di LinkedIn può impostare cookie
 * e tracciare chi visita: finché il visitatore non preme il pulsante non parte nessuna richiesta
 * verso LinkedIn, quindi il sito non ha bisogno di un banner dei cookie.
 */
@Component({
  selector: 'app-linkedin-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="c-linkedin" aria-labelledby="linkedin-title">
      <h3 id="linkedin-title">Il mio profilo LinkedIn</h3>
      @if (!loaded()) {
        <p>
          Qui puoi vedere il profilo direttamente da LinkedIn. Il contenuto si carica da LinkedIn
          solo se lo chiedi: LinkedIn può usare cookie.
        </p>
        <div class="c-linkedin__actions">
          <button type="button" class="c-btn c-btn--primary" (click)="load()">
            Mostra il profilo LinkedIn
          </button>
          <a
            class="c-btn c-btn--secondary"
            [href]="profileUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apri il profilo su LinkedIn (apre una nuova scheda)"
          >
            Apri su LinkedIn
          </a>
        </div>
      } @else if (failed()) {
        <p role="status">
          Non sono riuscito a caricare il profilo da LinkedIn (potrebbe essere bloccato dal
          browser). Puoi aprirlo direttamente:
          <a [href]="profileUrl" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/fabiozagaria
          </a>
        </p>
      }
      <div #badgeHost class="c-linkedin__badge"></div>
    </section>
  `,
})
export class LinkedinBadgeComponent {
  private readonly document = inject(DOCUMENT);
  private readonly theme = inject(ThemeService);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly host = viewChild.required<ElementRef<HTMLElement>>('badgeHost');

  readonly profileUrl = PROFILE_URL;
  readonly loaded = signal(false);
  readonly failed = signal(false);

  /** Inserisce il badge e poi lo script: lo script cerca i badge presenti quando viene eseguito. */
  load(): void {
    if (!this.browser || this.loaded()) return;

    const badge = this.document.createElement('div');
    badge.className = 'badge-base LI-profile-badge';
    badge.dataset['locale'] = 'it_IT';
    badge.dataset['size'] = 'medium';
    badge.dataset['theme'] = this.theme.dark() ? 'dark' : 'light';
    badge.dataset['type'] = 'HORIZONTAL';
    badge.dataset['vanity'] = PROFILE_VANITY;
    badge.dataset['version'] = 'v1';

    // Finché lo script non lo sostituisce (o se non parte), resta un normale link al profilo.
    const link = this.document.createElement('a');
    link.className = 'badge-base__link LI-simple-link';
    link.href = PROFILE_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Fabio Zagaria su LinkedIn';
    badge.append(link);
    this.host().nativeElement.append(badge);

    // Se lo script era già stato caricato (si torna sulla pagina), va ricreato per far rileggere il badge.
    this.document.querySelectorAll('script[data-linkedin-badge]').forEach((old) => old.remove());
    const script = this.document.createElement('script');
    script.src = BADGE_SCRIPT;
    script.async = true;
    script.defer = true;
    script.dataset['linkedinBadge'] = 'true';
    script.addEventListener('error', () => this.failed.set(true));
    this.document.head.append(script);

    this.loaded.set(true);
  }
}
