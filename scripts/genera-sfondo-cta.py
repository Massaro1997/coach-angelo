"""
Genera lo sfondo della chiamata all'azione finale (public/images/cta-studio.jpg).

Prima li' c'era una foto di Angelo sul palco di gara: bella ma fuori tono per
il punto in cui si chiede di prenotare la consulenza. Qui serve una palestra
vuota, seria, con i LED rossi appena accennati (Calogero, 22.09.2026).

    REPLICATE_API_TOKEN=... python scripts/genera-sfondo-cta.py
"""
import json
import os
import sys
import time
import urllib.request

from PIL import Image

MODELLO = "google/nano-banana-pro"
USCITA = "public/images/cta-studio.jpg"
LARGHEZZA = 1920

PROMPT = (
    "Photorealistic wide interior photograph of an empty modern premium gym at dusk, no people. "
    "Clean dark architecture, matte black walls and dark floor, rows of racks and machines "
    "receding into soft shadow. Subtle dark red LED strip lighting along the walls and under the "
    "equipment, dim and restrained, not neon, not oversaturated. Soft ambient light, gentle haze "
    "for depth, deep shadows, calm and serious mood. Editorial architectural photography, "
    "wide angle, shallow depth of field towards the back, muted colours, no text, no logos. "
    "Left side darker and emptier so text stays readable. Ultra realistic, 8k."
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
        {"input": {"prompt": PROMPT, "aspect_ratio": "16:9", "output_format": "jpg"}},
    )
    for _ in range(100):
        if pred.get("status") in ("succeeded", "failed", "canceled"):
            break
        time.sleep(3)
        pred = _richiesta(pred["urls"]["get"])

    if pred.get("status") != "succeeded":
        print("errore:", str(pred.get("error"))[:400])
        sys.exit(1)

    uscita = pred["output"]
    url = uscita[0] if isinstance(uscita, list) else uscita
    grezza = "cta-grezza.jpg"
    urllib.request.urlretrieve(url, grezza)

    im = Image.open(grezza).convert("RGB")
    altezza = round(im.size[1] * LARGHEZZA / im.size[0])
    im.resize((LARGHEZZA, altezza), Image.LANCZOS).save(
        USCITA, quality=84, optimize=True, progressive=True)
    os.remove(grezza)
    print(f"{USCITA} {LARGHEZZA}x{altezza}")

if __name__ == "__main__":
    main()
