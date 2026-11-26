import { TranslatePipe } from '../../core/translate.pipe';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Scheda del profilo LinkedIn, sempre visibile. È disegnata dal sito con dati già presenti nel
 * portfolio (nome, ruolo, località, ritratto) e non fa nessuna richiesta a LinkedIn: tutta la
 * scheda è un solo collegamento al profilo, quindi non servono cookie né un banner di consenso.
 * Il badge ufficiale di LinkedIn è stato provato e non si disegnava (vedi docs/CONTEXT.md).
 */
@Component({
  imports: [TranslatePipe],
  selector: 'app-linkedin-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="c-place c-place--link"
      href="https://linkedin.com/in/fabiozagaria"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        class="c-place__photo"
        src="assets/img/io-640.webp"
        alt=""
        width="640"
        height="640"
        loading="lazy"
        decoding="async"
      />
      <span class="c-place__text">
        <span class="c-place__title">LinkedIn</span>
        <span class="c-place__name">Fabio Zagaria</span>
        <span class="c-place__role">{{
          'Junior Backend Developer, con visione full stack' | translate
        }}</span>
        <span class="c-place__place">{{ 'Roma, ibrido o remoto in Italia' | translate }}</span>
        <span class="c-place__url">linkedin.com/in/fabiozagaria</span>
        <span class="u-visually-hidden">{{ '(si apre in una nuova scheda)' | translate }}</span>
      </span>
    </a>
  `,
})
export class LinkedinCardComponent {}
