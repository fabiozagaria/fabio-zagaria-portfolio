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
import { VersionTagsComponent } from '../../shared/version-tags/version-tags.component';
import { ProjectCardComponent } from './project-card/project-card.component';

type ProjectsSection =
  | {
      readonly type: 'projects';
      readonly id: string;
      readonly title: string;
      readonly category: ProjectCategory;
      readonly projects: readonly PortfolioProject[];
    }
  | {
      readonly type: 'collection';
      readonly id: string;
      readonly title: string;
      readonly description: string;
      readonly entries: readonly PortfolioCollectionItem[];
    };

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ProjectCardComponent,
    ProjectFlowComponent,
    ProjectUpdateComponent,
    VersionTagsComponent,
  ],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  /**
   * Ordine della pagina: Full Stack, Backend, Plugin e Skill AI, Progetti Frontend del Corso,
   * Sperimentale con AI, Esercizi.
   */
  readonly sections: readonly ProjectsSection[] = [
    this.projectsSection('full-stack', 'Full Stack', 'Full stack'),
    this.projectsSection('backend', 'Backend', 'Backend'),
    {
      type: 'collection',
      id: 'plugin-skill-ai',
      title: 'Plugin e Skill AI',
      description:
        'Plugin per Claude Code in cui il modello ragiona e uno script Python verifica, così i risultati si possono ripetere e controllare.',
      entries: AI_PLUGINS,
    },
    this.projectsSection('frontend', 'Progetti Frontend del Corso', 'Frontend'),
    {
      type: 'collection',
      id: 'sperimentale-ai',
      title: 'Sperimentale con AI',
      description: 'Progetti esplorativi e strumenti di studio con il supporto dell’AI.',
      entries: EXPERIMENTAL_PROJECTS,
    },
    {
      type: 'collection',
      id: 'esercizi',
      title: 'Esercizi',
      description:
        'Raccolte di studio e materiali del corso, consultabili nei repository dedicati.',
      entries: EXERCISE_COLLECTIONS,
    },
  ];

  private projectsSection(id: string, title: string, category: ProjectCategory): ProjectsSection {
    return {
      type: 'projects',
      id,
      title,
      category,
      projects: PROJECTS.filter(
        (project) => project.category === category,
      ) as readonly PortfolioProject[],
    };
  }
}
