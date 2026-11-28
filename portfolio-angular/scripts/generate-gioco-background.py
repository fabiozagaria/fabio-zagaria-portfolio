#!/usr/bin/env python3
"""Genera lo sfondo pixel art della pagina /gioco (src/assets/img/gioco-sfondo.webp).

Tessera 320x640 pixel, senza cuciture (nebulose periodiche, galassie lontane dai bordi),
con sfondo trasparente: il gradiente scuro della pagina resta visibile.
Toni volutamente bassi, perché il testo della pagina sta sopra l'immagine.
Uso: python3 scripts/generate-gioco-background.py   (richiede Pillow e NumPy)
"""
import math
from pathlib import Path

import numpy as np
from PIL import Image

W, H = 320, 640
SEED = 2811
OUT = Path(__file__).resolve().parent.parent / 'src/assets/img/gioco-sfondo.webp'
rng = np.random.default_rng(SEED)

BAYER = np.array([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]) / 16.0
YY, XX = np.mgrid[0:H, 0:W]
THRESHOLD = BAYER[YY % 4, XX % 4]

# Palette (RGBA). Nessun tono supera la luminanza che permette un contrasto 4.5:1 con il testo.
VIOLET = [(28, 17, 60), (36, 22, 78), (46, 29, 98)]
PINK = [(62, 24, 76)]
ARM = [(52, 34, 110), (96, 62, 170)]
CORE = (118, 92, 46)
BLUE = [(26, 40, 96), (44, 66, 140)]

img = np.zeros((H, W, 4), dtype=np.uint8)


def put(mask, color):
    img[mask] = (*color, 255)


def periodic_noise(components=14, low=2, high=8):
    """Rumore periodico isotropico: onde con vettori d'onda interi e direzioni casuali, valori 0..1.

    La tessera è alta il doppio che larga: la frequenza verticale è raddoppiata, così le nuvole
    non risultano stirate.
    """
    n = np.zeros((H, W))
    made = 0
    while made < components:
        kx, ky = (int(v) for v in rng.integers(-high, high + 1, size=2))
        mag = math.hypot(kx, ky)
        if mag < low or mag > high:
            continue
        phase = rng.uniform(0, 2 * math.pi)
        n += (1.0 / mag) * np.sin(2 * math.pi * (kx * XX / W + (2 * ky) * YY / H) + phase)
        made += 1
    n -= n.min()
    return n / n.max()


# 1. Nebulose a retino (due nuvole, violetta e rosa)
violet = periodic_noise(26, 2, 18)
for i, color in enumerate(VIOLET):
    level = 0.56 + 0.09 * i
    put(violet + (THRESHOLD - 0.5) * 0.12 > level, color)
pink = periodic_noise(20, 3, 20)
put(pink + (THRESHOLD - 0.5) * 0.14 > 0.76, PINK[0])


# 2. Galassie
def galaxy(cx, cy, radius, rot, tilt, arms=2, twist=3.0, kind='spiral'):
    x = XX - cx
    y = YY - cy
    c, s = math.cos(rot), math.sin(rot)
    xr = x * c + y * s
    yr = (-x * s + y * c) / tilt
    r = np.hypot(xr, yr)
    theta = np.arctan2(yr, xr)
    inside = r < radius
    fall = np.exp(-r / (radius * 0.45))
    if kind == 'spiral':
        arm = (np.cos(arms * theta - twist * np.log(r + 1.5)) + 1) / 2
        v = fall * (0.3 + 0.7 * arm)
        dust = rng.random((H, W)) < 0.05 * fall
        put(inside & dust, ARM[1])
        for i, color in enumerate(ARM):
            put(inside & (v + (THRESHOLD - 0.5) * 0.2 > 0.22 + 0.2 * i), color)
        put(r < radius * 0.12, CORE)
    else:
        v = fall
        for i, color in enumerate(BLUE):
            put(inside & (v + (THRESHOLD - 0.5) * 0.2 > 0.3 + 0.3 * i), color)
        put(r < radius * 0.1, (120, 130, 190))


galaxy(80, 120, 56, 0.5, 0.55)
galaxy(240, 340, 40, 2.4, 0.7, twist=2.4)
galaxy(140, 545, 32, 1.1, 0.45, arms=3, twist=3.6)
galaxy(268, 62, 20, 0.3, 0.6, kind='ellipse')
galaxy(190, 235, 16, 1.7, 0.8, kind='ellipse')
galaxy(52, 430, 32, 0.1, 0.2, kind='ellipse')  # di taglio

# 3. Stelle
palette = [((130, 120, 180), 0.70), ((235, 230, 255), 0.18), ((255, 210, 63), 0.07), ((255, 107, 157), 0.05)]
cols, probs = zip(*palette)
for _ in range(260):
    x, y = int(rng.integers(2, W - 2)), int(rng.integers(2, H - 2))
    color = cols[int(rng.choice(len(cols), p=probs))]
    img[y, x] = (*color, 255)
for _ in range(10):  # stelle a croce
    x, y = int(rng.integers(3, W - 3)), int(rng.integers(3, H - 3))
    for dx, dy in [(0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)]:
        img[y + dy, x + dx] = (200, 195, 235, 255)

Image.fromarray(img, 'RGBA').save(OUT, lossless=True, quality=100, method=6)
print(f'{OUT} {OUT.stat().st_size} byte')
