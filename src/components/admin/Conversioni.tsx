"use client";

import { useEffect, useState } from "react";

interface Voce { nome: string; n: number }
interface PaginaGsc { path: string; clic: number; impressioni: number; posizione: number; lead: number }

interface Dati {
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
  if (prima === 0 && ora === 0) return <span className="text-white/40">=</span>;
  if (prima === 0) return <span className="text-emerald-400">nuovo</span>;
  const pct = Math.round(((ora - prima) / prima) * 100);
  const su = pct >= 0;
  return (
    <span className={su ? "text-emerald-400" : "text-red-400"}>
      {su ? "▲" : "▼"} {Math.abs(pct)}%
    </span>
  );
}

function Tessera({ titolo, valore, sotto }: { titolo: string; valore: string; sotto?: React.ReactNode }) {
  return (
    <div className="bg-neutral-800 rounded-xl p-5 border border-white/5">
      <p className="text-xs uppercase tracking-wider text-white/45 mb-2">{titolo}</p>
      <p className="text-3xl font-bold text-white tabular-nums">{valore}</p>
      {sotto && <p className="text-sm mt-1">{sotto}</p>}
    </div>
  );
}

/** Barre orizzontali: leggibili senza libreria di grafici. */
function Barre({ voci, vuoto }: { voci: Voce[]; vuoto: string }) {
  if (!voci.length) return <p className="text-white/40 text-sm">{vuoto}</p>;
  const max = Math.max(...voci.map((v) => v.n), 1);
  return (
    <div className="space-y-2">
      {voci.map((v) => (
        <div key={v.nome} className="flex items-center gap-3">
          <span className="text-sm text-white/70 w-44 shrink-0 truncate" title={v.nome}>{v.nome}</span>
          <div className="flex-1 h-5 bg-neutral-700/40 rounded overflow-hidden">
            <div className="h-full bg-emerald-500/70 rounded" style={{ width: `${(v.n / max) * 100}%` }} />
          </div>
          <span className="text-sm text-white font-semibold tabular-nums w-10 text-right">{v.n}</span>
        </div>
      ))}
    </div>
  );
}

