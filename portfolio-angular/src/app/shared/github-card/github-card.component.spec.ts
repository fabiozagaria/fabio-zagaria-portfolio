import { TestBed } from '@angular/core/testing';
import { GithubCardComponent } from './github-card.component';

describe('GithubCardComponent', () => {
  async function render(): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [GithubCardComponent] }).compileComponents();
    const fixture = TestBed.createComponent(GithubCardComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('is always visible and loads nothing from GitHub', async () => {
    const element = await render();

    expect(element.querySelector('button')).toBeNull();
    expect(element.querySelector('script, iframe, img')).toBeNull();
    expect(element.textContent).toContain('github.com/fabiozagaria');
  });

  it('lists the repositories of the main projects, taken from the project data', async () => {
    const element = await render();
    const items = Array.from(element.querySelectorAll<HTMLAnchorElement>('.c-place__repos a'));
    const names = items.map((link) => link.textContent?.replace(/\s+/g, ' ').trim());

    expect(names).toEqual([
      'Expense Tracker (Frontend) (si apre in una nuova scheda)',
      'Expense Tracker (Backend) (si apre in una nuova scheda)',
      'JobFlow (si apre in una nuova scheda)',
      'AccessDesk (si apre in una nuova scheda)',
    ]);
    expect(items.every((link) => link.href.startsWith('https://github.com/fabiozagaria/'))).toBe(
      true,
    );
    expect(element.querySelector('.c-place__repos')?.getAttribute('aria-labelledby')).toBe(
      'github-repos',
    );
  });

  it('opens every link in a new tab, safely, with no link inside another', async () => {
    const element = await render();
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('a'));

    expect(links).toHaveLength(5);
    for (const link of links) {
      expect(link.target).toBe('_blank');
      expect(link.rel).toBe('noopener noreferrer');
      expect(link.querySelector('.u-visually-hidden')?.textContent).toContain('nuova scheda');
    }
    expect(element.querySelectorAll('a a')).toHaveLength(0);
  });
});
