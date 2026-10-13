"""
Scontorna le scene per l'hero fatte da scripts/genera-hero.mjs.

Le sorgenti sono su fondo pieno (brand/hero/<nome>.png). Come per la squadra
(scripts/scontorna-squadra.py) lo sfondo si toglie con rembg, ma qui le
persone sono due e non sempre si toccano: si tengono tutte le macchie grandi,
non solo la maggiore. Il resto (un pezzo di luce da studio in un angolo,
l'ombra a terra) va via.

    python scripts/scontorna-hero-scene.py           tutte
    python scripts/scontorna-hero-scene.py curl      solo quella

Esce: public/images/hero/<nome>.png
"""
import glob
import os
import sys

import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy import ndimage

SORGENTI = "brand/hero"
USCITA = "public/images/hero"
ALTEZZA = 1400  # come hero-angelo.png: l'hero non supera gli 820 px
# Una macchia resta se e' almeno questa parte della piu' grande: la seconda
# persona lo e' sempre, una luce nell'angolo no.
SOGLIA = 0.15


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

    a = np.array(ritaglio)
    maschera = a[:, :, 3] > 40
    etichette, quante = ndimage.label(maschera)
    aree = ndimage.sum(maschera, etichette, range(1, quante + 1))
    tenute = [i + 1 for i, area in enumerate(aree) if area >= SOGLIA * aree.max()]
    a[:, :, 3] = np.where(np.isin(etichette, tenute), a[:, :, 3], 0)

    res = Image.fromarray(a)
    scatola = res.getbbox()
    res = res.crop(scatola)
    misura = (round(res.size[0] * ALTEZZA / res.size[1]), ALTEZZA)
    res = res.resize(misura, Image.LANCZOS)
    os.makedirs(USCITA, exist_ok=True)
    res.save(f"{USCITA}/{nome}.png", optimize=True)
    kb = os.path.getsize(f"{USCITA}/{nome}.png") // 1024
    print(f"{nome}: {res.size[0]}x{res.size[1]}, {kb} KB, scatola {scatola}, macchie tenute {len(tenute)} su {quante}")


def main() -> None:
    nomi = sys.argv[1:] or sorted(
        os.path.splitext(os.path.basename(f))[0] for f in glob.glob(f"{SORGENTI}/*.png")
    )
    sessione = new_session("isnet-general-use")
    for nome in nomi:
        scontorna(nome, sessione)


if __name__ == "__main__":
    main()
