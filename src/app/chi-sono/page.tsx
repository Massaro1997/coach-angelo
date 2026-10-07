"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

/*
  Über mich / Chi sono, tema FITPRIMO (04/10/2026).

  Calogero ha chiesto di portare qui la fascia "Atleta WABBA International"
  che stava nella home, al posto di tutto quello che c'era. La pagina di prima
  (racconto lungo: Sicilia, dieci anni a Colonia, il palco, i clienti) sta in
  brand/sito-prima-del-rebranding/chi-sono-page.tsx.txt.

  Sistemato nel passaggio:
  - il titolo era in italiano anche nella versione tedesca;
  - nel terzo paragrafo tedesco c'era un trattino usato come pausa;
  - il pulsante "Mehr erfahren" portava a questa stessa pagina: ora porta alla
    consulenza;
  - qui e' il titolo della pagina, quindi e' un h1.
*/

function Spunta({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ChiSono() {
  const { language } = useLanguage();
  const de = language === "de";

  const testo1 = de
    ? "Ich bin Angelo, italienischer Personal Trainer mit Sitz in Köln. Als Wettkampfathlet im WABBA International Verband bringe ich meine Wettkampferfahrung in die Arbeit mit jedem Kunden ein."
    : "Sono Angelo, Personal Trainer italiano con base a Colonia. Atleta agonista nella federazione WABBA International, porto la mia esperienza di competizione nel lavoro con ogni cliente.";
  const testo2 = de
    ? "Meine Philosophie ist einfach: keine Abkürzungen, nur harte Arbeit, richtige Ernährung und Beständigkeit. Die Ergebnisse kommen immer, wenn man sich engagiert."
    : "La mia filosofia è semplice: niente scorciatoie, solo lavoro duro, alimentazione corretta e costanza. I risultati arrivano sempre quando c'è impegno.";
  const testo3 = de
    ? "Ob du abnehmen, Muskelmasse aufbauen oder dich auf einen Wettkampf vorbereiten möchtest: Ich habe das richtige Programm für dich."
    : "Che tu voglia perdere peso, aumentare la massa muscolare o prepararti per una competizione, ho il programma giusto per te.";

  const voci = de
    ? ["Personal Training in Köln", "Online Coaching", "Individueller Trainingsplan", "Persönlicher Ernährungsplan"]
    : ["Personal training a Colonia", "Coaching online", "Scheda su misura", "Piano alimentare personale"];

  return (
    <div className="fp overflow-x-clip">
      <section className="relative bg-white pb-24 pt-32 sm:pb-32 lg:pt-40">
        <div aria-hidden className="fp-forma -left-10 top-40 hidden h-56 w-40 bg-gold/[0.06] lg:block" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h1 className="fp-titolo text-[clamp(36px,9vw,52px)] text-ink lg:text-[clamp(44px,4.4vw,64px)]">
                {de ? (
                  <>
                    WABBA International
                    <br />
                    <span className="text-gold">Athlet</span>
                  </>
                ) : (
                  <>
                    Atleta WABBA
                    <br />
                    <span className="text-gold">International</span>
                  </>
                )}
              </h1>
              <div className="mt-8 max-w-prose space-y-5 text-lg leading-relaxed text-ink/70">
                <p>{testo1}</p>
                <p>{testo2}</p>
                <p>{testo3}</p>
              </div>

              <ul className="mt-9 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 text-base font-semibold text-ink sm:grid-cols-2">
                {voci.map((voce) => (
                  <li key={voce} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Spunta className="h-4 w-4" />
                    </span>
                    {voce}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/contatti" className="fp-btn">
                  {de ? "Kostenlose Beratung" : "Consulenza gratuita"} <span aria-hidden>→</span>
                </Link>
                <Link href="/servizi" className="fp-btn-linea">
                  {de ? "Alle Leistungen" : "Tutti i servizi"}
                </Link>
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div aria-hidden className="fp-forma -right-4 -top-6 h-40 w-32 bg-gold/[0.1]" />
              <div aria-hidden className="fp-forma -bottom-6 -left-4 h-28 w-40 bg-ink/[0.06]" />
              <div className="relative h-[460px] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(18,18,20,0.45)] lg:h-[600px]">
                <Image
                  src="/images/Foto Angelo/angelo-3.jpg"
                  alt={de
                    ? "Angelo Magliarisi mit der WABBA International Medaille"
                    : "Angelo Magliarisi con la medaglia WABBA International"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="fp-scheda absolute -bottom-5 right-5 px-5 py-3">
                <div className="fp-titolo text-xl text-gold">WABBA</div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-ink/60">International</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
