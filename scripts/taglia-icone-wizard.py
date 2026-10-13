"""
Le quattro icone della prima domanda del wizard ("Was ist dein Ziel?").

Calogero, 13/10/2026: "al posto di queste 4 icone fatte in svg crei 4 icone
fatte bene con nano banana pro in stile con il design del sito". Sono uscite
tutte e quattro in un foglio solo (brand/icone-wizard/foglio.png, 2x2 su
bianco), cosi' hanno la stessa luce e gli stessi materiali: qui il foglio si
taglia in quattro e il bianco diventa trasparente.

Il testo dato al modello (nano_banana_pro su Higgsfield, 1:1, 2K):

    A set of four matching 3D icons arranged in a clean 2 by 2 grid on a plain
    pure white background. Each icon is centred in its own quadrant with wide
    empty white space all around it: nothing touches or overlaps, nothing
    crosses the middle of the image, no borders, no frames, no grid lines, no
    text, no labels, no numbers, no letters. Style, identical for all four:
    premium 3D rendered icons for a modern fitness brand, bold simple shapes
    with smooth rounded edges, glossy brand red (#E30613, with a gradient from
    bright red #FF2B3A to deep red #C1000F) as the main colour, deep black
    (#121214) as the second colour, small white and polished chrome accents,
    soft studio lighting from the top left with clean highlights, only a very
    faint soft shadow directly under each object. Same scale, same
    three-quarter camera angle, same level of detail and the same materials on
    all four, so that they clearly belong to one family. Top left: a stylised
    flame with a smaller inner flame, for fat burning. Top right: a hexagonal
    dumbbell with black heads, a chrome handle and red rings, for muscle
    building. Bottom left: a balance scale with a black stand and two red pans
    hanging at slightly different heights, for body recomposition. Bottom
    right: a winner's trophy cup with two handles on a black base, red with
    chrome highlights, for competition. Clean, modern, minimal and high-end.
    No people, no hands, no scenery, no photographic background, no watermark.

Il bianco non si toglie con rembg (si mangerebbe le catenelle della bilancia):
si parte dai bordi e si svuota tutto il chiaro senza colore che ci e'
attaccato. L'ombra sotto l'oggetto resta, come nero trasparente. Su una
tessera bianca il risultato e' identico al foglio.

    python scripts/taglia-icone-wizard.py

Esce: public/images/wizard/<nome>.png (512 px)
"""
import os

import numpy as np
from PIL import Image
from scipy import ndimage

FOGLIO = "brand/icone-wizard/foglio.png"
USCITA = "public/images/wizard"
LATO = 512
MARGINE = 0.06  # aria intorno all'oggetto, sul lato
# nell'ordine del foglio: in alto a sinistra, in alto a destra, in basso...
NOMI = ["fiamma", "manubri", "bilancia", "coppa"]


def taglia(quadro: Image.Image, nome: str) -> None:
    a = np.asarray(quadro.convert("RGB")).astype(np.float32)
    massimo = a.max(axis=2)
    minimo = a.min(axis=2)
    saturazione = (massimo - minimo) / np.maximum(massimo, 1)
    chiaro = (saturazione < 0.10) & (massimo > 170)

    # solo il chiaro attaccato al bordo e' sfondo: i riflessi dentro restano
    etichette, _ = ndimage.label(chiaro)
    bordo = np.unique(np.concatenate([etichette[0], etichette[-1], etichette[:, 0], etichette[:, -1]]))
    sfondo = np.isin(etichette, bordo[bordo > 0])

    alfa = np.where(sfondo, 255 - minimo, 255).astype(np.uint8)
    rgb = np.where(sfondo[:, :, None], 0, a).astype(np.uint8)
    res = Image.fromarray(np.dstack([rgb, alfa]), "RGBA")

    # si rifila sull'oggetto (non sull'ombra piu' tenue) e si mette in un quadrato
    scatola = Image.fromarray(np.where(alfa > 24, 255, 0).astype(np.uint8)).getbbox()
    res = res.crop(scatola)
    lato = round(max(res.size) * (1 + 2 * MARGINE))
    tela = Image.new("RGBA", (lato, lato), (0, 0, 0, 0))
    tela.paste(res, ((lato - res.size[0]) // 2, (lato - res.size[1]) // 2))
    tela = tela.resize((LATO, LATO), Image.LANCZOS)
    os.makedirs(USCITA, exist_ok=True)
    tela.save(f"{USCITA}/{nome}.png", optimize=True)
    kb = os.path.getsize(f"{USCITA}/{nome}.png") // 1024
    print(f"{nome}: {LATO}x{LATO}, {kb} KB, scatola {scatola}")


def main() -> None:
    foglio = Image.open(FOGLIO)
    l, a = foglio.size[0] // 2, foglio.size[1] // 2
    for i, nome in enumerate(NOMI):
        x, y = (i % 2) * l, (i // 2) * a
        taglia(foglio.crop((x, y, x + l, y + a)), nome)


if __name__ == "__main__":
    main()
