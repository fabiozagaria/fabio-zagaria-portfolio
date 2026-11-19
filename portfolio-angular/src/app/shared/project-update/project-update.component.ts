import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { PortfolioLatestUpdate } from '../../data/projects.data';

/**
 * «Ultimo aggiornamento» di una card: una riga per repository, con chip colorato
 * (Frontend, API, Backend o Plugin), tag, messaggio e hash del commit reale.
 * Le card senza `items` mostrano ancora il riepilogo testuale.
 */
@Component({
  selector: 'app-project-update',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="c-project-update" role="group" aria-label="Ultimo aggiornamento">
      <p class="c-project-update__meta">
        <strong>Ultimo aggiornamento</strong>
        <time [attr.datetime]="update().datetime">{{ update().dateLabel }}</time>
        @if (update().version; as version) {
          <span>v{{ version }}</span>
        }
      </p>
      @if (update().items; as items) {
        <ol class="c-update-items">
          @for (item of items; track item.url; let i = $index) {
            <li class="c-update-item" [attr.data-kind]="item.kind" [style.--i]="i">
              <div class="c-update-item__head">
                <span class="c-update-item__chip">{{ item.kind }}</span>
                @if (item.version; as version) {
                  <code class="c-update-item__version">{{ version }}</code>
                }
                <span class="c-update-item__date">{{ item.dateLabel }}</span>
              </div>
              <p class="c-update-item__message">
                <code>{{ item.message }}</code>
              </p>
              @if (item.note; as note) {
                <p class="c-update-item__note">{{ note }}</p>
              }
              <a
                class="c-update-item__commit"
                [href]="item.url"
                target="_blank"
                rel="noopener noreferrer"
                [attr.aria-label]="
                  'Commit ' + item.hash + ' di ' + item.kind + ' su GitHub (apre una nuova scheda)'
                "
              >
                Commit <code>{{ item.hash }}</code>
              </a>
            </li>
          }
        </ol>
      } @else {
        @if (update().summary; as summary) {
          <p class="c-project-update__summary">{{ summary }}</p>
        }
        @if (update().sources; as sources) {
          <div class="c-project-update__sources" aria-label="Fonti dell’aggiornamento">
            @for (source of sources; track source.url) {
              <a [href]="source.url" target="_blank" rel="noopener noreferrer">
                {{ source.label }}
              </a>
            }
          </div>
        }
      }
    </div>
  `,
})
export class ProjectUpdateComponent {
  readonly update = input.required<PortfolioLatestUpdate>();
}
