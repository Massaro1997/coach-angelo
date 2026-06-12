# SEO Scale Report — Angelo Coach (Personal Trainer Köln)

Data: 2026-06-11 · Engine di validazione: page-forge `forge.py` (SimHash 64-bit, 6 gate)

## TL;DR onesto

- **Obiettivo cliente:** ~20.000 pagine SEO su Köln.
- **Realtà coi dati reali disponibili:** **688 pagine genuinamente uniche e indicizzabili.**
- **20k NON è raggiungibile** senza scadere in doorway/near-duplicate. Dimostrato sotto coi numeri.
- Asse scelto: **Stadtteil × Intent** (86 Stadtteile reali × 8 intent di business reali).
- PASS rate forge: **688 / 688 = 100%** (dentro-cluster), confermato da test cross-cluster onesti.
- Meglio 688 PASS reali che 20.000 doorway che trascinano giù tutto il dominio (Helpful Content è site-wide).

---

## 1. Dati reali disponibili (da `src/lib/koeln-stadtteile.ts`)

86 Stadtteile di Köln, ognuno con: `einwohner`, `flaecheKm2`, `bezirk`, `rechtsrheinisch`,
`neighbors[]` (slug reali), `spots[]` (luoghi outdoor reali). Helper `density()`.

Da questi grezzi calcolo **datapoint divergenti per entità**:
- densità (einwohner/km²) — unica per Stadtteil
- **ranking per popolazione dentro il Bezirk** (es. "3. di 5")
- **ranking per densità a livello città** (1..86)
- sponda del Reno (links/rechtsrheinisch)
- **vicini con i LORO numeri reali** (popolazione, densità, delta% di densità vs il quartiere)
- spot outdoor propri, o in fallback spot dei vicini citati per nome
- conteggi (n. vicini, n. spot)

Risultato per pagina: **8–14 datapoint reali** (min forge = 4), **157–207 parole** dominate da fatti
dell'entità, non da template.

## 2. Perché "Stadtteil × servizio" era fallito (e come l'ho risolto)

Il fallimento boilerplate precedente nasceva dal **cluster sbagliato + testo dominato dal template intent**.

Fatto matematico chiave di `forge.py`: i gate SimHash (1) e boilerplate (3) confrontano **solo
dentro lo stesso `cluster`**. Due leve:

1. **`cluster = intent`** (non Stadtteil). Così le 86 sorelle di un cluster sono 86 Stadtteile
   DIVERSI → einwohner/densità/vicini/spot/ranking divergono per costruzione.
2. **Testo dominato dai dati per-entità**, hook-intent ridotto a frazione minoritaria. Gli shingle
   che pesano sul SimHash sono i fatti del quartiere, non la frase di servizio.

## 3. Validazione (numeri reali, non stime)

Generatore: `scripts/gen-stadtteil-intent.ts` → `scripts/candidates.jsonl`.

### Set finale raccomandato — 8 intent × 86 Stadtteile
```
Totale candidati: 688
PASS  (indicizzabili): 688  (100%)
BLOCK: 0
datapoint/pagina: min 8 · medio 11,6 · max 14
parole/pagina:    min 157 · medio 181 · max 207
linkplan: 8 cluster, 688 spoke, 0 orfani
```

### Test di ONESTÀ che forge.py NON fa da solo (compare cross-cluster)

`forge.py` confronta solo dentro il cluster. Per non auto-ingannarmi ho misurato a mano la distanza
SimHash dove Google invece confronta (cross-cluster, stesso Stadtteil):

| Confronto | Hamming | Verdetto reale Google |
|---|---|---|
| Intent diversi, stesso Stadtteil (es. PT vs Abnehmen @Ehrenfeld) | **10–18** | OK distinte ✅ |
| Worst-case dentro-cluster (piccoli Stadtteil vicini senza spot) | **18–32** | OK distinte ✅ |
| **Stesso intent + MODIFIER diverso, stesso Stadtteil** (abnehmen vs abnehmen-für-anfänger @Ehrenfeld) | **5** | **NEAR-DUPLICATE ❌ doorway** |

Conclusione: gli **8 intent sono genuinamente diversi** (portano metodo/prezzo/frequenza/focus reali
distinti → fingerprint lontani). I **modifier NO**: cambiano troppo poco testo, restano dominati dagli
stessi dati Stadtteil → Google li clusterizza anche se forge li promuove.

