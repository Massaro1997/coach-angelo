"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import SimboloAM from "@/components/SimboloAM";

/*
  Le recensioni, come nel template Trainex ("Reviews From Our Member"):
  titolo al centro, sotto un nastro di schede a tutta larghezza che scorre da
  solo, con i due bordi che sfumano nel fondo e i pallini sotto.

  Chiesto da Calogero il 04/10/2026: "le recensioni le voglio così sia nella
  home che nelle altre pagine". Per questo e' un blocco unico, che
  LayoutWrapper mette in fondo a ogni pagina, e porta con se' il tema chiaro
  (.fp): funziona anche sotto le pagine non ancora convertite. La pagina
  /testimonianze non c'e' piu'.

  I testi sono quelli della vecchia pagina /testimonianze.

  Secondo giro, stesso giorno ("qua sono diverse, più orizzontali, con il logo
  fatto più in trasparenza a destra e con le foto"): le schede sono larghe e
  basse, il simbolo AM e' grande in alto a destra, in trasparenza, tagliato
  dal bordo; il risultato sta nella riga sotto il nome e non piu' in un
  cartellino in fondo, che allungava la scheda.

  Le foto: il tondo mostra la foto del cliente se c'e' (campo "foto"),
  altrimenti l'iniziale. Oggi non ne abbiamo nessuna. Vanno messe quelle vere,
  date dal cliente: una faccia inventata accanto a una recensione e' una
  recensione finta (in Germania, § 5 UWG).

  Terzo giro, stesso giorno: fondo bianco ovunque, e l'effetto di Trainex
  quando la sezione sale. "Quella sotto resta sticky e loro vanno sopra, e la
  parte sopra sia in trasparenza": la fascia che viene prima resta ferma, le
  recensioni le scorrono sopra, e il loro fondo parte trasparente e diventa
  bianco nel primo quinto (in Trainex: linear-gradient da bianco a 0 fino a
  bianco pieno al 20%). Solo da 1024 px in su, come in Trainex, e non per chi
  ha chiesto meno movimento.
*/

type Recensione = { name: string; location: string; text: string; result: string };

// Le foto vere dei clienti, per nome. Il file va in public/images/recensioni/.
// Esempio: "Marco R.": "/images/recensioni/marco-r.jpg"
const FOTO: Record<string, string> = {};

const DE: Recensione[] = [
  {
    name: "Marco R.",
    location: "Köln",
    text: "Angelo hat mir geholfen, in 4 Monaten 15kg abzunehmen. Sein personalisierter Ansatz und seine ständige Motivation haben den Unterschied gemacht. Ich hätte nie gedacht, dass ich diese Ergebnisse erreichen könnte!",
    result: "-15kg in 4 Monaten",
  },
  {
    name: "Laura M.",
    location: "Köln",
    text: "Endlich habe ich einen Trainer gefunden, der Italienisch spricht! Die Ergebnisse sind unglaublich und ich fühle mich stärker als je zuvor. Angelo weiß, wie man dich auch in den schwierigsten Momenten motiviert.",
    result: "Muskelmasse +20%",
  },
  {
    name: "Giuseppe T.",
    location: "Frankfurt",
    text: "Angelos Online-Coaching ist perfekt für meinen vollen Terminkalender. Klare Programme und kontinuierliche Unterstützung über WhatsApp. Trotz der Distanz fühle ich mich betreut, als wäre ich mit ihm im Fitnessstudio.",
    result: "Komplette Definition",
  },
  {
    name: "Francesca B.",
    location: "Düsseldorf",
    text: "Nach der Schwangerschaft dachte ich, ich könnte nie wieder in Form kommen. Angelo hat ein perfektes Programm für meine Bedürfnisse erstellt und jetzt bin ich fitter als vorher!",
    result: "-12kg nach Schwangerschaft",
  },
  {
    name: "Andrea S.",
    location: "Stuttgart",
    text: "Ich suchte einen seriösen und professionellen Personal Trainer. Mit Angelo habe ich viel mehr gefunden: einen Coach, der wirklich an seine Kunden glaubt. Die Ergebnisse sprechen für sich.",
    result: "+8kg Muskelmasse",
  },
  {
    name: "Giulia P.",
    location: "Köln",
    text: "Angelos Ernährungsplan hat meine Beziehung zum Essen komplett verändert. Keine extremen Diäten, nur ein gesunder und nachhaltiger Ansatz. Endlich verstehe ich, wie ich mich richtig ernähre!",
    result: "Ausgewogene Ernährung",
  },
];

