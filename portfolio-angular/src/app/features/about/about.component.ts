import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly projectCount = PROJECTS.length;
}
