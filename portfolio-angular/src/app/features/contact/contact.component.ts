import { LinkedinCardComponent } from '../../shared/linkedin-card/linkedin-card.component';
import { SkyComponent } from '../../shared/sky/sky.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LinkedinCardComponent, SkyComponent],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}
