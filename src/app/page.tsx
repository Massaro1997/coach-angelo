"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import LeadWizard from "@/components/LeadWizard";
import Trasformazioni from "@/components/Trasformazioni";

/*
  Home, tema FITPRIMO (03/10/2026), sul modello del template Trainex.

  Calogero ha chiesto di rifare il frontend come quel sito, con il marchio
  nuovo. L'ordine delle fasce segue Trainex: hero chiaro con la foto a
  sinistra e il titolo a destra, poi chi e', i servizi a schede, la squadra,
  le recensioni, il pannello colorato con l'offerta. I testi sono quelli della
  home di prima.

  Storia delle correzioni, per non rifare gli stessi errori:
  - Le forme di sfondo sono i blocchi inclinati (fp-forma), NON il simbolo AM
    gigante. Un giro con il simbolo enorme dietro Angelo e le schede con la
    tacca e' stato bocciato: "i quadrati di prima erano piu' professionali".
    Il simbolo AM si usa in piccolo: angolo delle recensioni, pannello
    dell'offerta, chiusura.
  - Niente riga delle tre promesse sotto i pulsanti dell'hero.
  - La sottolineatura del titolo e' un tratto fine, non una barra.
  - Il wizard sta subito sotto l'hero, largo quanto la pagina, a tessere con
    l'icona grande, senza scheda intorno.

  La home di prima del rebranding sta in brand/sito-prima-del-rebranding/.
*/

// La squadra di tre la vuole Calogero, ma i due nomi nuovi non ci sono ancora.
// Dal 04/10 la fascia ha tre figure a braccia conserte come i ritratti di
// Trainex ("il primo è Angelo e gli altri due inventali", poi "il secondo una
// femmina bionda", "il terzo con una veste da dottore, che fa
// l'alimentazione"). Sono figure d'esempio fatte con scripts/genera-squadra.mjs:
// la trainer e il nutrizionista non esistono, e anche Angelo e' rifatto dal
// modello partendo dalle sue foto vere. Per questo la fascia si vede solo in
// sviluppo, per giudicare l'impaginazione: in produzione sarebbero
// collaboratori inventati. Quando ci sono persone, nomi e foto veri (per
// Angelo: una foto vera o il suo ok a questa), si mette a true.
const SQUADRA_PRONTA = false;
const mostraSquadra = SQUADRA_PRONTA || process.env.NODE_ENV !== "production";

function Stelle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-gold" aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9z" />
        </svg>
      ))}
    </span>
  );
}

