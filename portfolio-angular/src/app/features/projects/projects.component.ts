import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PortfolioLatestUpdate,
  PortfolioProject,
  ProjectCategory,
  PROJECTS,
} from '../../data/projects.data';
import {
  EXERCISE_COLLECTIONS,
  EXPERIMENTAL_PROJECTS,
  PortfolioCollectionItem,
} from '../../data/project-collections.data';
import { PortfolioHistoryEntry, PROJECT_HISTORY } from '../../data/project-history.data';

const DAY_MS = 24 * 60 * 60 * 1000;
/** Il badge "Novità" resta visibile per 7 giorni dopo la data dell'aggiornamento. */
export const NEW_UPDATE_WINDOW_DAYS = 7;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  private readonly now = Date.now();

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
    if (!update) {
      return false;
    }
    const updatedAt = Date.parse(update.datetime);
    if (Number.isNaN(updatedAt)) {
      return false;
    }
    return this.now - updatedAt < (NEW_UPDATE_WINDOW_DAYS + 1) * DAY_MS;
  }
}
