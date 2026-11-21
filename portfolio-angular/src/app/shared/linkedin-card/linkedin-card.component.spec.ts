import { TestBed } from '@angular/core/testing';
import { LinkedinCardComponent } from './linkedin-card.component';

describe('LinkedinCardComponent', () => {
  async function render(): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [LinkedinCardComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LinkedinCardComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('is always visible: no button to press and nothing loaded from LinkedIn', async () => {
    const element = await render();

    expect(element.querySelector('button')).toBeNull();
    expect(element.querySelector('script, iframe')).toBeNull();
    expect(document.querySelectorAll('script[src*="linkedin"]')).toHaveLength(0);
    expect(element.textContent).toContain('Fabio Zagaria');
    expect(element.textContent).toContain('Junior Backend Developer');
    expect(element.textContent).toContain('Roma');
  });

  it('is a single accessible link to the profile that opens in a new tab', async () => {
    const element = await render();
    const links = element.querySelectorAll<HTMLAnchorElement>('a');

    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toBe('https://linkedin.com/in/fabiozagaria');
    expect(links[0].target).toBe('_blank');
    expect(links[0].rel).toBe('noopener noreferrer');
    // Il nome del collegamento è il suo testo visibile, più l'avviso per chi usa uno screen reader.
    expect(links[0].textContent).toContain('LinkedIn');
    expect(links[0].querySelector('.u-visually-hidden')?.textContent).toContain('nuova scheda');
    // La foto è decorativa: il nome è già nel testo del collegamento.
    expect(element.querySelector('img')?.getAttribute('alt')).toBe('');
  });
});
