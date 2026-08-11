import { PROJECTS } from './projects.data';

describe('portfolio projects', () => {
  it('prioritizes the completed backend project', () => {
    expect(PROJECTS[0].title).toBe('Backend Studenti');
    expect(PROJECTS[0].status).toBe('Completato');
    expect(PROJECTS[0].githubLink).toContain('student-management-api');
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
