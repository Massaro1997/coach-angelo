"""
Genera l'infografica della sezione "Erkennst du dich wieder? / Ti riconosci?"
(public/images/services/percorso-infografica.png).

Li' prima c'era una foto. La foto pero' non dice nulla di quello che c'e'
scritto accanto: il testo racconta tre momenti in fila (oggi ti eviti allo
specchio, ci hai gia' provato e sei tornato al punto di partenza, serve un
metodo e qualcuno che ti segua). Quindi al suo posto sta un'infografica con tre
simboli collegati da frecce, che racconta la stessa sequenza a colpo d'occhio
(Calogero, 22.09.2026).

Dentro l'immagine non c'e' nessuna parola: il sito e' bilingue DE/IT e i
modelli sbagliano quasi sempre le scritte, percio' il significato passa solo
dai simboli.

    REPLICATE_API_TOKEN=... python scripts/genera-infografica.py
"""
import json
import os
import sys
import time
import urllib.request

from PIL import Image

MODELLO = "google/nano-banana-pro"
USCITA = "public/images/services/percorso-infografica.png"
LARGHEZZA = 1000  # la colonna e' meta' schermo: oltre e' peso inutile

# Il prompt vero viene scritto dal workflow angelo-icone-e-infografica e
# incollato qui; questo e' il testo in uso.
PROMPT = (
    'Minimal vector infographic on a very dark charcoal background, colour #121214. Three circular l'
    'ine-art emblems arranged in a vertical column, connected by two curved arrows pointing downward'
    ' from one circle to the next. Top circle: a simple line drawing of a wardrobe with a shirt on a'
    ' hanger and the door slightly open, drawn in muted grey white. Middle circle: a closed circular'
    ' loop arrow chasing its own tail, a cycle that returns to the start, drawn in muted grey white.'
    ' Bottom circle: a clean upward rising line chart arrow breaking out of the circle, drawn in bri'
    'ght red #e30613, clearly the strongest and brightest of the three. Each emblem sits inside a th'
    'in engraved ring, dark inner fill slightly lighter than the background, thin red outline ring, '
    'minimal engraved medallion look. The two connecting arrows are thin, curved, red, subtle. Absol'
    'utely no text, no letters, no numbers, no words anywhere in the image. Flat vector line art, un'
    'iform thin strokes, geometric and clean, generous negative space around the column, perfectly c'
    'entred composition, vertical 4:5 format. Not 3D, not photographic, not glossy, not cartoon, no '
    'people, no gradients. Premium minimal editorial infographic style.'
)


def _richiesta(url: str, corpo=None):
    token = os.environ["REPLICATE_API_TOKEN"]
    intestazioni = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    dati = json.dumps(corpo).encode() if corpo is not None else None
    if corpo is not None:
        intestazioni["Prefer"] = "wait"
    return json.loads(urllib.request.urlopen(
        urllib.request.Request(url, data=dati, headers=intestazioni), timeout=300).read())


def main() -> None:
    pred = _richiesta(
        f"https://api.replicate.com/v1/models/{MODELLO}/predictions",
        {"input": {"prompt": PROMPT, "aspect_ratio": "4:5", "output_format": "png"}},
    )
    for _ in range(120):
        if pred.get("status") in ("succeeded", "failed", "canceled"):
            break
        time.sleep(3)
        pred = _richiesta(pred["urls"]["get"])

    if pred.get("status") != "succeeded":
        print("errore:", str(pred.get("error"))[:400])
        sys.exit(1)

    uscita = pred["output"]
    url = uscita[0] if isinstance(uscita, list) else uscita
    grezza = "infografica-grezza.png"
    urllib.request.urlretrieve(url, grezza)

    im = Image.open(grezza).convert("RGB")
    altezza = round(im.size[1] * LARGHEZZA / im.size[0])
    im.resize((LARGHEZZA, altezza), Image.LANCZOS).save(USCITA, optimize=True)
    os.remove(grezza)
    print(f"{USCITA} {LARGHEZZA}x{altezza}")


if __name__ == "__main__":
    main()
