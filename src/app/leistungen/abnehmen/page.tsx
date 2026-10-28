import { Metadata } from "next";
import Link from "next/link";
import { stadtteile } from "@/lib/koeln-stadtteile";
import { intents, siteUrl } from "@/lib/stadtteil-intent";
import { bezirke } from "@/lib/bezirk-content";

const url = `${siteUrl}/leistungen/abnehmen`;

export const metadata: Metadata = {
  title: "Abnehmen in Köln: Personal Training & Ernährung",
  description:
    "Abnehmen in Köln: Krafttraining, Kaloriendefizit und Ernährungsplan statt Crash-Diät. 1-zu-1 mit Personal Trainer Angelo für 50€ pro Stunde. Kostenlose Erstberatung.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url,
    title: "Abnehmen in Köln | FitPrimo",
    description:
      "Krafttraining, Kaloriendefizit und Ernährungsplan statt Crash-Diät: Abnehmen im 1-zu-1 für 50€ pro Stunde, im Studio, draußen oder zuhause.",
    images: ["/opengraph-image"],
  },
};

export default function AbnehmenKoeln() {
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
          { "@type": "ListItem", position: 2, name: "Abnehmen", item: url },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Abnehmen mit Personal Trainer",
        provider: { "@type": "Person", name: "Angelo Magliarisi", jobTitle: "Personal Trainer", url: siteUrl },
        areaServed: { "@type": "City", name: "Köln" },
        mainEntityOfPage: url,
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
            <Link href="/personal-trainer-koeln" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">Personal Trainer Köln</Link> / Abnehmen
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl fp-titolo text-ink mb-6">
            Abnehmen in <span className="text-gold">Köln</span>
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-prose">
            Abnehmen in Köln mit FitPrimo heißt: Krafttraining statt Crash-Diät. Ein
            moderates Kaloriendefizit, zwei Krafteinheiten pro Woche als Muskelschutz und
            ein Ernährungsplan, der zu deinem Alltag passt. Realistisch sind ein bis zwei
            Kilo Fett pro Monat, ohne Jojo-Effekt danach.
          </p>
          <div className="mt-6">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink/50">Unverbindlich. Antwort innerhalb von 24 Stunden.</p>
          <div className="mt-10 space-y-4 text-lg text-ink/70 leading-relaxed max-w-prose">
            <p>
              Die meisten Abnehmversuche scheitern nicht am Willen, sondern am Plan: zu
              großes Defizit, kein Krafttraining, und nach der Diät wiegt man mehr als
              vorher. Deshalb arbeiten wir andersherum. Du verlierst Fett, nicht Muskeln,
              und du lernst dabei, wie du das Ergebnis hältst.
            </p>
          </div>
        </div>
      </section>

      {/* Come si lavora */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Fett verlieren, Muskeln <span className="text-gold">behalten</span>
          </h2>
          <div className="space-y-4 text-ink/70 leading-relaxed max-w-prose">
            <p>
              Am Anfang schauen wir, wo du stehst: dein Gewicht, dein Alltag, was du bisher
              versucht hast. Daraus entsteht ein Plan mit zwei Bausteinen. Im Training
              setzt Angelo auf Grundübungen mit sauberer Technik, denn Muskulatur ist beim
              Abnehmen dein wichtigster Verbündeter: Sie verbrennt Energie und sorgt dafür,
              dass am Ende ein straffer Körper übrig bleibt, nicht ein schwächerer. Trainiert
              wird im{" "}
              <Link href="/leistungen/personal-training" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">1-zu-1 Personal Training</Link>,
              im Studio, draußen oder bei dir zuhause.
            </p>
            <p>
              Beim Essen gibt es keine Verbotslisten. Natalie, Ernährungsberaterin mit
              Schwerpunkt Sport- und Fitnessernährung, baut dein Kaloriendefizit um die
              Lebensmittel herum, die du gerne isst: Makro-Verteilung, Wochenplan,
              Einkaufsliste. Wie das genau abläuft, steht auf der Seite{" "}
              <Link href="/leistungen/ernaehrungsberatung" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
                Ernährungsberatung in Köln
              </Link>.
              Der Fortschritt wird gemessen, nicht geschätzt: Gewicht, Umfänge und die
              Gewichte im Training zeigen dir schwarz auf weiß, ob der Plan funktioniert.
            </p>
          </div>
        </div>
      </section>

      {/* Preise */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Das kostet das <span className="text-gold">Coaching</span>
          </h2>
          <div className="space-y-4 text-ink/70 leading-relaxed max-w-prose">
            <p>
              Die 1-zu-1 Stunde mit Angelo kostet 50€, im Studio, draußen oder bei dir zu
              Hause. Wer lieber mit Plan und wöchentlichen Check-ins selbst trainiert, nimmt
              das Online Coaching ab 150€ im Monat. Alle Details stehen auf der Seite{" "}
              <Link href="/personal-trainer-koeln" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
                Personal Training in Köln
              </Link>.
            </p>
            <p>
              Das Erstgespräch ist kostenlos und unverbindlich: 30 bis 45 Minuten über dein
              Ziel, deinen Startpunkt und was bisher nicht funktioniert hat. Danach
              entscheidest du in Ruhe.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Andere Leistungen */}
      <section className="bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            {intents.filter((x) => x.key !== "abnehmen").map((x) => (
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
            Abnehmen in deinem <span className="text-gold">Stadtteil</span>
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
                      <Link href={`/koeln/${st.slug}/abnehmen`} className="text-ink/70 hover:text-gold transition-colors text-sm">
                        Abnehmen Köln-{st.name}
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
