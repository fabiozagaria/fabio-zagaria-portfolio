import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/translate.pipe';
import intelligenzaUmana from '../../data/intelligenza-umana-repositories.json';
import type { PortfolioLatestUpdate } from '../../data/projects.data';
import { REPOSITORY_UPDATES } from '../../data/repository-updates.data';
import { ProjectUpdateComponent } from '../../shared/project-update/project-update.component';
import { RichTextPipe } from '../../shared/rich-text/rich-text.pipe';
import { SkyComponent } from '../../shared/sky/sky.component';

@Component({
  selector: 'app-intelligenza-umana',
  standalone: true,
  imports: [TranslatePipe, RichTextPipe, RouterLink, ProjectUpdateComponent, SkyComponent],
  templateUrl: './intelligenza-umana.component.html',
  styleUrl: './intelligenza-umana.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntelligenzaUmanaComponent {
  protected readonly repositoryUpdates: Readonly<Partial<Record<string, PortfolioLatestUpdate>>> =
    Object.fromEntries(
      REPOSITORY_UPDATES.filter((update) => update.owner === intelligenzaUmana.owner).map(
        (update) => [update.repository, update],
      ),
    );
}
