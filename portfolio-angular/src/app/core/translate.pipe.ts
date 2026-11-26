import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from './language.service';

/** Reads the language signal in the current view, including OnPush views. */
@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(source: string | null | undefined, ...values: (string | number)[]): string {
    return source == null ? '' : this.language.translate(source, ...values);
  }
}

@Pipe({ name: 'portfolioDate', pure: false })
export class PortfolioDatePipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(value: string | null, italianLabel: string): string {
    return this.language.date(value, italianLabel);
  }
}
