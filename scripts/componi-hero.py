"""
La foto dell'hero montata: la cliente a sinistra, Angelo a destra.

Calogero, 13/10/2026: "cerca sempre di migliorare la faccia di Angelo
prendendo la foto a braccia incrociate come esempio", "sta' attento a fare la
faccia a fuoco e dettagliata". Finche' la foto la fa tutta il modello
(scripts/genera-hero.mjs, "manifesto" e "manifesto-b") la faccia di Angelo
viene ridisegnata ogni volta, anche dicendogli di copiarla. Quindi qui non si
genera niente di lui: si prende la sua foto da studio cosi' com'e'
(brand/foto-profilo/chiaro-a-ritocco-2.png, quella della scheda della squadra),
si scontorna e gli si mette accanto la cliente, generata da sola
(brand/hero/cliente-sola.png). I suoi pixel non li tocca nessuno.

Lui nella foto da studio arriva ai fianchi: si taglia li' anche lei. Viene un
mezzo busto in due, con le facce piu' grandi di prima.

    python scripts/componi-hero.py

Esce: brand/hero/coppia.png (intera) e public/images/hero/coppia.png
"""
import os

import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy import ndimage

ANGELO = "brand/foto-profilo/chiaro-a-ritocco-2.png"
CLIENTE = "brand/hero/cliente-sola.png"
USCITA_INTERA = "brand/hero/coppia.png"
USCITA_SITO = "public/images/hero/coppia.png"
ALTEZZA_SITO = 1600

# Dalla cima dei capelli al mento, in pixel delle due sorgenti: misurate a
# occhio sulle anteprime, servono a metterli in scala fra loro.
TESTA_ANGELO = 588
TESTA_CLIENTE = 522
# Testa di lei su testa di lui. Nella foto fatta dal modello ("manifesto")
# era 1,05, per via della coda alta; montata cosi' lei sembrava piu' vicina
# alla macchina di lui, quindi un filo meno.
RAPPORTO_TESTE = 0.99
# Di quanto lei sta piu' in basso di lui, in teste di lui. Nella foto del
# modello era 0,39; qui un po' meno, cosi' il taglio ai fianchi di lui passa
# sotto il manubrio che lei tiene in mano e non ci passa in mezzo.
SCALINO = 0.264
# Quanto si sovrappongono i due gomiti, in teste di lui.
SOVRAPPOSIZIONE = 0.22


def scontorna(percorso: str, sessione) -> Image.Image:
    im = Image.open(percorso).convert("RGB")
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
    a[:, :, 3] = np.where(etichette == int(np.argmax(aree)) + 1, a[:, :, 3], 0)
    res = Image.fromarray(a)
    return res.crop(res.getbbox())


def main() -> None:
    sessione = new_session("isnet-general-use")
    lui = scontorna(ANGELO, sessione)
    lei = scontorna(CLIENTE, sessione)

    # lei resta alla sua misura, lui si porta in scala con lei
    testa_lui = TESTA_CLIENTE / RAPPORTO_TESTE
    scala = testa_lui / TESTA_ANGELO
    lui = lui.resize((round(lui.size[0] * scala), round(lui.size[1] * scala)), Image.LANCZOS)

    y_lei = round(SCALINO * testa_lui)
    x_lui = lei.size[0] - round(SOVRAPPOSIZIONE * testa_lui)
    tela = Image.new("RGBA", (x_lui + lui.size[0], lui.size[1]), (0, 0, 0, 0))
    tela.alpha_composite(lui, (x_lui, 0))
    # lei sopra: il suo gomito sta davanti al braccio di lui. Quello che di
    # lei scende sotto i fianchi di lui resta fuori dalla tela.
    taglio = lei.crop((0, 0, lei.size[0], min(lei.size[1], tela.size[1] - y_lei)))
    tela.alpha_composite(taglio, (0, y_lei))

    tela.save(USCITA_INTERA, optimize=True)
    os.makedirs(os.path.dirname(USCITA_SITO), exist_ok=True)
    sito = tela.resize((round(tela.size[0] * ALTEZZA_SITO / tela.size[1]), ALTEZZA_SITO), Image.LANCZOS)
    sito.save(USCITA_SITO, optimize=True)
    kb = os.path.getsize(USCITA_SITO) // 1024
    print(f"intera {tela.size[0]}x{tela.size[1]}, sito {sito.size[0]}x{sito.size[1]} {kb} KB, lui in scala {scala:.3f}, testa di lui nel sito {round(testa_lui * ALTEZZA_SITO / tela.size[1])} px")


if __name__ == "__main__":
    main()
