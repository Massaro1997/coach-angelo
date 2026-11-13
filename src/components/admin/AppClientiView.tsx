"use client";

// App clienti (dal 12/11/2026): Angelo (allenamento) e Natalie (alimentazione)
// scrivono il piano giorno per giorno, il cliente lo apre nell'app /app.
// Qui: elenco dei clienti dell'app con chi sta per restare senza piano, e la
// scheda del cliente con calendario ed editor (in ./app-clienti).
// API: /api/admin/app-clienti, contratto in src/lib/app-coaching/tipi.ts.
//
// v2 (13/11/2026): linguette Clienti | Prenotazioni | Disponibilita' |
// Messaggi. Le ore 1:1 e le conversazioni si caricano qui una volta sola e
// passano a tutte le linguette (dati-v2.ts); contratto in tipi-v2.ts.

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import {
  CalendarCheck,
  ChevronRight,
  Clock,
  MessageCircle,
  RefreshCw,
  Search,
  Smartphone,
  UserPlus,
  Users,
} from "lucide-react";
import { Card, EmptyState, Stat, cx, scorriInCima } from "./ui";
import type { ClienteApp, DataISO } from "@/lib/app-coaching/tipi";
import type { ThreadAdmin } from "@/lib/app-coaching/tipi-v2";
import { aggiungiGiorni, giorniTra, oggiISO } from "@/lib/app-coaching/date";
import { api, BASE, Errore, dataBreve, momento, testoErrore } from "./app-clienti/comune";
import { usePrenotazioni, useConversazioni, type Prenotazioni } from "./app-clienti/dati-v2";
import ModuloCliente, { type DatiCliente } from "./app-clienti/ModuloCliente";
import SchedaCliente from "./app-clienti/SchedaCliente";
import VistaPrenotazioni from "./app-clienti/VistaPrenotazioni";
import VistaDisponibilita from "./app-clienti/VistaDisponibilita";
import VistaMessaggi from "./app-clienti/VistaMessaggi";

/* ====================================================================
   Contenitore con le linguette
   ==================================================================== */

type Linguetta = "clienti" | "prenotazioni" | "disponibilita" | "messaggi";

const LINGUETTE: { key: Linguetta; label: string; icon: typeof Users }[] = [
  { key: "clienti", label: "Clienti", icon: Users },
  { key: "prenotazioni", label: "Prenotazioni", icon: CalendarCheck },
  { key: "disponibilita", label: "Disponibilità", icon: Clock },
  { key: "messaggi", label: "Messaggi", icon: MessageCircle },
];

