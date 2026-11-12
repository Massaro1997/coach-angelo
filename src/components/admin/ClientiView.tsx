"use client";

// Clienti: chi ha un contratto con Angelo. Per ognuno, a colpo d'occhio,
// quando e' partito, quando finisce, se i pagamenti sono in regola; aprendo
// la riga, dati personali, contratto firmato (con la firma) e rate.
// Dati da /api/admin/clienti: preventivi firmati + contratti del vecchio
// generatore /contratti.

import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  ChevronDown,
  Mail,
  Phone,
  MessageCircle,
  FileSignature,
  FileDown,
  Upload,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { Stat, Badge, Btn, EmptyState, cx } from "./ui";
import type { Cliente } from "@/app/api/admin/clienti/route";

const eur = (n: number) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
const giorno = (s: string | null) =>
  s ? new Date(s).toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";
const breve = (s: string | null) =>
  s ? new Date(s).toLocaleDateString("it-IT", { day: "numeric", month: "short" }) : "—";

type Filtro = "attivi" | "pagare" | "conclusi" | "tutti";

interface Stato {
  chiave: "attivo" | "ritardo" | "pagare" | "futuro" | "concluso";
  label: string;
  tone: string;
}

function statoDi(c: Cliente, ora: number): Stato {
  if (c.inAttesa) return { chiave: "pagare", label: "firmato, non pagato", tone: "amber" };
  if (c.fine && new Date(c.fine).getTime() < ora) return { chiave: "concluso", label: "concluso", tone: "neutral" };
  const ritardo = c.rate.some(
    (r) => r.stato !== "pagato" && r.scadenza && new Date(r.scadenza).getTime() < ora - 3 * 86400000
  );
  if (ritardo) return { chiave: "ritardo", label: "pagamento in ritardo", tone: "red" };
  if (c.inizio && new Date(c.inizio).getTime() > ora) return { chiave: "futuro", label: `parte il ${breve(c.inizio)}`, tone: "blue" };
  return { chiave: "attivo", label: "attivo", tone: "green" };
}

/** Prossimo addebito: la prima rata non pagata, oppure (canone aperto) il prossimo mese. */
function prossimo(c: Cliente, ora: number): { quando: string; importo: number } | null {
  const r = c.rate.find((x) => x.stato !== "pagato" && x.scadenza);
  if (r) return { quando: r.scadenza!, importo: r.importo };
  if (c.fonte === "preventivo" && c.mensile && !c.fine && c.inizio && c.rate.length) {
    const d = new Date(c.inizio);
    while (d.getTime() < ora) d.setMonth(d.getMonth() + 1);
    return { quando: d.toISOString(), importo: c.rate[c.rate.length - 1].importo };
  }
  return null;
}

