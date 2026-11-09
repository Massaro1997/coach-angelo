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

  "wahn/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Wahn, dem Stadtteil, der der Wahner Heide ihren Namen gibt: Stabilität und Ausdauer auf den Heidewegen im Osten, Tempoläufe auf den flachen Wegen Richtung Zündorfer Groov im Westen, Kraft im Studio. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Wahn: Heidewege für Stabilität, flache Strecken Richtung Groov für Tempo, Kraft im Studio. Termine passend zur S12/S19. 50€/Std.",
    sections: [
      {
        title: "Der Stadtteil, der der Heide den Namen gibt",
        body: "Wahn ist kompakt: 7.263 Einwohner auf 2,25 km², ein Ortskern mit kurzen Wegen, und gleich zwei Trainingsreviere in Laufweite. Das Warm-up beginnt deshalb an deiner Haustür. Richtung Osten bist du über Wahnheide in wenigen Laufminuten am Rand der Wahner Heide, die nach genau diesem Stadtteil benannt ist. Richtung Westen öffnet sich die flache Rheinebene über Zündorf bis zur Groov. Kaum ein Kölner Veedel hat beides so nah beieinander.",
      },
      {
        title: "Zwei Richtungen, zwei Trainingsreize",
        body: "Diesen Kontrast nutze ich im Plan. Auf den unebenen Heidewegen arbeiten Fuß, Knie und Hüfte bei jedem Schritt mit: dort trainieren wir Kraftausdauer, Stabilität und Antritte, bei denen der Untergrund Teil der Übung ist. Auf den flachen, geraden Wegen Richtung Zündorf und Groov laufen wir Tempoeinheiten und Intervalle, bei denen die Bedingungen gleich bleiben und sich deine Zeiten ehrlich vergleichen lassen. Sprungkraft und Maximalkraft kommen aus dem Studio, mit Hantel und Messwerten.",
      },
      {
        title: "Termine, die zur S-Bahn passen",
        body: "Vom Bahnhof Porz-Wahn pendelt halb Wahn mit der S12 oder S19 nach Köln und zurück. Deshalb liegen die Einheiten hier selten um 18 Uhr in der Stadt, sondern am Tagesrand vor Ort: früh, bevor die Bahn fährt, oder abends nach der Rückfahrt, Treffpunkt im Veedel, etwa am Schloss Wahn, das viele nur als Kulisse kennen, obwohl es die Theatersammlung der Uni Köln beherbergt. Für volle Wochen gibt es kurze Programme, die du allein durchziehst, mit Rückmeldung per App.",
      },
      {
        title: "So startest du in Wahn",
        body: "Am Anfang steht das kostenlose Erstgespräch, danach der Eingangstest: Sprint, Sprung, Rumpf. Daraus baue ich den Plan, meist zwei geführte Einheiten pro Woche, eine draußen, eine im Studio. Nach vier bis sechs Wochen wird nachgemessen, und der Plan ändert sich, wenn die Zahlen es verlangen. Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Wahn?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Wo genau trainieren wir in Wahn?",
        a: "Stabilität und Ausdauer auf den Wegen der Wahner Heide östlich des Ortskerns, Tempoläufe auf den flachen Strecken Richtung Zündorf und Groov, Kraft im Studio. Treffpunkt und Mix legen wir nach deinem Ziel fest.",
      },
      {
        q: "Ich pendle mit der S-Bahn nach Köln. Wann trainieren wir?",
        a: "Vor oder nach deiner Fahrt, direkt in Wahn. Viele legen eine Einheit in den frühen Morgen und eine in den Abend nach der Rückfahrt vom Bahnhof Porz-Wahn. Der Plan passt sich deiner Woche an.",
      },
      {
        q: "Brauche ich Vereins- oder Wettkampferfahrung?",
        a: "Nein. Der Eingangstest legt dein Niveau fest, nicht dein Lebenslauf. Athletiktraining lohnt sich für Läufer, Vereinssportler und alle, die schneller und belastbarer werden wollen.",
      },
      {
        q: "Was passiert bei schlechtem Wetter?",
        a: "Die Heide funktioniert fast das ganze Jahr, bei Dauerregen verlagern wir die Einheit ins Studio oder zu dir nach Hause. Ausfallen muss ein Termin deswegen nicht.",
      },
    ],
  },

  "nippes/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Nippes heißt bei uns: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, baut deinen Plan um das, was du im Veedel ohnehin einkaufst, vom Wochenmarkt am Wilhelmplatz bis zur Neusser Straße. Sie ist im Online Coaching ab 150€ im Monat enthalten, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Nippes mit Natalie: Kalorien- und Eiweißziel, Wochenplan rund um Markt am Wilhelmplatz und Neusser Straße, abgestimmt aufs Training.",
    sections: [
      {
        title: "In Nippes scheitert es nicht am Einkaufen",
        body: "36.913 Menschen leben in Nippes auf knapp drei Quadratkilometern, und kaum ein Veedel macht gutes Essen leichter: der Wochenmarkt am Wilhelmplatz an sechs Tagen die Woche, dazu die Neusser Straße mit allem, was fehlt. Woran es scheitert, ist selten das Angebot, sondern die Entscheidung am Abend, wenn der Tag lang war. Genau da setzt Natalie an: ein Wochenplan mit Einkaufsliste, die zum Markt passt, damit die Entscheidung schon getroffen ist, bevor der Hunger sie trifft.",
      },
      {
        title: "Zahlen statt Diät-Trends",
        body: "Natalie arbeitet nicht mit Verbotslisten, sondern mit einem Kalorienziel und einer Eiweiß-, Kohlenhydrat- und Fettverteilung, die zu deinem Training und deinem Ziel passt, ob Abnehmen oder Muskelaufbau. Kontrolliert wird über den Wochenschnitt auf der Waage und über Umfänge, nicht über einzelne Tage. Alle paar Wochen schaut sie auf die Zahlen und stellt nach. So verschwindet das Auf und Ab der Versuche, und an seine Stelle tritt ein Trend, den du sehen kannst.",
      },
      {
        title: "Das Veedel isst mit, und das ist eingeplant",
        body: "Nippes ist kein Veedel, in dem man sechs Wochen lang nur aus der Tupperdose isst. Der Kaffee mit Gebäck auf der Neusser Straße, das Essen mit Freunden, das Eis mit den Kindern im Nippeser Tälchen: all das bleibt. Es wird nur eingeplant statt wegignoriert, mit einem Budget, das in dein Kalorienziel passt. Pläne, die das echte Leben aussperren, halten zwei Wochen. Pläne, die es einrechnen, halten Monate, und nur die verändern etwas.",
      },
      {
        title: "Online-Beratung, die in dichte Wochen passt",
        body: "Die Ernährungsberatung läuft komplett online: Analyse im Video-Gespräch, Plan und Anpassungen per App, wöchentlicher Check-in. Für Berufspendler und Familien in Nippes ist das meist der Unterschied zwischen Anfangen und Aufschieben, weil kein Praxistermin quer durch die Stadt nötig ist. Enthalten ist sie im Online Coaching ab 150€ im Monat, zusammen mit dem Trainingsplan von mir. Der erste Schritt ist ein kostenloses Erstgespräch mit uns beiden.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Nippes?",
        a: "Sie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan per App und wöchentlichen Check-ins. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Wer berät mich bei FitPrimo?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie übernimmt die Ernährungsseite, ich als Trainer die Trainingsseite, und beide Pläne greifen ineinander.",
      },
      {
        q: "Muss ich für die Beratung irgendwo hinfahren?",
        a: "Nein, alles läuft online per Video und App. Das Einkaufen bleibt bei dir im Veedel, viele nutzen dafür einfach den Wochenmarkt am Wilhelmplatz mit der Einkaufsliste aus dem Plan.",
      },
      {
        q: "Ich koche wenig und esse oft unterwegs. Funktioniert das trotzdem?",
        a: "Ja. Der Plan wird um deinen Alltag gebaut, nicht umgekehrt: einfache Gerichte, klare Alternativen für unterwegs und ein Eiweißziel, das sich auch ohne Kochmarathon erreichen lässt.",
      },
      {
        q: "Beratet ihr auch bei Unverträglichkeiten oder Erkrankungen?",
        a: "Nein. Natalies Bereich ist Sport- und Fitnessernährung für gesunde Erwachsene. Medizinische Ernährungsfragen gehören in ärztliche Hände, das sagen wir dir im Erstgespräch offen.",
      },
    ],
  },

  "nippes/abnehmen": {
    answer:
      "Abnehmen in Köln-Nippes steht bei mir auf drei Beinen: Krafttraining, damit die Muskeln bleiben, ein Kalorienziel, das Natalie als Ernährungsberaterin mit dir festlegt, und Alltagsbewegung im Veedel. Die 1-zu-1 Stunde kostet 50€, das Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Nippes: Krafttraining plus Ernährungsplan von Natalie, realistisches Tempo, Training im Nippeser Tälchen oder bei dir zu Hause. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Abnehmen heißt nicht hungern, sondern rechnen",
        body: "Wer abnehmen will, braucht ein moderates Kaloriendefizit, genug Eiweiß und Geduld, mehr nicht. Crash-Diäten nehmen dir in Nippes niemand ab, spätestens beim dritten Geburtstagskuchen im Kollegenkreis kippen sie. Deshalb arbeite ich mit einem Defizit, das du durchhalten kannst, und messe den Fortschritt am Wochenschnitt auf der Waage, nicht an einzelnen Tagen. Ein halbes Kilo pro Woche ist ein gutes, haltbares Tempo. Alles, was deutlich schneller verspricht, kostet meist Muskeln und kommt zurück.",
      },
      {
        title: "Krafttraining schützt, was du behalten willst",
        body: "Ohne Krafttraining verlierst du beim Abnehmen nicht nur Fett, sondern auch Muskulatur, und genau die hält deinen Verbrauch oben. Zwei Einheiten pro Woche reichen: bei dir zu Hause mit dem Material, das ich mitbringe, im Studio an der Hantel oder draußen im Nippeser Tälchen mit dem eigenen Körpergewicht. Der Plan folgt deiner Woche, nicht umgekehrt, und wird alle paar Wochen an die Zahlen angepasst, die du tatsächlich lieferst.",
      },
      {
        title: "Das Veedel ist dein Schrittzähler",
        body: "Nippes ist dicht gebaut, und das ist beim Abnehmen ein Vorteil: Bäcker, Schule, Bahn, fast alles liegt in Gehweite. Wer die täglichen Wege zu Fuß macht und abends eine Runde durchs Nippeser Tälchen oder den Johannes-Giesberts-Park dranhängt, verbrennt Woche für Woche spürbar Energie, ohne dass es sich nach Sport anfühlt. Diese Alltagsschritte sind im Plan fest eingebaut, weil sie das Defizit tragen, wenn mal eine Trainingseinheit ausfällt.",
      },
      {
        title: "Die Ernährungsseite übernimmt Natalie",
        body: "Beim Essen musst du in Nippes nichts erfinden, nur entscheiden. Natalie, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, legt mit dir Kalorienziel und Eiweißmenge fest und baut daraus einen Wochenplan, der zu deinem Alltag passt, Kaffee im Veedel inklusive. Sie ist im Online Coaching ab 150€ im Monat enthalten. Medizinische Ernährungsfragen gehören nicht zu ihrem Bereich, das sagen wir dir im kostenlosen Erstgespräch offen.",
      },
    ],
    faq: [
      {
        q: "Wie schnell kann ich in Köln-Nippes abnehmen?",
        a: "Realistisch sind etwa ein halbes Kilo pro Woche im Schnitt. Das klingt unspektakulär, summiert sich aber in drei Monaten auf fünf bis sechs Kilo, die bleiben, weil Muskeln und Alltag mitspielen.",
      },
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Nippes?",
        a: "Die 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Trainingsplan, Natalies Ernährungssteuerung und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Brauche ich ein Fitnessstudio?",
        a: "Nein. Krafttraining funktioniert auch zu Hause mit Kurzhanteln und Bändern, die ich mitbringe, oder draußen im Tälchen. Wer gern an Geräte will, kombiniert Termine im Studio dazu.",
      },
      {
        q: "Reicht Joggen allein zum Abnehmen?",
        a: "Joggen verbrennt Kalorien, schützt aber die Muskulatur kaum. Die Kombination wirkt: Krafttraining für den Erhalt, Schritte und Läufe für den Verbrauch, Ernährung für das Defizit.",
      },
      {
        q: "Muss ich auf Essen im Veedel verzichten?",
        a: "Nein. Natalie plant das echte Leben ein, vom Marktbesuch bis zum Essen mit Freunden. Ein Plan, der Verbote stapelt, hält zwei Wochen; einer mit Budget hält Monate.",
      },
    ],
  },

  "bocklemuend-mengenich/personal-training": {
    answer:
      "Personal Training in Köln-Bocklemünd/Mengenich: ich komme zu dir nach Hause oder wir trainieren draußen auf den Feldwegen Richtung Widdersdorf. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos und unverbindlich.",
    metaDescription:
      "Personal Training in Köln-Bocklemünd/Mengenich: 1-zu-1 bei dir zu Hause oder draußen am Feldrand, Termine passend zu Linie 3 und 4. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Zwei Ortsteile, ein kurzer Weg zum Training",
        body: "Bocklemünd/Mengenich ist das einzige Kölner Veedel mit Doppelnamen: zwei alte Ortskerne, dazwischen die Siedlungen der Nachkriegszeit, zusammen 10.629 Einwohner auf knapp fünf Quadratkilometern am Westrand des Bezirks Ehrenfeld. Ein Fitnessangebot vor Ort gibt es kaum, also drehe ich die Richtung um: das Training kommt zu dir. Kurzhanteln, Widerstandsbänder und das übrige Material bringe ich mit, ein freies Stück Wohnzimmer, Keller oder Garten reicht für ein vollständiges Programm.",
      },
      {
        title: "Hinter der letzten Häuserreihe beginnt das Feld",
        body: "Der größte Trainingsvorteil des Veedels liegt direkt am Ortsrand: Richtung Widdersdorf öffnet sich die Feldflur mit ruhigen, flachen Wegen, auf denen wir Läufe, Intervalle und Zirkel mit dem eigenen Körpergewicht aufbauen, ohne Ampeln und ohne Publikum. Für viele ist genau das der Unterschied: kein Studio, in dem man sich beobachtet fühlt, sondern frische Luft und ein Programm, das nur für dich geschrieben ist.",
      },
      {
        title: "Termine, die zu Linie 3 und 4 passen",
        body: "Mit dem Görlinger-Zentrum und Bocklemünd enden hier gleich zwei Stadtbahnlinien, entsprechend viele im Veedel pendeln täglich stadteinwärts. Nach Feierabend plus Rückfahrt noch einmal loszufahren, ist der Punkt, an dem die meisten Vorsätze reißen. Deshalb liegt das Training vor deiner Haustür und richtet sich nach deiner Woche, auch früh morgens oder am Vormittag. Die WDR-Studios im Veedel kennen ohnehin keine Bürozeiten: wer in Produktion oder Technik arbeitet, bekommt Termine im Schichtrhythmus.",
      },
      {
        title: "Was es kostet und wie du startest",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App, Ernährungssteuerung durch Natalie und wöchentlichen Check-ins beginnt bei 150€ im Monat. Der Einstieg ist immer ein kostenloses Erstgespräch über Ziel, Alltag und Trainingsort. Danach folgt ein Technik-Check, und nach den ersten Wochen schauen wir gemeinsam auf die Zahlen: Gewicht, Kraftwerte, Umfänge. Was sich nicht bewegt, wird im Plan geändert.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Bocklemünd/Mengenich?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, Erstgespräch kostenlos. Geräte brauchst du keine, das Material bringe ich mit.",
      },
      {
        q: "Wo trainieren wir im Veedel?",
        a: "Meistens bei dir zu Hause oder auf den Feldwegen Richtung Widdersdorf. Wer schweres Langhanteltraining will, nimmt Termine im Studio dazu, gut erreichbar über Linie 3 oder 4.",
      },
      {
        q: "Ich habe noch nie mit einem Trainer gearbeitet. Wie läuft der Anfang?",
        a: "Mit einem kostenlosen Erstgespräch und einem Technik-Check. Du brauchst keine Vorerfahrung, der Plan startet auf deinem Stand und wächst mit dir mit.",
      },
      {
        q: "Geht Training auch im Schichtdienst?",
        a: "Ja. Termine lege ich auch in Vormittag oder frühen Nachmittag, und der Plan rechnet mit wechselnden Wochen, damit eine Spätschicht nicht den Monat kippt.",
      },
    ],
  },

  "suerth/rueckentraining": {
    answer:
      "Rückentraining in Köln-Sürth heißt gezieltes Krafttraining für Rumpf, Hüfte und Rücken, bei dir zu Hause oder im Studio, plus tägliches Gehen am Wasser. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos. Bei akuten Schmerzen gehört der erste Weg zum Arzt, nicht zu mir.",
    metaDescription:
      "Rückentraining in Köln-Sürth: Kraft für Rumpf und Rücken statt nur Dehnen, zu Hause oder im Studio, Gehen am Rhein als Baustein. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Der Rücken meldet sich selten beim Sport, meist am Schreibtisch",
        body: "Die typische Sürther Rücken-Geschichte beginnt nicht an der Hantel, sondern im Sitzen: morgens Bahn oder Auto, acht Stunden Büro, abends Sofa. Kein einzelner Tag davon ist schlimm, aber die Summe macht den Rücken schwach und empfindlich. Die Antwort ist nicht mehr Schonung, sondern mehr Belastbarkeit: ein Rücken, der regelmäßig hebt, zieht und trägt, steckt auch lange Sitztage weg. Genau diese Belastbarkeit bauen wir Schritt für Schritt auf.",
      },
      {
        title: "Heben, Ziehen, Tragen: das Programm",
        body: "Im Zentrum stehen die Bewegungen, die ein Rücken im Leben braucht: Hüftbeugen und Hebe-Varianten für die rückseitige Kette, Zugübungen für den oberen Rücken, Rumpfarbeit gegen das Einknicken und Trageübungen, die alles verbinden. Die Last steigt langsam und kontrolliert, von Bändern und Kurzhanteln zu Hause bis zur Langhantel im Studio, wenn du so weit bist. Reines Dehnen und Massagerollen fühlen sich gut an, verändern aber wenig: stärker werden schon.",
      },
      {
        title: "Das Wasser liegt vor der Tür, nutz es",
        body: "Zwischen den Einheiten braucht ein Rücken vor allem Bewegung mit niedriger Last, und dafür hat Sürth den Rhein. Eine halbe Stunde zügiges Gehen am Ufer, als fester Abendtermin statt als gelegentlicher Vorsatz, hält die Strukturen locker und den Kopf frei. Im Plan steht das als eigener Baustein neben den zwei Kraftterminen pro Woche, nicht als Deko. Wer mag, macht daraus mit der Zeit lockere Läufe.",
      },
      {
        title: "Ehrlich vorweg: Training ersetzt keinen Arzt",
        body: "Ich arbeite mit Menschen, deren Rücken unspezifisch zwickt oder schlicht zu schwach geworden ist, nicht mit akuten Krankheitsbildern. Bei starken, ausstrahlenden oder plötzlichen Schmerzen klärst du das zuerst ärztlich ab; mit einer Freigabe steige ich danach gern ein. Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App beginnt bei 150€ im Monat, und am Anfang steht immer das kostenlose Erstgespräch über deine Vorgeschichte und dein Ziel.",
      },
    ],
    faq: [
      {
        q: "Hilft Krafttraining wirklich gegen Rückenschmerzen?",
        a: "Bei unspezifischen Beschwerden ist ein stärkerer, belastbarer Rücken der Weg mit der besten Erfolgsbilanz. Ein Heilversprechen gebe ich dir nicht, und akute Schmerzen gehören zuerst zum Arzt.",
      },
      {
        q: "Was kostet Rückentraining in Köln-Sürth?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, Erstgespräch kostenlos. Material für das Training zu Hause bringe ich mit.",
      },
      {
        q: "Ich hatte einen Bandscheibenvorfall. Kann ich trainieren?",
        a: "Nur mit ärztlicher Freigabe. Danach bauen wir langsam und kontrolliert auf, mit Übungen, die zu deinem Befund passen, und ohne Ehrgeiz an der falschen Stelle.",
      },
      {
        q: "Wie lange dauert es, bis ich etwas merke?",
        a: "Viele spüren nach vier bis sechs Wochen, dass Sitzen und Heben leichter fallen. Messbar wird es über Kraftwerte und darüber, wie oft sich der Rücken überhaupt noch meldet.",
      },
      {
        q: "Muss ich dafür ins Studio?",
        a: "Nein. Der Einstieg funktioniert zu Hause mit Bändern und Kurzhanteln. Das Studio lohnt sich später, wenn schwerere Zug- und Hebeübungen dran sind.",
      },
    ],
  },

  "lind/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Lind: Antritte und Tempoläufe auf den geraden Feldwegen Richtung Libur, Stabilität auf den weichen Pfaden am Heiderand, Kraft und Sprungkraft im Studio. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Lind: Tempo auf den Feldwegen Richtung Libur, Stabilität am Rand der Wahner Heide, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ein Dorf mit freier Bahn",
        body: "Lind hat sich seinen dörflichen Zuschnitt bewahrt: ruhige Straßen, kaum Durchgangsverkehr, und nach wenigen Minuten zu Fuß stehst du im Offenen. Für Athletiktraining ist das Gold wert, denn das Aufwärmen beginnt an deiner Haustür statt auf einem Parkplatz. Südlich des Ortes liegt die freie Feldflur Richtung Libur, östlich die Heide: zwei Untergründe mit völlig verschiedenen Reizen, beide ohne Anfahrt erreichbar.",
      },
      {
        title: "Die Feldwege Richtung Libur sind deine Laufbahn",
        body: "Zwischen Lind und Libur ziehen sich gerade, flache Wirtschaftswege durch die Felder. Dort arbeiten wir an Tempo: Antritte zwischen 20 und 60 Metern, Steigerungsläufe, Intervalle mit sauber gemessenen Abschnitten. Weil die Strecke eben bleibt und sich nichts in den Weg stellt, sind deine Zeiten von Woche zu Woche vergleichbar. Der offene Wind über den Feldern ist dabei kein Störfaktor, sondern ein ehrlicher Widerstand, der sich nicht wegdiskutieren lässt.",
      },
      {
        title: "Weicher Boden für die Füße, Hanteln für den Rest",
        body: "Am östlichen Ortsrand übernimmt die Wahner Heide den zweiten Part: Auf nachgiebigem, unebenem Boden arbeiten Fußgelenke, Knie und Hüfte bei jedem Schritt mit, dort trainieren wir Lauf-ABC, Richtungswechsel und Kraftausdauer. Was draußen nicht wächst, holen wir im Studio: Maximalkraft und Sprungkraft an der Langhantel, mit Werten, die wir notieren und vergleichen. Alle vier bis sechs Wochen steht ein Re-Test, und der Plan folgt den Ergebnissen, nicht der Gewohnheit.",
      },
      {
        title: "Für wen sich das in Lind lohnt",
        body: "Die typischen Anfragen kommen von Vereinssportlern aus Porz und dem Umland, die im Fußball, Handball oder Tennis den Unterschied in Antritt und Stabilität suchen, von Läufern mit Zeitzielen und von Wiedereinsteigern, die es diesmal strukturiert angehen wollen. Ein Wettkampfkalender ist keine Voraussetzung. Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App beginnt bei 150€ im Monat, und los geht es mit dem kostenlosen Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Lind?",
        a: "Eine 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo genau trainieren wir in Lind?",
        a: "Tempo und Antritte auf den Feldwegen Richtung Libur, Stabilität und Lauf-ABC am Rand der Wahner Heide, Kraft und Sprungkraft im Studio. Die Mischung richtet sich nach deinem Ziel.",
      },
      {
        q: "Ich spiele im Verein. Ersetzt das mein Mannschaftstraining?",
        a: "Nein, es ergänzt es. Das Mannschaftstraining übt den Sport, das Athletiktraining baut die körperliche Basis: Antritt, Sprungkraft, Stabilität, Belastbarkeit gegen Verletzungen.",
      },
      {
        q: "Wie merke ich, dass es wirkt?",
        a: "An Zahlen: Sprintzeiten auf vermessener Strecke, Sprunghöhe, Kraftwerte. Alle vier bis sechs Wochen wird nachgemessen, und der Plan ändert sich, wenn die Werte stehen bleiben.",
      },
    ],
  },

  "porz/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Porz läuft bei uns über Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung: ein Essensplan, der auch mit Schichtdienst und wechselnden Zeiten funktioniert, komplett online betreut. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Porz mit Natalie: Essensplan für Schichtdienst und Büroalltag, Kalorien- und Eiweißziel statt Diät, online betreut. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Porz isst zu anderen Zeiten als der Rest von Köln",
        body: "Wer in Porz wohnt, arbeitet überdurchschnittlich oft im Schichtbetrieb: der Flughafen Köln/Bonn liegt im Bezirk, dazu Logistik und Industrie rundherum. Frühschicht, Spätschicht, Nachtschicht, und jede Woche sieht anders aus. Die üblichen Ernährungsregeln mit festem Frühstück und Abendessen um sieben scheitern daran zuverlässig. Natalie plant deshalb nicht nach Uhrzeit, sondern nach deinem Dienstplan: Hauptmahlzeiten um die Schicht herum, eine klare Lösung für die Kantine und für die Stunden dazwischen.",
      },
      {
        title: "Ein Ziel in Zahlen, egal wie die Woche liegt",
        body: "Der Kern bleibt in jeder Schicht gleich: ein Kalorienziel und genug Eiweiß, verteilt auf die Mahlzeiten, die dein Tag tatsächlich hergibt. Ob das drei große oder fünf kleine sind, ist zweitrangig; entscheidend ist der Wochenschnitt auf der Waage, nicht der einzelne Tag. Natalie schaut in den Check-ins auf genau diese Zahlen und stellt nach, wenn der Trend steht. So überlebt der Plan auch eine Woche Nachtschicht, in der sonst jede Diät kippt.",
      },
      {
        title: "Eingekauft wird im Veedel, geplant wird vorher",
        body: "Die Zutatenfrage löst Porz selbst: der Wochenmarkt auf dem Friedrich-Ebert-Platz, die Geschäfte rund um die Fußgängerzone, dazu die großen Märkte am Rand. Was fehlt, ist selten das Angebot, sondern ein Plan, der vor dem Einkauf steht. Natalie gibt dir eine Wochenliste, die zu deinen Schichten passt, mit Gerichten, die sich vorkochen und mitnehmen lassen. Die Dose für die Pause ist in Porz kein Diät-Trick, sondern die realistischste Form von Ernährungssteuerung.",
      },
      {
        title: "Beratung per Video, Training nach Wunsch dazu",
        body: "Die Beratung findet online statt: Analysegespräch per Video, Plan und Anpassungen in der App, wöchentlicher Check-in. Gerade mit Schichtplan ist das der Punkt, an dem es praktisch wird, weil kein fester Praxistermin in deine wechselnden Wochen passen muss. Enthalten ist die Ernährungsberatung im Online Coaching ab 150€ im Monat, zusammen mit meinem Trainingsplan. Wer in Porz zusätzlich 1-zu-1 trainieren will, etwa am Rheinufer, nimmt Stunden zu 50€ dazu.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Porz?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, zusammen mit Trainingsplan und wöchentlichen Check-ins. Für das Erstgespräch zahlst du nichts.",
      },
      {
        q: "Funktioniert der Plan auch mit Wechselschicht am Flughafen?",
        a: "Ja, das ist in Porz der häufigste Fall. Natalie baut den Plan um deinen Dienstplan, mit Mahlzeiten, die zur Schicht passen, und Alternativen für Kantine und Nachtdienst.",
      },
      {
        q: "Wer macht die Beratung bei FitPrimo?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie betreut die Ernährungsseite, ich das Training, und beide Pläne sind aufeinander abgestimmt.",
      },
      {
        q: "Muss ich kochen können?",
        a: "Nein. Der Plan setzt auf einfache Gerichte, die sich vorbereiten und mitnehmen lassen. Wer gar nicht kocht, bekommt Lösungen für Kantine, Bäcker und unterwegs, mit klarem Eiweißziel.",
      },
      {
        q: "Beratet ihr auch bei Erkrankungen oder Unverträglichkeiten?",
        a: "Nein. Natalies Bereich ist Sport- und Fitnessernährung für gesunde Erwachsene. Medizinische Ernährungsfragen gehören in ärztliche Hände, das sagen wir dir im Erstgespräch offen.",
      },
    ],
  },

  "brueck/personal-training": {
    answer:
      "Personal Training in Köln-Brück heißt: 1-zu-1 bei dir zu Hause oder am Königsforst, der direkt am Veedel beginnt, mit festem Plan und Technik-Korrektur in jeder Einheit. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "1-zu-1 Personal Training in Köln-Brück: zu Hause mit mitgebrachtem Material oder am Königsforst, fester Plan, messbare Schritte. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Brück hat den Wald, dir fehlt nur der Plan",
        body: "Brück gehört zu den grünsten Ecken im rechtsrheinischen Köln: 10.234 Einwohner auf 7,5 km², und ein großer Teil davon ist Königsforst. Viele hier gehen längst laufen oder spazieren, und trotzdem verändert sich wenig, weil Bewegung allein kein Training ist. Genau da setze ich an: ein Plan mit Richtung, Kraftübungen, die aufeinander aufbauen, und jemand, der Woche für Woche kontrolliert, ob du auf Kurs bist.",
      },
      {
        title: "Zu Hause trainieren, im Wald draußen sein",
        body: "Die Kraftarbeit findet meist bei dir statt: Brück ist ein Veedel der Einfamilienhäuser und Gärten, und ein paar Quadratmeter reichen, weil ich Kurzhanteln, Bänder und das übrige Material mitbringe. Für Ausdauer und die Einheiten an der frischen Luft gehen wir an den Waldrand: die breiten Wege des Königsforsts ab Mauspfad sind flach genug für Intervalle und lang genug für jede Grundlagenausdauer. Studio in der Stadt? Nur wenn du es willst, nötig ist es nicht.",
      },
      {
        title: "Zwei Termine pro Woche, dokumentiert statt gefühlt",
        body: "Nach dem kostenlosen Erstgespräch starten wir mit einem Technik-Check und legen zwei feste Einheiten pro Woche. Jede Übung wird mit Gewicht und Wiederholungen notiert, alle vier Wochen vergleichen wir: Kraftwerte, Umfänge, Gewicht im Wochenschnitt. Für die Tage dazwischen bekommst du kurze Aufgaben, oft eine halbe Stunde zügiges Gehen im Wald, die in Brück niemandem schwerfällt. Wenn die Zahlen stehen bleiben, ändere ich den Plan, nicht die Ausrede.",
      },
      {
        title: "Für Pendler mit der Linie 1 gemacht",
        body: "Brück hängt mit der Stadtbahn-Linie 1 direkt an der Innenstadt, und viele pendeln jeden Tag hinein. Abends dann noch einmal in ein Studio in der Stadt zu fahren, ist der Punkt, an dem die meisten Vorsätze reißen. Das Training vor der eigenen Haustür dreht die Logik um: der Termin wartet zu Hause auf dich, nicht am anderen Ende der Bahnlinie. Auch Randzeiten sind machbar, früh vor der Arbeit oder am Samstagmorgen, bevor das Familienprogramm startet.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Brück?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App ab 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Wo genau trainieren wir in Brück?",
        a: "Meist bei dir zu Hause oder im Garten, mit Material, das ich mitbringe. Für Läufe und Outdoor-Einheiten nutzen wir den Königsforst, der direkt am Veedel beginnt.",
      },
      {
        q: "Ich jogge schon im Königsforst. Was bringt mir ein Trainer zusätzlich?",
        a: "Struktur und Kraft. Laufen hält fit, verändert aber weder Haltung noch Muskulatur spürbar. Mit zwei geführten Krafteinheiten pro Woche wird aus deinem Waldlauf ein komplettes Programm.",
      },
      {
        q: "Geht Training auch früh morgens oder am Wochenende?",
        a: "Ja. Gerade für Pendler lege ich Einheiten in den frühen Morgen oder auf den Samstagvormittag. Den Rhythmus legen wir im Erstgespräch fest.",
      },
      {
        q: "Brauche ich Geräte oder eine Studiomitgliedschaft?",
        a: "Nein. Ich bringe alles mit, was das Training zu Hause braucht. Wer später schwer an der Langhantel arbeiten will, kann Einheiten im Studio in Köln dazunehmen.",
      },
    ],
  },

  "bayenthal/rueckentraining": {
    answer:
      "Rückentraining in Köln-Bayenthal: zweimal pro Woche gezielte Kraftarbeit für Rumpf und oberen Rücken, bei dir zu Hause oder im Studio, dazu das Rheinufer Süd für den täglichen Ausgleich. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos. Akute Schmerzen klärt zuerst ein Arzt.",
    metaDescription:
      "Rückentraining in Köln-Bayenthal: gezielte Kraft für Rumpf und oberen Rücken statt Schonhaltung, zu Hause oder im Studio. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Kurze Wege, viel Sitzen: das Bayenthal-Muster",
        body: "Bayenthal ist klein und dicht: 11.161 Menschen auf 1,28 km², die Innenstadt ist mit der Bahn ein Katzensprung, Büro, Bäcker und Supermarkt liegen oft in Gehweite. Bequem, aber der Körper zahlt dafür: wer sich kaum noch weit bewegen muss, sitzt am Ende fast den ganzen Tag, und das erste, was sich meldet, ist der Rücken. Zwischen Schulterblättern beim Arbeiten, unten im Kreuz nach dem Aufstehen. Das ist selten ein Schaden, meist schlicht fehlende Kraft, und genau die lässt sich aufbauen.",
      },
      {
        title: "Aufrichten und ziehen, nicht nur dehnen",
        body: "Ein Schreibtischtag zieht Schultern und Blick nach vorn; das Training muss die Gegenrichtung stärken. Deshalb besteht der Kern aus Zugübungen in allen Winkeln, Arbeit für die Schulterblattmuskulatur und Rumpfübungen, die das Becken stabil halten. Dehnen und Rollen dürfen dazu, tragen aber nicht allein: ein Muskel, der zu schwach ist, bleibt auch gedehnt zu schwach. Wir starten mit Bändern und Kurzhanteln bei dir zu Hause, und wenn mehr Last sinnvoll wird, geht es ins Studio.",
      },
      {
        title: "Das Rheinufer Süd ist dein zweites Trainingsgerät",
        body: "Zwischen den beiden Krafteinheiten braucht der Rücken vor allem eines: regelmäßige, leichte Bewegung. Bayenthal hat dafür das Rheinufer Süd direkt vor der Tür, flach, beleuchtet und zu jeder Jahreszeit begehbar. Im Plan steht das als fester Baustein mit Zeitangabe, nicht als guter Vorsatz: zügig gehen, Arme mitnehmen, zwanzig bis dreißig Minuten. Wer das vier Mal pro Woche schafft, nimmt dem Sitztag einen großen Teil seiner Wirkung.",
      },
      {
        title: "Erst die Abklärung, dann der Aufbau",
        body: "Ich trainiere Menschen, deren Rücken auf zu viel Sitzen und zu wenig Kraft reagiert. Plötzliche, heftige oder ausstrahlende Schmerzen gehören zuerst in ärztliche Abklärung; danach steige ich mit Freigabe ein und richte die Übungsauswahl am Befund aus. Der Einstieg ist ein kostenloses Erstgespräch über Vorgeschichte, Alltag und Ziel. Die 1-zu-1 Stunde kostet 50€, Online-Begleitung mit Plan per App gibt es ab 150€ im Monat.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Bayenthal?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos. Material für zu Hause bringe ich mit.",
      },
      {
        q: "Mein Rücken schmerzt vor allem beim Sitzen im Büro. Hilft Training da überhaupt?",
        a: "Meist ja: unspezifische Beschwerden vom Sitzen reagieren gut auf mehr Kraft im Rumpf und oberen Rücken plus regelmäßige Bewegung. Ein Heilversprechen gibt es nicht, eine klare Erfolgsbilanz schon.",
      },
      {
        q: "Wie schnell merke ich einen Unterschied?",
        a: "Die meisten spüren nach vier bis sechs Wochen, dass lange Sitztage weniger nachhängen. Gemessen wird zusätzlich über Kraftwerte, damit der Fortschritt nicht vom Tagesgefühl abhängt.",
      },
      {
        q: "Trainieren wir in Bayenthal draußen?",
        a: "Die Kraftarbeit läuft drinnen, zu Hause oder im Studio. Das Rheinufer Süd nutzen wir für den Bewegungsbaustein zwischen den Einheiten, als festen Termin im Plan.",
      },
      {
        q: "Ich hatte schon einmal einen Bandscheibenvorfall. Kann ich mitmachen?",
        a: "Mit ärztlicher Freigabe ja. Dann bauen wir langsam auf, mit Übungen, die zu deinem Befund passen, und steigern die Last erst, wenn die Bewegung sicher sitzt.",
      },
    ],
  },

  "widdersdorf/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Widdersdorf nutzt, was das Veedel hat: flache, gerade Wirtschaftswege in alle Richtungen für Sprints und Tempoläufe, dazu Kraft und Sprungkraft im Studio. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Widdersdorf: Sprints und Tempoläufe auf den Feldwegen rund ums Veedel, Kraft und Sprungkraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ein junges Veedel mit Platz nach allen Seiten",
        body: "Widdersdorf ist durch das Neubaugebiet im Süden auf 12.398 Einwohner gewachsen und gehört heute zu den jüngsten Ecken des Kölner Westens: viele Familien, viele Vereinssportler, viele, die nach Feierabend noch etwas aus sich herausholen wollen. Das Gelände spielt mit. Hinter der letzten Häuserreihe beginnen offene Felder, und die Wege dorthin sind eben, asphaltiert oder fest geschottert, ohne Ampel und ohne Gegenverkehr aus Lieferwagen.",
      },
      {
        title: "Schnelligkeit entsteht auf freier Strecke",
        body: "Für Antritt und Tempo brauchst du Strecke, auf der niemand bremst, und davon hat Widdersdorf reichlich: die Wirtschaftswege Richtung Lövenich, Esch und Bocklemünd laufen schnurgerade durch die Felder. Dort arbeiten wir mit markierten Abschnitten, Sprints über 30 bis 80 Meter, fliegenden Läufen und Tempowechseln. Zwischen altem Ortskern und Neubaugebiet lassen sich Runden kombinieren, die genau zur geplanten Einheit passen, von kurz und hart bis lang und ruhig.",
      },
      {
        title: "Kraft und Sprungkraft kommen aus dem Studio",
        body: "Draußen wird schnell, drinnen wird stark: Maximalkraft und Sprungkraft baue ich mit Hantelarbeit und Sprungprogression im Studio auf, sauber dosiert und mit Technik-Korrektur in jeder Einheit. Beides zusammen ergibt die Mischung, die im Verein den Unterschied macht, beim Fußball genauso wie beim Tennis oder Laufen. Getestet wird regelmäßig: Sprintzeit auf vermessener Strecke, Sprunghöhe, Kraftwerte. Der Plan folgt den Zahlen, nicht dem Bauchgefühl.",
      },
      {
        title: "Training, das in den Familienkalender passt",
        body: "Wer in Widdersdorf wohnt, organisiert meist mehr als nur sich selbst: Kinder, Verein, Pendelweg, das Veedel hängt ohne Stadtbahn am Bus und am Auto. Deshalb biete ich Zeitfenster an, die in so einen Kalender passen: früh am Morgen, am Vormittag, wenn das Haus leer ist, oder am Samstag. Und wenn eine Woche komplett kippt, gibt es eine kurze Einheit für dich allein, damit der Faden nicht reißt. Zwei geführte Termine pro Woche reichen für messbaren Fortschritt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Widdersdorf?",
        a: "Die 1-zu-1 Stunde kostet 50€, Online-Begleitung mit Plan per App ab 150€ im Monat. Das Erstgespräch kostet nichts und klärt Ziel und Startniveau.",
      },
      {
        q: "Wo trainieren wir in Widdersdorf?",
        a: "Schnelligkeit und Ausdauer auf den Feldwegen rund ums Veedel, Richtung Lövenich, Esch oder Bocklemünd. Kraft und Sprungkraft im Studio, den Treffpunkt legen wir nach deinem Wohnort fest.",
      },
      {
        q: "Ich spiele im Verein. Ersetzt das Athletiktraining mein Mannschaftstraining?",
        a: "Nein, es ergänzt es: Antritt, Sprungkraft und Stabilität, die im Mannschaftstraining zu kurz kommen. Die Einheiten plane ich um deine Spiel- und Trainingstage herum.",
      },
      {
        q: "Für welches Alter ist das geeignet?",
        a: "Für Erwachsene jedes Trainingsstands. Der Technik-Check am Anfang legt das Niveau fest, die Übungen werden daran angepasst, nicht umgekehrt.",
      },
      {
        q: "Was passiert im Winter, wenn die Feldwege nass sind?",
        a: "Dann verschiebt sich der Schwerpunkt ins Studio: mehr Kraft- und Sprungarbeit, kürzere Tempoeinheiten draußen auf festen Wegen. Der Plan rechnet die Jahreszeit von Anfang an ein.",
      },
    ],
  },

  "holweide/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Holweide heißt bei uns: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, plant dein Essen so, dass es auch Spät- und Nachtdienste übersteht, komplett online. Sie ist im Online Coaching ab 150€ im Monat enthalten, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Holweide mit Natalie: Essensplan, der Spät- und Nachtdienste übersteht, Eiweißziel über 24 Stunden statt pro Tag. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Veedel, in dem viele essen müssen, wann der Dienstplan es erlaubt",
        body: "In Holweide leben 21.001 Menschen, und mit dem Krankenhaus Holweide steht einer der großen Arbeitgeber des Kölner Ostens mitten im Veedel. Wer in Pflege, Praxis oder Rettungsdienst arbeitet, kennt das Problem jeder klassischen Ernährungsberatung: der Plan geht von drei Mahlzeiten am Tag aus, der Dienstplan nicht. Natalie baut deshalb andersherum: erst dein echter Wochenrhythmus mit Früh-, Spät- und Nachtdiensten, dann die Mahlzeiten, die hineinpassen.",
      },
      {
        title: "In der Nachtschicht zählt nicht der Tag, sondern die 24 Stunden",
        body: "Nach einer Nacht im Dienst ist der Montag kein Montag mehr, und genau da scheitern Apps und Standardpläne. Natalie rechnet Kalorien- und Eiweißziel über 24 Stunden statt über den Kalendertag: eine warme Hauptmahlzeit vor dem Dienst, etwas Planbares für die Pause um drei Uhr nachts, und nach dem Schlafen kein schlechtes Gewissen, sondern die nächste normale Mahlzeit. So entsteht ein Wochenschnitt, der stimmt, auch wenn kein Tag dem anderen gleicht.",
      },
      {
        title: "Essen, das den Kühlschrank am Automaten ersetzt",
        body: "Nachts um drei gewinnt sonst immer der Automat im Flur. Der Plan hält dagegen, mit Mahlzeiten, die sich am Vortag in zehn Minuten vorbereiten lassen und kalt oder aufgewärmt funktionieren. Dazu kommt ein Eiweißziel, das du ohne Kochmarathon erreichst, und eine Einkaufsliste für die Woche, damit zu Hause da ist, was der Plan braucht. Verbote gibt es keine: auch das Stück Kuchen im Pausenraum ist eingeplant statt verdrängt.",
      },
      {
        title: "Online-Beratung, Training nach Wunsch dazu",
        body: "Die Beratung läuft per Video und App, du brauchst also keinen Praxistermin, der sich mit dem Dienstplan beißt. Enthalten ist sie im Online Coaching ab 150€ im Monat, zusammen mit meinem Trainingsplan und wöchentlichen Check-ins. Wer in Holweide zusätzlich 1-zu-1 trainieren will, nimmt Stunden zu 50€ dazu, zu Hause oder draußen, etwa in der angrenzenden Merheimer Heide. Der Einstieg ist ein kostenloses Erstgespräch mit Natalie und mir.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Holweide?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, zusammen mit Trainingsplan per App und wöchentlichen Check-ins. Für das Erstgespräch zahlst du nichts.",
      },
      {
        q: "Ich arbeite in Wechselschicht am Krankenhaus. Funktioniert ein Ernährungsplan überhaupt?",
        a: "Ja, wenn er dafür gebaut ist. Natalie plant über 24 Stunden statt über den Kalendertag und legt die Mahlzeiten um deine Dienste. Gemessen wird am Wochenschnitt, nicht am einzelnen Tag.",
      },
      {
        q: "Wer macht die Beratung?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie betreut die Ernährungsseite, ich das Training, und beide Pläne greifen ineinander.",
      },
      {
        q: "Muss ich dafür irgendwo hinfahren?",
        a: "Nein, die Beratung läuft komplett online per Video und App. Gerade bei wechselnden Diensten ist das der Punkt, der sie durchhaltbar macht.",
      },
      {
        q: "Hilft Natalie auch bei medizinischen Ernährungsthemen?",
        a: "Nein. Ihr Bereich ist Sport- und Fitnessernährung für gesunde Erwachsene. Alles Medizinische gehört in ärztliche Hände, und das sagen wir dir im Erstgespräch offen.",
      },
    ],
  },

  "poll/personal-training": {
    answer:
      "Personal Training in Köln-Poll: 1-zu-1 bei dir zu Hause in Alt-Poll, draußen auf den Poller Wiesen oder im Studio, mit Plan und festen Terminen. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Poll: 1-zu-1 zu Hause, auf den Poller Wiesen oder im Studio, Termine die zur Pendlerwoche passen. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Poll ist näher an deinem Feierabend als jedes Studio",
        body: "11.184 Menschen leben in Poll, viele davon arbeiten gleich nebenan in Deutz oder auf der anderen Rheinseite in der Innenstadt. Auf dem Papier ist der Weg ins Fitnessstudio kurz, in der Praxis kommt er nach Büro, Bahn und Einkauf trotzdem selten noch zustande. Deshalb drehe ich die Richtung um: das Training wartet bei dir in Poll, wenn du nach Hause kommst. Fester Termin, Material bringe ich mit, und nach 60 Minuten ist der Abend wieder deiner.",
      },
      {
        title: "Wiesen, Rheinufer, Wohnzimmer: drei Orte, ein Plan",
        body: "Mit den Poller Wiesen liegt eine der größten freien Flächen Kölns direkt vor deiner Tür: dort machen wir Technik-Arbeit, Zirkel und die Ausdauerbausteine, mit Blick auf den Dom statt auf einen Bildschirm. Das Rheinufer Richtung Südbrücke liefert die flache Laufstrecke dazu. Und an nassen Tagen reicht dein Wohnzimmer: Kurzhanteln, Bänder und Übungsauswahl passen sich dem Platz an, die Progression läuft weiter wie geplant.",
      },
      {
        title: "Krafttraining als Fundament, dein Ziel als Richtung",
        body: "Ob du abnehmen willst, Muskeln aufbauen oder nach Jahren Schreibtisch einfach wieder belastbar werden: wir starten mit einem Technik-Check der Grundmuster, Kniebeuge, Heben, Drücken, Ziehen. Danach stehen meist zwei Einheiten pro Woche mit sauberer Steigerung über Last, Wiederholungen und Tempo. Jede Einheit wird notiert. Alle vier bis sechs Wochen vergleichen wir Kraftwerte, Umfänge und Wochengewicht, und der Plan wird an das angepasst, was die Zahlen sagen.",
      },
      {
        title: "Was es kostet und wie es anfängt",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App, Ernährungssteuerung durch Natalie und wöchentlichen Check-ins beginnt bei 150€ im Monat. Viele in Poll kombinieren beides: zwei betreute Einheiten im Monat, dazwischen der Plan aus der App. Den Anfang macht ein kostenloses Erstgespräch über Ziel, Woche und Trainingsort, telefonisch oder per Video. Danach entscheidest du, ob es passt.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Poll?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch kostet nichts und verpflichtet zu nichts.",
      },
      {
        q: "Wo trainieren wir in Poll?",
        a: "Bei dir zu Hause mit mitgebrachtem Material, draußen auf den Poller Wiesen und am Rheinufer, oder im Studio, wenn du an die Langhantel willst. Den Mix legen wir nach deinem Ziel fest.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Ist 1-zu-1 nicht zu viel?",
        a: "Im Gegenteil, genau dafür ist es da: die Last beginnt dort, wo du heute stehst, und steigt erst, wenn die Technik sitzt. Niemand schaut zu, niemand wartet aufs Gerät.",
      },
      {
        q: "Wie viele Einheiten pro Woche brauche ich?",
        a: "Zwei geführte Einheiten reichen für sichtbaren Fortschritt, wenn sie geplant sind. Für die Tage dazwischen bekommst du kurze Programme von 15 bis 20 Minuten ohne Geräte.",
      },
      {
        q: "Geht auch Ernährungsberatung dazu?",
        a: "Ja. Im Online Coaching übernimmt Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, die Ernährungsseite: Kalorienziel, Wochenplan und Check-ins, komplett online.",
      },
    ],
  },

  "deutz/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Deutz heißt bei uns: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, bringt Struktur in Bürotage zwischen Messe, Bahnhof und Mittagsimbiss, komplett online. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Deutz mit Natalie: klare Regeln für Kantine, Mittagsimbiss und Bürotage, Kalorien- und Eiweißziel aufs Training abgestimmt. Erstgespräch kostenlos.",
    sections: [
      {
        title: "In Deutz wird mittags entschieden, nicht abends",
        body: "Deutz ist mit Messe, Bahnhof und den Büros rund um den Rheinboulevard einer der großen Arbeitsorte der Stadt, und genau das prägt das Essverhalten: gefrühstückt wird schnell, die Hauptentscheidung fällt mittags zwischen Kantine, Imbiss und Bäcker. Standardpläne mit frisch gekochtem Mittagessen gehen daran vorbei. Natalie setzt deshalb genau dort an, wo dein Tag wirklich stattfindet: mit klaren, einfachen Regeln für das Essen unterwegs statt mit Rezepten, die ein Homeoffice voraussetzen.",
      },
      {
        title: "Kantine und Imbiss sind kein Problem, fehlende Regeln sind eins",
        body: "Du musst in Deutz nicht mit der Tupperdose zur Arbeit, damit ein Plan funktioniert. Natalie gibt dir für die üblichen Optionen feste Entscheidungsregeln an die Hand: welche Kombination in der Kantine dein Eiweißziel trifft, was beim Bäcker die bessere Wahl ist, wie ein Messetag mit Catering nicht automatisch zum Ausnahmetag wird. Die Regeln sind bewusst wenige, dafür überall anwendbar, auch in Wochen voller Termine.",
      },
      {
        title: "Ein Ziel in Zahlen, kontrolliert im Wochenschnitt",
        body: "Am Anfang stehen dein Kalorienziel und die Eiweißmenge, abgestimmt auf Training und Ziel, ob Abnehmen oder Muskelaufbau. Danach zählt der Trend: Gewicht im Wochenschnitt, Umfänge, alle paar Wochen der Blick auf die Zahlen und die Anpassung. Ein einzelnes Geschäftsessen kippt dabei nichts, es ist eingerechnet. Was verschwindet, ist das Pendeln zwischen strenger Woche und verlorenem Wochenende, das die meisten Versuche in Bürovierteln scheitern lässt.",
      },
      {
        title: "Beratung per Video, Bewegung direkt vor der Tür",
        body: "Die Beratung läuft online, per Video-Gespräch und App, und passt damit auch in eine Mittagspause im Büro. Sie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit meinem Trainingsplan und wöchentlichen Check-ins. Wer das Training 1-zu-1 dazunehmen will, hat in Deutz kurze Wege: Einheiten im Rheinpark, am Rheinboulevard oder bei dir zu Hause, die Stunde zu 50€. Der erste Schritt ist ein kostenloses Erstgespräch mit uns beiden.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Deutz?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich esse mittags fast immer auswärts. Lässt sich damit arbeiten?",
        a: "Ja, das ist in Deutz der Normalfall. Natalie baut den Plan um Kantine, Imbiss und Bäcker herum, mit festen Entscheidungsregeln statt Kochpflicht.",
      },
      {
        q: "Wer berät mich?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Training und Ernährung kommen so aus einer Hand: sie steuert das Essen, ich das Training.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Die ersten zwei Wochen zeigen meist Bewegung auf der Waage, belastbar wird der Trend nach vier bis sechs Wochen im Wochenschnitt. Dann wird nachjustiert, nicht vorher.",
      },
      {
        q: "Macht ihr auch Ernährungstherapie bei Erkrankungen?",
        a: "Nein. Natalies Schwerpunkt ist Sport- und Fitnessernährung für gesunde Erwachsene. Medizinische Fragen gehören in ärztliche Hände, das sagen wir im Erstgespräch klar.",
      },
    ],
  },

  "muelheim/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Mülheim heißt bei uns: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, baut dir einen Plan, in den auch der Abend auf der Keupstraße hineinpasst, komplett online. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Mülheim mit Natalie: Plan mit Budget für Keupstraße und Familienessen, Eiweißziel aufs Training abgestimmt, online. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Mülheim isst gut, und das soll so bleiben",
        body: "43.296 Menschen leben in Mülheim, und kaum ein Veedel hat mehr Esskultur auf der Straße: die Keupstraße mit ihren Restaurants und Bäckereien, die Lokale rund um den Wiener Platz, dazu Familientische, an denen niemand nach Kalorien fragt. Eine Beratung, die hier mit Verbotslisten anrückt, verliert in der ersten Woche. Natalie arbeitet deshalb mit einem Budget statt mit Verboten: das Essen im Veedel bleibt, es bekommt nur einen festen Platz im Wochenplan.",
      },
      {
        title: "Auswärts essen mit Plan statt mit schlechtem Gewissen",
        body: "Der Kern ist ein Kalorien- und Eiweißziel, das zu deinem Training passt, und eine einfache Logik für den Restauranttisch: Eiweiß zuerst, Beilagen nach Ziel, und der Rest der Woche fängt den Abend auf. So übersteht der Plan ein Essen auf der Keupstraße genauso wie das Familienfest am Sonntag. Gemessen wird am Wochenschnitt auf der Waage und an den Umfängen, nicht am einzelnen Tag, und alle paar Wochen stellt Natalie anhand der Zahlen nach.",
      },
      {
        title: "Gekocht wird einmal, nicht doppelt",
        body: "Viele Anfragen aus Mülheim kommen aus Haushalten, in denen mehrere Generationen oder Geschmäcker am selben Tisch sitzen. Das zweite Kochen nur für den eigenen Plan hält niemand durch, also plant Natalie andersherum: ein Gericht für alle, deine Portion und deine Eiweißquelle angepasst, dazu eine Einkaufsliste, die zum Wochenmarkt am Wiener Platz genauso passt wie zum Supermarkt. Entschieden wird beim Planen, nicht abends vor dem offenen Kühlschrank.",
      },
      {
        title: "Online-Beratung, Training auf Wunsch dazu",
        body: "Die Beratung läuft per Video und App und ist Teil des Online Coachings ab 150€ im Monat, zusammen mit meinem Trainingsplan und wöchentlichen Check-ins. Wer auf der Schäl Sick auch 1-zu-1 trainieren will, nimmt Stunden zu 50€ dazu: zu Hause, im Studio oder draußen am Rheinufer in Mülheim. Der Einstieg ist ein kostenloses Erstgespräch, in dem du Natalie und mich kennenlernst und wir deinen Alltag durchgehen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Mülheim?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, zusammen mit Trainingsplan per App und wöchentlichen Check-ins. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Muss ich auf das Essen auf der Keupstraße verzichten?",
        a: "Nein. Der Plan arbeitet mit einem Budget: das Essen im Veedel ist eingeplant, nicht verboten. Entscheidend ist der Wochenschnitt, nicht der einzelne Abend.",
      },
      {
        q: "Wer macht die Beratung bei FitPrimo?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie steuert die Ernährung, ich als Trainer das Training, abgestimmt aufeinander.",
      },
      {
        q: "Ich koche für die ganze Familie. Brauche ich einen Extraplan?",
        a: "Nein, das wäre der Fehler. Natalie plant ein Gericht für alle und passt nur deine Portion und deine Eiweißquelle an. So hält der Plan auch nach Wochen noch.",
      },
      {
        q: "Behandelt ihr auch Unverträglichkeiten oder Diabetes?",
        a: "Nein. Natalies Bereich ist Sport- und Fitnessernährung für gesunde Erwachsene. Medizinische Ernährungsfragen gehören in ärztliche Betreuung, das sagen wir dir offen.",
      },
    ],
  },
  "braunsfeld/personal-training": {
    answer:
      "Personal Training in Köln-Braunsfeld, geplant um deinen Arbeitstag: 1-zu-1 Einheiten vor oder nach dem Büro, bei dir zu Hause, im Studio oder draußen Richtung Stadtwald. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Braunsfeld: 1-zu-1 vor oder nach der Arbeit, zu Hause, im Studio oder am Stadtwald. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Viertel, das arbeitet und wohnt",
        body: "Braunsfeld hat zwei Gesichter: 12.362 Menschen wohnen hier auf 1,69 km², und tagsüber kommen die Beschäftigten aus den Büros rund um den TechnologiePark an der Eupener Straße dazu. Für beide Gruppen scheitert Training selten am Willen, sondern am Übergang: zwischen Feierabend und Abendessen ist kein Platz für eine Fahrt quer durch die Stadt. Deshalb lege ich die Einheiten dorthin, wo dein Tag ohnehin stattfindet, an die Wohnung oder ans Büro, als festen Termin mit Puffer statt als guten Vorsatz.",
      },
      {
        title: "Stadtwald vor der Tür, Langhantel im Studio",
        body: "Wenige Minuten südlich von Braunsfeld beginnt der Stadtwald, mit dem Lindenthaler Tierpark und Wegen, die lang genug für richtige Laufeinheiten sind. Dorthin verlege ich im Sommer Intervalle, Technikarbeit und Zirkel mit dem eigenen Körpergewicht. Die Kraftarbeit läuft drinnen: bei dir zu Hause mit mitgebrachten Kurzhanteln und Bändern oder im Studio an der Langhantel. Über die Aachener Straße mit der Linie 1 bist du schnell unterwegs, auch ohne Auto.",
      },
      {
        title: "Dein Plan rechnet mit vollen Wochen",
        body: "Die typische Braunsfelder Anfrage kommt von Berufstätigen zwischen 35 und 55: Verantwortung im Job, wenig Zeit, oft Jahre seit dem letzten regelmäßigen Sport. Dafür baue ich Pläne, die mit zwei geführten Stunden pro Woche auskommen und Dienstreisen überleben: kurze Ersatzeinheiten für das Hotelzimmer, klare Prioritäten, welche Einheit in einer vollen Woche zuerst fällt und welche nie. Fortschritt wird gemessen, an Kraftwerten und Wiederholungen, nicht am Gefühl nach einem guten Tag.",
      },
      {
        title: "Kosten und Einstieg in Braunsfeld",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App und wöchentlichem Check-in beginnt bei 150€ im Monat; für die Ernährung arbeitet Natalie mit, Ernährungsberaterin für Sport- und Fitnessernährung. Der Einstieg ist ein kostenloses Erstgespräch, gern in deiner Mittagspause: Ziel, Zeitbudget, Trainingsort. Danach entscheidest du ohne Druck.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Braunsfeld?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Kannst du vor der Arbeit trainieren?",
        a: "Ja. Frühtermine ab 6:30 Uhr sind in Braunsfeld gefragt und machbar, bei dir zu Hause oder draußen. Nach 60 Minuten sitzt du geduscht am Schreibtisch.",
      },
      {
        q: "Wo trainieren wir in Braunsfeld?",
        a: "Je nach Ziel: Kraft bei dir zu Hause oder im Studio, Ausdauer und Zirkel im Stadtwald ein paar Minuten südlich. Viele kombinieren beides in einer Woche.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Bin ich hier richtig?",
        a: "Genau dafür ist 1-zu-1 Training da. Wir starten mit einem Check von Beweglichkeit und Kraft und bauen von dort auf, ohne Vergleich mit anderen und ohne Studio-Publikum.",
      },
      {
        q: "Reichen zwei Einheiten pro Woche?",
        a: "Für die meisten Ziele ja, wenn sie geplant sind und du dich zwischen den Terminen etwas bewegst. Mehr Volumen bauen wir erst ein, wenn zwei Einheiten stabil im Kalender stehen.",
      },
    ],
  },

  "neubrueck/rueckentraining": {
    answer:
      "Rückentraining in Köln-Neubrück: zweimal pro Woche Kraftaufbau für Rumpf, Hüfte und hintere Kette, bei dir zu Hause in der Siedlung, dazu der Königsforst direkt vor der Tür für den Bewegungsausgleich. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos. Akute oder ausstrahlende Schmerzen klärt zuerst ein Arzt.",
    metaDescription:
      "Rückentraining in Köln-Neubrück: Kraft für Rumpf und hintere Kette, Training zu Hause, Ausgleich im Königsforst nebenan. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Neubrück sitzt im Auto und im Büro",
        body: "Neubrück ist als Siedlung der 1960er Jahre geplant worden: 8.342 Menschen auf gut einem Quadratkilometer, viel Grün zwischen den Wohnzeilen, und fast alles Weitere liegt außerhalb. Wer hier wohnt, pendelt, oft mit dem Auto über die A3 oder die Olpener Straße, und verbringt den Tag sitzend. Autositz plus Bürostuhl plus Sofa ergibt zehn bis zwölf Stunden in derselben gebeugten Haltung, und der untere Rücken ist meist die Stelle, die zuerst protestiert.",
      },
      {
        title: "Die Hüfte trainieren, nicht nur den Rücken",
        body: "Bei Vielsitzern aus dem Autopendel-Alltag arbeite ich stärker an Hüfte und hinterer Kette als am Rücken selbst: verkürzte Hüftbeuger und schwaches Gesäß zwingen die Lendenwirbelsäule in Arbeit, für die sie nicht gebaut ist. Im Training heißt das Hüftstrecken unter Last, Beinrückseite kräftigen, Rumpf gegen Rotation stabilisieren. Das geht vollständig bei dir zu Hause, mit Material, das ich mitbringe, ein freier Platz im Wohnzimmer reicht.",
      },
      {
        title: "Der Königsforst ist dein Ausgleichsprogramm",
        body: "Neubrück hat einen Vorteil, den kaum ein Kölner Veedel bietet: Am östlichen Rand beginnt der Königsforst, einer der größten Wälder der Stadt, mit breiten, ebenen Wegen auf weichem Boden. Zwischen den beiden Krafteinheiten gehört er fest in deinen Plan, zügiges Gehen, 30 bis 40 Minuten, bei jedem Wetter. Diese einfache, regelmäßige Bewegung nimmt dem Sitztag mehr Druck vom Rücken als jede einzelne Übung, und du musst dafür nicht einmal die Straße überqueren.",
      },
      {
        title: "Ablauf, Grenzen, Kosten",
        body: "Vor dem ersten Training steht ein kostenloses Gespräch über Vorgeschichte, Alltag und Ziel. Plötzliche, heftige oder ins Bein ausstrahlende Schmerzen gehören zuerst zum Arzt; mit Freigabe trainieren wir danach gezielt weiter und wählen die Übungen nach Befund. Die 1-zu-1 Stunde kostet 50€, die Begleitung per App mit Plan und wöchentlichem Check-in beginnt bei 150€ im Monat. Die meisten spüren nach einigen Wochen, dass der Arbeitstag weniger nachhängt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Neubrück?",
        a: "Die 1-zu-1 Stunde kostet 50€, Online-Begleitung mit Plan per App ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich dafür in ein Studio fahren?",
        a: "Nein. In Neubrück trainiere ich fast alle Kunden zu Hause, das Material bringe ich mit. Wer später mehr Last will, kann Einheiten im Studio in Köln ergänzen, muss aber nicht.",
      },
      {
        q: "Ich sitze täglich über eine Stunde im Auto. Was bringt Training dagegen?",
        a: "Viel, wenn es die richtigen Stellen trifft: Hüftbeuger lang, Gesäß und Beinrückseite stark, Rumpf stabil. Dazu regelmäßiges zügiges Gehen im Königsforst. Die Kombination entlastet die Lendenwirbelsäule spürbar.",
      },
      {
        q: "Reicht Spazierengehen im Königsforst nicht aus?",
        a: "Gehen ist der beste Ausgleich, baut aber keine Kraft auf. Ein Rücken, der lange Sitztage wegstecken soll, braucht beides: zwei Krafteinheiten pro Woche und dazwischen die Bewegung im Wald.",
      },
      {
        q: "Wie schnell lassen die Beschwerden nach?",
        a: "Unspezifische Beschwerden vom Sitzen bessern sich oft innerhalb von vier bis acht Wochen regelmäßigen Trainings. Ein Versprechen gibt es nicht; gemessen wird der Fortschritt über Kraftwerte und darüber, wie sich lange Tage anfühlen.",
      },
    ],
  },

  "ehrenfeld/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Ehrenfeld heißt bei uns: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, baut dir einen Plan für Tage ohne festen Rhythmus, vom späten Frühstück im Café bis zum Abend auf der Venloer Straße, komplett online. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Ehrenfeld mit Natalie: Pläne für unregelmäßige Tage, auch vegetarisch oder vegan, komplett online. Ab 150€/Monat im Coaching, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Veedel ohne Kantinenrhythmus",
        body: "In Ehrenfeld leben 38.405 Menschen auf 3,71 km², und auffällig viele davon arbeiten ohne feste Essenszeiten: Selbstständige, Schichtler, Leute im Homeoffice zwischen Küche und Schreibtisch. Der Tag startet mit Kaffee, die erste richtige Mahlzeit kommt irgendwann nachmittags, abends wird es dann viel. Genau dieses Muster ist der häufigste Grund, warum das Gewicht steht oder das Training nichts bringt. Natalie plant nicht gegen deinen Tag, sondern mit ihm: wenige feste Ankerpunkte, der Rest flexibel.",
      },
      {
        title: "Venloer Straße inklusive",
        body: "Zwischen Ehrenfeldgürtel und Innerer Kanalstraße reiht sich eine Küche an die andere, und niemand zieht hierher, um jeden Abend Reis mit Brokkoli zu essen. Deshalb arbeitet Natalie mit einem Wochenbudget statt mit Verboten: Die Abende im Veedel sind eingeplant, davor und danach gleicht der Plan aus. Du lernst, Gerichte grob einzuschätzen, statt jede Zutat zu wiegen. Das hält länger als jede Diät, weil es dein Leben nicht umbaut, sondern ordnet.",
      },
      {
        title: "Vegetarisch und vegan mit genug Eiweiß",
        body: "Kaum ein Kölner Veedel isst so oft fleischfrei wie Ehrenfeld. Das ist fürs Abnehmen kein Problem, fürs Training schon eher: Ohne Plan landet man vegetarisch schnell bei zu wenig Eiweiß, und der Muskel hat im Defizit nichts zu verteidigen. Natalie rechnet deinen Eiweiß-Zielwert aus und zeigt dir, wie du ihn mit Hülsenfrüchten, Milchprodukten oder komplett pflanzlich erreichst. Keine Pulver-Pflicht, aber ehrliche Zahlen.",
      },
      {
        title: "Beratung online, Training im Grüngürtel dazu",
        body: "Die Beratung läuft per Video und App: Anamnese, Wochenplan, dann kurze Check-ins, in denen Natalie nachsteuert. Wer Bewegung dazunehmen will, kombiniert sie mit Training bei mir, im Studio oder draußen im Inneren Grüngürtel, der direkt am Veedel liegt. Das Online Coaching ab 150€ im Monat enthält beides: Trainingsplan von mir, Ernährungssteuerung von Natalie. Das Erstgespräch kostet nichts.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Ehrenfeld?",
        a: "Die Beratung durch Natalie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit dem Trainingsplan. Das Erstgespräch ist kostenlos und klärt, ob das Format zu dir passt.",
      },
      {
        q: "Funktioniert der Plan auch vegetarisch oder vegan?",
        a: "Ja. Natalie hat den Schwerpunkt Sport- und Fitnessernährung und plant fleischfreie Ernährung regelmäßig. Wichtig ist der Eiweiß-Zielwert, und der lässt sich auch rein pflanzlich erreichen.",
      },
      {
        q: "Ich esse oft auswärts. Macht das die Beratung sinnlos?",
        a: "Nein, es macht sie nötig. Der Plan arbeitet mit einem Wochenbudget: Abende im Veedel sind eingeplant, die Tage drumherum gleichen aus. Verzicht auf dein soziales Leben ist keine Strategie, die hält.",
      },
      {
        q: "Muss ich dafür irgendwo hinkommen?",
        a: "Nein, die Beratung läuft komplett online per Video und App. Wenn du Training dazunehmen willst, trainieren wir im Studio oder draußen, zum Beispiel im Inneren Grüngürtel.",
      },
      {
        q: "Stellt Natalie Diagnosen oder behandelt Unverträglichkeiten?",
        a: "Nein. Medizinische Fragen gehören zum Arzt. Natalie arbeitet an Sport- und Alltagsernährung: Kalorien, Makros, Wochenstruktur und ein Plan, den du durchhalten kannst.",
      },
    ],
  },

  "suerth/abnehmen": {
    answer:
      "Abnehmen in Köln-Sürth plane ich über den Wochenschnitt: ein Kalorienziel, das Familienessen und Pendeltage übersteht, zwei Krafteinheiten pro Woche bei dir zu Hause oder im Studio, feste Geh-Kilometer am Rheinufer. Realistisch ist ein halbes bis ein Kilo Fett pro Woche. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Sürth: Kalorienziel im Wochenschnitt, Krafttraining zu Hause oder im Studio, feste Kilometer am Rheinufer. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Woran Abnehmen in Sürth wirklich scheitert",
        body: "Sürth ist ein Familien- und Pendlerstadtteil: 11.033 Einwohner, viele Häuser mit Garten, morgens die Linie 16 oder die A555 in die Stadt. Das Problem ist selten fehlendes Wissen, sondern der Tagesablauf. Mittags isst man unterwegs oder in der Kantine, abends sitzt die Familie am Tisch, und am Wochenende kommen Besuch und Ausflüge dazu. Ein Plan, der jeden Tag gleich aussieht, zerbricht daran in zwei Wochen. Deshalb rechne ich dein Defizit über die Woche, nicht über den einzelnen Tag.",
      },
      {
        title: "Der Rheinuferweg ist dein Grundumsatz-Hebel",
        body: "Zwischen Rodenkirchen und der Godorfer Grenze liegt ein langes, flaches Stück Rheinufer, und es ist der unterschätzte Teil jedes Abnehmplans in Sürth. Nicht als Sport, sondern als Sockel: feste Kilometer, die jede Woche stehen, bei jedem Wetter. Diese Alltagsbewegung verbrennt übers Jahr mehr als jede einzelne Trainingseinheit und kostet keine Willenskraft, sobald sie Gewohnheit ist. Im Plan steht sie deshalb genauso verbindlich wie das Krafttraining.",
      },
      {
        title: "Krafttraining, damit nur Fett verschwindet",
        body: "Wer nur weniger isst, verliert Muskeln mit, und genau die halten den Verbrauch hoch. Deshalb gehören zwei Krafteinheiten pro Woche in den Plan: bei dir zu Hause mit mitgebrachtem Material oder im Studio an der Langhantel. Gewichte und Wiederholungen werden notiert, alle vier Wochen schauen wir auf Waage, Umfänge und Kraftwerte zusammen. Sinkt das Gewicht bei stabilen Kraftwerten, verschwindet Fett und nicht Muskel. Das ist der ganze Trick, und er ist messbar.",
      },
      {
        title: "Essen plant Natalie mit dir, wenn du willst",
        body: "Für die Ernährungsseite arbeite ich mit Natalie, unserer Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie legt dein Kalorienziel fest und baut den Familientisch ein, statt dich davon auszuschließen: gleiche Gerichte, angepasste Portionen. Die Beratung läuft online und ist im Online Coaching ab 150€ im Monat enthalten. Wer nur trainieren will, bekommt von mir die Leitplanken, ohne eigenen Ernährungsplan.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Coaching in Köln-Sürth?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan und Ernährungssteuerung durch Natalie beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wie viel kann ich realistisch abnehmen?",
        a: "Ein halbes bis ein Kilo Fett pro Woche ist bei sauberem Defizit realistisch, am Anfang durch Wasser oft mehr. Wer dir deutlich mehr verspricht, redet über Muskel- und Wasserverlust.",
      },
      {
        q: "Muss ich dafür ins Fitnessstudio?",
        a: "Nein. Die Krafteinheiten gehen bei dir zu Hause mit mitgebrachtem Material. Wer schwerer trainieren will, kombiniert das mit dem Studio in Köln, viele machen eine Einheit dort und eine daheim.",
      },
      {
        q: "Abends isst die ganze Familie zusammen. Passt das in den Plan?",
        a: "Ja, das ist sogar die Grundlage. Natalie plant das Abendessen als festen Bestandteil und steuert über Portionen und den Rest des Tages. Getrennt kochen hält niemand durch.",
      },
      {
        q: "Zählt Spazierengehen am Rhein wirklich?",
        a: "Ja, mehr als die meisten denken. Feste Wochenkilometer am Rheinufer erhöhen deinen Verbrauch zuverlässig und ohne Erschöpfung. Abnehmen entscheidet sich im Alltag, das Training schützt dabei die Muskeln.",
      },
    ],
  },

  "deutz/rueckentraining": {
    answer:
      "Rückentraining in Köln-Deutz heißt gezielte Kraftarbeit gegen den Bildschirm-Tag: Nacken, Schulterblätter und Rumpf, zweimal pro Woche im Studio oder als kompakte Einheit nahe deinem Büro, dazu Rheinpark und Rheinboulevard für den täglichen Ausgleich. Die Stunde kostet 50€, das Erstgespräch ist kostenlos. Akute Schmerzen klärt zuerst ein Arzt.",
    metaDescription:
      "Rückentraining in Köln-Deutz: Kraft für Nacken, Schulterblätter und Rumpf gegen lange Bürotage, Ausgleich im Rheinpark. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Deutz arbeitet im Sitzen",
        body: "Zwischen Messe, Bahnhof und den Bürotürmen am Rheinufer verbringen jeden Tag Zehntausende acht Stunden am Bildschirm, dazu kommen die 15.644, die in Deutz wohnen und oft genauso sitzen: erst im Zug, dann im Büro. Das typische Ergebnis kenne ich aus den Erstgesprächen: verspannter Nacken, Ziehen zwischen den Schulterblättern, ein unterer Rücken, der sich nach langen Tagen steif anfühlt. Das ist in den meisten Fällen kein Schaden, sondern fehlende Kraft an den richtigen Stellen. Und die lässt sich aufbauen.",
      },
      {
        title: "Oben anfangen: Nacken und Schulterblätter",
        body: "Bildschirmarbeit zieht den Kopf nach vorn und die Schultern nach oben. Deshalb beginnt das Programm in Deutz meist oben: Rudervarianten, Face Pulls, kontrollierte Überkopf-Arbeit, dazu Übungen, die die Schulterblätter wieder führen lernen. Der Rumpf kommt in jeder Einheit dazu, denn ein stabiler Rumpf nimmt dem Nacken Arbeit ab. Gedehnt wird ergänzend, aber Dehnen allein hält keinen Acht-Stunden-Tag aus, das schafft nur Kraft.",
      },
      {
        title: "Training, das in einen Messetag passt",
        body: "Wer in Deutz arbeitet, hat zwischen Terminen selten 90 Minuten übrig. Deshalb plane ich hier kompakte Einheiten: 60 Minuten von Tür zu Tür, mittags oder direkt nach Feierabend, im Studio oder draußen. Für den Ausgleich zwischen den Einheiten liegt das Beste direkt vor der Tür: der Rheinpark für zügige Runden, die Treppen am Rheinboulevard für kurze Belastungen, die den Kreislauf hochziehen, ohne Sportzeug zu brauchen. Zehn Minuten am Tag verändern lange Sitzwochen spürbar.",
      },
      {
        title: "Grenzen, Ablauf, Kosten",
        body: "Bei akuten, ausstrahlenden oder nächtlichen Schmerzen gehört der erste Weg zum Arzt, nicht zu mir. Trainiert wird, was ärztlich unbedenklich ist. Wir starten mit einem Check von Haltung, Beweglichkeit und Kraft, dann stehen zwei Einheiten pro Woche mit dokumentierten Gewichten. Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Deutz?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos und klärt, welcher Einstieg für deinen Rücken passt.",
      },
      {
        q: "Hilft Krafttraining überhaupt gegen Nackenverspannungen?",
        a: "Bei Verspannungen durch Bildschirmarbeit ja: Kräftigung von oberem Rücken und Schulterblatt-Muskulatur reduziert die Dauerspannung im Nacken. Massagen lindern kurzfristig, Kraft verändert die Ursache.",
      },
      {
        q: "Ich arbeite an der Messe und habe nur die Mittagspause. Reicht das?",
        a: "Ja, wenn der Ablauf steht: 60 Minuten von Tür zu Tür, zwei Mal pro Woche. Dazu kommen kurze tägliche Ausgleichsminuten, zum Beispiel eine zügige Runde durch den Rheinpark.",
      },
      {
        q: "Soll ich mit Schmerzen trainieren?",
        a: "Nein. Akute, ausstrahlende oder nachts auftretende Schmerzen klärt zuerst ein Arzt. Danach bauen wir auf, was freigegeben ist. Unspezifische Steifheit nach Sitztagen ist dagegen genau das, wofür das Training da ist.",
      },
      {
        q: "Wie lange dauert es, bis sich etwas verbessert?",
        a: "Die meisten spüren nach vier bis acht Wochen regelmäßigen Trainings den Unterschied an langen Bürotagen. Gemessen wird trotzdem: Kraftwerte und Haltung sagen mehr als das Tagesgefühl.",
      },
    ],
  },

  "merheim/abnehmen": {
    answer:
      "Abnehmen in Köln-Merheim baue ich auf drei Dinge: ein Kalorienziel, das auch Schichtwochen übersteht, zwei Krafteinheiten pro Woche bei dir zu Hause oder im Studio, und die Merheimer Heide vor der Tür als tägliche Bewegungsfläche. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Merheim: Kalorienziel auch für Schichtdienst, Krafttraining zu Hause, tägliche Runden in der Merheimer Heide. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Die Merheimer Heide ist dein wichtigstes Abnehm-Gerät",
        body: "Merheim hat 11.354 Einwohner und direkt am Stadtteil eine der größten freien Grünflächen des Kölner Ostens: die Merheimer Heide. Fürs Abnehmen ist das Gold wert, denn der größte Teil deines Kalorienverbrauchs entsteht nicht im Training, sondern in der Alltagsbewegung. Eine feste Runde durch die Heide, vier bis fünf Mal pro Woche, hebt deinen Verbrauch zuverlässiger als jede zusätzliche Schwitzeinheit. Im Plan bekommt sie deshalb einen festen Platz, mit Kilometern statt guter Vorsätze.",
      },
      {
        title: "Ein Plan, der mit dem Dienstplan lebt",
        body: "Mit den Kliniken der Stadt Köln steht in Merheim einer der großen Arbeitgeber des Rechtsrheinischen, und viele Anfragen von hier kommen aus Pflege und Klinikbetrieb: Wechselschichten, Essen zu wechselnden Zeiten, Schlaf, der mal reicht und mal nicht. Ein starrer Diätplan scheitert daran sofort. Deshalb bekommt jede Woche ein Kalorienbudget statt fester Mahlzeiten-Uhrzeiten, und die Trainingstermine wandern mit dem Dienstplan. Abnehmen funktioniert auch in Schichten, es braucht nur eine Struktur, die sich mitbewegt.",
      },
      {
        title: "Muskeln behalten, Fett verlieren",
        body: "Im Kaloriendefizit entscheidet das Krafttraining darüber, was dein Körper abbaut. Ohne Widerstand verschwinden Muskeln mit, und mit ihnen sinkt der Verbrauch, der Jojo ist dann eingebaut. Zwei Einheiten pro Woche reichen: bei dir zu Hause mit mitgebrachten Kurzhanteln und Bändern oder im Studio an der Langhantel. Ich dokumentiere Gewichte und Wiederholungen und kontrolliere alle vier Wochen Waage, Umfänge und Kraftwerte. So siehst du, dass die richtige Masse verschwindet.",
      },
      {
        title: "Zahlen von Natalie, wenn du die Ernährung mitlösen willst",
        body: "Dein Kalorienziel und die Eiweißmenge legt auf Wunsch Natalie fest, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie plant online, per Video und App, und steuert in kurzen Check-ins nach, wenn das Gewicht stehen bleibt. Im Online Coaching ab 150€ im Monat sind Trainingsplan und Ernährungssteuerung zusammen enthalten. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist in beiden Fällen kostenlos.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Coaching in Köln-Merheim?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan und Ernährungssteuerung durch Natalie beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich arbeite im Schichtdienst an der Klinik. Funktioniert das trotzdem?",
        a: "Ja. Der Plan arbeitet mit einem Wochenbudget an Kalorien statt mit festen Essenszeiten, und die Trainingstermine lege ich um deinen Dienstplan. Viele meiner Kunden aus Merheim arbeiten in Schichten.",
      },
      {
        q: "Wie schnell nehme ich ab?",
        a: "Realistisch sind ein halbes bis ein Kilo Fett pro Woche, in der ersten Zeit durch Wasser oft mehr. Schnellere Versprechen gehen auf Kosten von Muskeln, und das rächt sich nach der Diät.",
      },
      {
        q: "Reichen Runden in der Merheimer Heide nicht aus?",
        a: "Gehen hebt den Verbrauch und ist der wichtigste Alltagsbaustein, aber es schützt die Muskeln im Defizit nicht. Erst die Kombination aus Defizit, Gehen und zwei Krafteinheiten pro Woche nimmt gezielt Fett ab.",
      },
      {
        q: "Muss ich für das Training irgendwo hinfahren?",
        a: "Nein. Ich komme mit dem Material zu dir nach Merheim, trainiert wird im Wohnzimmer, im Hof oder draußen an der Heide. Wer schwerer trainieren will, nimmt das Studio in Köln dazu.",
      },
    ],
  },

  "muelheim/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Mülheim nach Wettkampf-Prinzipien: Grundübungen an der Langhantel, dokumentierte Steigerung von Woche zu Woche und ein Eiweiß-Zielwert fürs Essen. Zwei Einheiten pro Woche reichen, eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau mit Personal Trainer in Köln-Mülheim: Langhantel-Grundübungen, dokumentierte Progression, Eiweiß-Zielwert. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Muskelaufbau ist ein Projekt über Monate",
        body: "Sichtbare Muskulatur entsteht nicht in vier Wochen, sondern über eine Aufbauphase von sechs bis zwölf Monaten. Ich sage das im Erstgespräch so deutlich, weil die meisten Abbrüche nicht an der Motivation scheitern, sondern an falschen Erwartungen. Als Wettkampfathlet im WABBA-Verband baue ich deinen Plan so, wie ich meine eigenen Aufbauphasen plane: wenige Grundübungen, saubere Technik, Gewichte, die nach Protokoll steigen. Was nicht notiert ist, ist nicht passiert.",
      },
      {
        title: "Training, das an deinem Mülheimer Tag andockt",
        body: "Mülheim ist mit über 43.000 Einwohnern das größte Veedel Kölns, und ein wachsender Teil davon arbeitet rund um das Carlswerk an der Schanzenstraße, zwischen Agenturen, Werkstätten und Bühnen. Für den Muskelaufbau ist das ein Vorteil: Die Krafteinheiten liegen im Studio, und ich lege die Termine an den Rand deines Arbeitstags, früh vor dem ersten Termin oder direkt nach Feierabend. Zwei feste Slots pro Woche, die so geplant sind, dass sie auch in vollen Wochen stehen bleiben.",
      },
      {
        title: "Ohne Essen wächst nichts: der Eiweiß-Zielwert",
        body: "Muskeln entstehen aus Reiz plus Material. Das Material heißt Eiweiß, und dein Zielwert hängt an deinem Körpergewicht, nicht an Gefühl oder Shakes. Ein leichter Kalorienüberschuss gehört dazu, die alte Masse-Logik mit Pizza und Pommes nicht: Was du in einer schlampigen Aufbauphase an Fett ansammelst, musst du später wieder abtrainieren. Wer beim Essen Struktur will, bekommt sie von Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung.",
      },
      {
        title: "Woran du merkst, dass es funktioniert",
        body: "Nicht am Spiegel nach zwei Wochen, sondern an den Zahlen: mehr Gewicht auf der Langhantel bei gleicher Technik, mehr Wiederholungen bei gleichem Gewicht, wachsende Umfänge an Arm, Brust und Bein. Ich messe alle vier Wochen nach und passe den Plan an, wenn eine Zahl stehen bleibt. So trainierst du nie monatelang an einem Plateau vorbei, das man mit einer Umstellung in zwei Wochen lösen kann.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Coaching in Köln-Mülheim?",
        a: "Die 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Trainingsplan per App, Eiweiß-Zielwert und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wie lange dauert es, bis man Muskelaufbau sieht?",
        a: "Kraftwerte steigen ab der ersten Woche, sichtbare Veränderungen brauchen bei sauberem Training und passendem Essen meist drei bis vier Monate. Nach sechs bis zwölf Monaten sprechen wir über eine andere Statur, nicht über Details.",
      },
      {
        q: "Reichen zwei Einheiten pro Woche für Muskelaufbau?",
        a: "Ja, wenn sie geplant sind. Zwei Ganzkörper-Einheiten mit Grundübungen und dokumentierter Steigerung schlagen vier planlose Studiobesuche. Mehr Volumen bauen wir erst ein, wenn dein Fortschritt es verlangt.",
      },
      {
        q: "Brauche ich dafür ein Fitnessstudio in Mülheim?",
        a: "Die schweren Langhantel-Einheiten laufen im Studio im Rahmen deiner Stunde. Ergänzende Einheiten mit Kurzhanteln und Bändern sind bei dir zu Hause möglich, viele kombinieren beides.",
      },
      {
        q: "Funktioniert Muskelaufbau auch ab 40?",
        a: "Ja. Der Aufbau läuft etwas langsamer und die Regeneration braucht mehr Beachtung, deshalb zählen Technik und Planung ab 40 doppelt. Genau dafür ist ein geführtes Programm da.",
      },
    ],
  },

  "suelz/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Sülz nutzt den Äußeren Grüngürtel direkt vor der Tür: Sprints und Richtungswechsel auf den Wiesen des Beethovenparks, lange Intervalle auf der flachen Runde am Decksteiner Weiher, Kraft und Sprungkraft im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Sülz: Sprints im Beethovenpark, Intervalle am Decksteiner Weiher, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Dicht bebautes Veedel, offenes Gelände daneben",
        body: "In Sülz leben 36.851 Menschen auf gut fünf Quadratkilometern, eng bebaut bis an die Sülzburgstraße. Aber am westlichen Rand kippt das Veedel direkt in den Äußeren Grüngürtel: Beethovenpark, dahinter die Wiesen und Wege Richtung Decksteiner Weiher. Für Athletiktraining ist diese Kombination ideal, weil das Aufwärmen auf dem Weg dorthin passiert und du keine Anfahrt brauchst, die den Termin frisst.",
      },
      {
        title: "Beethovenpark und Decksteiner Weiher: zwei verschiedene Reize",
        body: "Die großen Wiesen im Beethovenpark nehmen wir für alles Kurze und Explosive: Antritte über 20 bis 60 Meter, Richtungswechsel, Sprungserien auf weichem Boden. Die Runde am Decksteiner Weiher ist flach und bei Kölner Läufern seit Jahrzehnten etabliert, dort laufen wir längere Intervalle und Testläufe unter gleichbleibenden Bedingungen. Zwei Orte, keine zehn Minuten auseinander, die zusammen fast das komplette Ausdauer- und Schnelligkeitsprogramm abdecken.",
      },
      {
        title: "Vom Technik-Check zum Plan in Zahlen",
        body: "Am Anfang steht ein Check von Sprinttechnik, Sprungkraft und Rumpfstabilität. Daraus entsteht ein Plan mit zwei Einheiten pro Woche: eine draußen im Grüngürtel, eine im Studio für Kraft und Plyometrie. Alle vier bis sechs Wochen wird nachgemessen, Sprintzeit und Sprunghöhe schwarz auf weiß. Bewegt sich eine Zahl nicht, ändere ich den Plan und nicht die Ausrede.",
      },
      {
        title: "Wer in Sülz dafür anfragt",
        body: "Sülz ist jung und sportlich: Studierende und Mitarbeiter der nahen Uni, Läuferinnen, die ihre Weiher-Runde schneller laufen wollen, Vereinsspieler aus Fußball, Handball und Tennis, die im Winter an Schnelligkeit und Stabilität arbeiten. Athletiktraining braucht keinen Wettkampfkalender, nur ein Ziel: schneller, stabiler, belastbarer werden. Das Einstiegsniveau legt der Check fest.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Sülz?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching mit Plan und Video-Check-ins ab 150€ im Monat. Das Erstgespräch ist kostenlos und klärt, welches Format zu deinem Ziel passt.",
      },
      {
        q: "Wo genau trainieren wir in Sülz?",
        a: "Im Beethovenpark für Sprints, Sprünge und Richtungswechsel, auf der Runde am Decksteiner Weiher für Intervalle und Testläufe, im Studio für Kraft. Treffpunkt ist meist am Parkrand, das Warm-up beginnt zu Fuß.",
      },
      {
        q: "Ich laufe schon regelmäßig. Was bringt mir Athletiktraining?",
        a: "Tempo entsteht nicht nur über Kilometer. Sprungkraft, Rumpfstabilität und Sprinttechnik machen dich effizienter, und genau die fehlen den meisten Läufern. Viele laufen nach acht bis zwölf Wochen dieselbe Runde spürbar schneller.",
      },
      {
        q: "Ist das auch ohne Vereinssport sinnvoll?",
        a: "Ja. Schnelligkeit, Stabilität und Belastbarkeit helfen im Alltag genauso wie im Sport. Die Übungen werden an dein Niveau angepasst, der Check am Anfang legt den Startpunkt fest.",
      },
    ],
  },

  "lind/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Lind läuft bei uns komplett online: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, plant deine Woche um den einen großen Einkauf herum, der im Dorf nun mal die Regel ist. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung für Köln-Lind mit Natalie: Wochenplan um den großen Einkauf, Vorrat statt Spontankauf, Eiweißziel aufs Training abgestimmt. Online, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Im Dorf entscheidet der Einkauf, nicht die Disziplin",
        body: "Lind ist mit 3.691 Einwohnern eines der kleinsten Veedel von Porz, und wer hier wohnt, kauft nicht spontan um die Ecke ein, sondern plant: einmal groß, mit dem Auto, meist Richtung Porz oder Wahn. Für die Ernährung ist das keine Schwäche, sondern ein Hebel. Ein Kühlschrank, der nach Plan gefüllt wurde, trifft die Abendentscheidung von Dienstag schon am Samstag. Natalie baut deine Woche genau um diesen Rhythmus herum, statt einen Großstadtplan über ein Dorf zu legen.",
      },
      {
        title: "Eine Einkaufsliste pro Woche, ein Vorrat, der trägt",
        body: "Der Kern der Beratung ist konkret: ein Kalorien- und Eiweißziel, das zu deinem Training passt, eine Einkaufsliste für den Wochenkauf und ein Vorrat aus Tiefkühlgemüse, Hülsenfrüchten und Eiweißquellen, der auch dann noch eine gute Mahlzeit hergibt, wenn der Plan der Woche längst gerissen ist. Gemessen wird am Wochenschnitt, nicht am einzelnen Tag, und nachjustiert wird alle paar Wochen anhand deiner Zahlen.",
      },
      {
        title: "Mahlzeiten, die das Pendeln überleben",
        body: "Von Lind aus wird gependelt, viele arbeiten am nahen Flughafen Köln/Bonn oder fahren über die A59 in die Stadt. Die kritischen Kalorien eines Pendlertags stecken selten im Mittagessen, sondern in dem, was unterwegs dazukommt: Tankstelle, Bäckertüte, Automat. Natalie plant deshalb Mahlzeiten, die sich vorbereiten und mitnehmen lassen, und setzt feste Essenszeiten, die zu deinen Arbeitszeiten passen, nicht zu einem Lehrbuch.",
      },
      {
        title: "Beratung am Bildschirm, Bewegung in der Heide",
        body: "Die Beratung läuft per Video, ohne Fahrt: Erstgespräch, Plan, dann regelmäßige Check-ins, bei denen Natalie anhand von Gewichtsverlauf und Umfängen nachsteuert. Wer Bewegung dazulegen will, hat in Lind die Wahner Heide am Ortsrand für feste Spaziergänge oder kombiniert die Beratung mit Training bei mir, zu Hause oder draußen. Pflicht ist das nicht: Die Ernährungsberatung steht auch allein.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Lind?",
        a: "Sie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Wie läuft die Beratung ab, wenn alles online ist?",
        a: "Erstgespräch per Video, danach bekommst du Wochenplan und Einkaufsliste. In den Check-ins schaut Natalie auf Gewichtsverlauf, Umfänge und deine Rückmeldungen und passt den Plan an. Du brauchst nur Handy oder Laptop.",
      },
      {
        q: "Muss ich jede Mahlzeit abwiegen und tracken?",
        a: "Nein. Am Anfang helfen zwei, drei Wochen Tracking, um ein Gefühl für Portionen zu bekommen. Danach arbeitet der Plan mit Baukasten-Mahlzeiten und Portionslogik, die ohne Waage im Alltag funktioniert.",
      },
      {
        q: "Funktioniert der Plan auch vegetarisch?",
        a: "Ja. Der Eiweiß-Zielwert bleibt derselbe, die Quellen ändern sich: Eier, Milchprodukte, Hülsenfrüchte, Tofu. Natalie plant das von Anfang an so ein, statt ein Fleischrezept zu halbieren.",
      },
      {
        q: "Kann ich Beratung und Training kombinieren?",
        a: "Ja. Viele kombinieren die Online-Beratung mit 1-zu-1 Training für 50€ pro Stunde, in Lind meist bei dir zu Hause oder draußen am Heiderand. Was sinnvoll ist, klären wir im kostenlosen Erstgespräch.",
      },
    ],
  },

  "vogelsang/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Vogelsang hat kurze Wege: Antritte und Sprungserien auf den Wiesen des Äußeren Grüngürtels am Veedelsrand, lange Intervalle Richtung Jahnwiesen am Sportpark Müngersdorf, Kraft im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Vogelsang: Sprints im Äußeren Grüngürtel, Intervalle an den Jahnwiesen beim Sportpark Müngersdorf, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ein ruhiges Veedel mit Sportgelände nebenan",
        body: "Vogelsang ist mit 8.336 Einwohnern auf 3,64 km² eines der ruhigeren Veedel im Bezirk Ehrenfeld: viel Wohnbebauung, wenig Durchgangsverkehr, und am Rand beginnt der Äußere Grüngürtel. Was Vogelsang besonders macht, ist die Nachbarschaft nach Süden: hinter Müngersdorf liegt der Sportpark Müngersdorf, das größte zusammenhängende Sportgelände der Stadt. Du wohnst also in Laufweite von Flächen, für die andere Kölner quer durch die Stadt fahren.",
      },
      {
        title: "Grüngürtel für das Kurze, Jahnwiesen für das Lange",
        body: "Die Wiesen und Wege des Äußeren Grüngürtels direkt am Veedel nutze ich für Antritte, Steigerungsläufe und Sprungserien auf weichem Boden. Für längere Intervalle laufen wir Richtung Jahnwiesen am Sportpark Müngersdorf: offene, flache Rasenflächen mit genug Platz, um Abschnitte sauber zu messen und Woche für Woche zu vergleichen. Beides erreichst du aus Vogelsang ohne Auto, das Aufwärmen passiert auf dem Weg.",
      },
      {
        title: "Schnelligkeit und Sprungkraft brauchen auch Kraft",
        body: "Draußen entsteht Tempo, im Studio entsteht die Basis dafür: Beinkraft an der Langhantel, Plyometrie mit sauberer Landetechnik, Rumpfarbeit gegen das Einknicken im Antritt. Der Plan hat zwei Einheiten pro Woche, eine draußen, eine drinnen, und alle vier bis sechs Wochen einen Testtag mit Sprintzeit und Sprunghöhe. Trainiert wird nach diesen Zahlen, nicht nach Gefühl.",
      },
      {
        title: "Für Vereinsspieler und Wiedereinsteiger",
        body: "Typische Anfragen aus Vogelsang und Umgebung: Fußballer und Handballerinnen aus den Vereinen im Kölner Westen, die explosiver werden wollen, Läufer mit dem Ziel einer schnelleren Runde, und Leute, die nach Jahren Pause wieder belastbar werden möchten. Das Niveau ist egal, der Technik-Check am Anfang legt den Startpunkt fest, gesteigert wird erst, wenn die Bewegung sitzt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Vogelsang?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App und Video-Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo trainieren wir in Vogelsang?",
        a: "Im Äußeren Grüngürtel direkt am Veedel für Sprints und Sprünge, an den Jahnwiesen beim Sportpark Müngersdorf für längere Intervalle, im Studio für Kraft und Plyometrie.",
      },
      {
        q: "Brauche ich Vorerfahrung für Athletiktraining?",
        a: "Nein. Der Technik-Check am Anfang zeigt, wo du stehst, und die Übungen werden darauf angepasst. Gerade Einsteiger profitieren schnell von besserer Stabilität und Körperspannung.",
      },
      {
        q: "Wie schnell sehe ich Fortschritte?",
        a: "Sprintzeit und Sprunghöhe messen wir alle vier bis sechs Wochen. Die meisten sehen nach zwei Messungen, also nach acht bis zwölf Wochen, einen klaren Unterschied in den Zahlen.",
      },
    ],
  },
};

export function getIntentCustom(stadtteil: string, intent: string): IntentCustom | undefined {
  return stadtteilIntentCustom[`${stadtteil}/${intent}`];
}
