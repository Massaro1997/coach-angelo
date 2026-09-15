"use client";

import { useEffect, useState } from "react";
import { MousePointerClick, Inbox, TrendingUp, Euro } from "lucide-react";
import { Card, Stat, Barre, Sparkbars, EmptyState, cx } from "./ui";

interface Voce { nome: string; n: number }
interface PaginaGsc { path: string; clic: number; impressioni: number; posizione: number; lead: number }

export interface DatiConversioni {
  periodo: { giorni: number; da: string; a: string };
  lead: {
    totale: number;
    precedente: number;
    daLeggere: number;
    perCanale: Voce[];
    perFamiglia: Voce[];
    perServizio: Voce[];
    perPagina: Voce[];
    perGiorno: { giorno: string; n: number }[];
  };
  ordini: { totale: number; pagati: number; fatturato: number };
  gsc: {
    ok: boolean;
    errore?: string;
    clic: number;
    impressioni: number;
    posizioneMedia: number;
    pagine: PaginaGsc[];
  };
}

const PERIODI = [7, 28, 90, 365];

function Delta({ ora, prima }: { ora: number; prima: number }) {
  if (prima === 0 && ora === 0) return <span className="text-neutral-400">nessuna variazione</span>;
  if (prima === 0) return <span className="text-green-600 font-semibold">nuovi</span>;
  const pct = Math.round(((ora - prima) / prima) * 100);
  const su = pct >= 0;
  return (
    <span className={cx("font-semibold", su ? "text-green-600" : "text-red-500")}>
      {su ? "▲" : "▼"} {Math.abs(pct)}% <span className="font-normal text-neutral-400">vs prec.</span>
    </span>
  );
}

