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

  it('removes the new badge once the update is older than a week', () => {
    const element = render('2026-11-20T10:00:00+01:00');

    expect(element.querySelectorAll('.c-badge-new')).toHaveLength(0);
  });

  it('keeps the badge for a project updated a few days earlier but not for older ones', () => {
    const element = render('2026-11-08T10:00:00+01:00');
    const flagged = Array.from(element.querySelectorAll('.c-badge-new')).map((badge) =>
      badge.closest('article')?.getAttribute('id'),
    );

    expect(flagged.sort()).toEqual(['gestionale-spese', 'jobflow']);
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

  it('frames each screenshot as a window that shows the demo domain', () => {
    const element = render('2026-11-03T10:00:00+01:00');
    const urls = Array.from(
      element.querySelectorAll('.c-shot:not(.c-shot--flow) .c-shot__url'),
    ).map((url) => url.textContent?.trim());

    expect(urls).toEqual(
      expect.arrayContaining(['gestionale-spese.vercel.app', 'lab-tv.vercel.app']),
    );
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
});
