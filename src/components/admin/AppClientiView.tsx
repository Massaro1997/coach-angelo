"use client";

// App clienti (dal 12/11/2026): Angelo (allenamento) e Natalie (alimentazione)
// scrivono il piano giorno per giorno, il cliente lo apre nell'app /app.
// Qui: elenco dei clienti dell'app con chi sta per restare senza piano, e la
// scheda del cliente con calendario ed editor (in ./app-clienti).
// API: /api/admin/app-clienti, contratto in src/lib/app-coaching/tipi.ts.

import { useEffect, useMemo, useState } from "react";
import { ChevronRight, RefreshCw, Search, Smartphone, UserPlus } from "lucide-react";
import { Badge, Btn, Card, EmptyState, Stat, cx } from "./ui";
import type { ClienteApp, DataISO } from "@/lib/app-coaching/tipi";
import { aggiungiGiorni, giorniTra, oggiISO } from "@/lib/app-coaching/date";
import { api, BASE, Errore, dataBreve, momento, testoErrore } from "./app-clienti/comune";
import ModuloCliente, { type DatiCliente } from "./app-clienti/ModuloCliente";
import SchedaCliente from "./app-clienti/SchedaCliente";

type Filtro = "attivi" | "pianificare" | "tutti";

/** Quanto manca alla fine del piano: sotto i 3 giorni il cliente sta per restare senza. */
function statoPiano(c: ClienteApp, oggi: DataISO): { testo: string; tone: string; urgente: boolean } {
  if (!c.attivo) return { testo: "disattivato", tone: "neutral", urgente: false };
  const u = c.ultimoGiornoPianificato;
  if (!u) return { testo: "senza piano", tone: "red", urgente: true };
  if (u < oggi) return { testo: `piano finito il ${dataBreve(u)}`, tone: "red", urgente: true };
  const n = giorniTra(oggi, u);
  if (n === 0) return { testo: "finisce oggi", tone: "red", urgente: true };
  if (n <= 3) return { testo: `finisce tra ${n} ${n === 1 ? "giorno" : "giorni"}`, tone: "amber", urgente: true };
  return { testo: `fino al ${dataBreve(u)}`, tone: "outline", urgente: false };
}

function quandoFatto(d: DataISO | null, oggi: DataISO): string {
  if (!d) return "mai";
  if (d === oggi) return "oggi";
  if (d === aggiungiGiorni(oggi, -1)) return "ieri";
  return dataBreve(d);
}

