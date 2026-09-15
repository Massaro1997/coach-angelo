"use client";

import { useEffect, useState } from "react";
import { FileSignature, Plus, Link2, Send, Trash2, Check, X } from "lucide-react";
import { Card, Stat, Badge, Btn, EmptyState, cx } from "./ui";
import { LISTINO, type VocePreventivo } from "@/lib/preventivo-listino";

interface Rata {
  id: string;
  token: string;
  descrizione: string;
  importo: number;
  tipo: string;
  rataNumero: number | null;
  rateTotali: number | null;
  stato: string;
  scadenza: string | null;
  pagatoAt: string | null;
}

interface Preventivo {
  id: string;
  numero: string;
  token: string;
  clienteNome: string;
  clienteEmail: string | null;
  oggetto: string | null;
  totale: number;
  periodicita: string;
  mesi: number;
  stato: string;
  lavoro: string;
  validoFino: string | null;
  inviatoAt: string | null;
  firmatoNome: string | null;
  firmatoAt: string | null;
  accontoIncassato: number;
  createdAt: string;
  pagamenti: Rata[];
  haFirma: boolean;
}

const eur = (n: number) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

const data = (s: string | null) =>
  s ? new Date(s).toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";

function tonoStato(p: Preventivo): { label: string; tone: string } {
  if (p.stato === "firmato") return { label: "firmato", tone: "green" };
  if (p.stato === "sostituito") return { label: "sostituito", tone: "neutral" };
  if (p.validoFino && new Date(p.validoFino) < new Date())
    return { label: "scaduto", tone: "red" };
  if (p.firmatoAt) return { label: "firmato, non pagato", tone: "amber" };
  if (p.inviatoAt) return { label: "inviato", tone: "blue" };
  return { label: "bozza", tone: "outline" };
}

