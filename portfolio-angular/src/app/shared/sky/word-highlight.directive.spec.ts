import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WordHighlightDirective, wordsOn } from './word-highlight.directive';

@Component({
  standalone: true,
  imports: [WordHighlightDirective],
  template: `<p appWordHighlight>Ogni scheda dice che cosa è stato fatto.</p>`,
})
class HostComponent {}

function stubMotion(reduced: boolean): void {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce') && reduced,
  }));
}

describe('WordHighlightDirective', () => {
  afterEach(() => vi.unstubAllGlobals());

  function render(): { paragraph: HTMLElement; destroy: () => void } {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    TestBed.tick();
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p')!;
    return { paragraph, destroy: () => fixture.destroy() };
  }

  it('wraps every word and keeps the text exactly as written', () => {
    stubMotion(false);
    const { paragraph } = render();
    expect(paragraph.querySelectorAll('.c-wh__word')).toHaveLength(8);
    expect(paragraph.textContent).toBe('Ogni scheda dice che cosa è stato fatto.');
  });

  it('lights the words as the paragraph crosses the screen', () => {
    expect(wordsOn(900, 80, 900, 10)).toBe(0);
    expect(wordsOn(-200, 80, 900, 10)).toBe(10);
    const middle = wordsOn(500, 80, 900, 10);
    expect(middle).toBeGreaterThan(0);
    expect(middle).toBeLessThan(10);
  });

  it('shows every word in ink under reduced motion', () => {
    stubMotion(true);
    const { paragraph } = render();
    const words = paragraph.querySelectorAll('.c-wh__word');
    expect(paragraph.querySelectorAll('.c-wh__word.is-on')).toHaveLength(words.length);
  });

  it('stops listening to scroll when destroyed', () => {
    stubMotion(false);
    const remove = vi.spyOn(window, 'removeEventListener');
    const { destroy } = render();
    destroy();
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
