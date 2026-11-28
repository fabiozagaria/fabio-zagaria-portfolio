import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { TranslatePipe } from '../../core/translate.pipe';
import { drawPhaseIcon, drawStar, PhaseKind, StarColors } from './pixel-art';

/** Ripiego se le variabili CSS non sono leggibili (stessi valori della palette in CSS). */
const FALLBACK_COLORS: StarColors = { fg: '#f2eaff', accent: '#ffd23f', accent2: '#ff6b9d' };

@Component({
  selector: 'app-gioco',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './gioco.component.html',
  styleUrl: './gioco.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiocoComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => this.paintPixelArt());
  }

  private paintPixelArt(): void {
    const root = this.host.nativeElement;
    const style = getComputedStyle(root.querySelector('.c-gioco') ?? root);
    const read = (name: string, fallback: string): string =>
      style.getPropertyValue(name).trim() || fallback;
    const colors: StarColors = {
      fg: read('--gioco-fg', FALLBACK_COLORS.fg),
      accent: read('--gioco-accent', FALLBACK_COLORS.accent),
      accent2: read('--gioco-accent2', FALLBACK_COLORS.accent2),
    };

    const star = root.querySelector<HTMLCanvasElement>('canvas.c-gioco__star');
    const starContext = star?.getContext('2d');
    if (starContext) drawStar(starContext, colors);

    for (const icon of Array.from(
      root.querySelectorAll<HTMLCanvasElement>('canvas.c-gioco__phase-icon'),
    )) {
      const context = icon.getContext('2d');
      if (context) drawPhaseIcon(context, icon.dataset['phase'] as PhaseKind, colors);
    }
  }
}
