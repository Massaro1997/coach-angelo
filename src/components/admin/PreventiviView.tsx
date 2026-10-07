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
        nuovo ? null : (
        <Card>
          <EmptyState
            titolo="Nessun preventivo."
            testo="Crea il primo: il cliente lo firma dal telefono e paga la prima rata."
            icon={<FileSignature className="h-8 w-8" />}
          />
        </Card>
        )
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

/* ------------------------------------------------------------ form nuovo
   Percorso in tre passi (pacchetto, come paga, cliente) con il riepilogo
   sempre a destra: chi crea il preventivo vede subito cosa paga il cliente
   oggi e cosa dopo. Prezzi e rate vengono dal listino (= volantino). */

type Pagamento = "rate" | "subito";

interface Pacchetto {
  id: string;
  titolo: string;
  nota: string;
  rate?: string; // chiave LISTINO a rate
  subito?: string; // chiave LISTINO tutto subito
  consigliato?: boolean;
}

const PACCHETTI: Pacchetto[] = [
  { id: "c3", titolo: "Coaching 3 mesi", nota: "Obiettivo a breve", rate: "coaching-3" },
  { id: "c6", titolo: "Coaching 6 mesi", nota: "Il più scelto", rate: "coaching-6", subito: "coaching-6-einmal", consigliato: true },
  { id: "c12", titolo: "Coaching 12 mesi", nota: "Trasformazione completa", rate: "coaching-12", subito: "coaching-12-einmal" },
  { id: "pt", titolo: "Personal Training 1-zu-1", nota: "Ogni mese, finché non disdice", rate: "pt-1to1" },
  { id: "plan", titolo: "Scheda di allenamento", nota: "Una volta sola", subito: "trainingsplan" },
  { id: "custom", titolo: "Su misura", nota: "Voci e prezzi a mano" },
];

const voceListino = (key?: string) => LISTINO.find((x) => x.key === key);
const totaleVoce = (key?: string) => {
  const v = voceListino(key);
  if (!v) return 0;
  return Math.round(v.prezzo * (v.periodicita === "mensile" ? v.mesi : 1) * 100) / 100;
};

