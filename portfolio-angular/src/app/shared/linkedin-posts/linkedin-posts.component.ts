import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LINKEDIN_POSTS } from '../../data/linkedin-posts.data';

const POST_URN = /^urn:li:(share|ugcPost|activity):\d+$/;
/** Il post inizia a caricarsi poco prima di entrare nella finestra, così è pronto quando arriva. */
const PRELOAD_MARGIN = '200px 0px';

/** Indirizzo del codice incorporato di LinkedIn, solo per un identificativo di post ben formato. */
export function linkedinEmbedUrl(urn: string): string | null {
  return POST_URN.test(urn) ? `https://www.linkedin.com/embed/feed/update/${urn}` : null;
}

/** Indirizzo pubblico del post, per aprirlo su LinkedIn. */
export function linkedinPostUrl(urn: string): string | null {
  return POST_URN.test(urn) ? `https://www.linkedin.com/feed/update/${urn}` : null;
}

interface EmbeddedPost {
  readonly urn: string;
  readonly height: number;
  readonly summary: string;
  readonly embed: SafeResourceUrl;
  readonly link: string;
}

/**
 * Post di LinkedIn incorporati con il codice ufficiale «Incorpora questo post» (un iframe). Sono
 * sempre visibili, ma l'iframe punta a una pagina vuota finché il post non sta per entrare nella
 * finestra: chi non scorre fin lì non contatta LinkedIn. (`loading="lazy"` non basta: su una pagina
 * corta come Contatti parte subito.) L'indirizzo dell'iframe è dichiarato sicuro solo dopo aver
 * verificato che l'identificativo sia davvero un post di LinkedIn; un valore sbagliato nei dati
 * non produce nulla.
 */
@Component({
  selector: 'app-linkedin-posts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (posts.length) {
      <section class="c-posts" aria-labelledby="posts-title">
        <h2 id="posts-title" class="c-contact__heading">Post in evidenza</h2>
        @for (post of posts; track post.urn) {
          <div class="c-posts__item" [attr.data-urn]="post.urn">
            <iframe
              class="c-posts__frame"
              [src]="loaded().has(post.urn) ? post.embed : blank"
              [style.height.px]="post.height"
              [attr.title]="'Post di LinkedIn: ' + post.summary"
              allowfullscreen
            ></iframe>
            <a [href]="post.link" target="_blank" rel="noopener noreferrer">
              Apri il post su LinkedIn
              <span class="u-visually-hidden">(si apre in una nuova scheda)</span>
            </a>
          </div>
        }
      </section>
    }
  `,
})
export class LinkedinPostsComponent implements AfterViewInit {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Pagina vuota: non fa nessuna richiesta. */
  readonly blank = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  readonly loaded = signal<ReadonlySet<string>>(new Set());
  readonly posts: readonly EmbeddedPost[] = LINKEDIN_POSTS.flatMap((post) => {
    const embed = linkedinEmbedUrl(post.urn);
    const link = linkedinPostUrl(post.urn);
    if (!embed || !link) return [];
    return [
      { ...post, embed: this.sanitizer.bypassSecurityTrustResourceUrl(embed), link },
    ] as EmbeddedPost[];
  });

  ngAfterViewInit(): void {
    if (!this.browser || !this.posts.length) return;
    // Senza IntersectionObserver (browser molto vecchi) il post si carica subito: meglio visibile.
    if (!('IntersectionObserver' in window)) {
      this.loaded.set(new Set(this.posts.map((post) => post.urn)));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const urn = (entry.target as HTMLElement).dataset['urn'];
          if (urn) this.loaded.update((current) => new Set(current).add(urn));
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    this.host.nativeElement
      .querySelectorAll<HTMLElement>('.c-posts__item')
      .forEach((item) => observer.observe(item));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
