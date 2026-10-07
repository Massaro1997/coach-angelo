"""
Prepara le due foto di Angelo per la stampa (brand/stampa/assets).

1. angelo-copertina.png: la foto di gara scontornata dell'hero, ripulita sul
   bordo. Il ritaglio del sito ha un filo viola (le luci del palco) lungo
   braccia e capelli: a video passa, su carta bianca si vede. Si restringe la
   maschera di qualche pixel e si ammorbidisce.
2. angelo-tondo.jpg: testa e spalle per il tondo del coach nella brochure.
   Il viso si cerca con il riconoscitore di OpenCV, cosi' il taglio non va a
   occhio. In bianco e nero: il fumo fucsia del palco era l'unico colore
   fuori dal marchio.

    python scripts/prepara-foto-stampa.py
"""
import os

import cv2
import numpy as np
from PIL import Image

USCITA = "brand/stampa/assets"
os.makedirs(USCITA, exist_ok=True)

# x, y, lato del quadrato "testa e spalle" dentro angelo-3.jpg
TAGLIO_TONDO = (293, 120, 480)


def copertina() -> None:
    im = np.array(Image.open("public/images/Foto Angelo/hero-angelo.png").convert("RGBA"))
    alfa = im[:, :, 3].copy()
    stretta = cv2.erode(alfa, np.ones((3, 3), np.uint8), iterations=3)
    morbida = cv2.GaussianBlur(stretta, (0, 0), 0.9)
    im[:, :, 3] = np.minimum(morbida, alfa)
    Image.fromarray(im).save(f"{USCITA}/angelo-copertina.png", optimize=True)
    print("copertina:", im.shape[1], "x", im.shape[0], "pixel pieni prima", int((alfa > 40).sum()), "dopo", int((im[:, :, 3] > 40).sum()))


def tondo() -> None:
    sorgente = "public/images/Foto Angelo/angelo-3.jpg"
    im = cv2.imread(sorgente)
    # Questo OpenCV non ha il riconoscitore dei visi, quindi il taglio e'
    # scritto a mano: nella foto (1066 x 1600) la testa sta fra 205 e 470 px
    # dall'alto, al centro. Testa e spalle = un quadrato di 520 px.
    x0, y0, lato = TAGLIO_TONDO
    ritaglio = im[y0 : y0 + lato, x0 : x0 + lato]
    bn = cv2.cvtColor(ritaglio, cv2.COLOR_BGR2GRAY)
    # un filo di contrasto in piu', senza bruciare
    bn = cv2.createCLAHE(clipLimit=1.6, tileGridSize=(8, 8)).apply(bn)
    bn = cv2.resize(bn, (700, 700), interpolation=cv2.INTER_AREA)
    cv2.imwrite(f"{USCITA}/angelo-tondo.jpg", bn, [cv2.IMWRITE_JPEG_QUALITY, 90])
    print(f"tondo: ritaglio da ({x0},{y0}) lato {lato} su {im.shape[1]}x{im.shape[0]}")


if __name__ == "__main__":
    copertina()
    tondo()
