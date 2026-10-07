"use client";

// Lead: le richieste arrivate dal sito, da lavorare una per una. Per ognuna
// si segna a che punto e' (nuovo, contattato, appuntamento, cliente, perso),
// se e' un buon contatto e perche' e' andato perso, con gli appunti.
// Un lead che ha gia' un contratto (stessa email o telefono, vedi Clienti)
// risulta cliente da solo.

import { useEffect, useMemo, useState } from "react";
import { Mail, Phone, Inbox, MessageCircle, Search, ChevronDown } from "lucide-react";
import { Card, Badge, EmptyState, Stat, cx } from "./ui";

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
  { k: "nuovo", label: "Nuovo", tone: "red", pallino: "bg-red-500" },
  { k: "contattato", label: "Contattato", tone: "blue", pallino: "bg-blue-600" },
  { k: "appuntamento", label: "Appuntamento", tone: "amber", pallino: "bg-amber-500" },
  { k: "cliente", label: "Cliente", tone: "green", pallino: "bg-green-600" },
  { k: "perso", label: "Perso", tone: "neutral", pallino: "bg-neutral-400" },
];

const QUALITA = [
  { k: "buono", label: "Buono", attivo: "border-green-600 bg-green-600 text-white" },
  { k: "medio", label: "Così così", attivo: "border-amber-500 bg-amber-500 text-white" },
  { k: "scarso", label: "Scarso", attivo: "border-neutral-700 bg-neutral-700 text-white" },
  { k: "spam", label: "Spam", attivo: "border-red-600 bg-red-600 text-white" },
];

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

