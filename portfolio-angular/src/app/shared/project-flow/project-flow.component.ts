import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { PortfolioFlow } from '../../data/projects.data';

/** Schema del flusso di un progetto, nella stessa cornice a finestra degli screenshot. */
@Component({
  selector: 'app-project-flow',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="c-card__shot c-shot c-shot--flow">
      <div class="c-shot__bar" aria-hidden="true">
        <span class="c-shot__dots"></span>
        <span class="c-shot__url">{{ flow().title }}</span>
      </div>
      <ol class="c-flow" [attr.aria-label]="flow().title">
        @for (step of flow().steps; track step.label; let i = $index) {
          <li
            class="c-flow__step"
            [style.--i]="i"
            [attr.data-pending]="step.pending ? 'true' : null"
          >
            <strong>{{ step.label }}</strong>
            <span>{{ step.detail }}</span>
          </li>
        }
      </ol>
      <figcaption class="c-shot__note">{{ flow().note }}</figcaption>
    </figure>
  `,
})
export class ProjectFlowComponent {
  readonly flow = input.required<PortfolioFlow>();
}
