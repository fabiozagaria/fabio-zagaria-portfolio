import { TestBed } from '@angular/core/testing';
import { LINKEDIN_POSTS } from '../../data/linkedin-posts.data';
import {
  LinkedinPostsComponent,
  linkedinEmbedUrl,
  linkedinPostUrl,
} from './linkedin-posts.component';

interface Watcher {
  callback: (entries: { isIntersecting: boolean; target: Element }[]) => void;
  targets: Element[];
  options: IntersectionObserverInit | undefined;
}

describe('LinkedinPostsComponent', () => {
  const EMBED = 'https://www.linkedin.com/embed/feed/update/urn:li:share:7523844441846140928';
  let watchers: Watcher[];

  beforeEach(() => {
    watchers = [];
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        private readonly watcher: Watcher;
        constructor(callback: Watcher['callback'], options?: IntersectionObserverInit) {
          this.watcher = { callback, targets: [], options };
          watchers.push(this.watcher);
        }
        observe(target: Element): void {
          this.watcher.targets.push(target);
        }
        unobserve(): void {}
        disconnect(): void {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function render() {
    await TestBed.configureTestingModule({ imports: [LinkedinPostsComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LinkedinPostsComponent);
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('shows each post in an iframe but does not contact LinkedIn until the post is about to be seen', async () => {
    const { fixture, element } = await render();
    const frame = element.querySelector<HTMLIFrameElement>('iframe') as HTMLIFrameElement;

    expect(element.querySelectorAll('iframe')).toHaveLength(LINKEDIN_POSTS.length);
    expect(frame.getAttribute('src')).toBe('about:blank');
    expect(element.innerHTML).not.toContain('linkedin.com/embed');
    expect(frame.getAttribute('title')).toContain('Post di LinkedIn');
    expect(frame.style.height).toBe('1160px');
    expect(element.querySelector('script')).toBeNull();

    // Il post entra (quasi) nella finestra: solo ora l'iframe punta a LinkedIn.
    expect(watchers).toHaveLength(1);
    expect(watchers[0].options?.rootMargin).toBe('200px 0px');
    watchers[0].callback([{ isIntersecting: false, target: watchers[0].targets[0] }]);
    fixture.detectChanges();
    expect(frame.getAttribute('src')).toBe('about:blank');

    watchers[0].callback([{ isIntersecting: true, target: watchers[0].targets[0] }]);
    fixture.detectChanges();
    expect(frame.getAttribute('src')).toBe(EMBED);
  });

  it('loads the post straight away where the browser cannot tell when it is visible', async () => {
    vi.unstubAllGlobals();
    Reflect.deleteProperty(window, 'IntersectionObserver');
    const { element } = await render();

    expect(element.querySelector('iframe')?.getAttribute('src')).toBe(EMBED);
  });

  it('offers a plain link to open the post, so it is reachable even if the frame is blocked', async () => {
    const { element } = await render();
    const link = element.querySelector<HTMLAnchorElement>('a');

    expect(link?.getAttribute('href')).toBe(
      'https://www.linkedin.com/feed/update/urn:li:share:7523844441846140928',
    );
    expect(link?.target).toBe('_blank');
    expect(link?.rel).toBe('noopener noreferrer');
    expect(link?.querySelector('.u-visually-hidden')?.textContent).toContain('nuova scheda');
  });

  it('only builds an address for a well-formed LinkedIn post identifier', () => {
    expect(linkedinEmbedUrl('urn:li:share:7523844441846140928')).toContain(
      'linkedin.com/embed/feed/update/',
    );
    expect(linkedinPostUrl('urn:li:ugcPost:123')).toBe(
      'https://www.linkedin.com/feed/update/urn:li:ugcPost:123',
    );
    for (const wrong of [
      '',
      'javascript:alert(1)',
      'https://evil.example/x',
      'urn:li:share:abc',
      'urn:li:share:123/../../x',
      ' urn:li:share:123',
    ]) {
      expect(linkedinEmbedUrl(wrong), `«${wrong}» non deve produrre un indirizzo`).toBeNull();
      expect(linkedinPostUrl(wrong)).toBeNull();
    }
  });

  it('keeps the data valid: every post has a usable identifier, height and summary', () => {
    for (const post of LINKEDIN_POSTS) {
      expect(linkedinEmbedUrl(post.urn), post.urn).not.toBeNull();
      expect(post.height).toBeGreaterThan(200);
      expect(post.summary.length).toBeGreaterThan(10);
    }
  });
});