function Tabella({
  righe,
  colonna,
  tono,
}: {
  righe: PaginaGsc[];
  colonna: "lead" | "posizione";
  tono: "green" | "amber";
}) {
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-black/[0.07] text-[10px] uppercase tracking-wider text-neutral-400">
          <th className="pb-2 text-left font-bold">Pagina</th>
          <th className="pb-2 text-right font-bold">Clic</th>
          <th className="pb-2 text-right font-bold">{colonna === "lead" ? "Lead" : "Pos."}</th>
        </tr>
      </thead>
      <tbody>
        {righe.map((p) => (
          <tr key={p.path} className="border-b border-black/[0.04] last:border-0">
            <td className="max-w-[240px] truncate py-2 text-neutral-700" title={p.path}>
              {p.path}
            </td>
            <td className="py-2 text-right tabular-nums text-neutral-500">{p.clic}</td>
            <td
              className={cx(
                "py-2 text-right font-bold tabular-nums",
                tono === "green" ? "text-green-600" : "text-amber-600"
              )}
            >
              {colonna === "lead" ? p.lead : p.posizione}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Conversioni({
  onDati,
}: {
  onDati?: (d: DatiConversioni) => void;
}) {
  const [giorni, setGiorni] = useState(28);
  const [dati, setDati] = useState<DatiConversioni | null>(null);
  const [caricando, setCaricando] = useState(true);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    setCaricando(true);
    setErrore("");
    fetch(`/api/admin/conversioni?giorni=${giorni}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Errore " + r.status))))
      .then((d: DatiConversioni) => {
        setDati(d);
        onDati?.(d);
      })
      .catch((e) => setErrore(e.message))
      .finally(() => setCaricando(false));
    // onDati e' una callback stabile del padre: non entra fra le dipendenze
    // per non rilanciare la fetch a ogni render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [giorni]);

  if (caricando && !dati) return <p className="py-10 text-sm text-neutral-400">Carico i dati…</p>;
  if (errore) return <p className="py-10 text-sm text-red-500">{errore}</p>;
  if (!dati) return null;

  const { lead, ordini, gsc } = dati;
  const daSistemare = gsc.ok ? gsc.pagine.filter((p) => p.clic >= 5 && p.lead === 0).slice(0, 12) : [];
  const cheConvertono = gsc.ok
    ? gsc.pagine.filter((p) => p.lead > 0).sort((a, b) => b.lead - a.lead).slice(0, 12)
    : [];

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-wrap items-center gap-1.5">
        {PERIODI.map((g) => (
          <button
            key={g}
            onClick={() => setGiorni(g)}
            className={cx(
              "px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-all",
              giorni === g
                ? "bg-neutral-900 text-white"
                : "border border-black/10 bg-white text-neutral-500 hover:border-black/30"
            )}
          >
            {g === 365 ? "12 mesi" : `${g} giorni`}
          </button>
        ))}
        {caricando && <span className="ml-1 text-[11px] text-neutral-400">aggiorno…</span>}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat
          label="Lead"
          value={lead.totale}
          tone="brand"
          icon={<Inbox className="h-4 w-4" />}
          sub={<Delta ora={lead.totale} prima={lead.precedente} />}
        />
        <Stat
          label="Da leggere"
          value={lead.daLeggere}
          tone={lead.daLeggere > 0 ? "red" : "green"}
          sub={lead.daLeggere > 0 ? "richiedono risposta" : "tutto letto"}
        />
        <Stat
          label="Clic da Google"
          value={gsc.ok ? gsc.clic : "—"}
          tone="blue"
          icon={<MousePointerClick className="h-4 w-4" />}
          sub={gsc.ok ? `posizione media ${gsc.posizioneMedia}` : "Search Console scollegata"}
        />
        <Stat
          label="Fatturato"
          value={`${ordini.fatturato.toLocaleString("it-IT", { minimumFractionDigits: 2 })} €`}
          tone="green"
          icon={<Euro className="h-4 w-4" />}
          sub={`${ordini.pagati} ordini pagati su ${ordini.totale}`}
        />
      </div>

      {gsc.ok && gsc.clic > 0 && (
        <Card title="Da clic a contatto">
          <p className="text-sm text-neutral-600">
            <span className="text-2xl font-bold tabular-nums text-neutral-900">
              {((lead.totale / gsc.clic) * 100).toFixed(1)}%
            </span>{" "}
            dei clic da Google è diventato un contatto ({lead.totale} su {gsc.clic}).
          </p>
        </Card>
      )}

      {!gsc.ok && (
        <div className="border border-amber-500/40 bg-amber-50 p-4">
          <p className="text-sm font-bold text-amber-800">Search Console non collegata</p>
          <p className="mt-1 text-xs text-amber-700">{gsc.errore}</p>
          <p className="mt-2 text-xs text-amber-600">
            Lead e ordini qui sotto sono comunque reali: mancano solo i dati di ricerca.
          </p>
        </div>
      )}

      <Card title="Lead al giorno" subtitle={`${dati.periodo.da} → ${dati.periodo.a}`}>
        <Sparkbars
          punti={lead.perGiorno.map((p) => ({ label: p.giorno, n: p.n }))}
          etichetta={(p) => `${p.label}: ${p.n} lead`}
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Da dove arrivano">
          <Barre voci={lead.perCanale} vuoto="Nessun lead nel periodo." />
        </Card>
        <Card title="Che tipo di pagina li porta">
          <Barre voci={lead.perFamiglia} vuoto="Nessuna pagina di atterraggio registrata." />
        </Card>
        <Card title="Servizio richiesto">
          <Barre voci={lead.perServizio} vuoto="Nessun lead nel periodo." />
        </Card>
        <Card title="Pagine di atterraggio">
          <Barre voci={lead.perPagina.slice(0, 10)} vuoto="Nessuna pagina registrata." />
        </Card>
      </div>

      {gsc.ok && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Pagine che convertono" subtitle="Traffico da Google diventato contatto">
            {cheConvertono.length ? (
              <Tabella righe={cheConvertono} colonna="lead" tono="green" />
            ) : (
              <EmptyState titolo="Nessuna pagina ha ancora prodotto lead tracciati." />
            )}
          </Card>
          <Card title="Traffico che non converte" subtitle="Almeno 5 clic e nessun contatto">
            {daSistemare.length ? (
              <Tabella righe={daSistemare} colonna="posizione" tono="amber" />
            ) : (
              <EmptyState titolo="Nessuna pagina con traffico sprecato." />
            )}
          </Card>
        </div>
      )}

      {!gsc.ok && (
        <Card title="Prossimo passo">
          <div className="flex items-start gap-3">
            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-neutral-300" />
            <p className="text-xs leading-relaxed text-neutral-500">
              Con Search Console collegata compaiono anche le pagine che portano traffico
              senza convertire: è lì che conviene intervenire per primo.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
