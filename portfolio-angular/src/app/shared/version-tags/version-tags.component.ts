import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { PortfolioVersionTag } from '../../data/projects.data';

/**
 * Tag e versioni di una card, a due segmenti: etichetta colorata con icona e versione
 * in monospazio. Il colore segue il tipo di repository, come nei chip dell'ultimo
 * aggiornamento. Se il tag ha un link, tutto il segmento è cliccabile.
 */
@Component({
  selector: 'app-version-tags',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (tags().length) {
      <ul class="c-vtags" aria-label="Tag e versioni">
        @for (tag of tags(); track tag.label + tag.tag; let i = $index) {
          <li class="c-vtag" [attr.data-kind]="tag.kind ?? 'Backend'" [style.--i]="i">
            @if (tag.url; as url) {
              <a
                class="c-vtag__body"
                [href]="url"
                target="_blank"
                rel="noopener noreferrer"
                [attr.aria-label]="
                  tag.label +
                  ' ' +
                  tag.tag +
                  ': apre il codice di questa versione su GitHub (nuova scheda)'
                "
              >
                <ng-container *ngTemplateOutlet="segments; context: { $implicit: tag }" />
              </a>
            } @else {
              <span class="c-vtag__body">
                <ng-container *ngTemplateOutlet="segments; context: { $implicit: tag }" />
              </span>
            }
          </li>
        }
      </ul>
    }
    <ng-template #segments let-tag>
      <span class="c-vtag__label">
        <svg class="c-vtag__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M1.5 1.5h6l7 7-6 6-7-7zm3 1.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"
          />
        </svg>
        {{ tag.label }}
      </span>
      <code class="c-vtag__value">{{ tag.tag }}</code>
    </ng-template>
  `,
})
export class VersionTagsComponent {
  readonly tags = input.required<readonly PortfolioVersionTag[]>();
}