export default function AppClientiView({ onNonLetti }: { onNonLetti?: (n: number) => void } = {}) {
  const [linguetta, setLinguetta] = useState<Linguetta>("clienti");
  // Una linguetta gia' aperta resta montata (nascosta): orari non salvati,
  // risposta a meta' o scheda cliente aperta non si perdono cambiando linguetta.
  const [visitate, setVisitate] = useState<Linguetta[]>(["clienti"]);
  const [threadAperto, setThreadAperto] = useState<{ id: string; nome: string } | null>(null);
  const pren = usePrenotazioni();
  const conv = useConversazioni(onNonLetti);

  function vai(l: Linguetta) {
    if (l === linguetta) return;
    setLinguetta(l);
    setVisitate((v) => (v.includes(l) ? v : [...v, l]));
    // entrando si ricaricano: i clienti prenotano e annullano dall'app
    if (l === "prenotazioni" || l === "disponibilita") pren.ricarica();
    if (l === "messaggi") conv.ricarica();
    scorriInCima();
  }

  // frecce sinistra/destra tra le linguette, come nei tablist
  function tasti(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = LINGUETTE.findIndex((x) => x.key === linguetta);
    const n = LINGUETTE[(i + (e.key === "ArrowRight" ? 1 : -1) + LINGUETTE.length) % LINGUETTE.length];
    vai(n.key);
    document.getElementById(`linguetta-app-${n.key}`)?.focus();
  }

  const pannello = (l: Linguetta) => ({
    id: `pannello-app-${l}`,
    role: "tabpanel" as const,
    "aria-labelledby": `linguetta-app-${l}`,
    className: linguetta === l ? "" : "hidden",
  });

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Sezioni dell'app clienti"
        onKeyDown={tasti}
        className="flex flex-wrap gap-1 border-b border-crm-filo pb-2"
      >
        {LINGUETTE.map(({ key, label, icon: Icona }) => {
          const on = linguetta === key;
          const conta = key === "messaggi" ? conv.nonLetti : 0;
          return (
            <button
              key={key}
              id={`linguetta-app-${key}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`pannello-app-${key}`}
              tabIndex={on ? 0 : -1}
              data-attiva={on}
              onClick={() => vai(key)}
              className="crm-linguetta inline-flex items-center gap-1.5 max-sm:min-h-9"
            >
              <Icona className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              {label}
              {conta > 0 && (
                <span
                  className="min-w-5 rounded-full bg-crm-ink px-1.5 text-center text-[11px] font-[650] leading-5 tabular-nums text-white"
                  aria-label={`${conta} da leggere`}
                >
                  {conta}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div {...pannello("clienti")}>
        <VistaClienti
          prenotazioni={pren}
          thread={conv.thread}
          onClienteAperto={pren.ricarica}
          onApriMessaggi={(id, nome) => {
            setThreadAperto({ id, nome });
            vai("messaggi");
          }}
          onApriPrenotazioni={() => vai("prenotazioni")}
        />
      </div>
      {visitate.includes("prenotazioni") && (
        <div {...pannello("prenotazioni")}>
          <VistaPrenotazioni pren={pren} />
        </div>
      )}
      {visitate.includes("disponibilita") && (
        <div {...pannello("disponibilita")}>
          <VistaDisponibilita prenotazioni={pren.lista} oggi={pren.oggi} onApriPrenotazioni={() => vai("prenotazioni")} />
        </div>
      )}
      {visitate.includes("messaggi") && (
        <div {...pannello("messaggi")}>
          <VistaMessaggi conv={conv} aperto={threadAperto} onApri={setThreadAperto} visibile={linguetta === "messaggi"} />
        </div>
      )}
    </div>
  );
}

/* ====================================================================
   Linguetta Clienti: la vista di prima, invariata
   ==================================================================== */

type Filtro = "attivi" | "pianificare" | "tutti";

/**
 * Quanto manca alla fine del piano: sotto i 3 giorni il cliente sta per restare
 * senza. `badge` e' il colore del badge Polaris (.crm-badge-*): verde coperto,
 * giallo in scadenza, rosa finito o senza piano, grigio disattivato.
 */
function statoPiano(c: ClienteApp, oggi: DataISO): { testo: string; badge: string; urgente: boolean } {
  if (!c.attivo) return { testo: "disattivato", badge: "", urgente: false };
  const u = c.ultimoGiornoPianificato;
  if (!u) return { testo: "senza piano", badge: "crm-badge-errore", urgente: true };
  if (u < oggi) return { testo: `piano finito il ${dataBreve(u)}`, badge: "crm-badge-errore", urgente: true };
  const n = giorniTra(oggi, u);
  if (n === 0) return { testo: "finisce oggi", badge: "crm-badge-errore", urgente: true };
  if (n <= 3) return { testo: `finisce tra ${n} ${n === 1 ? "giorno" : "giorni"}`, badge: "crm-badge-attesa", urgente: true };
  return { testo: `fino al ${dataBreve(u)}`, badge: "crm-badge-ok", urgente: false };
}

function quandoFatto(d: DataISO | null, oggi: DataISO): string {
  if (!d) return "mai";
  if (d === oggi) return "oggi";
  if (d === aggiungiGiorni(oggi, -1)) return "ieri";
  return dataBreve(d);
}

function VistaClienti({
  prenotazioni,
  thread,
  onClienteAperto,
  onApriMessaggi,
  onApriPrenotazioni,
}: {
  prenotazioni: Prenotazioni;
  thread: ThreadAdmin[];
  /** si apre una scheda: le sue prossime ore 1:1 vanno ricaricate */
  onClienteAperto: () => void;
  onApriMessaggi: (clienteId: string, nome: string) => void;
  onApriPrenotazioni: () => void;
}) {
  const [clienti, setClienti] = useState<ClienteApp[]>([]);
  const [pronto, setPronto] = useState(false);
  const [errore, setErrore] = useState("");
  const [versione, setVersione] = useState(0);
  const [ricarico, setRicarico] = useState(false);
  const [apertoId, setApertoId] = useState<string | null>(null);
  const [appenaCreato, setAppenaCreato] = useState<string | null>(null);
  const [nuovo, setNuovo] = useState(false);
  const [filtro, setFiltro] = useState<Filtro>("attivi");
  const [cerca, setCerca] = useState("");
  const [oggi] = useState(() => oggiISO());

  useEffect(() => {
    let vivo = true;
    api<{ clienti: ClienteApp[] }>(BASE)
      .then((j) => {
        if (!vivo) return;
        setClienti(j.clienti ?? []);
        setErrore("");
      })
      .catch((e) => vivo && setErrore(testoErrore(e)))
      .finally(() => {
        if (!vivo) return;
        setPronto(true);
        setRicarico(false);
      });
    return () => {
      vivo = false;
    };
  }, [versione]);

  const ricarica = () => {
    setRicarico(true);
    setVersione((v) => v + 1);
  };

  const conStato = useMemo(
    () =>
      clienti
        .map((c) => ({ c, s: statoPiano(c, oggi) }))
        .sort((a, b) => Number(b.c.attivo) - Number(a.c.attivo) || a.c.nome.localeCompare(b.c.nome, "de")),
    [clienti, oggi]
  );

  const attivi = conStato.filter(({ c }) => c.attivo);
  const urgenti = attivi.filter(({ s }) => s.urgente).length;
  const fattoOggi = attivi.filter(({ c }) => c.ultimoFatto === oggi).length;
  const maiEntrati = attivi.filter(({ c }) => !c.ultimoAccesso).length;

  const q = cerca.trim().toLowerCase();
  const visibili = conStato.filter(({ c, s }) => {
    if (filtro === "attivi" && !c.attivo) return false;
    if (filtro === "pianificare" && !s.urgente) return false;
    if (q && ![c.nome, c.email, c.telefono, c.obiettivo].some((v) => v?.toLowerCase().includes(q))) return false;
    return true;
  });

  async function crea(d: DatiCliente) {
    // i facoltativi vuoti non si mandano proprio
    const body: Record<string, string> = { nome: d.nome, lingua: d.lingua };
    for (const k of ["email", "telefono", "obiettivo", "note"] as const) if (d[k]) body[k] = d[k];
    const r = await api<{ cliente: ClienteApp }>(BASE, { method: "POST", body });
    setClienti((x) => [...x.filter((c) => c.id !== r.cliente.id), r.cliente]);
    setNuovo(false);
    setAppenaCreato(r.cliente.id);
    setApertoId(r.cliente.id);
    scorriInCima();
  }

  // messaggi non letti per cliente, per il badge nell'elenco
  const nonLettiDi = useMemo(() => new Map(thread.map((t) => [t.clienteId, t.nonLetti])), [thread]);

  /* ---------------------------------------------------- cliente aperto */
  const aperto = apertoId ? clienti.find((c) => c.id === apertoId) : undefined;
  if (aperto) {
    return (
      <SchedaCliente
        key={aperto.id}
        cliente={aperto}
        appenaCreato={appenaCreato === aperto.id}
        prenotazioni={prenotazioni}
        thread={thread.find((t) => t.clienteId === aperto.id) ?? null}
        onApriMessaggi={() => onApriMessaggi(aperto.id, aperto.nome)}
        onApriPrenotazioni={onApriPrenotazioni}
        onCliente={(c) => setClienti((x) => x.map((y) => (y.id === c.id ? c : y)))}
        onIndietro={() => {
          setApertoId(null);
          setAppenaCreato(null);
          ricarica(); // i riassunti (giorni pianificati, ultimo fatto) sono cambiati
          scorriInCima();
        }}
        onEliminato={() => {
          setClienti((x) => x.filter((y) => y.id !== aperto.id));
          setApertoId(null);
          setAppenaCreato(null);
          scorriInCima();
        }}
      />
    );
  }

  /* ------------------------------------------------------------ elenco */
  if (!pronto) return <p className="py-10 text-[13px] text-crm-tenue">Carico i clienti dell&apos;app…</p>;

  return (
    <div className="space-y-4">
      {clienti.length > 0 && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Clienti attivi" value={attivi.length} sub={`${clienti.length} in tutto`} tone="ink" onClick={() => setFiltro("attivi")} />
          <Stat
            label="Da pianificare"
            value={urgenti}
            sub="piano finito o che finisce entro 3 giorni"
            tone={urgenti ? "red" : "green"}
            onClick={() => setFiltro("pianificare")}
          />
          <Stat label="Allenati oggi" value={fattoOggi} sub="hanno segnato fatto il giorno di oggi" tone="green" />
          <Stat label="Mai entrati" value={maiEntrati} sub="mandagli di nuovo l'accesso" tone={maiEntrati ? "amber" : "ink"} />
        </div>
      )}

      {errore && <Errore testo={errore} onRiprova={ricarica} />}

      {/* azioni della pagina, come in alto a destra in Shopify */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={ricarica}
          disabled={ricarico}
          title="Aggiorna"
          aria-label="Aggiorna l'elenco"
          className="crm-btn h-8 w-8 shrink-0 px-0 max-sm:h-9 max-sm:w-9"
        >
          <RefreshCw className={cx("h-4 w-4", ricarico && "animate-spin")} />
        </button>
        <button type="button" onClick={() => setNuovo(true)} className="crm-btn-primario h-8 shrink-0 max-sm:h-9 max-sm:px-4">
          <UserPlus className="h-4 w-4" /> Nuovo cliente
        </button>
      </div>

      {nuovo && (
        <Card title="Nuovo cliente dell'app" subtitle="Dopo il salvataggio ricevi codice e link da mandargli su WhatsApp.">
          <ModuloCliente etichettaSalva="Crea cliente" onSalva={crea} onAnnulla={() => setNuovo(false)} />
        </Card>
      )}

      {clienti.length === 0 ? (
        !errore &&
        !nuovo && (
          <Card>
            <EmptyState
              titolo="Ancora nessun cliente nell'app."
              testo="Crea il primo cliente: ricevi un codice e un link da mandargli su WhatsApp. Poi scrivete allenamento e alimentazione giorno per giorno nel suo calendario."
              icon={<Smartphone className="h-8 w-8" />}
            />
            <div className="-mt-6 flex justify-center pb-10">
              <button type="button" onClick={() => setNuovo(true)} className="crm-btn-primario max-sm:min-h-9 max-sm:px-4">
                <UserPlus className="h-4 w-4" /> Nuovo cliente
              </button>
            </div>
          </Card>
        )
      ) : (
        <section className="crm-card p-2">
          {/* linguette e ricerca, in cima all'elenco come in Shopify */}
          <div className="flex flex-wrap items-center gap-2 px-1 pb-2 pt-0.5">
            <div className="flex flex-wrap gap-1">
              {(
                [
                  ["attivi", "Attivi"],
                  ["pianificare", "Da pianificare"],
                  ["tutti", "Tutti"],
                ] as const
              ).map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={filtro === k}
                  data-attiva={filtro === k}
                  onClick={() => setFiltro(k)}
                  className="crm-linguetta inline-flex items-center max-sm:min-h-9"
                >
                  {l}
                  {k === "pianificare" && urgenti > 0 && (
                    <span className="ml-1.5 text-[12px] font-medium tabular-nums text-crm-spento">{urgenti}</span>
                  )}
                </button>
              ))}
            </div>
            <label className="relative ml-auto w-full sm:w-64">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-crm-spento" />
              <input
                value={cerca}
                onChange={(e) => setCerca(e.target.value)}
                placeholder="Cerca nome, telefono…"
                className="crm-campo pl-8 max-sm:min-h-9"
              />
            </label>
          </div>

          {visibili.length === 0 ? (
            <EmptyState
              titolo={filtro === "pianificare" && !q ? "Nessuno da pianificare." : "Nessun cliente con questo filtro."}
              testo={filtro === "pianificare" && !q ? "Tutti i clienti attivi hanno il piano per almeno 4 giorni." : "Prova con Tutti."}
              icon={<Smartphone className="h-8 w-8" />}
            />
          ) : (
            <div>
              {/* intestazione colonne, solo su schermo largo (la testata grigia di Shopify) */}
              <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_16px] gap-4 rounded-lg bg-crm-fondo px-3 py-1.5 text-[12px] font-[550] leading-4 text-[#4a4a4a] lg:grid">
                <span>Cliente</span>
                <span>Piano</span>
                <span>Ultimo fatto</span>
                <span>Ultimo accesso</span>
                <span />
              </div>
              {visibili.map(({ c, s }) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setApertoId(c.id);
                    onClienteAperto();
                    scorriInCima();
                  }}
                  className={cx(
                    "grid w-full grid-cols-[minmax(0,1fr)_16px] items-center gap-x-3 gap-y-1 border-b border-crm-filo px-3 py-3 text-left transition-colors last:border-b-0 hover:bg-crm-fondo focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-crm-blu lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_16px] lg:gap-4",
                    !c.attivo && "opacity-60"
                  )}
                >
                  <div className="min-w-0">
                    <p className="flex items-center gap-2">
                      <span className="truncate text-[13px] font-[650] leading-5 text-crm-ink">{c.nome}</span>
                      <span className="shrink-0 text-[11px] font-[550] uppercase text-crm-spento">{c.lingua}</span>
                      {(nonLettiDi.get(c.id) ?? 0) > 0 && (
                        <span className="crm-badge crm-badge-info shrink-0">
                          <MessageCircle className="h-3 w-3" aria-hidden="true" />
                          {nonLettiDi.get(c.id)} da leggere
                        </span>
                      )}
                    </p>
                    <p className="truncate text-[12px] leading-4 text-crm-tenue">{c.obiettivo || c.telefono || c.email || "—"}</p>
                    {/* sul telefono il resto sta qui sotto */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-4 text-crm-tenue lg:hidden">
                      <span className={cx("crm-badge", s.badge)}>{s.testo}</span>
                      {c.attivo && <span>{c.giorniPianificati} giorni pianificati</span>}
                      <span>fatto: {quandoFatto(c.ultimoFatto, oggi)}</span>
                      {!c.ultimoAccesso && <span className="crm-badge crm-badge-attesa">mai entrato</span>}
                    </div>
                  </div>

                  <div className="hidden min-w-0 lg:block">
                    <span className={cx("crm-badge", s.badge)}>{s.testo}</span>
                    {c.attivo && (
                      <p className="mt-1 text-[12px] leading-4 text-crm-tenue">
                        {c.giorniPianificati === 1 ? "1 giorno pianificato" : `${c.giorniPianificati} giorni pianificati`} da oggi
                      </p>
                    )}
                  </div>
                  <p className={cx("hidden text-[13px] lg:block", c.ultimoFatto === oggi ? "font-[550] text-crm-verde" : "text-crm-testo")}>
                    {quandoFatto(c.ultimoFatto, oggi)}
                  </p>
                  <p className="hidden text-[13px] lg:block">
                    {c.ultimoAccesso ? (
                      <span className="text-crm-testo">{momento(c.ultimoAccesso)}</span>
                    ) : (
                      <span className="crm-badge crm-badge-attesa">mai entrato</span>
                    )}
                  </p>
                  <ChevronRight className="h-4 w-4 text-crm-spento" />
                </button>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
