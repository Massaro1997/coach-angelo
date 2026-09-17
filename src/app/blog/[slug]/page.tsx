import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts, getPost } from "@/lib/blog-posts";

const siteUrl = "https://www.angelocoach.com";

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
          name: "Coach Angelo",
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
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
            <Link href="/blog" className="hover:text-gold-soft">Blog</Link> ·{" "}
            {new Date(post.date).toLocaleDateString("de-DE")} · {post.readMinutes} Min.
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink mb-10 leading-tight">
            {post.title}
          </h1>

          <div className="space-y-6">
            {post.blocks.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="text-2xl font-black text-ink uppercase pt-6">
                    {block.text}
                  </h2>
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
          <div className="mt-14 border border-gold-deep rounded-lg p-8 bg-surface">
            <h3 className="text-xl font-black text-ink uppercase mb-3">
              Kostenlose Erstberatung
            </h3>
            <p className="text-ink/60 mb-6 max-w-prose">
              5 kurze Fragen, ehrliche Einschätzung, Antwort innerhalb von 24 Stunden. Kein
              Verkaufsgespräch, versprochen.
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center bg-gold text-white px-8 py-4 font-bold uppercase tracking-wider rounded-md"
            >
              Jetzt anfragen <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Altri articoli */}
          <div className="mt-14">
            <h3 className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
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
