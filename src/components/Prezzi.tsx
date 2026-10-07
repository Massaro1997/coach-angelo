"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import SimboloAM from "@/components/SimboloAM";

/*
  I prezzi dei percorsi, come nella pagina Pricing del template Trainex:
  tre schede affiancate, le due ai lati su un fondo appena colorato con il
  pulsante pieno, quella al centro tutta nel colore del marchio, piu' alta,
  con l'etichetta e il pulsante bianco. In ogni scheda: nome, prezzo grande,
  una riga, il filo, l'elenco con le spunte nel cerchio, il pulsante. In
  basso a destra il simbolo del marchio disegnato a filo.

  Chiesto da Calogero il 04/10/2026. Prezzi e voci sono quelli che c'erano.

  I pulsanti portano alla consulenza e non al carrello: il sito e' tornato a
  raccogliere contatti (Calogero, 04/10).

  Il testo sopra le schede: un titolo come "I miei prezzi" o "Meine
  Leistungen" a Calogero "fa schifo". Lo vuole come in Trainex ("Healthy
  Living Simplified" e sotto una riga che spiega con garbo da cosa dipende il
  costo): un titolo sul beneficio e una frase delicata, mai il listino in
  faccia.
*/

function Spunta({ chiara }: { chiara: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
        chiara ? "bg-white/20 text-white" : "bg-gold/10 text-gold"
      }`}
    >
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export default function Prezzi({ titoloPagina = false }: { /** apre la pagina: il titolo e' l'h1 e sta sotto la testata */ titoloPagina?: boolean }) {
  const { language } = useLanguage();
  const de = language === "de";
  const Titolo = titoloPagina ? "h1" : "h2";

  const piani = [
    {
      mesi: 3,
      obiettivo: de ? "Kurzzeit-Ziel" : "Obiettivo a breve termine",
      prezzo: 450,
      nota: de ? "150€/Monat" : "150€/mese",
      evidenza: false,
    },
    {
      mesi: 6,
      obiettivo: de ? "Mittelfristiges Ziel" : "Obiettivo a medio termine",
      prezzo: 850,
      nota: de ? "oder ~142€/Monat in Raten" : "o ~142€/mese a rate",
      evidenza: true,
    },
    {
      mesi: 12,
      obiettivo: de ? "Langfristige Transformation" : "Trasformazione a lungo termine",
      prezzo: 1500,
      nota: de ? "oder 125€/Monat in Raten" : "o 125€/mese a rate",
      evidenza: false,
    },
  ];

  const voci = de
    ? [
        "Maßgeschneiderter Trainingsplan",
        "Personalisierter Ernährungsplan",
        "Wöchentliche Check-ins",
        "24/7 WhatsApp Support",
      ]
    : [
        "Scheda di allenamento su misura",
        "Piano alimentare personalizzato",
        "Check settimanali",
        "Supporto WhatsApp 24/7",
      ];

  return (
    <section
      id="percorso"
      className={`fp relative scroll-mt-24 overflow-hidden pb-20 sm:pb-28 ${
        titoloPagina ? "fp-hero pt-32 sm:pt-36 lg:pt-44" : "bg-white pt-20 sm:pt-28"
      }`}
    >
      {titoloPagina && (
        <>
          <div aria-hidden className="fp-forma -left-10 top-32 hidden h-48 w-36 bg-gold/[0.07] lg:block" />
          <div aria-hidden className="fp-forma right-[7%] top-36 hidden h-20 w-28 bg-ink/[0.04] lg:block" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-20">
          <Titolo
            className={`fp-titolo text-ink ${
              titoloPagina ? "text-[clamp(36px,9.5vw,54px)] lg:text-[clamp(46px,4.4vw,64px)]" : "text-4xl md:text-5xl"
            }`}
          >
            {de ? (
              <>Gesund leben, <span className="whitespace-nowrap text-gold">einfach gemacht</span></>
            ) : (
              <>Stare bene, <span className="whitespace-nowrap text-gold">reso semplice</span></>
            )}
          </Titolo>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
            {de
              ? "Was ein Personal Trainer kostet, hängt von mehreren Dingen ab: von der Dauer, von deinem Ziel und davon, wie eng ich dich begleite. Hier siehst du die drei Wege, ganz in Ruhe."
              : "Il costo di un personal trainer dipende da più cose: dalla durata, dal tuo obiettivo e da quanto da vicino ti seguo. Qui trovi i tre percorsi, da guardare con calma."}
          </p>
        </div>

        <div className="mx-auto grid max-w-md grid-cols-1 gap-7 lg:max-w-none lg:grid-cols-3">
          {piani.map((p) => (
            <article
              key={p.mesi}
              className={`relative flex flex-col overflow-hidden rounded-[14px] px-8 py-10 sm:px-10 ${
                p.evidenza
                  ? "bg-gradient-to-br from-[#ff2b3a] via-[#e30613] to-[#b3000e] text-white shadow-[0_34px_70px_-28px_rgba(227,6,19,0.65)] lg:-my-5 lg:py-[3.75rem]"
                  : titoloPagina
                    ? // sul fondo rosato dell'hero la scheda colorata sparisce: bianca con l'ombra
                      "border border-ink/[0.06] bg-white text-ink shadow-[0_22px_50px_-28px_rgba(18,18,20,0.3)]"
                    : "bg-[#fdf1f2] text-ink"
              }`}
            >
              <SimboloAM
                contorno
                className={`pointer-events-none absolute -bottom-5 -right-10 h-40 ${
                  p.evidenza ? "text-white/30" : "text-gold/25"
                }`}
              />

              <div className="relative flex items-center justify-between gap-3">
                <h3 className="fp-titolo text-2xl">
                  {p.mesi} {de ? "Monate" : "mesi"}
                </h3>
                {p.evidenza && (
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
                    {de ? "Empfohlen" : "Consigliato"}
                  </span>
                )}
              </div>

              <p className="fp-titolo relative mt-7 text-6xl">€{p.prezzo.toLocaleString("de-DE")}</p>
              <p className={`relative mt-2 text-sm ${p.evidenza ? "text-white/80" : "text-ink/55"}`}>{p.nota}</p>
              <p className={`relative mt-5 text-[15px] ${p.evidenza ? "text-white/85" : "text-ink/70"}`}>{p.obiettivo}</p>

              <hr className={`relative my-7 ${p.evidenza ? "border-white/25" : "border-ink/10"}`} />

              <ul className="relative flex-1 space-y-3.5 text-[15px] font-medium">
                {voci.map((v) => (
                  <li key={v} className="flex items-center gap-3">
                    <Spunta chiara={p.evidenza} />
                    {v}
                  </li>
                ))}
              </ul>

              <Link
                href="/contatti"
                className={
                  p.evidenza
                    ? "relative mt-9 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-7 py-[0.95rem] text-sm font-bold uppercase tracking-[0.08em] text-gold transition-transform duration-200 hover:-translate-y-0.5"
                    : "fp-btn relative mt-9 w-full"
                }
              >
                {de ? "Weg starten" : "Inizia il percorso"} <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-14 flex items-center justify-center gap-3 text-center text-[15px] text-ink/70 lg:mt-20">
          <svg className="h-5 w-5 shrink-0 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          {/* 14 giorni, non 30: e' quello che dicono le condizioni (/termini,
              punto 4) e la cassa. Calogero, 04/10: la riga di prima
              ("30 Tage Geld-zurück-Garantie bei Unzufriedenheit") era
              sbagliata nel numero e nel tono. */}
          <span>
            {de
              ? "Du hast 14 Tage Zeit, in Ruhe zu starten. Passt es nicht zu dir, bekommst du dein Geld zurück."
              : "Hai 14 giorni per partire con calma. Se non fa per te, ti restituisco quanto hai pagato."}{" "}
            <Link href="/termini" className="whitespace-nowrap underline decoration-ink/25 underline-offset-4 transition-colors hover:text-gold">
              {de ? "Bedingungen" : "Condizioni"}
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
}
