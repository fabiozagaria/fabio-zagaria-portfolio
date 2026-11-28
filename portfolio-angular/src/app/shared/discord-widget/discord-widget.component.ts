import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '../../core/translate.pipe';

/** Widget ufficiale (pubblico, sola lettura) del server Discord di Intelligenza Umana. */
const WIDGET_URL = 'https://discord.com/widget?id=1575893115879956510&theme=dark';

@Component({
  selector: 'app-discord-widget',
  standalone: true,
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <iframe
      [src]="url"
      [title]="'Server Discord di Intelligenza Umana: membri online e canali' | translate"
      width="350"
      height="500"
      loading="lazy"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    ></iframe>
  `,
  styles: `
    :host {
      display: block;
      max-width: 350px;
      margin: 0;
    }
    iframe {
      display: block;
      width: 100%;
      height: 500px;
      border: 0;
      border-radius: var(--radius-md);
    }
  `,
})
export class DiscordWidgetComponent {
  readonly url: SafeResourceUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(WIDGET_URL);
}
