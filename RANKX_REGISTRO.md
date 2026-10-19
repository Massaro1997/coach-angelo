# RANKX · Registro di FitPrimo (www.fitprimo.de, ex angelocoach.com)

Creato il 19/10/2026 (giro 1). Obiettivo unico: richieste di contatto. Ogni giro aggiunge una riga in cima alla sezione "Registro dei giri".

---

## STRATEGIA (piano 0.6 della ricerca Colonia del 18/10/2026, da MEMORY.md)

In ordine. Non si passa al punto dopo finché il precedente non è pubblicato e misurabile.

1. **`/personal-trainer-koeln` diventa la pagina più forte di Colonia** per "personal trainer köln" (720/mese) e "personal training köln" (390/mese). Deve essere chiaramente più completa di qualunque quartiere: prezzi veri (50 €/ora 1-zu-1, Online Coaching da 150 €/mese), dove si allena (studio, all'aperto, a casa), la squadra vera (Angelo e Natalie), i 9 distretti con link ai quartieri, sezione di domande con le domande vere di 0.2, chiamata alla consulenza gratuita nel primo schermo. Obiettivo: le impressioni generiche (2.044 impr, 0 click, oggi date ai quartieri a pos. 19-52) passano a questa pagina, posizione media sotto 10 entro 8 settimane. Modifica grande divisa in più giri.
2. **Costi**: `/blog/was-kostet-personal-trainer-koeln` risponde nelle prime due righe a "Was kostet eine Stunde Personal Training in Köln?" con i prezzi FitPrimo e la fascia di mercato, tabella, chiamata. Title e description sulla domanda. Obiettivo: CTR sopra il 2% (oggi 0,21% su 974 impressioni negli ultimi 28 giorni).
3. **Quartieri dove siamo già in prima pagina**: Rodenkirchen (#2), Ehrenfeld (#3 con la pagina sbagliata /koeln/bickendorf), Sülz (#10 con la pagina sbagliata /koeln/neustadt-sued), Lindenthal (#10). Far vincere la pagina giusta: title e H1 "Personal Trainer Köln-<Quartiere>", link dai quartieri vicini con testo esatto, risposta locale in cima. Poi Bayenthal, Marienburg, Braunsfeld, Junkersdorf, Nippes. Le pagine quartiere+intento restano come sono.
4. **Blog → richieste**: ogni articolo con impressioni chiude con una chiamata concreta e un link alla pagina di servizio o quartiere giusta (il blog ha metà delle impressioni e ZERO richieste in 90 giorni). Niente articoli nuovi solo informativi.
5. **Ernährungsberatung Köln** (880+880/mese, FitPrimo assente): UNA pagina forte con Natalie, regole di 0.5 punto 2 (Ernährungsberaterin per Sport- und Fitnessernährung; MAI Diätassistentin, Ärztin, Ernährungstherapie, promesse di rimborso cassa malati). Unica pagina nuova già giustificata.
6. **Gennaio**: "personal trainer köln" sale a 880/mese. Punti 1-3 a posto entro metà dicembre.

Trasversale (priorità b del copione): diversi layout (`contatti`, `servizi`, `chi-sono`, `blog`) hanno ancora title o description in ITALIANO su un sito tedesco: da sistemare presto.

### Per Calogero (l'agente non può farlo)
1. **Scheda Google Business "FitPrimo"**: la farà Calogero (deciso il 19/10/2026). Senza scheda il riquadro Maps, presente in quasi tutte le ricerche che portano clienti, resta dei concorrenti. Una riga di promemoria solo nel resoconto della domenica.
2. **Natalie**: se arriva il nome esatto del suo diploma, rafforza la pagina Ernährungsberatung (chiesto una volta, si aspetta).
3. **Richieste in stato "nuovo"**: 6 su 8 degli ultimi 90 giorni non sono state lavorate. Vanno lette e risposte.
4. Token Search Console: se scade (`invalid_grant`), va rigenerato con `scripts/get-refresh-token.mjs`.

### Obiettivo a 30 giorni (entro il 18/11/2026)
- **5 richieste di contatto** (base attuale: ~3 al mese; ago 2, set 3, ott 3 finora).
- Di cui **almeno 1 da una pagina che non sia la home** (blog o /personal-trainer-koeln): oggi il blog fa metà delle impressioni e 0 richieste.
- Vincolo: la somma click delle due proprietà GSC non deve scendere sotto la media pre-passaggio (~94 click/28gg) per più di 2 settimane.

### Piano prime quattro settimane
- **Settimana 1 (20-26/10)**: punto 1 — `/personal-trainer-koeln`: primo schermo con offerta chiara + bottone consulenza gratuita, prezzi, domande vere. Più: title/description in italiano nei layout, se il budget del giro lo consente. Lunedì: controllo migrazione.
- **Settimana 2 (27/10-2/11)**: punto 2 — pagina costi (974 impressioni, CTR 0,21%: il guadagno più rapido del sito). Completamento punto 1 se serve.
- **Settimana 3 (3-9/11)**: punto 3 — quartieri in prima pagina con la pagina sbagliata (Ehrenfeld, Sülz), link interni con testo esatto.
- **Settimana 4 (10-16/11)**: punto 4 — chiamate concrete in fondo agli articoli con impressioni, collegati alle pagine di servizio/quartiere. Verifica a 14 giorni delle modifiche di settimana 1-2.

---

## FOTOGRAFIA INIZIALE (19/10/2026, un giorno dopo il passaggio di dominio)

### Search Console, somma delle due proprietà
| Proprietà | 28gg correnti (19/09-17/10) | 28gg precedenti | Posizione |
|---|---|---|---|
| sc-domain:angelocoach.com | 94 click / 6.852 impr | 82 click / 5.177 impr | 11,5 (prima 12,8) |
| sc-domain:fitprimo.de | 0 click / 0 impr | — | — (proprietà nuova, sitemap scaricata il 18/10, 1.055 URL inviati) |
| **Somma** | **94 click / 6.852 impr** | 82 / 5.177 | |

### Controllo migrazione del lunedì 19/10 (urlInspection, fitprimo.de)
Home + 10 pagine con più click: **6 su 11 già "indicizzata"** su fitprimo.de (/, krafttraining-frauen-ab-50, muskelaufbau-ab-40, /koeln/porz, hyrox-ohne-gym, laufstrecken-koeln), 3 "trovata/scansionata, non ancora indicizzata" (/koeln/rodenkirchen, /koeln/dellbrueck, was-kostet-personal-trainer-koeln), 2 "non nota" (/koeln/nippes, /koeln/widdersdorf). A un giorno dal passaggio è un ritmo sano. Prossimo controllo: lunedì 26/10.

### Pagine che portano click (angelocoach.com, 28gg)
| Pagina | Click | Impr | Pos |
|---|---|---|---|
| / | 12 | 109 | 4,0 |
| /koeln/nippes | 7 | 129 | 27,9 |
| /blog/krafttraining-frauen-ab-50-trainingsplan | 6 | 397 | 8,7 |
| /blog/muskelaufbau-ab-40-mann-trainingsplan-tipps | 5 | 393 | 14,5 |
| /koeln/rodenkirchen | 5 | 529 | 16,4 |
| /koeln/dellbrueck | 3 | 75 | 6,3 |
| /koeln/porz | 3 | 67 | 6,8 |
| /koeln/widdersdorf | 3 | 4 | 3,0 |
| /blog/hyrox-ohne-gym-trainieren | 2 | 228 | 7,2 |
| /blog/laufstrecken-koeln-beste | 2 | 245 | 8,2 |
| /blog/was-kostet-personal-trainer-koeln | 2 | 974 | 18,3 |

### Ricerche principali (28gg, per impressioni)
coaching köln rodenkirchen 2c/176i pos 10,3 · personal training rodenkirchen 1c/32i pos 10,8 · athletiktraining köln 0c/14i pos 13,3 · angelo coach 1c/13i pos 1,2 · athletiktrainer köln 0c/13i pos 18,5 · coach köln 0c/11i pos 27,6 · coaching in ehrenfeld köln 0c/11i pos 10,8 · personal trainer köln nippes 1c/4i pos 4,3 · abnehmen köln 0c/3i pos 16,7.

### 30 pagine con più impressioni e CTR sotto la media (media 1,70%)
| Pagina | Click | Impr | CTR % | Pos |
|---|---|---|---|---|
| /blog/was-kostet-personal-trainer-koeln | 2 | 974 | 0,21 | 18,3 |
| /koeln/rodenkirchen | 5 | 529 | 0,95 | 16,4 |
| /blog/krafttraining-frauen-ab-50-trainingsplan | 6 | 397 | 1,51 | 8,7 |
| /blog/muskelaufbau-ab-40-mann-trainingsplan-tipps | 5 | 393 | 1,27 | 14,5 |
| /koeln/ehrenfeld | 1 | 288 | 0,35 | 30,3 |
| /blog/laufstrecken-koeln-beste | 2 | 245 | 0,82 | 8,2 |
| /blog/hyrox-ohne-gym-trainieren | 2 | 228 | 0,88 | 7,2 |
| /koeln/suelz | 1 | 216 | 0,46 | 15,5 |
| /blog/hyrox-uebungen-erklaert-technik | 1 | 205 | 0,49 | 8,5 |
| /blog/abnehmspritze-kosten-monatlich-vergleich | 0 | 159 | 0,00 | 9,0 |
| /blog/rueckenschmerzen-durch-krafttraining-beheben | 1 | 104 | 0,96 | 9,3 |
| /koeln/zollstock | 1 | 92 | 1,09 | 48,3 |
| /blog | 0 | 80 | 0,00 | 22,0 |
| /blog/testosteron-krafttraining-mann-ab-40 | 1 | 63 | 1,59 | 7,7 |
| /blog/joggen-anfangen-uebergewicht | 0 | 52 | 0,00 | 10,2 |
| /blog/bauchmuskeltraining-schreibtisch-buero | 0 | 50 | 0,00 | 6,6 |
| /blog/gewicht-stagniert-trotz-training | 0 | 46 | 0,00 | 6,9 |
| /blog/abnehmspritze-muskelverlust-vermeiden | 0 | 43 | 0,00 | 10,4 |
| /blog/faszien-nacken-verspannung-loesen | 0 | 35 | 0,00 | 9,3 |
| /blog/abnehmspritze-krafttraining-kombinieren | 0 | 33 | 0,00 | 9,5 |
| /blog/feierabend-training-energie | 0 | 30 | 0,00 | 8,1 |
| /blog/beweglichkeit-verbessern-ab-40 | 0 | 25 | 0,00 | 7,3 |
| /blog/abends-sport-abnehmen-berufstaetige | 0 | 23 | 0,00 | 6,4 |
| /blog/koffein-training-wirkung-timing | 0 | 19 | 0,00 | 7,6 |
| /blog/grundumsatz-erhoehen-methoden | 0 | 18 | 0,00 | 6,6 |
| /blog/knieschmerzen-treppensteigen-ursachen | 0 | 16 | 0,00 | 9,8 |
| /blog/krafttraining-ab-40-anfaenger-trainingsplan | 0 | 12 | 0,00 | 7,2 |
| /blog/hyrox-erster-wettkampf-erfahrungen | 0 | 11 | 0,00 | 7,4 |
| /blog/mobility-training-anfaenger | 0 | 11 | 0,00 | 9,1 |
| /blog/bierbauch-loswerden-mann | 0 | 10 | 0,00 | 7,7 |

### Richieste di contatto (tabella Contact, solo conteggi)
- **Ultimi 90 giorni: 8** (ago 2, set 3, ott 3). Ultimi 7 giorni: 1 (da /koeln/widdersdorf, canale Google).
- Per pagina di arrivo: home 4, /koeln/widdersdorf 1, /koeln/junkersdorf 1, /koeln/hoehenberg/personal-training 1, non registrata 1. **Dal blog: 0.**
- Per canale: google.com 4, diretto/non registrato 3, chatgpt.com 1.
- Per stato: nuovo 6, appuntamento 1, perso 1.

---

## REGISTRO DEI GIRI (riga nuova IN ALTO)

- **19/10/2026 · giro 2 (in corso)** — Punto 1 del piano: `/personal-trainer-koeln`, prima tappa. Deciso prima del lavoro: (1) primo schermo con risposta diretta (prezzi veri, dove si allena) e bottone consulenza visibile su telefono; (2) sezione prezzi con i numeri già pubblicati nell'articolo costi (50-150€/ora a Colonia, FitPrimo 50€, online ab 150€/mese) e link all'articolo; (3) squadra vera Angelo + Natalie (Ernährungsberaterin, Sport- und Fitnessernährung); (4) 5 domande vere da 0.2 con FAQPage schema, risposte oneste (cassa malati: nessuna promessa); (5) title da "Personal Trainer Köln - WABBA Athlet" a "Personal Trainer Köln: 1-zu-1 für 50€/Stunde" e description sulla ricerca vera. Numero da muovere: le 2.044 impressioni generiche "personal trainer/training köln" (oggi ai quartieri a pos. 19-52) devono passare a questa pagina, posizione media sotto 10 entro 8 settimane; richieste da questa pagina da ricontrollare il 2/11. Lettura dati del giro: GSC fitprimo.de ancora 0/0 (normale, sitemap scaricata il 18/10), angelocoach.com 94c/6.852i (28gg, stabile); richieste 7gg: 1 (da /koeln/widdersdorf, Google), 90gg: 8.

- **19/10/2026 · giro 1** — Registro creato (non esisteva): strategia 0.6, foto iniziale GSC (somma 94 click / 6.852 impr su 28gg, fitprimo.de a 0 come atteso), 30 pagine CTR sotto media, richieste 90gg (8, di cui 0 dal blog), obiettivo 30 giorni (5 richieste, ≥1 non dalla home), piano 4 settimane. Controllo migrazione del lunedì: 6/11 pagine top già indicizzate su fitprimo.de a un giorno dal passaggio, nessun allarme. Nessuna modifica al sito (regola del primo giro), nessun deploy. Prossimo giro: punto 1 del piano, `/personal-trainer-koeln` (primo schermo + bottone consulenza, prezzi, domande).
