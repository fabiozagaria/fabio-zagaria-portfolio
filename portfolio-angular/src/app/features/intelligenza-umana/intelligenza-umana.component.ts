import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkyComponent } from '../../shared/sky/sky.component';

@Component({
  selector: 'app-intelligenza-umana',
  standalone: true,
  imports: [RouterLink, SkyComponent],
  templateUrl: './intelligenza-umana.component.html',
  styleUrl: './intelligenza-umana.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntelligenzaUmanaComponent {}
