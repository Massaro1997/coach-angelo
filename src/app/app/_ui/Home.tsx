"use client";

// /app, sezione Home: il saluto in testata, poi in una sola colonna che scorre
// la card "Heute" (la foto del giorno, il titolo e il tasto per aprirlo), gli
// avvisi che chiedono un'azione (messaggi del coach, rata da pagare, contratto,
// pacchetto in scadenza), la settimana lun-dom con i pallini, serie e
// allenamenti della settimana, la prossima ora 1:1 e le prime quattro guide.
// Tutto da GET /api/app/home, una chiamata (le guide sono testi fissi).
// Il controllo dell'accesso lo fa Sessione nel layout: qui c'e' sempre un
// cliente. I dati restano nell'archivio: tornando qui si vedono subito e si
// aggiornano in sottofondo.
//
// Grafica dal 13/11: card stile Apple col titolo dentro la foto e icone 3D.
// 13/11 notte, «la home mi sembra morta»: era un elenco di sezioni ferme,
// grigie, con numeri nudi e nessuna presenza del coach. Ora:
//  - saluto secondo l'ora in testata e una frase che dice com'e' messa la giornata;
//  - la foto di oggi che respira (zoom lentissimo);
//  - il coach con la sua faccia e la sua nota di oggi (o i messaggi nuovi);
//  - la settimana con gli anelli tipo Apple Fitness che si riempiono, i
//    numeri che contano e i giorni fatti pieni nel colore del marchio;
//  - i blocchi entrano dal basso uno dopo l'altro, solo la prima volta che si
//    apre l'app (tornando alla home niente piu' animazioni ripetute).
// Tutto fermo se il telefono chiede meno movimento.
// Niente caroselli: le guide stanno in una griglia 2x2, scorre solo #app-scroll.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { IoCheckmark } from "react-icons/io5";
import type { DataISO, Giornata } from "@/lib/app-coaching/tipi";
import type { Prenotazione, RiassuntoHome, Statistiche } from "@/lib/app-coaching/tipi-v2";
import { aggiungiGiorni, oggiISO } from "@/lib/app-coaching/date";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { caricaHome, lunediDi, useArchivio } from "./archivio";
import {
  dettaglioGiorno,
  formatta,
  haAlimentazione,
  haAllenamento,
  haPiano,
  maiuscola,
  primoNome,
  titoloGiorno,
  useTesti,
} from "./comuni";
import CardGuida from "./guide/CardGuida";
import { GUIDE } from "./guide/dati";
import type { NomeFoto } from "./immagini";
import { ErroreBox, Icona3D, Lista, Pillola, Riga, SchedaFoto, Sottolineata, Sezione, Tasto, euro, useLingua } from "./kit";
import { segnaAvanti } from "./navigazione";
import AppShell from "./shell/AppShell";

// stringhe nuove di questa schermata (testi.ts lo toccano altri in parallelo)
const TXT = {
  de: {
    oraConCoach: (coach: string) => `1:1-Training mit ${coach}`,
    guide: "Guides",
    tutte: "Alle",
    tutteEtichetta: "Alle Guides ansehen",
    saluto: (ora: number): string => (ora >= 5 && ora < 11 ? "Guten Morgen" : ora >= 18 && ora < 23 ? "Guten Abend" : "Hallo"),
    daFare: (titolo: string | null) => (titolo ? `Heute steht ${titolo} an. Los geht's!` : "Heute steht dein Training an. Los geht's!"),
    fattoOggi: "Training erledigt – stark gemacht!",
    riposoOggi: "Ruhetag: heute lädst du die Akkus auf.",
    ciboOggi: "Heute zählt die Ernährung.",
    niente: "Heute ist nichts geplant.",
    settimana: "Deine Woche",
    training: "Training",
    mese: "Monat",
    scrivi: "Fragen zu Training oder Ernährung? Schreib hier.",
    notaDiOggi: "Notiz für heute",
    nuovi: (n: number) => (n === 1 ? "1 neue Nachricht" : `${n} neue Nachrichten`),
  },
  it: {
    oraConCoach: (coach: string) => `Allenamento 1:1 con ${coach}`,
    guide: "Guide",
    tutte: "Tutte",
    tutteEtichetta: "Vedi tutte le guide",
    saluto: (ora: number): string => (ora >= 5 && ora < 13 ? "Buongiorno" : ora >= 18 && ora < 23 ? "Buonasera" : "Ciao"),
    daFare: (titolo: string | null) => (titolo ? `Oggi ti aspetta ${titolo}. Si parte!` : "Oggi ti aspetta il tuo allenamento. Si parte!"),
    fattoOggi: "Allenamento fatto, grande!",
    riposoOggi: "Giorno di riposo: oggi ricarichi le batterie.",
    ciboOggi: "Oggi conta l'alimentazione.",
    niente: "Oggi non c'è niente in programma.",
    settimana: "La tua settimana",
    training: "Allenamenti",
    mese: "Mese",
    scrivi: "Domande su allenamento o alimentazione? Scrivi qui.",
    notaDiOggi: "Nota di oggi",
    nuovi: (n: number) => (n === 1 ? "1 messaggio nuovo" : `${n} messaggi nuovi`),
  },
};

