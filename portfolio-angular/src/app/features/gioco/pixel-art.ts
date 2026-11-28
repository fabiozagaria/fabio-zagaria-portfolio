/** Colori usati per disegnare la stella e le icone; arrivano dalla palette CSS della pagina. */
export interface StarColors {
  readonly fg: string;
  readonly accent: string;
  readonly accent2: string;
}

const STAR_SIZE = 40;

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
