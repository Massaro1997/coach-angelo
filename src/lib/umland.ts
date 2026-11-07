// Pagine comuni del Kölner Umland (Zone confermate da Calogero, PIANO_PRODUZIONE.md sez. 3).
// UNA pagina per comune, URL /personal-trainer-<comune>. Solo fatti veri e verificabili,
// prezzi reali (50€/Std, Online ab 150€/Monat). La trasferta non si promette:
// "Anfahrt klären wir im kostenlosen Erstgespräch". Niente Hyrox, niente promesse inventate.

export interface UmlandOrt {
  slug: string;
  name: string;
  kreis: string;
  metaTitle: string;
  metaDescription: string;
  h1Prefix: string; // parte prima del nome nel H1
  answer: string;
  sections: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  links: { name: string; href: string }[];
}

export const umlandOrte: UmlandOrt[] = [
  {
    slug: "frechen",
    name: "Frechen",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Frechen: 1-zu-1 bei dir vor Ort",
    metaDescription:
      "Personal Training in Frechen mit Angelo Magliarisi: dein Trainer wohnt selbst hier. Training zu Hause, draußen oder im Studio in Köln. 50€/Std, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Frechen ohne Umweg über Köln: ich wohne selbst hier und trainiere dich bei dir zu Hause, draußen oder im Studio in Köln. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Dein Trainer wohnt schon in Frechen",
        body: "Die meisten Personal Trainer für Frechen sitzen in Köln und rechnen die Anfahrt in ihre Preise ein. Bei mir ist es umgekehrt: Frechen ist mein Zuhause, Köln mein Arbeitsweg. Für dich heißt das kurze Wege, verlässliche Termine und Zeitfenster, die anderswo schwierig sind, früh vor der Arbeit oder spät am Abend. Ich bin Angelo Magliarisi, Wettkampfathlet im WABBA International Verband, und trainiere dich auf Deutsch oder Italienisch.",
      },
      {
        title: "Wo wir in Frechen trainieren",
        body: "Das entscheidet dein Ziel. Bei dir zu Hause bringe ich das Material mit, von Widerstandsbändern bis Kurzhanteln, und wir nutzen den Platz, der da ist. Für Laufeinheiten, Intervalle und Zirkel an der frischen Luft liegt der Königsdorfer Forst am Nordrand der Stadt, mit ruhigen, flachen Wegen. Und wer schweres Langhanteltraining will, fährt mit mir ins Studio nach Köln, über die A4 oder mit der Linie 7 kein großer Sprung.",
      },
      {
        title: "Was das Training kostet",
        body: "Die 1-zu-1 Stunde kostet 50€, damit liegst du am unteren Ende dessen, was Personal Training im Kölner Raum kostet. Das Online Coaching mit Trainingsplan per App, Ernährungssteuerung und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich, dort klären wir auch die Anfahrt und den Trainingsort. Danach entscheidest du in Ruhe.",
      },
      {
        title: "Für wen das in Frechen gedacht ist",
        body: "Viele Frechener pendeln jeden Tag nach Köln und haben abends keine Lust, für den Sport noch einmal in die Stadt zu fahren. Genau da setzt das Training vor Ort an. Es passt für Berufstätige mit vollen Wochen, für Eltern, die das Training in den Familienalltag schieben müssen, und für Wiedereinsteiger, die nach Jahren Pause einen sauberen Aufbau wollen statt Trial and Error. Das Angebot gilt im ganzen Stadtgebiet, von Königsdorf über Bachem bis Grefrath.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Frechen?",
        a: "Bei mir kostet die 1-zu-1 Stunde 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos. Die Anfahrt klären wir dort, innerhalb von Frechen sind die Wege für mich kurz.",
      },
      {
        q: "Kommst du zu mir nach Hause?",
        a: "Ja, das ist in Frechen der Normalfall. Ich bringe das Trainingsmaterial mit, du brauchst keine eigenen Geräte. Ein paar Quadratmeter im Wohnzimmer oder Garten reichen für ein vollständiges Training.",
      },
      {
        q: "Trainierst du auch draußen in Frechen?",
        a: "Ja. Für Läufe, Intervalle und Einheiten mit dem eigenen Körpergewicht nutze ich gerne den Königsdorfer Forst am Nordrand von Frechen. Im Sommer verlagern viele Kunden den Großteil des Trainings nach draußen.",
      },
      {
        q: "Was ist, wenn ich lieber an Geräten trainiere?",
        a: "Dann trainieren wir im Studio in Köln. Über die A4 oder mit der Stadtbahn-Linie 7 bist du aus Frechen schnell dort. Viele kombinieren beides: Kraft im Studio, der Rest vor der Haustür.",
      },
      {
        q: "Gilt das Angebot in allen Frechener Stadtteilen?",
        a: "Ja, von Königsdorf über Buschbell und Bachem bis Grefrath und Habbelrath. Sag mir im Erstgespräch, wo du wohnst, dann planen wir Trainingsort und Termine passend dazu.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Leverkusen", href: "/personal-trainer-leverkusen" },
      { name: "Personal Trainer Kerpen", href: "/personal-trainer-kerpen" },
      { name: "Personal Trainer Hürth", href: "/personal-trainer-huerth" },
      { name: "Personal Trainer Pulheim", href: "/personal-trainer-pulheim" },
    ],
  },
  {
    slug: "leverkusen",
    name: "Leverkusen",
    kreis: "kreisfreie Stadt",
    metaTitle: "Personal Trainer Leverkusen: 1-zu-1 vor Ort",
    metaDescription:
      "Personal Training in Leverkusen: 1-zu-1 bei dir zu Hause oder draußen, zum Beispiel im Neulandpark am Rhein. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Leverkusen heißt bei mir: Training bei dir zu Hause oder draußen, zum Beispiel im Neulandpark am Rhein, ohne dass du dafür nach Köln fahren musst. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Leverkusen hat sein eigenes Trainingsrevier",
        body: "Über 160.000 Menschen leben in Leverkusen, und trotzdem fahren viele für gutes Training nach Köln oder Düsseldorf. Nötig ist das nicht. Ich komme für die Einheiten zu dir, nach Wiesdorf, Opladen, Schlebusch oder in jeden anderen Stadtteil, und bringe das Material mit. Trainiert wird dort, wo es in deinen Tag passt: im Wohnzimmer, im Garten oder draußen am Rhein.",
      },
      {
        title: "Neulandpark und Rheinufer statt Laufband",
        body: "Mit dem Neulandpark hat Leverkusen eine der besten Outdoor-Trainingsflächen der Region: die weitläufige Parkanlage am Rhein, entstanden zur Landesgartenschau 2005, mit flachen Wegen direkt am Wasser. Hier laufen wir Intervalle, bauen Zirkel mit dem eigenen Körpergewicht und arbeiten an Technik und Ausdauer. Der Rheinuferweg verlängert jede Einheit, wenn du mehr Strecke willst.",
      },
      {
        title: "Schichtdienst, Pendeln, Familie: der Plan passt sich an",
        body: "Leverkusen ist eine Stadt der Schichten und der Pendler, zwischen Chempark, Köln und Düsseldorf. Ein Trainingsplan, der nur den klassischen Feierabend kennt, hält hier nicht lange. Deshalb lege ich Termine auch in den Vormittag oder den frühen Abend, und in Wochen, in denen gar nichts geht, hält das Online Coaching den Faden: Plan per App, wöchentlicher Check-in, Anpassung statt Ausfall.",
      },
      {
        title: "Preise, Ablauf und der erste Schritt",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan und Ernährungssteuerung beginnt bei 150€ im Monat. Den Ernährungsteil übernimmt Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Der erste Schritt ist immer ein kostenloses Erstgespräch: Ziel, Alltag, Trainingsort, und auch die Anfahrt klären wir dort. Danach entscheidest du, ob es passt.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Leverkusen?",
        a: "Die 1-zu-1 Stunde kostet bei mir 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos, dort klären wir auch die Anfahrt zu dir.",
      },
      {
        q: "Wo trainieren wir in Leverkusen?",
        a: "Bei dir zu Hause mit mitgebrachtem Material oder draußen, zum Beispiel im Neulandpark am Rhein. Wer schweres Langhanteltraining will, kann zusätzlich ins Studio nach Köln kommen.",
      },
      {
        q: "Ich arbeite im Schichtdienst. Funktioniert das Training trotzdem?",
        a: "Ja. Termine lege ich auch in den Vormittag oder Nachmittag, und der Plan wird um deinen Schichtrhythmus gebaut. Für unregelmäßige Wochen gibt es Einheiten, die du allein durchziehst, mit Plan per App.",
      },
      {
        q: "Betreust du alle Leverkusener Stadtteile?",
        a: "Ja, von Wiesdorf und Rheindorf über Opladen bis Schlebusch und Hitdorf. Wo genau wir trainieren und wie die Anfahrt läuft, klären wir im kostenlosen Erstgespräch.",
      },
      {
        q: "Geht auch reines Online Coaching von Leverkusen aus?",
        a: "Ja, komplett. Trainingsplan per App, wöchentliche Video-Check-ins und Ernährungssteuerung funktionieren ortsunabhängig, ab 150€ im Monat. Viele starten online und holen sich später einzelne 1-zu-1 Stunden dazu.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
      { name: "Personal Trainer Bergisch Gladbach", href: "/personal-trainer-bergisch-gladbach" },
      { name: "Personal Trainer Dormagen", href: "/personal-trainer-dormagen" },
    ],
  },
  {
    slug: "bergisch-gladbach",
    name: "Bergisch Gladbach",
    kreis: "Rheinisch-Bergischer Kreis",
    metaTitle: "Personal Trainer Bergisch Gladbach: 1-zu-1 vor Ort",
    metaDescription:
      "Personal Training in Bergisch Gladbach: 1-zu-1 bei dir zu Hause oder draußen im Königsforst und Strundetal. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Du suchst einen Personal Trainer in Bergisch Gladbach? Ich trainiere dich 1-zu-1 bei dir zu Hause, im Garten oder draußen, vom Königsforst bis zum Strundetal. Die Stunde kostet 50€, das Erstgespräch ist kostenlos und unverbindlich.",
    sections: [
      {
        title: "Training dort, wo das Bergische anfängt",
        body: "Bergisch Gladbach ist mit rund 111.000 Einwohnern die größte Stadt des Rheinisch-Bergischen Kreises, und sie hat etwas, das Köln fehlt: Höhenmeter. Die Hügel Richtung Herkenrath und Moitzfeld machen aus jedem Lauf ein ehrliches Ausdauertraining, ohne dass du dir Steigungen künstlich bauen musst. Ich plane deine Einheiten so, dass das Gelände für dich arbeitet: bergauf für Kraftausdauer und Tempo, flach im Tal für Technik und lockere Kilometer.",
      },
      {
        title: "Königsforst, Strundetal, Saaler Mühle",
        body: "Für das Training draußen ist die Auswahl groß. Im Süden liegt der Königsforst mit breiten, ruhigen Waldwegen zwischen Bensberg und Refrath. Durch die Stadt zieht sich das Strundetal mit seinem Wanderweg entlang des Bachs, gut für Läufe mit leichtem Profil. Und an der Saaler Mühle in Bensberg trainieren wir rund um den See, mit Platz für Zirkel und Intervalle. Wenn du lieber drinnen bleibst, komme ich mit dem Material zu dir nach Hause.",
      },
      {
        title: "Für Pendler gebaut",
        body: "Viele aus Bergisch Gladbach arbeiten in Köln und sitzen morgens in der S11 oder auf der A4. Nach dem Arbeitstag noch in ein Kölner Studio zu fahren hält kaum jemand durch, und genau daran scheitern die meisten Trainingspläne. Darum drehe ich es um: das Training findet vor deiner Haustür statt, zu Zeiten, die zu deinem Tag passen, früh bevor du pendelst oder abends, wenn du zurück bist. Den Plan dazwischen hältst du mit kurzen Einheiten, die du allein schaffst.",
      },
      {
        title: "Kosten und erster Schritt",
        body: "Eine 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Trainingsplan per App, wöchentlichen Check-ins und Ernährungssteuerung durch Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, beginnt bei 150€ im Monat. Am Anfang steht ein kostenloses Erstgespräch: wir sprechen über dein Ziel, deinen Alltag und den Trainingsort, und auch die Anfahrt klären wir dort. Du entscheidest danach ohne Druck.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Bergisch Gladbach?",
        a: "Die 1-zu-1 Stunde kostet bei mir 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos, dort klären wir auch die Anfahrt nach Bergisch Gladbach.",
      },
      {
        q: "Wo trainieren wir in Bergisch Gladbach?",
        a: "Bei dir zu Hause mit mitgebrachtem Material oder draußen: im Königsforst, im Strundetal oder an der Saaler Mühle in Bensberg. Was passt, hängt von deinem Ziel und deinem Wohnort ab.",
      },
      {
        q: "Betreust du auch Bensberg, Refrath und Schildgen?",
        a: "Ja, das Angebot gilt im ganzen Stadtgebiet, von Schildgen und Paffrath über Gronau und Hand bis Bensberg, Refrath und Herkenrath. Sag mir im Erstgespräch, wo du wohnst.",
      },
      {
        q: "Ich habe lange keinen Sport gemacht. Ist das ein Problem?",
        a: "Nein, das ist der häufigste Fall. Wir starten mit einer Bestandsaufnahme und bauen die Belastung langsam auf. Du musst für den Einstieg nichts können und nichts besitzen, das Material bringe ich mit.",
      },
      {
        q: "Geht auch Training im Studio?",
        a: "Ja. Wer schweres Langhanteltraining will, kombiniert Einheiten vor Ort mit Terminen im Studio in Köln. Über die A4 oder mit der S11 bist du aus Bergisch Gladbach schnell dort.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Leverkusen", href: "/personal-trainer-leverkusen" },
      { name: "Personal Trainer Troisdorf", href: "/personal-trainer-troisdorf" },
    ],
  },
  {
    slug: "troisdorf",
    name: "Troisdorf",
    kreis: "Rhein-Sieg-Kreis",
    metaTitle: "Personal Trainer Troisdorf: 1-zu-1 bei dir vor Ort",
    metaDescription:
      "Personal Training in Troisdorf: 1-zu-1 zu Hause oder draußen, in der Wahner Heide oder an der Sieg. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Troisdorf, ohne Fahrt nach Köln oder Bonn: ich komme zu dir und wir trainieren zu Hause oder draußen, in der Wahner Heide oder an der Sieg. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Die größte Stadt im Rhein-Sieg-Kreis, ohne eigenes Personal-Training-Angebot? Nicht mehr",
        body: "Rund 75.000 Menschen leben in Troisdorf, zwischen Köln und Bonn, und wer hier individuelles Training sucht, landet schnell bei Studios in einer der beiden Großstädte. Dabei liegt das beste Trainingsgelände direkt vor der Tür. Ich trainiere dich dort, wo dein Alltag stattfindet: in deiner Wohnung, im Garten oder draußen im Grünen, von Spich bis Bergheim, von Sieglar bis Altenrath.",
      },
      {
        title: "Wahner Heide und Siegaue als Trainingsgelände",
        body: "Die Wahner Heide am Westrand von Troisdorf gehört zu den artenreichsten Naturschutzgebieten in Nordrhein-Westfalen, und ihre sandigen Wege sind ein unterschätztes Trainingsgerät: weicher Boden, der Fußgelenke und Hüfte mehr fordert als Asphalt. Am Portal Burg Wissem starten wir direkt hinein. Flacher und schneller läuft es sich in der Siegaue, auf den Wegen am Fluss Richtung Bergheim und zur Siegmündung in den Rhein. Beides zusammen deckt alles ab, von Grundlagenausdauer bis Intervalle.",
      },
      {
        title: "Zwischen zwei Städten, aber mit festem Termin",
        body: "Troisdorf ist Pendlerstadt in beide Richtungen, mit der S-Bahn bist du schnell in Köln oder Bonn. Das Problem ist selten die Motivation, sondern der Kalender: Schichten, Dienstreisen, Familie. Deshalb arbeite ich mit festen, aber verschiebbaren Terminen und einem Plan, der Ausfälle einkalkuliert, statt an ihnen zu zerbrechen. In vollen Wochen übernimmt das Online Coaching: Plan per App, kurzer Check-in, weiter geht es.",
      },
      {
        title: "Was es kostet und wie du startest",
        body: "Die Preise sind dieselben wie in Köln: 50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, inklusive Ernährungssteuerung durch Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Der Einstieg ist immer ein kostenloses, unverbindliches Erstgespräch. Dort klären wir Ziel, Trainingsort und die Anfahrt nach Troisdorf, und du bekommst eine ehrliche Einschätzung, was in welcher Zeit realistisch ist.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Troisdorf?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch kostet nichts, und dort klären wir auch die Anfahrt zu dir nach Troisdorf.",
      },
      {
        q: "Wo trainieren wir in Troisdorf?",
        a: "Bei dir zu Hause, im Garten oder draußen: in der Wahner Heide ab Portal Burg Wissem oder in der Siegaue Richtung Bergheim. Das Material bringe ich mit.",
      },
      {
        q: "Deckst du alle Troisdorfer Stadtteile ab?",
        a: "Ja, von Troisdorf-Mitte über Spich, Sieglar und Oberlar bis Bergheim, Eschmar und Altenrath. Wo wir uns treffen, legen wir im Erstgespräch fest.",
      },
      {
        q: "Ich pendle nach Köln. Kann ich auch dort trainieren?",
        a: "Ja. Viele kombinieren Einheiten in Troisdorf mit Terminen im Studio in Köln, zum Beispiel direkt nach der Arbeit. Der Plan bleibt derselbe, nur der Ort wechselt.",
      },
      {
        q: "Funktioniert das auch nur online?",
        a: "Ja, komplett ortsunabhängig: Trainingsplan per App, wöchentliche Video-Check-ins, Ernährungssteuerung. Ab 150€ im Monat, und du kannst jederzeit einzelne 1-zu-1 Stunden dazunehmen.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Bergisch Gladbach", href: "/personal-trainer-bergisch-gladbach" },
    ],
  },
  {
    slug: "kerpen",
    name: "Kerpen",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Kerpen: 1-zu-1 bei dir vor Ort",
    metaDescription:
      "Personal Training in Kerpen: 1-zu-1 zu Hause oder draußen, an der Erft, am Boisdorfer See oder im Schlosspark Türnich. 50€/Std, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Du suchst einen Personal Trainer in Kerpen? Ich trainiere dich 1-zu-1 bei dir zu Hause oder draußen, an der Erft, am Boisdorfer See oder im Schlosspark Türnich. Die Stunde kostet 50€, das Erstgespräch ist kostenlos und unverbindlich.",
    sections: [
      {
        title: "Die größte Stadt im Rhein-Erft-Kreis trainiert vor der eigenen Haustür",
        body: "Kerpen hat rund 66.000 Einwohner und ist damit die bevölkerungsreichste Stadt des Rhein-Erft-Kreises, verteilt auf Stadtteile, die fast eigene Orte sind: Sindorf, Horrem, Buir, Brüggen, Türnich, Blatzheim. Genau deshalb funktioniert hier kein Training, das an einem festen Studio hängt. Ich komme dorthin, wo du wohnst, mit dem Material im Kofferraum, und wir trainieren in deiner Wohnung, im Garten oder draußen im Grünen. Von Frechen aus, wo ich wohne, bin ich über die A4 schnell in jedem Kerpener Stadtteil.",
      },
      {
        title: "Erftaue, Boisdorfer See, Schlosspark Türnich",
        body: "Fürs Training draußen hat Kerpen mehr zu bieten, als viele denken. Entlang der Erft laufen flache, ruhige Wege durch die Aue, gut für Grundlagenausdauer und Tempoläufe ohne Ampeln. Am Boisdorfer See zwischen Türnich und Balkhausen bauen wir Zirkel am Wasser, und der Schlosspark Türnich gibt Intervallen einen Rahmen, den kein Studio hat. Wer es waldiger mag: das Naturschutzgebiet Kerpener Bruch und Parrig liegt direkt am Stadtrand.",
      },
      {
        title: "Für Pendler zwischen Köln und Aachen gebaut",
        body: "Mit den Bahnhöfen Horrem, Sindorf und Buir sitzt halb Kerpen morgens im Zug Richtung Köln oder Aachen. Abends noch in ein Kölner Studio zu fahren, scheitert nicht am Willen, sondern am Fahrplan. Darum lege ich die Einheiten an deinen Tagesrand: früh, bevor der Zug fährt, oder abends vor deiner Haustür. Der Rest der Woche läuft über kurze Pläne, die du allein schaffst, mit Rückmeldung per App.",
      },
      {
        title: "Was es kostet und wie es anfängt",
        body: "Eine 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App, wöchentlichen Check-ins und Ernährungssteuerung durch Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, beginnt bei 150€ im Monat. Der erste Schritt ist ein kostenloses Erstgespräch über Ziel, Alltag und Trainingsort; auch die Anfahrt nach Kerpen klären wir dort. In der Stadt, in der Michael Schumacher das Fahren gelernt hat, muss niemand beim Training raten: wir messen, was sich bewegt, und steuern nach.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Kerpen?",
        a: "Bei mir 50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos, die Anfahrt klären wir dort — von Frechen aus sind die Wege nach Kerpen kurz.",
      },
      {
        q: "Wo trainieren wir in Kerpen?",
        a: "Bei dir zu Hause mit mitgebrachtem Material oder draußen: an der Erft, am Boisdorfer See oder im Schlosspark Türnich. Was passt, hängt von deinem Ziel und deinem Stadtteil ab.",
      },
      {
        q: "Kommst du auch nach Sindorf, Horrem oder Buir?",
        a: "Ja, das Angebot gilt in allen Kerpener Stadtteilen, von Sindorf und Horrem über Brüggen und Türnich bis Buir und Blatzheim. Sag mir im Erstgespräch, wo du wohnst.",
      },
      {
        q: "Ich pendle nach Köln. Kann ich dort weitertrainieren?",
        a: "Ja. Viele kombinieren Einheiten in Kerpen mit Terminen im Studio in Köln, zum Beispiel nach der Arbeit, bevor es zurück in den Zug geht. Plan und Betreuung bleiben dieselben.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Wo fangen wir an?",
        a: "Mit einer ehrlichen Bestandsaufnahme im Erstgespräch und einem Einstieg, der zu deinem Stand passt. Du brauchst keine Geräte und keine Vorerfahrung, nur regelmäßige Termine.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
      { name: "Personal Trainer Bergheim", href: "/personal-trainer-bergheim" },
    ],
  },
  {
    slug: "dormagen",
    name: "Dormagen",
    kreis: "Rhein-Kreis Neuss",
    metaTitle: "Personal Trainer Dormagen: 1-zu-1 vor Ort",
    metaDescription:
      "Personal Training in Dormagen: 1-zu-1 zu Hause oder draußen, am Rheinufer bei Zons oder im Knechtstedener Wald. 50€/Std, Online Coaching ab 150€/Monat.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Dormagen, ohne Fahrt nach Köln, Neuss oder Düsseldorf: ich komme zu dir, und trainiert wird zu Hause oder draußen, am Rheinufer bei Zons oder im Knechtstedener Wald. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Zwischen Köln und Neuss, aber ohne eigenes Training? Das lässt sich ändern",
        body: "Rund 65.000 Menschen leben in Dormagen, direkt hinter der Kölner Stadtgrenze bei Worringen. Wer hier Personal Training sucht, wird meist in die Großstädte verwiesen, dabei liegt das Trainingsgelände vor Ort. Ich trainiere dich dort, wo dein Tag stattfindet: in deiner Wohnung, im Garten oder draußen, von Rheinfeld und Zons über Nievenheim und Hackenbroich bis Delhoven und Straberg.",
      },
      {
        title: "Rheinufer bei Zons und der Knechtstedener Wald",
        body: "Die mittelalterliche Zollfeste Zons ist das bekannteste Stück Dormagen, und die Rheinwiesen davor sind ein ernstzunehmendes Trainingsgelände: flache Uferwege für Tempoläufe, Platz für Zirkel, Wind als Gratis-Widerstand. Auf der anderen Seite der Stadt liegt der Knechtstedener Wald rund um das romanische Kloster Knechtsteden, mit ruhigen, weichen Wegen für lange Läufe. Dazwischen der Tannenbusch bei Delhoven, wenn du kürzere Runden willst. Drei Reviere, ein Plan.",
      },
      {
        title: "Schichtdienst im Chempark? Der Plan rechnet damit",
        body: "Dormagen ist Chempark-Stadt, und Wechselschicht ist hier Alltag, kein Sonderfall. Ein Trainingsplan, der jede Woche denselben Dienstagabend verlangt, bricht daran. Meiner nicht: Termine wandern mit deinem Schichtrhythmus, auch in den Vormittag, und in Wochen ohne gemeinsames Fenster hält das Online Coaching den Faden, mit Plan per App und kurzem Check-in. Pendler nehmen die S11, die Dormagen direkt mit Köln und Neuss verbindet, und trainieren vor oder nach der Fahrt.",
      },
      {
        title: "Preise und der erste Schritt",
        body: "Es gelten dieselben Preise wie in Köln: 50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, inklusive Ernährungssteuerung durch Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Am Anfang steht ein kostenloses, unverbindliches Erstgespräch: Ziel, Alltag, Trainingsort und die Anfahrt nach Dormagen klären wir dort. Danach entscheidest du in Ruhe, ob es passt.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Dormagen?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch kostet nichts, und dort klären wir auch die Anfahrt zu dir nach Dormagen.",
      },
      {
        q: "Wo trainieren wir in Dormagen?",
        a: "Bei dir zu Hause, im Garten oder draußen: an den Rheinwiesen bei Zons, im Knechtstedener Wald oder im Tannenbusch bei Delhoven. Das Material bringe ich mit.",
      },
      {
        q: "Ich arbeite Wechselschicht im Chempark. Geht das?",
        a: "Ja, das ist in Dormagen eher die Regel als die Ausnahme. Die Termine wandern mit deinem Schichtplan, und für unregelmäßige Wochen gibt es kurze Einheiten, die du allein durchziehst.",
      },
      {
        q: "Deckst du alle Dormagener Stadtteile ab?",
        a: "Ja, von Zons und Stürzelberg am Rhein über Rheinfeld und die Innenstadt bis Nievenheim, Hackenbroich, Delhoven, Straberg und Gohr. Den Treffpunkt legen wir im Erstgespräch fest.",
      },
      {
        q: "Geht auch reines Online Coaching von Dormagen aus?",
        a: "Ja, vollständig: Trainingsplan per App, wöchentliche Video-Check-ins, Ernährungssteuerung, ab 150€ im Monat. Einzelne 1-zu-1 Stunden kannst du jederzeit dazunehmen.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Leverkusen", href: "/personal-trainer-leverkusen" },
      { name: "Personal Trainer Pulheim", href: "/personal-trainer-pulheim" },
    ],
  },
  {
    slug: "huerth",
    name: "Hürth",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Hürth: 1-zu-1 bei dir vor Ort",
    metaDescription:
      "Personal Training in Hürth: 1-zu-1 zu Hause oder draußen, am Otto-Maigler-See oder in den Villewäldern. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Hürth, direkt vor der Kölner Stadtgrenze: ich komme zu dir, und trainiert wird zu Hause, im Garten oder draußen, am Otto-Maigler-See oder in den Villewäldern. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Keine Stadt im Umland liegt näher an Köln",
        body: "Hürth beginnt dort, wo Köln aufhört: aus Efferen bist du mit der Linie 18 schneller an der Uni als mancher Kölner, und genau deshalb trainieren viele Hürther bisher in der Großstadt. Den Weg kannst du dir sparen. Rund 60.000 Menschen leben hier, verteilt auf Stadtteile von Efferen und Hermülheim bis Gleuel und Fischenich, und ich komme mit dem Material dorthin, wo du wohnst. Die Stunde beginnt an deiner Haustür, nicht an einer Studiotheke.",
      },
      {
        title: "Otto-Maigler-See und die Villewälder: zwei Reviere, ein Plan",
        body: "Der Otto-Maigler-See ist das bekannteste Stück Hürther Freizeitgelände, und die Runde um den See ist eine der angenehmsten Laufstrecken im Kölner Südwesten: flach, frei, mit Wasser als Taktgeber. Dahinter steigen die Villewälder an, mit weichen Waldwegen zwischen den Seen der Ville, gut für lange Grundlagenläufe und Einheiten, bei denen der Kopf mittrainiert. Kraft und Technik bauen wir zu Hause oder im Studio in Köln auf, je nachdem, was dein Ziel verlangt.",
      },
      {
        title: "Schichten in Knapsack, Vorlesungen in Köln: Termine, die sich anpassen",
        body: "Hürth hat mit dem Chemiepark Knapsack einen der großen Arbeitgeber der Region, und Wechselschicht ist für viele hier normal. Andere pendeln täglich zur Arbeit oder in die Hörsäle nach Köln. Beides verträgt keinen Plan, der jede Woche denselben Abendtermin verlangt. Meine Termine wandern deshalb mit: früher Vormittag, Tagesrand, auch mal das Wochenende. Und in Wochen ohne gemeinsames Fenster hält das Online Coaching den Faden, mit Plan per App und kurzem Check-in.",
      },
      {
        title: "Was es kostet und wie du anfängst",
        body: "Die Preise sind dieselben wie in Köln: 50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, inklusive Ernährungssteuerung durch Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Am Anfang steht ein kostenloses Erstgespräch über Ziel, Alltag und Trainingsort; auch die Anfahrt nach Hürth klären wir dort, von Frechen aus, wo ich wohne, ist es ein kurzer Weg. Danach entscheidest du ohne Druck.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Hürth?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos, und dort klären wir auch die Anfahrt, die Wege von Frechen nach Hürth sind kurz.",
      },
      {
        q: "Wo trainieren wir in Hürth?",
        a: "Bei dir zu Hause oder im Garten mit mitgebrachtem Material, draußen am Otto-Maigler-See oder in den Villewäldern. Wer schweres Langhanteltraining will, kombiniert das mit Terminen im Studio in Köln.",
      },
      {
        q: "Kommst du in alle Hürther Stadtteile?",
        a: "Ja, von Efferen und Hermülheim über Alt-Hürth, Gleuel und Kendenich bis Fischenich, Berrenrath und Stotzheim. Sag mir im Erstgespräch, wo du wohnst, dann planen wir Ort und Termine dazu.",
      },
      {
        q: "Ich arbeite Schicht im Chemiepark Knapsack. Wie läuft das?",
        a: "Die Termine wandern mit deinem Schichtplan, auch in den Vormittag. Dein Trainingsplan hat bewegliche Tage, und für volle Wochen gibt es kurze Einheiten, die du allein durchziehst, mit Rückmeldung per App.",
      },
      {
        q: "Ich trainiere bisher in Köln. Warum wechseln?",
        a: "Musst du nicht, du kannst kombinieren: Krafttermine im Kölner Studio, der Rest vor deiner Haustür am See oder im Wald. Der Plan bleibt einer, nur der Ort wechselt mit deiner Woche.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
      { name: "Personal Trainer Kerpen", href: "/personal-trainer-kerpen" },
      { name: "Personal Trainer Brühl", href: "/personal-trainer-bruehl" },
    ],
  },
  {
    slug: "pulheim",
    name: "Pulheim",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Pulheim: 1-zu-1 bei dir vor Ort",
    metaDescription:
      "Personal Training in Pulheim: 1-zu-1 zu Hause oder draußen, im Abteipark Brauweiler oder auf den Feldwegen der Börde. 50€/Std, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Du suchst einen Personal Trainer in Pulheim? Ich trainiere dich 1-zu-1 bei dir zu Hause, im Garten oder draußen, vom Abteipark Brauweiler bis zu den Feldwegen der Börde. Die Stunde kostet 50€, das Erstgespräch ist kostenlos und unverbindlich.",
    sections: [
      {
        title: "Zwölf Ortsteile, ein Training, das zu dir kommt",
        body: "Rund 56.000 Menschen leben in Pulheim, aber kaum jemand wohnt „in Pulheim“: man wohnt in Brauweiler, Stommeln, Sinnersdorf, Geyen oder einem der anderen Ortsteile, die eher Dörfer geblieben sind als Vororte. Ein Training, das an einem festen Studio hängt, passt nicht zu dieser Struktur. Meines hängt an deiner Adresse: ich bringe das Material mit, und trainiert wird in deiner Wohnung, im Garten oder draußen vor dem Ort.",
      },
      {
        title: "Abteipark Brauweiler, Börde, Chorbusch",
        body: "Das schönste Trainingsrevier Pulheims liegt an der tausend Jahre alten Abtei Brauweiler: der Park an der romanischen Abteikirche gibt Intervallen und Zirkeln einen Rahmen, den kein Gerätepark hat. Um die Ortsteile herum liegt die Börde mit ihren flachen, geraden Feldwegen, ideal für Tempoläufe, bei denen das Tempo konstant bleibt und vergleichbar wird. Und am Nordrand, hinter Sinnersdorf und Stommelerbusch, beginnt der Chorbusch, wenn du weiche Waldwege für lange Läufe willst.",
      },
      {
        title: "Pendeln nach Köln, trainieren vor der Haustür",
        body: "Von den Bahnhöfen Pulheim und Stommeln fährst du ohne Umstieg nach Köln, und genau so leben hier viele: arbeiten in der Stadt, wohnen im Grünen. Das Training gehört auf die Wohnseite dieses Lebens. Ich lege die Einheiten an deinen Tagesrand, früh bevor der Zug fährt oder abends nach der Rückfahrt, und zwischen den Terminen hält der Plan per App dich auf Kurs, mit kurzen Einheiten, die du allein schaffst.",
      },
      {
        title: "Kosten, Ablauf, erster Schritt",
        body: "Eine 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App, wöchentlichen Check-ins und Ernährungssteuerung durch Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, beginnt bei 150€ im Monat. Der Einstieg ist ein kostenloses, unverbindliches Erstgespräch: Ziel, Woche, Trainingsort, und auch die Anfahrt nach Pulheim klären wir dort. Danach hast du eine ehrliche Einschätzung, was in welcher Zeit realistisch ist.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Pulheim?",
        a: "Die 1-zu-1 Stunde kostet bei mir 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos, dort klären wir auch die Anfahrt zu dir nach Pulheim.",
      },
      {
        q: "Wo trainieren wir in Pulheim?",
        a: "Bei dir zu Hause oder im Garten mit mitgebrachtem Material, draußen im Abteipark Brauweiler, auf den Feldwegen der Börde oder im Chorbusch am Nordrand. Was passt, hängt von Ziel und Ortsteil ab.",
      },
      {
        q: "Kommst du auch nach Stommeln, Sinnersdorf oder Geyen?",
        a: "Ja, das Angebot gilt in allen Pulheimer Ortsteilen, von Brauweiler und Dansweiler über Sinthern und Geyen bis Stommeln, Sinnersdorf und Manstedten. Den Treffpunkt legen wir im Erstgespräch fest.",
      },
      {
        q: "Ich pendle jeden Tag nach Köln. Wann soll ich trainieren?",
        a: "Vor oder nach dem Zug, vor deiner Haustür. Viele legen eine feste Einheit in den frühen Abend und halten den Rest der Woche mit kurzen Plänen per App. Wer mag, nimmt zusätzlich Termine im Kölner Studio.",
      },
      {
        q: "Ich habe lange keinen Sport gemacht. Wo fangen wir an?",
        a: "Mit dem kostenlosen Erstgespräch und einer ehrlichen Bestandsaufnahme. Der Einstieg wird an deinen Stand angepasst, du brauchst weder Geräte noch Vorerfahrung, nur regelmäßige Termine.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
      { name: "Personal Trainer Dormagen", href: "/personal-trainer-dormagen" },
      { name: "Personal Trainer Bergheim", href: "/personal-trainer-bergheim" },
    ],
  },
  {
    slug: "bruehl",
    name: "Brühl",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Brühl: 1-zu-1 zwischen Schloss und Ville",
    metaDescription:
      "Personal Training in Brühl: bei dir zu Hause, im Schlosspark oder an den Ville-Seen. 1-zu-1 Stunde 50€, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Brühl, ohne erst nach Köln oder Bonn zu fahren: ich trainiere dich bei dir zu Hause, im Brühler Schlosspark oder an den Ville-Seen. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Zwischen Schlosspark und Ville-Seen",
        body: "Brühl hat zwei Trainingsreviere, um die es jede Großstadt beneidet. Mitten in der Stadt liegt der Park der Schlösser Augustusburg und Falkenlust, seit 1984 UNESCO-Welterbe: breite Alleen und ebene Wege, auf denen sich Läufe und Zirkel sauber takten lassen. Und westlich beginnen die Villewälder mit den Seen, die aus den alten Braunkohlegruben entstanden sind, allen voran Heider Bergsee und Bleibtreusee. Die Runden dort sind flach, gut zu dosieren und auch im Winter begehbar. Beides erreichst du aus fast jedem Brühler Viertel in wenigen Minuten.",
      },
      {
        title: "Zu Hause, am See oder im Studio",
        body: "Den Trainingsort legen wir nach deinem Ziel fest, nicht umgekehrt. Für das Training zu Hause bringe ich Kurzhanteln, Widerstandsbänder und das übrige Material mit, ein freies Stück Boden genügt. Draußen arbeiten wir im Schlosspark oder an den Seen an Ausdauer, Kraftausdauer und Beweglichkeit. Und wer schwere Grundübungen an der Langhantel will, kombiniert das mit Terminen im Kölner Studio: mit der Linie 18 oder der Bahn ab Brühler Bahnhof bist du schnell dort.",
      },
      {
        title: "Die Preise, klar und ohne Kleingedrucktes",
        body: "Eine 1-zu-1 Stunde kostet 50€, egal ob bei dir zu Hause, draußen oder im Studio. Das Online Coaching mit Trainingsplan per App, Ernährungssteuerung und wöchentlichen Check-ins gibt es ab 150€ im Monat. Gestartet wird immer mit einem kostenlosen Erstgespräch: dort klären wir Ziel, Trainingsort, Termine und auch die Anfahrt. Du entscheidest danach in Ruhe, ohne Abo-Falle.",
      },
      {
        title: "Für wen das in Brühl gedacht ist",
        body: "Viele Brühler pendeln nach Köln oder Bonn und wollen den Sport nicht auch noch hinter einen Bahnhof legen. Andere arbeiten im Schichtbetrieb, etwa in Gastronomie und Freizeitpark im Süden der Stadt, und brauchen Termine, die nicht um 18 Uhr beginnen müssen. Für beide baue ich den Plan um die echte Woche herum. Das Angebot gilt im ganzen Stadtgebiet, von Vochem und Kierberg über Pingsdorf und Heide bis Badorf und Schwadorf.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Brühl?",
        a: "Die 1-zu-1 Stunde kostet bei mir 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich, dort klären wir auch die Anfahrt nach Brühl.",
      },
      {
        q: "Kommst du zu mir nach Hause nach Brühl?",
        a: "Ja. Ich bringe das komplette Trainingsmaterial mit, du brauchst keine Geräte. Wohnzimmer, Garage oder Garten reichen für ein vollständiges Krafttraining.",
      },
      {
        q: "Wo trainieren wir draußen in Brühl?",
        a: "Am liebsten im Schlosspark von Augustusburg oder an den Ville-Seen, etwa am Heider Bergsee oder Bleibtreusee. Flache Wege, klare Runden, wenig Verkehr: ideal für Ausdauer und Zirkeltraining.",
      },
      {
        q: "Kann ich auch an Geräten trainieren?",
        a: "Ja, dann verbinden wir das Training mit Terminen im Studio in Köln. Mit der Linie 18 oder der Bahn ab Brühl ist das gut machbar. Viele kombinieren: Kraft im Studio, der Rest vor Ort.",
      },
      {
        q: "Gilt das Angebot in allen Brühler Stadtteilen?",
        a: "Ja, von Vochem über Kierberg und Pingsdorf bis Badorf, Schwadorf und Heide. Sag mir im Erstgespräch, wo du wohnst, dann planen wir Ort und Termine passend.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Hürth", href: "/personal-trainer-huerth" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
      { name: "Personal Trainer Bergheim", href: "/personal-trainer-bergheim" },
    ],
  },
  {
    slug: "bergheim",
    name: "Bergheim",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Bergheim: Training an der Erft",
    metaDescription:
      "Personal Training in Bergheim: bei dir zu Hause, in der Erftaue oder an der Glessener Höhe. 1-zu-1 Stunde 50€, Online ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in der Kreisstadt des Rhein-Erft-Kreises: ich komme zu dir nach Hause oder wir trainieren draußen, in der Erftaue oder an der Glessener Höhe. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Die Kreisstadt trainiert an der Erft",
        body: "Rund 61.000 Menschen leben in Bergheim, und mitten durch die Stadt fließt die Erft. Für das Training ist das ein Geschenk: die Wege in der Erftaue sind flach, ruhig und führen vom Zentrum mit seinem mittelalterlichen Aachener Tor bis hinaus nach Paffendorf, wo das Wasserschloss im Park steht. Hier laufen wir Grundlagen und Intervalle mit gleichbleibenden Bedingungen, dazwischen kommen Kraftblöcke mit dem eigenen Körpergewicht. Wer mag, hängt die Strecke am Erft-Radweg beliebig weit hinten dran.",
      },
      {
        title: "Ein Berg aus dem Tagebau, direkt vor der Tür",
        body: "Im Osten der Stadt, bei Glessen, liegt die Glessener Höhe: gut 200 Meter hoch, aufgeschüttet aus dem Abraum des Braunkohletagebaus, heute bewaldet und voller Wege mit echter Steigung. Für Bergheimer ist das der nächste richtige Trainingsberg. Bergauf-Intervalle dort ersetzen eine komplette Tempoeinheit und bauen eine Beinkraft auf, die man im Flachen nicht bekommt. Wir nutzen die Höhe gezielt in Blöcken, nicht jede Woche, damit die Belastung planbar bleibt.",
      },
      {
        title: "Termine für Schichtdienst und Pendler",
        body: "Bergheim lebt mit der Energie: das Kraftwerk Niederaußem steht im Stadtgebiet, und viele arbeiten dort oder im Umfeld in Wechselschicht. Ein Trainingsplan, der nur den Feierabend kennt, hält das nicht aus. Deshalb lege ich Einheiten auch in den Vormittag oder frühen Nachmittag und baue den Plan um deinen Schichtrhythmus. Pendler, die mit der Erft-Bahn nach Köln fahren, trainieren vor Ort statt in der Stadt: das spart die zweite Fahrt und macht die Termine verlässlich.",
      },
      {
        title: "Kosten und erster Schritt",
        body: "Die 1-zu-1 Stunde kostet 50€. Wer lieber mit Plan per App, Ernährungssteuerung und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat, das in Bergheim genauso funktioniert wie überall. Am Anfang steht ein kostenloses, unverbindliches Erstgespräch über Ziel, Woche und Trainingsort, dort klären wir auch die Anfahrt. Danach folgt der Technik-Check und die ersten Einheiten zeigen, ob es passt.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Bergheim?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, Erstgespräch kostenlos. Die Anfahrt nach Bergheim besprechen wir im Erstgespräch.",
      },
      {
        q: "Trainierst du bei mir zu Hause in Bergheim?",
        a: "Ja, das ist hier der häufigste Fall. Ich bringe Kurzhanteln, Bänder und das übrige Material mit. Ein paar freie Quadratmeter reichen für ein komplettes Programm.",
      },
      {
        q: "Wo trainieren wir draußen?",
        a: "In der Erftaue für flache Läufe und Zirkel, an der Glessener Höhe für Bergauf-Intervalle und Beinkraft. Beides liegt im Stadtgebiet und ist schnell erreichbar.",
      },
      {
        q: "Ich arbeite im Schichtdienst. Bekommen wir das hin?",
        a: "Ja. Termine lege ich auch in den Vormittag oder Nachmittag, und der Plan rechnet mit wechselnden Wochen. Eine Spätschicht wirft dann nicht gleich den ganzen Monat um.",
      },
      {
        q: "Gilt das Angebot in allen Stadtteilen von Bergheim?",
        a: "Ja, von Quadrath-Ichendorf über Zieverich und Paffendorf bis Niederaußem und Glessen. Im Erstgespräch planen wir Trainingsort und Termine passend zu deinem Wohnort.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Kerpen", href: "/personal-trainer-kerpen" },
      { name: "Personal Trainer Pulheim", href: "/personal-trainer-pulheim" },
      { name: "Personal Trainer Brühl", href: "/personal-trainer-bruehl" },
    ],
  },
];

export function getUmlandOrt(slug: string): UmlandOrt | undefined {
  return umlandOrte.find((o) => o.slug === slug);
}
