import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stadtteile } from "@/lib/koeln-stadtteile";
import { intents, getIntent, siteUrl } from "@/lib/stadtteil-intent";
import { bezirke } from "@/lib/bezirk-content";

export function generateStaticParams() {
  return intents.map((it) => ({ intent: it.key }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ intent: string }>;
}): Promise<Metadata> {
  const { intent } = await params;
  const it = getIntent(intent);
  if (!it) return {};
  const url = `${siteUrl}/leistungen/${it.key}`;
  return {
    title: `${it.label} in Köln`,
    description: `${it.metaIntent} in Köln, in allen 86 Stadtteilen. WABBA International Athlet, kostenlose Erstberatung, Antwort in 24h.`,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url,
      title: `${it.label} in Köln`,
      description: `${it.metaIntent} in Köln, in allen 86 Stadtteilen. WABBA Athlet, kostenlose Erstberatung.`,
      images: ["/opengraph-image"],
    },
  };
}

export default async function IntentCategory({
  params,
}: {
  params: Promise<{ intent: string }>;
}) {
  const { intent } = await params;
  const it = getIntent(intent);
  if (!it) notFound();

  const byBezirk = bezirke.map((b) => ({
    name: b.name,
    items: stadtteile.filter((st) => st.bezirk === b.name),
  }));

  const url = `${siteUrl}/leistungen/${it.key}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Personal Trainer Köln", item: `${siteUrl}/personal-trainer-koeln` },
          { "@type": "ListItem", position: 2, name: it.label, item: url },
        ],
      },
      {
        "@type": "Service",
        serviceType: it.label,
        provider: { "@type": "Person", name: "Angelo Magliarisi", jobTitle: "Personal Trainer", url: siteUrl },
        areaServed: { "@type": "City", name: "Köln" },
        ...(it.price ? { offers: { "@type": "Offer", price: it.price, priceCurrency: "EUR" } } : {}),
        mainEntityOfPage: url,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="fp-hero pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="mb-5 text-sm font-medium text-ink/50">
            <Link href="/personal-trainer-koeln" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">Personal Trainer Köln</Link> / Leistung
          </p>
          <h1 className="text-4xl sm:text-5xl fp-titolo text-ink mb-6">
            {it.label} in <span className="text-gold">Köln</span>
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-prose mb-4">{it.hook}</p>
          <p className="text-ink/60 max-w-prose">
            Ich betreue Kunden aus allen 86 Kölner Stadtteilen, im Studio oder online. Wähle deinen
            Stadtteil für die Details vor Ort.
          </p>
          {it.price && (
            <p className="mt-6 inline-block bg-gold text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-sm">
              {it.price}
            </p>
          )}
          <div className="mt-8">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Beratung <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Andere Leistungen */}
      <section className="bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            {intents.filter((x) => x.key !== it.key).map((x) => (
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
            {it.label} in deinem <span className="text-gold">Stadtteil</span>
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
                      <Link href={`/koeln/${st.slug}/${it.key}`} className="text-ink/70 hover:text-gold transition-colors text-sm">
                        {it.label} Köln-{st.name}
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