/** La parola in rosso del titolo, con il tratto fine sotto. */
function Sottolineata({ children }: { children: React.ReactNode }) {
  return (
    <span className="fp-sotto text-gold">
      {children}
      <svg viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden>
        <path
          d="M2 6 C 80 2, 200 2, 298 5"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const de = language === 'de';

  const heroHeadline1 = de ? 'In 90 Tagen ein' : 'In 90 giorni un';
  const heroHeadlineHighlight = de ? 'neuer Körper.' : 'corpo nuovo.';
  const heroHeadline2 = de ? 'Garantiert.' : 'Garantito.';

  // Niente "Meine Leistungen": i titoli dicono il beneficio (Calogero, 04/10:
  // "ci devi scrivere tipo inizia il tuo percorso di miglioramento").
  const servicesTitle = de ? 'Starte deinen Weg zu' : 'Inizia il tuo percorso';
  const servicesTitleHighlight = de ? 'deiner besten Form' : 'di miglioramento';

  const services = de ? [
    {
      num: "01",
      title: "FERTIGE PLÄNE",
      price: "ab €25",
      tag: "-50%",
      img: "/images/services/piani-chiaro.jpg",
      desc: "Fertige PDF-Programme für Anfänger, Fortgeschrittene und Profis. Sofortiger Download nach dem Kauf.",
      cta: "Jetzt kaufen",
    },
    {
      num: "02",
      title: "ONLINE COACHING",
      price: "ab €150/Monat",
      img: "/images/services/online-chiaro.jpg",
      desc: "Individueller Trainingsplan, Ernährungsberatung und wöchentliche Check-ins. Betreuung, wo immer du bist.",
      cta: "Anfragen",
      featured: true,
    },
    {
      num: "03",
      title: "PERSONAL TRAINING",
      price: "€50/Std",
      tag: "Nur Köln",
      img: "/images/services/personal-chiaro.jpg",
      desc: "1-zu-1 Training im Fitnessstudio in Köln. Echtzeit-Technikkorrektur und konstante Motivation.",
      cta: "Buchen",
    },
  ] : [
    {
      num: "01",
      title: "SCHEDE PRONTE",
      price: "da €25",
      tag: "-50%",
      img: "/images/services/piani-chiaro.jpg",
      desc: "Programmi PDF pronti per Beginner, Intermediate e Advanced. Download immediato dopo l'acquisto.",
      cta: "Acquista ora",
    },
    {
      num: "02",
      title: "COACHING ONLINE",
      price: "da €150/mese",
      img: "/images/services/online-chiaro.jpg",
      desc: "Scheda personalizzata, supporto alimentare e check settimanali. Ti seguo ovunque tu sia.",
      cta: "Richiedi",
      featured: true,
    },
    {
      num: "03",
      title: "PERSONAL TRAINING",
      price: "€50/ora",
      tag: "Solo Colonia",
      img: "/images/services/personal-chiaro.jpg",
      desc: "Allenamenti 1-to-1 in palestra a Colonia. Correzione tecnica in tempo reale e motivazione costante.",
      cta: "Prenota",
    },
  ];

  const featuredLabel = de ? '★ Bestseller' : '★ Il più richiesto';
  const allServicesCta = de ? 'Alle Leistungen' : 'Tutti i Servizi';

  return (
    <div className="fp overflow-x-clip">
      {/* ------------------------------------------------------------------ hero
          Come Trainex: foto a sinistra con due cartellini che galleggiano,
          titolo a destra con una parola sottolineata. Sul telefono il titolo
          sale sopra la foto. */}
      <section className="fp-hero relative isolate overflow-hidden pt-[72px] lg:pt-[84px]">
        <div aria-hidden className="fp-forma -left-10 top-28 hidden h-56 w-40 bg-gold/[0.07] lg:block" />
        <div aria-hidden className="fp-forma right-[6%] top-24 hidden h-20 w-28 bg-ink/[0.04] lg:block" />

        <div className="mx-auto grid max-w-7xl items-center gap-2 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:px-8">
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto h-[clamp(340px,56vh,520px)] max-w-[520px] lg:h-[clamp(480px,74vh,680px)]">
              {/* le due forme inclinate dietro Angelo */}
              <div aria-hidden className="fp-forma bottom-0 left-[12%] h-[78%] w-[52%] bg-gradient-to-br from-[#ff2b3a] to-[#c1000f] opacity-90" />
              <div aria-hidden className="fp-forma bottom-[14%] left-[46%] h-[56%] w-[40%] bg-ink/[0.07]" />
              <Image
                src="/images/Foto Angelo/hero-angelo.png"
                alt={de
                  ? 'Angelo Magliarisi, Personal Trainer und WABBA International Athlet in Köln'
                  : 'Angelo Magliarisi, personal trainer e atleta WABBA International a Colonia'}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="object-contain object-bottom"
              />

              {/* cartellini: solo numeri che Angelo ha confermato */}
              <div className="fp-scheda absolute left-0 top-[16%] flex items-center gap-3 px-4 py-3 sm:left-[-2%]">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <span className="leading-tight">
                  <span className="fp-titolo block text-xl text-ink">100+</span>
                  <span className="block text-xs text-ink/60">{de ? 'Transformationen' : 'trasformazioni'}</span>
                </span>
              </div>
              <div className="fp-scheda absolute bottom-[12%] right-0 flex items-center gap-3 px-4 py-3 sm:right-[-2%]">
                <span className="leading-tight">
                  <Stelle />
                  <span className="mt-1 block text-xs text-ink/60">
                    <span className="font-extrabold text-ink">4,9</span> {de ? 'von 5' : 'su 5'}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 pb-6 pt-8 lg:order-2 lg:pb-24 lg:pt-10">
            <h1 className="fp-titolo text-[clamp(34px,9vw,52px)] !leading-[1.2] text-ink lg:text-[clamp(44px,4.6vw,68px)]">
              {heroHeadline1}{' '}
              <Sottolineata>{heroHeadlineHighlight}</Sottolineata>
              <br />
              {heroHeadline2}
            </h1>

            {/* Una riga per prestazione e citta': al titolo mancano entrambe. */}
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink/70 lg:text-lg">
              {de
                ? 'Online Coaching und Personal Training in Köln.'
                : 'Coaching online e personal training a Colonia.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#inizia" className="fp-btn">
                {de ? 'Kostenlose Beratung' : 'Consulenza gratuita'} <span aria-hidden>→</span>
              </a>
              <Link href="/servizi" className="fp-btn-linea">
                {allServicesCta}
              </Link>
            </div>
          </div>
        </div>

        {/* il taglio inclinato in fondo all'hero, come in Trainex */}
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 block h-8 w-full sm:h-14" aria-hidden>
          <path d="M0 100 L1000 100 L1000 0 Z" fill="#ffffff" />
        </svg>
      </section>

      {/* ----------------------------------------------------------------- wizard
          Le cinque domande, subito sotto l'hero. Larghe quanto la pagina, a
          tessere con l'icona grande: non una scheda appoggiata. */}
      <section id="inizia" className="relative scroll-mt-24 bg-white pb-16 pt-12 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <LeadWizard bare largo />
        </div>
      </section>

      {/* La fascia "Atleta WABBA International" non sta piu' qui: dal 04/10 e'
          la pagina Über mich (src/app/chi-sono/page.tsx). */}

      {/* ------------------------------------------------------------ ti aiutiamo
          La "Stay Fit And Healthy" di Trainex: a sinistra titolo, testo,
          quattro spunte su due colonne e il pulsante; a destra la foto con
          gli angoli tondi, due forme dietro e il manubrio sull'angolo.

          Calogero, 04/10: il testo di prima ("Erkennst du dich wieder?",
          quattro paragrafi) era incoraggiante ma serviva "una via di mezzo"
          con un testo che dica che aiutiamo le persone, e una foto di Angelo
          con una cliente, con la maglia FITPRIMO. Un primo giro con due
          paragrafi era ancora "troppo lungo, troppo complicato": lo vuole
          "semplice ed effetto". Quindi titolo corto e tre frasi. Qui si parla
          al plurale.
          Il testo di prima e l'infografica (percorso-infografica.png) stanno
          in brand/sito-prima-del-rebranding/.

          La foto e' fatta dal modello (scripts/genera-squadra.mjs): la
          cliente non esiste e Angelo e' ricostruito dalle sue foto. Da
          sostituire con una foto vera appena c'e'. */}
      <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            <div>
              <h2 className="fp-titolo mb-7 text-4xl text-ink md:text-5xl">
                {de ? (
                  <>Du schaffst das. <span className="whitespace-nowrap text-gold">Wir helfen dir.</span></>
                ) : (
                  <>Ce la fai. <span className="whitespace-nowrap text-gold">Ti aiutiamo noi.</span></>
                )}
              </h2>
              <p className="max-w-lg text-xl leading-relaxed text-ink/75">
                {de
                  ? 'Du bist nicht faul. Dir hat nur der richtige Plan gefehlt. Und jemand, der an deiner Seite bleibt.'
                  : 'Non sei pigro. Ti è mancato solo il piano giusto. E qualcuno che ti resti accanto.'}
              </p>

              <ul className="mt-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 font-semibold text-ink sm:grid-cols-2">
                {(de
                  ? ['Plan nach Maß', 'Ernährung, die passt', 'Wöchentliche Check-ins', 'In Köln oder online']
                  : ['Piano su misura', 'Alimentazione seguita', 'Check settimanali', 'A Colonia o online']
                ).map((voce) => (
                  <li key={voce} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {voce}
                  </li>
                ))}
              </ul>

              <a href="#inizia" className="fp-btn mt-10">
                {de ? 'Ja, das bin ich. Los geht\'s' : 'Sì, sono io. Si parte'} <span aria-hidden>→</span>
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-[620px] pb-12 pt-10 lg:pb-16 lg:pt-14">
              {/* dietro la foto: i blocchi inclinati, dove Trainex mette i segni del suo logo */}
              <div aria-hidden className="fp-forma -right-4 top-0 h-56 w-36 bg-gold/[0.16] sm:-right-10" />
              <div aria-hidden className="fp-forma -left-6 bottom-2 h-56 w-36 border-2 border-gold/25 sm:-left-12" />
              <div className="relative z-10 aspect-[3/2] overflow-hidden rounded-[10px] shadow-[0_10px_40px_rgba(227,6,19,0.12)]">
                {/* 07/10, Calogero: qui una foto campione SENZA persone (niente
                    trainer o clienti generati). La sala pronta per l'allenamento. */}
                <Image
                  src="/images/services/seduta-chiaro-2.jpg"
                  alt={de
                    ? 'Heller Trainingsraum mit Matten, Kettlebell und Hantelbank'
                    : 'Sala di allenamento luminosa con tappetini, kettlebell e panca'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover"
                />
              </div>
              {/* il manubrio sull'angolo, davanti alla foto */}
              <Image
                src="/images/squadra/manubrio.png"
                alt=""
                aria-hidden
                width={700}
                height={438}
                sizes="250px"
                className="absolute -left-5 -bottom-3 z-20 w-[34%] max-w-[210px] drop-shadow-[0_18px_22px_rgba(18,18,20,0.3)] sm:-left-20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- servizi
          Schede bianche: foto sopra, testo sotto. */}
      <section className="relative bg-white py-20 sm:py-28">
        <div aria-hidden className="fp-forma -right-10 top-16 hidden h-48 w-36 bg-gold/[0.06] lg:block" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="fp-titolo text-4xl text-ink md:text-5xl">
              {servicesTitle} <span className="whitespace-nowrap text-gold">{servicesTitleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.num}
                href="/servizi"
                className={`fp-scheda group flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                  service.featured ? '!border-gold' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute left-3 top-3 flex gap-2">
                    {service.featured && (
                      <span className="rounded-md bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {featuredLabel}
                      </span>
                    )}
                    {service.tag && (
                      <span className="rounded-md bg-[#121214] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {service.tag}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="fp-titolo text-xl text-ink">{service.title}</h3>
                    <span className="whitespace-nowrap font-extrabold text-gold">{service.price}</span>
                  </div>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/65">{service.desc}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-bold uppercase tracking-wider text-gold">
                    {service.cta} <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/servizi" className="fp-btn">
              {allServicesCta} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- risultati
          Le foto prima e dopo: lo stesso blocco che chiude le altre pagine. */}
      <Trasformazioni fondo="grigio" />

      {/* ---------------------------------------------------------------- squadra
          "Meet Our Trainers" di Trainex: la scheda grande del titolare a
          sinistra, il titolo in alto a destra e sotto due schede piu'
          piccole, la seconda un po' piu' in basso. Nelle schede le persone
          sono scontornate, a braccia conserte, su un fondo appena colorato
          con i blocchi inclinati. Si vede solo in sviluppo: vedi
          SQUADRA_PRONTA in cima al file. */}
      {mostraSquadra && (
        <section className="relative bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
              <figure className="lg:col-span-5">
                <div className="relative h-[460px] overflow-hidden rounded-2xl bg-[#fdf1f2] lg:h-[580px]">
                  <div aria-hidden className="fp-forma -left-6 top-10 h-44 w-32 bg-gold/[0.09]" />
                  <div aria-hidden className="fp-forma -right-8 bottom-14 h-56 w-40 border border-gold/20" />
                  {/* Le tre figure hanno la testa della stessa grandezza: il modello le
                      ha inquadrate ognuna a modo suo, quindi ognuna ha la sua altezza
                      (misure da scratchpad/misura-teste.py: la testa e' 0,239 della
                      figura per Angelo, 0,258 per la trainer, 0,183 per il
                      nutrizionista). Il bordo della scheda le taglia ai fianchi.
                      06/10: Angelo e' la foto da studio nuova (brand/foto-profilo/
                      chiaro-a, scontornata), piu' vicina: "non cosi' a busto
                      lungo, tagliala un po'". La scheda la taglia sotto le braccia. */}
                  <Image
                    src="/images/squadra/angelo-studio-v2.png"
                    alt="Angelo Magliarisi"
                    width={1000}
                    height={1484}
                    sizes="(max-width: 1024px) 90vw, 470px"
                    className="absolute left-1/2 top-[7%] h-auto w-[92%] max-w-none -translate-x-1/2"
                  />
                  {/* i suoi profili veri, come i tondi nelle schede di Trainex */}
                  <div className="absolute right-4 top-4 flex flex-col gap-2.5">
                    <a
                      href="https://www.instagram.com/am_fitprimo"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gold shadow-[0_8px_20px_-10px_rgba(18,18,20,0.4)] transition-colors hover:bg-gold hover:text-white"
                    >
                      <svg className="h-[17px] w-[17px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a
                      href="https://www.tiktok.com/@am_fitprimo"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gold shadow-[0_8px_20px_-10px_rgba(18,18,20,0.4)] transition-colors hover:bg-gold hover:text-white"
                    >
                      <svg className="h-[17px] w-[17px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                    </a>
                  </div>
                </div>
                <figcaption className="mt-5 text-center">
                  <span className="fp-titolo block text-2xl text-ink">Angelo Magliarisi</span>
                  <span className="mt-1 block text-ink/60">{de ? 'Gründer und Personal Trainer' : 'Fondatore e personal trainer'}</span>
                </figcaption>
              </figure>

              <div className="lg:col-span-7">
                <div className="mb-10 lg:mb-12 lg:text-right">
                  <h2 className="fp-titolo text-4xl text-ink md:text-5xl">
                    {de ? <>Dein <span className="text-gold">Trainerteam</span></> : <>La tua <span className="text-gold">squadra</span></>}
                  </h2>
                  {/* Il cartellino "Solo in bozza" Calogero l'ha fatto togliere
                      (04/10). La fascia resta comunque spenta in produzione:
                      lo decide SQUADRA_PRONTA, non una scritta. */}
                </div>
                <div className="grid grid-cols-2 gap-5 sm:gap-7">
                  {[
                    {
                      src: "/images/squadra/trainer.png",
                      w: 613,
                      misura: 'top-[8%] h-[98%]',
                      ruolo: de ? 'Personal Trainerin' : 'Personal trainer',
                    },
                    {
                      src: "/images/squadra/ernaehrung.png",
                      w: 488,
                      misura: 'top-[8%] h-[136%]',
                      ruolo: de ? 'Ernährung' : 'Alimentazione',
                    },
                  ].map((p, i) => (
                    <figure key={p.src} className={i === 1 ? 'lg:mt-9' : ''}>
                      <div className="relative h-[270px] overflow-hidden rounded-2xl bg-[#fdf1f2] sm:h-[360px]">
                        <div aria-hidden className="fp-forma -left-5 top-8 h-28 w-20 bg-gold/[0.09]" />
                        <div aria-hidden className="fp-forma -right-6 bottom-10 h-36 w-24 border border-gold/20" />
                        <Image
                          src={p.src}
                          alt={de ? 'Beispielbild' : "Figura d'esempio"}
                          width={p.w}
                          height={1300}
                          sizes="(max-width: 1024px) 45vw, 240px"
                          className={`absolute left-1/2 w-auto max-w-none -translate-x-1/2 ${p.misura}`}
                        />
                      </div>
                      <figcaption className="mt-5 text-center">
                        {/* niente nome: sono figure d'esempio, il nome arriva con la persona vera */}
                        <span className="fp-titolo block text-xl text-ink">{p.ruolo}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Le recensioni non stanno piu' in questa pagina: le mette LayoutWrapper
          in fondo a ogni pagina del sito (src/lib/chiusura-pagina.ts). */}

      {/* Tolte il 04/10 su richiesta di Calogero: la fascia dell'offerta
          "Das Coach Angelo Versprechen" e la chiusura "Bereit für
          Veränderung?". Dopo la squadra vengono le recensioni e il pie' di
          pagina. I testi di prima stanno in brand/sito-prima-del-rebranding/. */}
    </div>
  );
}
