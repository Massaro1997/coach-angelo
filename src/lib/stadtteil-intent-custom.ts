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
};

export function getIntentCustom(stadtteil: string, intent: string): IntentCustom | undefined {
  return stadtteilIntentCustom[`${stadtteil}/${intent}`];
}
