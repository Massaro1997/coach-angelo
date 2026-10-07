"""
Rifa' lo sfondo dell'hero (public/images/hero-hintergrund.jpg).

L'hero e la chiamata all'azione in fondo alla pagina mostrano lo stesso posto:
la palestra vuota al crepuscolo, coi LED rossi appena accennati. Nell'hero e'
ribaltata in orizzontale (Calogero, 22.09.2026), cosi' si riconosce come lo
stesso ambiente senza sembrare la stessa foto incollata due volte.

L'immagine di partenza la genera scripts/genera-sfondo-cta.py. Se manca, la
si rifa' prima quella:

    REPLICATE_API_TOKEN=... python scripts/genera-sfondo-cta.py
    python scripts/genera-sfondo.py
"""
import os
import sys

from PIL import Image, ImageOps

SORGENTE = "public/images/cta-studio.jpg"
USCITA = "public/images/hero-hintergrund.jpg"

def main() -> None:
    if not os.path.exists(SORGENTE):
        print(f"manca {SORGENTE}: esegui prima scripts/genera-sfondo-cta.py")
        sys.exit(1)
    im = Image.open(SORGENTE).convert("RGB")
    ImageOps.mirror(im).save(USCITA, quality=86, optimize=True, progressive=True)
    print(f"{USCITA} {im.size[0]}x{im.size[1]} (specchiata da {SORGENTE})")

if __name__ == "__main__":
    main()
