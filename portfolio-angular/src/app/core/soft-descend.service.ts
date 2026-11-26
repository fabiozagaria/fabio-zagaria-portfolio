import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * Blocchi che scendono piano al loro posto quando la pagina si apre o quando entrano nello schermo.
 * Questo elenco deve restare identico a quello di `src/motion.css` («Discesa morbida»).
 */
export const SOFT_DESCEND_SELECTOR = [
  '.c-motivation__title',
  '.c-motivation__quote > p',
  '.c-motivation__source',
  '.c-showcase__header',
  '.c-showcase .o-container > app-project-card',
  '.c-explore__header',
  '.c-explore__grid > *',
  '.c-explore__actions',
  '.c-resume__layout',
  '.c-about__text-block > :not(.c-about__stack)',
  '.c-about__stack > div',
  '.c-about__portrait',
  '.c-about__stat-item',
  '.c-experience__current',
  '.c-experience__section-label',
  '.c-experience__content > *',
  '.c-projects .c-section-subtitle',
  '.c-projects__index',
  '.c-projects__group-title',
  '.c-projects__group-description',
  '.c-projects__grid > *',
  '.c-projects__github-cta',
  '.c-project-detail__nav',
  '.c-project-detail .c-card__content > *',
  '.c-project-detail__back',
  '.c-iu__logo',
  '.c-iu__status',
  '.c-iu__block',
  '.c-iu__section',
  '.c-iu__text > p',
  '.c-iu__list > li',
  '.c-iu__site',
  '.c-iu__back',
  '.c-contact__info > :not(.c-contact__documents):not(.c-contact__places)',
  '.c-contact__places > *',
  '.c-contact__documents > :not(.c-contact__documents-grid)',
  '.c-contact__documents-grid > *',
  '.c-footer__content',
  '.c-footer__note',
].join(', ');

/** Pausa tra un blocco e il successivo, e numero massimo di scaglioni. */
const STEP_MS = 110;
const MAX_STEPS = 6;

/**
 * La discesa è un'animazione CSS che parte da sola, così non c'è nessun lampo al primo disegno.
 * Qui si fa una cosa sola: i blocchi sotto la parte visibile restano fermi (in pausa, ancora
 * trasparenti) e ripartono quando entrano nello schermo. Con «riduci movimento» non si fa nulla.
 */
@Injectable({ providedIn: 'root' })
export class SoftDescendService {
  private observer?: IntersectionObserver;

  constructor() {
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => requestAnimationFrame(() => requestAnimationFrame(() => this.prepare())));
  }

  private prepare(): void {
    this.observer?.disconnect();
    this.observer = new IntersectionObserver((entries) => this.reveal(entries), {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.05,
    });

    const fold = window.innerHeight * 0.9;
    let rank = 0;
    for (const element of Array.from(
      document.querySelectorAll<HTMLElement>(SOFT_DESCEND_SELECTOR),
    )) {
      if (element.getBoundingClientRect().top < fold) {
        element.style.setProperty('--soft-delay', `${Math.min(rank++, MAX_STEPS) * STEP_MS}ms`);
      } else {
        element.dataset['soft'] = 'wait';
        this.observer.observe(element);
      }
    }
  }

  private reveal(entries: IntersectionObserverEntry[]): void {
    let rank = 0;
    for (const entry of entries.filter((item) => item.isIntersecting)) {
      const element = entry.target as HTMLElement;
      element.style.setProperty('--soft-delay', `${Math.min(rank++, 3) * STEP_MS}ms`);
      delete element.dataset['soft'];
      this.observer?.unobserve(element);
    }
  }
}
