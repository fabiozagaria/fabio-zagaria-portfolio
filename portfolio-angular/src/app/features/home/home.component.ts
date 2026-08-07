import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
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
      items: ['Git', 'GitHub', 'Vercel', 'VS Code'],
    },
  ] as const;
}
