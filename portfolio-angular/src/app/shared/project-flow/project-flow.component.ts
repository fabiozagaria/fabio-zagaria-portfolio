import { TranslatePipe } from '../../core/translate.pipe';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { PortfolioFlow } from '../../data/projects.data';

/** Schema del flusso di un progetto, nella stessa cornice a finestra degli screenshot. */
@Component({
  imports: [TranslatePipe],
  selector: 'app-project-flow',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="c-card__shot c-shot c-shot--flow">
      <div class="c-shot__bar" aria-hidden="true">
        <span class="c-shot__dots"></span>
        <span class="c-shot__url">{{ flow().title | translate }}</span>
      </div>
      <ol class="c-flow" [attr.aria-label]="flow().title | translate">
        @for (step of flow().steps; track step.label; let i = $index) {
          <li
            class="c-flow__step"
            [style.--i]="i"
            [attr.data-pending]="step.pending ? 'true' : null"
          >
            <strong>{{ step.label | translate }}</strong>
            <span>{{ step.detail | translate }}</span>
          </li>
        }
      </ol>
      <figcaption class="c-shot__note">{{ flow().note | translate }}</figcaption>
    </figure>
  `,
})
export class ProjectFlowComponent {
  readonly flow = input.required<PortfolioFlow>();
}