/** Secondo anello: arancio tipo Apple Fitness accanto al colore del marchio. */
const ARANCIO = "#ff8a00";
const FOTO_COACH = "/app-img/foto/coach.webp";

// ---------------------------------------------------------------- movimento

/** L'ingresso a cascata solo la prima volta per apertura dell'app. */
let giaEntrata = false;

function menoMovimento(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrimaVolta(): boolean {
  const [prima] = useState(() => !giaEntrata && !menoMovimento());
  useEffect(() => {
    giaEntrata = true;
  }, []);
  return prima;
}

/** Blocco che sale dal basso con un piccolo ritardo (i = posizione). */
function Entra({ i, attiva, children }: { i: number; attiva: boolean; children: ReactNode }) {
  if (!attiva) return <>{children}</>;
  const stile: CSSProperties = { animationDelay: `${i * 80}ms` };
  return (
    <div className="animate-[app-su_560ms_cubic-bezier(0.2,0.8,0.2,1)_both]" style={stile}>
      {children}
    </div>
  );
}

/** 0 -> 1 in `ms` con frenata finale; subito 1 se non si anima. */
function useAvanzamento(attiva: boolean, ms = 1100, ritardo = 350): number {
  const [k, setK] = useState(attiva ? 0 : 1);
  useEffect(() => {
    if (!attiva) return;
    let raf = 0;
    let t0 = 0;
    const giro = (t: number) => {
      if (!t0) t0 = t + ritardo;
      const x = Math.min(1, Math.max(0, (t - t0) / ms));
      setK(1 - Math.pow(1 - x, 3));
      if (x < 1) raf = requestAnimationFrame(giro);
    };
    raf = requestAnimationFrame(giro);
    return () => cancelAnimationFrame(raf);
  }, [attiva, ms, ritardo]);
  return k;
}

/** Ombra e angoli delle card del kit, per le card locali. */
const CARD = "rounded-[20px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]";

// ---------------------------------------------------------------- oggi

/** La foto racconta il giorno: pesi, recupero, cucina o il piano da guardare. */
function fotoDelGiorno(g: Giornata | null): NomeFoto {
  if (!haPiano(g)) return "piano";
  if (haAllenamento(g)) return "allenamento";
  if (g.riposo) return "mobilita";
  if (haAlimentazione(g)) return "mealprep";
  // solo una nota del coach
  return "piano";
}

function CardOggi({ oggi, g }: { oggi: DataISO; g: Giornata | null }) {
  const t = useTesti();
  const foto = fotoDelGiorno(g);

  if (!haPiano(g)) {
    return (
      <SchedaFoto foto={foto} proporzione="4/3" titolo={t.nienteOggi} priorita vivo>
        <Tasto href="/app/plan" variante="secondario" pieno>
          {t.vaiAlPiano}
        </Tasto>
      </SchedaFoto>
    );
  }

  const allenamento = haAllenamento(g);
  const dettaglio = dettaglioGiorno(g, t);
  const riposo = g.riposo && !allenamento;
  // il tasto rosso solo quando c'e' un allenamento ancora da fare
  const daFare = allenamento && !g.fatto;
  const sotto: ReactNode =
    dettaglio || riposo ? (
      <>
        {dettaglio && <span className="block">{dettaglio}</span>}
        {riposo && <span className="block">{t.riposoTesto}</span>}
      </>
    ) : undefined;

  return (
    <SchedaFoto
      foto={foto}
      proporzione="4/3"
      priorita
      vivo
      // la card principale della schermata: titolo piu' grande di quello del kit
      titolo={<span className="line-clamp-2 break-words text-[26px] leading-[1.1]">{titoloGiorno(g, t)}</span>}
      sotto={sotto}
      sopra={
        g.fatto ? (
          <Pillola tono="ok">
            <IoCheckmark className="h-3.5 w-3.5" aria-hidden />
            {t.fatto}
          </Pillola>
        ) : undefined
      }
    >
      {/* la card non e' un link: il tocco va sul tasto */}
      <Tasto href={`/app/giorno/${oggi}`} onClick={segnaAvanti} variante={daFare ? "primario" : "secondario"} pieno>
        {daFare ? t.apriTraining : t.vediGiorno}
      </Tasto>
    </SchedaFoto>
  );
}

// ---------------------------------------------------------------- avvisi

/** Righe che chiedono di fare qualcosa (rata, contratto, scadenza): solo se servono. */
function Avvisi({ dati }: { dati: RiassuntoHome }) {
  const t = useTesti();
  const righe: ReactNode[] = [];
  // i messaggi nuovi li mostra la card del coach

  const ab = dati.abbonamento;
  const rata = ab?.prossimaRata ?? null;
  if (rata && rata.stato === "aperto") {
    // la scadenza come giorno a Colonia, confrontabile con "oggi" del server
    const giorno = rata.scadenza ? oggiISO(new Date(rata.scadenza)) : null;
    const scaduta = giorno !== null && giorno < dati.oggi;
    const vicina = giorno !== null && giorno <= aggiungiGiorni(dati.oggi, 7);
    if (rata.link || vicina) {
      righe.push(
        <Riga
          key="rata"
          icona3d="carta"
          titolo={t.rataAperta(euro(rata.importo))}
          sotto={giorno ? t.scadeIl(formatta(giorno, t, { day: "numeric", month: "long" })) : undefined}
          destra={<Pillola tono={scaduta ? "errore" : "attesa"}>{scaduta ? t.scaduta : t.daPagare}</Pillola>}
          href="/app/shop"
        />,
      );
    }
  }

  if (ab?.stato === "da firmare") {
    righe.push(
      <Riga key="firma" icona3d="contratto" titolo={t.contrattoDaFirmare} sotto={t.firmaOra} href="/app/shop" />,
    );
  } else if (ab?.stato === "in scadenza") {
    const fine = ab.fine ? oggiISO(new Date(ab.fine)) : null;
    righe.push(
      <Riga
        key="scadenza"
        icona3d="calendario"
        titolo={fine ? t.pacchettoFinisce(formatta(fine, t, { day: "numeric", month: "long" })) : t.pacchettoInScadenza}
        sotto={t.rinnova}
        href="/app/shop"
      />,
    );
  }

  if (righe.length === 0) return null;
  return <Lista>{righe}</Lista>;
}

// ---------------------------------------------------------------- settimana

/** Un anello tipo Apple Fitness: traccia chiara e arco pieno che si riempie. */
function Anello({ r, colore, valore, k }: { r: number; colore: string; valore: number; k: number }) {
  const C = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, valore)) * k;
  return (
    <>
      <circle cx="60" cy="60" r={r} fill="none" strokeWidth="13" style={{ stroke: colore, strokeOpacity: 0.15 }} />
      {p > 0.001 && (
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - p)}
          transform="rotate(-90 60 60)"
          style={{ stroke: colore }}
        />
      )}
    </>
  );
}

