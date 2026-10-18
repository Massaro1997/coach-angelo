"""
Il ritratto di Natalie dal 16/10/2026: la sua foto vera, scontornata, con la
maglietta FitPrimo al posto della maglia nera a maniche lunghe.

Calogero, 16/10: "prova a rimettere la sua originale solo con sfondo tolto e
cambiagli la maglia, non cambiare nulla di lei". Il ritratto di prima
(collaboratrice.png del 13/10) era rifatto tutto dal modello, faccia compresa.

La maglietta la fa il modello (Higgsfield, nano_banana_pro, dalla sua foto e
dal logo): brand/squadra/collaboratrice-maglia-gen.png. Il modello pero'
ridisegna anche la faccia e i capelli, quindi qui sopra la maglietta generata
si rimette la foto vera, allineata sugli occhi, il naso e la bocca: faccia,
capelli e collo sono i suoi pixel. Dal modello restano solo la maglietta e gli
avambracci, che prima erano coperti dalle maniche. Gli occhi restano come nella
foto, anche il rosso del flash.

    python scripts/componi-natalie-maglia.py

Esce: brand/squadra/collaboratrice-vera.png (intera, con il muro) e
public/images/squadra/collaboratrice-vera.png (scontornata, per il sito)
"""
import cv2
import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy import ndimage

VERA = "brand/squadra/sorgenti/collaboratrice.jpeg"
GENERATA = "brand/squadra/collaboratrice-maglia-gen.png"
USCITA_INTERA = "brand/squadra/collaboratrice-vera.png"
USCITA_SITO = "public/images/squadra/collaboratrice-vera.png"
# Le schede della squadra la vogliono alta 1300 (height={1300} in page.tsx).
ALTEZZA_SITO = 1300

# Nella foto generata (1856 x 2304): la faccia per i punti in comune, la riga
# sotto il mento da cui in giu' puo' cominciare la maglia.
FACCIA_GENERATA = (650, 1200, 650, 1250)  # y0, y1, x0, x1
SOTTO_MENTO = 1180

# 16/10: "migliora solo leggermente la luce nella foto e basta". Una curva
# morbida sulla luminosita' (canale L): ombre del viso e del collo un po' piu'
# aperte, il lucido del flash appena piu' basso, il nero della maglia resta
# nero. Colori e forme non si toccano.
LUCE_DA = [0, 0.10, 0.30, 0.55, 0.75, 0.90, 1.0]
LUCE_A = [0, 0.105, 0.335, 0.58, 0.765, 0.885, 0.965]


def allinea(vera: np.ndarray, generata: np.ndarray) -> np.ndarray:
    """Similitudine che porta la foto vera sopra la generata, dai punti SIFT
    della faccia. La foto vera e' piu' piccola: la sua faccia si cerca nella
    stessa zona riportata in scala."""
    s = vera.shape[0] / generata.shape[0]
    y0, y1, x0, x1 = FACCIA_GENERATA
    mv = np.zeros(vera.shape[:2], np.uint8)
    mv[int(y0 * s):int(y1 * s), int(x0 * s):int(x1 * s)] = 255
    mg = np.zeros(generata.shape[:2], np.uint8)
    mg[y0:y1, x0:x1] = 255
    sift = cv2.SIFT_create(8000)
    kv, dv = sift.detectAndCompute(cv2.cvtColor(vera, cv2.COLOR_BGR2GRAY), mv)
    kg, dg = sift.detectAndCompute(cv2.cvtColor(generata, cv2.COLOR_BGR2GRAY), mg)
    coppie = [a for a, b in cv2.BFMatcher().knnMatch(dv, dg, k=2) if a.distance < 0.75 * b.distance]
    da = np.float32([kv[c.queryIdx].pt for c in coppie])
    a = np.float32([kg[c.trainIdx].pt for c in coppie])
    m, dentro = cv2.estimateAffinePartial2D(da, a, method=cv2.RANSAC, ransacReprojThreshold=4)
    print(f"punti in comune {len(coppie)}, buoni {int(dentro.sum())}")
    return m


