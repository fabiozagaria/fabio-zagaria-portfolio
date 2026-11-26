import { Pipe, PipeTransform } from '@angular/core';

/**
 * Enfasi nei testi dei dati: `{b}grassetto{/b}` e `{i}corsivo{/i}`.
 * Il testo viene prima reso innocuo (escape), poi si trasformano solo questi due marcatori; il
 * risultato va in `[innerHTML]`, che Angular sanifica comunque.
 */
const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function richText(value: string): string {
  return value
    .replace(/[&<>"']/g, (char) => ESCAPES[char])
    .replace(/\{b\}(.+?)\{\/b\}/g, '<strong>$1</strong>')
    .replace(/\{i\}(.+?)\{\/i\}/g, '<em>$1</em>');
}

/** Lo stesso testo senza marcatori, per titoli, descrizioni SEO e confronti. */
export function plainText(value: string): string {
  return value.replace(/\{\/?[bi]\}/g, '');
}

@Pipe({ name: 'rich', standalone: true })
export class RichTextPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value ? richText(value) : '';
  }
}
