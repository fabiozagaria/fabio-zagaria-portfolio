import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
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
});
