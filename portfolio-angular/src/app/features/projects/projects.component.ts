import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioProject, ProjectCategory, PROJECTS } from '../../data/projects.data';
import {
  AI_PLUGINS,
  EXERCISE_COLLECTIONS,
  EXPERIMENTAL_PROJECTS,
  PortfolioCollectionItem,
} from '../../data/project-collections.data';
import { ProjectFlowComponent } from '../../shared/project-flow/project-flow.component';
import { ProjectUpdateComponent } from '../../shared/project-update/project-update.component';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent, ProjectFlowComponent, ProjectUpdateComponent],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly groups = (
    [
      { category: 'Full stack', title: 'Full Stack', id: 'full-stack' },
      { category: 'Backend', title: 'Backend', id: 'backend' },
      { category: 'Frontend', title: 'Progetti Frontend del Corso', id: 'frontend' },
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
      id: 'plugin-skill-ai',
      title: 'Plugin e Skill AI',
      description:
        'Plugin per Claude Code in cui il modello ragiona e uno script Python verifica, così i risultati si possono ripetere e controllare.',
      entries: AI_PLUGINS,
    },
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
