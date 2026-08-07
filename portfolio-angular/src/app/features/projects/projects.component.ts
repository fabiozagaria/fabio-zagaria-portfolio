import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioProject, PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly projects: readonly PortfolioProject[] = PROJECTS;
}
