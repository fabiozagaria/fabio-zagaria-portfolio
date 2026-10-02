import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS, type PortfolioProject } from '../../data/projects.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly mainProject: PortfolioProject = PROJECTS[0];
  readonly featuredProjects: readonly PortfolioProject[] = PROJECTS.filter(
    (project) => project.id !== this.mainProject.id && project.status !== 'Laboratorio attivo',
  );
}
