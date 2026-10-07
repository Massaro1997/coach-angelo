"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Prezzi from "@/components/Prezzi";

/*
  Leistungen / Servizi, tema FITPRIMO (04/10/2026).

  Calogero ha chiesto la sezione dei prezzi come la pagina Pricing di Trainex.
  Quella pagina e' fatta cosi': un titolo morbido e subito sotto le tre schede
  dei prezzi. Qui uguale: la pagina si apre con i percorsi (Prezzi.tsx), poi
  il personal training a Colonia, poi le schede pronte. Un primo giro con la
  fascia "Meine Leistungen" in cima e' stato bocciato: titoli come "i miei
  prezzi" fanno schifo, il testo dev'essere delicato come quello di Trainex. In fondo
  LayoutWrapper mette trasformazioni e recensioni.

  Testi e prezzi sono quelli della pagina di prima, che sta in
  brand/sito-prima-del-rebranding/servizi-page.tsx.txt. Cambiato:
  - niente etichette sopra i titoli (come nel resto del sito nuovo): "Nur in
    Köln" e "-50%" sono diventati cartellini sulle foto;
  - i percorsi non vanno piu' nel carrello ma alla consulenza. Le schede
    pronte da 25 € si comprano ancora: sono un PDF, non c'e' niente da
    chiedere, e il carrello si apre da solo.
*/

