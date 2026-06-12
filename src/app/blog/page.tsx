import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  title: "Fitness Blog Köln | Coach Angelo",
  description:
    "Ehrliche Antworten zu Training, Abnehmen und Muskelaufbau in Köln. Geschrieben von Angelo Magliarisi, Personal Trainer und WABBA International Athlet.",
  alternates: { canonical: `${siteUrl}/blog` },
};

export default function BlogIndex() {
  return (
    <>
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">Blog</p>
          <h1 className="text-4xl sm:text-5xl font-black text-ink uppercase mb-6">
            Ehrliche Antworten zu <span className="text-accent">Training & Ernährung</span>
          </h1>
          <p className="text-lg text-ink/60 max-w-prose">
            Kein Bro-Science, keine Wundermittel. Was ich hier schreibe, wende ich selbst als
            WABBA Wettkampfathlet an und mit meinen Kunden in Köln.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="border-t border-line">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block py-8 border-b border-line hover:bg-elevated/40 transition-colors px-2 -mx-2"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h2 className="text-xl sm:text-2xl font-black text-ink group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <span className="text-ink/40 text-sm whitespace-nowrap">
                    {post.readMinutes} Min.
                  </span>
                </div>
                <p className="text-ink/60 max-w-prose">{post.excerpt}</p>
                <span className="inline-block mt-3 text-gold font-bold text-sm uppercase tracking-wider">
                  Weiterlesen →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