const IT: Recensione[] = [
  {
    name: "Marco R.",
    location: "Colonia",
    text: "Angelo mi ha aiutato a perdere 15kg in 4 mesi. Il suo approccio personalizzato e la sua motivazione costante hanno fatto la differenza. Non avrei mai pensato di poter raggiungere questi risultati!",
    result: "-15kg in 4 mesi",
  },
  {
    name: "Laura M.",
    location: "Colonia",
    text: "Finalmente ho trovato un trainer che parla italiano! I risultati sono incredibili e mi sento più forte che mai. Angelo sa come motivarti anche nei momenti più difficili.",
    result: "Massa muscolare +20%",
  },
  {
    name: "Giuseppe T.",
    location: "Francoforte",
    text: "Il coaching online di Angelo è perfetto per i miei impegni. Programmi chiari e supporto continuo via WhatsApp. Nonostante la distanza, mi sento seguito come se fossi in palestra con lui.",
    result: "Definizione completa",
  },
  {
    name: "Francesca B.",
    location: "Düsseldorf",
    text: "Dopo la gravidanza pensavo di non poter più tornare in forma. Angelo ha creato un programma perfetto per le mie esigenze e ora sono più in forma di prima!",
    result: "-12kg post gravidanza",
  },
  {
    name: "Andrea S.",
    location: "Stoccarda",
    text: "Cercavo un personal trainer serio e professionale. Con Angelo ho trovato molto di più: un coach che crede veramente nei suoi clienti. I risultati parlano da soli.",
    result: "+8kg massa magra",
  },
  {
    name: "Giulia P.",
    location: "Colonia",
    text: "Il piano alimentare di Angelo ha cambiato completamente il mio rapporto con il cibo. Niente diete estreme, solo un approccio sano e sostenibile. Finalmente capisco come nutrirmi!",
    result: "Alimentazione equilibrata",
  },
];

const SPAZIO = 28; // tra una scheda e l'altra, in px
const PAUSA = 4500; // quanto resta ferma ogni scheda, in ms

