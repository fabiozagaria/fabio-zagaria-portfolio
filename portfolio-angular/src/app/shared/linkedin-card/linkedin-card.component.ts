import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Scheda del profilo LinkedIn, sempre visibile. È disegnata dal sito con dati già presenti nel
 * portfolio (nome, ruolo, località, ritratto) e non fa nessuna richiesta a LinkedIn: tutta la
 * scheda è un solo collegamento al profilo, quindi non servono cookie né un banner di consenso.
 * Il badge ufficiale di LinkedIn è stato provato e non si disegnava (vedi docs/CONTEXT.md).
 */
@Component({
  selector: 'app-linkedin-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="c-profile" aria-labelledby="profile-title">
      <h3 id="profile-title">Il mio profilo LinkedIn</h3>
      <a
        class="c-profile__card"
        href="https://linkedin.com/in/fabiozagaria"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Profilo LinkedIn di Fabio Zagaria, Junior Backend Developer (apre una nuova scheda)"
      >
        <img
          class="c-profile__photo"
          src="assets/img/io-640.webp"
          alt=""
          width="640"
          height="640"
          loading="lazy"
          decoding="async"
        />
        <span class="c-profile__text">
          <span class="c-profile__name">Fabio Zagaria</span>
          <span class="c-profile__role">Junior Backend Developer, con visione full stack</span>
          <span class="c-profile__place">Roma, ibrido o remoto in Italia</span>
          <span class="c-profile__url">linkedin.com/in/fabiozagaria</span>
        </span>
      </a>
    </section>
  `,
})
export class LinkedinCardComponent {}
