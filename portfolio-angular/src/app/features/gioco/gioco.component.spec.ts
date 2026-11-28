import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../core/language.service';
import { GiocoComponent } from './gioco.component';

// Il repository del gioco è privato: non deve comparire in nessuna forma.
const FORBIDDEN = /idle-project-blackhole|github\.com\/fabiozagaria/i;

describe('GiocoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GiocoComponent] }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(GiocoComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('names the game and declares the name as provisional', () => {
    const element = render();
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.querySelector('h1')?.textContent?.trim()).toBe('Idle Project Blackhole');
    expect(element.textContent).toContain('Nome provvisorio');
  });

  it('has the four sections in order', () => {
    const titles = Array.from(render().querySelectorAll('h2'), (h) => h.textContent?.trim());
    expect(titles).toEqual([
      'Perché l’ho fatto',
      'Il ciclo di una stella',
      'Come lo costruisco',
      'Come sta andando',
    ]);
  });

  it('says honestly that the game is not playable and not yet in alpha', () => {
    const text = render().textContent ?? '';
    expect(text).toContain('non ancora in alfa');
    expect(text).toContain('non si può ancora provare');
  });

  it('has no links: the game repository is private', () => {
    expect(render().querySelectorAll('a[href]').length).toBe(0);
  });

  it('never mentions the private repository', () => {
    const element = render();
    expect(element.textContent).not.toMatch(FORBIDDEN);
    expect(element.innerHTML).not.toMatch(FORBIDDEN);
  });

  it('dates the automated checks figure', () => {
    const paragraph = Array.from(render().querySelectorAll('p, li')).find((node) =>
      node.textContent?.includes('267 controlli automatici'),
    );
    expect(paragraph?.textContent).toContain('23 novembre 2026');
  });

  it('lists the three endings by mass', () => {
    const text = render().textContent ?? '';
    for (const ending of ['nana bianca', 'supernova', 'buco nero']) {
      expect(text.toLowerCase()).toContain(ending);
    }
  });

  it('shows the star as an illustration, not as a game screenshot', () => {
    const element = render();
    const star = element.querySelector('canvas.c-gioco__star');
    expect(star?.getAttribute('role')).toBe('img');
    expect(star?.getAttribute('aria-label')).toBeTruthy();
    expect(element.textContent).toContain('illustrazione, non una schermata del gioco');
  });

  it('draws one decorative icon per phase', () => {
    const icons = render().querySelectorAll('canvas.c-gioco__phase-icon');
    expect(icons.length).toBe(4);
    for (const icon of Array.from(icons)) expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('does not throw when the canvas has no 2d context', () => {
    const spy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    try {
      expect(() => render()).not.toThrow();
    } finally {
      spy.mockRestore();
    }
  });

  describe('in English', () => {
    afterEach(() => {
      localStorage.removeItem('portfolio-language');
      document.documentElement.lang = 'it';
    });

    function blocks(element: HTMLElement): string[] {
      return Array.from(
        element.querySelectorAll('h1, h2, p, li, figcaption'),
        (node) => node.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      );
    }

    it('translates every block of the page', () => {
      const italian = blocks(render());
      TestBed.inject(LanguageService).select('en');
      const english = blocks(render());
      expect(english.length).toBe(italian.length);
      const sameInBothLanguages = ['Idle Project Blackhole', 'Supernova'];
      english.forEach((text, index) => {
        if (sameInBothLanguages.some((name) => text.startsWith(name))) return;
        expect(text, `block ${index}: ${italian[index]}`).not.toBe(italian[index]);
      });
    });

    it('uses the English section titles and declares the name as provisional', () => {
      TestBed.inject(LanguageService).select('en');
      const element = render();
      expect(Array.from(element.querySelectorAll('h2'), (h) => h.textContent?.trim())).toEqual([
        'Why I made it',
        'The life cycle of a star',
        'How I build it',
        'How it is going',
      ]);
      expect(element.textContent).toContain('Provisional name');
      expect(element.textContent).toContain('not yet in alpha');
    });

    it('never mentions the private repository', () => {
      TestBed.inject(LanguageService).select('en');
      const element = render();
      expect(element.innerHTML).not.toMatch(FORBIDDEN);
      expect(element.querySelectorAll('a[href]').length).toBe(0);
    });
  });
});
