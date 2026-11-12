"use client";

import { useState, type ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, ExternalLink, Minus, SearchX } from "lucide-react";
import { Card, EmptyState, cx } from "../ui";
import Andamento from "./Andamento";
import Strumenti from "./Strumenti";
import {
  baseSito,
  giornoBreve,
  guadagnoAParole,
  num,
  pct,
  pos,
  trovaOccasioni,
  type DatiSeo,
  type Occasione,
  type RigaSeo,
} from "./tipi";

/* ============================================================ testata */

function Testata({ dati, aggiorna, aggiorno }: { dati: DatiSeo; aggiorna: () => void; aggiorno: boolean }) {
  const { ora, prima, periodo } = dati;
  const quando = `Dal ${giornoBreve(periodo.da)} al ${giornoBreve(periodo.a)}`;
  let frase: ReactNode;
  if (ora.clic === 0 && ora.impressioni > 0) {
    frase = (
      <>
        {quando} il sito è comparso <b>{num(ora.impressioni)} volte</b> su Google, ma nessuno ha ancora cliccato.
      </>
    );
  } else {
    const d = prima.clic > 0 ? Math.round(((ora.clic - prima.clic) / prima.clic) * 100) : null;
    frase = (
      <>
        {quando} Google ti ha portato{" "}
        <b>
          {num(ora.clic)} {ora.clic === 1 ? "visita" : "visite"}
        </b>
        {d === null
          ? "."
          : d === 0
            ? ", come nei 28 giorni prima."
            : d > 0
              ? `, il ${d}% in più dei 28 giorni prima.`
              : `, il ${Math.abs(d)}% in meno dei 28 giorni prima.`}
      </>
    );
  }
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <p className="max-w-3xl text-[15px] leading-6 tracking-[-0.01em] text-crm-testo sm:text-[17px] sm:leading-7 [&_b]:font-[650] [&_b]:text-crm-ink">
        {frase}
      </p>
      <div className="flex shrink-0 items-center gap-3 text-[12px] text-crm-spento">
        <span className="hidden md:inline">Google dà i dati con 3 giorni di ritardo</span>
        <button
          type="button"
          onClick={aggiorna}
          disabled={aggiorno}
          className="crm-btn"
        >
          {aggiorno ? "Aggiorno…" : "Aggiorna"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================ numeri */

type Verso = "su" | "giu" | "pari";

function Freccia({ verso, bene }: { verso: Verso; bene: boolean }) {
  const Icona = verso === "su" ? ArrowUpRight : verso === "giu" ? ArrowDownRight : Minus;
  return (
    <Icona
      className={cx(
        "h-4 w-4 shrink-0",
        verso === "pari" ? "text-crm-spento" : bene ? "text-crm-verde" : "text-crm-rosso"
      )}
      strokeWidth={2.5}
    />
  );
}

function Confronto({
  verso,
  bene,
  testo,
  prima,
}: {
  verso: Verso;
  bene: boolean;
  testo: string;
  prima: string;
}) {
  return (
    <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-[12px] sm:text-[13px]">
      <Freccia verso={verso} bene={bene} />
      <span
        className={cx(
          "font-[650]",
          verso === "pari" ? "text-crm-tenue" : bene ? "text-crm-verde" : "text-crm-rosso"
        )}
      >
        {testo}
      </span>
      <span className="text-crm-spento">{prima}</span>
    </p>
  );
}

function confrontoConteggio(ora: number, prima: number) {
  if (prima === 0 && ora === 0) return { verso: "pari" as Verso, bene: true, testo: "uguale", prima: "anche prima 0" };
  if (prima === 0) return { verso: "su" as Verso, bene: true, testo: `+${num(ora)}`, prima: "prima 0" };
  const d = ((ora - prima) / prima) * 100;
  const r = Math.round(d);
  if (r === 0) return { verso: "pari" as Verso, bene: true, testo: "stabile", prima: `prima ${num(prima)}` };
  return {
    verso: (r > 0 ? "su" : "giu") as Verso,
    bene: r > 0,
    testo: `${r > 0 ? "+" : "−"}${Math.abs(r)}%`,
    prima: `prima ${num(prima)}`,
  };
}

function confrontoPosizione(ora: number, prima: number) {
  if (!ora || !prima) return { verso: "pari" as Verso, bene: true, testo: "nessun confronto", prima: "" };
  const salita = prima - ora; // posizione piu' bassa = piu' in alto nella lista
  if (Math.abs(salita) < 0.05) return { verso: "pari" as Verso, bene: true, testo: "stabile", prima: `prima ${pos(prima)}` };
  const posti = Math.abs(salita);
  const parola = posti >= 0.95 && posti < 1.05 ? "posto" : "posti";
  return {
    verso: (salita > 0 ? "su" : "giu") as Verso,
    bene: salita > 0,
    testo: `${pos(posti)} ${parola} ${salita > 0 ? "più in alto" : "più in basso"}`,
    prima: `prima ${pos(prima)}`,
  };
}

function confrontoCtr(ora: number, prima: number) {
  if (!prima && !ora) return { verso: "pari" as Verso, bene: true, testo: "uguale", prima: "" };
  const punti = (ora - prima) * 100;
  if (Math.abs(punti) < 0.05) return { verso: "pari" as Verso, bene: true, testo: "stabile", prima: `prima ${pct(prima)}` };
  return {
    verso: (punti > 0 ? "su" : "giu") as Verso,
    bene: punti > 0,
    testo: `${punti > 0 ? "+" : "−"}${Math.abs(punti).toLocaleString("it-IT", { maximumFractionDigits: 1 })} punti`,
    prima: `prima ${pct(prima)}`,
  };
}

function Numero({
  titolo,
  valore,
  confronto,
  spiega,
}: {
  titolo: string;
  valore: string;
  confronto: ReturnType<typeof confrontoConteggio>;
  spiega: string;
}) {
  return (
    <div className="crm-card p-4">
      <h3 className="text-[13px] font-[550] leading-5 text-crm-testo">{titolo}</h3>
      <p className="mt-1 text-[24px] font-[650] leading-8 tracking-[-0.02em] text-crm-ink tabular-nums sm:text-[28px] sm:leading-9">
        {valore}
      </p>
      <Confronto {...confronto} />
      <p className="mt-2 text-[12px] leading-4 text-crm-tenue">{spiega}</p>
    </div>
  );
}

function Numeri({ dati }: { dati: DatiSeo }) {
  const { ora, prima } = dati;
  return (
    <section
      aria-label="Ultimi 28 giorni rispetto ai 28 prima"
      className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 lg:grid-cols-4"
    >
      <Numero
        titolo="Click da Google"
        valore={num(ora.clic)}
        confronto={confrontoConteggio(ora.clic, prima.clic)}
        spiega="Persone che hanno cliccato sul sito dai risultati di Google."
      />
      <Numero
        titolo="Comparse nelle ricerche"
        valore={num(ora.impressioni)}
        confronto={confrontoConteggio(ora.impressioni, prima.impressioni)}
        spiega="Volte che il sito è comparso nei risultati, anche se nessuno ha cliccato."
      />
      <Numero
        titolo="Posizione media"
        valore={ora.impressioni ? pos(ora.posizione) : "–"}
        confronto={confrontoPosizione(ora.posizione, prima.posizione)}
        spiega="Il posto medio nella lista di Google. Più è basso meglio è: 1 è il primo risultato."
      />
      <Numero
        titolo="Percentuale di click (CTR)"
        valore={ora.impressioni ? pct(ora.ctr) : "–"}
        confronto={confrontoCtr(ora.ctr, prima.ctr)}
        spiega="Su 100 persone che vedono il sito su Google, quante ci cliccano."
      />
    </section>
  );
}

/* ============================================================ ricerche */

function DeltaClic({ ora, prima }: { ora: number; prima: number | null }) {
  if (prima === null) return <span className="text-[11px] font-[550] text-crm-blu">nuova</span>;
  const d = ora - prima;
  if (d === 0) return null;
  return (
    <span className={cx("text-[11px] font-[550] tabular-nums", d > 0 ? "text-crm-verde" : "text-crm-rosso")}>
      {d > 0 ? "+" : "−"}
      {Math.abs(d)}
    </span>
  );
}

// l'arancio di Polaris per il testo: oltre la prima pagina
const ARANCIO = "text-[#b54d00]";

function tonoPosizione(p: number) {
  if (p <= 3.5) return "text-crm-verde";
  if (p <= 10.5) return "text-crm-ink";
  return ARANCIO;
}

function Ricerche({ dati }: { dati: DatiSeo }) {
  const [tutte, setTutte] = useState(false);
  const lista = [...dati.ricerche].sort((a, b) => b.clic - a.clic || b.impressioni - a.impressioni);
  const mostrate = tutte ? lista.slice(0, 50) : lista.slice(0, 10);
  const conClic = lista.filter((r) => r.clic > 0).length;

  return (
    <Card
      title="Le ricerche che portano click"
      subtitle={
        lista.length
          ? `${conClic} ricerche diverse hanno portato almeno un click`
          : undefined
      }
      bodyClassName="p-2"
    >
      {lista.length === 0 ? (
        <EmptyState
          titolo="Nessuna ricerca registrata"
          testo="Google non ha ancora associato ricerche al sito in questo periodo. Le ricerche molto rare non vengono mostrate per privacy."
          icon={<SearchX className="h-7 w-7" />}
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="crm-tabella table-fixed">
              <thead>
                <tr>
                  <th>Ricerca</th>
                  <th className="num w-[4.75rem] sm:w-24">Click</th>
                  <th className="num hidden w-28 min-[480px]:table-cell">Comparse</th>
                  <th className="num w-24 sm:w-28">Posizione</th>
                </tr>
              </thead>
              <tbody>
                {mostrate.map((r) => (
                  <tr key={r.chiave}>
                    <td>
                      <span className="block truncate text-crm-ink" title={r.chiave}>
                        {r.chiave}
                      </span>
                    </td>
                    <td className="num whitespace-nowrap">
                      <span className="font-[550] text-crm-ink">{num(r.clic)}</span>{" "}
                      <DeltaClic ora={r.clic} prima={r.clicPrima} />
                    </td>
                    <td className="num hidden whitespace-nowrap text-crm-tenue min-[480px]:table-cell">
                      {num(r.impressioni)}
                    </td>
                    <td className={cx("num whitespace-nowrap font-[550]", tonoPosizione(r.posizione))}>
                      {pos(r.posizione)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-2 pb-1 pt-3 text-[12px] leading-4 text-crm-tenue">
            <span>
              Posizione: <span className="font-[550] text-crm-verde">verde</span> tra i primi tre,{" "}
              <span className={cx("font-[550]", ARANCIO)}>arancio</span> oltre la prima pagina. Accanto ai click, la
              differenza con i 28 giorni prima.
            </span>
            {lista.length > 10 && (
              <button type="button" onClick={() => setTutte((v) => !v)} className="crm-btn">
                {tutte ? "Mostra meno" : `Mostra le prime ${Math.min(50, lista.length)}`}
              </button>
            )}
          </div>
        </>
      )}
    </Card>
  );
}

/* ============================================================ pagine */

const nomePagina = (p: string) => (p === "/" || p === "" ? "Pagina principale" : p);

function Pagine({ dati }: { dati: DatiSeo }) {
  const [tutte, setTutte] = useState(false);
  const base = baseSito(dati.proprieta);
  const lista = [...dati.pagine].sort((a, b) => b.clic - a.clic || b.impressioni - a.impressioni);
  const mostrate = tutte ? lista.slice(0, 40) : lista.slice(0, 8);
  const max = Math.max(...lista.map((p) => p.clic), 1);

  return (
    <Card title="Le pagine che portano click">
      {lista.length === 0 ? (
        <p className="text-[13px] text-crm-tenue">Nessuna pagina ha ricevuto visite da Google nel periodo.</p>
      ) : (
        <ol className="space-y-3.5">
          {mostrate.map((p: RigaSeo) => (
            <li key={p.chiave}>
              <div className="flex items-baseline gap-3">
                <a
                  href={`${base}${p.chiave}`}
                  target="_blank"
                  rel="noopener"
                  className="group flex min-w-0 items-center gap-1 text-[13px] text-crm-ink"
                  title={p.chiave}
                >
                  <span className="truncate group-hover:underline">{nomePagina(p.chiave)}</span>
                  <ExternalLink className="h-3 w-3 shrink-0 text-crm-spento group-hover:text-crm-testo" />
                </a>
                <span className="ml-auto shrink-0 text-[13px] font-[550] tabular-nums text-crm-ink">
                  {num(p.clic)}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-crm-fondo-2">
                <div className="h-full rounded-full bg-crm-blu" style={{ width: `${(p.clic / max) * 100}%` }} />
              </div>
              <p className="mt-1 text-[12px] leading-4 text-crm-tenue">
                comparsa {num(p.impressioni)} volte, posizione {pos(p.posizione)}
                {p.clicPrima !== null && p.clicPrima !== p.clic && (
                  <>, prima {num(p.clicPrima)} click</>
                )}
              </p>
            </li>
          ))}
        </ol>
      )}
      {lista.length > 8 && (
        <button
          type="button"
          onClick={() => setTutte((v) => !v)}
          className="crm-btn mt-4"
        >
          {tutte ? "Mostra meno" : `Mostra tutte (${Math.min(40, lista.length)})`}
        </button>
      )}
    </Card>
  );
}

/* ============================================================ occasioni */

function spiega(o: Occasione): ReactNode {
  const pagina = o.pagina ? (
    <span className="font-[550] text-crm-ink">{nomePagina(o.pagina)}</span>
  ) : (
    "la pagina che compare"
  );
  if (o.tipo === "seconda-pagina") {
    return (
      <>
        Sei in seconda pagina (posizione {pos(o.posizione)}), dove quasi nessuno arriva. Arricchisci {pagina} con un
        paragrafo che risponda proprio a questa ricerca.
      </>
    );
  }
  if (o.tipo === "fondo-prima") {
    return (
      <>
        Sei in prima pagina ma in basso (posizione {pos(o.posizione)}). Usa queste parole nel titolo e nei primi
        paragrafi di {pagina} per salire tra i primi tre.
      </>
    );
  }
  return (
    <>
      Sei tra i primi (posizione {pos(o.posizione)}) ma clicca solo {conArticolo(pct(o.ctr))} di chi ti vede. Riscrivi titolo e
      descrizione di {pagina} perché invoglino di più.
    </>
  );
}

/** "il 2%", "l'1,2%", "l'8%", "l'11%": l'articolo segue come si legge il numero. */
function conArticolo(p: string): string {
  const intero = p.split(/[,%]/)[0] ?? "";
  return intero === "1" || intero === "11" || intero.startsWith("8") ? `l'${p}` : `il ${p}`;
}

const SEGNO: Record<Occasione["tipo"], string> = {
  "seconda-pagina": "bg-crm-spento",
  "fondo-prima": "bg-crm-blu",
  "pochi-click": "bg-crm-ink",
};

function Occasioni({ dati }: { dati: DatiSeo }) {
  const lista = trovaOccasioni(dati);
  return (
    <section className="crm-card">
      <div className="px-4 pb-1 pt-4">
        <h2 className="text-[13px] font-[650] leading-5 text-crm-ink">Occasioni</h2>
        <p className="max-w-2xl text-[13px] leading-5 text-crm-tenue">
          Ricerche dove il sito compare spesso ma prende pochi click. Sistemare queste rende più che scrivere pagine
          nuove.
        </p>
      </div>
      {lista.length === 0 ? (
        <p className="px-4 pb-4 pt-3 text-[13px] text-crm-tenue">
          Nessuna occasione evidente in questo periodo: le ricerche dove il sito compare spesso sono già in alto e
          ricevono click. Riguarda tra qualche settimana.
        </p>
      ) : (
        <ul className="mt-2">
          {lista.map((o) => (
            <li
              key={o.ricerca}
              className="flex flex-col gap-2 border-t border-crm-filo px-4 py-3 sm:flex-row sm:items-start sm:gap-4"
            >
              <span className={cx("mt-1.5 hidden h-2 w-2 shrink-0 rounded-full sm:block", SEGNO[o.tipo])} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-[650] text-crm-ink">&ldquo;{o.ricerca}&rdquo;</p>
                <p className="mt-0.5 text-[13px] leading-5 text-crm-testo">{spiega(o)}</p>
                <p className="mt-1 text-[12px] leading-4 text-crm-tenue">
                  {num(o.impressioni)} comparse e {num(o.clic)} click in 28 giorni
                </p>
              </div>
              <p className="shrink-0 text-[12px] leading-4 text-crm-tenue sm:w-32 sm:text-right">
                <span className="text-[13px] font-[650] text-crm-ink">{guadagnoAParole(o.guadagno)}</span>
                <span className="sm:block"> in più al mese</span>
              </p>
            </li>
          ))}
        </ul>
      )}
      {lista.length > 0 && (
        <p className="bg-crm-fondo px-4 py-3 text-[12px] leading-4 text-crm-tenue">
          Il valore è un ordine di grandezza calcolato sul CTR tipico di ogni posizione, serve a scegliere da dove
          cominciare.
        </p>
      )}
    </section>
  );
}

/* ============================================================ vista */

export default function SeoVista({
  dati,
  aggiorna,
  aggiorno,
}: {
  dati: DatiSeo;
  aggiorna: () => void;
  aggiorno: boolean;
}) {
  const vuoto = dati.ora.impressioni === 0 && dati.prima.impressioni === 0;

  if (vuoto) {
    return (
      <div className="space-y-4">
        <Card>
          <EmptyState
            titolo="Google non ha ancora mostrato il sito"
            testo={`Negli ultimi 56 giorni nessuna ricerca ha fatto comparire ${baseSito(dati.proprieta)}. Succede con un sito nuovo o appena cambiato indirizzo: controlla qui sotto che la sitemap sia stata letta da Google.`}
            icon={<SearchX className="h-8 w-8" />}
          />
        </Card>
        <Strumenti dati={dati} aperto />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Testata dati={dati} aggiorna={aggiorna} aggiorno={aggiorno} />
      <Numeri dati={dati} />
      {/* Fino a 1536px: andamento, occasioni, poi ricerche e pagine affiancate.
          Su schermo largo due colonne che scorrono ognuna per conto suo,
          cosi' sotto il grafico non resta un buco quando le occasioni sono tante. */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-12 2xl:items-start">
        <div className="contents 2xl:col-span-7 2xl:flex 2xl:flex-col 2xl:gap-4">
          <div className="order-1 min-w-0 xl:col-span-2">
            <Andamento dati={dati} />
          </div>
          <div className="order-3 min-w-0">
            <Ricerche dati={dati} />
          </div>
        </div>
        <div className="contents 2xl:col-span-5 2xl:flex 2xl:flex-col 2xl:gap-4">
          <div className="order-2 min-w-0 xl:col-span-2">
            <Occasioni dati={dati} />
          </div>
          <div className="order-4 min-w-0">
            <Pagine dati={dati} />
          </div>
        </div>
      </div>
      <Strumenti dati={dati} />
    </div>
  );
}
