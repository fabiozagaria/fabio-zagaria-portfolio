import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/**
 * How many of `count` words are lit for a paragraph whose top is `top` px from
 * the top of a `viewport`-high screen: the first word turns when the top
 * reaches 85% of the screen, the last when the bottom reaches 45%.
 */
export function wordsOn(top: number, height: number, viewport: number, count: number): number {
  const start = viewport * 0.85;
  const end = viewport * 0.45;
  const progress = (start - top) / Math.max(1, start - end + height);
  return Math.round(Math.min(1, Math.max(0, progress)) * count);
}

/**
 * One paragraph whose words turn from grey to ink as it crosses the screen.
 * Only colours change, never layout. The text stays as written; under reduced
 * motion every word is in ink straight away.
 */
@Directive({
  selector: '[appWordHighlight]',
  standalone: true,
  host: { class: 'c-wh' },
})
export class WordHighlightDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const words = this.wrapWords();
    const reduced =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      words.forEach((word) => word.classList.add('is-on'));
      return;
    }
    let lit = -1;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = this.host.getBoundingClientRect();
      const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      const count = atEnd ? words.length : wordsOn(box.top, box.height, innerHeight, words.length);
      if (count === lit) return;
      lit = count;
      words.forEach((word, i) => word.classList.toggle('is-on', i < count));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    this.destroyRef.onDestroy(() => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    });
  }

  /** Wraps each word of the text nodes in a span, keeping spaces as they are. */
  private wrapWords(): HTMLElement[] {
    const words: HTMLElement[] = [];
    const walker = document.createTreeWalker(this.host, NodeFilter.SHOW_TEXT);
    const texts: Text[] = [];
    while (walker.nextNode()) texts.push(walker.currentNode as Text);
    for (const text of texts) {
      const parts = (text.textContent ?? '').split(/(\s+)/);
      const fragment = document.createDocumentFragment();
      for (const part of parts) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          fragment.append(part);
          continue;
        }
        const span = document.createElement('span');
        span.className = 'c-wh__word';
        span.textContent = part;
        words.push(span);
        fragment.append(span);
      }
      text.replaceWith(fragment);
    }
    return words;
  }
}
