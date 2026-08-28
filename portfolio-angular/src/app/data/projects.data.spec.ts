import { PROJECTS } from './projects.data';

describe('portfolio projects', () => {
  it('prioritizes the full stack expense tracker', () => {
    expect(PROJECTS[0].title).toBe('Gestionale Spese');
    expect(PROJECTS[0].status).toBe('In sviluppo');
    expect(PROJECTS[0].statusDetail).toContain('CRUD');
  });

  it('links both repositories for the expense tracker', () => {
    const expenseTracker = PROJECTS.find((project) => project.id === 'gestionale-spese');

    expect(expenseTracker?.repositories.map((repository) => repository.label)).toEqual([
      'Frontend',
      'Backend',
    ]);
    expect(expenseTracker?.liveLabel).toBe('Demo UI');
  });

  it('presents LabTV as a working API integration demo', () => {
    const labTv = PROJECTS.find((project) => project.id === 'labtv');

    expect(labTv?.status).toBe('Demo funzionante');
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

  it('shows two recruiter-facing projects and one explicit study lab', () => {
    expect(PROJECTS.map((project) => project.id)).toEqual([
      'gestionale-spese',
      'labtv',
      'task-manager-security-lab',
    ]);
  });
});
