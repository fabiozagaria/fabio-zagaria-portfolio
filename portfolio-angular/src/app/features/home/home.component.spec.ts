import { TestBed } from '@angular/core/testing';
import { CV, CV_DOWNLOAD_URL, CV_VIEW_URL, cvUpdatedLabel } from '../../data/cv.data';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { SkyEngineFactory } from '../../shared/sky/sky-engine';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        {
          provide: SkyEngineFactory,
          useValue: {
            create: () => {
              throw new Error('no canvas in tests');
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('renders the sky behind the hero instead of the 3D scene', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const hero = (fixture.nativeElement as HTMLElement).querySelector('#home')!;

    expect(hero.querySelector('app-sky')).not.toBeNull();
    expect(hero.querySelector('app-hero-scene')).toBeNull();
  });

  it('keeps the API flow map and the video out of the compact home card', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.c-diagram')).toBeNull();
    expect(element.querySelector('video')).toBeNull();
  });

  it('uses the dedicated CV download URL', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const downloadLink = element.querySelector<HTMLAnchorElement>('a[download]');

    expect(downloadLink?.getAttribute('href')).toBe(CV_DOWNLOAD_URL);
    expect(downloadLink?.getAttribute('download')).toBe('CV_Fabio_Zagaria.pdf');
  });

  it('says when the CV was last updated, with both CV links taken from the same source', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const note = element.querySelector('.c-hero__cv-note');
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('a[href*="CV.pdf"]'));

    expect(note?.textContent).toContain(`CV aggiornato il ${cvUpdatedLabel()}`);
    expect(note?.querySelector('time')?.getAttribute('datetime')).toBe(CV.updatedAt);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([CV_DOWNLOAD_URL, CV_VIEW_URL]);
  });

  it('presents the backend stack as PostgreSQL, the database of the main projects', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const hero = (fixture.nativeElement as HTMLElement).querySelector('.c-hero') as HTMLElement;

    expect(hero.textContent).toContain('PostgreSQL');
    expect(hero.textContent).not.toContain('MySQL');
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

  it('keeps the card short: no technical detail, only a link to the project page', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const details = element.querySelector<HTMLAnchorElement>(
      '#gestionale-spese .c-card__action--details',
    );

    expect(element.querySelector('.c-card__decision')).toBeNull();
    expect(element.querySelector('.c-card__highlights')).toBeNull();
    expect(element.querySelector('.c-card__status-detail')).toBeNull();
    expect(element.querySelector('.c-update-item')).toBeNull();
    expect(element.querySelector('details.c-project-history')).toBeNull();
    expect(element.querySelector('video')).toBeNull();
    expect(details?.getAttribute('href')).toBe('/projects/gestionale-spese');
  });

  it('invites to the projects page with one entry per area, without presenting single projects', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.c-explore__link')).map(
      (link) => link.getAttribute('href'),
    );

    expect(links).toEqual(['/projects#backend-title', '/projects#frontend-title']);
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
});
