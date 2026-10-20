import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts, getPost } from "@/lib/blog-posts";

const siteUrl = "https://www.fitprimo.de";

// Correlati per tema: overlap di token nello slug, fallback sui più recenti.
// Deterministico a build time, distribuisce link interni su tutti gli articoli.
const STOP = new Set(["koeln", "tipps", "guide", "erfahrungen", "uebungen", "was", "wie", "und", "oder", "ohne", "mit", "fuer", "der", "die", "das", "dem", "nach", "ab"]);
function relatedPosts(slug: string, count = 8) {
  const tokens = new Set(slug.split("-").filter((t) => t.length > 3 && !STOP.has(t)));
  return allPosts
    .filter((p) => p.slug !== slug)
    .map((p, i) => {
      let score = 0;
      for (const t of p.slug.split("-")) if (tokens.has(t)) score += 2;
      return { p, score, i };
    })
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, count)
    .map((r) => r.p);
}

// Riga d'offerta del box finale, scelta dal tema dello slug. Prezzi veri già
// pubblicati su /servizi e nell'articolo costi. Hyrox riceve il testo generico:
// Angelo non prepara per Hyrox.
function ctaLead(slug: string): string {
  const generic =
    "Du willst trainieren mit einem Plan, der zu deinem Alltag passt? Angelo trainiert dich 1-zu-1 in Köln: 50 € pro Stunde, im Studio, draußen oder bei dir zu Hause. Online Coaching gibt es ab 150 € im Monat.";
  if (/hyrox/.test(slug)) return generic;
  if (/frauen|ab-50|wechseljahre/.test(slug))
    return "Du willst stärker werden, ohne dich an Geräten durchzuraten? Angelo trainiert dich 1-zu-1 in Köln: 50 € pro Stunde, im Studio, draußen oder bei dir zu Hause. Online Coaching gibt es ab 150 € im Monat.";
  if (/muskelaufbau|ab-40|mann|testosteron|bierbauch/.test(slug))
    return "Du willst Muskeln aufbauen, ohne deine Gelenke zu verheizen? Angelo trainiert dich 1-zu-1 in Köln: 50 € pro Stunde, im Studio, draußen oder bei dir zu Hause. Online Coaching gibt es ab 150 € im Monat.";
  if (/abnehm|abnehmen|gewicht|grundumsatz|kalorien/.test(slug))
    return "Du willst abnehmen und das Ergebnis diesmal halten? Angelo trainiert dich 1-zu-1 in Köln, Natalie berät dich bei der Ernährung. 50 € pro Stunde, Online Coaching ab 150 € im Monat.";
  if (/schmerz|ruecken|knie|schulter|nacken|faszien|mobility|beweglichkeit/.test(slug))
    return "Du willst trainieren, ohne dass es wehtut? Angelo baut dein Training 1-zu-1 um deine Baustellen herum auf: 50 € pro Stunde in Köln, im Studio, draußen oder bei dir zu Hause.";
  if (/lauf|joggen|zone-2|marathon|ausdauer/.test(slug))
    return "Du willst ausdauernder werden und verletzungsfrei bleiben? Angelo kombiniert dein Lauftraining mit Krafttraining, 1-zu-1 in Köln: 50 € pro Stunde. Online Coaching gibt es ab 150 € im Monat.";
  return generic;
}

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "de_DE",
      url,
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.date,
      authors: ["Angelo Magliarisi"],
      images: ["/opengraph-image"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${siteUrl}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Blog", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 2, name: post.title, item: url },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        dateModified: post.date,
        image: `${siteUrl}/opengraph-image`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: {
          "@type": "Person",
          name: "Angelo Magliarisi",
          url: siteUrl,
          jobTitle: "Personal Trainer",
        },
        publisher: {
          "@type": "Organization",
          name: "FitPrimo",
          logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="pt-32 sm:pt-40 pb-20 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="mb-5 text-sm font-medium text-ink/50">
            <Link href="/blog" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">Blog</Link> ·{" "}
            {new Date(post.date).toLocaleDateString("de-DE")} · {post.readMinutes} Min.
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink mb-10 leading-tight">
            {post.title}
          </h1>

          <div className="space-y-6">
            {post.blocks.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="text-2xl fp-titolo text-ink pt-6">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "table") {
                return (
                  <div key={i} className="overflow-x-auto">
                    <table className="w-full text-left text-ink/70">
                      <thead>
                        <tr className="border-b border-ink/20">
                          {block.headers?.map((h, j) => (
                            <th key={j} className="py-3 pr-4 font-black text-ink">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows?.map((row, j) => (
                          <tr key={j} className="border-b border-ink/10">
                            {row.map((cell, k) => (
                              <td key={k} className="py-3 pr-4 leading-relaxed">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="space-y-3">
                    {block.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-ink/70 leading-relaxed">
                        <svg className="w-5 h-5 text-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-ink/70 leading-relaxed text-lg">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="fp-scheda mt-14 p-8">
            <h3 className="text-xl fp-titolo text-ink mb-3">
              Trainier mit Plan statt auf gut Glück
            </h3>
            <p className="text-ink/60 mb-4 max-w-prose">
              {ctaLead(post.slug)}
            </p>
            <p className="text-ink/60 mb-6 max-w-prose">
              Die Erstberatung ist kostenlos: 5 kurze Fragen, ehrliche Einschätzung, Antwort
              innerhalb von 24 Stunden. Kein Verkaufsgespräch, versprochen.
            </p>
            <Link
              href="/contatti"
              className="fp-btn"
            >
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
            <p className="mt-5 text-sm">
              <Link
                href="/personal-trainer-koeln"
                className="font-semibold text-ink/70 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold"
              >
                Personal Training in Köln: Leistungen, Preise und Stadtteile
              </Link>
            </p>
          </div>

          {/* Altri articoli */}
          <div className="mt-14">
            <h3 className="fp-titolo mb-5 text-xl text-ink">
              Mehr lesen
            </h3>
            <ul className="space-y-3">
              {relatedPosts(post.slug)
                .map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="text-ink/70 hover:text-gold transition-colors font-semibold">
                      {p.title}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/personal-trainer-koeln" className="text-ink/70 hover:text-gold transition-colors font-semibold">
                  Personal Trainer Köln: alle Stadtteile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