export default function ClientiView() {
  const [lista, setLista] = useState<Cliente[]>([]);
  const [caricando, setCaricando] = useState(true);
  const [errore, setErrore] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("attivi");
  const [cerca, setCerca] = useState("");
  const [aperto, setAperto] = useState<string | null>(null);
  const [ora] = useState(() => Date.now());

  const carica = () =>
    fetch("/api/admin/clienti")
      .then(async (r) => {
        if (!r.ok) throw new Error("Non riesco a caricare i clienti");
        setLista(await r.json());
      })
      .catch((e) => setErrore(e.message))
      .finally(() => setCaricando(false));

  useEffect(() => {
    carica();
  }, []);

  const conStato = useMemo(() => lista.map((c) => ({ c, s: statoDi(c, ora) })), [lista, ora]);

  const visibili = conStato.filter(({ c, s }) => {
    if (filtro === "attivi" && !["attivo", "ritardo", "futuro"].includes(s.chiave)) return false;
    if (filtro === "pagare" && !["pagare", "ritardo"].includes(s.chiave)) return false;
    if (filtro === "conclusi" && s.chiave !== "concluso") return false;
    const q = cerca.trim().toLowerCase();
    if (q && ![c.nome, c.email, c.telefono, c.pacchetto, c.numero].some((v) => v?.toLowerCase().includes(q))) return false;
    return true;
  });

  const attivi = conStato.filter(({ s }) => ["attivo", "ritardo", "futuro"].includes(s.chiave)).length;
  const daSistemare = conStato.filter(({ s }) => ["pagare", "ritardo"].includes(s.chiave)).length;
  const fra30 = ora + 30 * 86400000;
  const inArrivo = conStato.reduce((tot, { c }) => {
    const p = prossimo(c, ora);
    return p && new Date(p.quando).getTime() <= fra30 ? tot + p.importo : tot;
  }, 0);
  const inScadenza = conStato.filter(
    ({ c, s }) => s.chiave !== "concluso" && c.fine && new Date(c.fine).getTime() <= fra30
  ).length;

  // Fatturato = quanto vale ogni contratto firmato, per intero (regola di
  // Calogero: un contratto vale quello che c'e' scritto sopra). Un canone
  // senza fine pesa per quanto incassato finora.
  const fatt = conStato.reduce(
    (t, { c }) =>
      c.inAttesa
        ? t
        : {
            valore: t.valore + (c.mensile && !c.fine ? c.incassato ?? 0 : c.totale),
            incassato: t.incassato + (c.incassato ?? 0),
          },
    { valore: 0, incassato: 0 }
  );

  if (caricando) return <p className="py-10 text-[13px] text-crm-spento">Carico i clienti…</p>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-5">
        <Stat label="Fatturato contratti" value={eur(fatt.valore)} sub={`incassati ${eur(fatt.incassato)}, da incassare ${eur(Math.max(0, fatt.valore - fatt.incassato))}`} tone="ink" />
        <Stat label="Clienti attivi" value={attivi} tone="green" />
        <Stat label="Da sistemare" value={daSistemare} sub="non pagato o in ritardo" tone={daSistemare ? "red" : "ink"} onClick={() => setFiltro("pagare")} />
        <Stat label="In arrivo 30 giorni" value={eur(inArrivo)} sub="rate in scadenza" tone="brand" />
        <Stat label="Finiscono entro 30 giorni" value={inScadenza} sub="da sentire per il rinnovo" tone="amber" />
      </div>

      {errore && <p className="rounded-xl bg-[#fee9e8] px-4 py-3 text-[13px] text-[#8e0b21]">{errore}</p>}

      {/* l'elenco di Shopify: linguette e ricerca in testa, righe sotto */}
      <section className="crm-card p-2">
        <div className="flex flex-wrap items-center gap-2 px-1 pb-2">
          <div className="flex flex-wrap gap-1">
            {([
              ["attivi", "Attivi"],
              ["pagare", "Da sistemare"],
              ["conclusi", "Conclusi"],
              ["tutti", "Tutti"],
            ] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFiltro(k)}
                data-attiva={filtro === k}
                className="crm-linguetta transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
          <label className="relative ml-auto w-full sm:w-72">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-crm-spento" />
            <input
              value={cerca}
              onChange={(e) => setCerca(e.target.value)}
              placeholder="Cerca nome, email, telefono…"
              className="crm-campo pl-8"
            />
          </label>
        </div>

        {visibili.length === 0 ? (
          <EmptyState
            titolo={lista.length ? "Nessun cliente con questo filtro." : "Ancora nessun cliente."}
            testo={lista.length ? "Prova con Tutti." : "Quando un cliente firma un contratto e paga, compare qui."}
            icon={<Users className="h-8 w-8" />}
          />
        ) : (
          <div>
            {/* intestazione colonne, solo su schermo largo: la testata grigia di Shopify */}
            <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,1fr)_150px_24px] gap-4 rounded-lg bg-crm-fondo px-3 py-1.5 text-[12px] font-[550] text-[#4a4a4a] lg:grid">
              <span>Cliente</span>
              <span>Periodo</span>
              <span>Pagamenti</span>
              <span>Stato</span>
              <span />
            </div>
            <div className="border-t border-crm-filo lg:border-t-0">
              {visibili.map(({ c, s }) => (
                <RigaCliente
                  key={c.id}
                  c={c}
                  s={s}
                  ora={ora}
                  aperto={aperto === c.id}
                  onApri={() => setAperto(aperto === c.id ? null : c.id)}
                  onCambiato={carica}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ riga */

function RigaCliente({
  c,
  s,
  ora,
  aperto,
  onApri,
  onCambiato,
}: {
  c: Cliente;
  s: Stato;
  ora: number;
  aperto: boolean;
  onApri: () => void;
  onCambiato: () => void;
}) {
  const inizio = c.inizio ? new Date(c.inizio).getTime() : null;
  const fine = c.fine ? new Date(c.fine).getTime() : null;
  const avanzamento = inizio && fine ? Math.min(1, Math.max(0, (ora - inizio) / (fine - inizio))) : 0;
  const pagate = c.rate.filter((r) => r.stato === "pagato").length;
  const p = prossimo(c, ora);

  return (
    <div
      className={cx(
        "border-b last:border-b-0",
        aperto ? "rounded-xl border-transparent bg-crm-fondo" : "border-crm-filo"
      )}
    >
      <button
        onClick={onApri}
        className={cx(
          "grid w-full grid-cols-1 gap-3 px-3 py-3 text-left transition-colors lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,1fr)_150px_24px] lg:items-center lg:gap-4",
          aperto ? "rounded-xl" : "hover:bg-crm-fondo"
        )}
      >
        <div className="min-w-0">
          <p className="truncate text-[13px] font-[650] text-crm-ink">{c.nome}</p>
          <p className="truncate text-[12px] text-crm-tenue">
            {c.pacchetto}
            {c.lead && <span className="text-crm-spento"> · lead da {c.lead.canale}</span>}
          </p>
        </div>

        <div>
          {inizio ? (
            <>
              <div className="flex justify-between text-[12px] text-crm-tenue">
                <span>{breve(c.inizio)}</span>
                <span>{c.fine ? breve(c.fine) : "senza fine"}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                <div className={cx("h-full rounded-full", s.chiave === "concluso" ? "bg-crm-spento" : "bg-[#303030]")} style={{ width: `${(c.fine ? avanzamento : 1) * 100}%` }} />
              </div>
            </>
          ) : (
            <p className="text-[12px] text-crm-spento">parte al primo pagamento</p>
          )}
        </div>

        <div className="min-w-0">
          {c.rate.length ? (
            <>
              <div className="flex flex-wrap gap-1">
                {c.rate.map((r) => {
                  const scaduta = r.stato !== "pagato" && r.scadenza && new Date(r.scadenza).getTime() < ora - 3 * 86400000;
                  return (
                    <span
                      key={r.id}
                      title={`${r.numero ? `Rata ${r.numero}: ` : ""}${eur(r.importo)}${r.stato === "pagato" ? `, pagata il ${giorno(r.pagatoAt)}` : r.scadenza ? `, scade il ${giorno(r.scadenza)}` : ""}`}
                      className={cx(
                        "h-2.5 w-2.5 rounded-[3px]",
                        r.stato === "pagato"
                          ? "bg-crm-verde"
                          : scaduta
                            ? "bg-crm-rosso"
                            : "bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.22)]"
                      )}
                    />
                  );
                })}
              </div>
              <p className="mt-1 text-[12px] text-crm-tenue">
                {pagate}/{c.rate.length} pagate{p ? ` · prossima ${breve(p.quando)}` : ""}
              </p>
            </>
          ) : (
            <p className="text-[12px] text-crm-spento">{c.fonte === "contratto" ? "fuori dal sistema" : "—"}</p>
          )}
        </div>

        <div>
          <Badge tone={s.tone}>{s.label}</Badge>
        </div>

        <ChevronDown className={cx("hidden h-4 w-4 text-crm-spento transition-transform lg:block", aperto && "rotate-180")} />
      </button>

      {aperto && <Dettaglio c={c} onCambiato={onCambiato} />}
    </div>
  );
}

/* -------------------------------------------------------------- dettaglio */

function Dettaglio({ c, onCambiato }: { c: Cliente; onCambiato: () => void }) {
  const [firma, setFirma] = useState<string | null>(null);
  const [modifica, setModifica] = useState(false);
  const [dati, setDati] = useState({
    clienteEmail: c.email || "",
    clienteTelefono: c.telefono || "",
    clienteIndirizzo: c.indirizzo || "",
    clientePiva: c.piva || "",
  });
  const [note, setNote] = useState(c.note || "");
  const [salvo, setSalvo] = useState(false);
  const [msg, setMsg] = useState("");
  const [carico, setCarico] = useState(false);

  async function segnaPagata(id: string) {
    if (!confirm("Segno questa rata come pagata (bonifico)?")) return;
    setSalvo(true);
    const r = await fetch(`/api/admin/pagamenti/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ azione: "pagato", metodo: "bonifico" }),
    });
    setSalvo(false);
    if (r.ok) onCambiato();
    else setMsg((await r.json().catch(() => ({}))).error || "Non salvato, riprova.");
  }

  async function caricaPdf(file?: File) {
    if (!file) return;
    setCarico(true);
    setMsg("");
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch(`/api/admin/documenti/${c.rifId}/pdf`, { method: "POST", body: fd });
    setCarico(false);
    if (r.ok) onCambiato();
    else setMsg((await r.json().catch(() => ({}))).error || "PDF non caricato.");
  }

  useEffect(() => {
    if (c.fonte !== "preventivo") return;
    fetch(`/api/admin/preventivi/${c.rifId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setFirma(j?.firma || null))
      .catch(() => {});
  }, [c.fonte, c.rifId]);

  async function salva(body: Record<string, string>) {
    setSalvo(true);
    setMsg("");
    const r = await fetch(`/api/admin/preventivi/${c.rifId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSalvo(false);
    if (!r.ok) {
      setMsg("Non salvato, riprova.");
      return false;
    }
    setMsg("Salvato.");
    onCambiato();
    return true;
  }

  function riapri() {
    sessionStorage.setItem("contrattiReopen", JSON.stringify({ type: "contract", ...c.snapshot }));
    window.location.href = "/contratti";
  }

  const tel = (c.telefono || "").replace(/[^\d+]/g, "");
  const campo = "crm-campo";
  const modificabile = c.fonte === "preventivo";

  const l = c.lead;
  const giorniAlContratto =
    l && (c.firmatoAt || c.inizio)
      ? Math.max(0, Math.round((new Date(c.firmatoAt || c.inizio!).getTime() - new Date(l.data).getTime()) / 86400000))
      : null;

  return (
    <div className="space-y-4 border-t border-crm-filo px-3 pb-5 pt-4">
      {/* da dove arriva: il contatto lasciato sul sito */}
      <div className="flex flex-wrap items-start gap-x-6 gap-y-3 rounded-xl bg-white p-4 shadow-crm-anello">
        {l ? (
          <>
            <div className="min-w-[220px]">
              <p className="text-[13px] font-[650] text-crm-ink">
                Lead del {giorno(l.data)} da {l.canale}
              </p>
              <p className="mt-0.5 text-[12px] text-crm-tenue">
                {l.pagina ? `Ha scritto dalla pagina ${l.pagina === "/" ? "principale" : l.pagina}` : "Modulo del sito"}
                {giorniAlContratto != null && `, contratto dopo ${giorniAlContratto} ${giorniAlContratto === 1 ? "giorno" : "giorni"}`}
              </p>
            </div>
            {l.risposte.length > 0 && (
              <dl className="flex flex-wrap gap-1.5">
                {l.risposte.map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-crm-fondo px-2 py-1 text-[12px]">
                    <dt className="inline text-crm-tenue">{k}: </dt>
                    <dd className="inline font-[550] text-crm-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {l.nota && (
              <p className="w-full border-l-2 border-crm-bordo pl-3 text-[13px] italic leading-relaxed text-crm-testo">
                “{l.nota}”
              </p>
            )}
          </>
        ) : (
          <p className="text-[12px] text-crm-tenue">
            Nessun lead del sito con la stessa email o lo stesso telefono: arrivato per passaparola, social o di persona.
          </p>
        )}
      </div>

    <div className="grid gap-6 pt-1 lg:grid-cols-3">
      {/* dati personali */}
      <section className="min-w-0">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-[13px] font-[650] text-crm-ink">Dati personali</h4>
          {modificabile && !modifica && (
            <button onClick={() => setModifica(true)} className="crm-btn-piatto -my-1">
              <Pencil className="h-3 w-3" /> Modifica
            </button>
          )}
        </div>
        {modifica ? (
          <div className="space-y-3">
            {([
              ["clienteEmail", "Email"],
              ["clienteTelefono", "Telefono"],
              ["clienteIndirizzo", "Indirizzo"],
              ["clientePiva", "Steuernummer / P. IVA"],
            ] as const).map(([k, l]) => (
              <label key={k} className="block">
                <span className="crm-etichetta">{l}</span>
                <input value={dati[k]} onChange={(e) => setDati({ ...dati, [k]: e.target.value })} className={campo} />
              </label>
            ))}
            <div className="flex gap-2 pt-1">
              <Btn size="sm" variant="ink" disabled={salvo} onClick={async () => (await salva(dati)) && setModifica(false)}>
                <Check className="h-3 w-3" /> Salva
              </Btn>
              <Btn size="sm" variant="ghost" onClick={() => setModifica(false)}>
                <X className="h-3 w-3" /> Annulla
              </Btn>
            </div>
          </div>
        ) : (
          <dl className="space-y-2 text-[13px]">
            <Riga label="Nome">{c.nome}</Riga>
            <Riga label="Email">{c.email ? <a href={`mailto:${c.email}`} className="text-crm-blu underline-offset-2 hover:underline">{c.email}</a> : "—"}</Riga>
            <Riga label="Telefono">{c.telefono || "—"}</Riga>
            <Riga label="Indirizzo">{c.indirizzo || "—"}</Riga>
            {c.nascita && <Riga label="Nato il">{giorno(c.nascita)}</Riga>}
            {c.piva && <Riga label="Steuernr.">{c.piva}</Riga>}
          </dl>
        )}
        {!modifica && (c.email || tel) && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tel && (
              <a href={`https://wa.me/${tel.replace("+", "")}`} target="_blank" rel="noopener" className="crm-btn">
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp
              </a>
            )}
            {tel && (
              <a href={`tel:${tel}`} className="crm-btn">
                <Phone className="h-3.5 w-3.5" /> Chiama
              </a>
            )}
            {c.email && (
              <a href={`mailto:${c.email}`} className="crm-btn">
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
            )}
          </div>
        )}
      </section>

      {/* contratto */}
      <section className="min-w-0">
        <h4 className="mb-3 text-[13px] font-[650] text-crm-ink">Contratto</h4>
        <dl className="space-y-2 text-[13px]">
          <Riga label="Pacchetto">{c.pacchetto}</Riga>
          <Riga label="Valore">{c.mensile && !c.fine ? `${eur(c.totale)} al mese` : eur(c.totale)}</Riga>
          <Riga label="Periodo">
            {giorno(c.inizio)} → {c.fine ? giorno(c.fine) : "fino a disdetta"}
          </Riga>
          {c.firmatoAt && (
            <Riga label="Firmato">
              {giorno(c.firmatoAt)}
              {c.firmatoNome ? `, da ${c.firmatoNome}` : ""}
            </Riga>
          )}
          {c.numero && <Riga label="Numero">{c.numero}</Riga>}
        </dl>
        {firma && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={firma} alt={`Firma di ${c.nome}`} className="mt-3 h-16 w-auto rounded-lg bg-white object-contain p-1 shadow-crm-anello" />
        )}
        <div className="mt-4">
          {c.token ? (
            <a href={`/preventivo/${c.token}`} target="_blank" rel="noopener" className="crm-btn-primario">
              <FileSignature className="h-3.5 w-3.5" /> Apri il contratto firmato
            </a>
          ) : c.snapshot ? (
            <button onClick={riapri} className="crm-btn-primario">
              <FileSignature className="h-3.5 w-3.5" /> Apri il contratto
            </button>
          ) : null}
          {c.fonte === "contratto" && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {c.pdfNome && (
                <a
                  href={`/api/admin/documenti/${c.rifId}/pdf`}
                  target="_blank"
                  rel="noopener"
                  className="crm-btn"
                >
                  <FileDown className="h-3.5 w-3.5" /> PDF firmato
                </a>
              )}
              <label className="crm-btn-piatto cursor-pointer">
                <Upload className="h-3.5 w-3.5" />
                {carico ? "Carico…" : c.pdfNome ? "Sostituisci PDF" : "Carica il PDF firmato"}
                <input type="file" accept="application/pdf" className="hidden" disabled={carico} onChange={(e) => caricaPdf(e.target.files?.[0])} />
              </label>
            </div>
          )}
          {c.fonte === "contratto" && (
            <p className="mt-2 text-[12px] leading-snug text-crm-tenue">
              Contratto del vecchio generatore, firmato su carta.
              {c.pdfNome ? ` Copia salvata: ${c.pdfNome}.` : ""}
            </p>
          )}
        </div>
      </section>

      {/* pagamenti e note */}
      <section className="min-w-0">
        <h4 className="mb-3 text-[13px] font-[650] text-crm-ink">Pagamenti</h4>
        {c.rate.length ? (
          <ul className="divide-y divide-crm-filo overflow-hidden rounded-xl bg-white text-[13px] shadow-crm-anello">
            {c.rate.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-nowrap px-3 py-2">
                <span className={cx("h-2 w-2 shrink-0 rounded-full", r.stato === "pagato" ? "bg-crm-verde" : "bg-black/20")} />
                <span className="text-crm-testo">{r.numero ? `Mese ${r.numero}` : "Rata"}</span>
                <span className="ml-auto tabular-nums font-[550] text-crm-ink">{eur(r.importo)}</span>
                <span className="text-right text-[12px] text-crm-tenue">
                  {r.stato === "pagato" ? `pagata ${breve(r.pagatoAt)}` : r.scadenza ? `il ${breve(r.scadenza)}` : r.stato}
                </span>
                {r.stato !== "pagato" && (
                  <button
                    onClick={() => segnaPagata(r.id)}
                    disabled={salvo}
                    title="Pagata con bonifico o in contanti"
                    className="crm-btn min-h-6 shrink-0 px-2 py-0.5"
                  >
                    Segna pagata
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl bg-white p-3 text-[12px] leading-relaxed text-crm-tenue shadow-crm-anello">
            {c.fonte === "contratto"
              ? "Pagato con bonifico o PayPal fuori da questo sistema: controlla sul conto."
              : "Ancora nessuna rata."}
          </p>
        )}
        {c.incassato != null && c.incassato > 0 && (
          <p className="mt-2 text-[12px] text-crm-tenue">
            Incassati finora <span className="font-[550] text-crm-verde">{eur(c.incassato)}</span>
          </p>
        )}

        <h4 className="mb-2 mt-5 text-[13px] font-[650] text-crm-ink">Note</h4>
        {modificabile ? (
          <>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Obiettivo, infortuni, orari che preferisce…"
              className={campo}
            />
            <div className="mt-2 flex items-center gap-2">
              <Btn size="sm" variant="outline" disabled={salvo || note === (c.note || "")} onClick={() => salva({ lavoroNote: note })}>
                Salva nota
              </Btn>
              {msg && <span className="text-[12px] text-crm-tenue">{msg}</span>}
            </div>
          </>
        ) : (
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-crm-testo">{c.note || "—"}</p>
        )}
      </section>
    </div>
    </div>
  );
}

function Riga({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[90px_minmax(0,1fr)] gap-2">
      <dt className="text-crm-tenue">{label}</dt>
      <dd className="min-w-0 break-words text-crm-ink">{children}</dd>
    </div>
  );
}
