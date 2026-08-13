import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

const SITE_ORIGIN = 'https://fabio-zagaria-portfolio.vercel.app';
const DEFAULT_TITLE = 'Fabio Zagaria | Junior Backend Developer';

export interface PortfolioSeoData {
  readonly description: string;
  readonly path: string;
}

@Injectable()
export class PortfolioSeoStrategy extends TitleStrategy {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot) ?? DEFAULT_TITLE;
    const seo = this.findSeoData(snapshot.root);

    this.title.setTitle(pageTitle);

    if (!seo) {
      return;
    }

    const canonicalUrl = new URL(seo.path, SITE_ORIGIN).href;
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
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
