import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import intelligenzaUmana from '../../data/intelligenza-umana-repositories.json';
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
      'Organizzazione GitHub attiva',
    );
    expect(element.textContent).not.toContain('Lancio editoriale');
    expect(element.textContent).toContain('modelli condivisi per issue e pull request');
    expect(element.textContent).toContain('sono state trasferite dall’account personale');
    const lifecycle = element.querySelector('.c-iu__list a[href$="/iu-project-lifecycle-skill"]');
    expect(lifecycle?.textContent?.trim()).toBe('Project Lifecycle Skill v0.3.0');
    expect(lifecycle?.closest('li')?.textContent).toContain('ha verificato i test');
    expect(lifecycle?.closest('li')?.textContent).toContain('confermato il funzionamento');
    const modelRouter = element.querySelector('.c-iu__list a[href$="/iu-model-router"]');
    expect(modelRouter?.textContent?.trim()).toBe('Model Router v0.1.0');
    for (const description of element.querySelectorAll('.c-iu__list li > span')) {
      expect(description.textContent?.trim()).toMatch(/^\p{Lu}/u);
    }
    expect(
      Array.from(element.querySelectorAll('h2'), (title) => title.textContent?.trim()),
    ).toEqual([
      'Che Cos’è',
      'A Cosa Serve',
      'Perché Esiste',
      'Come Funziona',
      'Repository e Progetti',
      'A Che Punto È',
      'Perché Ha una Pagina Sua',
    ]);
    const externalLinks = Array.from(
      element.querySelectorAll<HTMLAnchorElement>(
        'a[href^="https://"]:not(.c-update-item__commit)',
      ),
    );
    expect(externalLinks.map((link) => link.getAttribute('href'))).toEqual([
      'https://github.com/Intelligenza-Umana/iu-learning-ledger',
      'https://github.com/Intelligenza-Umana/iu-spring-security-advisor',
      'https://github.com/Intelligenza-Umana/iu-project-lifecycle-skill',
      'https://github.com/Intelligenza-Umana/iu-model-router',
      'https://github.com/Intelligenza-Umana',
      'https://github.com/Intelligenza-Umana/.github/blob/main/profile/README.md',
      'https://github.com/Intelligenza-Umana/intelligenza-umana',
      'https://github.com/Intelligenza-Umana/intelligenza-umana/blob/main/docs/PROJECT_REGISTRY.md',
      'https://intelligenza-umana-web.vercel.app/',
    ]);
    const officialSite = element.querySelector<HTMLAnchorElement>(
      'a[href="https://intelligenza-umana-web.vercel.app/"]',
    );
    expect(officialSite?.classList.contains('c-btn--primary')).toBe(true);
    expect(officialSite?.closest('.c-iu__site')).toBeNull();
    for (const link of externalLinks) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  it('shows the date and latest commit of each tool from its canonical repository', () => {
    const fixture = TestBed.createComponent(IntelligenzaUmanaComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const tools = Array.from(element.querySelectorAll('.c-iu__list > li'));

    expect(tools).toHaveLength(intelligenzaUmana.repositories.length);
    expect(element.querySelectorAll('app-project-update')).toHaveLength(tools.length);
    for (const [index, { repository }] of intelligenzaUmana.repositories.entries()) {
      const tool = tools[index];
      const panel = tool.querySelector('app-project-update');
      const date = panel?.querySelector('time')?.getAttribute('datetime') ?? '';
      const commit = panel?.querySelector<HTMLAnchorElement>('a');
      const url = `https://github.com/${intelligenzaUmana.owner}/${repository}`;

      expect(tool.querySelector(':scope > a')?.getAttribute('href')).toBe(url);
      expect(panel?.textContent).toContain('Ultimo aggiornamento');
      expect(Number.isFinite(Date.parse(date))).toBe(true);
      expect(panel?.querySelectorAll('.c-update-item')).toHaveLength(1);
      expect(commit?.getAttribute('href')).toMatch(new RegExp(`^${url}/commit/[a-f0-9]{40}$`));
      expect(commit?.getAttribute('rel')).toContain('noopener');
    }
  });
});
