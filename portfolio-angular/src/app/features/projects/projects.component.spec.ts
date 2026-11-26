import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EXPERIMENTAL_PROJECTS } from '../../data/project-collections.data';
import { PROJECTS } from '../../data/projects.data';
import repositories from '../../data/portfolio-repositories.json';
import { REPOSITORY_UPDATES } from '../../data/repository-updates.data';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function render(isoNow: string): HTMLElement {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(isoNow));
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  function timeAtUpdateAge(datetime: string, days: number): string {
    const date = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Rome',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(new Date(datetime))
      .split('-')
      .map(Number);
    return new Date(Date.UTC(date[0], date[1] - 1, date[2] + days, 12)).toISOString();
  }

  function timeAtRepositoryAge(repository: string, days: number): string {
    const update = REPOSITORY_UPDATES.find((item) => item.repository === repository);
    if (!update) throw new Error(`Nessun commit di test per ${repository}`);
    return timeAtUpdateAge(update.datetime, days);
  }

  function projectUpdateTime(repositories: readonly string[], days: number): string {
    const latestDatetime = Math.max(
      ...repositories.map((repository) => {
        const update = REPOSITORY_UPDATES.find((item) => item.repository === repository);
        if (!update) throw new Error(`Nessun commit di test per ${repository}`);
        return Date.parse(update.datetime);
      }),
    );
    return timeAtUpdateAge(new Date(latestDatetime).toISOString(), days);
  }

  it('shows the history button only for the three main projects', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const histories = Array.from(element.querySelectorAll('details.c-project-history'));

    expect(histories).toHaveLength(3);
    expect(
      histories.map((history) => history.closest('article')?.getAttribute('id')).sort(),
    ).toEqual(['accessdesk', 'gestionale-spese', 'jobflow']);
    for (const history of histories) {
      expect(history.querySelector('summary')?.textContent).toContain('Implementazioni importanti');
      expect(history.querySelectorAll('li').length).toBeGreaterThan(0);
    }
  });

  it('shows the backend video only on the full Expense Tracker card, never autoplaying', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const videos = element.querySelectorAll('video');
    const video = element.querySelector<HTMLVideoElement>('#gestionale-spese video');

    expect(videos).toHaveLength(1);
    expect(video?.hasAttribute('controls')).toBe(true);
    expect(video?.hasAttribute('autoplay')).toBe(false);
    expect(video?.getAttribute('preload')).toBe('none');
    expect(video?.getAttribute('poster')).toBe(
      '/assets/img/project-expense-tracker-backend-video.webp',
    );
    expect(video?.querySelector('source')?.getAttribute('src')).toBe(
      '/assets/video/expense-tracker-backend.mp4',
    );
    expect(video?.getAttribute('aria-label')).toContain('1 minuto e 15 secondi');
    // Alternativa testuale e dichiarazione dello strumento accanto al video.
    expect(element.querySelectorAll('#gestionale-spese .c-video__text li')).toHaveLength(4);
    expect(element.querySelector('#gestionale-spese .c-video__note')?.textContent).toContain(
      'Gemini Notebook',
    );
  });

  it('shows the API flow map only on the full Expense Tracker card, with a text alternative', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const maps = element.querySelectorAll('.c-diagram');
    const map = element.querySelector('#gestionale-spese .c-diagram');
    const link = map?.querySelector<HTMLAnchorElement>('a.c-diagram__frame');
    const image = map?.querySelector<HTMLImageElement>('img');

    expect(maps).toHaveLength(1);
    expect(map?.querySelector('h4')?.textContent).toContain('Mappa del flusso API');
    expect(link?.getAttribute('href')).toBe('/assets/img/project-expense-tracker-flusso-api.webp');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toContain('noopener');
    expect(image?.getAttribute('alt')?.length).toBeGreaterThan(80);
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.getAttribute('width')).toBe('1116');
    expect(image?.getAttribute('height')).toBe('2000');
    // Le cinque tappe sono anche testo, nell'ordine dell'immagine.
    const steps = Array.from(map?.querySelectorAll('.c-diagram__text li') ?? []).map(
      (item) => item.textContent ?? '',
    );
    expect(steps).toHaveLength(5);
    expect(steps[0]).toContain('/auth/login');
    expect(steps[4]).toContain('PostgreSQL');
    expect(map?.querySelector('.c-diagram__note')?.textContent).toContain('Gemini Notebook');
  });

  it('gives a role to every element that carries an aria-label', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const unnamed = element.querySelectorAll(
      'div[aria-label]:not([role]), span[aria-label]:not([role]), p[aria-label]:not([role])',
    );
    expect(unnamed).toHaveLength(0);
  });

  it('flags projects with a recent update as new', () => {
    const element = render(timeAtRepositoryAge('job-flow', 0));
    const flagged = Array.from(element.querySelectorAll('.c-badge-new')).map((badge) =>
      badge.closest('article')?.getAttribute('id'),
    );

    expect(flagged).toContain('jobflow');
    expect(element.querySelector('#jobflow .c-badge-new')?.textContent).toContain('Commit recente');
  });

  it('removes the new badge once the update is older than three days', () => {
    const element = render(timeAtRepositoryAge('job-flow', 4));

    expect(element.querySelectorAll('.c-badge-new')).toHaveLength(0);
  });

  it('keeps the badge until the third day after the latest commit', () => {
    const element = render(timeAtRepositoryAge('job-flow', 3));
    expect(element.querySelector('#jobflow .c-badge-new')).not.toBeNull();
    expect(
      render(timeAtRepositoryAge('job-flow', 4)).querySelector('#jobflow .c-badge-new'),
    ).toBeNull();
  });

  it('renders a screenshot with its size and alternative text when a project has one', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const shots = Array.from(element.querySelectorAll<HTMLImageElement>('.c-card__shot img'));

    expect(shots.length).toBeGreaterThan(0);
    for (const shot of shots) {
      expect(shot.getAttribute('alt')?.length).toBeGreaterThan(20);
      expect(Number(shot.getAttribute('width'))).toBeGreaterThan(0);
      expect(Number(shot.getAttribute('height'))).toBeGreaterThan(0);
      expect(shot.getAttribute('loading')).toBe('lazy');
    }
  });

  it('frames each screenshot as a window that shows the demo domain and page', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const urls = Array.from(
      element.querySelectorAll('.c-shot:not(.c-shot--flow) .c-shot__url'),
    ).map((url) => url.textContent?.trim());

    expect(urls).toEqual(
      expect.arrayContaining([
        'gestionale-spese.vercel.app/',
        'gestionale-spese.vercel.app/dashboard',
        'gestionale-spese.vercel.app/login',
        'lab-tv.vercel.app/catalogo',
        'lab-tv.vercel.app/ricerca',
      ]),
    );
  });

  it('shows every supplied screenshot, each one opening the full image', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const count = (id: string): number => element.querySelectorAll(`#${id} .c-shot__frame`).length;

    expect(count('gestionale-spese')).toBe(4);
    expect(count('labtv')).toBe(3);
    expect(count('fakeflix')).toBe(2);
    expect(count('portfolio')).toBe(1);
    for (const link of Array.from(element.querySelectorAll<HTMLAnchorElement>('.c-shot__frame'))) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.querySelector('.u-visually-hidden')?.textContent).toContain('nuova scheda');
    }
  });

  it('draws a flow diagram for the backend projects, marking unfinished steps', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const jobflow = element.querySelectorAll('#jobflow .c-flow__step');
    const accessdesk = element.querySelectorAll('#accessdesk .c-flow__step');

    expect(jobflow).toHaveLength(6);
    expect(element.querySelectorAll('#jobflow .c-flow__step[data-pending="true"]')).toHaveLength(1);
    expect(jobflow[4].textContent).toContain('PROCESSING');
    expect(accessdesk).toHaveLength(5);
    expect(element.querySelector('#accessdesk .c-shot__note')?.textContent).toContain(
      'restano da completare',
    );
  });

  it('shows each latest update as chips: API before frontend and backends with their own kind', () => {
    const element = render('2026-11-04T10:00:00+01:00');
    const kinds = (id: string) =>
      Array.from(element.querySelectorAll<HTMLElement>(`#${id} .c-update-item`)).map(
        (item) => item.dataset['kind'],
      );

    expect(kinds('gestionale-spese')).toEqual(['API', 'Frontend']);
    expect(kinds('jobflow')).toEqual(['Backend']);
    expect(kinds('accessdesk')).toEqual(['Backend']);
    expect(element.querySelector('#jobflow .c-update-item__version')?.textContent).toContain(
      'v0.1.0-alpha.1',
    );
  });

  it('shows every project tag as a two-segment badge with its colour and a link to that version', () => {
    const element = render('2026-11-04T10:00:00+01:00');
    const tags = (id: string) =>
      Array.from(element.querySelectorAll<HTMLElement>(`#${id} .c-vtag`)).map(
        (tag) => `${tag.dataset['kind']}:${tag.querySelector('.c-vtag__value')?.textContent}`,
      );

    expect(tags('gestionale-spese')).toEqual(['Frontend:v1.2.0', 'API:v1.3.0']);
    expect(tags('jobflow')).toEqual(['Backend:v0.1.0-alpha.1']);
    expect(tags('accessdesk')).toEqual(['Backend:v0.1.0-alpha.1']);
    expect(tags('labtv')).toEqual([]);
    const link = element.querySelector<HTMLAnchorElement>('#gestionale-spese .c-vtag a');
    expect(link?.href).toBe(
      'https://github.com/fabiozagaria/expense-tracker-angular/releases/tag/v1.2.0',
    );
    expect(link?.getAttribute('aria-label')).toMatch(/^Frontend v1\.2\.0/);
  });

  it('orders the curated sections and links the index to their Angular fragments', () => {
    const element = render('2026-11-04T10:00:00+01:00');
    const titles = Array.from(element.querySelectorAll('h2.c-projects__group-title')).map((title) =>
      title.textContent?.trim(),
    );

    expect(titles).toEqual([
      'Full Stack',
      'Backend',
      'Progetti Frontend del Corso',
      'Sperimentale con AI',
    ]);

    const indexLinks = Array.from(
      element.querySelectorAll<HTMLAnchorElement>('.c-projects__index a'),
    );
    expect(indexLinks).toHaveLength(titles.length);
    expect(indexLinks.map((link) => link.textContent?.trim())).toEqual(titles);
    expect(indexLinks.map((link) => link.getAttribute('href'))).toEqual([
      '/projects#full-stack',
      '/projects#backend',
      '/projects#frontend',
      '/projects#sperimentale-ai',
    ]);
    for (const link of indexLinks) {
      expect(element.querySelector(`#${link.hash.slice(1)}`)).not.toBeNull();
    }
    expect(element.querySelector('.c-projects__index-return')?.getAttribute('href')).toBe(
      '/projects#projects-index',
    );
    expect(element.querySelector('#plugin-skill-ai')).toBeNull();
    expect(element.querySelector('#esercizi')).toBeNull();
  });

  it('queries only the curated repository list in the same order as the project cards', () => {
    const projectRepositories = [
      ...PROJECTS.filter((project) => project.category !== 'Frontend'),
      ...PROJECTS.filter((project) => project.category === 'Frontend' && project.id !== 'portfolio'),
      ...EXPERIMENTAL_PROJECTS,
    ].flatMap((project) =>
      project.repositories?.map((repository) => {
        return repository.url.replace(/\/$/, '').split('/').at(-1);
      }) ?? [],
    );
    const curatedRepositories = repositories.map((repository) => repository.repository);

    expect(curatedRepositories).toEqual(projectRepositories);
    expect(curatedRepositories).toHaveLength(new Set(curatedRepositories).size);
  });

  it('says how long ago the latest commit was: today, yesterday, N days ago', () => {
    const badge = (now: string) =>
      render(now)
        .querySelector('#gestionale-spese .c-badge-new')
        ?.textContent?.replace(/\s+/g, ' ')
        .trim();

    const expenseTrackerRepos = ['expense-tracker-api', 'expense-tracker-angular'];
    expect(badge(projectUpdateTime(expenseTrackerRepos, 0))).toBe('Commit recente oggi');
    expect(badge(projectUpdateTime(expenseTrackerRepos, 1))).toBe('Commit recente ieri');
    expect(badge(projectUpdateTime(expenseTrackerRepos, 2))).toBe('Commit recente 2 giorni fa');
    expect(badge(projectUpdateTime(expenseTrackerRepos, 3))).toBe('Commit recente 3 giorni fa');
  });

  it('does not flag an update dated in the future', () => {
    const element = render(timeAtRepositoryAge('job-flow', -1));

    expect(element.querySelector('#jobflow .c-badge-new')).toBeNull();
  });
});
