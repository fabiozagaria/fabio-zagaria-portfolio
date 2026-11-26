import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { PROJECTS } from '../../../data/projects.data';
import { ProjectDetailComponent } from './project-detail.component';

describe('ProjectDetailComponent', () => {
  let harness: RouterTestingHarness | undefined;

  beforeEach(async () => {
    harness = undefined;
    await TestBed.configureTestingModule({
      imports: [ProjectDetailComponent],
      providers: [
        provideRouter(
          PROJECTS.map((project) => ({
            path: `projects/${project.id}`,
            component: ProjectDetailComponent,
            data: { projectId: project.id },
          })),
        ),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /** Apre la pagina di un progetto; si finge soltanto la data, perché il router usa i timer. */
  async function render(id: string, isoNow = '2026-11-04T10:00:00+01:00'): Promise<HTMLElement> {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(isoNow));
    harness ??= await RouterTestingHarness.create();
    await harness.navigateByUrl(`/projects/${id}`, ProjectDetailComponent);
    return harness.routeNativeElement as HTMLElement;
  }

  it('shows the project name as the only h1 and links back to its section of the list', async () => {
    const element = await render('jobflow');
    const back = Array.from(element.querySelectorAll<HTMLAnchorElement>('a')).filter((link) =>
      link.textContent?.includes('progetti'),
    );

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('JobFlow');
    expect(back.map((link) => link.getAttribute('href'))).toEqual([
      '/projects#backend',
      '/projects#backend',
    ]);
  });

  it('shows the history button only for the three main projects', async () => {
    const withHistory: string[] = [];
    for (const project of PROJECTS) {
      const element = await render(project.id);
      const history = element.querySelector('details.c-project-history');
      if (history) {
        withHistory.push(project.id);
        expect(history.querySelector('summary')?.textContent).toContain(
          'Implementazioni importanti',
        );
        expect(history.querySelectorAll('li').length).toBeGreaterThan(0);
      }
    }

    expect(withHistory.sort()).toEqual(['accessdesk', 'gestionale-spese', 'jobflow']);
  });

  it('shows the backend video on the Expense Tracker page, never autoplaying', async () => {
    const element = await render('gestionale-spese');
    const video = element.querySelector<HTMLVideoElement>('video');

    expect(element.querySelectorAll('video')).toHaveLength(1);
    expect(video?.hasAttribute('controls')).toBe(true);
    expect(video?.hasAttribute('autoplay')).toBe(false);
    expect(video?.getAttribute('preload')).toBe('none');
    expect(video?.getAttribute('poster')).toBe(
      '/assets/img/project-expense-tracker-backend-video.webp',
    );
    expect(video?.querySelector('source')?.getAttribute('src')).toBe(
      '/assets/video/expense-tracker-backend.mp4',
    );
    expect(video?.getAttribute('aria-label')).toContain('1 minuto e 15 secondi');
    // Alternativa testuale e dichiarazione dello strumento accanto al video.
    expect(element.querySelectorAll('.c-video__text li')).toHaveLength(4);
    expect(element.querySelector('.c-video__note')?.textContent).toContain('Gemini Notebook');
    expect((await render('jobflow')).querySelector('video')).toBeNull();
  });

  it('shows the API flow map on the Expense Tracker page, with a text alternative', async () => {
    const element = await render('gestionale-spese');
    const map = element.querySelector('.c-diagram');
    const link = map?.querySelector<HTMLAnchorElement>('a.c-diagram__frame');
    const image = map?.querySelector<HTMLImageElement>('img');

    expect(element.querySelectorAll('.c-diagram')).toHaveLength(1);
    expect(map?.querySelector('h4')?.textContent).toContain('Mappa del flusso API');
    expect(link?.getAttribute('href')).toBe('/assets/img/project-expense-tracker-flusso-api.webp');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toContain('noopener');
    expect(image?.getAttribute('alt')?.length).toBeGreaterThan(80);
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.getAttribute('width')).toBe('1116');
    expect(image?.getAttribute('height')).toBe('2000');
    // Le cinque tappe sono anche testo, nell'ordine dell'immagine.
    const steps = Array.from(map?.querySelectorAll('.c-diagram__text li') ?? []).map(
      (item) => item.textContent ?? '',
    );
    expect(steps).toHaveLength(5);
    expect(steps[0]).toContain('/auth/login');
    expect(steps[4]).toContain('PostgreSQL');
    expect(map?.querySelector('.c-diagram__note')?.textContent).toContain('Gemini Notebook');
  });

  it('shows every supplied screenshot, each one opening the full image', async () => {
    const count = async (id: string): Promise<number> =>
      (await render(id)).querySelectorAll('.c-shot__frame').length;

    expect(await count('gestionale-spese')).toBe(4);
    expect(await count('labtv')).toBe(3);
    expect(await count('fakeflix')).toBe(2);
    expect(await count('portfolio')).toBe(1);
    const element = await render('gestionale-spese');
    for (const link of Array.from(element.querySelectorAll<HTMLAnchorElement>('.c-shot__frame'))) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.querySelector('.u-visually-hidden')?.textContent).toContain('nuova scheda');
    }
  });

  it('frames each screenshot as a window that shows the demo domain and page', async () => {
    const urls = async (id: string): Promise<(string | undefined)[]> =>
      Array.from(
        (await render(id)).querySelectorAll('.c-shot:not(.c-shot--flow) .c-shot__url'),
      ).map((url) => url.textContent?.trim());

    expect(await urls('gestionale-spese')).toEqual(
      expect.arrayContaining([
        'gestionale-spese.vercel.app/',
        'gestionale-spese.vercel.app/dashboard',
        'gestionale-spese.vercel.app/login',
      ]),
    );
    expect(await urls('labtv')).toEqual(
      expect.arrayContaining(['lab-tv.vercel.app/catalogo', 'lab-tv.vercel.app/ricerca']),
    );
  });

  it('draws a flow diagram for the backend projects, marking unfinished steps', async () => {
    const jobflow = await render('jobflow');
    const accessdesk = await render('accessdesk');

    expect(jobflow.querySelectorAll('.c-flow__step')).toHaveLength(6);
    expect(jobflow.querySelectorAll('.c-flow__step[data-pending="true"]')).toHaveLength(1);
    expect(jobflow.querySelectorAll('.c-flow__step')[4].textContent).toContain('PROCESSING');
    expect(accessdesk.querySelectorAll('.c-flow__step')).toHaveLength(5);
    expect(accessdesk.querySelector('.c-shot__note')?.textContent).toContain(
      'restano da completare',
    );
  });

  it('shows each latest update as chips: API before frontend and backends with their own kind', async () => {
    const kinds = async (id: string): Promise<(string | undefined)[]> =>
      Array.from((await render(id)).querySelectorAll<HTMLElement>('.c-update-item')).map(
        (item) => item.dataset['kind'],
      );

    expect(await kinds('gestionale-spese')).toEqual(['API', 'Frontend']);
    expect(await kinds('jobflow')).toEqual(['Backend']);
    expect(await kinds('accessdesk')).toEqual(['Backend']);
    expect(
      (await render('jobflow')).querySelector('.c-update-item__version')?.textContent,
    ).toContain('v0.1.0-alpha.1');
  });

  it('shows the technical decisions and the real status only on the detail page', async () => {
    const element = await render('gestionale-spese');

    expect(element.querySelector('.c-card__highlights')).not.toBeNull();
    expect(element.querySelector('.c-card__status-detail')?.textContent).toContain('Stato reale');
  });

  it('gives a role to every element that carries an aria-label', async () => {
    for (const project of PROJECTS) {
      const element = await render(project.id);
      expect(
        element.querySelectorAll(
          'div[aria-label]:not([role]), span[aria-label]:not([role]), p[aria-label]:not([role])',
        ),
      ).toHaveLength(0);
    }
  });
});
