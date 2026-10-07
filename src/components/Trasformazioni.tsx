"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

/*
  Le trasformazioni dei clienti (foto prima e dopo), come blocco da mettere su
  qualunque pagina. Calogero, 04/10/2026: la pagina /testimonianze si toglie,
  "tanto le metteremo ovunque nel sito le recensioni e trasformazioni".
  Titoli e didascalie sono quelli della vecchia pagina.
*/
export default function Trasformazioni({ fondo = "grigio" }: { fondo?: "bianco" | "grigio" }) {
  const { language } = useLanguage();
  const de = language === "de";

  const voci = de
    ? [
        { title: "Komplette Transformation", desc: "Gewichtsverlust und Definition" },
        { title: "Muskelaufbau", desc: "+8kg Muskelmasse" },
        { title: "Körperrekomposition", desc: "Abnehmen und Straffen" },
        { title: "Definition", desc: "Athletische Vorbereitung" },
      ]
    : [
        { title: "Trasformazione Completa", desc: "Perdita peso e definizione" },
        { title: "Aumento Massa", desc: "+8kg massa muscolare" },
        { title: "Ricomposizione", desc: "Dimagrimento e tonificazione" },
        { title: "Definizione", desc: "Preparazione atletica" },
      ];

  return (
    <section
      className="fp relative py-20 sm:py-28"
      style={{ backgroundColor: fondo === "grigio" ? "#f4f4f5" : "#ffffff" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="fp-titolo text-4xl text-ink md:text-5xl">
            {de ? (
              <>Die Ergebnisse <span className="text-gold">sprechen</span></>
            ) : (
              <>I risultati <span className="text-gold">parlano</span></>
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/65">
            {de
              ? "Konkrete Ergebnisse, die meine Kunden mit Engagement und Hingabe erzielt haben."
              : "Risultati concreti ottenuti dai miei clienti con impegno e dedizione."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {voci.map((v, k) => (
            <figure key={v.title} className="overflow-hidden rounded-2xl bg-white shadow-[0_22px_50px_-28px_rgba(18,18,20,0.45)]">
              <div className="relative aspect-square">
                <Image
                  src={`/images/Testimonianze/before-after-${k + 1}.webp`}
                  alt={de ? `Kundentransformation: ${v.title}` : `Trasformazione cliente: ${v.title}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-4 py-4 sm:px-5">
                <span className="block text-[15px] font-bold leading-tight text-ink sm:text-base">{v.title}</span>
                <span className="mt-1 block text-sm text-ink/55">{v.desc}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
