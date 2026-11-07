// Testo su misura per singole pagine Stadtteil × Intent (modalità produzione, 06/11/2026).
// Chiave: "<stadtteil-slug>/<intent-key>". Le pagine senza voce restano identiche a prima
// (buildContent in stadtteil-intent.ts). URL, canonical, sitemap e title non cambiano.
// Regole: solo fatti veri e verificabili, prezzi reali (50€/Std, Online ab 150€/Monat),
// risposta diretta in cima, domande vere. Niente Hyrox, niente promesse inventate.

export interface IntentCustom {
  answer: string; // risposta diretta, sostituisce l'intro nel primo schermo
  metaDescription?: string;
  sections: { title: string; body: string }[]; // sostituiscono i paragraphs generati
  faq: { q: string; a: string }[]; // sostituiscono le FAQ generate
}

export const stadtteilIntentCustom: Record<string, IntentCustom> = {
  "merkenich/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Merkenich heißt: Sprints und Tempoläufe auf den flachen Wegen am Rheinufer Nord, Sprungkraft und Stabilität im Studio, dazu die Regattastrecke am Fühlinger See direkt nebenan. Eine Stunde kostet 50€, die Erstberatung ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Merkenich: Sprints am Rheinufer Nord, Tempoläufe an der Regattastrecke am Fühlinger See, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Mehr Platz zum Trainieren als fast überall in Köln",
        body: "Merkenich ist mit 12,15 km² einer der größten Kölner Stadtteile, aber nur 5.878 Menschen leben hier. Das sind rund 480 Einwohner pro Quadratkilometer, ein Bruchteil der Innenstadt. Für Athletiktraining ist das ideal: am Rheinufer Nord laufen wir Sprints über 30 bis 100 Meter, ohne auszuweichen oder abzubremsen. Die Dammwege am Rhein sind flach und gerade, du kannst Tempoläufe sauber durchziehen und ich kann deine Zeiten vergleichen, weil die Bedingungen gleich bleiben.",
      },
      {
        title: "Die Regattastrecke am Fühlinger See liegt vor der Haustür",
        body: "Direkt hinter der Stadtteilgrenze, in Fühlingen, liegt der Fühlinger See mit seiner Regattastrecke. Die Wege dort sind eben und vermessen, ideal für lange Intervalle und Testläufe. Windschutz gibt es am See kaum, und genau das nutzen wir: Tempoarbeit bei Gegenwind baut eine Ausdauerbasis auf, die auf dem Laufband nicht entsteht. Wer in Merkenich wohnt, erreicht eine der besten Trainingsflächen im Kölner Norden in wenigen Minuten.",
      },
      {
        title: "So baue ich dein Athletiktraining auf",
        body: "Wir starten mit einem Technik-Check: Sprint, Sprung, Rumpfstabilität. Danach stehen zwei Einheiten pro Woche, eine draußen für Schnelligkeit und Ausdauer, eine im Studio für Kraft und Sprungkraft. Alle vier bis sechs Wochen messen wir nach. Du siehst schwarz auf weiß, ob sich Sprintzeiten und Sprunghöhe bewegen. Wenn nicht, ändere ich den Plan.",
      },
      {
        title: "Für wen das in Merkenich passt",
        body: "Typische Anfragen aus dem Kölner Norden kommen von Hobbysportlern: Läufer, die schneller werden wollen, Fußballer aus den Vereinen der Umgebung, Leute, die nach Jahren wieder einsteigen. Viele arbeiten im Schichtbetrieb oder im Ford-Entwicklungszentrum in Merkenich. Deshalb lege ich Termine auch in den frühen Morgen oder den frühen Nachmittag, nicht nur auf die klassische Feierabendzeit.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Merkenich?",
        a: "Eine 1-zu-1 Stunde kostet 50€. Wer lieber mit Plan und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Wo genau trainieren wir in Merkenich?",
        a: "Sprints und Tempoläufe am Rheinufer Nord, längere Intervalle an der Regattastrecke am Fühlinger See, Kraft und Sprungkraft im Studio. Den Mix lege ich nach deinem Ziel und der Jahreszeit fest.",
      },
      {
        q: "Brauche ich Wettkampfambitionen für Athletiktraining?",
        a: "Nein. Athletiktraining heißt nur: schneller, stabiler, belastbarer werden. Das hilft im Verein genauso wie beim Joggen oder im Alltag. Das Niveau setzt der Technik-Check am Anfang, nicht ein Wettkampfkalender.",
      },
      {
        q: "Wie oft pro Woche sollte ich trainieren?",
        a: "Zwei geführte Einheiten pro Woche reichen, wenn sie sauber geplant sind. Dazu bekommst du kurze Hausaufgaben für die Tage dazwischen, meist 15 bis 20 Minuten Mobility oder Lauftechnik.",
      },
    ],
  },

  "altstadt-nord/athletiktraining": {
    answer:
      "Athletiktraining mitten in Köln funktioniert ohne Laufband: Sprints am Rheinufer, Treppenläufe am Rheinboulevard gleich über die Hohenzollernbrücke, Mobility in der Grünanlage am Theodor-Heuss-Ring. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in der Kölner Innenstadt: Sprints am Rheinufer, Treppenläufe am Rheinboulevard, Einheiten von Tür zu Tür in 60 Minuten. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Training, das in deinen Innenstadt-Tag passt",
        body: "In Altstadt-Nord leben 18.617 Menschen auf 2,46 km², dazu kommen jeden Tag Zehntausende, die hier arbeiten. Kaum jemand davon hat Zeit für eine lange Anfahrt ins Fitnessstudio. Deshalb plane ich Einheiten hier von Tür zu Tür: 60 Minuten, Start an deinem Büro oder deiner Wohnung, das Warm-up passiert auf dem Weg zum Rhein. Auch eine lange Mittagspause reicht, wenn der Ablauf steht.",
      },
      {
        title: "Treppen, Rampen, Rheinufer: die Stadt ist dein Trainingsgerät",
        body: "Das Rheinufer in Altstadt-Nord ist flach und frei, gut für Sprints und Intervalle. Für Sprungkraft und Schnellkraft nehmen wir die Treppen am Rheinboulevard in Deutz, über die Hohenzollernbrücke bist du in wenigen Minuten dort. Die Grünanlage am Theodor-Heuss-Ring nutze ich für Mobility und Lauftechnik. Die Kraftarbeit mit der Langhantel bleibt im Studio, der Rest findet draußen statt.",
      },
      {
        title: "So sieht eine Einheit aus",
        body: "Zehn Minuten Mobilisation und Lauftechnik, dann der Hauptteil: Sprints, Treppenläufe oder Intervalle, je nach Phase deines Plans. Zum Schluss Rumpfarbeit. Alle vier bis sechs Wochen teste ich Sprintzeit und Sprunghöhe, damit wir nach Zahlen trainieren statt nach Gefühl. Zwei Einheiten pro Woche bringen über drei Monate einen messbaren Unterschied.",
      },
      {
        title: "Wer hier bei mir anfragt",
        body: "Meist Berufstätige aus den Büros rund um Ring, Dom und Hauptbahnhof: viel Sitzen, wenig Zeit, das Ziel ist Belastbarkeit statt reiner Optik. Athletiktraining passt auch, wenn du nebenbei Fußball oder Tennis spielst oder läufst und in deinem Sport stabiler werden willst. Das Einstiegsniveau ist egal: der Technik-Check am Anfang legt fest, womit wir starten.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in der Kölner Innenstadt?",
        a: "50€ pro Stunde im 1-zu-1. Online Coaching mit Plan und Video-Check-ins gibt es ab 150€ im Monat. Die Erstberatung kostet nichts und klärt, welches Format zu dir passt.",
      },
      {
        q: "Geht Athletiktraining in der Mittagspause?",
        a: "Ja, wenn du 60 bis 75 Minuten am Stück hast. Treffpunkt an deinem Büro oder deiner Wohnung, Warm-up auf dem Weg zum Rheinufer, der Hauptteil draußen, danach eine kurze Dusche und zurück.",
      },
      {
        q: "Brauche ich eine Mitgliedschaft im Fitnessstudio?",
        a: "Nein. Für die Outdoor-Einheiten bringe ich das Material mit, die Kraftanteile laufen im Studio im Rahmen deiner Stunde.",
      },
      {
        q: "Ist Athletiktraining auch für Anfänger sinnvoll?",
        a: "Ja. Schnelligkeit und Stabilität lassen sich auf jedem Niveau trainieren, die Übungen werden angepasst. Gerade wer viel am Schreibtisch sitzt, merkt die ersten Wochen deutlich: mehr Körperspannung, besserer Gang, weniger Steifheit im Rücken.",
      },
    ],
  },

  "muelheim/personal-training": {
    answer:
      "Personal Training in Köln-Mülheim läuft bei mir 1-zu-1: zwei feste Termine pro Woche, Krafttraining mit Technik-Korrektur im Studio, Outdoor-Anteile am Rheinufer Mülheim oder im Mülheimer Stadtgarten. Eine Stunde kostet 50€, die Erstberatung ist kostenlos.",
    metaDescription:
      "1-zu-1 Personal Training in Köln-Mülheim: fester Plan, Technik-Korrektur, Outdoor am Rheinufer oder im Mülheimer Stadtgarten. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Personal Training auf der Schäl Sick",
        body: "Mülheim ist mit 43.296 Einwohnern der bevölkerungsreichste Stadtteil Kölns. Viele pendeln jeden Tag über die Mülheimer Brücke oder arbeiten in den Büros rund um den Clevischen Ring. Fürs Training musst du den Rhein nicht überqueren: die Einheiten plane ich rechtsrheinisch, dort wo dein Tag ohnehin stattfindet. Das spart die halbe Stunde Anfahrt, an der die meisten guten Vorsätze scheitern.",
      },
      {
        title: "Wo wir in Mülheim trainieren",
        body: "Das Krafttraining mit Langhantel und Technik-Korrektur läuft im Studio. Für Conditioning und Einheiten an der frischen Luft nutze ich das Rheinufer Mülheim, flach und lang genug für Intervalle, und den Mülheimer Stadtgarten für alles mit dem eigenen Körpergewicht. Im Winter verschiebt sich der Mix nach drinnen, der Plan bleibt derselbe.",
      },
      {
        title: "Zwei Termine pro Woche, ein Plan, messbare Schritte",
        body: "Wir starten mit einer kostenlosen Erstberatung: Ziel, Ausgangslage, Zeitfenster. Danach stehen zwei feste Termine pro Woche. Jede Übung wird sauber aufgebaut, Gewichte und Wiederholungen notiere ich mit, und alle vier Wochen schauen wir auf die Zahlen: Kraftwerte, Gewicht, Umfänge. So siehst du, ob sich etwas bewegt, bevor der Spiegel es zeigt.",
      },
      {
        title: "Ernährung gehört dazu, wenn du willst",
        body: "Beim Abnehmen oder Muskelaufbau entscheidet die Küche mit. Dafür arbeite ich mit Natalie zusammen, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie baut dir einen Wochenplan, der zu deinem Alltag passt, ohne Verbotslisten. Das ist kein Pflichtteil: wer nur trainieren will, trainiert nur.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Mülheim?",
        a: "50€ pro Stunde im 1-zu-1. Wer ortsunabhängig arbeiten will, nimmt das Online Coaching ab 150€ im Monat mit Trainingsplan per App und wöchentlichen Video-Check-ins. Die Erstberatung ist kostenlos.",
      },
      {
        q: "Trainierst du direkt in Mülheim?",
        a: "Ja, die Outdoor-Anteile laufen am Rheinufer Mülheim und im Mülheimer Stadtgarten. Das Krafttraining findet im Studio statt. Wie sich das verteilt, hängt von deinem Ziel ab und steht im Plan.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Ist das ein Problem?",
        a: "Nein, das ist der Normalfall. Wir fangen mit einem Technik-Check an und bauen die Belastung über Wochen auf. Gerade Wiedereinsteiger profitieren vom 1-zu-1, weil Fehler korrigiert werden, bevor sie zu Schmerzen werden.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Kraftwerte bewegen sich in den ersten vier bis sechs Wochen, sichtbare Veränderung braucht rund drei Monate konsequentes Training. Was ich zusage: ein Plan, der zu deinem Alltag passt, und Zahlen, an denen wir den Fortschritt gemeinsam ablesen.",
      },
    ],
  },

  "ehrenfeld/personal-training": {
    answer:
      "Personal Training in Köln-Ehrenfeld heißt bei mir: 1-zu-1 Krafttraining mit Plan und Progression, Outdoor-Einheiten im Inneren Grüngürtel, Termine auch früh morgens und spät abends. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Ehrenfeld: 1-zu-1 mit Plan und Progression, Outdoor im Inneren Grüngürtel, Termine früh und spät. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ehrenfeld ist voll, dein Training braucht trotzdem Platz",
        body: "Mit 38.405 Einwohnern auf 3,71 km² gehört Ehrenfeld zu den am dichtesten besiedelten Stadtteilen Kölns. Das merkst du abends im Fitnessstudio: Wartezeit am Rack, wenig Platz, keine Korrektur. Im 1-zu-1 ist es umgekehrt. Der Termin gehört dir, jede Wiederholung wird gesehen, und der Plan ist auf dich gebaut statt auf den Durchschnitt.",
      },
      {
        title: "Grüngürtel statt Laufband",
        body: "Ehrenfeld grenzt direkt an den Inneren Grüngürtel, eine der besten Trainingsflächen der Stadt: lange gerade Wege für Intervalle, Wiesen für Zirkel mit dem eigenen Körpergewicht. Für kurze Mobility-Einheiten reicht der Grüner Weg Park. Das schwere Krafttraining bleibt im Studio, draußen holen wir Ausdauer und Spannkraft.",
      },
      {
        title: "So läuft der Einstieg",
        body: "Zuerst ein kostenloses Erstgespräch: was du erreichen willst, wie deine Woche aussieht, was bisher nicht funktioniert hat. Dann ein Technik-Check und die ersten zwei Wochen Training. Ab da läuft der Rhythmus: zwei Einheiten pro Woche, Progression bei Gewichten und Wiederholungen, alle vier Wochen ein Blick auf die Zahlen. Wenn Abnehmen dein Ziel ist, holt Natalie die Ernährung dazu, als Ernährungsberaterin für Sport- und Fitnessernährung.",
      },
      {
        title: "Termine, die zu Ehrenfelder Arbeitszeiten passen",
        body: "Zwischen Venloer Straße und Bahnbögen arbeiten viele selbstständig, in Schichten oder in Jobs ohne klassischen Feierabend. Deshalb halte ich in Ehrenfeld auch Slots am frühen Morgen und am späten Abend frei. Ein fester Termin, der wirklich in deine Woche passt, schlägt jeden Motivationstrick.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Ehrenfeld?",
        a: "Die 1-zu-1 Stunde kostet 50€. Online Coaching mit Plan per App startet bei 150€ im Monat. Das Erstgespräch kostet nichts, danach entscheidest du.",
      },
      {
        q: "Wo findet das Training in Ehrenfeld statt?",
        a: "Outdoor im Inneren Grüngürtel oder im Grüner Weg Park, das Krafttraining im Studio. Wie sich das verteilt, hängt von deinem Ziel und der Jahreszeit ab.",
      },
      {
        q: "Gibt es Termine vor der Arbeit?",
        a: "Ja. Früh morgens und spät abends halte ich bewusst Slots frei, weil viele in Ehrenfeld keinen klassischen Feierabend haben. Im Erstgespräch finden wir ein Fenster, das dauerhaft hält.",
      },
      {
        q: "Personal Trainer oder Fitnessstudio: was bringt mehr?",
        a: "Das hängt von dir ab. Wer allein dranbleibt und saubere Technik hat, braucht kein 1-zu-1. Wer seit Monaten dasselbe trainiert, Schmerzen umgeht oder nie länger als vier Wochen durchhält, holt mit einem Trainer mehr heraus, weil Plan und Kontrolle von außen kommen.",
      },
    ],
  },
  "poll/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Poll spielt sich dort ab, wo Platz ist: Antritte und Richtungswechsel auf den Poller Wiesen, Intervalle am Rheinufer Richtung Südbrücke, Kraft und Sprungkraft im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Poll: Antritte auf den Poller Wiesen, Intervalle am Rheinufer bis zur Südbrücke, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Die Poller Wiesen sind dein Stadion",
        body: "Poll liegt direkt am rechten Rheinufer, und die Poller Wiesen gehören zu den größten offenen Flächen der Stadt: weites, flaches Grün am Strom, mit Blick auf Dom und Skyline. Für Athletiktraining heißt das freie Bahn. Wir laufen Steigerungen und Antritte über 30, 50 und 80 Meter, üben Richtungswechsel und Abstoppen auf der Wiese, und niemand verlangt Eintritt oder einen Hallenplan. Bei 11.184 Einwohnern auf 5,17 km² bleibt Poll dabei angenehm ruhig, vor allem morgens.",
      },
      {
        title: "Rundkurse statt Hin und Her",
        body: "Der Uferweg in Poll ist flach und gut messbar, dadurch lassen sich Intervalle sauber wiederholen und Zeiten ehrlich vergleichen. Über den Steg der Südbrücke bist du in wenigen Minuten auf der linken Rheinseite: so entstehen Rundkurse verschiedener Länge, und das Tempotraining fühlt sich nach Strecke an statt nach Pendeln. Für lockere Dauerläufe als Grundlage taugt derselbe Weg Richtung Deutz, wo der Rheinboulevard anschließt.",
      },
      {
        title: "Drei Teile pro Einheit, Zahlen statt Gefühl",
        body: "Jede Einheit in Poll hat drei Teile: Mobilisieren und Anlaufen auf dem Weg zur Wiese, dann der Hauptblock mit Schnelligkeit, Sprüngen oder Intervallen je nach Phase, zum Schluss Rumpfarbeit. Die Kraft- und Sprungkraftarbeit an der Langhantel bleibt im Studio. Getestet wird regelmäßig: Sprintzeit, Sprunghöhe, Kraftwerte. Der Plan folgt den Zahlen, nicht andersherum.",
      },
      {
        title: "Wer in Poll bei mir anfragt",
        body: "Viele Anfragen kommen von Vereinssportlern aus dem rechtsrheinischen Süden, die für Fußball oder Tennis schneller und stabiler werden wollen, und von Läufern, die ohnehin an den Poller Wiesen unterwegs sind. Auch wer in den Büros in Deutz arbeitet, einen Stadtteil weiter nördlich, legt die Einheit oft an den Feierabend auf die Wiese statt in ein volles Studio.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Poll?",
        a: "Die 1-zu-1 Stunde kostet 50€. Wer mit Plan per App und wöchentlichen Check-ins arbeiten will, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch kostet in beiden Fällen nichts.",
      },
      {
        q: "Wo treffen wir uns in Poll?",
        a: "Meist direkt an den Poller Wiesen oder bei dir vor der Haustür, das Warm-up passiert auf dem Weg. Die Kraftanteile laufen im Studio, das Material für draußen bringe ich mit.",
      },
      {
        q: "Kann ich Athletiktraining mit meinem Vereinssport kombinieren?",
        a: "Ja, genau dafür ist es gedacht. Wir legen die Einheiten um deine Spiel- und Trainingstage herum, damit du am Wochenende frisch bist statt platt. In Belastungswochen wird der Plan entschärft.",
      },
      {
        q: "Was passiert bei Regen?",
        a: "Entweder verlegen wir den Schwerpunkt ins Studio oder wir passen die Einheit an, Sprünge und Rumpf gehen auch drinnen. Der Plan rechnet mit Kölner Wetter, ausfallen muss deswegen nichts.",
      },
    ],
  },

  "rath-heumar/athletiktraining": {
    answer:
      "Athletiktraining in Rath/Heumar beginnt am Waldrand: der Königsforst liefert lange, weiche Laufwege für die Ausdauerbasis und mit dem Monte Troodelöh den höchsten Punkt Kölns für Bergauf-Antritte. Kraft und Sprungkraft kommen aus dem Studio. 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln Rath/Heumar: Tempoläufe im Königsforst, Bergauf-Antritte am Monte Troodelöh, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Der Königsforst ist die größte Trainingsfläche im Kölner Osten",
        body: "Rath/Heumar gehört mit 12,91 km² zu den flächengrößten Stadtteilen Kölns, und bei 11.833 Einwohnern ist ein großer Teil davon Wald. Die Forstwege im Königsforst sind lang, gerade und weich: ideal für Tempoläufe und lange Intervalle, weil der Boden die Gelenke weniger belastet als Asphalt. Die KVB-Linie 9 endet an der Haltestelle Königsforst, direkt am Waldrand. Du brauchst kein Auto, um zur besten Strecke des Stadtteils zu kommen.",
      },
      {
        title: "Bergauf-Antritte am höchsten Punkt Kölns",
        body: "Mitten im Königsforst liegt der Monte Troodelöh, mit rund 118 Metern die höchste natürliche Erhebung des Kölner Stadtgebiets. Köln ist flach, und wer Hügel für sein Training sucht, findet sie fast nirgends. Hier schon. Kurze, knackige Antritte bergauf bauen Schnellkraft auf und sind dabei schonender als Flachsprints mit vollem Tempo. Für Vereinssportler ist das einer der wirksamsten Blöcke im ganzen Plan.",
      },
      {
        title: "Waldboden draußen, Langhantel drinnen",
        body: "Die Mischung macht das Athletiktraining: Schnelligkeit und Ausdauer holen wir im Wald, Maximalkraft und Sprungkraft an der Langhantel und am Kasten im Studio. Alle paar Wochen stehen Testtage an, dann vergleichen wir Sprintzeiten, Sprunghöhe und Kraftwerte mit dem Stand davor. Bewegt sich eine Zahl nicht, wird der Plan umgebaut und nicht einfach weitergemacht.",
      },
      {
        title: "Wer hier trainiert",
        body: "Typische Kunden aus Rath/Heumar sind Vereinssportler aus den Klubs rund um Rath, Brück und Ostheim, Läufer, die den Königsforst längst kennen und schneller werden wollen, und Berufstätige, die am Autobahnkreuz Köln-Ost täglich pendeln und das Training deshalb direkt vor die Haustür legen. Das Einstiegsniveau spielt keine Rolle, der Technik-Check am Anfang legt den Startpunkt fest.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Rath/Heumar?",
        a: "50€ pro Stunde im 1-zu-1. Das Online Coaching mit Trainingsplan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat. Die Erstberatung ist kostenlos.",
      },
      {
        q: "Wo genau treffen wir uns für die Waldeinheiten?",
        a: "Meist an der KVB-Endhaltestelle Königsforst oder an einem Waldzugang in deiner Nähe. Von dort sind die Trainingswege in wenigen Minuten erreichbar, das Material bringe ich mit.",
      },
      {
        q: "Ich laufe schon regelmäßig im Königsforst. Was bringt mir Athletiktraining zusätzlich?",
        a: "Tempo und Widerstandsfähigkeit. Reines Kilometersammeln macht ausdauernd, aber nicht schnell. Mit Antritten, Sprüngen und gezielter Kraftarbeit verbesserst du Schrittkraft und Laufökonomie, und das merkst du auch auf deinen gewohnten Runden.",
      },
      {
        q: "Funktioniert das Training auch im Winter?",
        a: "Ja. Die Forstwege sind das ganze Jahr nutzbar, bei Glätte oder Dauerregen wandert der Schwerpunkt ins Studio. Der Plan berücksichtigt die Jahreszeit von Anfang an.",
      },
    ],
  },

  "muelheim/abnehmen": {
    answer:
      "Abnehmen in Köln-Mülheim läuft bei mir ohne Crash-Diät: Krafttraining zweimal pro Woche, ein Kaloriendefizit, das zu deinem Alltag passt, und auf Wunsch Ernährungsberatung mit Natalie. Realistisch sind ein bis zwei Kilo Fett im Monat. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen mit Personal Trainer in Köln-Mülheim: Krafttraining, Kaloriendefizit und Ernährungsplan statt Crash-Diät. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Abnehmen zwischen Wiener Platz und Keupstraße",
        body: "Mülheim ist mit 43.296 Einwohnern der größte Stadtteil Kölns, und gegessen wird hier gut: die Keupstraße gehört zu den bekanntesten Restaurantmeilen der Stadt. Ein Abnehmplan, der Essengehen verbietet, hält in Mülheim keine zwei Wochen. Deshalb baue ich das Defizit andersherum auf: der Abend auf der Keupstraße wird eingeplant statt gebeichtet, und die restliche Woche gleicht ihn aus. So bleibt der Plan alltagstauglich, und nur ein Plan, der bleibt, verändert dein Gewicht.",
      },
      {
        title: "Krafttraining schützt deine Muskeln im Defizit",
        body: "Wer nur weniger isst und dazu Cardio macht, verliert neben Fett auch Muskeln, und genau die halten den Verbrauch hoch. Deshalb steht bei mir Krafttraining im Zentrum: zwei Einheiten pro Woche, Grundübungen mit sauberer Technik, Gewichte, die langsam steigen. Die Waage ist dabei nur eine von mehreren Zahlen. Umfänge, Kraftwerte und Fotos zeigen die Veränderung oft früher und ehrlicher.",
      },
      {
        title: "Dein Alltag verbrennt mehr als dein Trainingstag",
        body: "Zwei Stunden Training pro Woche entscheiden wenig, wenn die restlichen 166 im Sitzen stattfinden. Mülheim macht dir die Alltagsbewegung leicht: der Uferweg am Rhein Richtung Stammheimer Schlosspark ist eine der einfachsten Geh-Strecken der Stadt, flach und ohne eine einzige Ampel. Wer die kurzen Wege im Veedel zu Fuß erledigt und dazu zwei feste Spaziergänge einbaut, hebt seinen Verbrauch spürbar, ohne dafür Trainingszeit zu opfern.",
      },
      {
        title: "Ernährung mit Natalie, wenn du Struktur willst",
        body: "Wenn du beim Essen klare Vorgaben brauchst, übernimmt Natalie diesen Teil. Sie ist Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung und plant deine Woche so, wie du wirklich einkaufst und kochst. Verbotslisten stehen da nicht drin, Zahlen schon: Eiweiß-Zielwert, Portionsgrößen und ein Plan B für Tage, an denen nichts nach Plan läuft. Wer lieber nur trainiert, trainiert nur.",
      },
    ],
    faq: [
      {
        q: "Wie schnell kann ich mit Personal Training abnehmen?",
        a: "Ein bis zwei Kilo Fett im Monat sind realistisch und haltbar. Schnellere Verluste bestehen meist aus Wasser und Muskelmasse, und die holst du dir mit dem Jojo-Effekt doppelt zurück.",
      },
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Köln-Mülheim?",
        a: "Die 1-zu-1 Stunde kostet 50€. Im Online Coaching ab 150€ im Monat ist die Ernährungssteuerung enthalten, dazu wöchentliche Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich aufs Essengehen verzichten?",
        a: "Nein. Ein Restaurantabend pro Woche wird in dein Defizit eingeplant, auch auf der Keupstraße. Verzichtspläne scheitern, kalkulierte Ausnahmen nicht.",
      },
      {
        q: "Brauche ich eine Mitgliedschaft im Fitnessstudio?",
        a: "Nein. Das Krafttraining läuft im Rahmen deiner Stunde im Studio, für die Tage dazwischen bekommst du Einheiten mit dem eigenen Körpergewicht und einen Schritte-Richtwert.",
      },
    ],
  },

  "ensen/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Ensen hat kurze Wege: der Stadtteil ist einer der kleinsten im Bezirk Porz, und das Rheinufer liegt von jeder Ecke nur ein paar Minuten entfernt. Dort laufen wir Intervalle und Antritte, Kraft und Sprungkraft kommen aus dem Studio. 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Ensen: Intervalle und Antritte am Rheinufer zwischen Westhoven und Porz, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Klein, flach, direkt am Rhein",
        body: "Ensen zählt 7.684 Einwohner auf 1,62 km² und ist damit einer der kleinsten Stadtteile im Bezirk Porz. Für dein Training ist das ein Vorteil: egal wo du wohnst, der Uferweg am Rhein ist in wenigen Minuten erreichbar, es gibt keine Anfahrt, die eine Einheit auffrisst. Der Weg selbst ist flach und frei, Richtung Norden läufst du nach Westhoven, Richtung Süden bis ins Porzer Zentrum.",
      },
      {
        title: "Eine Strecke, auf der sich Fortschritt messen lässt",
        body: "Gutes Tempotraining braucht wiederholbare Bedingungen, sonst vergleichst du Äpfel mit Birnen. Der Uferabschnitt zwischen Ensen und Porz liefert genau das: gleicher Belag, kein Gefälle, kaum Querverkehr. Hier laufen wir Intervalle mit festen Abschnitten und Antritte mit fliegendem Start, und die Zeiten von heute lassen sich ehrlich gegen die von vor sechs Wochen halten.",
      },
      {
        title: "Athletik, die in den Feierabend passt",
        body: "Die meisten Anfragen aus Ensen kommen von Berufstätigen, die nach der Arbeit trainieren wollen, ohne noch einmal durch die halbe Stadt zu fahren. Die Stadtbahn hält mitten im Stadtteil, und die Einheit beginnt bei dir vor der Haustür: Mobilisieren auf dem Weg zum Ufer, Hauptblock am Rhein, Rumpf zum Abschluss. Nach 60 Minuten bist du wieder zuhause.",
      },
      {
        title: "Was im Studio dazukommt",
        body: "Schnelligkeit allein reicht nicht, die Basis ist Kraft. Im Studio arbeiten wir an Maximalkraft mit der Langhantel, an Sprungkraft und an der Stabilität von Rumpf und Sprunggelenken, gerade für Vereinssportler der Teil, der Verletzungen vorbeugt. Draußen und drinnen folgen demselben Plan, und bei den Testtagen zählen beide Seiten: Sprintzeit am Ufer, Kraftwerte an der Hantel.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Ensen?",
        a: "Eine 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App gibt es ab 150€ im Monat. Das Erstgespräch kostet nichts und klärt, welches Format passt.",
      },
      {
        q: "Wo findet das Training in Ensen statt?",
        a: "Die Laufeinheiten am Uferweg zwischen Westhoven und Porz, Treffpunkt bei dir vor der Haustür oder direkt am Rhein. Kraft und Sprungkraft trainieren wir im Studio.",
      },
      {
        q: "Ich jogge schon am Rheinufer. Lohnt sich Athletiktraining trotzdem?",
        a: "Ja, denn Joggen macht ausdauernd, aber kaum schneller oder stabiler. Antritte, Sprünge und Kraftarbeit füllen genau diese Lücke, und dein gewohntes Laufen profitiert direkt davon.",
      },
      {
        q: "Wie viele Einheiten pro Woche sind sinnvoll?",
        a: "Zwei geführte Einheiten reichen für messbaren Fortschritt, wenn Belastung und Pausen stimmen. Dazu kommen kurze Hausaufgaben von 15 bis 20 Minuten für die Tage dazwischen.",
      },
    ],
  },

  "lind/personal-training": {
    answer:
      "Personal Training in Köln-Lind: ich komme zu dir nach Hause oder wir trainieren direkt in der Wahner Heide, die am Ortsrand beginnt. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos und unverbindlich.",
    metaDescription:
      "Personal Training in Köln-Lind: 1-zu-1 bei dir zu Hause oder in der Wahner Heide am Ortsrand. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    sections: [
      {
        title: "In Lind kommt das Training zu dir",
        body: "Lind ist mit 3.691 Einwohnern eines der kleinsten Veedel im Bezirk Porz, eher Dorf als Stadt, zwischen Wahn und Libur gelegen. Wer hier wohnt, hat kein Fitnessangebot um die Ecke und fährt für jede Einheit erst einmal los. Genau deshalb drehe ich es um: ich bringe das Training zu dir. Kurzhanteln, Widerstandsbänder und alles Weitere habe ich dabei, ein paar freie Quadratmeter in Wohnzimmer, Garage oder Garten reichen für ein komplettes Programm.",
      },
      {
        title: "Die Wahner Heide beginnt am Ortsrand",
        body: "Östlich von Lind liegt die Wahner Heide, eines der größten Naturschutzgebiete im Kölner Raum. Für das Training ist sie ein Glücksfall: sandige, weiche Wege, die Waden und Fußgelenke stärker fordern als jeder Asphalt, dazu Ruhe, die man im Rest der Stadt lange sucht. Hier laufen wir Grundlagen und Intervalle, dazwischen kommen Blöcke mit dem eigenen Körpergewicht. Im Sommer verlegen viele Kunden fast alles nach draußen.",
      },
      {
        title: "Flughafen-Schichten und Pendler-Kalender",
        body: "Der Flughafen Köln/Bonn liegt gleich hinter der Heide, und viele in Lind und Umgebung arbeiten dort in Schichten. Ein Trainingsplan, der nur den Feierabend um 18 Uhr kennt, scheitert daran in der zweiten Woche. Meine Termine liegen deshalb auch am Vormittag oder frühen Nachmittag, und der Plan rechnet mit wechselnden Wochen: feste Struktur, aber verschiebbare Bausteine, damit eine Spätschicht nicht gleich die ganze Woche kippt.",
      },
      {
        title: "Was es kostet und wie es anfängt",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat. Am Anfang steht ein kostenloses Erstgespräch über dein Ziel, deine Woche und den Trainingsort. Danach folgen Technik-Check und die ersten Einheiten, und du merkst schnell, ob die Zusammenarbeit trägt. Entscheiden kannst du in Ruhe, es gibt keine Vertragsfalle.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Lind?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos. Da ich das Material mitbringe, brauchst du keine eigene Ausrüstung.",
      },
      {
        q: "Wo trainieren wir in Lind?",
        a: "Meistens bei dir zu Hause oder im Garten, für Ausdauer und Intervalle in der Wahner Heide am Ortsrand. Wer schweres Langhanteltraining will, kombiniert das mit Terminen im Studio.",
      },
      {
        q: "Ich arbeite am Flughafen im Schichtdienst. Geht das?",
        a: "Ja, das ist in Lind eher die Regel als die Ausnahme. Termine lege ich auch in den Vormittag oder Nachmittag, und der Plan wird um deinen Schichtrhythmus gebaut.",
      },
      {
        q: "Reicht mein Wohnzimmer wirklich für ein Training?",
        a: "Ja. Mit Körpergewicht, Bändern und Kurzhanteln deckst du Kraft, Ausdauer und Beweglichkeit ab. Entscheidend ist der Plan und die saubere Ausführung, nicht die Geräteauswahl.",
      },
    ],
  },

  "dellbrueck/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Dellbrück nutzt, was der Stadtteil wirklich hat: die offenen Sandflächen der Dellbrücker Heide für Sprints und Sprünge, die Waldwege am Thielenbruch für Tempoläufe, das Studio für Kraft. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Dellbrück: Sprints auf dem Sand der Dellbrücker Heide, Tempoläufe am Thielenbruch, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Die Dellbrücker Heide ist ein Trainingsgerät",
        body: "Wo früher ein Truppenübungsplatz lag, liegt heute eines der ungewöhnlichsten Trainingsgelände Kölns: die Dellbrücker Heide, offene Sandheide mitten im Stadtteil. Sandboden ist für Athletiktraining Gold wert. Er bremst jeden Antritt, zwingt Waden und Hüftstrecker zu mehr Arbeit und macht Sprünge gelenkschonender, weil die Landung weich ist. Sprints, die auf Asphalt leicht aussehen, werden hier ehrlich. Wer auf Sand schneller wird, merkt das auf festem Boden sofort.",
      },
      {
        title: "Thielenbruch und Königsforst für die Ausdauerbasis",
        body: "Am östlichen Rand von Dellbrück beginnt der Thielenbruch, und dahinter zieht sich der Wald weiter Richtung Königsforst. Auf diesen Wegen laufen wir die ruhigen Kilometer, die das Fundament für jede Schnelligkeit sind: Grundlagenausdauer, Technikläufe, lockere Intervalle. Mit 9,95 km² ist Dellbrück groß genug, dass du für keine Einheit den Stadtteil verlassen musst. Die Linien 3 und 18 enden direkt am Thielenbruch, falls du nicht vor der Haustür startest.",
      },
      {
        title: "Messen statt vermuten",
        body: "Athletiktraining heißt bei mir: am Anfang ein Technik-Check mit Sprint, Sprung und Rumpfstabilität, danach zwei geführte Einheiten pro Woche, eine draußen, eine im Studio für Kraft und Sprungkraft. Alle vier bis sechs Wochen wird nachgemessen, auf denselben Strecken und mit denselben Tests. Bewegen sich Sprintzeit und Sprunghöhe nicht, ändere ich den Plan und nicht die Ausrede.",
      },
      {
        title: "Für wen das in Dellbrück gedacht ist",
        body: "Fast 22.000 Menschen wohnen in Dellbrück, viele davon in Vereinen zwischen Fußballplatz und Laufgruppe. Typische Anfragen: Fußballer, die im Antritt verlieren, Läuferinnen, die trotz Kilometern nicht schneller werden, Wiedereinsteiger, die belastbar werden wollen, bevor sie wieder ins Mannschaftstraining gehen. Das Niveau setzt der Eingangstest, nicht dein Alter und nicht dein Verein.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Dellbrück?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching mit Plan und Check-ins ab 150€ im Monat. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Wo trainieren wir in Dellbrück genau?",
        a: "Schnelligkeit und Sprünge auf den Sandflächen der Dellbrücker Heide, Ausdauer auf den Waldwegen am Thielenbruch, Kraft im Studio. Den Mix bestimmt dein Ziel und die Jahreszeit.",
      },
      {
        q: "Ist Training auf Sand nicht gefährlich für die Gelenke?",
        a: "Im Gegenteil: der weiche Boden dämpft Landungen und reduziert Stoßbelastung. Anstrengender ist er trotzdem, weil jeder Abdruck mehr Muskelarbeit kostet. Genau deshalb wirkt er so gut.",
      },
      {
        q: "Ich spiele im Verein. Ersetzt das Athletiktraining mein Mannschaftstraining?",
        a: "Nein, es ergänzt es. Wir arbeiten an dem, was im Vereinstraining zu kurz kommt: Antritt, Sprungkraft, Stabilität, Lauftechnik. Die Einheiten lege ich so, dass sie sich mit deinen Trainingstagen vertragen.",
      },
    ],
  },

  "suerth/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Sürth heißt: Natalie, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, baut dir einen Wochenplan, der in deinen Familien- und Pendleralltag passt, ohne Verbotslisten. Im Online Coaching ab 150€ im Monat ist sie enthalten, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Sürth mit Natalie: Makros, Wochenplan und Einkaufsliste für Familien- und Pendleralltag, abgestimmt aufs Training. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Warum in Sürth meist das Essen entscheidet, nicht das Training",
        body: "Die meisten Anfragen aus dem Kölner Süden klingen ähnlich: das Training läuft irgendwie, aber auf der Waage und im Spiegel passiert nichts. Fast immer liegt die Antwort in der Küche. Genau dafür ist Natalie da, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie rechnet keinen Modeplan herunter, sondern schaut sich an, was du isst, wann dein Tag Lücken lässt und was deine Familie überhaupt mitisst, und baut daraus einen Plan, der hält.",
      },
      {
        title: "Ein Plan, den auch der Familientisch übersteht",
        body: "Sürth ist ein Veedel mit vielen Familien, und das häufigste Scheitern von Ernährungsplänen ist das zweite Kochen: ein Essen für dich, eins für den Rest des Tisches. Das hält niemand sechs Wochen durch. Natalies Pläne gehen andersherum: ein Gericht für alle, deine Portion und deine Eiweißquelle angepasst. Dazu eine Einkaufsliste für die Woche, damit die Entscheidung am Abend nicht mehr im Kühlschrank fällt.",
      },
      {
        title: "Makros statt Verbote, Zahlen statt Gefühl",
        body: "Am Anfang stehen dein Kalorienziel und die Verteilung von Eiweiß, Kohlenhydraten und Fett, abgestimmt auf dein Training und dein Ziel, egal ob Abnehmen oder Muskelaufbau. Danach wird gemessen: Gewicht im Wochenschnitt, Umfänge, Fotos, wenn du magst. Alle paar Wochen schaut Natalie auf die Zahlen und stellt nach. Kein Lebensmittel ist verboten, auch nicht das Eis am Sürther Rheinufer; es ist nur eingeplant statt verdrängt.",
      },
      {
        title: "Wie Beratung und Training zusammenspielen",
        body: "Die Ernährungsberatung ist bei FitPrimo Teil des Online Coachings ab 150€ im Monat: Trainingsplan per App von mir, Ernährungssteuerung von Natalie, wöchentliche Check-ins. Wer in Sürth zusätzlich 1-zu-1 trainieren will, nimmt Stunden zu 50€ dazu, zu Hause oder draußen am Rhein. Der Einstieg ist in jedem Fall ein kostenloses Erstgespräch, bei dem du beide Seiten kennenlernst: Plan und Mensch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Sürth?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch mit uns kostet nichts.",
      },
      {
        q: "Wer macht die Ernährungsberatung bei FitPrimo?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie betreut die Ernährungsseite aller Coachings, während ich das Training übernehme.",
      },
      {
        q: "Muss ich dafür irgendwo hinfahren?",
        a: "Nein. Die Beratung läuft online, mit Video-Check-ins und Plan per App. Das passt zum Sürther Alltag zwischen Familie und Pendeln mit der Linie 16 besser als ein fester Praxistermin.",
      },
      {
        q: "Ich will abnehmen, aber nicht für die Familie extra kochen. Geht das?",
        a: "Ja, das ist der Normalfall, mit dem Natalie arbeitet: ein Gericht für alle, deine Portion angepasst. Verbote gibt es nicht, nur ein Kalorien- und Eiweißziel, das zu deinem Training passt.",
      },
      {
        q: "Behandelt ihr auch Unverträglichkeiten oder Krankheiten?",
        a: "Nein. Natalies Schwerpunkt ist Sport- und Fitnessernährung für gesunde Erwachsene. Bei medizinischen Themen gehört die Ernährung in ärztliche Hände, und das sagen wir dir im Erstgespräch auch offen.",
      },
    ],
  },

  "eil/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Eil hat das größte Gelände der Stadt direkt vor der Tür: die Wahner Heide mit ihren Sandwegen für Antritt und Ausdauer, dazu Kraft und Sprungkraft im Studio. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Eil: Antritt und Ausdauer auf den Sandwegen der Wahner Heide, Kraft im Studio, Termine auch für Flughafen-Schichten. 50€/Std.",
    sections: [
      {
        title: "16 Quadratkilometer, und fast alles davon ist Trainingsgelände",
        body: "Eil ist mit 16,25 km² einer der flächengrößten Stadtteile Kölns, hat aber nur 9.336 Einwohner, weil ein Großteil der Fläche zur Wahner Heide gehört. Für Athletiktraining ist das ein seltener Luxus: du startest die Einheit an der Haustür und bist nach wenigen Minuten auf Wegen, auf denen dir niemand ausweichen muss. Keine Anfahrt, keine Wartezeit an Geräten, nur Strecke und Plan.",
      },
      {
        title: "Was der Heideboden mit deinem Antritt macht",
        body: "Die Wege in der Heide sind sandig und uneben, und genau das unterscheidet sie vom Tartan oder Asphalt: jeder Schritt verlangt Stabilisation in Fuß, Knie und Hüfte. Wir nutzen das gezielt, mit kurzen Antritten bergan auf festen Abschnitten, Läufen auf wechselndem Untergrund für die Fußgelenke und Intervallen, bei denen der Boden die Intensität mitbestimmt. Die Sprung- und Maximalkraft bauen wir parallel im Studio auf, mit Hantel und Messlatte statt Zufall.",
      },
      {
        title: "Termine, die mit dem Flughafen leben können",
        body: "Der Flughafen Köln/Bonn liegt direkt hinter der Heide, und viele in Eil, Grengel und Urbach arbeiten dort, in Schichten, die sich wöchentlich drehen. Mein Kalender ist darauf eingestellt: Einheiten auch am Vormittag oder frühen Nachmittag, ein Plan mit verschiebbaren Bausteinen und kurze Programme für die Tage, an denen keine gemeinsame Einheit passt. So überlebt das Training auch einen Monat Frühschicht.",
      },
      {
        title: "So läuft der Einstieg",
        body: "Erst das kostenlose Erstgespräch über Ziel und Woche, dann der Technik-Check: Sprint, Sprung, Rumpf. Daraus entsteht der Plan, meist zwei geführte Einheiten pro Woche, eine in der Heide, eine im Studio. Nach vier bis sechs Wochen stehen die ersten Vergleichswerte, und ab da zählt nur noch eine Frage: werden die Zahlen besser? Die Stunde kostet 50€, Online-Begleitung gibt es ab 150€ im Monat.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Eil?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching ab 150€ im Monat. Für das Erstgespräch zahlst du nichts.",
      },
      {
        q: "Wo in Eil trainieren wir?",
        a: "Schnelligkeit und Ausdauer auf den Wegen der Wahner Heide, die direkt am Stadtteil beginnt; Kraft und Sprungkraft im Studio. Treffpunkt und Mix legen wir nach deinem Wohnort und Ziel fest.",
      },
      {
        q: "Ich arbeite am Flughafen in Wechselschicht. Wie planen wir das?",
        a: "Wir legen die Termine um deinen Schichtplan, auch vormittags. Der Trainingsplan hat feste Bausteine, aber bewegliche Tage, und für volle Wochen gibt es kurze Einheiten für dich allein.",
      },
      {
        q: "Brauche ich einen Verein oder Wettkampfziele für Athletiktraining?",
        a: "Nein. Schneller, stabiler und belastbarer zu werden lohnt sich auch ohne Startnummer. Der Eingangstest setzt dein Niveau, der Plan holt dich genau dort ab.",
      },
    ],
  },

  "langel/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Langel nutzt den ruhigsten Rheinabschnitt der Stadt: flache Uferwege für Tempoläufe und Intervalle, Wiesen für Sprünge und Zirkel, Kraft im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Langel: Tempoläufe auf flachen Rheinuferwegen, Sprünge auf der Wiese, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Der südlichste Rheinkilometer Kölns gehört dir fast allein",
        body: "Langel ist der südlichste rechtsrheinische Stadtteil Kölns, 3.588 Einwohner auf 5,33 km², dahinter beginnt der Rhein-Sieg-Kreis. Was nach Randlage klingt, ist für Athletiktraining ein Vorteil: die Uferwege am Langeler Rheinbogen sind flach, gerade und so leer, dass Tempoläufe ohne Slalom funktionieren. Gleiche Strecke, gleiche Bedingungen, vergleichbare Zeiten, so sieht man Fortschritt statt ihn zu vermuten.",
      },
      {
        title: "Uferweg, Wiese, Studio: drei Bausteine, ein Plan",
        body: "Auf dem Uferweg Richtung Zündorf und zur Groov laufen wir Intervalle und die ruhigen Grundlagenkilometer. Auf den Wiesen am Ortsrand stehen Sprungserien, Zirkel mit dem eigenen Körpergewicht und Rumpfarbeit auf weichem Boden. Und für Maximalkraft und Sprungkraft geht es ins Studio, denn die Basis für Schnelligkeit wird an der Hantel gelegt. Welche Mischung du brauchst, entscheidet der Technik-Check am Anfang, nicht ein Standardprogramm.",
      },
      {
        title: "Dörflich wohnen, strukturiert trainieren",
        body: "Wer in Langel wohnt, hat sich bewusst gegen die dichte Stadt entschieden, und meist gegen kurze Wege zu Studios. Deshalb komme ich hierher, mit Material im Kofferraum, und der Plan steht trotzdem auf Zahlen: Eingangstest, zwei Einheiten pro Woche, Nachmessen alle vier bis sechs Wochen. Zwischen den Terminen bekommst du kurze Programme von 15 bis 20 Minuten, die auf der Wiese hinterm Haus funktionieren.",
      },
      {
        title: "Für Vereinssportler und Wiedereinsteiger im Kölner Südosten",
        body: "Typische Kunden hier: Fußballer und Läuferinnen aus Zündorf, Wahn und Niederkassel, die an Antritt und Stabilität arbeiten wollen, und Wiedereinsteiger, die nach Jahren Pause erst belastbar werden müssen, bevor sie wieder Vollgas geben. Beides ist Athletiktraining, nur mit anderem Einstiegspunkt. Die Stunde kostet 50€, begleitetes Online-Training gibt es ab 150€ im Monat, und am Anfang steht immer das kostenlose Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Langel?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Wo genau trainieren wir in Langel?",
        a: "Tempoläufe und Intervalle auf den Rheinuferwegen Richtung Zündorf, Sprünge und Zirkel auf den Wiesen am Ortsrand, Kraft im Studio. Das Material für draußen bringe ich mit.",
      },
      {
        q: "Lohnt sich ein Athletiktrainer, wenn ich nur Hobbyläufer bin?",
        a: "Gerade dann: die meisten Hobbyläufer stagnieren, weil Kraft, Sprungkraft und Lauftechnik fehlen, nicht Kilometer. Genau diese Lücken schließt das Athletiktraining.",
      },
      {
        q: "Kommst du wirklich bis nach Langel raus?",
        a: "Ja. Langel gehört wie der ganze Bezirk Porz zu meinem Einzugsgebiet, und auch im angrenzenden Niederkassel trainiere ich. Treffpunkt und Anfahrt klären wir im Erstgespräch.",
      },
    ],
  },

  "suerth/personal-training": {
    answer:
      "Personal Training in Köln-Sürth: 1-zu-1 bei dir zu Hause oder draußen am Sürther Rheinufer, mit Plan, Progression und festen Terminen. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Sürth: 1-zu-1 zu Hause oder am Sürther Rheinufer, Termine die halten. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    sections: [
      {
        title: "Sürth trainiert am Wasser",
        body: "Das Rheinufer ist der größte Trainingsvorteil von Sürth: flache, lange Wege direkt am Wasser, die sich Richtung Weiß und Rodenkirchen fast beliebig verlängern lassen. Hier legen wir die Ausdauerbasis, laufen Intervalle und bauen Zirkel mit dem eigenen Körpergewicht. Die Strecke ist eben und gut messbar, deshalb siehst du deinen Fortschritt schwarz auf weiß, gleiche Strecke, bessere Zeit, niedrigerer Puls.",
      },
      {
        title: "Elftausend Nachbarn, ein Termin nur für dich",
        body: "Sürth ist mit 11.033 Einwohnern auf 3,42 km² ein gewachsenes Veedel im Kölner Süden, mit altem Ortskern und vielen Familien. Die häufigste Hürde hier ist nicht die Motivation, sondern der Familienkalender. Darum findet das Training dort statt, wo es sich einfügt: bei dir zu Hause, wenn die Kinder schlafen oder in der Schule sind, oder draußen am Rhein. Das Material bringe ich mit, aufgebaut ist in zwei Minuten.",
      },
      {
        title: "Mit der Linie 16 verbunden, aber ohne Fahrtzeit trainieren",
        body: "Viele Sürther pendeln mit der Stadtbahn-Linie 16 in die Innenstadt oder Richtung Bonn. Nach dem Arbeitstag plus Rückfahrt noch ein Studio anzusteuern, kostet die Stunde, die eigentlich dem Training gehören sollte. Das 1-zu-1 vor Ort spart genau diese Stunde. Und wer gezielt an Geräten arbeiten will, nimmt einzelne Studio-Termine dazu, der Plan verbindet beides ohne Bruch.",
      },
      {
        title: "Preise, Ablauf, erster Schritt",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App und Ernährungssteuerung beginnt bei 150€ im Monat. Den Ernährungsteil betreut Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Los geht es mit einem kostenlosen Erstgespräch: Ziel, Alltag, Trainingsort. Danach Technik-Check, die ersten zwei Wochen, und alle vier Wochen ein ehrlicher Blick auf die Zahlen.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Sürth?",
        a: "Die 1-zu-1 Stunde kostet 50€, Online Coaching gibt es ab 150€ im Monat. Das Erstgespräch kostet nichts und verpflichtet zu nichts.",
      },
      {
        q: "Wo findet das Training in Sürth statt?",
        a: "Bei dir zu Hause mit mitgebrachtem Material oder draußen am Sürther Rheinufer, mit Strecken Richtung Weiß und Rodenkirchen. Studio-Termine lassen sich dazunehmen.",
      },
      {
        q: "Ich habe kleine Kinder und wenig Zeit. Funktioniert das trotzdem?",
        a: "Ja, das ist in Sürth der Normalfall. Einheiten von 45 bis 60 Minuten bei dir zu Hause, Termine um den Familienkalender gelegt, und ein Plan, der auch mal eine ausgefallene Woche verkraftet.",
      },
      {
        q: "Krafttraining ohne Geräte, geht das überhaupt?",
        a: "Für den Einstieg und weit darüber hinaus ja: Körpergewicht, Bänder und Kurzhanteln reichen für saubere Progression. Wer später an die Langhantel will, wechselt für diese Einheiten mit mir ins Studio.",
      },
    ],
  },

  "rondorf/personal-training": {
    answer:
      "Personal Training in Köln-Rondorf: ich komme zu dir nach Hause, und für Läufe nutzen wir die Feldwege am Ortsrand oder das grüne Rodenkirchen nebenan. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Rondorf: 1-zu-1 zu Hause, Läufe auf den Feldwegen am Ortsrand oder in Rodenkirchen nebenan. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Viel Platz, kurze Wege: Rondorf ist ein Heimtrainings-Veedel",
        body: "Rondorf hat 9.293 Einwohner auf 8,2 km², das ist eine der niedrigsten Dichten im Kölner Süden. Hier wohnt man im Haus mit Garten statt in der Etagenwohnung, und genau das nutzen wir: das Training findet bei dir statt, drinnen oder draußen auf dem eigenen Rasen. Ich bringe Kurzhanteln, Bänder und das restliche Material mit. Kein Anfahrtsstress, kein Studio-Trubel, nur ein Termin, der dir gehört.",
      },
      {
        title: "Feldwege am Ortsrand, Grün in Rodenkirchen nebenan",
        body: "Rund um Rondorf läuft man direkt ins Offene: die Feldwege Richtung Meschenich und Hahnwald sind ruhig, flach und ideal für Grundlagenausdauer und Tempoläufe. Und das benachbarte Rodenkirchen legt nach, mit dem Forstbotanischen Garten, dem Friedenswald und dem Rheinufer nur ein paar Minuten entfernt. Für ein abwechslungsreiches Lauf- und Outdoor-Programm braucht es von Rondorf aus kein Auto und keine Bahnfahrt.",
      },
      {
        title: "Der Kölner Süden wächst, dein Plan wächst mit",
        body: "Rondorf ist ein Veedel der Berufstätigen und Familien, viele pendeln über Zollstock in die Innenstadt. Der Plan respektiert das: zwei feste Einheiten pro Woche, dazu kurze Hausaufgaben von 15 bis 20 Minuten für die Tage dazwischen. Ändert sich dein Alltag, neues Projekt, Nachwuchs, Verletzungspause, wird der Plan angepasst statt weggeworfen. Dranbleiben schlägt Perfektion, jede Woche.",
      },
      {
        title: "Kosten und Einstieg",
        body: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, inklusive Ernährungssteuerung durch Natalie, Ernährungsberaterin für Sport- und Fitnessernährung. Der erste Schritt ist ein kostenloses, unverbindliches Erstgespräch bei dir in Rondorf oder per Video: wir klären Ziel, Woche und Trainingsort. Danach entscheidest du, ob wir zusammen arbeiten.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Rondorf?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching startet bei 150€ im Monat. Das Erstgespräch ist kostenlos, auch bei dir zu Hause.",
      },
      {
        q: "Wo trainieren wir in Rondorf?",
        a: "Bei dir im Haus oder Garten, für Läufe auf den Feldwegen Richtung Meschenich und Hahnwald oder im grünen Rodenkirchen nebenan. Das Material bringe ich mit.",
      },
      {
        q: "Ich war noch nie im Fitnessstudio. Ist das schlimm?",
        a: "Nein, im Gegenteil: du startest ohne falsche Gewohnheiten. Wir bauen Technik und Belastung von Grund auf sauber auf, bei dir zu Hause, ohne Publikum.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Kraft und Kondition spürst du nach zwei bis drei Wochen, sichtbare Veränderungen brauchen je nach Ausgangslage sechs bis zehn Wochen. Versprechen, die schneller klingen, halten nicht.",
      },
    ],
  },

  "ehrenfeld/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Ehrenfeld: Schnelligkeit, Sprungkraft und Stabilität, trainiert im Inneren Grüngürtel direkt am Veedel und im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Ehrenfeld: Tempo, Sprungkraft und Stabilität im Inneren Grüngürtel und im Studio, mit messbaren Tests. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Athletik heißt: schneller, stabiler, belastbarer",
        body: "Athletiktraining ist kein Bodybuilding und kein Dauerlauf, sondern die Arbeit an den Grundlagen, die jeden Sport tragen: Antritt, Sprung, Richtungswechsel, Rumpfstabilität. Davon profitieren Fußballer und Läuferinnen genauso wie alle, die im Alltag einfach wieder spritzig sein wollen. In Ehrenfeld trainieren viele ambitionierte Hobbysportler, die seit Jahren dieselben Einheiten wiederholen, und genau da setzt ein strukturiertes Athletikprogramm an.",
      },
      {
        title: "Der Innere Grüngürtel ist deine Tartanbahn",
        body: "Direkt am Rand von Ehrenfeld liegt der Innere Grüngürtel, und für Athletiktraining ist er besser als jedes Laufband: gerade Rasenflächen für Beschleunigungssprints über 10 bis 40 Meter, weicher Boden für Sprünge und Landetechnik, Platz für Koordinationsleiter und Richtungswechsel. Die Einheiten draußen wechseln sich mit Studio-Terminen ab, dort kommen Langhantelkraft und Sprungkrafttraining mit sauberer Progression dazu.",
      },
      {
        title: "Gemessen wird, nicht geschätzt",
        body: "Am Anfang steht ein Test: Sprintzeit, Sprunghöhe, Rumpfstabilität, Beweglichkeit. Diese Werte sind dein Startpunkt, und alle vier bis sechs Wochen messen wir nach. So siehst du, ob das Training wirkt, bevor du es im Spiel oder beim Wettkampf merkst. Bewegt sich ein Wert nicht, wird der Plan geändert. Das klingt nüchtern, ist aber der Unterschied zwischen Training und Beschäftigung.",
      },
      {
        title: "Für wen das Programm in Ehrenfeld gedacht ist",
        body: "Typische Kunden hier: Vereinssportler, die in der Saisonvorbereitung einen Schub brauchen, Läuferinnen mit Tempo-Plateau, Wiedereinsteiger nach Verletzung, die Vertrauen in Knie und Sprunggelenk zurückwollen. Das Niveau bestimmt der Eingangstest, nicht dein Lebenslauf. Termine gibt es auch früh morgens und spät abends, denn ein fester Feierabend ist in Ehrenfeld eher die Ausnahme.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Ehrenfeld?",
        a: "Eine 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App beginnt bei 150€ im Monat. Das Erstgespräch mit Eingangstest-Planung ist kostenlos.",
      },
      {
        q: "Wo findet das Athletiktraining statt?",
        a: "Sprints, Sprünge und Koordination im Inneren Grüngürtel direkt am Veedel, Kraft und Sprungkraftaufbau im Studio. Die Mischung richtet sich nach deinem Ziel und der Saisonphase.",
      },
      {
        q: "Brauche ich einen Verein oder Wettkampfambitionen?",
        a: "Nein. Athletiktraining lohnt sich für alle, die schneller, stabiler und belastbarer werden wollen, auch ohne Startnummer. Der Eingangstest setzt das Niveau, nicht dein Sportlerlebenslauf.",
      },
      {
        q: "Wie unterscheidet sich das von normalem Personal Training?",
        a: "Der Fokus: beim Athletiktraining stehen Schnelligkeit, Sprungkraft und Richtungswechsel im Zentrum, gemessen mit regelmäßigen Tests. Klassisches Personal Training zielt eher auf Kraftaufbau, Figur und allgemeine Fitness.",
      },
    ],
  },
};

export function getIntentCustom(stadtteil: string, intent: string): IntentCustom | undefined {
  return stadtteilIntentCustom[`${stadtteil}/${intent}`];
}