export default function LeadView() {
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

  if (caricando) return <p className="py-10 text-sm text-neutral-400">Carico i lead…</p>;

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
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Da chiamare" value={conteggi.nuovo || 0} sub="nuovi, nessuno li ha ancora sentiti" tone={conteggi.nuovo ? "red" : "green"} onClick={() => setFiltro("nuovo")} />
        <Stat label="In corso" value={(conteggi.contattato || 0) + (conteggi.appuntamento || 0)} sub="contattati o con appuntamento" tone="blue" onClick={() => setFiltro("aperti")} />
        <Stat label="Diventati clienti" value={clienti} sub={totale ? `${Math.round((clienti / totale) * 100)}% dei lead` : "—"} tone="green" onClick={() => setFiltro("cliente")} />
        <Stat label="Contatti buoni" value={buoni} sub={`su ${totale} arrivati`} tone="ink" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap border border-black/15 bg-white">
          {([
            ["aperti", "Da lavorare", (conteggi.nuovo || 0) + (conteggi.contattato || 0) + (conteggi.appuntamento || 0)],
            ...STATI.map((s) => [s.k, s.label, conteggi[s.k] || 0] as const),
            ["tutti", "Tutti", totale],
          ] as const).map(([k, l, n]) => (
            <button
              key={k}
              onClick={() => setFiltro(k as typeof filtro)}
              className={cx("px-3 py-2 text-[13px] font-semibold", filtro === k ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-black/5")}
            >
              {l} <span className={cx("ml-0.5 text-[11px]", filtro === k ? "text-white/60" : "text-neutral-400")}>{n}</span>
            </button>
          ))}
        </div>
        <label className="relative ml-auto w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={cerca}
            onChange={(e) => setCerca(e.target.value)}
            placeholder="Cerca nome, email, telefono…"
            className="w-full border border-black/15 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-neutral-900"
          />
        </label>
      </div>

      {mostrati.length === 0 ? (
        <Card>
          <EmptyState
            titolo={totale ? "Nessun lead in questo gruppo." : "Nessun lead ricevuto."}
            testo={filtro === "nuovo" ? "Tutti i lead sono stati sentiti." : undefined}
            icon={<Inbox className="h-8 w-8" />}
          />
        </Card>
      ) : (
        <div className="border border-black/10 bg-white">
          {mostrati.map((c) => (
            <RigaLead
              key={c.id}
              c={c}
              stato={statoDi(c)}
              daContratto={clientiLead.has(c.id)}
              aperto={aperto === c.id}
              onApri={() => setAperto(aperto === c.id ? null : c.id)}
              salva={(p) => salva(c.id, p)}
            />
          ))}
        </div>
      )}
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
}: {
  c: Contatto;
  stato: Stato;
  daContratto: boolean;
  aperto: boolean;
  onApri: () => void;
  salva: (p: Partial<Contatto>) => void;
}) {
  const ch = canale(c);
  const st = STATI.find((s) => s.k === stato)!;
  const { risposte, nota } = leggiMessaggio(c.message);
  const obiettivo = risposte.find(([k]) => /obiettivo|ziel/i.test(k))?.[1];
  const [note, setNote] = useState(c.note || "");
  const tel = (c.phone || "").replace(/[^\d+]/g, "").replace(/^00/, "+");

  return (
    <div className={cx("border-b border-black/[0.07] last:border-b-0", aperto && "bg-[#fafafa]")}>
      <button onClick={onApri} className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5 text-left hover:bg-black/[0.02]">
        <span className={cx("h-2.5 w-2.5 shrink-0 rounded-full", st.pallino)} title={st.label} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-neutral-900">
            {c.name.trim()}
            {!c.read && stato === "nuovo" && <span className="ml-2 align-middle text-[10px] font-bold uppercase text-red-500">da leggere</span>}
          </span>
          <span className="block truncate text-[12px] text-neutral-500">
            {[obiettivo, c.service].filter(Boolean).join(" · ") || c.email}
          </span>
        </span>
        <Badge tone={ch.tone}>{ch.label}</Badge>
        {c.qualita && <Badge tone={c.qualita === "buono" ? "green" : c.qualita === "spam" ? "red" : "outline"}>{QUALITA.find((x) => x.k === c.qualita)?.label}</Badge>}
        <Badge tone={st.tone}>{st.label}</Badge>
        <span className="w-28 text-right text-[11px] tabular-nums text-neutral-400">{dataOra(c.createdAt).split(",")[0]}</span>
        <ChevronDown className={cx("h-4 w-4 text-neutral-400 transition-transform", aperto && "rotate-180")} />
      </button>

      {aperto && (
        <div className="grid gap-6 border-t border-black/[0.07] px-5 pb-6 pt-5 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* cosa ha scritto */}
          <div className="min-w-0">
            <div className="flex flex-wrap gap-1.5">
              {tel && (
                <a href={`https://wa.me/${tel.replace("+", "")}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 bg-[#25D366] px-3 py-1.5 text-[12px] font-semibold text-white hover:opacity-90">
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
              )}
              {tel && (
                <a href={`tel:${tel}`} className="inline-flex items-center gap-1.5 border border-black/15 bg-white px-3 py-1.5 text-[12px] font-semibold text-neutral-700 hover:border-black/30">
                  <Phone className="h-3.5 w-3.5" /> {c.phone}
                </a>
              )}
              <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 border border-black/15 bg-white px-3 py-1.5 text-[12px] font-semibold text-neutral-700 hover:border-black/30">
                <Mail className="h-3.5 w-3.5" /> {c.email}
              </a>
            </div>

            {risposte.length > 0 && (
              <dl className="mt-4 flex flex-wrap gap-1.5">
                {risposte.map(([k, v]) => (
                  <div key={k} className="border border-black/10 bg-white px-2 py-1 text-[11px]">
                    <dt className="inline text-neutral-400">{k}: </dt>
                    <dd className="inline font-semibold text-neutral-800">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {nota && (
              <p className="mt-3 whitespace-pre-wrap border-l-2 border-gold/60 pl-3 text-[13px] leading-relaxed text-neutral-700">{nota}</p>
            )}
            <p className="mt-4 text-[11px] text-neutral-400">
              Arrivato il {dataOra(c.createdAt)} da {ch.label}
              {c.landingPage ? `, pagina ${c.landingPage.split("?")[0]}` : ""}
              {c.contattatoAt ? ` · sentito la prima volta il ${dataOra(c.contattatoAt).split(",")[0]}` : ""}
            </p>
          </div>

          {/* lavorazione */}
          <div className="space-y-4">
            <div>
              <p className="mb-1.5 text-xs font-semibold text-neutral-600">A che punto è</p>
              <div className="grid grid-cols-5 border border-black/15 bg-white">
                {STATI.map((s) => (
                  <button
                    key={s.k}
                    onClick={() => salva({ stato: s.k })}
                    disabled={daContratto}
                    className={cx(
                      "border-r border-black/10 px-1 py-2 text-[11px] font-semibold last:border-r-0 disabled:cursor-not-allowed",
                      stato === s.k ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-black/5"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {daContratto && <p className="mt-1 text-[11px] text-green-700">Ha un contratto: lo trovi in Clienti.</p>}
            </div>

            {stato === "perso" && (
              <div>
                <p className="mb-1.5 text-xs font-semibold text-neutral-600">Perché è andato perso</p>
                <div className="flex flex-wrap gap-1.5">
                  {MOTIVI.map((m) => (
                    <button
                      key={m}
                      onClick={() => salva({ motivo: c.motivo === m ? "" : m })}
                      className={cx("border px-2.5 py-1 text-[11px] font-semibold", c.motivo === m ? "border-neutral-900 bg-neutral-900 text-white" : "border-black/15 bg-white text-neutral-600")}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-1.5 text-xs font-semibold text-neutral-600">Com&apos;è il contatto</p>
              <div className="flex flex-wrap gap-1.5">
                {QUALITA.map((x) => (
                  <button
                    key={x.k}
                    onClick={() => salva({ qualita: c.qualita === x.k ? null : x.k })}
                    className={cx("border px-2.5 py-1 text-[11px] font-semibold", c.qualita === x.k ? x.attivo : "border-black/15 bg-white text-neutral-600 hover:border-black/30")}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-xs font-semibold text-neutral-600">Appunti</p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={() => note !== (c.note || "") && salva({ note })}
                rows={3}
                placeholder="Chiamato martedì, richiamare dopo le 18…"
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
              />
              <p className="mt-1 text-[11px] text-neutral-400">Si salva da solo quando esci dal campo.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
