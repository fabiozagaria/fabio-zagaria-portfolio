import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'status' },
  template: `<span
      class="c-spinner"
      [style.width]="diameters[size()]"
      [style.height]="diameters[size()]"
      aria-hidden="true"
    ></span
    ><span class="u-visually-hidden">{{ label() }}</span>`,
})
export class LoadingSpinnerComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly label = input('Caricamento in corso…');
  readonly diameters = { sm: '1rem', md: '1.5rem', lg: '3rem' };
}
