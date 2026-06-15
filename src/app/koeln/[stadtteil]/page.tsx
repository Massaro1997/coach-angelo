import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { stadtteile, getStadtteil, getNeighbors } from "@/lib/koeln-stadtteile";
import { intents, siteUrl } from "@/lib/stadtteil-intent";
import { buildStadtteilContent } from "@/lib/stadtteil-content";

export function generateStaticParams() {
  return stadtteile.map((st) => ({ stadtteil: st.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stadtteil: string }>;
}): Promise<Metadata> {
  const { stadtteil } = await params;
  const st = getStadtteil(stadtteil);
  if (!st) return {};
  const url = `${siteUrl}/koeln/${st.slug}`;
  return {
    title: `Personal Trainer Köln-${st.name} | Coach Angelo`,
    description: `Personal Training, Abnehmen, Muskelaufbau und Online Coaching in Köln-${st.name} (${st.bezirk}, ${st.einwohner.toLocaleString("de-DE")} Einwohner). WABBA Athlet, kostenlose Erstberatung.`,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url,
      title: `Personal Trainer in Köln-${st.name}`,
      description: `Personal Training und Online Coaching in Köln-${st.name}. WABBA Athlet, kostenlose Erstberatung.`,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function StadtteilHub({
  params,
}: {
  params: Promise<{ stadtteil: string }>;
}) {
  const { stadtteil } = await params;
  const st = getStadtteil(stadtteil);
  if (!st) notFound();
  const neighbors = getNeighbors(st);
  const c = buildStadtteilContent(st);
  const url = `${siteUrl}/koeln/${st.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Personal Trainer Köln", item: `${siteUrl}/personal-trainer-koeln` },
          { "@type": "ListItem", position: 2, name: `Köln-${st.name}`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({
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

      <section className="pt-32 sm:pt-40 pb-10 sm:pb-14 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
            <Link href="/personal-trainer-koeln" className="hover:text-gold-soft">Personal Trainer Köln</Link> / {st.bezirk}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-ink uppercase mb-6">
            Personal Trainer in <span className="text-accent">Köln-{st.name}</span>
          </h1>
          <div className="space-y-4 text-lg text-ink/70 leading-relaxed max-w-prose">
            {c.intro.split(/(?<=\.)\s+(?=[A-ZÄÖÜ])/).reduce<string[][]>((acc, sentence, i) => {
              const group = Math.floor(i / 2);
              (acc[group] ||= []).push(sentence);
              return acc;
            }, []).map((group, i) => (
              <p key={i}>{group.join(" ")}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-8">
            Coaching-Angebote in {st.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {intents.map((it) => (
              <Link
                key={it.key}
                href={`/koeln/${st.slug}/${it.key}`}
                className="group flex items-center justify-between bg-background border border-line rounded-lg px-6 py-5 hover:border-gold-deep transition-colors"
              >
                <div>
                  <h3 className="font-black text-ink uppercase">{it.label}</h3>
                  {it.price && <p className="text-gold text-sm font-bold mt-0.5">{it.price}</p>}
                </div>
                <span className="text-gold font-bold text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-6">{c.trainingTitle}</h2>
          <p className="text-lg text-ink/70 leading-relaxed max-w-prose mb-5">{c.trainingText}</p>
          {c.spotsList.length > 0 && (
            <ul className="flex flex-wrap gap-3 mb-2">
              {c.spotsList.map((s) => (
                <li key={s} className="border border-line rounded-md px-4 py-2 text-sm text-ink/80">{s}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-6">{c.neighborsTitle}</h2>
          <p className="text-lg text-ink/70 leading-relaxed max-w-prose mb-6">{c.neighborsText}</p>
          <div className="flex flex-wrap gap-3">
            {neighbors.map((n) => (
              <Link key={n.slug} href={`/koeln/${n.slug}`} className="border border-line rounded-md px-4 py-2 text-sm text-ink/80 hover:border-gold-deep hover:text-gold transition-colors">
                Köln-{n.name}
              </Link>
            ))}
            <Link href="/personal-trainer-koeln" className="border border-gold-deep rounded-md px-4 py-2 text-sm text-gold hover:bg-elevated transition-colors">
              Alle Stadtteile →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-8">Häufige Fragen aus {st.name}</h2>
          <div className="space-y-6">
            {c.faq.map((f) => (
              <div key={f.q} className="border-b border-line pb-6">
                <h3 className="font-black text-ink mb-2">{f.q}</h3>
                <p className="text-ink/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 border-t border-line">
        <Image src="/hero bassa.png" alt={`Personal Trainer Köln-${st.name}`} fill className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-ink uppercase mb-4">Bereit für Veränderung in {st.name}?</h2>
          <p className="text-lg text-ink/70 mb-8 max-w-2xl mx-auto">Kostenlose Erstberatung, Antwort in 24 Stunden.</p>
          <Link href="/contatti" className="inline-flex items-center bg-gold text-white px-10 py-5 font-bold uppercase tracking-wider rounded-md text-lg">
            Jetzt starten <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
