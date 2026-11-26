import { TranslatePipe, PortfolioDatePipe } from '../../core/translate.pipe';
import { RichTextPipe } from '../../shared/rich-text/rich-text.pipe';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkyComponent } from '../../shared/sky/sky.component';
import { WordHighlightDirective } from '../../shared/sky/word-highlight.directive';
import { LanguageService } from '../../core/language.service';
import { CV_DOCUMENTS } from '../../data/cv.data';
import { PROJECTS, type PortfolioProject } from '../../data/projects.data';
import { ProjectCardComponent } from '../projects/project-card/project-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslatePipe,
    PortfolioDatePipe,
    RichTextPipe,
    RouterLink,
    SkyComponent,
    WordHighlightDirective,
    ProjectCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly language = inject(LanguageService);
  protected readonly cvDocument = computed(() => CV_DOCUMENTS[this.language.current()]);
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