export default function AppClientiView() {
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
    window.scrollTo({ top: 0 });
  }

  /* ---------------------------------------------------- cliente aperto */
  const aperto = apertoId ? clienti.find((c) => c.id === apertoId) : undefined;
  if (aperto) {
    return (
      <SchedaCliente
        key={aperto.id}
        cliente={aperto}
        appenaCreato={appenaCreato === aperto.id}
        onCliente={(c) => setClienti((x) => x.map((y) => (y.id === c.id ? c : y)))}
        onIndietro={() => {
          setApertoId(null);
          setAppenaCreato(null);
          ricarica(); // i riassunti (giorni pianificati, ultimo fatto) sono cambiati
          window.scrollTo({ top: 0 });
        }}
        onEliminato={() => {
          setClienti((x) => x.filter((y) => y.id !== aperto.id));
          setApertoId(null);
          setAppenaCreato(null);
          window.scrollTo({ top: 0 });
        }}
      />
    );
  }

  /* ------------------------------------------------------------ elenco */
  if (!pronto) return <p className="py-10 text-sm text-neutral-400">Carico i clienti dell&apos;app…</p>;

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

      <div className="flex flex-wrap items-center gap-2">
        {clienti.length > 0 && (
          <div className="flex border border-black/15 bg-white">
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
                onClick={() => setFiltro(k)}
                className={cx(
                  "px-3 py-2 text-[13px] font-semibold sm:px-3.5",
                  filtro === k ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-black/5"
                )}
              >
                {l}
                {k === "pianificare" && urgenti > 0 && <span className="ml-1.5 tabular-nums opacity-70">{urgenti}</span>}
              </button>
            ))}
          </div>
        )}
        <div className="ml-auto flex w-full items-center gap-2 sm:w-auto">
          {clienti.length > 0 && (
            <label className="relative flex-1 sm:w-64 sm:flex-none">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={cerca}
                onChange={(e) => setCerca(e.target.value)}
                placeholder="Cerca nome, telefono…"
                className="w-full border border-black/15 bg-white py-2 pl-9 pr-3 text-base text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900 sm:text-sm"
              />
            </label>
          )}
          <button
            type="button"
            onClick={ricarica}
            disabled={ricarico}
            title="Aggiorna"
            aria-label="Aggiorna l'elenco"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-black/15 bg-white text-neutral-600 hover:border-black/30 disabled:opacity-50"
          >
            <RefreshCw className={cx("h-4 w-4", ricarico && "animate-spin")} />
          </button>
          <Btn variant="brand" onClick={() => setNuovo(true)} className="shrink-0">
            <UserPlus className="h-4 w-4" /> Nuovo cliente
          </Btn>
        </div>
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
              <Btn variant="brand" onClick={() => setNuovo(true)}>
                <UserPlus className="h-4 w-4" /> Nuovo cliente
              </Btn>
            </div>
          </Card>
        )
      ) : visibili.length === 0 ? (
        <Card>
          <EmptyState
            titolo={filtro === "pianificare" && !q ? "Nessuno da pianificare." : "Nessun cliente con questo filtro."}
            testo={filtro === "pianificare" && !q ? "Tutti i clienti attivi hanno il piano per almeno 4 giorni." : "Prova con Tutti."}
            icon={<Smartphone className="h-8 w-8" />}
          />
        </Card>
      ) : (
        <div className="border border-black/10 bg-white">
          {/* intestazione colonne, solo su schermo largo */}
          <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_16px] gap-4 border-b border-black/[0.07] px-5 py-2.5 text-[11px] font-semibold text-neutral-400 lg:grid">
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
                window.scrollTo({ top: 0 });
              }}
              className={cx(
                "grid w-full grid-cols-[minmax(0,1fr)_16px] items-center gap-x-3 gap-y-1 border-b border-black/[0.07] px-4 py-3.5 text-left transition-colors last:border-b-0 hover:bg-black/[0.02] sm:px-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_16px] lg:gap-4",
                !c.attivo && "opacity-60"
              )}
            >
              <div className="min-w-0">
                <p className="flex items-center gap-2">
                  <span className="truncate text-sm font-bold text-neutral-900">{c.nome}</span>
                  <span className="shrink-0 text-[10px] font-bold uppercase text-neutral-400">{c.lingua}</span>
                </p>
                <p className="truncate text-[12px] text-neutral-500">{c.obiettivo || c.telefono || c.email || "—"}</p>
                {/* sul telefono il resto sta qui sotto */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-500 lg:hidden">
                  <Badge tone={s.tone}>{s.testo}</Badge>
                  {c.attivo && <span>{c.giorniPianificati} giorni pianificati</span>}
                  <span>fatto: {quandoFatto(c.ultimoFatto, oggi)}</span>
                  {!c.ultimoAccesso && <span className="font-semibold text-amber-700">mai entrato</span>}
                </div>
              </div>

              <div className="hidden min-w-0 lg:block">
                <Badge tone={s.tone}>{s.testo}</Badge>
                {c.attivo && (
                  <p className="mt-1 text-[11px] text-neutral-500">
                    {c.giorniPianificati === 1 ? "1 giorno pianificato" : `${c.giorniPianificati} giorni pianificati`} da oggi
                  </p>
                )}
              </div>
              <p className={cx("hidden text-[13px] lg:block", c.ultimoFatto === oggi ? "font-semibold text-green-700" : "text-neutral-700")}>
                {quandoFatto(c.ultimoFatto, oggi)}
              </p>
              <p className={cx("hidden text-[12px] lg:block", c.ultimoAccesso ? "text-neutral-600" : "font-semibold text-amber-700")}>
                {c.ultimoAccesso ? momento(c.ultimoAccesso) : "mai entrato"}
              </p>
              <ChevronRight className="h-4 w-4 text-neutral-300" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
