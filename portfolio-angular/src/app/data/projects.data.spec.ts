import { PROJECTS } from './projects.data';

describe('portfolio projects', () => {
  it('prioritizes the current backend project', () => {
    expect(PROJECTS[0].title).toBe('Backend Studenti');
    expect(PROJECTS[0].status).toBe('In corso');
  });

  it('marks the LabForWeb course project as completed on 7 August 2026', () => {
    const labForWeb = PROJECTS.find((project) => project.id === 'labforweb');

    expect(labForWeb?.status).toBe('Completato');
    expect(labForWeb?.description).toContain('7 agosto 2026');
  });
});
