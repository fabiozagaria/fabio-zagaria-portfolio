/** Colori usati per disegnare la stella e le icone; arrivano dalla palette CSS della pagina. */
export interface StarColors {
  readonly fg: string;
  readonly accent: string;
  readonly accent2: string;
}

export type PhaseKind = 'nebula' | 'proto' | 'main' | 'giant';

const STAR_SIZE = 40;
const ICON_SIZE = 8;

/** Stella 40x40 a pixel: nucleo con dithering a scacchiera, alone e quattro raggi. */
export function drawStar(ctx: CanvasRenderingContext2D, colors: StarColors): void {
  const mid = STAR_SIZE / 2;
  ctx.clearRect(0, 0, STAR_SIZE, STAR_SIZE);
  for (let y = 0; y < STAR_SIZE; y++) {
    for (let x = 0; x < STAR_SIZE; x++) {
      const d = Math.hypot(x + 0.5 - mid, y + 0.5 - mid);
      const checker = (x + y) % 2;
      if (d < 11) {
        const t = d / 11 + checker * 0.12;
        ctx.fillStyle = t < 0.45 ? colors.fg : t < 0.8 ? colors.accent : colors.accent2;
        ctx.globalAlpha = 1;
        ctx.fillRect(x, y, 1, 1);
      } else if (d < 14 && checker === 0) {
        ctx.fillStyle = colors.accent;
        ctx.globalAlpha = 0.45;
        ctx.fillRect(x, y, 1, 1);
      } else if (d < 17 && x % 2 === 0 && y % 2 === 0) {
        ctx.fillStyle = colors.accent2;
        ctx.globalAlpha = 0.25;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = colors.fg;
  for (const [x, y] of [
    [mid - 1, 2],
    [mid, 2],
    [mid - 1, STAR_SIZE - 3],
    [mid, STAR_SIZE - 3],
    [2, mid - 1],
    [2, mid],
    [STAR_SIZE - 3, mid - 1],
    [STAR_SIZE - 3, mid],
  ]) {
    ctx.fillRect(x, y, 1, 1);
  }
}

const ICONS: Record<PhaseKind, { radius: number; dither: boolean }> = {
  nebula: { radius: 3.9, dither: true },
  proto: { radius: 2.4, dither: false },
  main: { radius: 3.1, dither: false },
  giant: { radius: 3.9, dither: false },
};

/** Icona di fase 8x8: un disco di pixel, la nebulosa è a scacchiera. */
export function drawPhaseIcon(
  ctx: CanvasRenderingContext2D,
  kind: PhaseKind,
  colors: StarColors,
): void {
  const { radius, dither } = ICONS[kind];
  const [first, second] =
    kind === 'nebula'
      ? [colors.accent2, colors.accent]
      : kind === 'proto'
        ? [colors.accent, colors.accent2]
        : kind === 'main'
          ? [colors.fg, colors.accent]
          : [colors.accent2, colors.accent2];
  ctx.clearRect(0, 0, ICON_SIZE, ICON_SIZE);
  ctx.globalAlpha = 1;
  for (let y = 0; y < ICON_SIZE; y++) {
    for (let x = 0; x < ICON_SIZE; x++) {
      if (Math.hypot(x - 3.5, y - 3.5) < radius) {
        ctx.fillStyle = dither && (x + y) % 2 ? second : first;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}
