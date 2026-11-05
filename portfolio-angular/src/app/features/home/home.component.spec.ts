import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('uses the dedicated CV download URL', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const downloadLink = element.querySelector<HTMLAnchorElement>('a[download]');

    expect(downloadLink?.getAttribute('href')).toBe('/downloads/CV.pdf?v=8db4d300');
    expect(downloadLink?.getAttribute('download')).toBe('CV_Fabio_Zagaria.pdf');
  });

  it('shows only the full stack project, with its demo and repositories, and no coursework', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const cards = Array.from(element.querySelectorAll('app-project-card article')).map(
      (card) => card.id,
    );
    const actions = Array.from(
      element.querySelectorAll<HTMLAnchorElement>('#gestionale-spese .c-card__action'),
    );

    expect(cards).toEqual(['gestionale-spese']);
    expect(element.textContent).toContain('Il progetto in primo piano');
    expect(actions.map((link) => link.href)).toContain('https://gestionale-spese.vercel.app/');
    expect(actions.map((link) => link.href).join(' ')).toContain('expense-tracker-api');
    expect(actions.map((link) => link.href).join(' ')).toContain('expense-tracker-angular');
    expect(element.textContent).not.toContain('LabTV');
    expect(element.textContent).not.toContain('Fakeflix');
    expect(element.textContent).not.toContain('Task Manager Security Lab');
  });

  it('keeps the card compact: no technical decision and no history, only a link to the full card', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const fullCard = element.querySelector<HTMLAnchorElement>('.c-showcase__more a');

    expect(element.querySelector('.c-card__decision')).toBeNull();
    expect(element.querySelector('details.c-project-history')).toBeNull();
    expect(fullCard?.getAttribute('href')).toBe('/projects#gestionale-spese');
  });

  it('shows the API update before the frontend update, each with chip, tag, message and commit', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const items = Array.from(
      element.querySelectorAll<HTMLElement>('#gestionale-spese .c-update-item'),
    );

    expect(items.map((item) => item.dataset['kind'])).toEqual(['API', 'Frontend']);
    for (const item of items) {
      expect(item.querySelector('.c-update-item__version')?.textContent).toContain('v1.0.2');
      expect(
        item.querySelector('.c-update-item__message code')?.textContent?.length,
      ).toBeGreaterThan(5);
      expect(item.querySelector<HTMLAnchorElement>('.c-update-item__commit')?.href).toMatch(
        /github\.com\/fabiozagaria\/[\w.-]+\/commit\/[0-9a-f]{40}$/,
      );
    }
  });

  it('invites to the projects page with one entry per area, without presenting single projects', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.c-explore__link')).map(
      (link) => link.getAttribute('href'),
    );

    expect(links).toEqual([
      '/projects#backend-title',
      '/projects#plugin-skill-ai-title',
      '/projects#frontend-title',
    ]);
    expect(element.querySelector('.c-explore')?.textContent).not.toContain('JobFlow');
    expect(element.querySelector('.c-explore')?.textContent).not.toContain('AccessDesk');
  });

  it('keeps the home focused on role, projects and contact actions', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).not.toContain('Metodo CARAC');
    expect(element.textContent).not.toContain("Uso dell'AI");
  });

  it('lights up the hero grid while a fine pointer moves over it', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: !query.includes('reduce'),
    }));
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    TestBed.tick();
    const hero = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.c-hero')!;

    hero.dispatchEvent(new PointerEvent('pointermove', { clientX: 120, clientY: 90 }));
    expect(hero.classList.contains('is-tracking')).toBe(true);

    hero.dispatchEvent(new PointerEvent('pointerleave'));
    expect(hero.classList.contains('is-tracking')).toBe(false);
    vi.unstubAllGlobals();
  });
});
