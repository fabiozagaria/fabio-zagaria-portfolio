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
  readonly skills = [
    {
      category: 'Backend',
      items: ['Java', 'Spring Boot', 'Spring JDBC', 'MySQL', 'REST API'],
    },
    {
      category: 'Frontend',
      items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      category: 'Strumenti',
      items: ['Git', 'GitHub', 'Maven', 'Vercel'],
    },
  ] as const;

  readonly featuredProjects: readonly PortfolioProject[] = PROJECTS;
}
