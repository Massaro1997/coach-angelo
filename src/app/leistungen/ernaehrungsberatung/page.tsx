import { Metadata } from "next";
import Link from "next/link";
import { stadtteile } from "@/lib/koeln-stadtteile";
import { intents, siteUrl } from "@/lib/stadtteil-intent";
import { bezirke } from "@/lib/bezirk-content";

const url = `${siteUrl}/leistungen/ernaehrungsberatung`;

export const metadata: Metadata = {
  title: "Ernährungsberatung Köln: Plan statt Diät",
  description:
    "Ernährungsberatung in Köln mit Natalie, Ernährungsberaterin für Sport- und Fitnessernährung: Makros, Wochenplan und Einkaufsliste, abgestimmt auf dein Training. Kostenlose Erstberatung.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url,
    title: "Ernährungsberatung Köln | FitPrimo",
    description:
      "Ernährungsberatung mit Schwerpunkt Sport- und Fitnessernährung: Makros, Wochenplan und Einkaufsliste, abgestimmt auf dein Training.",
    images: ["/opengraph-image"],
  },
};

const faq = [
  {
    q: "Wird ein Ernährungsberater von der Krankenkasse bezahlt?",
    a: "Gesetzliche Kassen bezuschussen Ernährungsberatung nur unter bestimmten Voraussetzungen, meist mit ärztlicher Bescheinigung und bei dafür zertifizierten Anbietern. Unsere Beratung bei FitPrimo ist eine Privatleistung für Sport- und Fitnessernährung. Verbindliche Auskunft gibt dir nur deine Krankenkasse.",
  },
  {
    q: "Was ist der Unterschied zwischen Ernährungsberatung und Ernährungstherapie?",
    a: "Ernährungsberatung richtet sich an gesunde Menschen, die besser essen wollen: weniger Fett, mehr Muskeln, mehr Energie im Alltag. Ernährungstherapie behandelt Erkrankungen und gehört in medizinische Hände. Natalie macht Ernährungsberatung mit Schwerpunkt Sport und Fitness. Wenn eine Erkrankung im Spiel ist, gehört der erste Weg zum Arzt.",
  },
  {
    q: "Was kostet ein guter Ernährungsberater?",
    a: "Die Preise unterscheiden sich stark je nach Anbieter und Umfang. Bei FitPrimo ist die Ernährungsberatung Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos, damit du vorher weißt, was du bekommst.",
  },
  {
    q: "Muss ich für die Beratung nach Köln kommen?",
    a: "Nein. Die Ernährungsberatung läuft komplett online oder kombiniert mit dem Training vor Ort. Natalie betreut dich per Video-Call und App, egal ob du in Ehrenfeld, Rodenkirchen oder außerhalb von Köln wohnst.",
  },
];

