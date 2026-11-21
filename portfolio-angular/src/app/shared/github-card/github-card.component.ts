import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '../../data/projects.data';

/** I progetti principali del portfolio: i loro repository sono la vetrina su GitHub. */
const FEATURED_PROJECT_IDS = ['gestionale-spese', 'jobflow', 'accessdesk'];

interface RepositoryLink {
  readonly name: string;
  readonly url: string;
}

/**
 * Scheda del profilo GitHub, sempre visibile e gemella di quella LinkedIn. Non chiama GitHub: i
 * repository arrivano dai dati dei progetti (unica fonte), quindi l'elenco resta allineato alle
 * schede e non mostra numeri che non possiamo verificare, come stelle o follower.
 */
@Component({
  selector: 'app-github-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="c-place c-place--list">
      <span class="c-place__title">GitHub</span>
      <a
        class="c-place__url c-place__url--link"
        href="https://github.com/fabiozagaria"
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/fabiozagaria
        <span class="u-visually-hidden">(si apre in una nuova scheda)</span>
      </a>
      <p class="c-place__label" id="github-repos">Repository principali</p>
      <ul class="c-place__repos" aria-labelledby="github-repos">
        @for (repository of repositories; track repository.url) {
          <li>
            <a [href]="repository.url" target="_blank" rel="noopener noreferrer">
              {{ repository.name }}
              <span class="u-visually-hidden">(si apre in una nuova scheda)</span>
            </a>
          </li>
        }
      </ul>
    </div>
  `,
})
export class GithubCardComponent {
  readonly repositories: readonly RepositoryLink[] = PROJECTS.filter((project) =>
    FEATURED_PROJECT_IDS.includes(project.id),
  ).flatMap((project) => {
    const repositories = project.repositories ?? [];
    return repositories.map((repository) => ({
      name: repositories.length > 1 ? `${project.title} (${repository.label})` : project.title,
      url: repository.url,
    }));
  });
}