def maglia(im: np.ndarray, righe: np.ndarray) -> np.ndarray:
    """La maglia nera sotto il mento. Solo il nero: i capelli biondi che le
    cadono sopra non sono maglia."""
    b, _, r = [im[..., i].astype(int) for i in range(3)]
    lum = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY).astype(int)
    m = (lum < 80) & (r - b < 35) & (righe > SOTTO_MENTO)
    m = ndimage.binary_opening(m, np.ones((5, 5)))
    m = ndimage.binary_closing(m, np.ones((9, 9)))
    etichette, quante = ndimage.label(m)
    aree = ndimage.sum(m, etichette, range(1, quante + 1))
    return etichette == int(np.argmax(aree)) + 1


def luce(rgb: np.ndarray) -> np.ndarray:
    lab = cv2.cvtColor(rgb, cv2.COLOR_RGB2LAB).astype(np.float32)
    lab[..., 0] = np.interp(lab[..., 0] / 255, LUCE_DA, LUCE_A) * 255
    return cv2.cvtColor(np.clip(lab, 0, 255).astype(np.uint8), cv2.COLOR_LAB2RGB)


def main() -> None:
    vera = cv2.imread(VERA)
    gen = cv2.imread(GENERATA)
    h, w = gen.shape[:2]
    sessione = new_session("isnet-general-use")

    m = allinea(vera, gen)
    v = cv2.warpAffine(vera, m, (w, h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REPLICATE)
    sagoma_v = np.array(remove(Image.fromarray(cv2.cvtColor(v, cv2.COLOR_BGR2RGB)), session=sessione, only_mask=True))
    righe = np.repeat(np.arange(h)[:, None], w, 1)

    maglia_g = maglia(gen, righe)
    maglia_v = maglia(v, righe)

    # Dalla foto vera tutto quello che sta sopra la maglietta generata,
    # colonna per colonna, vicino a lei e senza la sua maglia vecchia.
    sopra = np.ones((h, w), np.float32)
    cima = np.where(maglia_g.any(0), maglia_g.argmax(0), h)
    sopra[righe >= cima[None, :]] = 0
    sopra = cv2.GaussianBlur(sopra, (0, 0), 3)
    lei = ((sagoma_v > 128) & ~maglia_v).astype(np.uint8)
    vicino = cv2.dilate(lei, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (121, 121))).astype(np.float32)
    vicino = cv2.GaussianBlur(vicino, (0, 0), 15)
    via = cv2.dilate(maglia_v.astype(np.uint8), np.ones((9, 9), np.uint8)).astype(np.float32)
    via = cv2.GaussianBlur(via, (0, 0), 3)

    peso = np.clip(sopra * (1 - via) * vicino, 0, 1)[..., None]
    intera = (v * peso + gen * (1 - peso)).astype(np.uint8)
    cv2.imwrite(USCITA_INTERA, intera)

    ritaglio = remove(
        Image.fromarray(cv2.cvtColor(intera, cv2.COLOR_BGR2RGB)),
        session=sessione,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10,
    )
    a = np.array(ritaglio)
    pieno = a[:, :, 3] > 40
    etichette, quante = ndimage.label(pieno)
    aree = ndimage.sum(pieno, etichette, range(1, quante + 1))
    a[:, :, 3] = np.where(etichette == int(np.argmax(aree)) + 1, a[:, :, 3], 0)
    a[:, :, :3] = luce(a[:, :, :3])
    sito = Image.fromarray(a)
    sito = sito.crop(sito.getbbox())
    scala = ALTEZZA_SITO / sito.size[1]
    sito = sito.resize((round(sito.size[0] * scala), ALTEZZA_SITO), Image.LANCZOS)
    sito.save(USCITA_SITO, optimize=True)
    print(USCITA_INTERA, intera.shape[1::-1], "|", USCITA_SITO, sito.size)


if __name__ == "__main__":
    main()
