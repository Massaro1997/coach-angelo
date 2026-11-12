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

  if (caricando) return <p className="py-10 text-[13px] text-crm-spento">Carico le commissioni…</p>;

  const campo = "crm-campo";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat label="Da dare" value={eur(maturata)} sub="commissioni maturate finora" tone="ink" />
        <Stat label="Già dati" value={eur(dati)} tone="green" />
        <Stat label={resta < 0 ? "In anticipo" : "Restano"} value={eur(Math.abs(resta))} tone="brand" />
        <Stat label="A fine contratti" value={eur(inTutto)} sub={`${righe.length} ${righe.length === 1 ? "cliente" : "clienti"} dall'online`} tone="amber" />
      </div>

      {errore && <p className="rounded-xl bg-[#fee9e8] px-4 py-3 text-[13px] text-[#8e0b21]">{errore}</p>}

      <Card bodyClassName="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[13px] font-[650] text-crm-ink">Soldi dati a DirezioneX</h3>
          <Btn variant={aperto ? "outline" : "ink"} onClick={() => setAperto((a) => !a)}>
            {aperto ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
            {aperto ? "Chiudi" : "Segna soldi dati"}
          </Btn>
        </div>

        {aperto && (
          <div className="mt-4 flex flex-wrap items-end gap-3 rounded-xl bg-crm-fondo p-3">
            <label className="block">
              <span className="crm-etichetta">Quanto ha dato</span>
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
              <span className="crm-etichetta">Quando</span>
              <input type="date" value={data} onChange={(e) => setData(e.target.value)} className={cx(campo, "w-auto")} />
            </label>
            <Btn disabled={salvo || valore <= 0} onClick={segna}>
              {salvo ? "Salvo…" : "Conferma"}
            </Btn>
            {valore > 0 && (
              <p className="pb-1 text-[13px] text-crm-testo">
                {dopo < 0 ? "In anticipo di" : "Dopo restano"}{" "}
                <span className="font-[650] tabular-nums text-crm-ink">{eur(Math.abs(dopo))}</span>
              </p>
            )}
          </div>
        )}

        {versati.length > 0 ? (
          <ul className="mt-3 divide-y divide-crm-filo border-t border-crm-filo text-[13px]">
            {versati.map((v) => (
              <li key={v.id} className="flex items-center gap-3 py-2">
                <span className="font-[650] tabular-nums text-crm-verde">{eur(v.importo)}</span>
                <span className="text-crm-tenue">{giorno(v.data)}</span>
                <button onClick={() => togli(v)} className="crm-btn-piatto ml-auto -mr-2 text-crm-tenue hover:text-crm-rosso">
                  Togli
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-[12px] text-crm-tenue">Ancora nessun pagamento segnato.</p>
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
        <section className="crm-card p-2">
          {/* testata grigia di Shopify, solo da tablet in su */}
          <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_110px_110px] gap-4 rounded-lg bg-crm-fondo px-3 py-1.5 text-[12px] font-[550] text-[#4a4a4a] sm:grid">
            <span>Cliente</span>
            <span>Regola</span>
            <span className="text-right">Maturata</span>
            <span className="text-right">A fine contratto</span>
          </div>
          {righe.map(({ c, k }) => (
            <div
              key={c.id}
              className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-crm-filo px-3 py-2.5 transition-colors last:border-b-0 hover:bg-crm-fondo sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_110px_110px] sm:items-center"
            >
              <div className="col-span-2 min-w-0 sm:col-span-1">
                <p className="truncate text-[13px] font-[650] text-crm-ink">{c.nome}</p>
                <p className="truncate text-[12px] text-crm-tenue">
                  {c.pacchetto} · lead da {c.lead?.canale}
                </p>
              </div>
              <p className="col-span-2 text-[12px] text-crm-testo sm:col-span-1">{regola(k)}</p>
              <p className="text-[13px] font-[650] tabular-nums text-crm-ink sm:text-right">{eur(k.maturata)}</p>
              <p className="text-right text-[13px] tabular-nums text-crm-tenue">{k.totale != null ? eur(k.totale) : "senza fine"}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
