// Blog DE — articoli scritti a mano, stile diretto e umano. Keyword transazionali Köln.
// type: "p" paragrafo, "h2" sottotitolo, "ul" lista

export interface BlogBlock {
  type: "p" | "h2" | "ul";
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string; // ISO
  readMinutes: number;
  excerpt: string;
  blocks: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "was-kostet-personal-trainer-koeln",
    title: "Was kostet ein Personal Trainer in Köln wirklich?",
    metaTitle: "Personal Trainer Köln Kosten 2026: ehrliche Preise",
    metaDescription:
      "Was kostet ein Personal Trainer in Köln? Ehrliche Zahlen: 50€ bis 150€ pro Stunde, Online Coaching ab 150€/Monat. Plus: woran du erkennst, ob sich das Geld lohnt.",
    date: "2026-06-11",
    readMinutes: 6,
    excerpt:
      "Zwischen 50€ und 150€ pro Stunde liegt in Köln fast alles. Hier steht, was hinter den Preisen steckt und woran du erkennst, ob sich dein Geld lohnt.",
    blocks: [
      {
        type: "p",
        text: "Kurze Antwort: In Köln zahlst du für eine Personal Training Stunde zwischen 50€ und 150€. Boutique-Studios in der Innenstadt nehmen 100€ bis 150€, freie Trainer in Premium-Clubs 80€ bis 120€, und Trainer ohne eigenes Studio wie ich liegen bei 50€ bis 80€. Online Coaching mit Plan, Ernährung und wöchentlichen Check-ins kostet in Köln meist zwischen 150€ und 400€ im Monat.",
      },
      { type: "h2", text: "Warum die Preise so weit auseinander liegen" },
      {
        type: "p",
        text: "Der größte Kostenfaktor ist nicht der Trainer. Es ist die Miete. Ein Boutique-Studio in der Kölner Innenstadt zahlt mehrere tausend Euro im Monat für die Fläche, und das steckt in deinem Stundenpreis. Du zahlst also oft nicht für besseres Coaching, sondern für die Adresse.",
      },
      {
        type: "p",
        text: "Ich arbeite anders: Krafttraining im Studio, Planung und Ernährung digital. Dadurch kann ich die Stunde für 50€ anbieten, ohne an der Betreuung zu sparen. Mein Geld verdiene ich nicht mit der Adresse, sondern mit deinen Ergebnissen. Die sprechen sich rum.",
      },
      { type: "h2", text: "Stunde buchen oder Coaching-Paket?" },
      {
        type: "p",
        text: "Rechne ehrlich: Wenn du zweimal pro Woche eine Stunde für 100€ buchst, bist du bei 800€ im Monat. Das halten die wenigsten länger als drei Monate durch. Und dann? Der Körper kennt keine Pause-Taste.",
      },
      {
        type: "p",
        text: "Deshalb empfehle ich den meisten Leuten das Hybrid-Modell: Online Coaching ab 150€ im Monat als Basis (Trainingsplan, Ernährung, wöchentliche Check-ins) und einzelne 1-zu-1 Stunden dann, wenn die Technik sitzen muss. Du bekommst Betreuung an 30 Tagen im Monat statt an 8 Stunden.",
      },
      { type: "h2", text: "Woran du erkennst, ob ein Trainer sein Geld wert ist" },
      {
        type: "ul",
        items: [
          "Er fragt zuerst nach deinen Zielen, deinem Alltag und deinen Verletzungen, nicht nach deiner Kreditkarte.",
          "Er kann eigene Ergebnisse zeigen: echte Vorher-Nachher-Bilder von Kunden, nicht Stockfotos.",
          "Er trainiert selbst ernsthaft. Wer auf der Wettkampfbühne steht, weiß was funktioniert.",
          "Er gibt dir einen Plan, den du verstehst. Wenn du nach vier Wochen nicht erklären kannst, warum du was trainierst, läuft etwas falsch.",
          "Das Erstgespräch ist kostenlos. Wer dafür Geld nimmt, verkauft Beratung statt Ergebnisse.",
        ],
      },
      { type: "h2", text: "Mein Angebot in Köln, schwarz auf weiß" },
      {
        type: "p",
        text: "Personal Training 1-zu-1: 50€ pro Stunde. Online Coaching: ab 150€ im Monat mit individuellem Trainingsplan, Ernährungsberatung und Check-ins jede Woche. Fertige Trainingspläne als PDF ab 25€, wenn du erstmal alleine starten willst. Die Erstberatung kostet nichts, dauert ehrlich gerechnet 30 bis 45 Minuten und verpflichtet dich zu gar nichts.",
      },
    ],
  },
  {
    slug: "endlich-abnehmen-5-fehler",
    title: "Du willst endlich abnehmen? Diese 5 Fehler halten dich fest",
    metaTitle: "Endlich abnehmen: 5 Fehler, die dich seit Jahren festhalten",
    metaDescription:
      "Diäten gemacht, Gewicht wieder drauf? Diese 5 Fehler sehe ich bei fast jedem Kunden in Köln. Und so kommst du raus, ohne Crash-Diät und ohne dich zu hassen.",
    date: "2026-06-11",
    readMinutes: 7,
    excerpt:
      "Wenn du schon dreimal abgenommen und alles wieder draufgepackt hast, liegt es nicht an deiner Disziplin. Es liegt an diesen 5 Fehlern.",
    blocks: [
      {
        type: "p",
        text: "Ich sage dir was, das dir keine Diät-Werbung sagen wird: Wenn du schon drei Diäten hinter dir hast und das Gewicht jedes Mal zurückkam, bist du nicht undiszipliniert. Du hattest ein System, das auf Scheitern gebaut war. Bei fast jedem Kunden, der zu mir nach Köln kommt, finde ich dieselben 5 Fehler.",
      },
      { type: "h2", text: "Fehler 1: Du isst zu wenig" },
      {
        type: "p",
        text: "Klingt verrückt, ist aber der häufigste Fehler. 1.200 Kalorien am Tag, vier Wochen durchgezogen, dann kam der Heißhunger und hat alles weggerissen. Dein Körper ist keine Maschine, die du aushungern kannst. Er wehrt sich, und er gewinnt immer. Ein moderates Defizit von 300 bis 500 Kalorien hält dich satt genug, um Monate durchzuhalten. Und Monate sind das, was zählt.",
      },
      { type: "h2", text: "Fehler 2: Nur Cardio, kein Krafttraining" },
      {
        type: "p",
        text: "Jede Woche joggen am Aachener Weiher und trotzdem sieht der Spiegel gleich aus? Ohne Krafttraining verlierst du beim Abnehmen Muskeln statt Fett. Das Ergebnis: weniger Gewicht auf der Waage, aber dieselbe weiche Form. Zwei bis drei Krafteinheiten pro Woche verändern, WIE du abnimmst. Das ist der Unterschied zwischen dünn und fit.",
      },
      { type: "h2", text: "Fehler 3: Alles oder nichts" },
      {
        type: "p",
        text: "Montag perfekt, Dienstag perfekt, Mittwoch ein Stück Kuchen im Büro, und ab Donnerstag ist die Woche eh gelaufen. Kennst du? Ein Ausrutscher kostet dich vielleicht 300 Kalorien. Die Woche hinschmeißen kostet dich 5.000. Nicht der Kuchen macht dich rund, sondern das Aufgeben danach.",
      },
      { type: "h2", text: "Fehler 4: Du machst es allein" },
      {
        type: "p",
        text: "Jeder Profi hat einen Coach. Nicht weil Profis dumm sind, sondern weil niemand sein eigenes Verhalten objektiv sieht. Ein wöchentlicher Check-in mit jemandem, der deine Zahlen kennt und dich nicht vom Haken lässt, ändert mehr als jede App. Verbindlichkeit ist der unterschätzteste Faktor beim Abnehmen.",
      },
      { type: "h2", text: "Fehler 5: Du wartest auf Motivation" },
      {
        type: "p",
        text: "Motivation kommt nicht vor dem Training. Sie kommt danach. Die ersten zwei Wochen sind Überwindung, ab Woche drei willst du den Haken auf dem Plan, und nach acht Wochen siehst du im Spiegel, warum du das machst. Wer auf den richtigen Moment wartet, wartet ewig. Der richtige Moment ist ein Dienstag um 18 Uhr, an dem du keine Lust hast und trotzdem gehst.",
      },
      { type: "h2", text: "Und jetzt?" },
      {
        type: "p",
        text: "Du musst das nicht alleine sortieren. Genau dafür gibt es die kostenlose Erstberatung: Wir schauen uns an, wo du stehst, was du schon versucht hast und was bei DIR konkret hakt. Danach weißt du, was zu tun ist. Ob mit mir oder ohne mich.",
      },
    ],
  },
  {
    slug: "muskelaufbau-anfaenger-koeln",
    title: "Muskelaufbau für Anfänger: Was wirklich funktioniert",
    metaTitle: "Muskelaufbau für Anfänger: der ehrliche Plan ohne Bro-Science",
    metaDescription:
      "Muskelaufbau als Anfänger: 3 Einheiten pro Woche, Grundübungen, Progression und genug Essen. Was wirklich funktioniert, erklärt von einem WABBA Wettkampfathleten aus Köln.",
    date: "2026-06-11",
    readMinutes: 6,
    excerpt:
      "Vergiss die 17 Geheimtipps aus YouTube. Als Anfänger brauchst du genau vier Dinge. Ein WABBA Athlet erklärt, welche.",
    blocks: [
      {
        type: "p",
        text: "Ich stehe als Athlet im WABBA International Verband auf der Bühne. Was ich dir hier aufschreibe, ist kein Internet-Wissen, sondern das, was ich selbst jeden Tag anwende und womit meine Kunden in Köln Muskeln aufbauen. Die gute Nachricht: Als Anfänger brauchst du keine Geheimnisse. Du brauchst vier Dinge, konsequent umgesetzt.",
      },
      { type: "h2", text: "1. Drei Einheiten pro Woche reichen" },
      {
        type: "p",
        text: "Mehr ist am Anfang nicht besser, mehr ist nur anstrengender. Drei Ganzkörper-Einheiten pro Woche, 45 bis 60 Minuten, schlagen jeden 6er-Split, den du als Anfänger nicht regenerieren kannst. Dein Muskel wächst in der Pause, nicht im Training.",
      },
      { type: "h2", text: "2. Grundübungen statt Geräte-Hopping" },
      {
        type: "p",
        text: "Kniebeugen, Kreuzheben, Bankdrücken, Rudern, Schulterdrücken, Klimmzüge. Diese sechs Übungen bauen 90 Prozent deiner Muskulatur auf. Wer als Anfänger an 14 Maschinen je 3 Sätze macht, verteilt seinen Fortschritt so dünn, dass nichts wächst. Lern die sechs Übungen sauber, und zwar mit jemandem, der deine Technik korrigiert, bevor sich Fehler einschleifen.",
      },
      { type: "h2", text: "3. Progression schlägt Abwechslung" },
      {
        type: "p",
        text: "Dein Muskel wächst, wenn er diese Woche mehr leisten muss als letzte Woche. Ein Kilo mehr, eine Wiederholung mehr, ein Satz mehr. Das ist alles. Wer jede Woche das Programm wechselt, kann nicht messen, ob er stärker wird. Gleicher Plan, steigende Last, acht bis zwölf Wochen. Dann reden wir über Abwechslung.",
      },
      { type: "h2", text: "4. Ohne Essen wächst nichts" },
      {
        type: "p",
        text: "Der häufigste Grund, warum Anfänger nicht aufbauen: Sie essen wie Leute, die abnehmen wollen. Für Muskelaufbau brauchst du einen leichten Kalorienüberschuss von 200 bis 300 Kalorien und etwa 1,8 bis 2 Gramm Eiweiß pro Kilo Körpergewicht. Bei 80 Kilo sind das 150 bis 160 Gramm Eiweiß am Tag. Wer das nicht trackt, rät. Und Raten baut keine Muskeln.",
      },
      { type: "h2", text: "Der Anfänger-Vorteil: nutz ihn" },
      {
        type: "p",
        text: "Im ersten Trainingsjahr baust du schneller Muskeln auf als jemals wieder danach. Dieses Fenster bekommst du nie zurück. Genau deshalb lohnt sich Coaching am Anfang am meisten: Jeder Technikfehler, den du dir jetzt NICHT angewöhnst, spart dir Monate. Wenn du in Köln bist, zeig ich dir die sechs Grundübungen persönlich. Erstberatung kostenlos.",
      },
    ],
  },
  {
    slug: "online-coaching-oder-personal-training",
    title: "Online Coaching oder Personal Training: Was passt zu dir?",
    metaTitle: "Online Coaching vs Personal Training: der ehrliche Vergleich",
    metaDescription:
      "Online Coaching ab 150€/Monat oder Personal Training für 50€/Stunde? Der ehrliche Vergleich: Kosten, Betreuung, Ergebnisse. Und für wen das Hybrid-Modell ideal ist.",
    date: "2026-06-11",
    readMinutes: 5,
    excerpt:
      "Das eine kostet 150€ im Monat, das andere 50€ pro Stunde. Welches Modell dich wirklich ans Ziel bringt, hängt von genau drei Fragen ab.",
    blocks: [
      {
        type: "p",
        text: "Beide Modelle funktionieren. Ich betreue Kunden in beiden, seit Jahren. Aber sie funktionieren für unterschiedliche Menschen. Statt dir beides zu verkaufen, gebe ich dir die drei Fragen, mit denen du es selbst entscheidest.",
      },
      { type: "h2", text: "Frage 1: Kannst du die Übungen technisch sauber?" },
      {
        type: "p",
        text: "Wenn du noch nie mit der Langhantel gearbeitet hast, brauchst du am Anfang Augen auf deiner Technik. Eine schiefe Kniebeuge sieht auf dem Handyvideo harmlos aus und kostet dich im Zweifel den Rücken. Erste Phase: 1-zu-1 im Studio. Danach kannst du guten Gewissens auf Online-Betreuung wechseln.",
      },
      { type: "h2", text: "Frage 2: Brauchst du den Termin als Druck?" },
      {
        type: "p",
        text: "Manche Menschen gehen nur ins Training, wenn jemand auf sie wartet. Das ist keine Schwäche, das ist Selbstkenntnis. Wenn du zu denen gehörst, ist der feste Termin beim Personal Training dein wichtigstes Werkzeug. Wenn du dagegen eh trainierst und nur Richtung brauchst, zahlst du beim 1-zu-1 für etwas, das du nicht brauchst.",
      },
      { type: "h2", text: "Frage 3: Was ist dein Budget über 6 Monate?" },
      {
        type: "p",
        text: "Ergebnisse brauchen Monate, keine Wochen. Rechne also nicht in Stunden, sondern in Halbjahren. Zweimal pro Woche Personal Training: rund 2.400€ in 6 Monaten. Online Coaching: 900€ für denselben Zeitraum, mit Betreuung an jedem einzelnen Tag statt nur im Termin. Für die meisten Berufstätigen ist das zweite Modell schlicht das, was sie durchhalten.",
      },
      { type: "h2", text: "Das Hybrid-Modell: so machen es die meisten meiner Kunden" },
      {
        type: "p",
        text: "Online Coaching als Basis: individueller Trainingsplan, Ernährung, wöchentlicher Check-in. Dazu am Anfang zwei bis vier 1-zu-1 Stunden für die Technik, später eine Stunde pro Monat als Qualitätskontrolle. Du bekommst das Beste aus beidem und bleibst unter 250€ im Monat. In der kostenlosen Erstberatung rechnen wir dein Setup konkret durch.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
