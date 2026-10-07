"""
Scontorna le immagini fatte da scripts/genera-squadra.mjs.

Le sorgenti sono su fondo pieno (brand/squadra/<nome>.png). Lo sfondo si
toglie con rembg, come per l'hero (scripts/scontorna-hero.py): si tiene solo
la macchia piu' grande e si rifila.

Le tre figure della squadra vanno tutte alla stessa altezza, cosi' stanno in
scala fra loro quando sono affiancate. Il manubrio va a larghezza fissa.

    python scripts/scontorna-squadra.py            tutte
    python scripts/scontorna-squadra.py trainer    solo quella

Esce: public/images/squadra/<nome>.png
"""
import os
import sys

import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy import ndimage

SORGENTI = "brand/squadra"
USCITA = "public/images/squadra"

# nome -> ("altezza" | "larghezza", pixel)
# Nella pagina la figura grande non supera i 800 px, il manubrio i 260.
MISURE = {
    "angelo": ("altezza", 1300),
    "trainer": ("altezza", 1300),
    "ernaehrung": ("altezza", 1300),
    "manubrio": ("larghezza", 700),
}


def scontorna(nome: str, sessione) -> None:
    im = Image.open(f"{SORGENTI}/{nome}.png").convert("RGB")
    ritaglio = remove(
        im,
        session=sessione,
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=15,
        alpha_matting_erode_size=8,
    )

    # Via tutto cio' che non e' attaccato alla figura (anche l'ombra a terra).
    a = np.array(ritaglio)
    maschera = a[:, :, 3] > 40
    etichette, quante = ndimage.label(maschera)
    aree = ndimage.sum(maschera, etichette, range(1, quante + 1))
    principale = int(np.argmax(aree)) + 1
    a[:, :, 3] = np.where(etichette == principale, a[:, :, 3], 0)

    res = Image.fromarray(a)
    scatola = res.getbbox()
    res = res.crop(scatola)
    lato, px = MISURE[nome]
    if lato == "altezza":
        misura = (round(res.size[0] * px / res.size[1]), px)
    else:
        misura = (px, round(res.size[1] * px / res.size[0]))
    res = res.resize(misura, Image.LANCZOS)
    os.makedirs(USCITA, exist_ok=True)
    res.save(f"{USCITA}/{nome}.png", optimize=True)

    # pixel pieni sul bordo in alto e in basso: per le figure quello in basso
    # deve essere largo (arrivano fino alle cosce), quello in alto stretto.
    alfa = np.array(res)[:, :, 3]
    fondo = int((alfa[-1] > 40).sum())
    cima = int((alfa[0] > 40).sum())
    kb = os.path.getsize(f"{USCITA}/{nome}.png") // 1024
    print(f"{nome}: {res.size[0]}x{res.size[1]}, {kb} KB, scatola {scatola}, pixel pieni in cima {cima}, in fondo {fondo}")


def main() -> None:
    nomi = sys.argv[1:] or list(MISURE)
    sessione = new_session("isnet-general-use")
    for nome in nomi:
        scontorna(nome, sessione)


if __name__ == "__main__":
    main()
