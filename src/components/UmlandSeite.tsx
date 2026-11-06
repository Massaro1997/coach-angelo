import Link from "next/link";
import { UmlandOrt } from "@/lib/umland";

const siteUrl = "https://www.fitprimo.de";

// Pagina comune del Kölner Umland: stessa struttura per tutti i comuni,
// tutto il testo arriva da src/lib/umland.ts ed è unico per comune.
export default function UmlandSeite({ ort }: { ort: UmlandOrt }) {
  const url = `${siteUrl}/personal-trainer-${ort.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Personal Trainer Köln", item: `${siteUrl}/personal-trainer-koeln` },
          { "@type": "ListItem", position: 2, name: ort.name, item: url },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Personal Training",
        provider: {
          "@type": "Person",
          name: "Angelo Magliarisi",
          jobTitle: "Personal Trainer",
          url: siteUrl,
        },
        areaServed: { "@type": "City", name: ort.name, address: { "@type": "PostalAddress", addressRegion: "NRW", addressCountry: "DE" } },
        mainEntityOfPage: url,
      },
      {
        "@type": "FAQPage",
        mainEntity: ort.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="fp-hero pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl fp-titolo text-ink mb-6">
            {ort.h1Prefix} <span className="text-gold">{ort.name}</span>
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-prose">{ort.answer}</p>
          <div className="mt-6">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink/50">Unverbindlich. Antwort innerhalb von 24 Stunden.</p>
        </div>
      </section>

      {/* Sektionen */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-12">
          {ort.sections.map((s) => (
            <div key={s.title} className="max-w-prose">
              <h2 className="fp-titolo text-2xl sm:text-3xl text-ink mb-4">{s.title}</h2>
              <p className="text-ink/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-8">
            Häufige Fragen zu Personal Training in {ort.name}
          </h2>
          <div className="space-y-6">
            {ort.faq.map((f) => (
              <div key={f.q} className="border-b border-line pb-6">
                <h3 className="font-black text-ink mb-2">{f.q}</h3>
                <p className="text-ink/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mt-10 text-ink/60 max-w-prose">
            Ich trainiere auch in der Umgebung:{" "}
            {ort.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " · "}
                <Link href={l.href} className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
                  {l.name}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </section>
    </>
  );
}