### Perché 20k è irrealistico (lo stress test che lo prova)
`MODE=modifiers npx tsx scripts/gen-stadtteil-intent.ts` genera 6 modifier × 4 intent × 86 = **2.064
candidati, 100% PASS forge**. È un FALSO POSITIVO: forge non confronta cross-cluster, ma il compare
sopra mostra hamming 5 (near-duplicate) tra modifier dello stesso Stadtteil. In produzione Google ne
indicizzerebbe una frazione e marcherebbe il resto "Scansionata non indicizzata" + rischio doorway
penalty site-wide. **Non pubblicare i modifier.** Per arrivare a 20k servirebbero 233 intent reali e
distinti per Stadtteil: non esistono nel business.

## 4. Numero realistico di pagine indicizzabili

| Livello | Pagine | Indicizzabilità |
|---|---|---|
| Bezirk (già live, scritte a mano) | 9 | alta (PASS) |
| **Stadtteil × Intent (questo asse)** | **688** | **alta — set sano da pubblicare a tranche** |
| + modifier | +1.376 | **doorway — NON pubblicare** |

**Stima onesta di pagine che reggono in GSC: ~700** (9 Bezirk + 688 Stadtteil×Intent), forse stirabile
a ~900–1.000 SE si aggiungono 1–2 dati reali nuovi per Stadtteil (vedi §6), non oltre. **L'ordine di
grandezza realistico è 1k, non 20k.**

## 5. Come implementare la route Next (per il volume 688)

1. **Route dinamica** unica `src/app/[intentSlug]/page.tsx` con catch del pattern
   `{intent}-koeln-{stadtteil}`, oppure (più pulito) `src/app/personal-trainer-koeln/[stadtteil]/[intent]/page.tsx`.
   - Sposta `buildText`/datapoint da `scripts/gen-stadtteil-intent.ts` in un modulo condiviso
     `src/lib/stadtteil-intent.ts` importabile sia dal generatore forge sia dalla route (single source of truth).
2. **`generateStaticParams`**: ritorna i 688 `{intent, stadtteil}` (filtra solo i PASS — qui tutti).
   SSG/ISR, niente runtime DB. `export const dynamicParams = false`.
3. **`generateMetadata`**: title/description per-entità (già nel candidato), canonical self-referencing
   `https://www.angelocoach.com/{slug}` (gate 5).
4. **JSON-LD** `LocalBusiness` + `Service` con `areaServed` = lo Stadtteil reale, autore Angelo (E-E-A-T).
5. **Sitemap** (`src/app/sitemap.ts`): aggiungi i 688 URL con `priority: 0.6`, **solo i PASS**. Importa
   gli stessi dati del generatore. NON mettere i modifier.

## 6. Internal linking (gate 6 — già 0 orfani nel linkplan)

Architettura hub → category → spoke (vedi `scripts/linkplan.json`):
- **Hub** esistente `/personal-trainer-koeln` → linka le 8 category-intent + i 9 Bezirk.
- **Category per intent** (`/{intent}-koeln`, 8 pagine nuove) → linka le sue 86 spoke.
- **Category per Bezirk** (le 9 pagine già live) → linkano le spoke dei loro Stadtteile.
- **Ogni spoke** linka: 2 vicini reali con stesso intent + risale alla category-intent + alla pagina
  Bezirk. → ogni pagina ha ≥3 link interni in entrata da pagine indicizzabili (no Discovered-not-indexed).

## 7. Rollout raccomandato

1. Pubblica prima **1 cluster-intent (86 pagine)**, monitora indexing ratio in GSC 2–3 settimane.
2. Se >80% indicizzato con impression reali → pubblica i cluster successivi uno per volta.
3. Mai 688 in un colpo. Tieni alto il rapporto pagine-forti/deboli del dominio.

## File prodotti
- Generatore: `scripts/gen-stadtteil-intent.ts` (MODE=intent default = 688 sano; MODE=modifiers = stress test)
- Candidati: `scripts/candidates.jsonl` (688)
- Report forge: `scripts/forge-report.json` (688 PASS) · `scripts/forge-report-modifiers.json` (stress)
- Link plan: `scripts/linkplan.json` (0 orfani)
- Questo report: `scripts/SEO_SCALE_REPORT.md`
