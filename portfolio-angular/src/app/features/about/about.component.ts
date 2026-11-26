import { StackMarqueeComponent } from './stack-marquee.component';
import { TranslatePipe } from '../../core/translate.pipe';
import { RichTextPipe } from '../../shared/rich-text/rich-text.pipe';
import { SkyComponent } from '../../shared/sky/sky.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [StackMarqueeComponent, TranslatePipe, RichTextPipe, SkyComponent],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly projectCount = PROJECTS.length;
}
