import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'status' },
  template: `<span class="c-spinner" [style.--spinner-size]="diameters[size()]" aria-hidden="true"
      ><span class="c-spinner__mark">FZ</span></span
    >
    <span class="c-spinner__label" [class.u-visually-hidden]="!showLabel()">{{ label() }}</span>`,
})
export class LoadingSpinnerComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly showLabel = input(false);
  readonly label = input('Caricamento in corso…');
  readonly diameters = { sm: '1rem', md: '1.5rem', lg: '4rem' };
}
