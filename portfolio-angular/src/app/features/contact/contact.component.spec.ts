import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CV, CV_DOWNLOAD_URL, CV_VIEW_URL, cvUpdatedLabel } from '../../data/cv.data';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContactComponent] }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => {
    vi.useRealTimers();
    Reflect.deleteProperty(navigator, 'clipboard');
    window.getSelection()?.removeAllRanges();
  });

  function mockClipboard(writeText: () => Promise<void>): void {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
  }

  function status(): string {
    return element.querySelector('.c-contact__status')?.textContent?.trim() ?? '';
  }

  it('uses dedicated download URLs for the professional documents', () => {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('a[download]'));

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      CV_DOWNLOAD_URL,
      '/downloads/Attestato_LabForWeb_Fabio_Zagaria.pdf',
    ]);
  });

  it('keeps the contact path focused on professional channels', () => {
    const externalLinks = Array.from(
      element.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'),
    );

    expect(element.textContent).toContain('github.com/fabiozagaria');
    expect(element.textContent).toContain('linkedin.com/in/fabiozagaria');
    expect(element.textContent).not.toContain('X ·');
    expect(element.textContent).not.toContain('Instagram ·');
    expect(externalLinks.every((link) => link.rel === 'noopener noreferrer')).toBe(true);
  });

  it('titles the page like the others, without capitals', () => {
    expect(element.querySelector('h1')?.textContent?.trim()).toBe('Contatti');
  });

  it('puts the two main actions first: write an email and open the CV', () => {
    const [write, cv] = Array.from(
      element.querySelectorAll<HTMLAnchorElement>('.c-contact__actions a'),
    );

    expect(write.textContent?.trim()).toBe('Scrivimi una email');
    expect(write.getAttribute('href')).toBe('mailto:zagariafabio1999@gmail.com');
    expect(cv.textContent?.trim()).toBe('Apri il CV');
    expect(cv.getAttribute('href')).toBe(CV_VIEW_URL);
  });

  it('says when the CV was last updated, right under the main actions', () => {
    const note = element.querySelector('.c-contact__cv-note');

    expect(note?.textContent).toContain(`CV aggiornato il ${cvUpdatedLabel()}`);
    expect(note?.querySelector('time')?.getAttribute('datetime')).toBe(CV.updatedAt);
    expect(note?.previousElementSibling?.classList.contains('c-contact__actions')).toBe(true);
  });

  it('shows each channel once, and before the documents', () => {
    expect(element.querySelectorAll('a[href^="mailto:"]')).toHaveLength(1);
    expect(element.querySelectorAll('a[href*="linkedin.com/in/"]')).toHaveLength(1);
    expect(element.querySelectorAll('a[href="https://github.com/fabiozagaria"]')).toHaveLength(1);

    const places = element.querySelector('.c-contact__places') as HTMLElement;
    const documents = element.querySelector('.c-contact__documents') as HTMLElement;
    expect(
      places.compareDocumentPosition(documents) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('puts the tall LinkedIn post last, so nobody scrolls past it to reach the CV', () => {
    const documents = element.querySelector('.c-contact__documents') as HTMLElement;
    const posts = element.querySelector('app-linkedin-posts') as HTMLElement;

    expect(posts.querySelector('iframe')).not.toBeNull();
    expect(
      documents.compareDocumentPosition(posts) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('gives every link a name that identifies its destination', () => {
    const hrefsByName = new Map<string, Set<string>>();
    for (const link of Array.from(element.querySelectorAll<HTMLAnchorElement>('a[href]'))) {
      const name = (link.getAttribute('aria-label') ?? link.textContent ?? '')
        .replace(/\s+/g, ' ')
        .trim();
      expect(name).not.toBe('');
      const hrefs = hrefsByName.get(name) ?? new Set<string>();
      hrefs.add(link.getAttribute('href') ?? '');
      hrefsByName.set(name, hrefs);
    }

    // Lo stesso nome può comparire più volte solo se porta allo stesso posto (il CV in due punti).
    for (const [name, hrefs] of hrefsByName) {
      expect(hrefs.size, `«${name}» porta a destinazioni diverse`).toBe(1);
    }
    expect(hrefsByName.has("Apri l'attestato LabForWeb in PDF (si apre in una nuova scheda)")).toBe(
      true,
    );
    expect(
      hrefsByName.has("Apri l'attestato P.C. Academy in PDF (si apre in una nuova scheda)"),
    ).toBe(true);
  });

  it('labels the document action groups so assistive technology reads them', () => {
    const groups = Array.from(element.querySelectorAll('.c-contact__document-actions'));

    expect(groups).toHaveLength(3);
    for (const group of groups) {
      expect(group.getAttribute('role')).toBe('group');
      expect(group.getAttribute('aria-label')).toContain('Azioni');
    }
  });

  it('copies the email address and confirms it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);

    element.querySelector<HTMLButtonElement>('.c-contact__email button')?.click();
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(status()).toBe('Indirizzo copiato');
    });
    expect(writeText).toHaveBeenCalledWith('zagariafabio1999@gmail.com');
  });

  it('selects the address and explains what to do if the browser refuses the copy', async () => {
    mockClipboard(() => Promise.reject(new Error('NotAllowedError')));

    element.querySelector<HTMLButtonElement>('.c-contact__email button')?.click();
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(status()).toContain('copialo a mano');
    });
    expect(window.getSelection()?.toString()).toBe('zagariafabio1999@gmail.com');
  });

  it('removes the confirmation after a few seconds', async () => {
    mockClipboard(() => Promise.resolve());
    vi.useFakeTimers();

    element.querySelector<HTMLButtonElement>('.c-contact__email button')?.click();
    await vi.advanceTimersByTimeAsync(0);
    fixture.detectChanges();
    expect(status()).toBe('Indirizzo copiato');

    await vi.advanceTimersByTimeAsync(5000);
    fixture.detectChanges();
    expect(status()).toBe('');
  });
});
