import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkyComponent } from '../../shared/sky/sky.component';
import { AI_PLUGINS } from '../../data/project-collections.data';
import { PROJECTS, type PortfolioProject } from '../../data/projects.data';
import { ProjectCardComponent } from '../projects/project-card/project-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SkyComponent, ProjectCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
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
      id: 'plugin-skill-ai',
      title: 'Plugin e Skill AI',
      text: 'Plugin per Claude Code: il modello ragiona e uno script Python verifica.',
      count: AI_PLUGINS.length,
    },
    {
      id: 'frontend',
      title: 'Progetti del corso',
      text: 'Progetti frontend realizzati durante il corso, con demo online dove disponibile.',
      count: PROJECTS.filter((project) => project.category === 'Frontend').length,
    },
  ];
}
