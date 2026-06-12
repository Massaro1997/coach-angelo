import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fitnessFaqs, getFaq, faqCategories } from "@/lib/fitness-faq";

const siteUrl = "https://www.angelocoach.com";

export function generateStaticParams() {
  return fitnessFaqs.map((f) => ({ slug: f.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = getFaq(slug);
  if (!f) return {};
  return {
    title: `${f.question} | Coach Angelo`,
    description: f.shortAnswer.slice(0, 155),
    alternates: { canonical: `${siteUrl}/fitness-faq/${f.slug}` },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = getFaq(slug);
  if (!f) notFound();

  const related = f.relatedSlugs.map((s) => getFaq(s)).filter(Boolean);
  const catLabel = faqCategories.find((c) => c.key === f.category)?.label ?? "";

  // FAQPage schema: la domanda principale + le sezioni come Q&A
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.shortAnswer + " " + f.body.map((b) => b.text).join(" "),
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article className="pt-32 sm:pt-40 pb-20 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
            <Link href="/fitness-faq" className="hover:text-gold-soft">Fitness FAQ</Link> · {catLabel}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink mb-8 leading-tight">
            {f.question}
          </h1>

          {/* Risposta breve evidenziata (featured snippet) */}
          <div className="bg-surface border-l-4 border-gold rounded-lg p-6 mb-12">
            <p className="text-lg text-ink/90 leading-relaxed font-medium">{f.shortAnswer}</p>
          </div>

          {/* Corpo */}
          <div className="space-y-10">
            {f.body.map((b) => (
              <div key={b.h2}>
                <h2 className="text-2xl font-black text-ink uppercase mb-3">{b.h2}</h2>
                <p className="text-ink/70 leading-relaxed text-lg">{b.text}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 border border-gold-deep rounded-lg p-8 bg-surface">
            <h2 className="text-xl font-black text-ink uppercase mb-3">
              Willst du das nicht allein durchziehen?
            </h2>
            <p className="text-ink/60 mb-6 max-w-prose">
              In der kostenlosen Erstberatung schauen wir uns deine Situation konkret an. Kein
              Verkaufsgespräch, versprochen.
            </p>
            <Link href="/contatti" className="inline-flex items-center bg-gold text-white px-8 py-4 font-bold uppercase tracking-wider rounded-md">
              Jetzt anfragen <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">Das könnte dich auch interessieren</h2>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r!.slug}>
                    <Link href={`/fitness-faq/${r!.slug}`} className="text-ink/70 hover:text-gold transition-colors font-semibold">
                      {r!.question}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/fitness-faq" className="text-ink/70 hover:text-gold transition-colors font-semibold">
                    Alle Fitness-Fragen ansehen
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