export default function ErnaehrungsberatungKoeln() {
  const byBezirk = bezirke.map((b) => ({
    name: b.name,
    items: stadtteile.filter((st) => st.bezirk === b.name),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Personal Trainer Köln", item: `${siteUrl}/personal-trainer-koeln` },
          { "@type": "ListItem", position: 2, name: "Ernährungsberatung", item: url },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Ernährungsberatung",
        provider: {
          "@type": "Person",
          name: "Natalie",
          jobTitle: "Ernährungsberaterin",
          description: "Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung bei FitPrimo",
          url: siteUrl,
        },
        areaServed: { "@type": "City", name: "Köln" },
        mainEntityOfPage: url,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="fp-hero pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="mb-5 text-sm font-medium text-ink/50">
            <Link href="/personal-trainer-koeln" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">Personal Trainer Köln</Link> / Ernährungsberatung
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl fp-titolo text-ink mb-6">
            Ernährungsberatung <span className="text-gold">Köln</span>
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-prose">
            Ernährungsberatung in Köln mit Natalie: Sie ist Ernährungsberaterin mit Schwerpunkt
            Sport- und Fitnessernährung und baut dir einen Ernährungsplan, der zu deinem Training
            und deinem Alltag passt. Keine Verbotslisten, keine Crash-Diät: Makro-Verteilung,
            Wochenplan und Einkaufsliste, die du wirklich durchhältst.
          </p>
          <div className="mt-6">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink/50">Unverbindlich. Antwort innerhalb von 24 Stunden.</p>
          <div className="mt-10 space-y-4 text-lg text-ink/70 leading-relaxed max-w-prose">
            <p>
              Hinter FitPrimo stehen zwei Menschen. Angelo kümmert sich um dein Training, Natalie
              um deine Ernährung. Das ist der Grund, warum die Beratung hier anders aussieht als
              bei einem reinen Ernährungsbüro: Dein Plan wird auf dein Training abgestimmt, nicht
              daneben gestellt. Wer abnehmen will, bekommt ein Defizit, das Muskeln schützt. Wer
              aufbauen will, bekommt die Eiweiß- und Kalorienziele, die der Plan dafür braucht.
            </p>
          </div>
        </div>
      </section>

      {/* Come lavora Natalie */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Ein Plan, den du im Alltag <span className="text-gold">durchhältst</span>
          </h2>
          <div className="space-y-4 text-ink/70 leading-relaxed max-w-prose">
            <p>
              Am Anfang steht ein Gespräch, keine Tabelle: dein Ziel, deine Essgewohnheiten, dein
              Tagesablauf, was du gerne isst und was nicht. Daraus baut Natalie deine
              Kalorien- und Makro-Ziele und einen Wochenplan mit Gerichten, die du kennst und
              magst, plus Einkaufsliste. Schichtdienst, Kantine, Familie, Restaurantbesuche:
              All das gehört in den Plan, sonst hält er zwei Wochen.
            </p>
            <p>
              Danach wird nachjustiert. In den Check-ins schaut Natalie auf Gewicht, Fortschritt
              und Alltagstauglichkeit und passt den Plan an, bevor du die Lust verlierst. Die
              häufigsten Ziele: <Link href="/leistungen/abnehmen" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">Abnehmen</Link> ohne
              Jojo-Effekt und <Link href="/leistungen/muskelaufbau" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">Muskelaufbau</Link> mit
              einem Eiweiß-Zielwert, der zum Training passt.
            </p>
          </div>
        </div>
      </section>

      {/* Preise */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Das kostet die <span className="text-gold">Beratung</span>
          </h2>
          <div className="space-y-4 text-ink/70 leading-relaxed max-w-prose">
            <p>
              Bei FitPrimo ist die Ernährungsberatung Teil des Online Coachings ab 150€ im Monat:
              individueller Trainingsplan, Ernährungssteuerung durch Natalie und wöchentliche
              Check-ins, alles aus einer Hand. Es gibt keine versteckten Pakete und keinen
              separaten Stundenpreis für die Ernährung.
            </p>
            <p>
              Wenn du zusätzlich vor Ort trainieren willst: Die 1-zu-1 Stunde mit Angelo kostet
              50€, im Studio, draußen oder bei dir zu Hause. Alle Details stehen auf der Seite{" "}
              <Link href="/personal-trainer-koeln" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
                Personal Training in Köln
              </Link>.
            </p>
            <p>
              Das Erstgespräch ist kostenlos und unverbindlich: 30 bis 45 Minuten über dein Ziel
              und deinen Startpunkt. Danach entscheidest du in Ruhe.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-8">
            Häufige Fragen zur Ernährungsberatung in Köln
          </h2>
          <div className="space-y-6">
            {faq.map((f) => (
              <div key={f.q} className="border-b border-line pb-6">
                <h3 className="font-black text-ink mb-2">{f.q}</h3>
                <p className="text-ink/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Andere Leistungen */}
      <section className="bg-background border-b border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            {intents.filter((x) => x.key !== "ernaehrungsberatung").map((x) => (
              <Link key={x.key} href={`/leistungen/${x.key}`} className="rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink/70 transition-colors hover:text-gold">
                {x.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stadtteil-Liste */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-10">
            Ernährungsberatung in deinem <span className="text-gold">Stadtteil</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {byBezirk.map((b) => (
              <div key={b.name}>
                <h3 className="text-gold font-black uppercase tracking-wider text-sm mb-3 border-b border-line pb-2">
                  {b.name}
                </h3>
                <ul className="space-y-1.5">
                  {b.items.map((st) => (
                    <li key={st.slug}>
                      <Link href={`/koeln/${st.slug}/ernaehrungsberatung`} className="text-ink/70 hover:text-gold transition-colors text-sm">
                        Ernährungsberatung Köln-{st.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
