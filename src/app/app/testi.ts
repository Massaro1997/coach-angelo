// Testi dell'app clienti. La lingua viene dal profilo del cliente (default de).
// Il nome del coach arriva come parametro (da MARCHIO): niente nomi scritti qui,
// cosi' gli stessi testi vanno bene per ogni coach in white label.

import type { Lingua } from "@/lib/app-coaching/tipi";

const de = {
  locale: "de-DE",
  descrizioneApp: (coach: string) => `Training und Ernährung von ${coach}, Tag für Tag.`,

  // ingresso
  benvenuto: "Willkommen",
  introCodice: (coach: string) => `Gib den Code ein, den du von ${coach} bekommen hast.`,
  etichettaCodice: "Dein Code",
  entra: "Anmelden",
  attendi: "Einen Moment …",
  codiceErrato: "Der Code stimmt nicht. Prüf ihn bitte nochmal.",
  troppiTentativi: "Zu viele Versuche. Warte ein paar Minuten.",
  nienteRete: "Keine Verbindung. Prüf dein Internet.",
  erroreGenerico: "Das hat nicht geklappt. Versuch es nochmal.",

  // installazione
  installaTitolo: "Als App aufs Handy",
  installaBottone: "App installieren",
  iphone: "iPhone",
  android: "Android",
  passiIphone: [
    "In Safari unten auf „Teilen“ tippen",
    "„Zum Home-Bildschirm“ wählen",
    "Mit „Hinzufügen“ bestätigen",
  ],
  notaIphone: "Beim ersten Öffnen gibst du den Code noch einmal ein.",
  passiAndroid: [
    "In Chrome oben rechts auf ⋮ tippen",
    "„App installieren“ wählen",
  ],

  // testata e menu
  menu: "Menü",
  chiudi: "Schließen",
  esci: "Abmelden",
  esciConferma: "Wirklich abmelden?",
  esciSi: "Ja, abmelden",
  annulla: "Abbrechen",
  offline: "Offline: du siehst den zuletzt geladenen Stand.",

  // home
  ciao: (nome: string) => `Hallo ${nome}`,
  obiettivo: (o: string) => `Dein Ziel: ${o}`,
  oggi: "Heute",
  nienteOggi: "Für heute ist nichts eingetragen.",
  apriGiorno: "Tag öffnen",
  settimana: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  mesePrima: "Vorheriger Monat",
  meseDopo: "Nächster Monat",

  // contenuti del giorno
  training: "Training",
  alimentazione: "Ernährung",
  riposo: "Ruhetag",
  riposoTesto: "Heute erholst du dich. Das gehört zum Plan.",
  esercizi: (n: number) => (n === 1 ? "1 Übung" : `${n} Übungen`),
  pasti: (n: number) => (n === 1 ? "1 Mahlzeit" : `${n} Mahlzeiten`),
  fatto: "Erledigt",
  daFare: "Noch offen",
  serieRip: (s: string, r: string) => `${s} × ${r}`,
  soloSerie: (s: string) => `${s} Sätze`,
  soloRip: (r: string) => `${r} Wdh.`,
  carico: "Gewicht",
  pausa: (p: string) => `${p} Pause`,
  durata: "Dauer",
  video: "Video ansehen",
  kcal: "kcal",
  calorie: "Kalorien",
  proteine: "Eiweiß",
  carboidrati: "Kohlenhydrate",
  grassi: "Fett",
  acqua: "Wasser",
  grammi: (n: number) => `${n} g`,
  notaCoach: (coach: string) => `Notiz von ${coach}`,
  nientePiano: (coach: string) => `Für diesen Tag hat ${coach} noch nichts eingetragen.`,

  // pagina del giorno
  calendario: "Kalender",
  giornoPrima: "Vorheriger Tag",
  giornoDopo: "Nächster Tag",
  erroreCarica: "Der Plan konnte nicht geladen werden.",
  riprova: "Nochmal versuchen",
  domanda: (coach: string) => `Frage an ${coach}?`,
  scriviWhatsapp: "Auf WhatsApp schreiben",
  messaggioWhatsapp: (giorno: string) => `Hallo, ich habe eine Frage zu meinem Plan vom ${giorno}:`,

  // risposta del cliente
  rispostaTitolo: "Deine Rückmeldung",
  segnaFatto: "Als erledigt markieren",
  fatica: "Wie anstrengend war es?",
  faticaMin: "leicht",
  faticaMax: "sehr hart",
  faticaVoci: ["sehr leicht", "leicht", "mittel", "hart", "sehr hart"],
  feedback: "Wie lief es?",
  feedbackSegnaposto: "Schreib kurz, wie es war.",
  salva: "Speichern",
  salvando: "Speichert …",
  salvato: "Gespeichert",
  erroreSalva: "Nicht gespeichert. Prüf deine Verbindung und versuch es nochmal.",

  // accesso dal link
  entrando: "Du wirst angemeldet …",
  linkNonValido: "Dieser Link funktioniert nicht mehr. Gib einfach deinen Code ein.",
  vaiCodice: "Zum Code",

  // pagina offline del service worker
  offlineTitolo: "Keine Verbindung",
  offlineTesto: "Diesen Tag hast du noch nicht offline gespeichert.",
};

