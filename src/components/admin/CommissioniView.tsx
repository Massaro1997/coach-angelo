"use client";

// DirezioneX: quanto Angelo deve per le commissioni, quanto ha gia' dato,
// quanto resta, e da quali clienti viene.

import { useEffect, useMemo, useState } from "react";
import { Check, Handshake, X } from "lucide-react";
import { Btn, Card, EmptyState, Stat, cx } from "./ui";
import type { Cliente } from "@/app/api/admin/clienti/route";
import type { VersamentoDx } from "@/app/api/admin/commissioni/route";
import { commissione, COMMISSIONE_MESE, type Commissione } from "@/lib/commissioni-dx";

const eur = (n: number) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
const giorno = (s: string) =>
  new Date(s).toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
const centesimi = (n: number) => Math.round(n * 100) / 100;

function regola(k: Commissione) {
  if (k.mesi != null) return `${eur(COMMISSIONE_MESE)} × ${k.mesi} mesi`;
  if (k.regola === "20% delle ore") return "20% delle ore";
  return `${eur(COMMISSIONE_MESE)} al mese`;
}

export default function CommissioniView() {
  const [clienti, setClienti] = useState<Cliente[]>([]);
  const [versati, setVersati] = useState<VersamentoDx[]>([]);
  const [caricando, setCaricando] = useState(true);
  const [errore, setErrore] = useState("");
  const [ora] = useState(() => Date.now());

  const [aperto, setAperto] = useState(false);
  const [importo, setImporto] = useState("");
  const [data, setData] = useState(() => new Date().toLocaleDateString("sv-SE"));
  const [salvo, setSalvo] = useState(false);

  const caricaVersati = () =>
    fetch("/api/admin/commissioni")
      .then(async (r) => {
        if (!r.ok) throw new Error("Non riesco a caricare i soldi già dati");
        setVersati(await r.json());
      })
      .catch((e) => setErrore(e.message));

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/clienti")
        .then(async (r) => {
          if (!r.ok) throw new Error("Non riesco a caricare i clienti");
          setClienti(await r.json());
        })
        .catch((e) => setErrore(e.message)),
      caricaVersati(),
    ]).finally(() => setCaricando(false));
  }, []);

  const righe = useMemo(
    () =>
      clienti
        .map((c) => ({ c, k: commissione(c, ora) }))
        .filter((r): r is { c: Cliente; k: Commissione } => r.k !== null)
        .sort((a, b) => b.k.maturata - a.k.maturata),
    [clienti, ora]
  );

  const maturata = centesimi(righe.reduce((s, r) => s + r.k.maturata, 0));
  const inTutto = centesimi(righe.reduce((s, r) => s + (r.k.totale ?? r.k.maturata), 0));
  const dati = centesimi(versati.reduce((s, v) => s + v.importo, 0));
  const resta = centesimi(maturata - dati);
  const valore = Number(importo.replace(",", ".")) || 0;
  const dopo = centesimi(resta - valore);

  async function segna() {
    setSalvo(true);
    setErrore("");
    const r = await fetch("/api/admin/commissioni", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ importo: valore, data }),
    });
    if (r.ok) {
      await caricaVersati();
      setImporto("");
      setAperto(false);
    } else {
      setErrore((await r.json().catch(() => ({}))).error || "Non salvato, riprova.");
    }
    setSalvo(false);
  }

  async function togli(v: VersamentoDx) {
    if (!confirm(`Togliere i ${eur(v.importo)} del ${giorno(v.data)}?`)) return;
    setErrore("");
    const r = await fetch(`/api/admin/commissioni?id=${encodeURIComponent(v.id)}`, { method: "DELETE" });
    if (r.ok) await caricaVersati();
    else setErrore("Non tolto, riprova.");
  }

  if (caricando) return <p className="py-10 text-sm text-neutral-400">Carico le commissioni…</p>;

  const campo = "border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Da dare" value={eur(maturata)} sub="commissioni maturate finora" tone="ink" />
        <Stat label="Già dati" value={eur(dati)} tone="green" />
        <Stat label={resta < 0 ? "In anticipo" : "Restano"} value={eur(Math.abs(resta))} tone="brand" />
        <Stat label="A fine contratti" value={eur(inTutto)} sub={`${righe.length} ${righe.length === 1 ? "cliente" : "clienti"} dall'online`} tone="amber" />
      </div>

      {errore && <p className="border border-red-500/30 bg-red-50 p-3 text-sm text-red-600">{errore}</p>}

      <Card bodyClassName="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-neutral-900">Soldi dati a DirezioneX</h3>
          <Btn variant={aperto ? "outline" : "ink"} onClick={() => setAperto((a) => !a)}>
            {aperto ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
            {aperto ? "Chiudi" : "Segna soldi dati"}
          </Btn>
        </div>

        {aperto && (
          <div className="mt-4 flex flex-wrap items-end gap-3 border-t border-black/[0.07] pt-4">
            <label className="block">
              <span className="block text-xs font-semibold text-neutral-600">Quanto ha dato</span>
              <input
                value={importo}
                onChange={(e) => setImporto(e.target.value)}
                inputMode="decimal"
                placeholder="100"
                autoFocus
                className={cx(campo, "w-32")}
              />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-neutral-600">Quando</span>
              <input type="date" value={data} onChange={(e) => setData(e.target.value)} className={campo} />
            </label>
            <Btn disabled={salvo || valore <= 0} onClick={segna}>
              {salvo ? "Salvo…" : "Conferma"}
            </Btn>
            {valore > 0 && (
              <p className="pb-2 text-sm text-neutral-700">
                {dopo < 0 ? "In anticipo di" : "Dopo restano"}{" "}
                <span className="font-bold tabular-nums text-neutral-900">{eur(Math.abs(dopo))}</span>
              </p>
            )}
          </div>
        )}

        {versati.length > 0 ? (
          <ul className="mt-3 divide-y divide-black/[0.06] border-t border-black/[0.07] text-sm">
            {versati.map((v) => (
              <li key={v.id} className="flex items-center gap-3 py-2">
                <span className="font-bold tabular-nums text-green-700">{eur(v.importo)}</span>
                <span className="text-neutral-600">{giorno(v.data)}</span>
                <button onClick={() => togli(v)} className="ml-auto text-[12px] font-semibold text-neutral-400 hover:text-red-600">
                  Togli
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-[12px] text-neutral-500">Ancora nessun pagamento segnato.</p>
        )}
      </Card>

      {righe.length === 0 ? (
        <Card>
          <EmptyState
            titolo="Nessuna commissione."
            testo="Compaiono qui i clienti con un contratto arrivati dal sito."
            icon={<Handshake className="h-8 w-8" />}
          />
        </Card>
      ) : (
        <div className="border border-black/10 bg-white">
          <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_110px_110px] gap-4 border-b border-black/[0.07] px-5 py-2.5 text-[11px] font-semibold text-neutral-400 sm:grid">
            <span>Cliente</span>
            <span>Regola</span>
            <span className="text-right">Maturata</span>
            <span className="text-right">A fine contratto</span>
          </div>
          {righe.map(({ c, k }) => (
            <div
              key={c.id}
              className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-black/[0.07] px-5 py-3 last:border-b-0 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_110px_110px] sm:items-center"
            >
              <div className="col-span-2 min-w-0 sm:col-span-1">
                <p className="truncate text-sm font-bold text-neutral-900">{c.nome}</p>
                <p className="truncate text-[12px] text-neutral-500">
                  {c.pacchetto} · lead da {c.lead?.canale}
                </p>
              </div>
              <p className="col-span-2 text-[12px] text-neutral-600 sm:col-span-1">{regola(k)}</p>
              <p className="text-sm font-bold tabular-nums text-neutral-900 sm:text-right">{eur(k.maturata)}</p>
              <p className="text-right text-sm tabular-nums text-neutral-500">{k.totale != null ? eur(k.totale) : "senza fine"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
