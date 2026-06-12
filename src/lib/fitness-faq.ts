// FAQ fitness long-tail in tedesco. Domande reali che i tedeschi cercano su Google.
// Contenuto scritto a mano, unico per pagina (no template). Route /fitness-faq/[slug].

export type FaqCategory =
  | "abnehmen"
  | "muskelaufbau"
  | "ernaehrung"
  | "training"
  | "anfaenger"
  | "personal-training";

export interface FaqItem {
  slug: string;
  category: FaqCategory;
  question: string;
  shortAnswer: string;
  body: { h2: string; text: string }[];
  relatedSlugs: string[];
}

export const faqCategories: { key: FaqCategory; label: string }[] = [
  { key: "abnehmen", label: "Abnehmen" },
  { key: "muskelaufbau", label: "Muskelaufbau" },
  { key: "ernaehrung", label: "Ernährung" },
  { key: "training", label: "Training" },
  { key: "anfaenger", label: "Anfänger" },
  { key: "personal-training", label: "Personal Training" },
];

export const fitnessFaqs: FaqItem[] = [
  // ─────────────── ABNEHMEN ───────────────
  {
    slug: "wie-oft-trainieren-zum-abnehmen",
    category: "abnehmen",
    question: "Wie oft sollte ich trainieren, um abzunehmen?",
    shortAnswer:
      "Drei bis vier Einheiten pro Woche reichen zum Abnehmen völlig aus, davon zwei bis drei Krafttraining. Entscheidend ist nicht die Häufigkeit, sondern dass du es über Monate durchhältst und gleichzeitig im Kaloriendefizit isst.",
    body: [
      {
        h2: "Krafttraining schlägt stundenlanges Cardio",
        text: "Viele glauben, abnehmen heißt jeden Tag joggen. Falsch. Wer beim Abnehmen nur Cardio macht, verliert auch Muskeln und sieht am Ende schlanker, aber nicht straffer aus. Zwei bis drei Krafteinheiten pro Woche schützen die Muskulatur und halten deinen Stoffwechsel oben.",
      },
      {
        h2: "Die Wahrheit über das Defizit",
        text: "Du nimmst nicht durch Training ab, sondern durch ein Kaloriendefizit. Sport verbrennt weniger Kalorien, als die meisten denken. Eine Stunde Joggen sind grob 500 Kalorien, ein Stück Kuchen macht das in zwei Minuten zunichte. Die Küche entscheidet, das Training formt.",
      },
      {
        h2: "Was realistisch ist",
        text: "Ein bis zwei Kilo Fett im Monat sind gesund und nachhaltig. Wer schneller abnimmt, verliert Wasser und Muskeln und hat das Gewicht in Wochen wieder drauf. Geduld ist hier kein Nachteil, sie ist die ganze Strategie.",
      },
    ],
    relatedSlugs: ["warum-nehme-ich-nicht-ab-trotz-sport", "abnehmen-wie-schnell-realistisch", "wie-viele-kalorien-zum-abnehmen"],
  },
  {
    slug: "warum-nehme-ich-nicht-ab-trotz-sport",
    category: "abnehmen",
    question: "Warum nehme ich nicht ab, obwohl ich Sport mache?",
    shortAnswer:
      "Meistens liegt es an der Ernährung: Du isst mehr, als du denkst, oder du belohnst das Training mit zusätzlichem Essen. Ohne Kaloriendefizit nimmst du trotz Sport nicht ab.",
    body: [
      {
        h2: "Der häufigste Fehler: Essen als Belohnung",
        text: "Nach dem Training fühlt man sich, als hätte man sich etwas verdient. Ein Proteinriegel hier, ein größeres Abendessen da. Schon ist das mühsam verbrannte Defizit weg. Training macht hungrig, und genau da fällt die Rechnung auseinander.",
      },
      {
        h2: "Du unterschätzt deine Kalorien",
        text: "Studien zeigen immer wieder: Menschen schätzen ihre Kalorienzufuhr um 30 bis 50 Prozent zu niedrig. Das Öl in der Pfanne, der Schluck Saft, die Handvoll Nüsse. Wer nicht trackt, rät, und Raten reicht zum Abnehmen selten.",
      },
      {
        h2: "Die Waage lügt kurzfristig",
        text: "Wenn du mit Krafttraining anfängst, lagert dein Körper Wasser in die Muskeln ein und die Waage steht still oder steigt sogar. Das ist kein Misserfolg. Miss lieber mit dem Maßband und Fotos, nicht nur mit der Waage.",
      },
    ],
    relatedSlugs: ["wie-oft-trainieren-zum-abnehmen", "wie-viele-kalorien-zum-abnehmen", "bauchfett-verlieren-wie"],
  },
  {
    slug: "abnehmen-wie-schnell-realistisch",
    category: "abnehmen",
    question: "Wie schnell kann man realistisch abnehmen?",
    shortAnswer:
      "Realistisch sind ein bis zwei Kilo Fett pro Monat, also etwa 0,5 bis 1 Prozent deines Körpergewichts pro Woche. Schneller geht meist nur über Wasser- und Muskelverlust, und das kommt zurück.",
    body: [
      {
        h2: "Warum langsam besser ist",
        text: "Je aggressiver das Defizit, desto mehr Muskeln verlierst du und desto stärker schlägt der Heißhunger zu. Ein moderates Defizit von 300 bis 500 Kalorien hält dich satt genug, um Monate durchzuziehen. Und Monate sind das, was zählt.",
      },
      {
        h2: "Der Startbonus",
        text: "In den ersten ein bis zwei Wochen fällt die Waage oft schneller, weil der Körper Wasser verliert. Das ist normal und kein Maßstab für den Rest. Bewerte deinen Fortschritt nie nach der ersten Woche.",
      },
      {
        h2: "Was den Unterschied macht",
        text: "Wer mit Begleitung abnimmt, bleibt im Schnitt deutlich länger dran. Nicht weil der Plan magisch ist, sondern weil jemand wöchentlich draufschaut und dich nicht vom Haken lässt. Wenn du das brauchst, ist die Erstberatung kostenlos.",
      },
    ],
    relatedSlugs: ["wie-oft-trainieren-zum-abnehmen", "warum-nehme-ich-nicht-ab-trotz-sport", "jojo-effekt-vermeiden"],
  },
  {
    slug: "wie-viele-kalorien-zum-abnehmen",
    category: "abnehmen",
    question: "Wie viele Kalorien sollte ich zum Abnehmen essen?",
    shortAnswer:
      "Zieh von deinem Erhaltungsbedarf 300 bis 500 Kalorien ab. Für viele liegt das Abnehmen bei etwa 1.800 bis 2.200 Kalorien für Männer und 1.500 bis 1.900 für Frauen, abhängig von Größe, Gewicht und Aktivität.",
    body: [
      {
        h2: "Erst den Erhaltungsbedarf finden",
        text: "Dein Erhaltungsbedarf ist die Kalorienmenge, bei der dein Gewicht gleich bleibt. Ein grober Startwert sind 30 bis 33 Kalorien pro Kilo Körpergewicht. Von da ziehst du das Defizit ab. Nach zwei Wochen siehst du an der Waage, ob der Wert stimmt.",
      },
      {
        h2: "Nicht zu wenig essen",
        text: "Der größte Fehler ist, zu radikal zu kürzen. 1.200 Kalorien klingen effektiv, führen aber zu Heißhunger, Muskelverlust und einem Plan, den niemand länger als drei Wochen durchhält. Lieber moderat und dafür dauerhaft.",
      },
      {
        h2: "Eiweiß zuerst",
        text: "Von deinen Kalorien sollten 1,6 bis 2 Gramm Eiweiß pro Kilo Körpergewicht kommen. Eiweiß sättigt am stärksten und schützt deine Muskeln im Defizit. Der Rest verteilt sich nach Vorliebe auf Kohlenhydrate und Fette.",
      },
    ],
    relatedSlugs: ["wie-viel-protein-pro-tag", "abnehmen-wie-schnell-realistisch", "was-essen-vor-dem-training"],
  },
  {
    slug: "bauchfett-verlieren-wie",
    category: "abnehmen",
    question: "Wie verliere ich gezielt Bauchfett?",
    shortAnswer:
      "Gezielt an einer Stelle abnehmen ist nicht möglich. Bauchfett verschwindet, wenn du insgesamt Körperfett reduzierst, über ein Kaloriendefizit und Krafttraining. Tausend Crunches bringen den Bauch nicht zum Schmelzen.",
    body: [
      {
        h2: "Der Mythos vom Punktabnehmen",
        text: "Sit-ups verbrennen kein Bauchfett, sie trainieren nur den Muskel darunter. Wo dein Körper zuerst Fett abbaut, entscheidet deine Genetik, nicht die Übung. Der Bauch ist oft die letzte Stelle, die nachgibt, das ist normal und frustrierend zugleich.",
      },
      {
        h2: "Was wirklich hilft",
        text: "Ein Kaloriendefizit, Krafttraining für den ganzen Körper und genug Schlaf. Chronischer Stress und Schlafmangel treiben das Hormon Cortisol hoch, das die Fetteinlagerung am Bauch begünstigt. Erholung ist also kein Luxus, sondern Teil des Plans.",
      },
      {
        h2: "Geduld am Ende",
        text: "Wenn der Rest des Körpers schon definiert ist und der Bauch noch nicht, bist du auf der Zielgeraden. Genau hier geben die meisten auf. Wer durchhält, sieht das Ergebnis. Das ist der Punkt, an dem Begleitung am meisten wert ist.",
      },
    ],
    relatedSlugs: ["warum-nehme-ich-nicht-ab-trotz-sport", "wie-oft-trainieren-zum-abnehmen", "bauchmuskeln-sichtbar-machen"],
  },
  {
    slug: "jojo-effekt-vermeiden",
    category: "abnehmen",
    question: "Wie vermeide ich den Jojo-Effekt?",
    shortAnswer:
      "Vermeide Crash-Diäten und zu aggressive Defizite. Nimm langsam ab, baue mit Krafttraining Muskeln auf und erhöhe nach der Diät die Kalorien schrittweise statt schlagartig. So bleibt das Gewicht unten.",
    body: [
      {
        h2: "Warum das Jojo überhaupt passiert",
        text: "Bei einer Crash-Diät verliert dein Körper Muskeln und fährt den Stoffwechsel runter. Nach der Diät isst du wie vorher, brauchst aber weniger, und das Fett kommt zurück, oft mit Zinsen. Der Fehler steckt nicht in deiner Disziplin, sondern in der Methode.",
      },
      {
        h2: "Muskeln sind dein Schutz",
        text: "Mehr Muskelmasse heißt höherer Grundumsatz. Wer beim Abnehmen Muskeln aufbaut oder zumindest hält, kann nach der Diät mehr essen, ohne zuzunehmen. Deshalb gehört Krafttraining in jede Abnehmphase.",
      },
      {
        h2: "Das Ende der Diät planen",
        text: "Die meisten planen nur den Weg runter, nicht den Weg danach. Erhöhe nach der Diät die Kalorien über mehrere Wochen langsam bis zum neuen Erhaltungsbedarf. Dieser Übergang entscheidet, ob das Ergebnis bleibt.",
      },
    ],
    relatedSlugs: ["abnehmen-wie-schnell-realistisch", "wie-viele-kalorien-zum-abnehmen", "muskelaufbau-und-abnehmen-gleichzeitig"],
  },

  // ─────────────── MUSKELAUFBAU ───────────────
  {
    slug: "wie-lange-bis-man-muskeln-sieht",
    category: "muskelaufbau",
    question: "Wie lange dauert es, bis man Muskeln sieht?",
    shortAnswer:
      "Erste sichtbare Veränderungen kommen meist nach 6 bis 10 Wochen konsequentem Training. Spürbar stärker bist du schon nach 2 bis 3 Wochen. Deutlich sichtbarer Muskelaufbau braucht Monate, kein Wochen-Versprechen ist seriös.",
    body: [
      {
        h2: "Kraft kommt vor Optik",
        text: "In den ersten Wochen wirst du schnell stärker, ohne dass die Muskeln viel größer aussehen. Das ist neuronale Anpassung: Dein Nervensystem lernt, die Muskeln besser anzusteuern. Sichtbares Wachstum folgt erst danach.",
      },
      {
        h2: "Der Anfänger-Vorteil",
        text: "Im ersten Trainingsjahr baust du schneller Muskeln auf als jemals wieder. Dieses Fenster bekommst du nie zurück. Genau deshalb lohnt es sich, von Anfang an sauber zu trainieren statt sich Fehler anzugewöhnen.",
      },
      {
        h2: "Warum Geduld der Hebel ist",
        text: "Wer alle zwei Wochen das Programm wechselt oder nach einem Monat aufgibt, sieht nie Ergebnisse. Muskelaufbau ist ein Spiel über Monate und Jahre. Wer das akzeptiert, gewinnt. Wer Wochen-Wunder sucht, verliert Zeit und Geld.",
      },
    ],
    relatedSlugs: ["wie-viel-protein-pro-tag", "wie-viele-wiederholungen-muskelaufbau", "muskelaufbau-zuhause-ohne-geraete"],
  },
  {
    slug: "wie-viel-protein-pro-tag",
    category: "muskelaufbau",
    question: "Wie viel Protein pro Tag brauche ich für Muskelaufbau?",
    shortAnswer:
      "Für Muskelaufbau brauchst du etwa 1,6 bis 2 Gramm Eiweiß pro Kilo Körpergewicht am Tag. Bei 80 Kilo sind das rund 130 bis 160 Gramm, verteilt auf drei bis vier Mahlzeiten.",
    body: [
      {
        h2: "Die Zahl, die zählt",
        text: "Mehr als 2 Gramm pro Kilo bringt für die meisten keinen zusätzlichen Vorteil. Weniger als 1,6 Gramm lässt Muskelaufbau auf der Strecke. Der Bereich dazwischen ist dein Ziel, jeden Tag, nicht nur an Trainingstagen.",
      },
      {
        h2: "Verteilung über den Tag",
        text: "Dein Körper kann pro Mahlzeit nur eine begrenzte Menge Eiweiß optimal für den Muskelaufbau nutzen. Statt alles auf einmal verteilst du es besser auf drei bis vier Portionen mit je 30 bis 40 Gramm.",
      },
      {
        h2: "Woher das Eiweiß kommt",
        text: "Eier, Hähnchen, Magerquark, Fisch, Linsen, griechischer Joghurt. Ein Shake ist praktisch, aber kein Muss. Wer über echtes Essen genug Eiweiß bekommt, braucht keine Pulver. Die brauchst du nur, wenn du die Menge sonst nicht schaffst.",
      },
    ],
    relatedSlugs: ["wie-lange-bis-man-muskeln-sieht", "wie-viele-kalorien-zum-abnehmen", "brauche-ich-eiweisshakes"],
  },
  {
    slug: "wie-viele-wiederholungen-muskelaufbau",
    category: "muskelaufbau",
    question: "Wie viele Wiederholungen sind ideal für Muskelaufbau?",
    shortAnswer:
      "Für Muskelaufbau funktioniert ein breiter Bereich von 6 bis 15 Wiederholungen pro Satz gut, solange du nahe ans Muskelversagen gehst. Wichtiger als die exakte Zahl ist, dass du über die Wochen mehr Gewicht oder mehr Wiederholungen schaffst.",
    body: [
      {
        h2: "Der Mythos vom magischen Bereich",
        text: "Lange galt 8 bis 12 als der eine Muskelaufbau-Bereich. Die Forschung zeigt heute: Auch 6 oder 15 Wiederholungen bauen Muskeln, wenn die Anstrengung hoch genug ist. Du musst den Satz also wirklich fordernd beenden, nicht locker abbrechen.",
      },
      {
        h2: "Progression ist der echte Schlüssel",
        text: "Egal welcher Bereich: Dein Muskel wächst nur, wenn er diese Woche mehr leisten muss als letzte. Ein Kilo mehr, eine Wiederholung mehr, ein Satz mehr. Wer immer dasselbe Gewicht bewegt, bleibt stehen, egal wie viele Wiederholungen.",
      },
      {
        h2: "Wie viele Sätze",
        text: "Pro Muskelgruppe sind 10 bis 20 harte Sätze pro Woche ein guter Rahmen. Anfänger starten am unteren Ende, Fortgeschrittene brauchen mehr Volumen. Mehr ist nicht automatisch besser, irgendwann kann dein Körper es nicht mehr regenerieren.",
      },
    ],
    relatedSlugs: ["wie-lange-bis-man-muskeln-sieht", "ganzkoerper-oder-split-training", "wie-oft-pro-woche-trainieren"],
  },
  {
    slug: "muskelaufbau-zuhause-ohne-geraete",
    category: "muskelaufbau",
    question: "Kann man zuhause ohne Geräte Muskeln aufbauen?",
    shortAnswer:
      "Ja, am Anfang funktioniert das gut. Liegestütze, Kniebeugen, Klimmzüge und Ausfallschritte bauen mit dem eigenen Körpergewicht Muskeln auf. Irgendwann brauchst du aber mehr Widerstand, um weiter zu wachsen.",
    body: [
      {
        h2: "Wie weit du ohne Geräte kommst",
        text: "Als Anfänger reicht dein Körpergewicht für deutliche Fortschritte. Der Reiz ist neu, der Körper reagiert. Mit Variationen wie einarmigen oder erhöhten Übungen lässt sich die Belastung lange steigern.",
      },
      {
        h2: "Das Problem der Progression",
        text: "Muskelaufbau braucht steigenden Widerstand. Beim eigenen Körpergewicht ist irgendwann eine Grenze erreicht, weil du nicht einfach schwerer wirst. Dann helfen ein paar Kurzhanteln, Widerstandsbänder oder der Gang ins Studio.",
      },
      {
        h2: "Beine sind die Schwachstelle",
        text: "Oberkörper geht zuhause lange gut, aber die Beine sind ohne Zusatzgewicht schwer auszulasten. Kniebeugen mit eigenem Gewicht werden schnell zu leicht. Wer ernsthaft Beine aufbauen will, kommt um Gewichte kaum herum.",
      },
    ],
    relatedSlugs: ["wie-viele-wiederholungen-muskelaufbau", "muskelaufbau-und-abnehmen-gleichzeitig", "personal-trainer-oder-alleine"],
  },
  {
    slug: "muskelaufbau-und-abnehmen-gleichzeitig",
    category: "muskelaufbau",
    question: "Kann man gleichzeitig Muskeln aufbauen und abnehmen?",
    shortAnswer:
      "Ja, vor allem als Anfänger oder nach längerer Pause. Das nennt man Body Recomposition. Es geht langsamer als reines Abnehmen oder reiner Aufbau, funktioniert aber mit hohem Eiweiß, Krafttraining und einem leichten Defizit.",
    body: [
      {
        h2: "Wer es besonders gut kann",
        text: "Anfänger, Wiedereinsteiger und Menschen mit höherem Körperfettanteil bauen oft gleichzeitig Muskeln auf und verlieren Fett. Der Körper hat viel Potenzial nach oben und reichlich Energie aus den Fettreserven.",
      },
      {
        h2: "Die zwei Stellschrauben",
        text: "Hohes Eiweiß, etwa 2 Gramm pro Kilo, und konsequentes Krafttraining. Das Defizit bleibt klein, sonst fehlt die Energie für den Aufbau. Die Waage bewegt sich dabei langsam, der Spiegel und das Maßband zeigen mehr.",
      },
      {
        h2: "Wann du dich entscheiden solltest",
        text: "Wer schon trainiert ist und wenig Körperfett hat, kommt mit Recomposition kaum weiter. Dann ist es effizienter, sich für eine Phase Aufbau oder eine Phase Diät zu entscheiden. Anfänger können beides parallel mitnehmen.",
      },
    ],
    relatedSlugs: ["wie-lange-bis-man-muskeln-sieht", "jojo-effekt-vermeiden", "wie-viel-protein-pro-tag"],
  },
  {
    slug: "bauchmuskeln-sichtbar-machen",
    category: "muskelaufbau",
    question: "Wie bekomme ich ein sichtbares Sixpack?",
    shortAnswer:
      "Ein Sixpack entsteht in der Küche, nicht im Training. Die Bauchmuskeln hat jeder, sie werden erst sichtbar, wenn der Körperfettanteil niedrig genug ist, bei Männern etwa unter 12 Prozent, bei Frauen entsprechend höher.",
    body: [
      {
        h2: "Fett runter, nicht Crunches hoch",
        text: "Du kannst die stärksten Bauchmuskeln der Welt haben, unter einer Fettschicht sieht man sie nicht. Der Weg zum sichtbaren Bauch führt über ein Kaloriendefizit, nicht über tausend Crunches. Bauchtraining formt den Muskel, deckt ihn aber nicht auf.",
      },
      {
        h2: "Training für die Bauchmuskeln",
        text: "Ein- bis zweimal pro Woche gezieltes Bauchtraining reicht, um den Muskel kräftig und dick aufzubauen. Wichtiger ist aber, dass schwere Grundübungen wie Kniebeugen und Kreuzheben den Rumpf ohnehin stark fordern.",
      },
      {
        h2: "Die letzten Prozente sind die härtesten",
        text: "Von 18 auf 12 Prozent Körperfett zu kommen ist machbar. Die letzten Prozente bis zum scharf sichtbaren Sixpack verlangen viel Disziplin bei Ernährung und Geduld. Genau hier scheitern die meisten. Wer das Ziel hat, braucht einen klaren Plan.",
      },
    ],
    relatedSlugs: ["bauchfett-verlieren-wie", "wie-viele-kalorien-zum-abnehmen", "abnehmen-wie-schnell-realistisch"],
  },

  // ─────────────── ERNÄHRUNG ───────────────
  {
    slug: "was-essen-vor-dem-training",
    category: "ernaehrung",
    question: "Was sollte ich vor dem Training essen?",
    shortAnswer:
      "Iss ein bis drei Stunden vorher eine Mahlzeit aus Kohlenhydraten und etwas Eiweiß, zum Beispiel Haferflocken mit Quark oder Reis mit Hähnchen. Direkt vor dem Training reicht eine kleine, leicht verdauliche Portion wie eine Banane.",
    body: [
      {
        h2: "Kohlenhydrate sind dein Treibstoff",
        text: "Für ein kraftvolles Training braucht dein Körper verfügbare Energie, und die kommt aus Kohlenhydraten. Reis, Kartoffeln, Haferflocken oder Obst ein bis drei Stunden vorher geben dir Power, ohne schwer im Magen zu liegen.",
      },
      {
        h2: "Timing nach Verträglichkeit",
        text: "Wer empfindlich ist, isst die größere Mahlzeit lieber zwei bis drei Stunden vorher und nimmt kurz davor nur etwas Kleines. Mit vollem Magen zu trainieren fühlt sich für die meisten unangenehm an.",
      },
      {
        h2: "Nüchtern trainieren",
        text: "Morgens nüchtern trainieren ist möglich und für manche bequem, bringt aber keinen magischen Fettverlust-Vorteil. Entscheidend bleibt die Gesamtbilanz des Tages, nicht ob du vor dem Sport gegessen hast.",
      },
    ],
    relatedSlugs: ["was-essen-nach-dem-training", "wie-viel-protein-pro-tag", "brauche-ich-eiweisshakes"],
  },
  {
    slug: "was-essen-nach-dem-training",
    category: "ernaehrung",
    question: "Was sollte ich nach dem Training essen?",
    shortAnswer:
      "Nach dem Training ist eine Mahlzeit aus Eiweiß und Kohlenhydraten sinnvoll, etwa 20 bis 40 Gramm Eiweiß plus eine Kohlenhydratquelle. Das berüchtigte anabole Fenster ist aber viel größer als früher gedacht, du musst nicht hetzen.",
    body: [
      {
        h2: "Das anabole Fenster ist kein Stress",
        text: "Früher hieß es, man müsse innerhalb von 30 Minuten nach dem Training essen, sonst sei alles umsonst. Das stimmt so nicht. Solange du im Laufe des Tages genug Eiweiß isst, hast du Stunden Zeit, kein Grund zur Panik im Umkleideraum.",
      },
      {
        h2: "Eiweiß plus Kohlenhydrate",
        text: "Eiweiß liefert die Bausteine für die Reparatur, Kohlenhydrate füllen die Energiespeicher wieder auf. Eine klassische Kombination ist Hähnchen mit Reis, Magerquark mit Obst oder ein Shake mit einer Banane.",
      },
      {
        h2: "Was wirklich zählt",
        text: "Die einzelne Mahlzeit nach dem Training ist weniger wichtig als deine Gesamtbilanz über den Tag. Wer auf seine Kalorien und sein Eiweiß achtet, macht hier nichts falsch, egal ob der Snack zehn Minuten oder zwei Stunden später kommt.",
      },
    ],
    relatedSlugs: ["was-essen-vor-dem-training", "wie-viel-protein-pro-tag", "brauche-ich-eiweisshakes"],
  },
  {
    slug: "brauche-ich-eiweisshakes",
    category: "ernaehrung",
    question: "Brauche ich Eiweißshakes für den Muskelaufbau?",
    shortAnswer:
      "Nein, zwingend brauchst du sie nicht. Eiweißshakes sind nur eine praktische Ergänzung, wenn du deinen Eiweißbedarf über normales Essen nicht erreichst. Wer genug Eier, Fleisch, Fisch und Quark isst, kommt ohne aus.",
    body: [
      {
        h2: "Pulver ist Essen, kein Wundermittel",
        text: "Proteinpulver ist nichts anderes als konzentriertes Eiweiß, meist aus Milch. Es hat keine magische Wirkung, die echtes Essen nicht hätte. Der einzige Vorteil ist Praktikabilität: schnell, günstig pro Portion und gut dosierbar.",
      },
      {
        h2: "Wann ein Shake sinnvoll ist",
        text: "Wenn du unterwegs bist, morgens wenig Appetit hast oder deine 150 Gramm Eiweiß sonst nicht zusammenbekommst, ist ein Shake eine einfache Lösung. Als Ersatz für richtige Mahlzeiten taugt er aber nicht dauerhaft.",
      },
      {
        h2: "Spar dir den Rest",
        text: "Die meisten anderen Supplemente sind ihr Geld nicht wert. Mit Abstand am besten belegt sind Eiweiß, Kreatin und für viele Vitamin D. Der Rest im Regal löst vor allem ein Problem: das deines Geldbeutels.",
      },
    ],
    relatedSlugs: ["wie-viel-protein-pro-tag", "was-essen-nach-dem-training", "bringt-kreatin-was"],
  },
  {
    slug: "bringt-kreatin-was",
    category: "ernaehrung",
    question: "Bringt Kreatin wirklich etwas?",
    shortAnswer:
      "Ja, Kreatin ist das am besten erforschte Supplement überhaupt. Es steigert Kraft und Leistung im Training leicht und unterstützt so den Muskelaufbau. 3 bis 5 Gramm täglich, dauerhaft, ohne Kur, reichen aus.",
    body: [
      {
        h2: "Was Kreatin tut",
        text: "Kreatin hilft deinen Muskeln, kurzfristig mehr Energie bereitzustellen. Das heißt: ein bis zwei Wiederholungen mehr, etwas mehr Gewicht über die Zeit. Dieser kleine Vorteil summiert sich über Monate zu messbarem Mehr-Aufbau.",
      },
      {
        h2: "Einfach einnehmen",
        text: "3 bis 5 Gramm Kreatin-Monohydrat pro Tag, jeden Tag, egal ob Trainingstag oder nicht. Eine Ladephase ist nicht nötig. Nimm es, wann es dir am leichtesten fällt, der Zeitpunkt spielt keine Rolle.",
      },
      {
        h2: "Die Wasser-Sache",
        text: "Kreatin zieht etwas Wasser in die Muskelzellen, das ein bis zwei Kilo auf der Waage ausmachen kann. Das ist kein Fett und kein Aufschwemmen, sondern Wasser im Muskel, was den Muskel sogar voller aussehen lässt.",
      },
    ],
    relatedSlugs: ["brauche-ich-eiweisshakes", "wie-viel-protein-pro-tag", "wie-lange-bis-man-muskeln-sieht"],
  },
  {
    slug: "wie-viel-wasser-am-tag",
    category: "ernaehrung",
    question: "Wie viel Wasser sollte ich beim Training trinken?",
    shortAnswer:
      "Als Richtwert gelten 30 bis 40 Milliliter pro Kilo Körpergewicht am Tag, an Trainingstagen etwas mehr. Bei 80 Kilo sind das grob 2,5 bis 3 Liter. Achte besonders rund um intensive Einheiten auf ausreichend Flüssigkeit.",
    body: [
      {
        h2: "Warum Trinken die Leistung beeinflusst",
        text: "Schon ein leichter Flüssigkeitsmangel senkt Kraft und Konzentration spürbar. Wer im Training zu wenig getrunken hat, fühlt sich schlapp und schiebt es oft fälschlich auf mangelnde Energie aus dem Essen.",
      },
      {
        h2: "Über den Tag verteilen",
        text: "Nicht alles auf einmal, sondern gleichmäßig über den Tag trinken. Ein guter Indikator ist die Farbe des Urins: hell heißt gut versorgt, dunkel heißt nachlegen. Kaffee und Tee zählen übrigens mit.",
      },
      {
        h2: "Beim Abnehmen besonders wichtig",
        text: "Wasser sättigt und wird oft mit Hunger verwechselt. Ein Glas vor der Mahlzeit hilft vielen, weniger zu essen. Im Defizit ist das ein einfacher, kostenloser Hebel, den die meisten unterschätzen.",
      },
    ],
    relatedSlugs: ["was-essen-vor-dem-training", "wie-viele-kalorien-zum-abnehmen", "warum-nehme-ich-nicht-ab-trotz-sport"],
  },

  // ─────────────── TRAINING ───────────────
  {
    slug: "wie-oft-pro-woche-trainieren",
    category: "training",
    question: "Wie oft pro Woche sollte ich trainieren?",
    shortAnswer:
      "Für die meisten sind drei bis vier Krafteinheiten pro Woche der ideale Mix aus Reiz und Erholung. Anfänger kommen mit zwei bis drei gut voran, mehr als fünf braucht kaum jemand, der nicht im Wettkampf steht.",
    body: [
      {
        h2: "Mehr ist nicht besser",
        text: "Dein Muskel wächst nicht im Training, sondern in der Erholung danach. Wer jeden Tag dieselbe Muskelgruppe quält, bremst den Fortschritt. Drei bis vier durchdachte Einheiten schlagen sechs planlose.",
      },
      {
        h2: "Was in der Zeit passt",
        text: "Bei zwei bis drei Einheiten ist ein Ganzkörperplan ideal. Ab vier Einheiten lohnt sich ein Split, bei dem du Ober- und Unterkörper oder einzelne Muskelgruppen aufteilst. Die Aufteilung richtet sich nach deiner verfügbaren Zeit.",
      },
      {
        h2: "Konstanz schlägt Intensität",
        text: "Drei Einheiten pro Woche über ein Jahr durchgezogen bringen mehr als sechs Einheiten für zwei Monate, gefolgt vom Ausbrennen. Wähle eine Frequenz, die du dauerhaft hältst, nicht die, die auf dem Papier am besten klingt.",
      },
    ],
    relatedSlugs: ["ganzkoerper-oder-split-training", "wie-viele-wiederholungen-muskelaufbau", "wie-lange-sollte-ein-training-dauern"],
  },
  {
    slug: "ganzkoerper-oder-split-training",
    category: "training",
    question: "Ganzkörper oder Split, was ist besser?",
    shortAnswer:
      "Für Anfänger und alle mit zwei bis drei Trainingstagen ist Ganzkörper meist die bessere Wahl. Ein Split lohnt sich ab vier Einheiten pro Woche. Beides funktioniert, entscheidend ist, dass das Wochenvolumen stimmt.",
    body: [
      {
        h2: "Warum Ganzkörper für Anfänger gewinnt",
        text: "Beim Ganzkörpertraining trainierst du jede Muskelgruppe zwei- bis dreimal pro Woche. Diese hohe Frequenz beschleunigt das Erlernen der Technik und den Aufbau gerade am Anfang. Drei Ganzkörpereinheiten reichen für deutliche Fortschritte.",
      },
      {
        h2: "Wann der Split Sinn macht",
        text: "Wer vier- bis fünfmal pro Woche trainiert, kann mit einem Split jeder Muskelgruppe mehr Volumen geben, ohne dass die Einheiten endlos werden. Typisch sind Ober-Unterkörper-Splits oder Push-Pull-Beine.",
      },
      {
        h2: "Der häufigste Fehler",
        text: "Anfänger kopieren oft die Splits von Profis aus dem Internet und trainieren jede Muskelgruppe nur einmal pro Woche. Für den Einstieg ist das zu wenig Frequenz. Lieber simpel und häufig als kompliziert und selten.",
      },
    ],
    relatedSlugs: ["wie-oft-pro-woche-trainieren", "wie-viele-wiederholungen-muskelaufbau", "welche-uebungen-sind-die-wichtigsten"],
  },
  {
    slug: "welche-uebungen-sind-die-wichtigsten",
    category: "training",
    question: "Welche Übungen sind die wichtigsten?",
    shortAnswer:
      "Die Grundübungen: Kniebeuge, Kreuzheben, Bankdrücken, Rudern, Schulterdrücken und Klimmzüge. Diese sechs trainieren den ganzen Körper effizient und sind die Basis jedes guten Plans, egal ob Aufbau oder Abnehmen.",
    body: [
      {
        h2: "Warum Grundübungen die Basis sind",
        text: "Grundübungen bewegen mehrere Gelenke und viele Muskeln gleichzeitig. Das spart Zeit, setzt einen starken Wachstumsreiz und macht dich im Alltag funktional stärker. Wer sie beherrscht, hat 90 Prozent der Arbeit getan.",
      },
      {
        h2: "Technik vor Gewicht",
        text: "Gerade bei Kniebeuge und Kreuzheben kostet eine schlechte Technik schnell den Rücken. Lieber mit weniger Gewicht sauber lernen, idealerweise mit jemandem, der korrigiert, bevor sich Fehler einschleifen. Das spart Monate und schützt vor Verletzungen.",
      },
      {
        h2: "Isolation als Ergänzung",
        text: "Übungen wie Bizepscurls oder Beinstrecker sind nicht schlecht, aber das Sahnehäubchen, nicht der Kuchen. Sie ergänzen die Grundübungen für einzelne Muskeln, ersetzen sie aber nie. Erst die Basis, dann die Details.",
      },
    ],
    relatedSlugs: ["ganzkoerper-oder-split-training", "wie-viele-wiederholungen-muskelaufbau", "fitnessstudio-anfaenger-tipps"],
  },
  {
    slug: "wie-lange-sollte-ein-training-dauern",
    category: "training",
    question: "Wie lange sollte ein Training dauern?",
    shortAnswer:
      "45 bis 75 Minuten reichen für ein effektives Krafttraining völlig aus. Wer länger braucht, macht meist zu lange Pausen oder zu viele unnötige Übungen. Qualität schlägt Dauer.",
    body: [
      {
        h2: "Länger ist nicht produktiver",
        text: "Nach etwa einer Stunde intensiven Trainings lässt die Konzentration nach und die Qualität der Sätze sinkt. Zwei Stunden im Studio bedeuten selten mehr Fortschritt, oft nur mehr Zeit zwischen Handy und Spiegel.",
      },
      {
        h2: "Pausen richtig nutzen",
        text: "Bei schweren Grundübungen sind zwei bis drei Minuten Pause sinnvoll, bei Isolationsübungen reichen 60 bis 90 Sekunden. Wer das diszipliniert einhält, kommt zügig durch und hält die Einheit kompakt.",
      },
      {
        h2: "Für Vielbeschäftigte",
        text: "Auch in 30 bis 40 Minuten lässt sich ein wirksames Ganzkörpertraining unterbringen, wenn der Plan auf Grundübungen fokussiert ist. Keine Zeit ist selten der echte Grund, meist fehlt die Struktur. Genau die baue ich mit meinen Kunden auf.",
      },
    ],
    relatedSlugs: ["wie-oft-pro-woche-trainieren", "welche-uebungen-sind-die-wichtigsten", "muskelkater-trotzdem-trainieren"],
  },
  {
    slug: "muskelkater-trotzdem-trainieren",
    category: "training",
    question: "Darf ich mit Muskelkater trainieren?",
    shortAnswer:
      "Leichten Muskelkater kannst du bedenkenlos trainieren, oft fühlt sich der Muskel nach dem Aufwärmen sogar besser an. Bei starkem Muskelkater gib der betroffenen Muskelgruppe ein bis zwei Tage mehr Erholung.",
    body: [
      {
        h2: "Was Muskelkater wirklich ist",
        text: "Muskelkater entsteht durch kleine Mikroverletzungen in den Muskelfasern, vor allem nach ungewohnter Belastung. Er ist kein Zeichen für ein besonders gutes Training und auch keine Voraussetzung für Muskelaufbau.",
      },
      {
        h2: "Trainieren oder pausieren",
        text: "Eine andere Muskelgruppe kannst du immer trainieren. Die betroffene auch, wenn der Kater nur leicht ist. Schmerzt es stark und schränkt die Bewegung ein, gönn dem Muskel mehr Zeit, ein erzwungenes Training bringt dann wenig.",
      },
      {
        h2: "Vorbeugen statt leiden",
        text: "Wer regelmäßig und mit langsam steigender Belastung trainiert, hat seltener starken Muskelkater. Aufwärmen, sauberes Tempo und nicht von null auf hundert helfen mehr als jede Wundersalbe danach.",
      },
    ],
    relatedSlugs: ["wie-lange-sollte-ein-training-dauern", "wie-oft-pro-woche-trainieren", "fitnessstudio-anfaenger-tipps"],
  },

  // ─────────────── ANFÄNGER ───────────────
  {
    slug: "fitnessstudio-anfaenger-tipps",
    category: "anfaenger",
    question: "Worauf sollte ich als Anfänger im Fitnessstudio achten?",
    shortAnswer:
      "Konzentrier dich auf wenige Grundübungen, lerne sie sauber, und steigere langsam. Vergleich dich nicht mit anderen, jeder hat mal angefangen. Ein einfacher Plan, den du durchziehst, schlägt jedes komplizierte Programm aus dem Internet.",
    body: [
      {
        h2: "Weniger ist mehr",
        text: "Viele Anfänger springen von Maschine zu Maschine und machen von allem ein bisschen. Besser: fünf bis sechs Grundübungen, sauber gelernt und über Wochen gesteigert. So baust du eine Basis, auf der alles andere aufbaut.",
      },
      {
        h2: "Niemand schaut dich an",
        text: "Die größte Hürde ist im Kopf. Fast jeder im Studio ist mit sich selbst beschäftigt, nicht mit dir. Nach den ersten Wochen bewegst du dich dort, als wärst du immer da gewesen. Lass dich davon nicht abhalten anzufangen.",
      },
      {
        h2: "Technik früh richtig lernen",
        text: "Was du dir am Anfang an Technik angewöhnst, begleitet dich jahrelang. Schlechte Muster bei Kniebeuge oder Kreuzheben kosten später Zeit und manchmal die Gesundheit. Ein paar Einheiten mit Anleitung am Start zahlen sich langfristig aus.",
      },
    ],
    relatedSlugs: ["welche-uebungen-sind-die-wichtigsten", "wie-oft-pro-woche-trainieren", "personal-trainer-oder-alleine"],
  },
  {
    slug: "wie-fange-ich-mit-sport-an",
    category: "anfaenger",
    question: "Wie fange ich nach langer Pause wieder mit Sport an?",
    shortAnswer:
      "Starte bewusst leichter, als du denkst. Zwei Einheiten pro Woche, moderate Gewichte, Fokus auf Technik und Regelmäßigkeit. Der größte Fehler ist, zu schnell zu viel zu wollen und nach zwei Wochen frustriert aufzugeben.",
    body: [
      {
        h2: "Der Kopf will mehr als der Körper kann",
        text: "Nach einer Pause ist die Motivation oft riesig und man will sofort wieder dort anknüpfen, wo man aufgehört hat. Der Körper braucht aber Zeit, sich anzupassen. Wer zu hart startet, riskiert Verletzungen und Überforderung.",
      },
      {
        h2: "Routine vor Intensität",
        text: "In den ersten Wochen geht es nicht um Höchstleistung, sondern darum, das Training wieder zur Gewohnheit zu machen. Feste Tage, feste Zeiten. Sobald die Routine sitzt, kannst du die Intensität schrittweise erhöhen.",
      },
      {
        h2: "Sich Begleitung holen",
        text: "Gerade beim Wiedereinstieg hilft jemand, der einen Plan vorgibt und dranbleibt. Verbindlichkeit ist der unterschätzteste Faktor. Wenn du allein immer wieder aufhörst, liegt es nicht an dir, sondern am fehlenden System. Die Erstberatung ist kostenlos.",
      },
    ],
    relatedSlugs: ["fitnessstudio-anfaenger-tipps", "wie-oft-pro-woche-trainieren", "personal-trainer-oder-alleine"],
  },
  {
    slug: "wie-lange-durchhalten-bis-gewohnheit",
    category: "anfaenger",
    question: "Wie lange dauert es, bis Training zur Gewohnheit wird?",
    shortAnswer:
      "Im Schnitt etwa zwei Monate, bis Training sich automatisch anfühlt, manchmal mehr, manchmal weniger. Die ersten zwei bis drei Wochen sind die härtesten, danach wird es spürbar leichter.",
    body: [
      {
        h2: "Die kritischen ersten Wochen",
        text: "Am Anfang kostet jede Einheit Überwindung, weil noch kein Automatismus existiert und Ergebnisse noch nicht sichtbar sind. Genau hier brechen die meisten ab. Wer diese Phase übersteht, hat das Schwerste hinter sich.",
      },
      {
        h2: "Motivation kommt nach dem Training",
        text: "Viele warten auf den richtigen Moment und die große Motivation. Die kommt aber meist erst nach der Einheit, nicht davor. Der richtige Moment ist ein Dienstagabend, an dem du keine Lust hast und trotzdem gehst.",
      },
      {
        h2: "Auslöser fest verankern",
        text: "Gewohnheiten entstehen über Auslöser: immer dieselbe Zeit, dieselbe Tasche gepackt, derselbe Weg. Je weniger Entscheidungen du jedes Mal treffen musst, desto eher wird Training zum festen Teil deines Lebens.",
      },
    ],
    relatedSlugs: ["wie-fange-ich-mit-sport-an", "fitnessstudio-anfaenger-tipps", "personal-trainer-oder-alleine"],
  },

  // ─────────────── PERSONAL TRAINING ───────────────
  {
    slug: "personal-trainer-oder-alleine",
    category: "personal-training",
    question: "Lohnt sich ein Personal Trainer oder schaffe ich es allein?",
    shortAnswer:
      "Ein Personal Trainer lohnt sich, wenn du allein nicht dranbleibst, deine Technik unsicher ist oder du seit Monaten nicht weiterkommst. Wer diszipliniert ist und weiß, was er tut, kommt auch allein voran.",
    body: [
      {
        h2: "Wofür du wirklich zahlst",
        text: "Du zahlst nicht für jemanden, der mitzählt. Du zahlst für einen Plan, der zu dir passt, für saubere Technik von Anfang an und vor allem für Verbindlichkeit. Wenn jemand wöchentlich draufschaut, bleibst du dran, das ist der größte Hebel.",
      },
      {
        h2: "Wann es sich am meisten lohnt",
        text: "Beim Einstieg, um Fehler zu vermeiden, und beim Plateau, wenn allein nichts mehr geht. In beiden Fällen spart die richtige Anleitung Monate. Auch wer wenig Zeit hat, profitiert: ein effizienter Plan holt aus jeder Stunde das Maximum.",
      },
      {
        h2: "Wann du es allein schaffst",
        text: "Wer schon Erfahrung hat, sauber trainiert und sich selbst gut motiviert, braucht keinen Trainer dauerhaft. Manchmal reicht eine Standortbestimmung oder ein fertiger Plan als Starthilfe. Ehrlich gesagt: nicht jeder braucht 1-zu-1-Betreuung.",
      },
    ],
    relatedSlugs: ["was-kostet-personal-trainer-koeln", "wie-laeuft-online-coaching-ab", "fitnessstudio-anfaenger-tipps"],
  },
  {
    slug: "was-kostet-personal-trainer-koeln",
    category: "personal-training",
    question: "Was kostet ein Personal Trainer in Köln?",
    shortAnswer:
      "In Köln liegt eine Personal-Training-Stunde meist zwischen 50 und 150 Euro. Online Coaching mit Plan, Ernährung und wöchentlichen Check-ins beginnt bei rund 150 Euro im Monat. Die große Spanne erklärt sich vor allem über die Studiomiete.",
    body: [
      {
        h2: "Warum die Preise so weit auseinandergehen",
        text: "Der größte Kostentreiber ist nicht der Trainer, sondern die Miete des Studios. Eine Boutique-Adresse in der Innenstadt schlägt sich im Stundenpreis nieder. Du zahlst dann oft für die Lage, nicht für besseres Coaching.",
      },
      {
        h2: "Stunde oder Paket",
        text: "Zweimal pro Woche eine Stunde für 100 Euro sind 800 Euro im Monat, das halten die wenigsten lange durch. Deshalb fahren viele besser mit einem Hybrid-Modell: Online-Betreuung als Basis plus einzelne Stunden für die Technik.",
      },
      {
        h2: "Mein Angebot in Köln",
        text: "Bei mir kostet die 1-zu-1-Stunde 50 Euro, Online Coaching beginnt bei 150 Euro im Monat, fertige Trainingspläne gibt es ab 25 Euro. Die Erstberatung ist kostenlos und unverbindlich, da schauen wir gemeinsam, was für dich Sinn ergibt.",
      },
    ],
    relatedSlugs: ["personal-trainer-oder-alleine", "wie-laeuft-online-coaching-ab", "online-coaching-oder-vor-ort"],
  },
  {
    slug: "wie-laeuft-online-coaching-ab",
    category: "personal-training",
    question: "Wie läuft Online Coaching ab?",
    shortAnswer:
      "Beim Online Coaching bekommst du einen individuellen Trainings- und Ernährungsplan, schickst wöchentlich deine Fortschritte und Videos deiner Übungen, und bekommst Feedback und Anpassungen. Du trainierst, wo du willst, die Steuerung läuft digital.",
    body: [
      {
        h2: "Der Ablauf",
        text: "Zuerst klären wir Ziel, Erfahrung, Zeitbudget und mögliche Verletzungen. Daraus bauen wir deinen Plan. Du trainierst in deinem Studio oder zuhause, dokumentierst deine Einheiten und schickst bei Bedarf kurze Technikvideos.",
      },
      {
        h2: "Die wöchentlichen Check-ins",
        text: "Einmal pro Woche schauen wir gemeinsam auf deine Zahlen: Gewicht, Maße, Trainingsleistung, wie es dir geht. Auf dieser Basis passe ich den Plan an. Genau diese Regelmäßigkeit ist der Grund, warum Online Coaching funktioniert.",
      },
      {
        h2: "Für wen es passt",
        text: "Online Coaching ist ideal für alle mit vollem Terminkalender oder ohne Studio in der Nähe, und für die, die ihre Technik schon halbwegs beherrschen. Wer ganz am Anfang steht, kombiniert es oft mit ein paar Stunden vor Ort.",
      },
    ],
    relatedSlugs: ["online-coaching-oder-vor-ort", "was-kostet-personal-trainer-koeln", "personal-trainer-oder-alleine"],
  },
  {
    slug: "online-coaching-oder-vor-ort",
    category: "personal-training",
    question: "Online Coaching oder Personal Training vor Ort?",
    shortAnswer:
      "Vor-Ort-Training ist besser, wenn du Technik lernen musst oder den festen Termin als Druck brauchst. Online Coaching ist flexibler und günstiger und passt, wenn du selbstständig trainierst. Für viele ist die Kombination ideal.",
    body: [
      {
        h2: "Drei Fragen zur Entscheidung",
        text: "Kannst du die Übungen technisch sauber? Brauchst du den Termin als Verpflichtung, um überhaupt zu gehen? Wie viel willst du über sechs Monate investieren? Deine Antworten zeigen, welches Modell zu dir passt.",
      },
      {
        h2: "Das Hybrid-Modell",
        text: "Die meisten meiner Kunden kombinieren beides: Online als Basis mit Plan, Ernährung und Check-ins, dazu am Anfang ein paar Stunden vor Ort für die Technik. So bekommst du das Beste aus beidem und bleibst meist unter 250 Euro im Monat.",
      },
      {
        h2: "Rechne in Monaten, nicht Stunden",
        text: "Ergebnisse brauchen Monate. Wer nur in Einzelstunden denkt, verliert den roten Faden. Online-Betreuung begleitet dich an jedem Tag des Monats, nicht nur in der gebuchten Stunde. In der kostenlosen Erstberatung rechnen wir dein Setup konkret durch.",
      },
    ],
    relatedSlugs: ["wie-laeuft-online-coaching-ab", "was-kostet-personal-trainer-koeln", "personal-trainer-oder-alleine"],
  },
];

export function getFaq(slug: string): FaqItem | undefined {
  return fitnessFaqs.find((f) => f.slug === slug);
}

export function faqsByCategory(cat: FaqCategory): FaqItem[] {
  return fitnessFaqs.filter((f) => f.category === cat);
}
