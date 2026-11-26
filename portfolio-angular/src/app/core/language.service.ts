import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { enData } from './locales/en-data';
import { enUi } from './locales/en-ui';
import { itUi } from './locales/it-ui';

export type PortfolioLanguage = 'it' | 'en';

const STORAGE_KEY = 'portfolio-language';
const englishDate = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'Europe/Rome',
});
const italianMonths = [
  'gennaio',
  'febbraio',
  'marzo',
  'aprile',
  'maggio',
  'giugno',
  'luglio',
  'agosto',
  'settembre',
  'ottobre',
  'novembre',
  'dicembre',
];

/** Older commit items expose a localized calendar label rather than an ISO date. */
function commitDate(label: string): number {
  const [day, month, year] = label.split(' ');
  const monthIndex = italianMonths.indexOf(month);
  return monthIndex < 0 ? NaN : Date.UTC(Number(year), monthIndex, Number(day));
}
const translations: Record<PortfolioLanguage, Readonly<Record<string, string>>> = {
  it: itUi,
  en: { ...enUi, ...enData },
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly selected = signal<PortfolioLanguage>(this.readPreference());
  readonly current = this.selected.asReadonly();

  constructor() {
    this.document.documentElement.lang = this.current();
  }

  select(language: PortfolioLanguage): void {
    this.selected.set(language);
    this.document.documentElement.lang = language;
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The selector still works when storage is unavailable.
    }
  }

  translate(source: string, ...values: (string | number)[]): string {
    const catalog = translations[this.current()];
    const message = Object.hasOwn(catalog, source) ? catalog[source] : source;
    return values.length
      ? message.replace(/\{(\d+)\}/g, (placeholder, index) =>
          String(values[Number(index)] ?? placeholder),
        )
      : message;
  }

  date(value: string | null, italianLabel: string): string {
    if (this.current() === 'it') return italianLabel;

    const date = value ? Date.parse(value) : commitDate(italianLabel);
    return Number.isNaN(date) ? italianLabel : englishDate.format(date);
  }

  private readPreference(): PortfolioLanguage {
    try {
      return this.document.defaultView?.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'it';
    } catch {
      return 'it';
    }
  }
}
