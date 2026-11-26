import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkyComponent } from '../../shared/sky/sky.component';
import { WordHighlightDirective } from '../../shared/sky/word-highlight.directive';
import {
  CV,
  CV_DOWNLOAD_NAME,
  CV_DOWNLOAD_URL,
  CV_VIEW_URL,
  cvUpdatedLabel,
} from '../../data/cv.data';
import { PROJECTS, type PortfolioProject } from '../../data/projects.data';
import { ProjectCardComponent } from '../projects/project-card/project-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SkyComponent, WordHighlightDirective, ProjectCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly cv = {
    view: CV_VIEW_URL,
    download: CV_DOWNLOAD_URL,
    downloadName: CV_DOWNLOAD_NAME,
    updatedAt: CV.updatedAt,
    updatedLabel: cvUpdatedLabel(),
  };
  readonly mainProject: PortfolioProject = PROJECTS[0];
  /** Aree della pagina Progetti, con il numero di schede lette dai dati. */
  readonly areas: readonly { id: string; title: string; text: string; count: number }[] = [
    {
      id: 'backend',
      title: 'Backend',
      text: 'API REST con persistenza e sicurezza, con Java e Spring Boot.',
      count: PROJECTS.filter((project) => project.category === 'Backend').length,
    },
    {
      id: 'frontend',
      title: 'Progetti del corso',
      text: 'Progetti frontend realizzati durante il corso, con demo online dove disponibile.',
      count: PROJECTS.filter((project) => project.category === 'Frontend').length,
    },
  ];
}