function Spunta() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export default function Servizi() {
  const { language } = useLanguage();
  const { addItem } = useCart();
  const de = language === "de";

  const t = {
    readyPlansDesc: de
      ? "Perfekt für alle, die sofort starten wollen. Wähle dein Level und erhalte deinen Plan direkt als PDF."
      : "Perfetto per chi vuole iniziare subito. Scegli il tuo livello e ricevi la scheda direttamente in PDF.",
    instantDownload: de ? "Sofortiger PDF Download" : "Download immediato PDF",
    demoVideos: de ? "Video-Demonstrationen" : "Video dimostrativi esercizi",
    buyNow: de ? "Jetzt kaufen" : "Acquista ora",
    contactNote: de ? "Fragen? Schreib mir über das Kontaktformular" : "Dubbi? Scrivimi dal form contatti",

    ptBadge: de ? "Nur in Köln" : "Solo a Colonia",
    ptDesc: de
      ? "Erreiche deine Ziele schneller mit persönlicher Betreuung. Technik-Korrektur, Motivation und maßgeschneiderte Anpassungen direkt im Training."
      : "Raggiungi i tuoi obiettivi più velocemente con il supporto personale. Correzione tecnica, motivazione e adattamenti su misura direttamente durante l'allenamento.",
    ptHour: de ? "/Stunde" : "/ora",
    ptCta: de ? "Termin buchen" : "Prenota un appuntamento",
  };

  const ptVoci = de
    ? ["Technik-Perfektionierung", "Maximale Motivation", "Individuelle Anpassung", "Ernährungs-Tipps"]
    : ["Perfezionamento tecnico", "Massima motivazione", "Adattamento individuale", "Consigli nutrizionali"];

  const schedePronte = [
    {
      id: "scheda-beginner",
      name: de ? "Anfänger Plan" : "Scheda Beginner",
      level: de ? "Anfänger" : "Principiante",
      experience: de ? "0-6 Monate Erfahrung" : "0-6 mesi di esperienza",
      img: "/images/services/scheda-beginner-chiaro.jpg",
      price: 25,
      originalPrice: 50,
    },
    {
      id: "scheda-intermediate",
      name: de ? "Fortgeschrittenen Plan" : "Scheda Intermediate",
      level: de ? "Fortgeschritten" : "Intermedio",
      experience: de ? "6-18 Monate Erfahrung" : "6-18 mesi di esperienza",
      img: "/images/services/scheda-intermediate-chiaro.jpg",
      price: 25,
      originalPrice: 50,
    },
    {
      id: "scheda-advanced",
      name: de ? "Profi Plan" : "Scheda Advanced",
      level: de ? "Profi" : "Avanzato",
      experience: de ? "> 18 Monate Erfahrung" : "> 18 mesi di esperienza",
      img: "/images/services/scheda-advanced-chiaro-2.jpg",
      price: 25,
      originalPrice: 50,
    },
  ];

  return (
    <div className="fp overflow-x-clip">
      {/* ------------------------------------------------------------- percorsi
          La pagina si apre qui: titolo sul beneficio, una riga delicata sul
          costo, le tre schede. Niente "Meine Leistungen" sopra. */}
      <Prezzi titoloPagina />

      {/* ---------------------------------------------------- personal training */}
      <section className="relative bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="fp-titolo text-4xl text-ink md:text-5xl">
                Personal Training <span className="whitespace-nowrap text-gold">{de ? "1-zu-1" : "1-to-1"}</span>
              </h2>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink/70">{t.ptDesc}</p>

              <div className="fp-scheda mt-9 p-7 sm:p-8">
                <p className="flex items-baseline gap-2">
                  <span className="fp-titolo text-5xl text-gold">€50</span>
                  <span className="text-ink/60">{t.ptHour}</span>
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3.5 text-[15px] font-medium text-ink sm:grid-cols-2">
                  {ptVoci.map((v) => (
                    <li key={v} className="flex items-center gap-3">
                      <Spunta />
                      {v}
                    </li>
                  ))}
                </ul>
                <Link href="/contatti" className="fp-btn mt-8 w-full">
                  {t.ptCta} <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div aria-hidden className="fp-forma -right-4 -top-6 h-40 w-32 bg-gold/[0.1]" />
              <div aria-hidden className="fp-forma -bottom-6 -left-4 h-28 w-40 bg-ink/[0.06]" />
              <div className="relative h-64 overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(18,18,20,0.45)] sm:h-80 lg:h-[400px]">
                <Image
                  src="/images/services/seduta-chiaro-4.jpg"
                  alt={de ? "Zwei Matten, Hanteln und Handtücher, vorbereitet für ein Personal Training 1-zu-1" : "Due tappetini, manubri e asciugamani pronti per una seduta di personal training 1-to-1"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-md bg-[#121214] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {t.ptBadge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- schede pronte */}
      <section className="relative bg-white py-20 sm:py-28">
        <div aria-hidden className="fp-forma -right-10 top-16 hidden h-48 w-36 bg-gold/[0.06] lg:block" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="fp-titolo text-4xl text-ink md:text-5xl">
              {de ? (
                <>Fertige <span className="text-gold">Trainingspläne</span></>
              ) : (
                <>Schede <span className="text-gold">pronte</span></>
              )}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/65">{t.readyPlansDesc}</p>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {schedePronte.map((scheda) => (
              <article key={scheda.id} className="fp-scheda flex flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={scheda.img}
                    alt={scheda.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-md bg-[#121214] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {scheda.level}
                    </span>
                    <span className="rounded-md bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      -50%
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="fp-titolo text-xl text-ink">{scheda.name}</h3>
                    <span className="whitespace-nowrap">
                      <span className="mr-2 text-sm text-ink/40 line-through">€{scheda.originalPrice}</span>
                      <span className="text-xl font-extrabold text-gold">€{scheda.price}</span>
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink/55">{scheda.experience}</p>
                  <ul className="mt-5 flex-1 space-y-3 text-[15px] text-ink/75">
                    <li className="flex items-center gap-3"><Spunta />{t.instantDownload}</li>
                    <li className="flex items-center gap-3"><Spunta />{t.demoVideos}</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        id: scheda.id,
                        name: scheda.name,
                        price: scheda.price,
                        originalPrice: scheda.originalPrice,
                        type: "scheda-pronta",
                        variant: scheda.level,
                      })
                    }
                    className="fp-btn-linea mt-7 w-full cursor-pointer"
                  >
                    {t.buyNow}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-ink/55">
            <Link href="/contatti" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
              {t.contactNote}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
