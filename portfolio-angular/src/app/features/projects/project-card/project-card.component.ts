import { LoadingImageDirective } from '../../../shared/loading/loading-image.directive';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RichTextPipe } from '../../../shared/rich-text/rich-text.pipe';
import { PortfolioProject, PortfolioScreenshot } from '../../../data/projects.data';
import { PortfolioHistoryEntry, PROJECT_HISTORY } from '../../../data/project-history.data';
import { ProjectFlowComponent } from '../../../shared/project-flow/project-flow.component';
import { ProjectUpdateComponent } from '../../../shared/project-update/project-update.component';
import { VersionTagsComponent } from '../../../shared/version-tags/version-tags.component';
import { RecentBadgeComponent } from '../../../shared/recent-badge/recent-badge.component';
import { latestRepositoryUpdate } from '../../../data/repository-updates.data';

/**
 * Scheda di un progetto principale (full stack o backend, oppure frontend del corso).
 * `summary` (predefinita) è la scheda breve di elenco, usata dalla pagina Progetti e dalla home:
 * titolo, stato, descrizione, tecnologie, un'anteprima e il collegamento alla pagina del progetto.
 * `detail` è la scheda completa, mostrata nella pagina del singolo progetto.
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    RichTextPipe,
    RouterLink,
    LoadingImageDirective,
    ProjectFlowComponent,
    ProjectUpdateComponent,
    RecentBadgeComponent,
    VersionTagsComponent,
  ],
  templateUrl: './project-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly projectInput = input.required<PortfolioProject>({ alias: 'project' });
  readonly mode = input<'summary' | 'detail'>('summary');

  /** Nella scheda breve resta solo la prima anteprima; nel dettaglio le mostra tutte. */
  screenshotsToShow(project: PortfolioProject): readonly PortfolioScreenshot[] {
    const shots = project.screenshots ?? [];
    return this.mode() === 'detail' ? shots : shots.slice(0, 1);
  }

  repositoryUpdate(project: PortfolioProject) {
    return latestRepositoryUpdate(project.repositories, project.latestUpdate);
  }

  /** Dominio della demo online, mostrato nella barra della cornice dello screenshot. */
  hostOf(project: PortfolioProject): string {
    if (!project.liveLink) {
      return '';
    }
    try {
      return new URL(project.liveLink).hostname;
    } catch {
      return '';
    }
  }

  /** Implementazioni importanti del progetto, dalla più recente. */
  history(projectId: string): readonly PortfolioHistoryEntry[] {
    return PROJECT_HISTORY[projectId] ?? [];
  }
}
