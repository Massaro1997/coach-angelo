// Guide dell'app clienti (dal 13/11/2026): brevi letture per il cliente,
// in tedesco e italiano. Scritte per qualsiasi coach (white label): si dice
// "dein Coach" / "il tuo coach", mai un nome. Consigli generali e prudenti,
// niente promesse ne' indicazioni mediche: per dolori o malattie si rimanda
// al coach e al medico. Da far rileggere al coach prima di andare online.
//
// La home ne mostra le prime 4 (ordine di questa lista), /app/guide tutte,
// /app/guide/<slug> una.
//
// I nomi dei tasti citati tra virgolette sono quelli veri dell'app (testi.ts,
// schede/testi-schede.ts): se cambiano la', vanno cambiati anche qui. Idem le
// regole delle ore 1:1 (lib/app-coaching/prenotazioni.ts: da 12 ore prima a
// 28 giorni avanti, disdetta fino a 24 ore prima).
// In italiano niente aggettivi al maschile riferiti al cliente ("stanco",
// "rilassato"): l'app la usano clienti e clienti donne.
// minuti: parole / ~150 al minuto (si legge dal telefono), per eccesso, almeno 2.

import type { NomeFoto, NomeIcona } from "../immagini";

export type Blocco =
  | { tipo: "testo"; testo: string }
  | { tipo: "titolo"; testo: string }
  /** se TUTTE le voci cominciano con "Etichetta: " (corta), l'etichetta esce in grassetto */
  | { tipo: "punti"; punti: string[] }
  /** riquadro evidenziato: il consiglio da ricordare */
  | { tipo: "consiglio"; testo: string };

export type TestoGuida = {
  titolo: string;
  /** una riga sotto il titolo nelle card */
  sotto: string;
  blocchi: Blocco[];
};

export type Guida = {
  slug: string;
  foto: NomeFoto;
  icona: NomeIcona;
  /** minuti di lettura */
  minuti: number;
  categoria: "app" | "training" | "ernaehrung" | "erholung";
  de: TestoGuida;
  it: TestoGuida;
};

