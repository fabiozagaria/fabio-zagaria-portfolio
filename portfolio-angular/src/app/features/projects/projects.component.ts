import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioProject, ProjectCategory, PROJECTS } from '../../data/projects.data';
import {
  EXERCISE_COLLECTIONS,
  EXPERIMENTAL_PROJECTS,
  PortfolioCollectionItem,
} from '../../data/project-collections.data';

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
      (project) => project.category === group.category,
    ) as readonly PortfolioProject[],
  }));
  readonly supplementaryGroups: readonly {
    id: string;
    title: string;
    description: string;
    entries: readonly PortfolioCollectionItem[];
  }[] = [
    {
      id: 'sperimentale-ai',
      title: 'Sperimentale con AI',
      description: 'Progetti esplorativi e strumenti di studio con il supporto dell’AI.',
      entries: EXPERIMENTAL_PROJECTS,
    },
    {
      id: 'esercizi',
      title: 'Esercizi',
      description:
        'Raccolte di studio e materiali del corso, consultabili nei repository dedicati.',
      entries: EXERCISE_COLLECTIONS,
    },
  ];
}
