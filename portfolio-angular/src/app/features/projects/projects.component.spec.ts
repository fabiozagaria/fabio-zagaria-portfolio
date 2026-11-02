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
});
