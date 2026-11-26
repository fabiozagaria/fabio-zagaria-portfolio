import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PortfolioProject, PROJECTS } from '../../../data/projects.data';
import { SkyComponent } from '../../../shared/sky/sky.component';
import { ProjectCardComponent } from '../project-card/project-card.component';

/** Identificatore della sezione della pagina Progetti che contiene la categoria. */
const SECTION_BY_CATEGORY = {
  'Full stack': 'full-stack',
  Backend: 'backend',
  Frontend: 'frontend',
} as const;

/**
 * Pagina del singolo progetto: la scheda completa (scelte tecniche, stato reale, video,
 * infografica, ultimo aggiornamento e storico). La rotta `projects/<id>` porta l'id nei dati.
 */
@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [ProjectCardComponent, SkyComponent, RouterLink],
  template: `
    <section class="c-project-detail o-section">
      <app-sky variant="band" />
      <div class="o-container">
        <nav class="c-project-detail__nav" aria-label="Percorso">
          <a routerLink="/projects" [fragment]="sectionId">Tutti i progetti</a>
        </nav>
        <app-project-card [project]="project" mode="detail" />
        <p class="c-project-detail__back">
          <a routerLink="/projects" [fragment]="sectionId">Torna ai progetti</a>
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  readonly project: PortfolioProject = this.findProject();
  readonly sectionId = SECTION_BY_CATEGORY[this.project.category];

  private findProject(): PortfolioProject {
    const id = inject(ActivatedRoute).snapshot.data['projectId'] as string;
    const project = PROJECTS.find((item) => item.id === id);
    if (!project) {
      throw new Error(`Progetto sconosciuto: ${id}`);
    }
    return project as PortfolioProject;
  }
}