export type Testi = typeof de;

const it: Testi = {
  locale: "it-IT",
  descrizioneApp: (coach) => `Allenamento e alimentazione di ${coach}, giorno per giorno.`,

  benvenuto: "Ciao!",
  introCodice: (coach) => `Inserisci il codice che ti ha mandato ${coach}.`,
  etichettaCodice: "Il tuo codice",
  entra: "Entra",
  attendi: "Un momento …",
  codiceErrato: "Il codice non è giusto. Controllalo e riprova.",
  troppiTentativi: "Troppi tentativi. Aspetta qualche minuto.",
  nienteRete: "Nessuna connessione. Controlla internet.",
  erroreGenerico: "Non ha funzionato. Riprova.",

  installaTitolo: "L'app sul telefono",
  installaBottone: "Installa l'app",
  iphone: "iPhone",
  android: "Android",
  passiIphone: [
    "In Safari tocca «Condividi» in basso",
    "Scegli «Aggiungi alla schermata Home»",
    "Conferma con «Aggiungi»",
  ],
  notaIphone: "La prima volta che apri l'app inserisci di nuovo il codice.",
  passiAndroid: [
    "In Chrome tocca ⋮ in alto a destra",
    "Scegli «Installa app»",
  ],

  menu: "Menu",
  chiudi: "Chiudi",
  esci: "Esci",
  esciConferma: "Vuoi davvero uscire?",
  esciSi: "Sì, esci",
  annulla: "Annulla",
  offline: "Offline: vedi l'ultima versione scaricata.",

  ciao: (nome) => `Ciao ${nome}`,
  obiettivo: (o) => `Il tuo obiettivo: ${o}`,
  oggi: "Oggi",
  nienteOggi: "Per oggi non c'è niente in programma.",
  apriGiorno: "Apri il giorno",
  settimana: ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"],
  mesePrima: "Mese prima",
  meseDopo: "Mese dopo",

  training: "Allenamento",
  alimentazione: "Alimentazione",
  riposo: "Riposo",
  riposoTesto: "Oggi recuperi. Fa parte del piano.",
  esercizi: (n) => (n === 1 ? "1 esercizio" : `${n} esercizi`),
  pasti: (n) => (n === 1 ? "1 pasto" : `${n} pasti`),
  fatto: "Fatto",
  daFare: "Da fare",
  serieRip: (s, r) => `${s} × ${r}`,
  soloSerie: (s) => `${s} serie`,
  soloRip: (r) => `${r} ripetizioni`,
  carico: "Carico",
  pausa: (p) => `${p} di pausa`,
  durata: "Durata",
  video: "Guarda il video",
  kcal: "kcal",
  calorie: "Calorie",
  proteine: "Proteine",
  carboidrati: "Carboidrati",
  grassi: "Grassi",
  acqua: "Acqua",
  grammi: (n) => `${n} g`,
  notaCoach: (coach) => `Nota di ${coach}`,
  nientePiano: (coach) => `Per questo giorno ${coach} non ha ancora scritto niente.`,

  calendario: "Calendario",
  giornoPrima: "Giorno prima",
  giornoDopo: "Giorno dopo",
  erroreCarica: "Non è stato possibile caricare il piano.",
  riprova: "Riprova",
  domanda: (coach) => `Una domanda per ${coach}?`,
  scriviWhatsapp: "Scrivi su WhatsApp",
  messaggioWhatsapp: (giorno) => `Ciao, ho una domanda sul piano del ${giorno}:`,

  rispostaTitolo: "Il tuo feedback",
  segnaFatto: "Segna come fatto",
  fatica: "Quanto è stato faticoso?",
  faticaMin: "leggero",
  faticaMax: "durissimo",
  faticaVoci: ["molto leggero", "leggero", "medio", "duro", "durissimo"],
  feedback: "Com'è andata?",
  feedbackSegnaposto: "Scrivi in breve com'è andata.",
  salva: "Salva",
  salvando: "Salvo …",
  salvato: "Salvato",
  erroreSalva: "Non salvato. Controlla la connessione e riprova.",

  entrando: "Ti stiamo facendo entrare …",
  linkNonValido: "Questo link non funziona più. Inserisci il tuo codice.",
  vaiCodice: "Vai al codice",

  offlineTitolo: "Nessuna connessione",
  offlineTesto: "Questo giorno non è ancora salvato sul telefono.",
};

export const TESTI: Record<Lingua, Testi> = { de, it };

export function testiDi(lingua: Lingua | null | undefined): Testi {
  return lingua === "it" ? it : de;
}
