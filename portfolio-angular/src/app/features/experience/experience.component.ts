import { TranslatePipe } from '../../core/translate.pipe';
import { RichTextPipe } from '../../shared/rich-text/rich-text.pipe';
import { SkyComponent } from '../../shared/sky/sky.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TranslatePipe, RichTextPipe, SkyComponent],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {}
