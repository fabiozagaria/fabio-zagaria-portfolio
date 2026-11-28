import { TranslatePipe } from '../../core/translate.pipe';
import { RichTextPipe } from '../../shared/rich-text/rich-text.pipe';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DiscordWidgetComponent } from '../../shared/discord-widget/discord-widget.component';
import { SkyComponent } from '../../shared/sky/sky.component';

@Component({
  selector: 'app-intelligenza-umana',
  standalone: true,
  imports: [TranslatePipe, RichTextPipe, RouterLink, SkyComponent, DiscordWidgetComponent],
  templateUrl: './intelligenza-umana.component.html',
  styleUrl: './intelligenza-umana.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntelligenzaUmanaComponent {}
