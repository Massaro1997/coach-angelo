"use client";

// Lead: le richieste arrivate dal sito, da lavorare una per una. Per ognuna
// si segna a che punto e' (nuovo, contattato, appuntamento, cliente, perso),
// se e' un buon contatto e perche' e' andato perso, con gli appunti.
// Un lead che ha gia' un contratto (stessa email o telefono, vedi Clienti)
// risulta cliente da solo.

import { useEffect, useMemo, useState } from "react";
import { Mail, Phone, Inbox, MessageCircle, Search, ChevronDown, FileSignature } from "lucide-react";
import { Badge, Btn, EmptyState, Stat, cx } from "./ui";
import type { BozzaContratto } from "./PreventiviView";

export interface Contatto {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  createdAt: string;
  read: boolean;
  referrer: string | null;
  landingPage: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  stato: string;
  qualita: string | null;
  motivo: string | null;
  note: string | null;
  contattatoAt: string | null;
  aggiornatoAt: string | null;
}

type Stato = "nuovo" | "contattato" | "appuntamento" | "cliente" | "perso";

const STATI: { k: Stato; label: string; tone: string; pallino: string }[] = [
  { k: "nuovo", label: "Nuovo", tone: "red", pallino: "bg-crm-rosso" },
  { k: "contattato", label: "Contattato", tone: "blue", pallino: "bg-crm-blu" },
  { k: "appuntamento", label: "Appuntamento", tone: "amber", pallino: "bg-amber-500" },
  { k: "cliente", label: "Cliente", tone: "green", pallino: "bg-crm-verde" },
  { k: "perso", label: "Perso", tone: "neutral", pallino: "bg-crm-spento" },
];

// la scelta attiva prende i colori dei badge di Polaris
const QUALITA = [
  { k: "buono", label: "Buono", attivo: "bg-crm-ok text-crm-ok-ink" },
  { k: "medio", label: "Così così", attivo: "bg-crm-attesa text-crm-attesa-ink" },
  { k: "scarso", label: "Scarso", attivo: "bg-[#303030] text-white" },
  { k: "spam", label: "Spam", attivo: "bg-crm-errore text-crm-errore-ink" },
];

// i tastini a scelta (motivo, qualita'): bianchi con anello, pieni se scelti
const CHIP = "rounded-lg px-2.5 py-1 text-[12px] font-[550] transition-colors";
const CHIP_SPENTO = "bg-white text-crm-testo shadow-crm-anello hover:bg-crm-fondo-2";

const MOTIVI = ["Prezzo", "Non risponde", "Non interessato", "Troppo lontano", "Ha scelto un altro", "Solo curiosità"];

/** Da dove arriva il contatto, in una parola. */
function canale(c: Contatto): { label: string; tone: string } {
  if (c.utmSource)
    return { label: `${c.utmSource}${c.utmMedium ? ` / ${c.utmMedium}` : ""}`, tone: "violet" };
  if (!c.referrer) return { label: "Diretto", tone: "neutral" };
  try {
    const h = new URL(c.referrer).hostname.replace(/^www\./, "");
    if (h.includes("angelocoach.com") || h.includes("fitprimo.de")) return { label: "Diretto", tone: "neutral" };
    if (h.includes("google")) return { label: "Google", tone: "blue" };
    if (h.includes("chatgpt") || h.includes("openai")) return { label: "ChatGPT", tone: "green" };
    if (h.includes("instagram")) return { label: "Instagram", tone: "brand" };
    if (h.includes("tiktok")) return { label: "TikTok", tone: "ink" };
    if (h.includes("facebook")) return { label: "Facebook", tone: "blue" };
    return { label: h, tone: "neutral" };
  } catch {
    return { label: "Sconosciuto", tone: "neutral" };
  }
}

const dataOra = (s: string) =>
  new Date(s).toLocaleString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

/** Le risposte del questionario ("Obiettivo: Abnehmen") e la nota scritta a mano. */
function leggiMessaggio(m: string): { risposte: [string, string][]; nota: string | null } {
  const [corpo, coda = ""] = m.split(/\r?\n-{3,}\r?\n/);
  const risposte: [string, string][] = [];
  for (const riga of corpo.split(/\r?\n/)) {
    const r = riga.match(/^([^:[]{2,40}):\s*(.+)$/);
    if (r) risposte.push([r[1].trim(), r[2].trim()]);
  }
  const nota = coda.replace(/^Note:\s*/i, "").trim() || (risposte.length ? null : m.trim());
  return { risposte, nota };
}

/** Dal lead al modulo del contratto: chi e', in che lingua ha compilato, cosa ha scelto nel wizard. */
function bozzaDaLead(c: Contatto): BozzaContratto {
  const pacchetto =
    c.service === "personal-training" ? "ore" : c.service === "trainingsplan" ? "plan" : "c6";
  return {
    nome: c.name.trim(),
    email: c.email.trim(),
    telefono: (c.phone || "").trim(),
    lingua: /Wizard IT\]/.test(c.message) ? "it" : "de",
    pacchetto,
  };
}

export default function LeadView({ onCreaContratto }: { onCreaContratto?: (b: BozzaContratto) => void } = {}) {
  const [contatti, setContatti] = useState<Contatto[]>([]);
  const [clientiLead, setClientiLead] = useState<Set<string>>(new Set());
  const [caricando, setCaricando] = useState(true);
  const [filtro, setFiltro] = useState<Stato | "aperti" | "tutti">("aperti");
  const [cerca, setCerca] = useState("");
  const [aperto, setAperto] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/contact").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/admin/clienti").then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([c, cl]: [Contatto[], { lead: { id: string } | null }[]]) => {
        setContatti(c);
        setClientiLead(new Set(cl.map((x) => x.lead?.id).filter(Boolean) as string[]));
      })
      .finally(() => setCaricando(false));
  }, []);

  // chi ha gia' un contratto e' cliente, qualunque cosa ci sia scritto
  const statoDi = (c: Contatto): Stato => (clientiLead.has(c.id) ? "cliente" : (c.stato as Stato) || "nuovo");

  const conteggi = useMemo(() => {
    const n: Record<string, number> = {};
    for (const c of contatti) n[statoDi(c)] = (n[statoDi(c)] || 0) + 1;
    return n;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contatti, clientiLead]);

  async function salva(id: string, patch: Partial<Contatto>) {
    setContatti((l) => l.map((c) => (c.id === id ? { ...c, ...patch, read: true } : c)));
    const r = await fetch(`/api/admin/lead/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (r.ok) {
      const agg = await r.json();
      setContatti((l) => l.map((c) => (c.id === id ? { ...c, ...agg } : c)));
    }
  }

  if (caricando) return <p className="py-10 text-[13px] text-crm-spento">Carico i lead…</p>;

  const q = cerca.trim().toLowerCase();
  const mostrati = contatti.filter((c) => {
    const s = statoDi(c);
    if (filtro === "aperti" && !["nuovo", "contattato", "appuntamento"].includes(s)) return false;
    if (filtro !== "aperti" && filtro !== "tutti" && s !== filtro) return false;
    if (q && ![c.name, c.email, c.phone, c.message].some((v) => v?.toLowerCase().includes(q))) return false;
    return true;
  });

  const totale = contatti.length;
  const clienti = conteggi.cliente || 0;
  const buoni = contatti.filter((c) => c.qualita === "buono" || statoDi(c) === "cliente").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat label="Da chiamare" value={conteggi.nuovo || 0} sub="nuovi, nessuno li ha ancora sentiti" tone={conteggi.nuovo ? "red" : "green"} onClick={() => setFiltro("nuovo")} />
        <Stat label="In corso" value={(conteggi.contattato || 0) + (conteggi.appuntamento || 0)} sub="contattati o con appuntamento" tone="blue" onClick={() => setFiltro("aperti")} />
        <Stat label="Diventati clienti" value={clienti} sub={totale ? `${Math.round((clienti / totale) * 100)}% dei lead` : "—"} tone="green" onClick={() => setFiltro("cliente")} />
        <Stat label="Contatti buoni" value={buoni} sub={`su ${totale} arrivati`} tone="ink" />
      </div>

      {/* l'elenco di Shopify: linguette e ricerca in testa, righe sotto */}
      <section className="crm-card p-2">
        <div className="flex flex-wrap items-center gap-2 px-1 pb-2">
          <div className="flex flex-wrap gap-1">
            {([
              ["aperti", "Da lavorare", (conteggi.nuovo || 0) + (conteggi.contattato || 0) + (conteggi.appuntamento || 0)],
              ...STATI.map((s) => [s.k, s.label, conteggi[s.k] || 0] as const),
              ["tutti", "Tutti", totale],
            ] as const).map(([k, l, n]) => (
              <button
                key={k}
                onClick={() => setFiltro(k as typeof filtro)}
                data-attiva={filtro === k}
                className="crm-linguetta inline-flex items-center gap-1.5 transition-colors"
              >
                {l} <span className="text-[12px] font-medium tabular-nums text-crm-spento">{n}</span>
              </button>
            ))}
          </div>
          <label className="relative ml-auto w-full sm:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-crm-spento" />
            <input
              value={cerca}
              onChange={(e) => setCerca(e.target.value)}
              placeholder="Cerca nome, email, telefono…"
              className="crm-campo pl-8"
            />
          </label>
        </div>

        {mostrati.length === 0 ? (
          <EmptyState
            titolo={totale ? "Nessun lead in questo gruppo." : "Nessun lead ricevuto."}
            testo={filtro === "nuovo" ? "Tutti i lead sono stati sentiti." : undefined}
            icon={<Inbox className="h-8 w-8" />}
          />
        ) : (
        <div className="border-t border-crm-filo">
          {mostrati.map((c) => (
            <RigaLead
              key={c.id}
              c={c}
              stato={statoDi(c)}
              daContratto={clientiLead.has(c.id)}
              aperto={aperto === c.id}
              onApri={() => setAperto(aperto === c.id ? null : c.id)}
              salva={(p) => salva(c.id, p)}
              onCreaContratto={onCreaContratto && (() => onCreaContratto(bozzaDaLead(c)))}
            />
          ))}
        </div>
        )}
      </section>
    </div>
  );
}

function RigaLead({
  c,
  stato,
  daContratto,
  aperto,
  onApri,
  salva,
  onCreaContratto,
}: {
  c: Contatto;
  stato: Stato;
  daContratto: boolean;
  aperto: boolean;
  onApri: () => void;
  salva: (p: Partial<Contatto>) => void;
  onCreaContratto?: () => void;
}) {
  const ch = canale(c);
  const st = STATI.find((s) => s.k === stato)!;
  const { risposte, nota } = leggiMessaggio(c.message);
  const obiettivo = risposte.find(([k]) => /obiettivo|ziel/i.test(k))?.[1];
  const [note, setNote] = useState(c.note || "");
  const tel = (c.phone || "").replace(/[^\d+]/g, "").replace(/^00/, "+");

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
          "flex w-full flex-wrap items-center gap-x-4 gap-y-2 px-3 py-3 text-left transition-colors",
          aperto ? "rounded-xl" : "hover:bg-crm-fondo"
        )}
      >
        <span className={cx("h-2.5 w-2.5 shrink-0 rounded-full", st.pallino)} title={st.label} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-[650] text-crm-ink">
            {c.name.trim()}
            {!c.read && stato === "nuovo" && <span className="ml-2 align-middle text-[12px] font-[550] text-crm-rosso">da leggere</span>}
          </span>
          <span className="block truncate text-[12px] text-crm-tenue">
            {[obiettivo, c.service].filter(Boolean).join(" · ") || c.email}
          </span>
        </span>
        <Badge tone={ch.tone}>{ch.label}</Badge>
        {c.qualita && <Badge tone={c.qualita === "buono" ? "green" : c.qualita === "spam" ? "red" : "outline"}>{QUALITA.find((x) => x.k === c.qualita)?.label}</Badge>}
        <Badge tone={st.tone}>{st.label}</Badge>
        <span className="w-24 text-right text-[12px] tabular-nums text-crm-spento sm:w-28">{dataOra(c.createdAt).split(",")[0]}</span>
        <ChevronDown className={cx("h-4 w-4 text-crm-spento transition-transform", aperto && "rotate-180")} />
      </button>

      {aperto && (
        <div className="grid gap-6 border-t border-crm-filo px-3 pb-5 pt-4 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* cosa ha scritto */}
          <div className="min-w-0">
            <div className="flex flex-wrap gap-1.5">
              {tel && (
                <a href={`https://wa.me/${tel.replace("+", "")}`} target="_blank" rel="noopener" className="crm-btn">
                  <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp
                </a>
              )}
              {tel && (
                <a href={`tel:${tel}`} className="crm-btn">
                  <Phone className="h-3.5 w-3.5" /> {c.phone}
                </a>
              )}
              <a href={`mailto:${c.email}`} className="crm-btn max-w-full">
                <Mail className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{c.email}</span>
              </a>
            </div>

            {risposte.length > 0 && (
              <dl className="mt-4 flex flex-wrap gap-1.5">
                {risposte.map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-white px-2 py-1 text-[12px] shadow-crm-anello">
                    <dt className="inline text-crm-tenue">{k}: </dt>
                    <dd className="inline font-[550] text-crm-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {nota && (
              <p className="mt-3 whitespace-pre-wrap border-l-2 border-crm-bordo pl-3 text-[13px] leading-relaxed text-crm-testo">{nota}</p>
            )}
            <p className="mt-4 text-[12px] text-crm-spento">
              Arrivato il {dataOra(c.createdAt)} da {ch.label}
              {c.landingPage ? `, pagina ${c.landingPage.split("?")[0]}` : ""}
              {c.contattatoAt ? ` · sentito la prima volta il ${dataOra(c.contattatoAt).split(",")[0]}` : ""}
            </p>
          </div>

          {/* lavorazione */}
          <div className="space-y-4">
            {onCreaContratto && (
              <div>
                <Btn variant="ink" className="w-full" onClick={onCreaContratto}>
                  <FileSignature className="h-4 w-4" />
                  Crea contratto
                </Btn>
                <p className="mt-1.5 text-[12px] leading-4 text-crm-tenue">
                  Nome, email e telefono sono già dentro: scegli il pacchetto e mandalo da firmare e pagare.
                </p>
              </div>
            )}
            <div>
              <p className="crm-etichetta">A che punto è</p>
              <div className="grid grid-cols-3 gap-0.5 rounded-xl bg-white p-0.5 shadow-crm-anello sm:grid-cols-5">
                {STATI.map((s) => (
                  <button
                    key={s.k}
                    onClick={() => salva({ stato: s.k })}
                    disabled={daContratto}
                    data-attiva={stato === s.k}
                    className="crm-linguetta min-w-0 truncate px-0.5 py-1.5 text-[12px] transition-colors disabled:cursor-not-allowed lg:text-[11px]"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {daContratto && <p className="mt-1.5 text-[12px] text-crm-verde">Ha un contratto: lo trovi in Clienti.</p>}
            </div>

            {stato === "perso" && (
              <div>
                <p className="crm-etichetta">Perché è andato perso</p>
                <div className="flex flex-wrap gap-1.5">
                  {MOTIVI.map((m) => (
                    <button
                      key={m}
                      onClick={() => salva({ motivo: c.motivo === m ? "" : m })}
                      className={cx(CHIP, c.motivo === m ? "bg-[#303030] text-white" : CHIP_SPENTO)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="crm-etichetta">Com&apos;è il contatto</p>
              <div className="flex flex-wrap gap-1.5">
                {QUALITA.map((x) => (
                  <button
                    key={x.k}
                    onClick={() => salva({ qualita: c.qualita === x.k ? null : x.k })}
                    className={cx(CHIP, c.qualita === x.k ? x.attivo : CHIP_SPENTO)}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="crm-etichetta">Appunti</p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={() => note !== (c.note || "") && salva({ note })}
                rows={3}
                placeholder="Chiamato martedì, richiamare dopo le 18…"
                className="crm-campo"
              />
              <p className="mt-1.5 text-[12px] text-crm-tenue">Si salva da solo quando esci dal campo.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