function Andamento({ punti }: { punti: { giorno: string; n: number }[] }) {
  if (!punti.length) return null;
  const max = Math.max(...punti.map((p) => p.n), 1);
  return (
    <div className="flex items-end gap-[2px] h-24">
      {punti.map((p) => (
        <div
          key={p.giorno}
          title={`${p.giorno}: ${p.n} lead`}
          className="flex-1 bg-emerald-500/60 hover:bg-emerald-400 rounded-sm transition-colors min-h-[2px]"
          style={{ height: `${(p.n / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

export default function Conversioni() {
  const [giorni, setGiorni] = useState(28);
  const [dati, setDati] = useState<Dati | null>(null);
  const [caricando, setCaricando] = useState(true);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    setCaricando(true);
    setErrore("");
    fetch(`/api/admin/conversioni?giorni=${giorni}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Errore " + r.status))))
      .then(setDati)
      .catch((e) => setErrore(e.message))
      .finally(() => setCaricando(false));
  }, [giorni]);

  if (caricando && !dati) return <p className="text-white/50 py-10">Carico i dati...</p>;
  if (errore) return <p className="text-red-400 py-10">{errore}</p>;
  if (!dati) return null;

  const { lead, ordini, gsc } = dati;

  // Pagine che portano traffico ma non convertono: dove intervenire.
  const daSistemare = gsc.ok
    ? gsc.pagine.filter((p) => p.clic >= 5 && p.lead === 0).slice(0, 12)
    : [];
  // Pagine che convertono davvero.
  const cheConvertono = gsc.ok
    ? gsc.pagine.filter((p) => p.lead > 0).sort((a, b) => b.lead - a.lead).slice(0, 12)
    : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        {PERIODI.map((g) => (
          <button
            key={g}
            onClick={() => setGiorni(g)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              giorni === g ? "bg-white text-neutral-900" : "bg-neutral-800 text-white/70 hover:bg-neutral-700"
            }`}
          >
            {g === 365 ? "12 mesi" : `${g} giorni`}
          </button>
        ))}
        {caricando && <span className="text-white/40 text-sm ml-2">aggiorno...</span>}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Tessera
          titolo="Lead"
          valore={String(lead.totale)}
          sotto={<><Delta ora={lead.totale} prima={lead.precedente} /> <span className="text-white/40">vs periodo prec.</span></>}
        />
        <Tessera
          titolo="Da leggere"
          valore={String(lead.daLeggere)}
          sotto={lead.daLeggere > 0 ? <span className="text-amber-400">richiedono risposta</span> : <span className="text-white/40">tutto letto</span>}
        />
        <Tessera
          titolo="Clic da Google"
          valore={gsc.ok ? String(gsc.clic) : "—"}
          sotto={gsc.ok
            ? <span className="text-white/40">pos. media {gsc.posizioneMedia}</span>
            : <span className="text-amber-400">Search Console non collegata</span>}
        />
        <Tessera
          titolo="Fatturato"
          valore={`${ordini.fatturato.toLocaleString("it-IT", { minimumFractionDigits: 2 })} €`}
          sotto={<span className="text-white/40">{ordini.pagati} ordini pagati su {ordini.totale}</span>}
        />
      </div>

      {gsc.ok && gsc.clic > 0 && (
        <div className="bg-neutral-800 rounded-xl p-5 border border-white/5">
          <p className="text-xs uppercase tracking-wider text-white/45 mb-1">Da clic a lead</p>
          <p className="text-white/70 text-sm">
            <span className="text-2xl font-bold text-white tabular-nums">
              {((lead.totale / gsc.clic) * 100).toFixed(1)}%
            </span>{" "}
            dei clic da Google e&apos; diventato un contatto ({lead.totale} su {gsc.clic}).
          </p>
        </div>
      )}

      {!gsc.ok && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <p className="text-amber-300 font-medium text-sm mb-1">Search Console non collegata</p>
          <p className="text-amber-200/70 text-sm">{gsc.errore}</p>
          <p className="text-amber-200/50 text-sm mt-2">
            I lead e gli ordini qui sotto sono comunque reali: mancano solo i dati di ricerca.
          </p>
        </div>
      )}

      <div className="bg-neutral-800 rounded-xl p-5 border border-white/5">
        <p className="text-sm font-semibold text-white mb-4">Lead al giorno</p>
        <Andamento punti={lead.perGiorno} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-neutral-800 rounded-xl p-5 border border-white/5">
          <p className="text-sm font-semibold text-white mb-4">Da dove arrivano</p>
          <Barre voci={lead.perCanale} vuoto="Nessun lead nel periodo." />
        </div>
        <div className="bg-neutral-800 rounded-xl p-5 border border-white/5">
          <p className="text-sm font-semibold text-white mb-4">Che tipo di pagina li porta</p>
          <Barre voci={lead.perFamiglia} vuoto="Nessuna pagina di atterraggio registrata." />
        </div>
        <div className="bg-neutral-800 rounded-xl p-5 border border-white/5">
          <p className="text-sm font-semibold text-white mb-4">Servizio richiesto</p>
          <Barre voci={lead.perServizio} vuoto="Nessun lead nel periodo." />
        </div>
        <div className="bg-neutral-800 rounded-xl p-5 border border-white/5">
          <p className="text-sm font-semibold text-white mb-4">Pagine di atterraggio</p>
          <Barre voci={lead.perPagina.slice(0, 10)} vuoto="Nessuna pagina registrata." />
        </div>
      </div>

      {gsc.ok && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-neutral-800 rounded-xl p-5 border border-white/5">
            <p className="text-sm font-semibold text-white mb-1">Pagine che convertono</p>
            <p className="text-xs text-white/40 mb-4">Traffico da Google che e&apos; diventato contatto.</p>
            {cheConvertono.length ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 text-xs uppercase">
                    <th className="text-left font-medium pb-2">Pagina</th>
                    <th className="text-right font-medium pb-2">Clic</th>
                    <th className="text-right font-medium pb-2">Lead</th>
                  </tr>
                </thead>
                <tbody>
                  {cheConvertono.map((p) => (
                    <tr key={p.path} className="border-t border-white/5">
                      <td className="py-2 text-white/80 truncate max-w-[240px]" title={p.path}>{p.path}</td>
                      <td className="py-2 text-right text-white/60 tabular-nums">{p.clic}</td>
                      <td className="py-2 text-right text-emerald-400 font-semibold tabular-nums">{p.lead}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-white/40 text-sm">Nessuna pagina ha ancora prodotto lead tracciati.</p>
            )}
          </div>

          <div className="bg-neutral-800 rounded-xl p-5 border border-white/5">
            <p className="text-sm font-semibold text-white mb-1">Traffico che non converte</p>
            <p className="text-xs text-white/40 mb-4">Almeno 5 clic e nessun contatto: qui conviene intervenire.</p>
            {daSistemare.length ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 text-xs uppercase">
                    <th className="text-left font-medium pb-2">Pagina</th>
                    <th className="text-right font-medium pb-2">Clic</th>
                    <th className="text-right font-medium pb-2">Pos.</th>
                  </tr>
                </thead>
                <tbody>
                  {daSistemare.map((p) => (
                    <tr key={p.path} className="border-t border-white/5">
                      <td className="py-2 text-white/80 truncate max-w-[240px]" title={p.path}>{p.path}</td>
                      <td className="py-2 text-right text-amber-400 tabular-nums">{p.clic}</td>
                      <td className="py-2 text-right text-white/60 tabular-nums">{p.posizione}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-white/40 text-sm">Nessuna pagina con traffico sprecato.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
