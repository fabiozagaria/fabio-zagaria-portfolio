import { PROJECTS } from './projects.data';

describe('portfolio projects', () => {
  it('prioritizes the completed backend project', () => {
    expect(PROJECTS[0].title).toBe('Backend Studenti');
    expect(PROJECTS[0].status).toBe('Completato');
    expect(PROJECTS[0].repositories[0].url).toContain('student-management-api');
  });

  it('links both repositories for the expense tracker', () => {
    const expenseTracker = PROJECTS.find((project) => project.id === 'gestionale-spese');

    expect(expenseTracker?.repositories.map((repository) => repository.label)).toEqual([
      'Frontend',
      'Backend',
    ]);
  });

  it('marks LabTV as suspended until the expense tracker is completed', () => {
    const labTv = PROJECTS.find((project) => project.id === 'lab-tv');

    expect(labTv?.status).toBe('Sospeso');
    expect(labTv?.description).toContain('Gestionale Spese');
  });

  it('shows only the strongest standalone projects', () => {
    expect(PROJECTS.map((project) => project.id)).toEqual([
      'backend-studenti',
      'gestionale-spese',
      'lab-tv',
      'fakeflix',
    ]);
  });
});