export default function PreventiviView() {
  const [lista, setLista] = useState<Preventivo[]>([]);
  const [caricando, setCaricando] = useState(true);
  const [nuovo, setNuovo] = useState(false);
  const [msg, setMsg] = useState("");

  const carica = () => {
    setCaricando(true);
    fetch("/api/admin/preventivi")
      .then((r) => (r.ok ? r.json() : []))
      .then(setLista)
      .finally(() => setCaricando(false));
  };

  useEffect(carica, []);

  async function azione(id: string, body: Record<string, unknown>) {
    setMsg("");
    const res = await fetch(`/api/admin/preventivi/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) setMsg(j.error || "Errore");
    else carica();
  }

  async function elimina(id: string, numero: string) {
    if (!confirm(`Eliminare il preventivo ${numero}? L'operazione non si annulla.`)) return;
    const res = await fetch(`/api/admin/preventivi/${id}`, { method: "DELETE" });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) setMsg(j.error || "Errore");
    else carica();
  }

  if (caricando && !lista.length) {
    return <p className="py-10 text-sm text-neutral-400">Carico i preventivi…</p>;
  }

  const firmati = lista.filter((p) => p.stato === "firmato");
  const inAttesa = lista.filter((p) => p.stato !== "firmato" && p.stato !== "sostituito");
  const incassato = lista.reduce((s, p) => s + p.accontoIncassato, 0);
  const daIncassare = firmati.reduce((s, p) => s + (p.totale - p.accontoIncassato), 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Preventivi" value={lista.length} tone="ink" />
        <Stat label="In attesa" value={inAttesa.length} tone="amber" />
        <Stat label="Incassato" value={eur(incassato)} tone="green" />
        <Stat label="Da incassare" value={eur(daIncassare)} tone="brand" />
      </div>

      {msg && <p className="border border-red-500/30 bg-red-50 p-3 text-sm text-red-600">{msg}</p>}

      <div className="flex items-center justify-between">
        <Btn variant="ink" onClick={() => setNuovo((v) => !v)}>
          {nuovo ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {nuovo ? "Annulla" : "Nuovo preventivo"}
        </Btn>
      </div>

      {nuovo && (
        <FormNuovo
          onFatto={() => {
            setNuovo(false);
            carica();
          }}
        />
      )}

      {lista.length === 0 ? (
        <Card>
          <EmptyState
            titolo="Nessun preventivo."
            testo="Crea il primo: il cliente lo firma dal telefono e paga la prima rata."
            icon={<FileSignature className="h-8 w-8" />}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {lista.map((p) => {
            const st = tonoStato(p);
            const link = `${typeof window !== "undefined" ? window.location.origin : ""}/preventivo/${p.token}`;
            return (
              <Card key={p.id} bodyClassName="p-4">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-neutral-900">{p.numero}</span>
                      <Badge tone={st.tone}>{st.label}</Badge>
                      {p.stato === "firmato" && (
                        <Badge tone="outline">{p.lavoro}</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-neutral-700">
                      {p.clienteNome}
                      {p.oggetto ? ` — ${p.oggetto}` : ""}
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-400">
                      {p.clienteEmail || "senza email"} · creato {data(p.createdAt)}
                      {p.validoFino && ` · valido fino al ${data(p.validoFino)}`}
                      {p.firmatoAt && ` · firmato da ${p.firmatoNome} il ${data(p.firmatoAt)}`}
                    </p>

                    {p.pagamenti.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {p.pagamenti.map((r) => (
                          <span
                            key={r.id}
                            title={r.descrizione}
                            className={cx(
                              "px-1.5 py-0.5 text-[10px] font-bold",
                              r.stato === "pagato"
                                ? "bg-green-600 text-white"
                                : "border border-black/10 bg-[#f4f4f5] text-neutral-500"
                            )}
                          >
                            {r.rataNumero ? `${r.rataNumero}/${r.rateTotali} ` : ""}
                            {eur(r.importo)}
                            {r.stato === "pagato" && " ✓"}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold tabular-nums text-neutral-900">
                      {eur(p.totale)}
                    </p>
                    {p.periodicita === "mensile" && p.mesi > 1 && (
                      <p className="text-[10px] text-neutral-400">
                        {eur(Math.round((p.totale / p.mesi) * 100) / 100)}/mese × {p.mesi}
                      </p>
                    )}
                    {p.accontoIncassato > 0 && (
                      <p className="mt-0.5 text-[10px] font-semibold text-green-600">
                        incassati {eur(p.accontoIncassato)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-black/[0.06] pt-3">
                  <Btn
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard?.writeText(link);
                      setMsg(`Link di ${p.numero} copiato.`);
                    }}
                  >
                    <Link2 className="h-3 w-3" />
                    Copia link
                  </Btn>
                  <a
                    href={`/preventivo/${p.token}`}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 border border-black/15 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-neutral-700 hover:border-black/30"
                  >
                    Apri
                  </a>
                  {p.clienteEmail && !p.firmatoAt && (
                    <Btn size="sm" variant="ink" onClick={() => azione(p.id, { azione: "invia" })}>
                      <Send className="h-3 w-3" />
                      {p.inviatoAt ? "Reinvia" : "Invia al cliente"}
                    </Btn>
                  )}
                  {p.stato === "firmato" && p.lavoro !== "concluso" && (
                    <Btn
                      size="sm"
                      variant="brand"
                      onClick={() =>
                        azione(p.id, {
                          lavoro: p.lavoro === "da iniziare" ? "in corso" : p.lavoro === "in corso" ? "consegnato" : "concluso",
                        })
                      }
                    >
                      <Check className="h-3 w-3" />
                      {p.lavoro === "da iniziare"
                        ? "Inizia"
                        : p.lavoro === "in corso"
                        ? "Consegna"
                        : "Concludi"}
                    </Btn>
                  )}
                  {p.stato !== "firmato" && (
                    <Btn size="sm" variant="ghost" onClick={() => elimina(p.id, p.numero)}>
                      <Trash2 className="h-3 w-3" />
                    </Btn>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ form nuovo */

function FormNuovo({ onFatto }: { onFatto: () => void }) {
  const [clienteNome, setClienteNome] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");
  const [oggetto, setOggetto] = useState("");
  const [premesse, setPremesse] = useState("");
  const [lingua, setLingua] = useState("de");
  const [accontoPerc, setAccontoPerc] = useState(50);
  const [items, setItems] = useState<VocePreventivo[]>([
    { descrizione: "", prezzo: 0, quantita: 1 },
  ]);
  const [periodicita, setPeriodicita] = useState("una tantum");
  const [mesi, setMesi] = useState(1);
  const [invio, setInvio] = useState(false);
  const [errore, setErrore] = useState("");

  const totale =
    Math.round(items.reduce((s, v) => s + (v.prezzo || 0) * (v.quantita || 1), 0) * 100) / 100;

  function daListino(key: string) {
    const v = LISTINO.find((x) => x.key === key);
    if (!v) return;
    setOggetto(v.label);
    setPeriodicita(v.periodicita);
    setMesi(v.mesi);
    setItems([
      {
        descrizione: `${v.label} — ${v.descrizione}`,
        prezzo: v.prezzo,
        quantita: v.periodicita === "mensile" ? v.mesi : 1,
      },
    ]);
  }

  async function salva() {
    setErrore("");
    setInvio(true);
    try {
      const res = await fetch("/api/admin/preventivi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clienteNome,
          clienteEmail,
          clienteTelefono,
          oggetto,
          premesse,
          lingua,
          accontoPerc,
          periodicita,
          mesi,
          items: items.filter((v) => v.descrizione.trim()),
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Errore");
      onFatto();
    } catch (e) {
      setErrore((e as Error).message);
    } finally {
      setInvio(false);
    }
  }

  const campo = "w-full border border-black/15 px-3 py-2 text-sm outline-none focus:border-neutral-900";

  return (
    <Card title="Nuovo preventivo">
      <div className="space-y-4">
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Parti da un pacchetto
          </p>
          <div className="flex flex-wrap gap-1.5">
            {LISTINO.map((v) => (
              <button
                key={v.key}
                onClick={() => daListino(v.key)}
                className="border border-black/15 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-neutral-600 hover:border-neutral-900"
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-neutral-600">Cliente *</span>
            <input value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} className={campo} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-neutral-600">Email</span>
            <input value={clienteEmail} onChange={(e) => setClienteEmail(e.target.value)} className={campo} type="email" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-neutral-600">Telefono</span>
            <input value={clienteTelefono} onChange={(e) => setClienteTelefono(e.target.value)} className={campo} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-neutral-600">Lingua del documento</span>
            <select value={lingua} onChange={(e) => setLingua(e.target.value)} className={campo}>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-semibold text-neutral-600">Oggetto</span>
          <input value={oggetto} onChange={(e) => setOggetto(e.target.value)} className={campo} />
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-neutral-600">Premesse</span>
          <textarea
            value={premesse}
            onChange={(e) => setPremesse(e.target.value)}
            rows={2}
            className={campo}
          />
        </label>

        {/* voci */}
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Voci
          </p>
          <div className="space-y-2">
            {items.map((v, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={v.descrizione}
                  onChange={(e) => {
                    const c = [...items];
                    c[i] = { ...c[i], descrizione: e.target.value };
                    setItems(c);
                  }}
                  placeholder="Descrizione"
                  className={cx(campo, "flex-1")}
                />
                <input
                  value={v.quantita}
                  onChange={(e) => {
                    const c = [...items];
                    c[i] = { ...c[i], quantita: Number(e.target.value) || 1 };
                    setItems(c);
                  }}
                  type="number"
                  className={cx(campo, "w-16")}
                  title="Quantità"
                />
                <input
                  value={v.prezzo}
                  onChange={(e) => {
                    const c = [...items];
                    c[i] = { ...c[i], prezzo: Number(e.target.value) || 0 };
                    setItems(c);
                  }}
                  type="number"
                  step="0.01"
                  className={cx(campo, "w-28")}
                  title="Prezzo unitario"
                />
                {items.length > 1 && (
                  <button
                    onClick={() => setItems(items.filter((_, j) => j !== i))}
                    className="px-2 text-neutral-400 hover:text-red-500"
                    aria-label="Togli voce"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <Btn
            size="sm"
            variant="outline"
            className="mt-2"
            onClick={() => setItems([...items, { descrizione: "", prezzo: 0, quantita: 1 }])}
          >
            <Plus className="h-3 w-3" />
            Aggiungi voce
          </Btn>
          <p className="mt-2 text-right text-sm">
            Totale <span className="text-lg font-bold tabular-nums">{eur(totale)}</span>
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="text-xs font-semibold text-neutral-600">Periodicità</span>
            <select
              value={periodicita}
              onChange={(e) => setPeriodicita(e.target.value)}
              className={campo}
            >
              <option value="una tantum">Una tantum</option>
              <option value="mensile">Mensile</option>
            </select>
          </label>
          {periodicita === "mensile" && (
            <label className="block">
              <span className="text-xs font-semibold text-neutral-600">Mesi</span>
              <input
                value={mesi}
                onChange={(e) => setMesi(Math.max(1, Number(e.target.value) || 1))}
                type="number"
                min={1}
                className={campo}
              />
            </label>
          )}
          {periodicita === "una tantum" && (
            <label className="block">
              <span className="text-xs font-semibold text-neutral-600">Acconto %</span>
              <input
                value={accontoPerc}
                onChange={(e) => setAccontoPerc(Number(e.target.value) || 0)}
                type="number"
                min={0}
                max={100}
                className={campo}
              />
            </label>
          )}
        </div>

        <p className="text-[11px] text-neutral-400">
          {periodicita === "mensile"
            ? `Alla firma si creano ${mesi} rate da ${eur(Math.round((totale / Math.max(mesi, 1)) * 100) / 100)}, una al mese.`
            : `Alla firma si creano due rate: acconto ${accontoPerc}% e saldo.`}
        </p>

        {errore && <p className="text-sm text-red-500">{errore}</p>}

        <Btn variant="ink" onClick={salva} disabled={invio || !clienteNome.trim() || totale === 0}>
          {invio ? "Creo…" : "Crea preventivo"}
        </Btn>
      </div>
    </Card>
  );
}