function FormNuovo({ onFatto }: { onFatto: () => void }) {
  const [pacchetto, setPacchetto] = useState<string>("c6");
  const [pagamento, setPagamento] = useState<Pagamento>("rate");

  const [clienteNome, setClienteNome] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");
  const [lingua, setLingua] = useState<"de" | "it">("de");
  const [premesse, setPremesse] = useState("");
  const [conNota, setConNota] = useState(false);

  // solo per "su misura"
  const [oggetto, setOggetto] = useState("");
  const [items, setItems] = useState<VocePreventivo[]>([{ descrizione: "", prezzo: 0, quantita: 1 }]);
  const [periodicita, setPeriodicita] = useState<"mensile" | "una tantum">("una tantum");
  const [mesi, setMesi] = useState(1);
  const [accontoPerc, setAccontoPerc] = useState(100);

  const [invio, setInvio] = useState(false);
  const [errore, setErrore] = useState("");
  const [creato, setCreato] = useState<{ id: string; numero: string; token: string; inviato: boolean } | null>(null);

  const pac = PACCHETTI.find((p) => p.id === pacchetto)!;
  const suMisura = pac.id === "custom";
  const haScelta = Boolean(pac.rate && pac.subito);
  const chiave = suMisura ? undefined : pagamento === "subito" && pac.subito ? pac.subito : pac.rate || pac.subito;
  const voce = voceListino(chiave);

  // quello che finisce nel documento
  const doc = suMisura
    ? {
        oggetto,
        periodicita,
        mesi: periodicita === "mensile" ? mesi : 1,
        accontoPerc: periodicita === "mensile" ? 100 : accontoPerc,
        items: items.filter((v) => v.descrizione.trim()),
      }
    : {
        oggetto: voce?.label || "",
        periodicita: voce?.periodicita || "una tantum",
        mesi: voce?.mesi || 1,
        accontoPerc: voce?.accontoPerc ?? 100,
        items: voce
          ? [{
              descrizione: `${voce.label} — ${voce.descrizione}`,
              prezzo: voce.prezzo,
              quantita: voce.periodicita === "mensile" ? voce.mesi : 1,
            }]
          : [],
      };

  const totale = Math.round(doc.items.reduce((s, v) => s + (v.prezzo || 0) * (v.quantita || 1), 0) * 100) / 100;
  const mensile = doc.periodicita === "mensile";
  const rata = mensile ? Math.round((totale / Math.max(doc.mesi, 1)) * 100) / 100 : 0;
  const oggi = mensile ? (doc.mesi > 1 ? rata : totale) : Math.round(totale * (doc.accontoPerc / 100) * 100) / 100;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clienteEmail.trim());
  const pronto = clienteNome.trim().length >= 2 && totale > 0 && (!suMisura || oggetto.trim().length > 0);

  async function crea(invia: boolean) {
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
          lingua,
          premesse: conNota ? premesse : "",
          ...doc,
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Errore");
      let inviato = false;
      if (invia) {
        const r = await fetch(`/api/admin/preventivi/${j.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ azione: "invia" }),
        });
        inviato = r.ok;
        if (!r.ok) setErrore("Preventivo creato, ma la mail non è partita: copia il link e mandalo tu.");
      }
      setCreato({ id: j.id, numero: j.numero, token: j.token, inviato });
    } catch (e) {
      setErrore((e as Error).message);
    } finally {
      setInvio(false);
    }
  }

  const campo =
    "w-full border border-black/15 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900";

  /* ------------------------------------------------ fatto: il link pronto */
  if (creato) {
    const link = `${window.location.origin}/preventivo/${creato.token}`;
    return (
      <Card>
        <div className="mx-auto max-w-xl py-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
            <Check className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-neutral-900">{creato.numero} è pronto</h3>
          <p className="mt-1 text-sm text-neutral-500">
            {creato.inviato
              ? `Mandato a ${clienteEmail}. Quando firma e paga lo vedi qui sotto.`
              : "Manda il link al cliente, anche su WhatsApp: firma dal telefono e paga subito."}
          </p>
          <div className="mt-5 flex items-stretch">
            <input readOnly value={link} className={cx(campo, "min-w-0 flex-1 bg-[#f4f4f5] text-xs text-neutral-600")} onFocus={(e) => e.target.select()} />
            <Btn variant="ink" onClick={() => navigator.clipboard?.writeText(link)}>
              <Link2 className="h-3.5 w-3.5" />
              Copia
            </Btn>
          </div>
          {errore && <p className="mt-3 text-sm text-red-500">{errore}</p>}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <a
              href={`https://wa.me/${clienteTelefono.replace(/[^\d]/g, "")}?text=${encodeURIComponent(link)}`}
              target="_blank"
              rel="noopener"
              className={cx(
                "inline-flex items-center gap-1.5 bg-[#25D366] px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90",
                !clienteTelefono.replace(/[^\d]/g, "") && "pointer-events-none opacity-40"
              )}
            >
              Manda su WhatsApp
            </a>
            <a
              href={`/preventivo/${creato.token}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 border border-black/15 bg-white px-4 py-2 text-[13px] font-semibold text-neutral-700 hover:border-black/30"
            >
              Guarda come lo vede il cliente
            </a>
            <Btn variant="outline" onClick={onFatto}>Chiudi</Btn>
          </div>
        </div>
      </Card>
    );
  }

  /* ---------------------------------------------------------------- form */
  return (
    <Card title="Nuovo preventivo" subtitle="Il cliente lo firma dal telefono e paga subito la prima parte.">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-7">
          {/* 1. pacchetto */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-neutral-900">
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center bg-neutral-900 text-[11px] text-white">1</span>
              Cosa compra
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {PACCHETTI.map((p) => {
                const attivo = p.id === pacchetto;
                const tot = totaleVoce(p.subito) || totaleVoce(p.rate);
                const vr = voceListino(p.rate);
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPacchetto(p.id);
                      setPagamento(p.rate ? "rate" : "subito");
                    }}
                    className={cx(
                      "relative overflow-hidden border bg-white p-4 text-left transition-all",
                      attivo
                        ? "border-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                        : "border-black/10 hover:border-black/30"
                    )}
                  >
                    {attivo && <span className="absolute inset-y-0 left-0 w-1 bg-gold" />}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-neutral-900">{p.titolo}</span>
                      {p.consigliato && <Badge tone="brand">top</Badge>}
                    </div>
                    {p.id === "custom" ? (
                      <p className="mt-3 text-2xl font-bold text-neutral-300">—</p>
                    ) : (
                      <p className="mt-3 text-2xl font-bold tabular-nums text-neutral-900">
                        {vr && vr.mesi <= 1 && vr.periodicita === "mensile" ? (
                          <>
                            {eur(vr.prezzo)}
                            <span className="text-sm font-semibold text-neutral-400"> /mese</span>
                          </>
                        ) : (
                          eur(tot)
                        )}
                      </p>
                    )}
                    <p className="mt-1 text-[11px] text-neutral-500">
                      {vr && vr.mesi > 1
                        ? p.subito
                          ? `oppure ${eur(vr.prezzo)} al mese`
                          : `${vr.mesi} rate da ${eur(vr.prezzo)}`
                        : p.nota}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. come paga */}
          {!suMisura && (
            <div>
              <h3 className="mb-3 text-sm font-bold text-neutral-900">
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center bg-neutral-900 text-[11px] text-white">2</span>
                Come paga
              </h3>
              {haScelta ? (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {(["rate", "subito"] as const).map((m) => {
                    const v = voceListino(m === "rate" ? pac.rate : pac.subito)!;
                    const attivo = pagamento === m;
                    return (
                      <button
                        key={m}
                        onClick={() => setPagamento(m)}
                        className={cx(
                          "flex items-center gap-3 border bg-white p-3.5 text-left transition-all",
                          attivo ? "border-neutral-900" : "border-black/10 hover:border-black/30"
                        )}
                      >
                        <span className={cx("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2", attivo ? "border-gold" : "border-black/20")}>
                          {attivo && <span className="h-2 w-2 rounded-full bg-gold" />}
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-neutral-900">
                            {m === "rate" ? `${eur(v.prezzo)} al mese` : `${eur(v.prezzo)} subito`}
                          </span>
                          <span className="block text-[11px] text-neutral-500">
                            {m === "rate"
                              ? `${v.mesi} addebiti uguali, in automatico`
                              : "Un pagamento solo alla firma"}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="border border-black/10 bg-[#f4f4f5] px-3.5 py-3 text-sm text-neutral-600">
                  {mensile
                    ? doc.mesi > 1
                      ? `${eur(rata)} al mese per ${doc.mesi} mesi, addebito automatico.`
                      : `${eur(totale)} al mese, addebito automatico finché non disdice.`
                    : `${eur(totale)} in un pagamento solo alla firma.`}
                </p>
              )}
            </div>
          )}

          {/* su misura: voci a mano */}
          {suMisura && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-neutral-900">
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center bg-neutral-900 text-[11px] text-white">2</span>
                Voci e pagamento
              </h3>
              <label className="block">
                <span className="text-xs font-semibold text-neutral-600">Titolo del preventivo</span>
                <input value={oggetto} onChange={(e) => setOggetto(e.target.value)} placeholder="es. Coaching Hochzeit 4 Monate" className={campo} />
              </label>
              <div className="space-y-2">
                <div className="hidden gap-2 text-[11px] font-semibold text-neutral-400 sm:flex">
                  <span className="flex-1">Descrizione</span>
                  <span className="w-16">Quantità</span>
                  <span className="w-28">Prezzo €</span>
                  {items.length > 1 && <span className="w-8" />}
                </div>
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
                      min={1}
                      className={cx(campo, "w-16")}
                      aria-label="Quantità"
                    />
                    <input
                      value={v.prezzo || ""}
                      onChange={(e) => {
                        const c = [...items];
                        c[i] = { ...c[i], prezzo: Number(e.target.value) || 0 };
                        setItems(c);
                      }}
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      className={cx(campo, "w-28")}
                      aria-label="Prezzo"
                    />
                    {items.length > 1 && (
                      <button
                        onClick={() => setItems(items.filter((_, j) => j !== i))}
                        className="w-8 text-neutral-400 hover:text-red-500"
                        aria-label="Togli voce"
                      >
                        <X className="mx-auto h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <Btn size="sm" variant="outline" onClick={() => setItems([...items, { descrizione: "", prezzo: 0, quantita: 1 }])}>
                  <Plus className="h-3 w-3" />
                  Aggiungi voce
                </Btn>
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex border border-black/15">
                  {(["una tantum", "mensile"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setPeriodicita(v)}
                      className={cx("px-3.5 py-2 text-[13px] font-semibold", periodicita === v ? "bg-neutral-900 text-white" : "bg-white text-neutral-600")}
                    >
                      {v === "mensile" ? "A rate mensili" : "Una volta"}
                    </button>
                  ))}
                </div>
                {periodicita === "mensile" ? (
                  <label className="block w-28">
                    <span className="text-xs font-semibold text-neutral-600">Mesi</span>
                    <input value={mesi} onChange={(e) => setMesi(Math.max(1, Number(e.target.value) || 1))} type="number" min={1} className={campo} />
                  </label>
                ) : (
                  <label className="block w-36">
                    <span className="text-xs font-semibold text-neutral-600">Alla firma paga %</span>
                    <input value={accontoPerc} onChange={(e) => setAccontoPerc(Math.min(100, Math.max(0, Number(e.target.value) || 0)))} type="number" min={0} max={100} className={campo} />
                  </label>
                )}
              </div>
              {periodicita === "mensile" && (
                <p className="text-[11px] text-neutral-500">
                  Scrivi il prezzo di un mese e come quantità il numero di mesi: ogni mese si addebita la stessa cifra.
                </p>
              )}
            </div>
          )}

          {/* 3. cliente */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-neutral-900">
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center bg-neutral-900 text-[11px] text-white">3</span>
              Per chi
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold text-neutral-600">Nome e cognome</span>
                <input value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} placeholder="Max Mustermann" className={campo} autoComplete="off" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-neutral-600">Email</span>
                <input value={clienteEmail} onChange={(e) => setClienteEmail(e.target.value)} type="email" placeholder="per mandarlo per email" className={campo} autoComplete="off" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-neutral-600">Telefono</span>
                <input value={clienteTelefono} onChange={(e) => setClienteTelefono(e.target.value)} type="tel" placeholder="per mandarlo su WhatsApp" className={campo} autoComplete="off" />
              </label>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-neutral-600">Lingua del documento</span>
              <div className="flex border border-black/15">
                {(["de", "it"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLingua(l)}
                    className={cx("px-3 py-1.5 text-xs font-bold", lingua === l ? "bg-neutral-900 text-white" : "bg-white text-neutral-500")}
                  >
                    {l === "de" ? "Deutsch" : "Italiano"}
                  </button>
                ))}
              </div>
              <button onClick={() => setConNota((v) => !v)} className="ml-auto text-xs font-semibold text-neutral-500 underline-offset-2 hover:text-neutral-900 hover:underline">
                {conNota ? "Togli la nota" : "+ Nota personale per il cliente"}
              </button>
            </div>
            {conNota && (
              <textarea
                value={premesse}
                onChange={(e) => setPremesse(e.target.value)}
                rows={3}
                placeholder={lingua === "de" ? "Hallo Max, wie besprochen …" : "Ciao Max, come d'accordo …"}
                className={cx(campo, "mt-3")}
              />
            )}
          </div>
        </div>

        {/* riepilogo */}
        <aside className="lg:sticky lg:top-4 lg:self-start">
          <div className="border border-black/10 bg-[#f7f7f8] p-5">
            <p className="text-sm font-bold text-neutral-900">{doc.oggetto || "Preventivo"}</p>
            <p className="mt-0.5 text-[12px] text-neutral-500">{clienteNome.trim() || "Cliente da inserire"}</p>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-neutral-600">Paga alla firma</dt>
                <dd className="text-xl font-bold tabular-nums text-neutral-900">{eur(oggi)}</dd>
              </div>
              {mensile && doc.mesi > 1 && (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-neutral-600">Poi in automatico</dt>
                  <dd className="text-right font-semibold tabular-nums text-neutral-900">
                    {doc.mesi - 1} × {eur(rata)}
                  </dd>
                </div>
              )}
              {mensile && doc.mesi <= 1 && (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-neutral-600">Poi in automatico</dt>
                  <dd className="text-right font-semibold text-neutral-900">ogni mese</dd>
                </div>
              )}
              {!mensile && doc.accontoPerc < 100 && (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-neutral-600">Saldo dopo</dt>
                  <dd className="font-semibold tabular-nums text-neutral-900">{eur(totale - oggi)}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between gap-3 border-t border-black/10 pt-3">
                <dt className="font-semibold text-neutral-900">Totale contratto</dt>
                <dd className="font-bold tabular-nums text-neutral-900">{mensile && doc.mesi <= 1 ? `${eur(totale)}/mese` : eur(totale)}</dd>
              </div>
            </dl>

            <p className="mt-4 text-[11px] leading-relaxed text-neutral-500">
              Valido 14 giorni. Il contratto parte quando il cliente firma e il primo pagamento è arrivato.
            </p>

            {errore && <p className="mt-3 text-sm text-red-500">{errore}</p>}

            <div className="mt-5 space-y-2">
              <Btn variant="brand" className="w-full py-3" onClick={() => crea(true)} disabled={invio || !pronto || !emailOk}>
                <Send className="h-3.5 w-3.5" />
                {invio ? "Un attimo…" : "Crea e manda per email"}
              </Btn>
              <Btn variant="outline" className="w-full py-3" onClick={() => crea(false)} disabled={invio || !pronto}>
                <Link2 className="h-3.5 w-3.5" />
                Crea solo il link
              </Btn>
              {!emailOk && pronto && (
                <p className="text-center text-[11px] text-neutral-400">Senza email: crea il link e mandalo su WhatsApp.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </Card>
  );
}

