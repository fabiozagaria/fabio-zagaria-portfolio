import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { LoadingImageDirective } from './loading-image.directive';

@Component({
  imports: [LoadingImageDirective],
  template:
    '<a appLoadingImage href="/preview.webp"><img src="/preview.webp" alt="Anteprima progetto" width="800" height="450" /></a>',
})
class ImageHost {}

describe('LoadingImageDirective', () => {
  afterEach(() => vi.restoreAllMocks());

  it('reserves the image until load and clears the skeleton immediately', () => {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
    const fixture = TestBed.createComponent(ImageHost);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    const image = link.querySelector('img')!;
    expect(link.getAttribute('aria-busy')).toBe('true');
    image.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(link.classList.contains('image-loading')).toBe(false);
    expect(link.getAttribute('aria-busy')).toBe('false');
    expect(image.getAttribute('height')).toBe('450');
  });

  it('ends loading on failure and keeps the original image link available', () => {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
    const fixture = TestBed.createComponent(ImageHost);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    link.querySelector('img')!.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(link.classList.contains('image-failed')).toBe(true);
    expect(link.getAttribute('aria-busy')).toBe('false');
    expect(link.getAttribute('aria-label')).toContain('Anteprima non disponibile');
    expect(link.getAttribute('href')).toBe('/preview.webp');
  });

  it('handles an image already loaded from cache', () => {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(800);
    const fixture = TestBed.createComponent(ImageHost);
    fixture.detectChanges();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a').getAttribute('aria-busy')).toBe('false');
  });
});
