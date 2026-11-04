import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PortfolioLatestUpdate, PortfolioProject } from '../../../data/projects.data';
import { PortfolioHistoryEntry, PROJECT_HISTORY } from '../../../data/project-history.data';
import { ProjectFlowComponent } from '../../../shared/project-flow/project-flow.component';
import { ProjectUpdateComponent } from '../../../shared/project-update/project-update.component';
import { VersionTagsComponent } from '../../../shared/version-tags/version-tags.component';
import { isRecentUpdate } from '../../../shared/recent-update';

/**
 * Scheda di un progetto principale (full stack o backend, oppure frontend del corso).
 * La usano la pagina Progetti e la home; con `compact` la home omette scelta tecnica,
 * esempio e storico, che restano nella scheda completa.
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [ProjectFlowComponent, ProjectUpdateComponent, VersionTagsComponent],
  templateUrl: './project-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly projectInput = input.required<PortfolioProject>({ alias: 'project' });
  readonly compact = input(false);

  private readonly now = Date.now();

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

  /** Vero se l'ultimo aggiornamento è recente: mostra il badge "Novità". */
  isNew(update: PortfolioLatestUpdate | undefined): boolean {
    return isRecentUpdate(update, this.now);
  }
}
