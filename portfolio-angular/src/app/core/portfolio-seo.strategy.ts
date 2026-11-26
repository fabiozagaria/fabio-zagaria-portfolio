import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { plainText } from '../shared/rich-text/rich-text.pipe';
import { LanguageService } from './language.service';

const SITE_ORIGIN = 'https://fabio-zagaria-portfolio.vercel.app';
const DEFAULT_TITLE = 'Fabio Zagaria | Junior Backend Developer';

export interface PortfolioSeoData {
  readonly description: string;
  readonly path: string;
  readonly englishDescription?: string;
}

@Injectable()
export class PortfolioSeoStrategy extends TitleStrategy {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  private readonly language = inject(LanguageService);
  private snapshot?: RouterStateSnapshot;

  constructor() {
    super();
    effect(() => {
      const locale = this.language.current();
      this.meta.updateTag({ property: 'og:locale', content: locale === 'en' ? 'en_US' : 'it_IT' });
      if (this.snapshot) this.updateMetadata(this.snapshot);
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.snapshot = snapshot;
    this.updateMetadata(snapshot);
  }

  private updateMetadata(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.language.translate(this.buildTitle(snapshot) ?? DEFAULT_TITLE);
    const seo = this.findSeoData(snapshot.root);

    this.title.setTitle(pageTitle);

    if (!seo) {
      return;
    }

    const canonicalUrl = new URL(seo.path, SITE_ORIGIN).href;
    const description =
      this.language.current() === 'en' && seo.englishDescription
        ? seo.englishDescription
        : plainText(this.language.translate(seo.description));
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.updateCanonical(canonicalUrl);
  }

  private findSeoData(route: ActivatedRouteSnapshot): PortfolioSeoData | undefined {
    let current: ActivatedRouteSnapshot | null = route;
    let seo: PortfolioSeoData | undefined;

    while (current) {
      seo = (current.data['seo'] as PortfolioSeoData | undefined) ?? seo;
      current = current.firstChild;
    }

    return seo;
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.append(canonical);
    }

    canonical.href = url;
  }
}
