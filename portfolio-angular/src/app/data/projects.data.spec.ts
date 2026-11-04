import { PortfolioProject, PROJECTS } from './projects.data';
import { EXERCISE_COLLECTIONS, EXPERIMENTAL_PROJECTS } from './project-collections.data';
import { PROJECT_HISTORY } from './project-history.data';

describe('project history', () => {
  const projects: readonly PortfolioProject[] = PROJECTS;
  const mainProjects = ['gestionale-spese', 'jobflow', 'accessdesk'];

  it('covers the three main projects only', () => {
    expect(Object.keys(PROJECT_HISTORY).sort()).toEqual([...mainProjects].sort());
  });

  it('lists entries newest first with real commit links', () => {
    for (const id of mainProjects) {
      const entries = PROJECT_HISTORY[id];
      const times = entries.map((entry) => Date.parse(entry.datetime));

      expect(entries.length).toBeGreaterThan(0);
      expect(times.every((time) => !Number.isNaN(time))).toBe(true);
      expect(times).toEqual([...times].sort((a, b) => b - a));
      for (const entry of entries) {
        expect(entry.sources.length).toBeGreaterThan(0);
        for (const source of entry.sources) {
          expect(source.url).toMatch(
            /^https:\/\/github\.com\/fabiozagaria\/[\w.-]+\/commit\/[0-9a-f]{40}$/,
          );
        }
      }
    }
  });

  it('keeps the history at least as recent as each latest update', () => {
    for (const id of mainProjects) {
      const project = projects.find((item) => item.id === id);
      const newest = PROJECT_HISTORY[id][0];

      expect(project?.latestUpdate?.datetime).toBeDefined();
      // latestUpdate.datetime è una data (fuso Europe/Rome), la storia ha data e ora con offset.
      expect(newest.datetime.slice(0, 10) >= (project?.latestUpdate?.datetime ?? '')).toBe(true);
    }
  });

  it('records the asynchronous JobFlow worker as the latest JobFlow update', () => {
    const jobFlow = projects.find((project) => project.id === 'jobflow');

    expect(jobFlow?.latestUpdate?.datetime).toBe('2026-11-01');
    expect(jobFlow?.latestUpdate?.sources[0].url).toContain('44a2527');
    expect(PROJECT_HISTORY['jobflow'][0].sources[0].url).toContain('44a2527');
  });
});

describe('portfolio projects', () => {
  it('includes the active JobFlow project', () => {
    const jobFlow = PROJECTS.find((project) => project.id === 'jobflow');
    expect(jobFlow?.status).toBe('In sviluppo');
  });

  it('includes Spring Scaffold CLI among the experimental Java tools', () => {
    const springScaffold = EXPERIMENTAL_PROJECTS.find(
      (project) => project.id === 'spring-scaffold-cli',
    );

    expect(springScaffold?.note).toContain('MVP disponibile');
    expect(springScaffold?.technologies).toContain('Picocli');
    expect(springScaffold?.repositories?.[0].url).toContain('spring-scaffold-cli');
  });

  it('links both repositories for the expense tracker', () => {
    const expenseTracker = PROJECTS.find((project) => project.id === 'gestionale-spese');

    expect(expenseTracker?.repositories.map((repository) => repository.label)).toEqual([
      'Frontend',
      'Backend',
    ]);
    expect(expenseTracker?.liveLabel).toBe('Demo full stack');
    expect(expenseTracker?.status).toBe('Concluso');
  });

  it('presents LabTV as a working API integration demo', () => {
    const labTv = PROJECTS.find((project) => project.id === 'labtv');

    expect(labTv?.status).toBe('Concluso');
    expect(labTv?.liveLink).toBe('https://lab-tv.vercel.app/');
    expect(labTv?.repositories[0].url).toContain('labtv-angular');
  });

  it('labels Task Manager honestly as a guided learning lab', () => {
    const taskManager = EXERCISE_COLLECTIONS.find(
      (project) => project.id === 'task-manager-security-lab',
    );

    expect(taskManager?.description).toContain('Laboratorio guidato');
    expect(taskManager?.note).toContain('restano da completare');
    expect(taskManager?.technologies).toContain('Spring Security');
    expect(taskManager?.technologies).toContain('Hibernate');
  });

  it('keeps the project order intentional', () => {
    expect(PROJECTS.map((project) => project.id)).toEqual([
      'gestionale-spese',
      'jobflow',
      'accessdesk',
      'labtv',
      'fakeflix',
      'portfolio',
    ]);
  });
});
