import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { PortfolioLatestUpdate } from '../../data/projects.data';
import { recentUpdateAge } from '../recent-update';

/**
 * Badge «Commit recente»: compare in ogni scheda (full stack, backend, plugin, corso) il cui
 * ultimo aggiornamento è entro la finestra di 3 giorni, e dice quando è avvenuto.
 */
@Component({
  selector: 'app-recent-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (age(); as when) {
      <span class="c-badge-new">
        <svg class="c-badge-new__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M8 5.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6zM0 7.2h4.2v1.6H0zm11.8 0H16v1.6h-4.2z"
          />
        </svg>
        <span>Commit recente</span>{{ ' ' }}
        <span class="c-badge-new__when">{{ when }}</span>
      </span>
    }
  `,
})
export class RecentBadgeComponent {
  readonly update = input<PortfolioLatestUpdate | undefined>();

  private readonly now = Date.now();
  protected readonly age = computed(() => recentUpdateAge(this.update(), this.now));
}