export const GUIDE: Guida[] = [
  // ------------------------------------------------------------------ app
  {
    slug: "app",
    foto: "app",
    icona: "telefono",
    minuti: 3,
    categoria: "app",
    de: {
      titolo: "So nutzt du deine App",
      sotto: "Plan, Erledigt, Feedback und Chat",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Dein Coach trägt dir Training und Ernährung Tag für Tag in diese App ein. Hier siehst du in drei Minuten, wo du was findest.",
        },
        { tipo: "titolo", testo: "Home: dein Tag auf einen Blick" },
        {
          tipo: "testo",
          testo:
            "Unter „Home“ siehst du, was heute ansteht, und kommst mit einem Tipp zu deinem Training. Dazu deine Woche und deine nächste 1:1-Stunde.",
        },
        { tipo: "titolo", testo: "Plan: jeden Tag antippen" },
        {
          tipo: "testo",
          testo:
            "Unter „Plan“ wechselst du zwischen „Woche“ und „Monat“. Tipp auf einen Tag und du siehst alles, was dein Coach dafür eingetragen hat: Training, Ernährung und manchmal eine Notiz. Mit den Pfeilen oben oder einem Wisch zur Seite kommst du zum Tag davor oder danach.",
        },
        { tipo: "titolo", testo: "Erledigt und Rückmeldung" },
        {
          tipo: "punti",
          punti: [
            "Nach dem Training tippst du unten auf „Als erledigt markieren“. Das wird sofort gespeichert. Aus Versehen getippt? Nochmal tippen nimmt es zurück.",
            "Danach erscheint daneben „Wie lief es?“. Dort wählst du bei „Wie anstrengend war es?“ eine Zahl von 1 (sehr leicht) bis 5 (sehr hart).",
            "Schreib ein, zwei Sätze, wie es war, und tippe auf „Speichern“.",
          ],
        },
        {
          tipo: "consiglio",
          testo:
            "Deine Rückmeldung ist Gold wert: So sieht dein Coach, ob der Plan zu dir passt, und kann ihn anpassen.",
        },
        { tipo: "titolo", testo: "Fortschritt: deine Zahlen" },
        {
          tipo: "testo",
          testo:
            "Unter „Fortschritt“ siehst du deine Trainings der letzten Wochen und deine Messungen. Mit „Messen“ trägst du Gewicht und Umfänge ein. Wie du richtig misst, steht im Guide „Richtig wiegen und messen“.",
        },
        { tipo: "titolo", testo: "Shop: Abo und 1:1-Stunden" },
        {
          tipo: "punti",
          punti: [
            "„Dein Abo“: dein Paket, die nächste Rate und alle Raten. Eine offene Rate zahlst du mit „Jetzt bezahlen“. Läuft dein Abo bald aus, verlängerst du es hier mit „Abo verlängern“.",
            "„1:1-Stunde buchen“: Termine buchst du frühestens 12 Stunden vorher und bis zu 4 Wochen im Voraus.",
            "„Meine Termine“: Absagen geht bis 24 Stunden vorher. Danach schreib deinem Coach.",
          ],
        },
        { tipo: "titolo", testo: "Coach: einfach schreiben" },
        {
          tipo: "testo",
          testo:
            "Unter „Coach“ schreibst du deinem Coach direkt in der App: Fragen zum Training, zur Ernährung oder wenn etwas zwickt. Dort findest du auch WhatsApp.",
        },
        { tipo: "titolo", testo: "Als App aufs Handy" },
        {
          tipo: "testo",
          testo: "Tipp oben rechts auf den runden Knopf mit deiner Initiale und dann auf „Als App aufs Handy“.",
        },
        {
          tipo: "punti",
          punti: [
            "iPhone: In Safari auf „Teilen“ tippen, „Zum Home-Bildschirm“ wählen und mit „Hinzufügen“ bestätigen.",
            "Android: In Chrome oben rechts auf ⋮ tippen und „App installieren“ wählen.",
          ],
        },
        { tipo: "testo", testo: "Beim ersten Öffnen gibst du den Code noch einmal ein." },
      ],
    },
    it: {
      titolo: "Come usare la tua app",
      sotto: "Piano, fatto, feedback e chat",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Il tuo coach ti scrive allenamento e alimentazione giorno per giorno in questa app. Qui vedi in tre minuti dove trovi cosa.",
        },
        { tipo: "titolo", testo: "Home: la giornata a colpo d'occhio" },
        {
          tipo: "testo",
          testo:
            "In «Home» vedi cosa c'è oggi e con un tocco arrivi al tuo allenamento. In più la tua settimana e la tua prossima ora 1:1.",
        },
        { tipo: "titolo", testo: "Piano: tocca un giorno" },
        {
          tipo: "testo",
          testo:
            "In «Piano» passi da «Settimana» a «Mese». Tocca un giorno e vedi tutto quello che il tuo coach ha scritto: allenamento, alimentazione e a volte una nota. Con le frecce in alto o scorrendo col dito di lato vai al giorno prima o a quello dopo.",
        },
        { tipo: "titolo", testo: "Fatto e feedback" },
        {
          tipo: "punti",
          punti: [
            "Dopo l'allenamento tocca in basso «Segna come fatto». Si salva subito. Tocco sbagliato? Un altro tocco lo toglie.",
            "Accanto compare «Com'è andata?». Lì, alla domanda «Quanto è stato faticoso?», scegli un numero da 1 (molto leggero) a 5 (durissimo).",
            "Scrivi una o due frasi su com'è andata e tocca «Salva».",
          ],
        },
        {
          tipo: "consiglio",
          testo:
            "Il tuo feedback vale oro: così il tuo coach vede se il piano fa per te e può adattarlo.",
        },
        { tipo: "titolo", testo: "Progressi: i tuoi numeri" },
        {
          tipo: "testo",
          testo:
            "In «Progressi» vedi gli allenamenti delle ultime settimane e le tue misure. Con «Misura» inserisci peso e circonferenze. Come misurarti bene lo trovi nella guida «Pesarsi e misurarsi bene».",
        },
        { tipo: "titolo", testo: "Shop: abbonamento e ore 1:1" },
        {
          tipo: "punti",
          punti: [
            "«Il tuo abbonamento»: il tuo pacchetto, la prossima rata e tutte le rate. Una rata da pagare la paghi con «Paga ora». Quando l'abbonamento sta per finire, lo rinnovi qui con «Rinnova abbonamento».",
            "«Prenota un'ora 1:1»: puoi prenotare da 12 ore prima fino a 4 settimane avanti.",
            "«I miei appuntamenti»: puoi disdire fino a 24 ore prima. Dopo, scrivi al tuo coach.",
          ],
        },
        { tipo: "titolo", testo: "Coach: scrivi e basta" },
        {
          tipo: "testo",
          testo:
            "In «Coach» scrivi al tuo coach direttamente nell'app: domande sull'allenamento, sull'alimentazione o se qualcosa fa male. Lì trovi anche WhatsApp.",
        },
        { tipo: "titolo", testo: "L'app sul telefono" },
        {
          tipo: "testo",
          testo: "Tocca in alto a destra il tondo con la tua iniziale e poi «L'app sul telefono».",
        },
        {
          tipo: "punti",
          punti: [
            "iPhone: in Safari tocca «Condividi», scegli «Aggiungi alla schermata Home» e conferma con «Aggiungi».",
            "Android: in Chrome tocca ⋮ in alto a destra e scegli «Installa app».",
          ],
        },
        { tipo: "testo", testo: "La prima volta che apri l'app inserisci di nuovo il codice." },
      ],
    },
  },

  // ----------------------------------------------------------- aufwaermen
  {
    slug: "aufwaermen",
    foto: "riscaldamento",
    icona: "kettlebell",
    minuti: 2,
    categoria: "training",
    de: {
      titolo: "Aufwärmen in 5 Minuten",
      sotto: "Damit dein Training gut startet",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Fünf Minuten reichen, damit Muskeln und Gelenke bereit sind und du mit dem Kopf beim Training bist. Danach fühlen sich die ersten Sätze meist leichter und sicherer an.",
        },
        { tipo: "titolo", testo: "1. Warm werden (2 Minuten)" },
        {
          tipo: "testo",
          testo:
            "Bring den Kreislauf locker in Schwung: zügig gehen, auf der Stelle laufen, Hampelmänner oder ein paar Minuten aufs Rad. Danach bist du warm, aber nicht außer Atem.",
        },
        { tipo: "titolo", testo: "2. Gelenke bewegen (1 Minute)" },
        {
          tipo: "punti",
          punti: [
            "Arme und Schultern kreisen, vorwärts und rückwärts",
            "Hüfte kreisen, den Oberkörper locker drehen",
            "Fußgelenke und Knie sanft bewegen",
          ],
        },
        { tipo: "titolo", testo: "3. Muskeln wecken (2 Minuten)" },
        {
          tipo: "punti",
          punti: [
            "10 Kniebeugen ohne Gewicht, langsam und so tief, wie es angenehm ist",
            "Ausfallschritte im Wechsel, 5 pro Seite",
            "Hüftbrücke auf dem Rücken: Po anspannen, kurz halten",
            "Liegestütze an der Wand oder auf den Knien",
          ],
        },
        { tipo: "titolo", testo: "4. Die erste Übung leicht starten" },
        {
          tipo: "testo",
          testo:
            "Mach von deiner ersten Übung ein, zwei Sätze mit wenig Gewicht. So übt dein Körper die Bewegung, bevor es schwer wird.",
        },
        {
          tipo: "consiglio",
          testo:
            "Steht in deinem Plan schon ein Aufwärmen, mach das von deinem Coach. Diese fünf Minuten sind für die Tage, an denen nichts dabeisteht.",
        },
        {
          tipo: "testo",
          testo:
            "Langes, ruhiges Dehnen passt besser nach dem Training. Und wenn beim Aufwärmen etwas wehtut, also nicht nur ungewohnt ist: Hör auf und sag es deinem Coach. Bleiben die Schmerzen, geh zum Arzt.",
        },
      ],
    },
    it: {
      titolo: "Riscaldamento in 5 minuti",
      sotto: "Per iniziare bene l'allenamento",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Cinque minuti bastano per preparare muscoli e articolazioni e per avere la testa sull'allenamento. Dopo, di solito le prime serie vengono più facili e più sicure.",
        },
        { tipo: "titolo", testo: "1. Scaldati (2 minuti)" },
        {
          tipo: "testo",
          testo:
            "Metti in moto il fiato con calma: camminata veloce, corsa sul posto, jumping jack o qualche minuto di bici. Alla fine il corpo è caldo, ma hai ancora fiato.",
        },
        { tipo: "titolo", testo: "2. Muovi le articolazioni (1 minuto)" },
        {
          tipo: "punti",
          punti: [
            "Cerchi con braccia e spalle, avanti e indietro",
            "Cerchi con il bacino, rotazioni leggere del busto",
            "Muovi piano caviglie e ginocchia",
          ],
        },
        { tipo: "titolo", testo: "3. Sveglia i muscoli (2 minuti)" },
        {
          tipo: "punti",
          punti: [
            "10 squat senza peso, lenti e profondi quanto ti è comodo",
            "Affondi alternati, 5 per lato",
            "Ponte per i glutei, a terra sulla schiena: stringi i glutei e tieni un attimo",
            "Piegamenti al muro o sulle ginocchia",
          ],
        },
        { tipo: "titolo", testo: "4. Parti leggero con il primo esercizio" },
        {
          tipo: "testo",
          testo:
            "Fai una o due serie del primo esercizio con poco peso. Così il corpo prova il movimento prima che diventi pesante.",
        },
        {
          tipo: "consiglio",
          testo:
            "Se nel piano c'è già un riscaldamento, fai quello del tuo coach. Questi cinque minuti sono per i giorni in cui non c'è scritto niente.",
        },
        {
          tipo: "testo",
          testo:
            "Gli allungamenti lunghi e fermi stanno meglio dopo l'allenamento. E se durante il riscaldamento qualcosa fa male, e non è solo insolito, fermati e dillo al tuo coach. Se il dolore resta, vai dal medico.",
        },
      ],
    },
  },

  // -------------------------------------------------------------- eiweiss
  {
    slug: "eiweiss",
    foto: "colazione",
    icona: "ciotola",
    minuti: 2,
    categoria: "ernaehrung",
    de: {
      titolo: "Eiweiß im Alltag",
      sotto: "Einfache Quellen für jede Mahlzeit",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Eiweiß (Protein) braucht dein Körper, um Muskeln aufzubauen und zu erhalten. Außerdem macht es lange satt. Der einfachste Weg: in jede Mahlzeit eine Eiweißquelle einbauen.",
        },
        { tipo: "titolo", testo: "Gute Quellen" },
        {
          tipo: "punti",
          punti: [
            "Tierisch: Hähnchen, Pute, mageres Rind, Fisch, Eier",
            "Milchprodukte: Magerquark, Skyr, griechischer Joghurt, Hüttenkäse",
            "Pflanzlich: Linsen, Kichererbsen, Bohnen, Tofu, Tempeh, Edamame",
            "Für unterwegs: ein Becher Skyr, gekochte Eier oder ein Shake, wenn dein Coach ihn empfiehlt",
          ],
        },
        { tipo: "titolo", testo: "Ideen für jede Mahlzeit" },
        {
          tipo: "punti",
          punti: [
            "Frühstück: Haferflocken mit Skyr und Beeren oder Rührei auf Vollkornbrot",
            "Mittag: Hähnchen, Fisch oder Tofu mit Reis oder Kartoffeln und Gemüse",
            "Abend: Linsencurry, ein Omelett mit Gemüse oder Lachs mit Salat",
            "Snack: Hüttenkäse, Joghurt oder eine Handvoll Edamame",
          ],
        },
        {
          tipo: "consiglio",
          testo:
            "Deine Handfläche als Maß: Eine Portion Fleisch, Fisch oder Tofu, so groß und dick wie deine Handfläche, ist ein guter Anfang für jede Hauptmahlzeit.",
        },
        { tipo: "titolo", testo: "Wie viel?" },
        {
          tipo: "testo",
          testo:
            "Wie viel Eiweiß du genau brauchst, hängt von dir, deinem Ziel und deinem Training ab. Das legt dein Coach fest: Steht in deinem Plan bei der Ernährung „Eiweiß“, richte dich danach.",
        },
        {
          tipo: "testo",
          testo:
            "Eiweißpulver ist praktisch, aber kein Muss: Es ist einfach Essen in Pulverform. Hast du Probleme mit den Nieren, eine andere Erkrankung oder bist du schwanger, sprich vorher mit deinem Coach und deinem Arzt.",
        },
      ],
    },
    it: {
      titolo: "Proteine ogni giorno",
      sotto: "Fonti semplici per ogni pasto",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Le proteine servono al corpo per costruire e mantenere i muscoli. In più saziano a lungo. Il modo più semplice: mettere una fonte di proteine in ogni pasto.",
        },
        { tipo: "titolo", testo: "Fonti buone" },
        {
          tipo: "punti",
          punti: [
            "Animali: pollo, tacchino, manzo magro, pesce, uova",
            "Latticini: yogurt greco, skyr, fiocchi di latte, ricotta",
            "Vegetali: lenticchie, ceci, fagioli, tofu, tempeh, edamame",
            "Fuori casa: uno skyr, uova sode o uno shake, se te lo consiglia il tuo coach",
          ],
        },
        { tipo: "titolo", testo: "Idee per ogni pasto" },
        {
          tipo: "punti",
          punti: [
            "Colazione: fiocchi d'avena con yogurt greco e frutti di bosco, o uova strapazzate con pane integrale",
            "Pranzo: pollo, pesce o tofu con riso o patate e verdure",
            "Cena: lenticchie in umido, una frittata con verdure o salmone con insalata",
            "Spuntino: fiocchi di latte, yogurt o una manciata di edamame",
          ],
        },
        {
          tipo: "consiglio",
          testo:
            "Il palmo della mano come misura: una porzione di carne, pesce o tofu grande e spessa come il tuo palmo è un buon inizio per ogni pasto principale.",
        },
        { tipo: "titolo", testo: "Quante?" },
        {
          tipo: "testo",
          testo:
            "Quante proteine ti servono esattamente dipende da te, dal tuo obiettivo e dal tuo allenamento. Lo decide il tuo coach: se nel piano, all'alimentazione, trovi la voce «Proteine», segui quella.",
        },
        {
          tipo: "testo",
          testo:
            "Le proteine in polvere sono comode ma non obbligatorie: sono semplicemente cibo in polvere. Se hai problemi ai reni, un'altra malattia o sei incinta, parlane prima con il tuo coach e con il tuo medico.",
        },
      ],
    },
  },

  // --------------------------------------------------------------- messen
  {
    slug: "messen",
    foto: "piano",
    icona: "metro",
    minuti: 2,
    categoria: "app",
    de: {
      titolo: "Richtig wiegen und messen",
      sotto: "So werden deine Zahlen vergleichbar",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Dein Gewicht schwankt von Tag zu Tag, manchmal deutlich: durch Wasser, Salz, Essen im Bauch oder den Zyklus. Das ist normal und sagt wenig. Damit du trotzdem siehst, wohin es geht, misst du immer gleich.",
        },
        { tipo: "titolo", testo: "Immer die gleichen Bedingungen" },
        {
          tipo: "punti",
          punti: [
            "Morgens, nach der Toilette und bevor du isst oder trinkst",
            "Immer dieselbe Waage, auf festem, geradem Boden",
            "Ohne Kleidung oder immer in der gleichen",
            "Für Umfänge: entspannt stehen, normal ausatmen, den Bauch nicht einziehen",
          ],
        },
        { tipo: "titolo", testo: "Wo das Maßband hinkommt" },
        {
          tipo: "punti",
          punti: [
            "Taille: waagerecht auf Höhe des Bauchnabels",
            "Hüfte: an der breitesten Stelle des Pos",
            "Brust: auf Höhe der Brustwarzen, unter den Armen durch",
            "Arm: an der dicksten Stelle des Oberarms, der Arm hängt locker",
            "Oberschenkel: an der dicksten Stelle, immer am selben Bein",
          ],
        },
        {
          tipo: "testo",
          testo: "Das Band liegt glatt an, ohne einzuschneiden. Miss immer auf derselben Seite.",
        },
        { tipo: "titolo", testo: "Wie oft?" },
        {
          tipo: "testo",
          testo:
            "Wiegen kannst du dich ein paar Mal pro Woche. Schau dann auf den Durchschnitt der Woche, nicht auf den einzelnen Tag. Für Umfänge reicht alle zwei Wochen. Wie oft genau, sagt dir dein Coach.",
        },
        {
          tipo: "consiglio",
          testo:
            "Ein einzelner Tag zählt nicht, der Trend zählt. Vergleich Woche mit Woche, nicht Morgen mit Morgen.",
        },
        { tipo: "titolo", testo: "Eintragen in der App" },
        {
          tipo: "testo",
          testo:
            "Unter „Fortschritt“ tippst du auf „Messen“ und trägst nur ein, was du gemessen hast. Bei „Notiz“ kannst du dazuschreiben, wenn etwas anders war, zum Beispiel abends gemessen.",
        },
        {
          tipo: "testo",
          testo: "Stresst dich das Wiegen, sag es deinem Coach. Es geht auch mit weniger Zahlen.",
        },
      ],
    },
    it: {
      titolo: "Pesarsi e misurarsi bene",
      sotto: "Così i tuoi numeri sono confrontabili",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Il peso cambia da un giorno all'altro, a volte parecchio: acqua, sale, cibo nella pancia o il ciclo. È normale e dice poco. Per vedere comunque dove stai andando, misurati sempre allo stesso modo.",
        },
        { tipo: "titolo", testo: "Sempre le stesse condizioni" },
        {
          tipo: "punti",
          punti: [
            "Al mattino, dopo il bagno e prima di mangiare o bere",
            "Sempre la stessa bilancia, su un pavimento duro e piano",
            "Senza vestiti o sempre con gli stessi",
            "Per le circonferenze: in piedi, spalle sciolte, espira normalmente e non tirare in dentro la pancia",
          ],
        },
        { tipo: "titolo", testo: "Dove mettere il metro" },
        {
          tipo: "punti",
          punti: [
            "Vita: in orizzontale, all'altezza dell'ombelico",
            "Fianchi: nel punto più largo dei glutei",
            "Petto: all'altezza dei capezzoli, passando sotto le braccia",
            "Braccio: nel punto più grosso, con il braccio lasciato cadere lungo il fianco",
            "Coscia: nel punto più grosso, sempre la stessa gamba",
          ],
        },
        {
          tipo: "testo",
          testo: "Il metro deve aderire senza stringere. Misura sempre dallo stesso lato.",
        },
        { tipo: "titolo", testo: "Ogni quanto?" },
        {
          tipo: "testo",
          testo:
            "Pesarti puoi farlo qualche volta a settimana. Poi guarda la media della settimana, non il singolo giorno. Per le circonferenze basta ogni due settimane. Ogni quanto esattamente te lo dice il tuo coach.",
        },
        {
          tipo: "consiglio",
          testo:
            "Un giorno da solo non conta, conta la tendenza. Confronta settimana con settimana, non mattina con mattina.",
        },
        { tipo: "titolo", testo: "Inserirle nell'app" },
        {
          tipo: "testo",
          testo:
            "In «Progressi» tocca «Misura» e inserisci solo quello che hai misurato. In «Nota» puoi scrivere se qualcosa era diverso, per esempio misurato di sera.",
        },
        {
          tipo: "testo",
          testo: "Se pesarti ti mette ansia, dillo al tuo coach. Si può fare anche con meno numeri.",
        },
      ],
    },
  },

  // --------------------------------------------------------------- technik
  {
    slug: "technik",
    foto: "palestra",
    icona: "manubri",
    minuti: 2,
    categoria: "training",
    de: {
      titolo: "Saubere Technik",
      sotto: "5 Grundregeln für jede Übung",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Saubere Technik schont deine Gelenke und sorgt dafür, dass die richtigen Muskeln arbeiten. Diese fünf Regeln gelten für fast jede Übung.",
        },
        { tipo: "titolo", testo: "1. Erst die Bewegung, dann das Gewicht" },
        {
          tipo: "testo",
          testo:
            "Nimm ein Gewicht, mit dem du alle Wiederholungen sauber schaffst. Mehr Gewicht kommt, wenn die Bewegung sitzt. Wann es so weit ist, sagt dir dein Coach.",
        },
        { tipo: "titolo", testo: "2. Fester Stand, fester Rumpf" },
        {
          tipo: "testo",
          testo:
            "Füße stabil auf den Boden, Bauch leicht anspannen, Rücken lang. Diese Spannung hältst du die ganze Wiederholung über.",
        },
        { tipo: "titolo", testo: "3. Langsam runter, kontrolliert hoch" },
        {
          tipo: "testo",
          testo:
            "Senk das Gewicht ruhig ab und bring es ohne Schwung wieder hoch. Musst du Schwung holen, ist das Gewicht zu schwer.",
        },
        { tipo: "titolo", testo: "4. So weit, wie es sauber geht" },
        {
          tipo: "testo",
          testo:
            "Nutz den Bewegungsweg, den du sauber und ohne Schmerz schaffst. Mit der Zeit wird er oft größer.",
        },
        { tipo: "titolo", testo: "5. Weiteratmen" },
        {
          tipo: "testo",
          testo:
            "Halt nicht die Luft an. Atme ruhig weiter: meist aus, wenn es schwer wird, und ein, wenn du zurückgehst.",
        },
        {
          tipo: "consiglio",
          testo:
            "Die letzte Wiederholung soll aussehen wie die erste. Klappt das nicht mehr, beende den Satz und schreib es bei „Wie lief es?“ dazu.",
        },
        { tipo: "titolo", testo: "So prüfst du dich" },
        {
          tipo: "punti",
          punti: [
            "Hat eine Übung in deinem Plan „Video ansehen“, schau es dir vor dem ersten Satz an.",
            "Film dich mit dem Handy von der Seite und zeig das Video deinem Coach.",
            "Lass dir in einer 1:1-Stunde die Übungen zeigen, bei denen du unsicher bist.",
          ],
        },
        {
          tipo: "testo",
          testo:
            "Stechender Schmerz, Schwindel oder ein komisches Gefühl im Gelenk: Satz sofort beenden, das Gewicht sicher ablegen und deinem Coach schreiben. Geht der Schmerz nicht weg, lass ihn ärztlich abklären.",
        },
      ],
    },
    it: {
      titolo: "Tecnica pulita",
      sotto: "5 regole base per ogni esercizio",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Una tecnica pulita protegge le articolazioni e fa lavorare i muscoli giusti. Queste cinque regole valgono per quasi ogni esercizio.",
        },
        { tipo: "titolo", testo: "1. Prima il movimento, poi il peso" },
        {
          tipo: "testo",
          testo:
            "Scegli un peso con cui fai tutte le ripetizioni in modo pulito. Il peso in più arriva quando il movimento è sicuro. Quando è il momento te lo dice il tuo coach.",
        },
        { tipo: "titolo", testo: "2. Appoggio stabile, busto solido" },
        {
          tipo: "testo",
          testo:
            "Piedi ben piantati a terra, pancia leggermente contratta, schiena lunga. Tieni questa tensione per tutta la ripetizione.",
        },
        { tipo: "titolo", testo: "3. Giù piano, su controllato" },
        {
          tipo: "testo",
          testo:
            "Abbassa il peso con calma e riportalo su senza slancio. Se devi darti lo slancio, il peso è troppo.",
        },
        { tipo: "titolo", testo: "4. Fin dove riesci in modo pulito" },
        {
          tipo: "testo",
          testo:
            "Usa tutto il movimento che riesci a fare in modo pulito e senza dolore. Col tempo spesso diventa più ampio.",
        },
        { tipo: "titolo", testo: "5. Continua a respirare" },
        {
          tipo: "testo",
          testo:
            "Non trattenere il fiato. Respira con calma: di solito butti fuori l'aria quando fai fatica e la prendi quando torni indietro.",
        },
        {
          tipo: "consiglio",
          testo:
            "L'ultima ripetizione deve somigliare alla prima. Se non ci riesci più, chiudi la serie e scrivilo in «Com'è andata?».",
        },
        { tipo: "titolo", testo: "Come controllarti" },
        {
          tipo: "punti",
          punti: [
            "Se nel piano un esercizio ha «Guarda il video», guardalo prima della prima serie.",
            "Fatti un video di lato col telefono e fallo vedere al tuo coach.",
            "In un'ora 1:1 fatti mostrare gli esercizi su cui hai dubbi.",
          ],
        },
        {
          tipo: "testo",
          testo:
            "Dolore pungente, giramenti di testa o una sensazione strana in un'articolazione: chiudi subito la serie, appoggia il peso in sicurezza e scrivi al tuo coach. Se il dolore non passa, fallo controllare da un medico.",
        },
      ],
    },
  },

  // ----------------------------------------------------------- anstrengung
  {
    slug: "anstrengung",
    foto: "allenamento",
    icona: "bersaglio",
    minuti: 2,
    categoria: "training",
    de: {
      titolo: "Wie anstrengend war's?",
      sotto: "Die Skala von 1 bis 5 erklärt",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Nach dem Training fragt dich die App bei „Wie lief es?“: „Wie anstrengend war es?“. Du antwortest mit einer Zahl von 1 bis 5. Eine falsche Antwort gibt es nicht: Es zählt, wie es sich für dich angefühlt hat.",
        },
        { tipo: "titolo", testo: "Die Skala" },
        {
          tipo: "punti",
          punti: [
            "1 – sehr leicht: Da wäre noch sehr viel mehr gegangen.",
            "2 – leicht: Angenehm, du warst kaum gefordert.",
            "3 – mittel: Du musstest dich konzentrieren, hattest aber noch Reserven.",
            "4 – hart: Die letzten Wiederholungen waren echte Arbeit. Ein, zwei wären vielleicht noch gegangen.",
            "5 – sehr hart: Du warst am Limit, mehr ging nicht.",
          ],
        },
        { tipo: "titolo", testo: "So wählst du" },
        {
          tipo: "punti",
          punti: [
            "Denk an das ganze Training, nicht nur an die schwerste Übung.",
            "Am besten gleich danach, solange du es noch genau weißt.",
            "Ehrlich schlägt heldenhaft: Eine 5 ist keine bessere Note als eine 3.",
          ],
        },
        { tipo: "titolo", testo: "Was dein Coach damit macht" },
        {
          tipo: "testo",
          testo:
            "Dein Coach sieht deine Zahlen, und unter „Fortschritt“ findest du deine „Ø Anstrengung“. Ist es über Wochen immer sehr leicht, kann der Plan mehr fordern. Ist es oft sehr hart, braucht es vielleicht mehr Erholung. Was sich ändert, entscheidet dein Coach.",
        },
        {
          tipo: "consiglio",
          testo:
            "Schreib bei „Wie lief es?“ einen Satz dazu: „Kniebeugen schwer, Rest gut“ hilft deinem Coach mehr als jede Zahl allein.",
        },
        {
          tipo: "testo",
          testo:
            "Fühlt sich ein Training ungewohnt hart an, weil du krank bist, schlecht geschlafen hast oder etwas wehtut, schreib das dazu. Bei Schmerzen oder Krankheit sprich mit deinem Coach und deinem Arzt, bevor du weitertrainierst.",
        },
      ],
    },
    it: {
      titolo: "Quanto è stato faticoso?",
      sotto: "La scala da 1 a 5 spiegata",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Dopo l'allenamento, in «Com'è andata?», l'app ti chiede: «Quanto è stato faticoso?». Rispondi con un numero da 1 a 5. Non c'è una risposta sbagliata: conta come l'hai vissuto tu.",
        },
        { tipo: "titolo", testo: "La scala" },
        {
          tipo: "punti",
          punti: [
            "1 – molto leggero: avresti potuto fare ancora tanto.",
            "2 – leggero: piacevole, quasi senza sforzo.",
            "3 – medio: serviva concentrazione, ma avevi ancora margine.",
            "4 – duro: le ultime ripetizioni erano fatica vera. Forse ne avresti fatte ancora una o due.",
            "5 – durissimo: eri al limite, non ne avevi più.",
          ],
        },
        { tipo: "titolo", testo: "Come scegliere" },
        {
          tipo: "punti",
          punti: [
            "Pensa a tutto l'allenamento, non solo all'esercizio più pesante.",
            "Meglio subito dopo, finché te lo ricordi bene.",
            "La sincerità vale più dell'eroismo: un 5 non è un voto migliore di un 3.",
          ],
        },
        { tipo: "titolo", testo: "Cosa ci fa il tuo coach" },
        {
          tipo: "testo",
          testo:
            "Il tuo coach vede i tuoi numeri, e in «Progressi» trovi la tua «Fatica media». Se per settimane è sempre molto leggero, il piano può chiederti di più. Se è spesso durissimo, forse serve più recupero. Cosa cambiare lo decide il tuo coach.",
        },
        {
          tipo: "consiglio",
          testo:
            "In «Com'è andata?» aggiungi una frase: «squat pesanti, il resto bene» aiuta il tuo coach più di qualsiasi numero da solo.",
        },
        {
          tipo: "testo",
          testo:
            "Se un allenamento ti sembra insolitamente duro perché hai la febbre, hai dormito male o qualcosa fa male, scrivilo. Con dolori o malattie parlane con il tuo coach e con il tuo medico prima di continuare ad allenarti.",
        },
      ],
    },
  },

  // ------------------------------------------------------------- meal-prep
  {
    slug: "meal-prep",
    foto: "mealprep",
    icona: "cronometro",
    minuti: 2,
    categoria: "ernaehrung",
    de: {
      titolo: "Meal Prep leicht gemacht",
      sotto: "Essen für drei Tage in einer Stunde",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Wer vorkocht, muss unter der Woche nicht überlegen, was es gibt. Mit einer Stunde am Sonntag oder Mittwoch hast du Essen für drei Tage. Was und wie viel auf deinen Teller kommt, steht in deinem Plan.",
        },
        { tipo: "titolo", testo: "1. Planen (10 Minuten)" },
        {
          tipo: "testo",
          testo:
            "Schau in deinem Plan bei „Ernährung“ nach und such dir zwei, drei Gerichte aus. Dann schreib eine Einkaufsliste.",
        },
        { tipo: "titolo", testo: "2. Nach dem Baukasten" },
        {
          tipo: "punti",
          punti: [
            "Eiweiß: Hähnchen, Pute, Fisch, Tofu oder Linsen",
            "Beilage: Reis, Kartoffeln, Nudeln oder Quinoa",
            "Gemüse: Brokkoli, Paprika, Zucchini, Karotten",
            "Geschmack: eine Soße oder Gewürze, damit es nicht jeden Tag gleich schmeckt",
          ],
        },
        { tipo: "titolo", testo: "3. Alles gleichzeitig kochen (40 Minuten)" },
        {
          tipo: "punti",
          punti: [
            "Ofen an: Gemüse und Hähnchen oder Tofu auf zwei Bleche",
            "Auf dem Herd: ein Topf Reis oder Kartoffeln",
            "In der Zwischenzeit: Soße anrühren, Dosen bereitstellen",
          ],
        },
        { tipo: "titolo", testo: "4. Portionieren und aufbewahren (10 Minuten)" },
        {
          tipo: "punti",
          punti: [
            "Auf Dosen mit Deckel verteilen, am besten flache: Darin kühlt das Essen schneller ab.",
            "Nicht stundenlang offen stehen lassen: abkühlen lassen und ab in den Kühlschrank.",
            "Aus dem Kühlschrank am besten innerhalb von drei Tagen essen. Was später dran ist, gleich einfrieren.",
            "Gut aufwärmen, bis es überall heiß ist. Riecht oder sieht etwas komisch aus: weg damit.",
          ],
        },
        {
          tipo: "consiglio",
          testo: "Kleb das Datum auf jede Dose. So weißt du immer, was zuerst dran ist.",
        },
        {
          tipo: "testo",
          testo:
            "Hast du Allergien, Unverträglichkeiten oder eine ärztlich verordnete Ernährung? Sag es deinem Coach, damit der Plan das berücksichtigt.",
        },
      ],
    },
    it: {
      titolo: "Meal prep facile",
      sotto: "Pasti per tre giorni in un'ora",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Se cucini in anticipo, in settimana non devi pensare a cosa mangiare. Con un'ora la domenica o il mercoledì hai pasti per tre giorni. Cosa e quanto mettere nel piatto lo trovi nel tuo piano.",
        },
        { tipo: "titolo", testo: "1. Organizzati (10 minuti)" },
        {
          tipo: "testo",
          testo:
            "Guarda nel piano alla voce «Alimentazione» e scegli due o tre piatti. Poi scrivi la lista della spesa.",
        },
        { tipo: "titolo", testo: "2. A mattoncini" },
        {
          tipo: "punti",
          punti: [
            "Proteine: pollo, tacchino, pesce, tofu o lenticchie",
            "Contorno: riso, patate, pasta o quinoa",
            "Verdure: broccoli, peperoni, zucchine, carote",
            "Sapore: una salsa o delle spezie, così non è uguale ogni giorno",
          ],
        },
        { tipo: "titolo", testo: "3. Cucina tutto insieme (40 minuti)" },
        {
          tipo: "punti",
          punti: [
            "Forno acceso: verdure e pollo o tofu su due teglie",
            "Sul fuoco: una pentola di riso o patate",
            "Nel frattempo: prepara la salsa e tira fuori i contenitori",
          ],
        },
        { tipo: "titolo", testo: "4. Porziona e conserva (10 minuti)" },
        {
          tipo: "punti",
          punti: [
            "Dividi in contenitori con coperchio, meglio se bassi: così il cibo si raffredda prima.",
            "Non lasciarlo fuori per ore: fallo raffreddare e mettilo in frigo.",
            "Dal frigo è meglio mangiarlo entro tre giorni. Quello che mangerai più avanti, congelalo subito.",
            "Riscalda bene, finché è caldo dappertutto. Se qualcosa ha un odore o un aspetto strano, buttalo.",
          ],
        },
        {
          tipo: "consiglio",
          testo: "Scrivi la data su ogni contenitore. Così sai sempre cosa mangiare per primo.",
        },
        {
          tipo: "testo",
          testo:
            "Hai allergie, intolleranze o una dieta prescritta dal medico? Dillo al tuo coach, così il piano ne tiene conto.",
        },
      ],
    },
  },

  // -------------------------------------------------------------- erholung
  {
    slug: "erholung",
    foto: "mobilita",
    icona: "luna",
    minuti: 2,
    categoria: "erholung",
    de: {
      titolo: "Schlaf und Erholung",
      sotto: "Warum Pausen dich stärker machen",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Stärker wirst du nicht während des Trainings, sondern in der Pause danach: Dann baut dein Körper auf, was du von ihm verlangt hast. Darum gehören Schlaf und Ruhetage genauso zum Plan wie die Trainings.",
        },
        { tipo: "titolo", testo: "Gut schlafen" },
        {
          tipo: "punti",
          punti: [
            "Möglichst jeden Tag zur gleichen Zeit ins Bett und aufstehen, auch am Wochenende",
            "Das Schlafzimmer dunkel, ruhig und eher kühl",
            "Das Handy vor dem Einschlafen weglegen",
            "Kaffee und Energydrinks lieber nicht am späten Nachmittag oder abends",
            "Kein großes, schweres Essen direkt vor dem Schlafen",
          ],
        },
        {
          tipo: "testo",
          testo:
            "Die meisten Erwachsenen brauchen etwa sieben bis neun Stunden Schlaf. Schläfst du über längere Zeit schlecht, sprich mit deinem Arzt.",
        },
        { tipo: "titolo", testo: "Ruhetage" },
        {
          tipo: "testo",
          testo:
            "Steht in deinem Plan „Ruhetag“, hat dein Coach ihn mit Absicht gesetzt: Heute erholst du dich. Hast du Lust auf Bewegung, mach etwas Leichtes.",
        },
        { tipo: "titolo", testo: "Aktive Erholung" },
        {
          tipo: "punti",
          punti: [
            "Ein Spaziergang, locker Radfahren oder Schwimmen",
            "Mobilität und leichtes Dehnen",
            "Die Faszienrolle für Oberschenkel, Waden und oberen Rücken, sanft und ohne Schmerz",
          ],
        },
        { tipo: "testo", testo: "Leicht heißt: Du könntest dich dabei gut unterhalten." },
        { tipo: "titolo", testo: "Wann du mehr Pause brauchst" },
        {
          tipo: "testo",
          testo:
            "Bist du dauernd müde, schläfst schlecht, wirst schwächer statt stärker oder hast keine Lust mehr aufs Training, schreib es deinem Coach. Dann kann der Plan angepasst werden. Bist du krank, mach Pause und sag Bescheid. Wann es weitergeht, besprichst du mit deinem Arzt und deinem Coach.",
        },
        {
          tipo: "consiglio",
          testo:
            "Ein Ruhetag ist kein verlorener Tag. Gehst du nach der Pause frischer ins Training, hat sie funktioniert.",
        },
      ],
    },
    it: {
      titolo: "Sonno e recupero",
      sotto: "Perché le pause ti rendono più forte",
      blocchi: [
        {
          tipo: "testo",
          testo:
            "Non diventi più forte durante l'allenamento, ma nella pausa dopo: è lì che il corpo costruisce quello che gli hai chiesto. Per questo sonno e giorni di riposo fanno parte del piano quanto gli allenamenti.",
        },
        { tipo: "titolo", testo: "Dormire bene" },
        {
          tipo: "punti",
          punti: [
            "Se puoi, a letto e in piedi sempre alla stessa ora, anche nel weekend",
            "Camera buia, silenziosa e piuttosto fresca",
            "Il telefono lontano prima di dormire",
            "Meglio niente caffè o energy drink nel tardo pomeriggio e la sera",
            "Niente pasto grande e pesante subito prima di dormire",
          ],
        },
        {
          tipo: "testo",
          testo:
            "La maggior parte degli adulti ha bisogno di circa sette-nove ore di sonno. Se dormi male per un periodo lungo, parlane con il tuo medico.",
        },
        { tipo: "titolo", testo: "Giorni di riposo" },
        {
          tipo: "testo",
          testo:
            "Se nel piano c'è «Riposo», il tuo coach l'ha messo apposta: oggi recuperi. Se hai voglia di muoverti, fai qualcosa di leggero.",
        },
        { tipo: "titolo", testo: "Recupero attivo" },
        {
          tipo: "punti",
          punti: [
            "Una passeggiata, un giro in bici tranquillo o una nuotata",
            "Mobilità e allungamenti leggeri",
            "Il rullo per cosce, polpacci e parte alta della schiena, piano e senza dolore",
          ],
        },
        { tipo: "testo", testo: "Leggero vuol dire: riusciresti a chiacchierare tranquillamente." },
        { tipo: "titolo", testo: "Quando ti serve più pausa" },
        {
          tipo: "testo",
          testo:
            "Se ti senti sempre senza energie, dormi male, perdi forza invece di guadagnarla o non hai più voglia di allenarti, scrivilo al tuo coach: il piano si può adattare. Se stai male, fermati e avvisa. Quando ripartire lo decidi con il tuo medico e il tuo coach.",
        },
        {
          tipo: "consiglio",
          testo:
            "Un giorno di riposo non è un giorno perso. Se dopo la pausa torni ad allenarti con più energia, ha funzionato.",
        },
      ],
    },
  },
];

export function guidaDa(slug: string): Guida | null {
  return GUIDE.find((g) => g.slug === slug) ?? null;
}
