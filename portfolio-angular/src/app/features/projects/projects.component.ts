import { SkyComponent } from '../../shared/sky/sky.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioProject, ProjectCategory, PROJECTS } from '../../data/projects.data';
import {
  EXPERIMENTAL_PROJECTS,
  PortfolioCollectionItem,
} from '../../data/project-collections.data';
import { ProjectUpdateComponent } from '../../shared/project-update/project-update.component';
import { RecentBadgeComponent } from '../../shared/recent-badge/recent-badge.component';
import { VersionTagsComponent } from '../../shared/version-tags/version-tags.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { latestRepositoryUpdate } from '../../data/repository-updates.data';

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
    ProjectUpdateComponent,
    RecentBadgeComponent,
    VersionTagsComponent,
    SkyComponent,
    RouterLink,
  ],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  repositoryUpdate(
    repositories: PortfolioCollectionItem['repositories'],
    previousUpdate: PortfolioCollectionItem['latestUpdate'],
  ) {
    return latestRepositoryUpdate(repositories, previousUpdate);
  }

  /**
   * Ordine fisso dei progetti curati nel portfolio.
   */
  readonly sections: readonly ProjectsSection[] = [
    this.projectsSection('full-stack', 'Full Stack', 'Full stack'),
    this.projectsSection('backend', 'Backend', 'Backend'),
    this.projectsSection('frontend', 'Progetti Frontend del Corso', 'Frontend'),
    {
      type: 'collection',
      id: 'sperimentale-ai',
      title: 'Sperimentale con AI',
      description: 'Progetti esplorativi e strumenti di studio con il supporto dell’AI.',
      entries: EXPERIMENTAL_PROJECTS,
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
