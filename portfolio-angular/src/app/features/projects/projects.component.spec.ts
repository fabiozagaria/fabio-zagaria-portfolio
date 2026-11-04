import { TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProjectsComponent] }).compileComponents();
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

  it('flags projects with a recent update as new', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const flagged = Array.from(element.querySelectorAll('.c-badge-new')).map((badge) =>
      badge.closest('article')?.getAttribute('id'),
    );

    expect(flagged.sort()).toEqual(['accessdesk', 'gestionale-spese', 'jobflow']);
    expect(element.querySelector('.c-badge-new')?.textContent).toContain('Novità');
  });

  it('removes the new badge once the update is older than three days', () => {
    const element = render('2026-11-10T10:00:00+01:00');

    expect(element.querySelectorAll('.c-badge-new')).toHaveLength(0);
  });

  it('keeps the badge for a project updated a few days earlier but not for older ones', () => {
    const element = render('2026-11-05T10:00:00+01:00');
    const flagged = Array.from(element.querySelectorAll('.c-badge-new')).map((badge) =>
      badge.closest('article')?.getAttribute('id'),
    );

    expect(flagged.sort()).toEqual(['gestionale-spese']);
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

  it('draws the learning-ledger flow in the AI plugins section, with its repository', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const steps = element.querySelectorAll('#learning-ledger .c-flow__step');

    expect(steps).toHaveLength(6);
    expect(steps[2].textContent).toContain('ledger.py');
    expect(element.querySelector('#learning-ledger .c-shot__note')?.textContent).toContain(
      'in locale',
    );
    expect(
      element.querySelector<HTMLAnchorElement>('#learning-ledger .c-card__action')?.href,
    ).toContain('github.com/fabiozagaria/learning-ledger');
  });

  it('groups the two Claude Code plugins in their own section, apart from the experiments', () => {
    const element = render('2026-11-04T10:00:00+01:00');
    const section = element.querySelector('[aria-labelledby="plugin-skill-ai-title"]');
    const experiments = element.querySelector('[aria-labelledby="sperimentale-ai-title"]');

    expect(section?.querySelector('h2')?.textContent).toContain('Plugin e Skill AI');
    expect([...(section?.querySelectorAll('article') ?? [])].map((a) => a.id)).toEqual([
      'learning-ledger',
      'spring-security-advisor',
    ]);
    expect(experiments?.querySelector('#learning-ledger')).toBeNull();
  });

  it('draws the spring-security-advisor flow and marks the planned step', () => {
    const element = render('2026-11-04T10:00:00+01:00');

    expect(element.querySelectorAll('#spring-security-advisor .c-flow__step')).toHaveLength(5);
    expect(
      element.querySelectorAll('#spring-security-advisor .c-flow__step[data-pending="true"]'),
    ).toHaveLength(1);
    expect(element.querySelector('#spring-security-advisor .c-shot__note')?.textContent).toContain(
      'pianificati, non realizzati',
    );
    expect(
      element.querySelector<HTMLAnchorElement>('#spring-security-advisor .c-card__action')?.href,
    ).toContain('github.com/fabiozagaria/spring-security-advisor');
  });

  it('shows each latest update as chips: API before frontend, backends and plugins with their own kind', () => {
    const element = render('2026-11-04T10:00:00+01:00');
    const kinds = (id: string) =>
      Array.from(element.querySelectorAll<HTMLElement>(`#${id} .c-update-item`)).map(
        (item) => item.dataset['kind'],
      );

    expect(kinds('gestionale-spese')).toEqual(['API', 'Frontend']);
    expect(kinds('jobflow')).toEqual(['Backend']);
    expect(kinds('accessdesk')).toEqual(['Backend']);
    expect(kinds('learning-ledger')).toEqual(['Plugin']);
    expect(kinds('spring-security-advisor')).toEqual(['Plugin']);
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

    expect(tags('gestionale-spese')).toEqual(['Frontend:v1.0.2', 'API:v1.0.2']);
    expect(tags('jobflow')).toEqual(['Backend:v0.1.0-alpha.1']);
    expect(tags('accessdesk')).toEqual(['Backend:v0.1.0-alpha.1']);
    expect(tags('learning-ledger')).toEqual(['Plugin:0.2.0']);
    expect(tags('spring-security-advisor')).toEqual(['Plugin:0.1.0']);
    expect(tags('labtv')).toEqual([]);
    const link = element.querySelector<HTMLAnchorElement>('#gestionale-spese .c-vtag a');
    expect(link?.href).toBe('https://github.com/fabiozagaria/expense-tracker-angular/tree/v1.0.2');
    expect(link?.getAttribute('aria-label')).toMatch(/^Frontend v1\.0\.2/);
  });

  it('orders the sections: full stack, backend, plugins, course frontend, experiments, exercises', () => {
    const element = render('2026-11-04T10:00:00+01:00');
    const titles = Array.from(element.querySelectorAll('h2.c-projects__group-title')).map((title) =>
      title.textContent?.trim(),
    );

    expect(titles).toEqual([
      'Full Stack',
      'Backend',
      'Plugin e Skill AI',
      'Progetti Frontend del Corso',
      'Sperimentale con AI',
      'Esercizi',
    ]);
  });
});
