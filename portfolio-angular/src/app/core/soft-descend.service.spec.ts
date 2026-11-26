import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SoftDescendService } from './soft-descend.service';

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

describe('SoftDescendService', () => {
  let callback: ObserverCallback | undefined;
  let observed: Element[];
  let host: HTMLElement;

  function block(id: string, top: number): HTMLElement {
    const element = document.createElement('p');
    element.id = id;
    element.getBoundingClientRect = () => ({ top }) as DOMRect;
    host.querySelector('.o-container')!.append(element);
    return element;
  }

  async function open(reduceMotion = false, withObserver = true): Promise<void> {
    vi.stubGlobal('requestAnimationFrame', (run: FrameRequestCallback) => {
      run(0);
      return 0;
    });
    vi.stubGlobal('matchMedia', () => ({ matches: reduceMotion }) as MediaQueryList);
    if (withObserver) {
      vi.stubGlobal(
        'IntersectionObserver',
        class {
          constructor(run: ObserverCallback) {
            callback = run;
          }
          observe(element: Element): void {
            observed.push(element);
          }
          unobserve(): void {}
          disconnect(): void {}
        },
      );
    } else {
      vi.stubGlobal('IntersectionObserver', undefined);
    }
    TestBed.configureTestingModule({ providers: [provideRouter([{ path: '', children: [] }])] });
    TestBed.inject(SoftDescendService);
    await TestBed.inject(Router).navigateByUrl('/');
  }

  beforeEach(() => {
    callback = undefined;
    observed = [];
    host = document.createElement('section');
    host.innerHTML = '<div class="o-container"></div>';
    document.body.append(host);
  });

  afterEach(() => {
    host.remove();
    vi.unstubAllGlobals();
  });

  it('staggers the blocks that are already in view and pauses the ones below the fold', async () => {
    const first = block('first', 100);
    const second = block('second', 300);
    const below = block('below', 5000);
    await open();

    expect(first.style.getPropertyValue('--soft-delay')).toBe('0ms');
    expect(second.style.getPropertyValue('--soft-delay')).toBe('110ms');
    expect(first.dataset['soft']).toBeUndefined();
    expect(below.dataset['soft']).toBe('wait');
    expect(observed).toEqual([below]);
  });

  it('lets a paused block go once it comes into view', async () => {
    const below = block('below', 5000);
    await open();

    callback?.([{ target: below, isIntersecting: true }]);

    expect(below.dataset['soft']).toBeUndefined();
    expect(below.style.getPropertyValue('--soft-delay')).toBe('0ms');
  });

  it('does nothing when the visitor asks for reduced motion', async () => {
    const below = block('below', 5000);
    await open(true);

    expect(below.dataset['soft']).toBeUndefined();
    expect(observed).toEqual([]);
  });

  it('does nothing, and keeps everything visible, without IntersectionObserver', async () => {
    const below = block('below', 5000);
    await open(false, false);

    expect(below.dataset['soft']).toBeUndefined();
    expect(below.style.getPropertyValue('--soft-delay')).toBe('');
  });
});
