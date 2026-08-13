import { PROJECTS } from './projects.data';

describe('portfolio projects', () => {
  it('prioritizes the completed backend MVP', () => {
    expect(PROJECTS[0].title).toBe('Student Management API');
    expect(PROJECTS[0].status).toBe('MVP completato');
    expect(PROJECTS[0].repositories[0].url).toContain('student-management-api');
  });

  it('links both repositories for the expense tracker', () => {
    const expenseTracker = PROJECTS.find((project) => project.id === 'gestionale-spese');

    expect(expenseTracker?.repositories.map((repository) => repository.label)).toEqual([
      'Frontend',
      'Backend',
    ]);
  });

  it('labels the expense tracker demo as frontend-only', () => {
    const expenseTracker = PROJECTS.find((project) => project.id === 'gestionale-spese');

    expect(expenseTracker?.liveLabel).toBe('Demo frontend');
    expect(expenseTracker?.statusDetail).toContain('dati dimostrativi');
  });

  it('shows only the two strongest recruiter-facing projects', () => {
    expect(PROJECTS.map((project) => project.id)).toEqual([
      'student-management-api',
      'gestionale-spese',
    ]);
  });
});
