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
  if (prima === 0 && ora === 0) return <span className="text-crm-spento">nessuna variazione</span>;
  if (prima === 0) return <span className="font-[550] text-crm-verde">nuovi</span>;
  const pct = Math.round(((ora - prima) / prima) * 100);
  const su = pct >= 0;
  return (
    <span className={cx("font-[550]", su ? "text-crm-verde" : "text-crm-rosso")}>
      {su ? "▲" : "▼"} {Math.abs(pct)}% <span className="font-normal text-crm-spento">vs prec.</span>
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
    <div className="overflow-x-auto">
      <table className="crm-tabella">
        <thead>
          <tr>
            <th>Pagina</th>
            <th className="num">Clic</th>
            <th className="num">{colonna === "lead" ? "Lead" : "Pos."}</th>
          </tr>
        </thead>
        <tbody>
          {righe.map((p) => (
            <tr key={p.path}>
              <td className="max-w-[240px] truncate text-crm-testo" title={p.path}>
                {p.path}
              </td>
              <td className="num text-crm-tenue">{p.clic}</td>
              <td className="num">
                <span className={cx("crm-badge tabular-nums", tono === "green" ? "crm-badge-ok" : "crm-badge-attesa")}>
                  {colonna === "lead" ? p.lead : p.posizione}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

  if (caricando && !dati) return <p className="py-10 text-[13px] text-crm-spento">Carico i dati…</p>;
  if (errore) return <p className="py-10 text-[13px] text-crm-rosso">{errore}</p>;
  if (!dati) return null;

  const { lead, ordini, gsc } = dati;
  const daSistemare = gsc.ok ? gsc.pagine.filter((p) => p.clic >= 5 && p.lead === 0).slice(0, 12) : [];
  const cheConvertono = gsc.ok
    ? gsc.pagine.filter((p) => p.lead > 0).sort((a, b) => b.lead - a.lead).slice(0, 12)
    : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-1">
        {PERIODI.map((g) => (
          <button
            key={g}
            onClick={() => setGiorni(g)}
            data-attiva={giorni === g}
            className="crm-linguetta transition-colors"
          >
            {g === 365 ? "12 mesi" : `${g} giorni`}
          </button>
        ))}
        {caricando && <span className="ml-1 text-[12px] text-crm-spento">aggiorno…</span>}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
          <p className="text-[13px] text-crm-testo">
            <span className="text-xl font-[650] tracking-[-0.02em] tabular-nums text-crm-ink">
              {((lead.totale / gsc.clic) * 100).toFixed(1)}%
            </span>{" "}
            dei clic da Google è diventato un contatto ({lead.totale} su {gsc.clic}).
          </p>
        </Card>
      )}

      {!gsc.ok && (
        <div className="rounded-xl bg-[#fff8db] p-4 text-[#4f4700] shadow-crm-anello">
          <p className="text-[13px] font-[650]">Search Console non collegata</p>
          <p className="mt-1 text-[13px]">{gsc.errore}</p>
          <p className="mt-2 text-[12px] opacity-80">
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
          <Card
            title="Pagine che convertono"
            subtitle="Traffico da Google diventato contatto"
            className="min-w-0"
            bodyClassName="px-2 pb-2 pt-2"
          >
            {cheConvertono.length ? (
              <Tabella righe={cheConvertono} colonna="lead" tono="green" />
            ) : (
              <EmptyState titolo="Nessuna pagina ha ancora prodotto lead tracciati." />
            )}
          </Card>
          <Card
            title="Traffico che non converte"
            subtitle="Almeno 5 clic e nessun contatto"
            className="min-w-0"
            bodyClassName="px-2 pb-2 pt-2"
          >
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
            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-crm-spento" />
            <p className="text-[13px] leading-5 text-crm-tenue">
              Con Search Console collegata compaiono anche le pagine che portano traffico
              senza convertire: è lì che conviene intervenire per primo.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