export default function Recensioni() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const sezione = useRef<HTMLElement>(null);

  // La fascia che viene prima resta ferma mentre questa le sale sopra. Chi sia
  // "quella prima" cambia da pagina a pagina (le trasformazioni, o l'ultima
  // della pagina, o la pagina intera): si prende l'elemento che sta subito
  // sopra e lo si blocca quando il suo fondo tocca il fondo dello schermo.
  useEffect(() => {
    const el = sezione.current;
    const madre = el?.parentElement;
    if (!el || !madre) return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let ferma: HTMLElement | null = null;

    const sblocca = (e: HTMLElement) => {
      e.style.position = "";
      e.style.top = "";
    };
    function misura() {
      const sopra = el!.previousElementSibling as HTMLElement | null;
      if (sopra !== ferma) {
        if (ferma) {
          sblocca(ferma);
          ro.unobserve(ferma);
        }
        ferma = sopra;
        if (ferma) ro.observe(ferma);
      }
      if (!ferma) return;
      if (!mq.matches) return sblocca(ferma);
      ferma.style.position = "sticky";
      ferma.style.top = `${Math.min(0, window.innerHeight - ferma.offsetHeight)}px`;
    }
    const ro = new ResizeObserver(misura);
    const mo = new MutationObserver(misura);
    misura();
    mo.observe(madre, { childList: true });
    window.addEventListener("resize", misura);
    mq.addEventListener("change", misura);
    return () => {
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", misura);
      mq.removeEventListener("change", misura);
      if (ferma) sblocca(ferma);
    };
  }, [pathname]);

  const de = language === "de";
  const recensioni = de ? DE : IT;
  const n = recensioni.length;

  // i: la scheda da cui parte il nastro. Va da 0 a n: n e' la copia della
  // prima, e arrivati li' si torna a 0 senza animazione, cosi' il giro non
  // finisce mai. Le schede sono in fila tre volte perche' anche sugli schermi
  // larghissimi a destra non resti mai il vuoto.
  const [pos, setPos] = useState({ i: 0, anima: true });
  const [passo, setPasso] = useState(0);
  const [fermo, setFermo] = useState(false);
  const pista = useRef<HTMLDivElement>(null);
  const tocco = useRef<number | null>(null);

  useEffect(() => {
    const scheda = pista.current?.firstElementChild as HTMLElement | null;
    if (!scheda) return;
    const ro = new ResizeObserver(() => setPasso(scheda.offsetWidth + SPAZIO));
    ro.observe(scheda);
    return () => ro.disconnect();
  }, []);

  const avanti = () =>
    // Se il ritorno a 0 e' saltato (scheda del browser in secondo piano, la
    // fine dell'animazione non arriva), lo si fa adesso.
    setPos((p) => (p.i >= n ? { i: 0, anima: false } : { i: p.i + 1, anima: true }));
  const indietro = () => setPos((p) => ({ i: p.i <= 0 ? n - 1 : p.i - 1, anima: true }));

  useEffect(() => {
    if (fermo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(avanti, PAUSA);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fermo, n]);

  const bg = "#ffffff";

  return (
    <section
      ref={sezione}
      // Niente classe .fp qui: il tema lo da' <main>, e .fp metterebbe un
      // fondo pieno che copre la sfumatura.
      className="relative z-10 overflow-hidden bg-white pb-20 pt-20 sm:pb-28 sm:pt-28 lg:bg-transparent lg:bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,#ffffff_20%)] lg:pt-60"
    >
      <div className="mx-auto mb-8 max-w-3xl px-6 text-center sm:mb-10">
        <h2 className="fp-titolo text-4xl text-ink md:text-5xl">
          {de ? (
            <>Sie haben es <span className="text-gold">geschafft</span></>
          ) : (
            <>Loro ce <span className="text-gold">l&apos;hanno fatta</span></>
          )}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/65">
          {de
            ? "Echte Geschichten von Menschen, die ihr Leben verändert haben."
            : "Storie vere di persone che hanno trasformato la loro vita."}
        </p>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setFermo(true)}
        onMouseLeave={() => setFermo(false)}
        onFocusCapture={() => setFermo(true)}
        onBlurCapture={() => setFermo(false)}
        onTouchStart={(e) => {
          tocco.current = e.touches[0].clientX;
          setFermo(true);
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - (tocco.current ?? e.changedTouches[0].clientX);
          tocco.current = null;
          setFermo(false);
          if (dx < -40) avanti();
          if (dx > 40) indietro();
        }}
      >
        <div
          ref={pista}
          onTransitionEnd={(e) => {
            if (e.target === pista.current) setPos((p) => (p.i >= n ? { i: 0, anima: false } : p));
          }}
          className="flex items-stretch py-10 pl-5 sm:pl-[9vw]"
          style={{
            gap: SPAZIO,
            transform: `translateX(-${pos.i * passo}px)`,
            transition: pos.anima ? "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          }}
        >
          {[...recensioni, ...recensioni, ...recensioni].map((r, k) => (
            <figure
              key={k}
              aria-hidden={k >= n}
              className="relative flex w-[84vw] shrink-0 flex-col overflow-hidden rounded-[10px] bg-white px-7 py-9 shadow-[0_12px_40px_rgba(227,6,19,0.11)] sm:w-[clamp(360px,34vw,660px)] sm:px-11 sm:py-12 2xl:px-14 2xl:py-16"
            >
              {/* il simbolo del marchio, grande e in trasparenza, in alto a
                  destra e tagliato dal bordo: come il logo nelle schede di
                  Trainex */}
              <SimboloAM velato className="pointer-events-none absolute -right-12 -top-4 h-28 sm:-right-20 sm:-top-5 sm:h-40 2xl:h-44" />

              <div className="relative flex gap-1 text-[#ffc400]" aria-hidden>
                {[0, 1, 2, 3, 4].map((st) => (
                  <svg key={st} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <figcaption className="relative mt-6 flex items-center gap-4">
                {FOTO[r.name] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={FOTO[r.name]}
                    alt=""
                    width={60}
                    height={60}
                    loading="lazy"
                    className="h-[60px] w-[60px] shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff2b3a] to-[#c1000f] text-xl font-bold text-white">
                    {r.name.charAt(0)}
                  </span>
                )}
                <span>
                  <span className="block text-xl font-bold leading-tight text-ink">{r.name}</span>
                  <span className="mt-0.5 block text-[15px] text-ink/55">
                    {r.location} <span aria-hidden>·</span>{" "}
                    <span className="font-semibold text-gold">{r.result}</span>
                  </span>
                </span>
              </figcaption>

              <blockquote className="relative mt-6 text-[17px] leading-relaxed text-ink/80 2xl:mt-7 2xl:text-lg">{r.text}</blockquote>
            </figure>
          ))}
        </div>

        {/* i due bordi che sfumano nel fondo: su telefono non servono */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[8vw] sm:block"
          style={{ background: `linear-gradient(90deg, ${bg} 15%, transparent)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[8vw] sm:block"
          style={{ background: `linear-gradient(270deg, ${bg} 15%, transparent)` }}
        />
      </div>

      <div className="mt-4 flex justify-center gap-2.5">
        {recensioni.map((r, k) => (
          <button
            key={r.name}
            type="button"
            aria-label={`${de ? "Bewertung" : "Recensione"} ${k + 1}`}
            aria-current={pos.i % n === k}
            onClick={() => setPos({ i: k, anima: true })}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              pos.i % n === k ? "w-8 bg-gold" : "w-2.5 bg-ink/15 hover:bg-ink/35"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