function Valore({
  colore,
  etichetta,
  fatti,
  pianificati,
  k,
}: {
  colore: string;
  etichetta: string;
  fatti: number;
  pianificati: number;
  k: number;
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500">
        <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ background: colore }} />
        <span className="truncate">{etichetta}</span>
      </p>
      <p className="mt-1 text-[24px] font-bold leading-none tabular-nums" style={{ color: colore }}>
        {Math.round(fatti * k)}
        <span className="text-[16px] font-semibold text-neutral-400">/{pianificati}</span>
      </p>
    </div>
  );
}

/**
 * La settimana in una card: anelli che si riempiono (fuori la settimana nel
 * colore del marchio, dentro il mese in arancio), i numeri che contano, la
 * serie con la fiamma e sotto i sette giorni: fatti pieni con la spunta,
 * oggi cerchiato, i pallini per quello che c'e' da fare.
 */
function Settimana({ oggi, giornate, s, attiva }: { oggi: DataISO; giornate: Giornata[]; s: Statistiche; attiva: boolean }) {
  const t = useTesti();
  const lingua = useLingua();
  const tx = TXT[lingua];
  const k = useAvanzamento(attiva);
  const lunedi = lunediDi(oggi);
  const perData = new Map(giornate.map((g) => [g.data, g]));
  const rosso = "var(--app-colore,#e30613)";
  const settimana = s.settimanaPianificati > 0 ? s.settimanaFatti / s.settimanaPianificati : 0;
  const mese = s.mesePianificati > 0 ? s.meseFatti / s.mesePianificati : 0;

  return (
    <div className={`p-4 ${CARD}`}>
      <div className="flex items-center gap-4">
        <Link href="/app/fortschritt" aria-label={tx.settimana} className="shrink-0">
          <svg viewBox="0 0 120 120" className="h-[118px] w-[118px]" aria-hidden>
            <Anello r={52} colore={rosso} valore={settimana} k={k} />
            <Anello r={36} colore={ARANCIO} valore={mese} k={k} />
          </svg>
        </Link>
        <div className="grid min-w-0 flex-1 gap-3">
          <h2 className="app-titolo text-[21px]">{tx.settimana}</h2>
          <div className="grid grid-cols-2 gap-2">
            <Valore colore={rosso} etichetta={tx.training} fatti={s.settimanaFatti} pianificati={s.settimanaPianificati} k={k} />
            <Valore colore={ARANCIO} etichetta={tx.mese} fatti={s.meseFatti} pianificati={s.mesePianificati} k={k} />
          </div>
          <p className="flex min-w-0 items-center gap-1.5 text-[14px] font-semibold text-neutral-800">
            <Icona3D nome="fiamma" dimensione={24} />
            <span className="tabular-nums">{Math.round(s.serie * k)}</span>
            <span className="truncate font-medium text-neutral-500">{t.serie(s.serie)}</span>
          </p>
        </div>
      </div>

      <ol className="mt-4 grid grid-cols-7 border-t border-black/[0.06] pt-3">
        {t.settimana.map((sigla, i) => {
          const data = aggiungiGiorni(lunedi, i);
          const g = perData.get(data);
          const conPiano = haPiano(g);
          const eOggi = data === oggi;
          const fatto = !!g?.fatto;
          const allenamento = !!g && haAllenamento(g);
          const etichetta = [
            formatta(data, t, { weekday: "long", day: "numeric", month: "long" }),
            eOggi && t.oggi,
            conPiano && titoloGiorno(g, t),
            fatto && t.fatto,
          ]
            .filter(Boolean)
            .join(", ");
          // fatto: pieno nel colore del marchio con la spunta; oggi: cerchiato
          const tondo = fatto
            ? "bg-[var(--app-colore,#e30613)] text-white shadow-[0_3px_10px_rgba(227,6,19,0.28)]"
            : eOggi
              ? "text-[var(--app-colore,#e30613)] ring-2 ring-inset ring-[var(--app-colore,#e30613)]"
              : "text-neutral-900";
          return (
            <li key={data}>
              <Link
                href={`/app/giorno/${data}`}
                // 7 giorni: si caricano al tocco (i vicini li salva gia' il service worker)
                prefetch={false}
                onClick={segnaAvanti}
                aria-label={etichetta}
                aria-current={eOggi ? "date" : undefined}
                className="flex min-h-[70px] flex-col items-center justify-center gap-1 rounded-2xl transition-colors active:bg-neutral-100"
              >
                <span className={`text-[12px] font-semibold ${eOggi ? "text-[var(--app-colore,#e30613)]" : "text-neutral-400"}`}>
                  {sigla}
                </span>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold tabular-nums ${tondo}`}
                  style={attiva && fatto ? { animation: `app-appare 420ms ease-out ${600 + i * 70}ms both` } : undefined}
                >
                  {fatto ? <IoCheckmark className="h-[18px] w-[18px]" aria-hidden /> : Number(data.slice(8))}
                </span>
                <span className="flex h-1.5 items-center" aria-hidden>
                  {conPiano && !fatto && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: allenamento ? "var(--app-colore,#e30613)" : g.riposo ? "#d4d4d4" : ARANCIO }}
                    />
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ---------------------------------------------------------------- coach

/**
 * Il coach in home: la sua faccia e, se c'e', la sua nota di oggi come un
 * messaggio (sono parole sue, scritte nel piano). Se no i messaggi nuovi, se
 * no l'invito a scrivere. Tutta la card porta alla chat.
 */
function CardCoach({ dati }: { dati: RiassuntoHome }) {
  const lingua = useLingua();
  const tx = TXT[lingua];
  const nota = dati.giornoOggi?.notaCoach?.trim() || null;
  const nonLetti = dati.messaggiNonLetti ?? 0;
  const testo = nota ?? (nonLetti > 0 ? tx.nuovi(nonLetti) : tx.scrivi);
  const fumetto = nota
    ? "bg-neutral-100 text-neutral-900"
    : nonLetti > 0
      ? "bg-[var(--app-colore,#e30613)] font-semibold text-white"
      : "bg-neutral-100 text-neutral-600";
  return (
    <Link href="/app/coach" className={`flex items-start gap-3 p-4 transition-transform active:scale-[0.99] ${CARD}`}>
      <Image
        src={FOTO_COACH}
        alt=""
        width={52}
        height={52}
        unoptimized
        draggable={false}
        className="h-[52px] w-[52px] shrink-0 rounded-full bg-[var(--app-colore,#e30613)] object-cover object-top"
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-[16px] font-bold">{MARCHIO.coach}</span>
          {nota && <span className="shrink-0 text-[13px] font-medium text-neutral-400">{tx.notaDiOggi}</span>}
          {nonLetti > 0 && (
            <span className="ml-auto flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-[var(--app-colore,#e30613)] px-1.5 text-[13px] font-bold text-white tabular-nums">
              {nonLetti}
            </span>
          )}
        </span>
        <span className={`mt-1.5 block w-fit max-w-full rounded-[18px] rounded-tl-[6px] px-3.5 py-2.5 text-[15px] leading-snug ${fumetto}`}>
          <span className="line-clamp-3 whitespace-pre-line">{testo}</span>
        </span>
      </span>
    </Link>
  );
}

// ---------------------------------------------------------------- prossima ora

function ProssimaOra({ p }: { p: Prenotazione | null }) {
  const t = useTesti();
  const lingua = useLingua();
  if (!p) {
    return (
      <SchedaFoto foto="coach-cliente" proporzione="2/1" titolo={TXT[lingua].oraConCoach(MARCHIO.coach)} sotto={t.nessunaOra}>
        <Tasto href="/app/shop" variante="secondario" pieno>
          {t.prenotaOra}
        </Tasto>
      </SchedaFoto>
    );
  }
  const quando = maiuscola(formatta(p.data, t, { weekday: "long", day: "numeric", month: "long" }));
  const sotto = [`${p.inizio}–${p.fine}`, p.luogo?.trim()].filter(Boolean).join(" · ");
  return (
    <SchedaFoto
      foto="coach-cliente"
      proporzione="2/1"
      titolo={quando}
      sotto={sotto}
      sopra={p.stato === "da pagare" ? <Pillola tono="attesa">{t.statoPrenotazione["da pagare"]}</Pillola> : undefined}
      href="/app/shop"
    />
  );
}

// ---------------------------------------------------------------- guide

function Guide() {
  const lingua = useLingua();
  const tx = TXT[lingua];
  return (
    <Sezione
      titolo={tx.guide}
      azione={
        // tocco da 44 px senza alzare la riga del titolo (margini negativi)
        <Link
          href="/app/guide"
          onClick={segnaAvanti}
          aria-label={tx.tutteEtichetta}
          className="-my-[9px] -mr-2 flex min-h-[44px] items-center px-2 text-[15px] font-semibold text-[var(--app-colore,#e30613)] active:opacity-70"
        >
          {tx.tutte}
        </Link>
      }
    >
      <ul className="grid grid-cols-2 gap-3">
        {GUIDE.slice(0, 4).map((g) => (
          <li key={g.slug}>
            <CardGuida guida={g} />
          </li>
        ))}
      </ul>
    </Sezione>
  );
}

// ---------------------------------------------------------------- schermata

/** Card grigia dello scheletro: la foto in proporzione e il testo alto fisso. */
function SchedaVuota({ proporzione, testo }: { proporzione: string; testo: number }) {
  return (
    <div className={`overflow-hidden ${CARD}`}>
      <div className="animate-pulse bg-neutral-100" style={{ aspectRatio: proporzione }} />
      <div style={{ height: testo }} />
    </div>
  );
}

/** Alto come il contenuto vero in cima: arrivati i dati, la parte in alto non salta. */
function Scheletro() {
  return (
    <div className="space-y-4 pt-1" aria-busy="true">
      {/* la frase del giorno (una riga da 16 px) */}
      <div className="flex h-[22px] items-center px-1">
        <div className="h-4 w-3/4 rounded-full bg-black/[0.05]" />
      </div>
      {/* card di oggi: foto 4:3 + striscia bianca col tasto (p-4 + 48) */}
      <SchedaVuota proporzione="4/3" testo={80} />
      {/* coach: foto tonda, nome e fumetto */}
      <div className={`h-[98px] animate-pulse ${CARD}`} />
      {/* settimana: anelli + sette giorni */}
      <div className={`h-[236px] animate-pulse ${CARD}`} />
    </div>
  );
}

/** La frase sotto il saluto: com'e' messa la giornata. */
function fraseDelGiorno(g: Giornata | null, tx: (typeof TXT)["de"]): string {
  if (!haPiano(g)) return tx.niente;
  if (haAllenamento(g)) return g.fatto ? tx.fattoOggi : tx.daFare(g.allenamento?.titolo?.trim() || null);
  if (g.riposo) return tx.riposoOggi;
  if (haAlimentazione(g)) return tx.ciboOggi;
  return tx.niente;
}

function Contenuto({ dati }: { dati: RiassuntoHome }) {
  const t = useTesti();
  const lingua = useLingua();
  const tx = TXT[lingua];
  const prima = usePrimaVolta();
  const g = dati.giornoOggi ?? null;
  const data = maiuscola(formatta(dati.oggi, t, { weekday: "long", day: "numeric", month: "long" }));
  return (
    <div className="space-y-4 pt-1">
      <Entra i={0} attiva={prima}>
        <p className="px-1 text-[16px] leading-snug text-neutral-500">
          <span className="font-semibold text-neutral-900">{data}</span> · {fraseDelGiorno(g, tx)}
        </p>
      </Entra>
      <Entra i={1} attiva={prima}>
        <CardOggi oggi={dati.oggi} g={g} />
      </Entra>
      <Avvisi dati={dati} />
      <Entra i={2} attiva={prima}>
        <CardCoach dati={dati} />
      </Entra>
      {dati.statistiche && (
        <Entra i={3} attiva={prima}>
          <Settimana oggi={dati.oggi} giornate={dati.settimana ?? []} s={dati.statistiche} attiva={prima} />
        </Entra>
      )}
      <Entra i={4} attiva={prima}>
        <Sezione titolo={t.prossimaOra}>
          <ProssimaOra p={dati.prossimaPrenotazione ?? null} />
        </Sezione>
      </Entra>
      <Entra i={5} attiva={prima}>
        <Guide />
      </Entra>
    </div>
  );
}

export default function Home() {
  const t = useTesti();
  const a = useArchivio();

  // ogni volta che si torna sulla home: i dati vecchi restano a schermo intanto
  useEffect(() => {
    void caricaHome();
  }, []);

  const lingua = useLingua();
  const nome = a.profilo.tipo === "ok" ? primoNome(a.profilo.profilo.nome) : "";
  const ora = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", hour: "numeric", hourCycle: "h23" }).format(new Date()));
  // come i titoli del sito: Kanit corsivo maiuscolo, il nome rosso sottolineato a mano
  const saluto = nome ? (
    <span className="app-titolo text-[27px]">
      {TXT[lingua].saluto(ora)}, <Sottolineata>{nome}</Sottolineata>
    </span>
  ) : (
    MARCHIO.nomeApp
  );

  return (
    <AppShell tab="home" titolo={saluto}>
      {a.home.tipo === "ok" ? (
        <Contenuto dati={a.home.dati} />
      ) : a.home.tipo === "errore" ? (
        <ErroreBox testo={t.erroreCaricaDati} riprova={() => void caricaHome()} />
      ) : (
        <Scheletro />
      )}
    </AppShell>
  );
}
