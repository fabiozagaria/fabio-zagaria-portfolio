import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SkyLightDirective } from './sky-light.directive';

@Component({
  standalone: true,
  imports: [SkyLightDirective],
  template: `<div appSkyLight style="width: 400px; height: 200px"></div>`,
})
class HostComponent {}

function stubMotion(reduced: boolean): void {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce') ? reduced : false,
  }));
}

describe('SkyLightDirective', () => {
  let frames: FrameRequestCallback[];

  beforeEach(() => {
    stubMotion(false);
    frames = [];
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal('cancelAnimationFrame', () => undefined);
    TestBed.configureTestingModule({ imports: [HostComponent] });
  });

  afterEach(() => vi.unstubAllGlobals());

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    TestBed.tick();
    const host = (fixture.nativeElement as HTMLElement).firstElementChild as HTMLElement;
    host.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 200, right: 400, bottom: 200 }) as DOMRect;
    return host;
  }

  function flush(count = 200): void {
    for (let i = 0; i < count && frames.length; i++) frames.shift()!(i * 16);
  }

  const percent = (host: HTMLElement, name: string) =>
    parseFloat(host.style.getPropertyValue(name));

  function move(host: HTMLElement, x: number, y: number, pointerType = 'mouse'): PointerEvent {
    const event = new PointerEvent('pointermove', {
      clientX: x,
      clientY: y,
      pointerType,
      cancelable: true,
    });
    host.dispatchEvent(event);
    return event;
  }

  it('starts at the rest position', () => {
    const host = render();
    expect(host.classList.contains('c-sky-light')).toBe(true);
    expect(percent(host, '--light-x')).toBe(78);
    expect(percent(host, '--light-y')).toBe(22);
  });

  it('moves toward the pointer', () => {
    const host = render();
    move(host, 100, 100);
    flush(5);
    const x = percent(host, '--light-x');
    expect(x).toBeLessThan(78);
    expect(x).toBeGreaterThan(25);
    flush();
    expect(percent(host, '--light-x')).toBeCloseTo(25, 0);
  });

  it('follows a finger too', () => {
    const host = render();
    move(host, 100, 100, 'touch');
    flush();
    expect(percent(host, '--light-x')).toBeCloseTo(25, 0);
  });

  it('never blocks scrolling', () => {
    const host = render();
    const event = move(host, 100, 100, 'touch');
    const touch = new Event('touchmove', { cancelable: true });
    host.dispatchEvent(touch);
    expect(event.defaultPrevented).toBe(false);
    expect(touch.defaultPrevented).toBe(false);
  });

  it('returns to rest when the pointer leaves', () => {
    const host = render();
    move(host, 100, 100);
    flush();
    host.dispatchEvent(new PointerEvent('pointerleave'));
    flush();
    expect(percent(host, '--light-x')).toBeCloseTo(78, 0);
    expect(percent(host, '--light-y')).toBeCloseTo(22, 0);
  });

  it('stays still under reduced motion', () => {
    stubMotion(true);
    const host = render();
    move(host, 100, 100);
    flush();
    expect(percent(host, '--light-x')).toBe(78);
  });
});
