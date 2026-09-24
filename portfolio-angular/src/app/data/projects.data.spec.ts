import { PROJECTS } from './projects.data';

describe('portfolio projects', () => {
  it('includes the active JobFlow project', () => {
    expect(PROJECTS[0].title).toBe('JobFlow');
    expect(PROJECTS[0].status).toBe('In sviluppo');
  });

  it('includes Spring Scaffold CLI as an in-progress Java tool', () => {
    const springScaffold = PROJECTS.find((project) => project.id === 'spring-scaffold-cli');

    expect(springScaffold?.status).toBe('In sviluppo');
    expect(springScaffold?.technologies).toContain('Picocli');
    expect(springScaffold?.repositories?.[0].url).toContain('spring-scaffold-cli');
  });

  it('links both repositories for the expense tracker', () => {
    const expenseTracker = PROJECTS.find((project) => project.id === 'gestionale-spese');

    expect(expenseTracker?.repositories.map((repository) => repository.label)).toEqual([
      'Frontend',
      'Backend',
    ]);
    expect(expenseTracker?.liveLabel).toBe('Demo frontend');
  });

  it('presents LabTV as a working API integration demo', () => {
    const labTv = PROJECTS.find((project) => project.id === 'labtv');

    expect(labTv?.status).toBe('Concluso');
    expect(labTv?.liveLink).toBe('https://lab-tv.vercel.app/');
    expect(labTv?.repositories[0].url).toContain('labtv-angular');
  });

  it('labels Task Manager honestly as a guided learning lab', () => {
    const taskManager = PROJECTS.find((project) => project.id === 'task-manager-security-lab');

    expect(taskManager?.status).toBe('Laboratorio attivo');
    expect(taskManager?.focus).toContain('Laboratorio guidato');
    expect(taskManager?.statusDetail).toContain('non un prodotto ideato autonomamente');
    expect(taskManager?.technologies).toContain('Spring Security');
    expect(taskManager?.technologies).toContain('Hibernate');
  });

  it('keeps the project order intentional', () => {
    expect(PROJECTS.map((project) => project.id)).toEqual([
      'jobflow',
      'spring-scaffold-cli',
      'gestionale-spese',
      'labtv',
      'task-manager-security-lab',
    ]);
  });
});
