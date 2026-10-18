"""
La foto dell'hero dal 16/10/2026: Angelo da solo, con la cartellina del
"TRAININGSPLAN" in mano e la penna nell'altra.

Calogero, 16/10: "mettine una diversa di lui ad esempio da solo mentre che ha
un taccuino in mano ... o un iPad", "pero' non cambiare la sua faccia o altro".

Nelle foto da studio Angelo ha sempre le braccia incrociate, quindi il corpo
con la cartellina lo fa il modello (Higgsfield, nano_banana_pro, partendo da
brand/foto-profilo/chiaro-a-ritocco-2.png): brand/hero/angelo-cartellina-gen2.png.
Il modello pero' la faccia la ridisegna sempre (vedi componi-hero.py), quindi
qui sopra la maglietta generata si rimette la foto vera: testa, collo e un po'
di sfondo intorno, allineati sugli occhi, il naso e la bocca. I pixel della
faccia sono quelli della foto da studio.

    python scripts/componi-hero-cartellina.py

Esce: brand/hero/angelo-cartellina.png (intera, con lo sfondo) e
public/images/hero/angelo-cartellina.png (scontornata, per il sito)
"""
import cv2
import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy import ndimage

VERA = "brand/foto-profilo/chiaro-a-ritocco-2.png"
GENERATA = "brand/hero/angelo-cartellina-gen2.png"
USCITA_INTERA = "brand/hero/angelo-cartellina.png"
USCITA_SITO = "public/images/hero/angelo-cartellina.png"
ALTEZZA_SITO = 1600

# Nella foto generata (1792 x 2400): dove stanno la testa per cercare i punti
# in comune, e la riga sotto il mento da cui in giu' puo' cominciare la maglia.
TESTA_VERA = (480, 1200, 620, 1250)  # y0, y1, x0, x1
TESTA_GENERATA = (200, 950, 620, 1250)
SOTTO_MENTO = 875


def sagoma(bgr: np.ndarray, sessione) -> np.ndarray:
    im = Image.fromarray(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB))
    return np.array(remove(im, session=sessione, only_mask=True))


def allinea(vera: np.ndarray, generata: np.ndarray) -> np.ndarray:
    """Similitudine (scala, rotazione, spostamento) che porta la testa vera
    sopra quella generata, dai punti SIFT in comune."""

    def maschera(im, r):
        m = np.zeros(im.shape[:2], np.uint8)
        m[r[0]:r[1], r[2]:r[3]] = 255
        return m

    sift = cv2.SIFT_create(8000)
    kv, dv = sift.detectAndCompute(cv2.cvtColor(vera, cv2.COLOR_BGR2GRAY), maschera(vera, TESTA_VERA))
    kg, dg = sift.detectAndCompute(cv2.cvtColor(generata, cv2.COLOR_BGR2GRAY), maschera(generata, TESTA_GENERATA))
    coppie = [a for a, b in cv2.BFMatcher().knnMatch(dv, dg, k=2) if a.distance < 0.75 * b.distance]
    da = np.float32([kv[c.queryIdx].pt for c in coppie])
    a = np.float32([kg[c.trainIdx].pt for c in coppie])
    m, _ = cv2.estimateAffinePartial2D(da, a, method=cv2.RANSAC, ransacReprojThreshold=4)
    return m


def maglia(im: np.ndarray, alfa: np.ndarray, righe: np.ndarray) -> np.ndarray:
    """La maglietta nera: quello che e' persona ma non pelle, piu' tutto il
    nero sotto il mento. Le due cose insieme prendono anche i riflessi grigi
    sulle spalle e la punta del colletto."""
    b, _, r = [im[..., i].astype(int) for i in range(3)]
    lum = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY).astype(int)
    pelle = (r - b > 35) & (lum > 55)
    m = (((alfa > 60) & ~pelle) | ((lum < 90) & (r - b < 35))) & (righe > SOTTO_MENTO)
    m = ndimage.binary_opening(m, np.ones((5, 5)))
    m = ndimage.binary_closing(m, np.ones((9, 9)))
    etichette, quante = ndimage.label(m)
    aree = ndimage.sum(m, etichette, range(1, quante + 1))
    return etichette == int(np.argmax(aree)) + 1


def main() -> None:
    vera = cv2.imread(VERA)
    gen = cv2.imread(GENERATA)
    h, w = gen.shape[:2]
    sessione = new_session("isnet-general-use")

    m = allinea(vera, gen)
    v = cv2.warpAffine(vera, m, (w, h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REPLICATE)
    alfa_v = cv2.warpAffine(sagoma(vera, sessione), m, (w, h))
    alfa_g = sagoma(gen, sessione)
    righe = np.repeat(np.arange(h)[:, None], w, 1)

    maglia_g = maglia(gen, alfa_g, righe)
    maglia_v = maglia(v, alfa_v, righe)

    # Dalla foto vera si prende tutto quello che sta sopra la maglietta
    # generata, colonna per colonna...
    sopra = np.ones((h, w), np.float32)
    cima = np.where(maglia_g.any(0), maglia_g.argmax(0), h)
    sopra[righe >= cima[None, :]] = 0
    sopra = cv2.GaussianBlur(sopra, (0, 0), 2)
    # ...ma solo vicino alla testa e al collo, sfumando nello sfondo...
    testa = ((alfa_v > 128) & ~maglia_v & (righe < 1100)).astype(np.uint8)
    vicino = cv2.dilate(testa, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (241, 241))).astype(np.float32)
    vicino = cv2.GaussianBlur(vicino, (0, 0), 25)
    # ...e senza la sua maglietta, che con le braccia incrociate sta piu' in alto.
    via = cv2.dilate(maglia_v.astype(np.uint8), np.ones((15, 15), np.uint8)).astype(np.float32)
    via = cv2.GaussianBlur(via, (0, 0), 3)

    peso = np.clip(sopra * (1 - via) * vicino, 0, 1)[..., None]
    intera = (v * peso + gen * (1 - peso)).astype(np.uint8)
    cv2.imwrite(USCITA_INTERA, intera)

    # Per il sito: scontornata, tagliata ai bordi della figura.
    ritaglio = remove(
        Image.fromarray(cv2.cvtColor(intera, cv2.COLOR_BGR2RGB)),
        session=sessione,
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=15,
        alpha_matting_erode_size=8,
    )
    a = np.array(ritaglio)
    pieno = a[:, :, 3] > 40
    etichette, quante = ndimage.label(pieno)
    aree = ndimage.sum(pieno, etichette, range(1, quante + 1))
    a[:, :, 3] = np.where(etichette == int(np.argmax(aree)) + 1, a[:, :, 3], 0)
    sito = Image.fromarray(a)
    sito = sito.crop(sito.getbbox())
    scala = ALTEZZA_SITO / sito.size[1]
    sito = sito.resize((round(sito.size[0] * scala), ALTEZZA_SITO), Image.LANCZOS)
    sito.save(USCITA_SITO, optimize=True)
    print(USCITA_INTERA, intera.shape[1::-1], "|", USCITA_SITO, sito.size)


if __name__ == "__main__":
    main()
