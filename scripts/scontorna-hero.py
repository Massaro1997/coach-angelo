"""
Scontorna Angelo per l'hero della home.

Nell'hero, come su Vali, il soggetto sta su una superficie di colore, non
dentro una foto con il suo sfondo.

La sorgente e' la stessa foto usata nell'hero fino a ora, Hero Banner 3.png:
posa da gara, corpo intero, sorride. Il banner ha il titolo cotto dentro
l'immagine, ma quello sta nella meta' sinistra, quindi si lavora sulla meta'
destra dove c'e' solo lui. Lo sfondo palestra viene rimosso con rembg
(isnet-general-use) e si tiene solo la macchia piu' grande.

    python scripts/scontorna-hero.py
"""
import numpy as np
from PIL import Image
from rembg import remove, new_session
from scipy import ndimage

SORGENTE = "public/images/Foto Angelo/Hero Banner 3.png"
USCITA = "public/images/Foto Angelo/hero-angelo.png"
MEZZA_DESTRA = (1700, 0, 2450)  # x0, y0, x1: dove sta lui, senza il titolo cotto
ALTEZZA = 1400  # l'hero non supera gli 820 px: oltre e' peso inutile
# Quanto della figura si taglia in basso: a figura intera, dentro una fascia
# alta meno di 800 px, la testa diventa piccola. Tagliando sotto il ginocchio
# lui occupa la stessa altezza ma si vede piu' grande (Calogero, 22.09.2026).
TAGLIO_GAMBE = 0.30

def main() -> None:
    im = Image.open(SORGENTE).convert("RGB")
    x0, y0, x1 = MEZZA_DESTRA
    crop = im.crop((x0, y0, x1, im.size[1]))

    sessione = new_session("isnet-general-use")
    ritaglio = remove(
        crop,
        session=sessione,
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=15,
        alpha_matting_erode_size=8,
    )

    # Via tutto cio' che non e' attaccato a lui (attrezzi, panche sul fondo).
    a = np.array(ritaglio)
    maschera = a[:, :, 3] > 40
    etichette, quante = ndimage.label(maschera)
    aree = ndimage.sum(maschera, etichette, range(1, quante + 1))
    principale = int(np.argmax(aree)) + 1
    a[:, :, 3] = np.where(etichette == principale, a[:, :, 3], 0)

    res = Image.fromarray(a)
    res = res.crop(res.getbbox())

    # via la parte bassa delle gambe
    l, al = res.size
    res = res.crop((0, 0, l, round(al * (1 - TAGLIO_GAMBE))))

    larghezza = round(res.size[0] * ALTEZZA / res.size[1])
    res.resize((larghezza, ALTEZZA), Image.LANCZOS).save(USCITA, optimize=True)
    print(f"{USCITA} {larghezza}x{ALTEZZA}")

if __name__ == "__main__":
    main()
