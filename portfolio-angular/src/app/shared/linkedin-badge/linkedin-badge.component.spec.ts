import { TestBed } from '@angular/core/testing';
import { LinkedinBadgeComponent } from './linkedin-badge.component';

describe('LinkedinBadgeComponent', () => {
  function scripts(): HTMLScriptElement[] {
    return Array.from(document.querySelectorAll<HTMLScriptElement>('script[data-linkedin-badge]'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LinkedinBadgeComponent] }).compileComponents();
  });

  afterEach(() => {
    scripts().forEach((script) => script.remove());
  });

  it('contacts LinkedIn only after the visitor asks for it', () => {
    const fixture = TestBed.createComponent(LinkedinBadgeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(scripts()).toHaveLength(0);
    expect(element.querySelector('.LI-profile-badge')).toBeNull();
    expect(element.textContent).toContain('solo se lo chiedi');
    // Senza consenso resta un collegamento normale, che apre il profilo in una nuova scheda.
    const open = element.querySelector<HTMLAnchorElement>('a.c-btn');
    expect(open?.getAttribute('href')).toContain('linkedin.com/in/fabiozagaria');
    expect(open?.rel).toBe('noopener noreferrer');
  });

  it('mounts the profile badge and then the LinkedIn script on request', () => {
    const fixture = TestBed.createComponent(LinkedinBadgeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    element.querySelector<HTMLButtonElement>('button')?.click();
    fixture.detectChanges();

    const badge = element.querySelector<HTMLElement>('.LI-profile-badge');
    expect(badge?.dataset['vanity']).toBe('fabiozagaria');
    expect(badge?.dataset['type']).toBe('HORIZONTAL');
    expect(badge?.dataset['locale']).toBe('it_IT');
    // Il badge è già nella pagina quando lo script parte, e ha un link di riserva.
    expect(badge?.querySelector<HTMLAnchorElement>('a')?.rel).toBe('noopener noreferrer');
    expect(scripts()).toHaveLength(1);
    expect(scripts()[0].src).toBe('https://platform.linkedin.com/badges/js/profile.js');
    expect(element.querySelector('button')).toBeNull();
  });

  it('keeps a single script when the badge is requested again after coming back to the page', () => {
    for (let visit = 0; visit < 2; visit++) {
      const fixture = TestBed.createComponent(LinkedinBadgeComponent);
      fixture.detectChanges();
      (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button')?.click();
    }
    expect(scripts()).toHaveLength(1);
  });

  it('explains the failure and offers the direct link if LinkedIn cannot be loaded', () => {
    const fixture = TestBed.createComponent(LinkedinBadgeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLButtonElement>('button')?.click();
    scripts()[0].dispatchEvent(new Event('error'));
    fixture.detectChanges();

    const status = element.querySelector('[role="status"]');
    expect(status?.textContent).toContain('Non sono riuscito a caricare');
    expect(status?.querySelector('a')?.getAttribute('href')).toContain('linkedin.com/in/');
  });
});
