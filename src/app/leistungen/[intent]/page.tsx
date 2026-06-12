import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  return {
    title: `${it.label} in Köln | Coach Angelo`,
    description: `${it.metaIntent} in Köln, in allen 86 Stadtteilen. WABBA International Athlet, kostenlose Erstberatung, Antwort in 24h.`,
    alternates: { canonical: `${siteUrl}/leistungen/${it.key}` },
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

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
            <Link href="/personal-trainer-koeln" className="hover:text-gold-soft">Personal Trainer Köln</Link> / Leistung
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-ink uppercase mb-6 leading-tight">
            {it.label} in <span className="text-accent">Köln</span>
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
            <Link href="/contatti" className="inline-flex items-center bg-gold text-white px-8 py-4 font-bold uppercase tracking-wider rounded-md">
              Kostenlose Beratung <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Andere Leistungen */}
      <section className="bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            {intents.filter((x) => x.key !== it.key).map((x) => (
              <Link key={x.key} href={`/leistungen/${x.key}`} className="text-sm text-ink/70 hover:text-gold transition-colors border border-line rounded-md px-3 py-1.5">
                {x.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stadtteil-Liste */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-10">
            {it.label} in deinem <span className="text-accent">Stadtteil</span>
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

      <section className="relative py-24 border-t border-line">
        <Image src="/hero bassa.png" alt={`${it.label} in Köln`} fill className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-ink uppercase mb-4">{it.label} in Köln starten</h2>
          <p className="text-lg text-ink/70 mb-8 max-w-2xl mx-auto">Kostenlose Erstberatung, Antwort in 24 Stunden.</p>
          <Link href="/contatti" className="inline-flex items-center bg-gold text-white px-10 py-5 font-bold uppercase tracking-wider rounded-md text-lg">
            Jetzt starten <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
