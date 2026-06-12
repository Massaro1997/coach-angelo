import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { bezirke, getBezirk, bezirkStadtteile, bezirkStats } from "@/lib/bezirk-content";
import { density } from "@/lib/koeln-stadtteile";

const siteUrl = "https://www.angelocoach.com";

export function generateStaticParams() {
  return bezirke.map((b) => ({ bezirk: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bezirk: string }>;
}): Promise<Metadata> {
  const { bezirk } = await params;
  const b = getBezirk(bezirk);
  if (!b) return {};
  const stats = bezirkStats(b);
  return {
    title: `Personal Trainer Köln-${b.name} | Coach Angelo`,
    description: `Personal Training und Online Coaching im Bezirk Köln-${b.name} (${stats.count} Stadtteile, ${stats.einwohner.toLocaleString("de-DE")} Einwohner). WABBA Athlet, kostenlose Erstberatung.`,
    alternates: { canonical: `${siteUrl}/personal-trainer-koeln/${b.slug}` },
  };
}

export default async function BezirkPage({
  params,
}: {
  params: Promise<{ bezirk: string }>;
}) {
  const { bezirk } = await params;
  const b = getBezirk(bezirk);
  if (!b) notFound();

  const sts = bezirkStadtteile(b);
  const stats = bezirkStats(b);
  const otherBezirke = bezirke.filter((x) => x.slug !== b.slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: b.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-10 sm:pb-14 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
            <Link href="/personal-trainer-koeln" className="hover:text-gold-soft">
              Personal Trainer Köln
            </Link>{" "}
            / Stadtbezirk
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-ink uppercase mb-6">
            Personal Trainer in <span className="text-accent">Köln-{b.name}</span>
          </h1>
          <div className="space-y-4 text-lg text-ink/70 leading-relaxed max-w-prose">
            {b.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/contatti"
              className="inline-flex items-center bg-gold text-white px-8 py-4 font-bold uppercase tracking-wider rounded-md"
            >
              Kostenlose Beratung anfragen <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Daten-Leiste */}
      <section className="border-y border-line bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 text-center">
            {[
              { v: String(stats.count), l: "Stadtteile" },
              { v: stats.einwohner.toLocaleString("de-DE"), l: "Einwohner" },
              { v: `${stats.flaeche.toLocaleString("de-DE")} km²`, l: "Fläche" },
              { v: stats.biggest.name, l: "Größter Stadtteil" },
            ].map((item, i) => (
              <div key={i} className={`py-6 ${i > 0 ? "sm:border-l sm:border-line" : ""}`}>
                <div className="text-lg sm:text-xl font-black text-gold">{item.v}</div>
                <div className="text-ink/50 uppercase tracking-wider text-[10px] font-medium mt-1">
                  {item.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outdoor */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-6">
            Outdoor-Training in {b.name}
          </h2>
          <p className="text-ink/70 leading-relaxed max-w-prose mb-6">{b.outdoorIntro}</p>
          {stats.spots.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {stats.spots.map((spot) => (
                <span key={spot} className="border border-line rounded-md px-4 py-2 text-sm text-ink/80">
                  {spot}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tabella Stadtteile */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-4">
            Alle Stadtteile im Bezirk {b.name}
          </h2>
          <p className="text-ink/60 max-w-prose mb-10">
            Ich betreue Kunden aus allen {stats.count} Stadtteilen des Bezirks, im Studio oder
            online.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-gold uppercase tracking-wider text-xs">
                  <th className="py-3 pr-4 font-bold">Stadtteil</th>
                  <th className="py-3 pr-4 font-bold">Einwohner</th>
                  <th className="py-3 pr-4 font-bold">Dichte/km²</th>
                  <th className="py-3 font-bold">Outdoor-Spots</th>
                </tr>
              </thead>
              <tbody>
                {sts.map((st) => (
                  <tr key={st.slug} className="border-b border-line/50">
                    <td className="py-3 pr-4 font-bold text-ink">{st.name}</td>
                    <td className="py-3 pr-4 text-ink/70">{st.einwohner.toLocaleString("de-DE")}</td>
                    <td className="py-3 pr-4 text-ink/70">{density(st).toLocaleString("de-DE")}</td>
                    <td className="py-3 text-ink/60">{st.spots.length ? st.spots.join(", ") : "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Angebot */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-10">
            Mein Angebot in {b.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Personal Training", price: "50€/Std", desc: "1-zu-1 im Studio in Köln" },
              { title: "Online Coaching", price: "ab 150€/Monat", desc: "Plan, Ernährung, wöchentliche Check-ins" },
              { title: "Trainingsplan", price: "ab 25€", desc: "Individuell oder fertig als PDF" },
            ].map((s) => (
              <div key={s.title} className="border border-line rounded-lg p-5 bg-surface">
                <h3 className="font-black text-ink uppercase text-sm mb-1">{s.title}</h3>
                <p className="text-gold font-bold mb-2">{s.price}</p>
                <p className="text-ink/60 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-10">
            Häufige Fragen aus {b.name}
          </h2>
          <div className="space-y-8">
            {b.faq.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold text-ink text-lg mb-2">{f.q}</h3>
                <p className="text-ink/60 leading-relaxed max-w-prose">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Andere Bezirke */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-ink uppercase mb-6">Andere Stadtbezirke</h2>
          <div className="flex flex-wrap gap-3">
            {otherBezirke.map((o) => (
              <Link
                key={o.slug}
                href={`/personal-trainer-koeln/${o.slug}`}
                className="border border-line rounded-md px-4 py-2 text-sm text-ink/80 hover:border-gold-deep hover:text-gold transition-colors"
              >
                Köln-{o.name}
              </Link>
            ))}
            <Link
              href="/personal-trainer-koeln"
              className="border border-gold-deep rounded-md px-4 py-2 text-sm text-gold hover:bg-elevated transition-colors"
            >
              Übersicht →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-line">
        <Image src="/hero bassa.png" alt={`Coach Angelo, Personal Trainer Köln-${b.name}`} fill className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-ink uppercase mb-4">
            Bereit für Veränderung in {b.name}?
          </h2>
          <p className="text-lg text-ink/70 mb-8 max-w-2xl mx-auto">
            5 kurze Fragen, kostenlose Erstberatung, Antwort innerhalb von 24 Stunden.
          </p>
          <Link
            href="/contatti"
            className="inline-flex items-center bg-gold text-white px-10 py-5 font-bold uppercase tracking-wider rounded-md text-lg"
          >
            Jetzt starten <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
