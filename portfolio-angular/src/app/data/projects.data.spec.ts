import { PROJECTS } from './projects.data';
import { EXERCISE_COLLECTIONS, EXPERIMENTAL_PROJECTS } from './project-collections.data';

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
