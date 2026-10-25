import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioProject, ProjectCategory, PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly groups = (
    [
      { category: 'Full stack', title: 'Full stack', id: 'full-stack' },
      { category: 'Backend', title: 'Backend', id: 'backend' },
      { category: 'Frontend', title: 'Progetti frontend del corso', id: 'frontend' },
    ] as const satisfies readonly { category: ProjectCategory; title: string; id: string }[]
  ).map((group) => ({
    ...group,
    projects: PROJECTS.filter(
      (project) => project.category === group.category && project.status !== 'Laboratorio attivo',
    ) as readonly PortfolioProject[],
  }));
  readonly labs: readonly PortfolioProject[] = PROJECTS.filter(
    (project) => project.category === 'Backend' && project.status === 'Laboratorio attivo',
  );
}
