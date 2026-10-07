import { Metadata } from "next";
import Link from "next/link";
import { stadtteile } from "@/lib/koeln-stadtteile";
import { bezirke } from "@/lib/bezirk-content";
import { intents } from "@/lib/stadtteil-intent";

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  title: "Personal Trainer Köln - WABBA Athlet",
  description:
    "Personal Trainer in Köln: 1-zu-1 Training (50€/Std), Online Coaching ab 150€/Monat, individuelle Trainingspläne. WABBA International Athlet. Kostenlose Erstberatung, Antwort in 24h.",
  alternates: { canonical: `${siteUrl}/personal-trainer-koeln` },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/personal-trainer-koeln`,
    title: "Personal Trainer Köln | Coach Angelo",
    description: "1-zu-1 Training, Online Coaching und individuelle Trainingspläne in Köln. WABBA International Athlet.",
    images: ["/opengraph-image"],
  },
};

export default function PersonalTrainerKoeln() {
  const totalEinwohner = stadtteile.reduce((s, st) => s + st.einwohner, 0);

  return (
    <>
      {/* Hero */}
      <section className="fp-hero pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl fp-titolo text-ink mb-6">
            Personal Trainer <span className="text-gold">Köln</span>
          </h1>
          <div className="space-y-4 text-lg text-ink/70 leading-relaxed max-w-prose">
            <p>
              Ich bin Angelo Magliarisi, Personal Trainer in Köln und Wettkampfathlet im WABBA
              International Verband. Ich betreue Kunden aus allen 86 Kölner Stadtteilen, von der
              Innenstadt bis Porz, von Chorweiler bis Rodenkirchen. Insgesamt leben über{" "}
              {Math.round(totalEinwohner / 100000) / 10} Millionen Menschen in Köln, und die meisten
              Fitnessstudios sind voll mit Leuten, die seit Jahren dasselbe trainieren und sich nicht
              verändern. Genau da setze ich an.
            </p>
            <p>
              Mein Angebot ist bewusst einfach: Personal Training 1-zu-1 im Studio für 50€ pro
              Stunde, Online Coaching mit individuellem Trainingsplan, Ernährungsberatung und
              wöchentlichen Check-ins ab 150€ im Monat, oder fertige Trainingspläne als PDF ab 25€.
              Die Erstberatung ist kostenlos und unverbindlich.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/contatti"
              className="fp-btn"
            >
              Kostenlose Beratung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Leistungen (category-intent) */}
      <section className="py-16 sm:py-20 bg-background border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Womit ich dir <span className="text-gold">helfe</span>
          </h2>
          <p className="text-ink/60 max-w-prose mb-10">
            Acht Schwerpunkte, in allen Stadtteilen Kölns. Klick dich rein für die Details zu deinem Ziel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {intents.map((it) => (
              <Link
                key={it.key}
                href={`/leistungen/${it.key}`}
                className="fp-scheda group block p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="fp-titolo text-ink text-lg mb-1">{it.label}</h3>
                {it.price && <p className="text-gold text-xs font-bold">{it.price}</p>}
                <span className="inline-block mt-3 text-gold text-sm group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stadtteile nach Bezirk */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Personal Training in deinem <span className="text-gold">Stadtbezirk</span>
          </h2>
          <p className="text-ink/60 max-w-prose mb-12">
            Wähle deinen Bezirk für Infos zu Training, Outdoor-Spots und Betreuung in deiner Nähe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {bezirke.map((b) => {
              const sts = stadtteile.filter((st) => st.bezirk === b.name);
              return (
                <div key={b.slug}>
                  <Link
                    href={`/personal-trainer-koeln/${b.slug}`}
                    className="block text-gold font-black uppercase tracking-wider text-sm mb-3 border-b border-line pb-2 hover:text-gold-soft transition-colors"
                  >
                    Personal Trainer Köln-{b.name} →
                  </Link>
                  <p className="text-ink/50 text-sm leading-relaxed">
                    {sts.map((st) => st.name).join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warum Angelo */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-10">
            Warum mit mir trainieren?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              {
                title: "Wettkampferfahrung",
                desc: "Ich stehe selbst als WABBA Athlet auf der Bühne. Was ich dir zeige, wende ich jeden Tag an mir selbst an.",
              },
              {
                title: "Kein Schema F",
                desc: "Dein Plan wird für dich gebaut: Ziel, Erfahrung, Zeitbudget, Verletzungen. Kein Copy-Paste-Programm.",
              },
              {
                title: "Italienisch & Deutsch",
                desc: "Ich betreue dich auf Deutsch oder Italienisch. Viele meiner Kunden sind Italiener in Köln und Umgebung.",
              },
            ].map((item, idx) => (
              <div key={item.title}>
                <div className="fp-titolo text-4xl text-gold/40 mb-3">0{idx + 1}</div>
                <h3 className="fp-titolo text-ink mb-2">{item.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/servizi"
              className="fp-btn-linea"
            >
              Alle Leistungen
            </Link>
            <Link
              href="/blog"
              className="fp-btn-linea"
            >
              Fitness Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
