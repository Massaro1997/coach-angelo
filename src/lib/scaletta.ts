// Scaletta del rebranding, dettata da Calogero il 03/10/2026.
//
// Sta in un file e non nel database apposta: il database e' quello di
// produzione, e una lista che cambia a ogni sessione di lavoro non merita una
// tabella nuova li'. Lo stato delle voci si aggiorna qui, man mano che si fa.

export type Stato = "fatto" | "in-corso" | "da-fare";

export type Voce = {
  titolo: string;
  stato: Stato;
  /** a che punto siamo, in una riga */
  nota?: string;
  /** cosa deve arrivare da Calogero o da Angelo per poter andare avanti */
  serve?: string;
};

export type Fase = {
  n: number;
  titolo: string;
  obiettivo: string;
  voci: Voce[];
};

export const AGGIORNATA = "04/10/2026";

export const SCALETTA: Fase[] = [
  {
    n: 1,
    titolo: "Nome e logo",
    obiettivo:
      "Il simbolo AM di oggi, più curvo e più tech, sul rosso. Accanto, un nome d'azienda unico.",
    voci: [
      {
        titolo: "Simbolo AM fedele a quello di oggi, più curvo e più tech",
        stato: "fatto",
        nota: "Deciso il 03/10/2026: bozza Tech con più pendenza, 12 gradi come la scritta.",
      },
      {
        titolo: "Nome dell'azienda: unico, vero, non legato per forza ad AM",
        stato: "in-corso",
        nota: "Si va avanti con FITPRIMO, scelto da te. Resta aperto il controllo marchi: FITPRIME è registrato in Europa per servizi fitness, quasi uguale.",
        serve: "Prima di stampare o registrare il dominio: parere di un avvocato di marchi, oppure passare a FITELITE o FITELAN. Cambiare nome nel logo è un comando solo.",
      },
      {
        titolo: "Dominio e mail del marchio nuovo",
        stato: "in-corso",
        nota: "Dati da te il 04/10: www.fitprimo.de e info@fitprimo.de. Messi su brochure e biglietto, codice QR compreso. Quel giorno fitprimo.de era comprato ma parcheggiato su Hostinger (la posta invece aveva già i server di Hostinger). Il sito gira ancora su angelocoach.com e dice ancora Coach Angelo in titoli, metadata e diritti.",
        serve: "Collegare fitprimo.de al sito prima di stampare: finché è parcheggiato, indirizzo e codice QR portano a una pagina vuota. Poi decidere il passaggio del sito al dominio nuovo: con oltre mille pagine indicizzate va fatto con i reindirizzamenti, non a mano. Resta aperto il parere sul marchio FITPRIME.",
      },
      {
        titolo: "Via la scritta Angelo Magliarisi a destra, al suo posto il nome nuovo",
        stato: "fatto",
        nota: "Nome su una riga sola accanto al simbolo, senza niente sotto.",
      },
      {
        titolo: "Logo definitivo in tutte le versioni",
        stato: "fatto",
        nota: "Scritta in Kanit Bold, angoli tondi e tagli sospesi. File in brand/logo/fitprimo: colore, su scuro, bianco, nero, rosso, solo simbolo, tessera, icone. SVG e PNG.",
      },
    ],
  },
  {
    n: 2,
    titolo: "Colori e brand sheet",
    obiettivo: "Le regole del marchio su un foglio solo, da dare a chiunque lavori per Angelo.",
    voci: [
      {
        titolo: "Palette colori del marchio",
        stato: "fatto",
        nota: "Rosso, rosso chiaro, rosso scuro, nero, grigio chiaro, bianco. Nella sezione Brand sheet.",
      },
      {
        titolo: "Caratteri per titoli e testi",
        stato: "fatto",
        nota: "Kanit Bold Italic per i titoli, Archivo per i testi.",
      },
      {
        titolo: "Brand sheet: logo, colori, caratteri e regole d'uso",
        stato: "in-corso",
        nota: "Prima versione nella sezione Brand sheet, con sei foto d'esempio del marchio in uso. Manca la versione in PDF da mandare ad Angelo.",
        serve: "Guardala e dimmi cosa cambiare.",
      },
    ],
  },
  {
    n: 3,
    titolo: "Stampa e merchandising",
    obiettivo: "Il materiale che Angelo e i trainer lasciano in mano al cliente.",
    voci: [
      {
        titolo: "Bigliettini da visita",
        stato: "in-corso",
        nota: "Prima versione fatta il 04/10, fronte e retro, in tedesco e in italiano: nella sezione Merchandising. Per ora solo quello di Angelo.",
        serve: "Il telefono di Angelo: sul biglietto non c'è. E i dati degli altri due, quando ci sono.",
      },
      {
        titolo: "Brochure a tre ante",
        stato: "in-corso",
        nota: "Prima versione fatta il 04/10, in tedesco e in italiano, con PDF e PNG per la tipografia: nella sezione Merchandising. I pannelli seguono l'imbuto, dall'aggancio in copertina ai prezzi con la consulenza gratuita.",
        serve: "Conferma di Angelo su prezzi e numeri (100+ trasformazioni, 4,9 su 5). Non mandare in stampa prima del parere sul nome.",
      },
    ],
  },
  {
    n: 4,
    titolo: "Sito con l'immagine nuova",
    obiettivo: "Da sito di una persona a sito di un'azienda vera: marchio nuovo, squadra, mappa, recensioni.",
    voci: [
      {
        titolo: "Grafica del sito rifatta, più vera e aziendale",
        stato: "in-corso",
        nota: "Tutto il sito è nel tema chiaro sul modello Trainex: home, Über mich, Leistungen con i prezzi a tre schede, contatti, quartieri, blog, domande, pagine legali, cassa. Restano scure solo le pagine dei contratti, che sono uno strumento di lavoro. Dominio e indirizzi restano quelli di oggi.",
        serve: "Giro di controllo tuo sulle pagine interne. Titoli, metadata e nome 'Coach Angelo' nei testi per Google non sono toccati finché il nome non è deciso.",
      },
      {
        titolo: "Recensioni, trasformazioni e chiamata con Angelo in fondo a ogni pagina",
        stato: "in-corso",
        nota: "Fatto il 04/10: foto prima e dopo, poi il nastro di recensioni come Trainex (fondo bianco, sale sopra la fascia precedente che resta ferma, con la cima in trasparenza), poi la fascia rossa con Angelo e il pulsante della consulenza. La pagina Bewertungen è tolta, l'indirizzo vecchio porta alla home.",
        serve: "Le foto vere dei clienti per il tondo accanto al nome (oggi c'è l'iniziale) e la conferma di Angelo che le sei recensioni sono di clienti veri.",
      },
      {
        titolo: "Immagini nuove per SEO e GEO",
        stato: "in-corso",
        nota: "Fatte il 04/10 per la home: tre foto dei servizi chiare e senza persone, nei colori del sito, e la foto dei tre in palestra (Angelo, una cliente, la trainer) con la maglia FITPRIMO. Sono fatte dal modello. Le pagine interne hanno ancora le foto vecchie.",
        serve: "Foto vere di Angelo in maglia FITPRIMO appena ci sono: quella di oggi è ricostruita dalle sue foto e gli somiglia solo in parte.",
      },
      {
        titolo: "Squadra di tre: Angelo, una trainer, uno per l'alimentazione",
        stato: "in-corso",
        nota: "Fascia fatta il 04/10 come in Trainex: tre figure a braccia conserte, Angelo nella scheda grande. La trainer bionda e il nutrizionista in camice sono figure d'esempio, non esistono. La fascia si vede solo in locale: in produzione resta spenta.",
        serve: "Due persone vere con nome, foto e qualifica. Con figure inventate la fascia non va pubblicata: in Germania è pubblicità ingannevole.",
      },
      {
        titolo: "Google Maps nella pagina contatti e in homepage",
        stato: "da-fare",
        serve: "Un indirizzo vero dove si allena. Senza, Google mostra solo la zona servita.",
      },
      {
        titolo: "Recensioni prese dal profilo Google",
        stato: "da-fare",
        nota: "Sostituiscono quelle di oggi nel nastro, quindi vengono dopo la fase 5.",
      },
    ],
  },
  {
    n: 5,
    titolo: "Google Business Profile",
    obiettivo: "Farsi trovare su Google Maps con il nome nuovo e con recensioni vere.",
    voci: [
      {
        titolo: "Profilo Google Business con nome, logo e foto nuovi",
        stato: "da-fare",
        serve: "Accesso all'account Google di Angelo.",
      },
      {
        titolo: "Recensioni Google dei clienti",
        stato: "da-fare",
        serve: "Solo clienti veri: in Germania le recensioni inventate sono vietate.",
      },
    ],
  },
];
