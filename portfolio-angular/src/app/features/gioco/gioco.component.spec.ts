import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../core/language.service';
import { GiocoComponent } from './gioco.component';

// Il repository del gioco è privato: non deve comparire in nessuna forma.
const FORBIDDEN = /idle-project-blackhole|github\.com\/fabiozagaria/i;
// Dettagli volutamente non raccontati: elenco dei finali, numero dei finali, fasi.
const TOO_DETAILED =
  /nana bianca|supernova|buco nero|tre finali|quattro finali|nebulosa|protostella|sequenza principale|gigante rossa|267/i;

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
      'Di cosa parla',
      'Come lo costruisco',
      'Come sta andando',
    ]);
  });

  it('explains the subject in basic terms and mentions several endings without counting them', () => {
    const text = render().textContent ?? '';
    expect(text).toContain('nascita, la sua vita e la sua morte');
    expect(text).toContain('diversi finali');
    expect(text).not.toMatch(TOO_DETAILED);
  });

  it('says the game may change completely and is not playable', () => {
    const text = render().textContent ?? '';
    expect(text).toContain('potrebbero cambiare anche completamente');
    expect(text).toContain('non ancora in alfa');
    expect(text).toContain('non ci sono app disponibili');
  });

  it('announces Android only, with no iOS version planned and no release date', () => {
    const text = render().textContent ?? '';
    expect(text).toContain('soltanto su Android');
    expect(text).toContain('iOS');
    expect(text).toContain('non è prevista');
    expect(text).toContain('non c’è ancora una data');
  });

  it('says it is built with the support of artificial intelligence', () => {
    expect(render().textContent).toContain('sostegno dell’intelligenza artificiale');
  });

  it('shows the Godot and Android logos redrawn in pixel art, with alt text and dimensions', () => {
    const element = render();
    const godot = element.querySelector<HTMLImageElement>('img[src="assets/img/godot-pixel.webp"]');
    const android = element.querySelector<HTMLImageElement>(
      'img[src="assets/img/android-pixel.webp"]',
    );
    for (const logo of [godot, android]) {
      expect(logo).toBeTruthy();
      expect(logo?.getAttribute('alt')).toBeTruthy();
      expect(logo?.getAttribute('width')).toBeTruthy();
      expect(logo?.getAttribute('height')).toBeTruthy();
    }
  });

  it('carries the attribution required by the Android and Godot logo licenses', () => {
    const text = render().textContent ?? '';
    expect(text).toContain(
      'The Android robot is reproduced or modified from work created and shared by Google and used according to terms described in the Creative Commons 3.0 Attribution License.',
    );
    expect(text).toContain('Android è un marchio di Google LLC');
    expect(text).toContain('Creative Commons Attribution 4.0 International');
    expect(text).toContain('rielaborati in pixel art');
    expect(text).toContain('Android™');
  });

  it('has no links: the game repository is private', () => {
    expect(render().querySelectorAll('a[href]').length).toBe(0);
  });

  it('never mentions the private repository', () => {
    const element = render();
    expect(element.textContent).not.toMatch(FORBIDDEN);
    expect(element.innerHTML).not.toMatch(FORBIDDEN);
  });

  it('shows the star as an illustration, not as a game screenshot', () => {
    const element = render();
    const star = element.querySelector('canvas.c-gioco__star');
    expect(star?.getAttribute('role')).toBe('img');
    expect(star?.getAttribute('aria-label')).toBeTruthy();
    expect(element.textContent).toContain('illustrazione, non una schermata del gioco');
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
      const sameStart = ['Idle Project Blackhole', 'The Android robot is reproduced'];
      const sameExact = ['Godot', 'Android'];
      english.forEach((text, index) => {
        if (sameStart.some((name) => text.startsWith(name)) || sameExact.includes(text)) return;
        expect(text, `block ${index}: ${italian[index]}`).not.toBe(italian[index]);
      });
    });

    it('uses the English section titles and keeps the key statements', () => {
      TestBed.inject(LanguageService).select('en');
      const element = render();
      const text = element.textContent ?? '';
      expect(Array.from(element.querySelectorAll('h2'), (h) => h.textContent?.trim())).toEqual([
        'Why I made it',
        'What it is about',
        'How I build it',
        'How it is going',
      ]);
      expect(text).toContain('Provisional name');
      expect(text).toContain('could change completely');
      expect(text).toContain('only on Android');
      expect(text).not.toMatch(TOO_DETAILED);
      expect(element.innerHTML).not.toMatch(FORBIDDEN);
      expect(element.querySelectorAll('a[href]').length).toBe(0);
    });
  });
});
