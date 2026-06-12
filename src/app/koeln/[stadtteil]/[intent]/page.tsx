import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getStadtteil } from "@/lib/koeln-stadtteile";
import {
  getIntent,
  intents,
  buildContent,
  neighborIntentLinks,
  allStadtteilIntentParams,
  siteUrl,
} from "@/lib/stadtteil-intent";

export function generateStaticParams() {
  return allStadtteilIntentParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stadtteil: string; intent: string }>;
}): Promise<Metadata> {
  const { stadtteil, intent } = await params;
  const st = getStadtteil(stadtteil);
  const it = getIntent(intent);
  if (!st || !it) return {};
  const c = buildContent(st, it);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: c.url },
  };
}

export default async function StadtteilIntentPage({
  params,
}: {
  params: Promise<{ stadtteil: string; intent: string }>;
}) {
  const { stadtteil, intent } = await params;
  const st = getStadtteil(stadtteil);
  const it = getIntent(intent);
  if (!st || !it) notFound();

  const c = buildContent(st, it);
  const neighbors = neighborIntentLinks(st, it);
  const otherIntents = intents.filter((i) => i.key !== it.key);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: it.label,
    provider: {
      "@type": "Person",
      name: "Angelo Magliarisi",
      jobTitle: "Personal Trainer",
      url: siteUrl,
    },
    areaServed: { "@type": "Place", name: `Köln-${st.name}`, address: { "@type": "PostalAddress", addressLocality: "Köln", addressRegion: "NRW", addressCountry: "DE" } },
    mainEntityOfPage: c.url,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-10 sm:pb-14 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
            <Link href="/personal-trainer-koeln" className="hover:text-gold-soft">Personal Trainer Köln</Link>
            {" / "}
            <Link href={`/leistungen/${it.key}`} className="hover:text-gold-soft">{it.label}</Link>
            {" / "}{st.name}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-ink uppercase mb-6 leading-tight">
            {it.label} in <span className="text-accent">Köln-{st.name}</span>
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-prose">{c.intro}</p>
          <div className="mt-8">
            <Link href="/contatti" className="inline-flex items-center bg-gold text-white px-8 py-4 font-bold uppercase tracking-wider rounded-md">
              Kostenlose Beratung <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Daten */}
      <section className="border-y border-line bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 text-center">
            {[
              { v: st.einwohner.toLocaleString("de-DE"), l: "Einwohner" },
              { v: `${st.flaecheKm2.toLocaleString("de-DE")} km²`, l: "Fläche" },
              { v: st.bezirk, l: "Stadtbezirk" },
              { v: it.price ?? "50€/Std", l: it.price ? "Preis" : "ab" },
            ].map((item, i) => (
              <div key={i} className={`py-6 ${i > 0 ? "sm:border-l sm:border-line" : ""}`}>
                <div className="text-base sm:text-lg font-black text-gold">{item.v}</div>
                <div className="text-ink/50 uppercase tracking-wider text-[10px] font-medium mt-1">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body paragraphs */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-12">
          {c.paragraphs.map((p) => (
            <div key={p.title}>
              <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-4">{p.title}</h2>
              <p className="text-ink/70 leading-relaxed max-w-prose">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-10">Häufige Fragen</h2>
          <div className="space-y-8">
            {c.faq.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold text-ink text-lg mb-2">{f.q}</h3>
                <p className="text-ink/60 leading-relaxed max-w-prose">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-10">
          {neighbors.length > 0 && (
            <div>
              <h2 className="text-xl font-black text-ink uppercase mb-5">{it.label} in der Nähe</h2>
              <div className="flex flex-wrap gap-3">
                {neighbors.map((n) => (
                  <Link key={n.href} href={n.href} className="border border-line rounded-md px-4 py-2 text-sm text-ink/80 hover:border-gold-deep hover:text-gold transition-colors">
                    {it.label} Köln-{n.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div>
            <h2 className="text-xl font-black text-ink uppercase mb-5">Weitere Leistungen in {st.name}</h2>
            <div className="flex flex-wrap gap-3">
              {otherIntents.map((oi) => (
                <Link key={oi.key} href={`/koeln/${st.slug}/${oi.key}`} className="border border-line rounded-md px-4 py-2 text-sm text-ink/80 hover:border-gold-deep hover:text-gold transition-colors">
                  {oi.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/koeln/${st.slug}`} className="text-gold font-bold text-sm uppercase tracking-wider hover:text-gold-soft">← Alle Leistungen in {st.name}</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-line">
        <Image src="/hero bassa.png" alt={`${it.label} in Köln-${st.name}`} fill className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-ink uppercase mb-4">{it.label} in {st.name} starten</h2>
          <p className="text-lg text-ink/70 mb-8 max-w-2xl mx-auto">5 kurze Fragen, kostenlose Erstberatung, Antwort in 24 Stunden.</p>
          <Link href="/contatti" className="inline-flex items-center bg-gold text-white px-10 py-5 font-bold uppercase tracking-wider rounded-md text-lg">
            Jetzt starten <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
