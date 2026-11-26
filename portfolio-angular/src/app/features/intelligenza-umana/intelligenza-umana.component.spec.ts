import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SkyEngineFactory } from '../../shared/sky/sky-engine';
import { IntelligenzaUmanaComponent } from './intelligenza-umana.component';

describe('IntelligenzaUmanaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntelligenzaUmanaComponent],
      providers: [
        provideRouter([]),
        {
          provide: SkyEngineFactory,
          useValue: {
            create: () => {
              throw new Error('no canvas in tests');
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('presents current foundation and organization details with canonical project links', () => {
    const fixture = TestBed.createComponent(IntelligenzaUmanaComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const logo = element.querySelector<HTMLImageElement>('.c-iu__logo img');

    expect(element.querySelector('h1')?.textContent).toContain('Intelligenza Umana');
    expect(logo?.getAttribute('alt')).toContain('Intelligenza Umana');
    expect(element.textContent).toContain('laboratorio tecnologico indipendente');
    expect(element.querySelector('.c-iu__status')?.textContent).toContain(
      'organizzazione GitHub attiva',
    );
    expect(element.textContent).not.toContain('Lancio editoriale');
    expect(element.textContent).toContain('modelli condivisi per issue e pull request');
    expect(element.textContent).toContain('Project Lifecycle Skill v0.3.0');
    expect(element.textContent).toContain('IU Model Router v0.1.0');
    expect(
      Array.from(element.querySelectorAll('h2'), (title) => title.textContent?.trim()),
    ).toEqual([
      'Che cos’è',
      'A cosa serve',
      'Perché esiste',
      'Come funziona',
      'Repository e progetti',
      'A che punto è',
      'Perché ha una pagina sua',
    ]);
    const externalLinks = Array.from(
      element.querySelectorAll<HTMLAnchorElement>('a[href^="https://"]'),
    );
    expect(externalLinks.map((link) => link.getAttribute('href'))).toEqual([
      'https://github.com/fabiozagaria/iu-learning-ledger',
      'https://github.com/fabiozagaria/iu-spring-security-advisor',
      'https://github.com/fabiozagaria/iu-project-lifecycle-skill',
      'https://github.com/fabiozagaria/iu-model-router',
      'https://github.com/Intelligenza-Umana',
      'https://github.com/Intelligenza-Umana/.github/blob/main/profile/README.md',
      'https://github.com/fabiozagaria/intelligenza-umana',
      'https://github.com/fabiozagaria/intelligenza-umana/blob/main/docs/PROJECT_REGISTRY.md',
      'https://intelligenza-umana-web.vercel.app/',
    ]);
    for (const link of externalLinks) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });
});
