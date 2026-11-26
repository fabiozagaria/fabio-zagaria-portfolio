import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { PortfolioSeoStrategy } from './portfolio-seo.strategy';

@Component({ template: '<h1>Pagina di prova</h1>' })
class TestPage {}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        { provide: TitleStrategy, useClass: PortfolioSeoStrategy },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the portfolio owner name', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.c-nav__logo-text')?.textContent).toContain('Fabio Zagaria');
  });

  it('uses professional navigation labels without changing destinations', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('#nav-menu a'),
    );
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Home',
      'Profilo professionale',
      'Percorso professionale',
      'Progetti software',
      'Intelligenza Umana',
      'Contatti',
    ]);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/about',
      '/experience',
      '/projects',
      '/intelligenza-umana',
      '/contact',
    ]);
  });

  it('switches the current page to English and remembers the choice', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const element = fixture.nativeElement as HTMLElement;
    await router.navigateByUrl('/about');
    await fixture.whenStable();

    expect(element.querySelector('main h1')?.textContent).toBe('Chi sono');
    const english = element.querySelector<HTMLButtonElement>('button[lang="en"]');
    expect(english).toBeTruthy();
    try {
      english?.click();
      await fixture.whenStable();
      expect(router.url).toBe('/about');
      expect(document.documentElement.lang).toBe('en');
      expect(document.title).toBe('About me | Fabio Zagaria');
      expect(element.querySelector('main h1')?.textContent).toBe('About me');
      expect(english?.getAttribute('aria-pressed')).toBe('true');
      expect(localStorage.getItem('portfolio-language')).toBe('en');
      element.querySelector<HTMLButtonElement>('button[lang="it"]')?.click();
      await fixture.whenStable();
      expect(element.querySelector('main h1')?.textContent).toBe('Chi sono');
    } finally {
      localStorage.removeItem('portfolio-language');
      document.documentElement.lang = 'it';
    }
  });

  it('offers an English CV on Home and Contact while keeping Italian certificate links', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const element = fixture.nativeElement as HTMLElement;
    await router.navigateByUrl('/');
    await fixture.whenStable();

    try {
      element.querySelector<HTMLButtonElement>('button[lang="en"]')!.click();
      await fixture.whenStable();
      const homeDownload = element.querySelector<HTMLAnchorElement>('.c-hero__cv')!;
      expect(homeDownload.getAttribute('href')).toMatch(/^\/downloads\/CV-en\.pdf\?v=[0-9a-f]{8}$/);
      expect(homeDownload.getAttribute('download')).toBe('CV_Fabio_Zagaria_EN.pdf');
      expect(homeDownload.hreflang).toBe('en');

      await router.navigateByUrl('/contact');
      await fixture.whenStable();
      const cv = element.querySelector<HTMLAnchorElement>('main a[href^="/assets/documents/CV-"]');
      expect(cv?.getAttribute('href')).toMatch(/^\/assets\/documents\/CV-en\.pdf\?v=[0-9a-f]{8}$/);
      expect(
        element.querySelector<HTMLAnchorElement>('main a[href*="Attestato_LabForWeb"]')?.hreflang,
      ).toBe('it');
      element.querySelector<HTMLButtonElement>('button[lang="it"]')!.click();
      await fixture.whenStable();
      expect(element.querySelector('main a[href^="/assets/documents/CV.pdf"]')).toBeTruthy();
    } finally {
      localStorage.removeItem('portfolio-language');
      document.documentElement.lang = 'it';
    }
  });

  it('shows the stack logos in two rows with a pause control', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/about');
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const rows = element.querySelectorAll('.c-stack-marquee__row');

    expect(rows.length).toBe(2);
    expect(rows[0]?.querySelector('img[src$="/java.svg"]')).toBeTruthy();
    expect(rows[1]?.querySelector('img[src$="/angular.svg"]')).toBeTruthy();
    const pause = element.querySelector<HTMLButtonElement>('.c-stack-marquee__pause');
    pause?.click();
    await fixture.whenStable();
    expect(pause?.getAttribute('aria-pressed')).toBe('true');
  });

  it('should expose the mobile menu state to assistive technologies', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const menuButton = fixture.nativeElement.querySelector('.c-nav__toggle') as HTMLButtonElement;

    expect(menuButton.getAttribute('aria-expanded')).toBe('false');

    menuButton.click();
    fixture.detectChanges();

    expect(menuButton.getAttribute('aria-expanded')).toBe('true');
  });

  it('updates canonical and social metadata for the active route', async () => {
    const router = TestBed.inject(Router);
    const document = TestBed.inject(DOCUMENT);
    const meta = TestBed.inject(Meta);

    await router.navigateByUrl('/projects');

    expect(document.title).toBe('Progetti | Fabio Zagaria');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(
      'https://fabio-zagaria-portfolio.vercel.app/projects',
    );
    expect(meta.getTag("property='og:url'")?.content).toBe(
      'https://fabio-zagaria-portfolio.vercel.app/projects',
    );
    expect(meta.getTag("name='description'")?.content).toContain('Expense Tracker');
  });
  it('returns focus to the mobile disclosure button when Escape closes it', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const toggle = element.querySelector<HTMLButtonElement>('.c-nav__toggle')!;
    toggle.click();
    fixture.detectChanges();
    element.querySelector<HTMLAnchorElement>('#nav-menu a')!.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('closes the menu when keyboard focus leaves navigation without locking page scrolling', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const nav = element.querySelector<HTMLElement>('nav')!;
    fixture.componentInstance.toggleMenu();
    nav.dispatchEvent(new FocusEvent('focusout', { relatedTarget: element.querySelector('main') }));
    fixture.detectChanges();
    expect(fixture.componentInstance.isMenuOpen).toBe(false);
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('shows the TMDB attribution in the footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const note = (fixture.nativeElement as HTMLElement).querySelector('.c-footer__note');

    expect(note?.textContent).toContain(
      'This product uses the TMDB API but is not endorsed or certified by',
    );
    const link = note?.querySelector<HTMLAnchorElement>('a');
    expect(link?.getAttribute('href')).toBe('https://www.themoviedb.org/');
    expect(link?.getAttribute('rel')).toContain('noopener');
  });

  it('shows the spinner only while a lazy route is pending', async () => {
    let complete!: (page: typeof TestPage) => void;
    let started!: () => void;
    const loading = new Promise<void>((resolve) => (started = resolve));
    const router = TestBed.inject(Router);
    router.resetConfig([
      {
        path: 'slow-loader-test',
        loadComponent: () => {
          started();
          return new Promise<typeof TestPage>((resolve) => (complete = resolve));
        },
      },
      ...routes,
    ]);
    const fixture = TestBed.createComponent(App);
    const navigation = router.navigateByUrl('/slow-loader-test');
    await loading;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-loading-spinner')).toBeTruthy();
    complete(TestPage);
    await navigation;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-loading-spinner')).toBeNull();
    expect(fixture.nativeElement.querySelector('main').getAttribute('aria-busy')).toBe('false');
  });

  it('clears the spinner and communicates a lazy chunk failure', async () => {
    const router = TestBed.inject(Router);
    router.resetConfig([
      {
        path: 'failed-loader-test',
        loadComponent: () => Promise.reject(new Error('Chunk unavailable')),
      },
      ...routes,
    ]);
    const fixture = TestBed.createComponent(App);
    await expect(router.navigateByUrl('/failed-loader-test')).rejects.toThrow('Chunk unavailable');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-loading-spinner')).toBeNull();
    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain(
      'Impossibile aprire la pagina',
    );
  });

  it('names the footer links with a role that allows a name', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const links = (fixture.nativeElement as HTMLElement).querySelector('.c-footer__links');
    expect(links?.getAttribute('aria-label')).toBe('Collegamenti professionali');
    expect(links?.getAttribute('role')).toBe('group');
  });
});
