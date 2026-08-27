import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { PortfolioSeoStrategy } from './portfolio-seo.strategy';

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
    expect(meta.getTag("name='description'")?.content).toContain('Gestionale Spese');
  });
});
