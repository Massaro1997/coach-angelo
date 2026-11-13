"use client";

// Linguetta Messaggi: a sinistra le conversazioni (nome, ultimo messaggio,
// non letti), a destra quella aperta con bolle e campo risposta. Sul telefono
// una cosa alla volta, con la freccia per tornare all'elenco. L'elenco si
// ricarica ogni 30 s nel contenitore; la conversazione aperta si ricarica ogni
// 30 s e quando l'elenco segnala un messaggio nuovo (aprirla li segna letti).

import { Fragment, useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowLeft, MessageCircle, RefreshCw, Search, Send } from "lucide-react";
import { EmptyState, cx } from "../ui";
import type { DataISO } from "@/lib/app-coaching/tipi";
import type { Messaggio, ThreadAdmin } from "@/lib/app-coaching/tipi-v2";
import { oggiISO } from "@/lib/app-coaching/date";
import { api, BASE, Errore, dataLunga, testoErrore } from "./comune";
import { OGNI_MS, dataOra, giornoDi, orario, relativo, type Conversazioni } from "./dati-v2";

type Aperto = { id: string; nome: string };

const iniziali = (nome: string) =>
  nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

export default function VistaMessaggi({
  conv,
  aperto,
  onApri,
  visibile,
}: {
  conv: Conversazioni;
  aperto: Aperto | null;
  onApri: (a: Aperto | null) => void;
  /** la linguetta e' quella mostrata: solo allora la conversazione si ricarica da sola */
  visibile: boolean;
}) {
  const [cerca, setCerca] = useState("");
  const [oggi] = useState<DataISO>(() => oggiISO());

  // prima chi ha scritto per ultimo; chi non ha ancora messaggi in fondo, per nome
  const ordinati = useMemo(
    () =>
      [...conv.thread].sort(
        (a, b) => (b.ultimo?.createdAt ?? "").localeCompare(a.ultimo?.createdAt ?? "") || a.nome.localeCompare(b.nome, "de")
      ),
    [conv.thread]
  );
  const q = cerca.trim().toLowerCase();
  const filtrati = q ? ordinati.filter((t) => t.nome.toLowerCase().includes(q)) : ordinati;
  const conMessaggi = filtrati.filter((t) => t.ultimo);
  const senza = filtrati.filter((t) => !t.ultimo);
  const thread = aperto ? (conv.thread.find((t) => t.clienteId === aperto.id) ?? null) : null;

  return (
    <section className="crm-card grid h-[calc(100dvh-150px)] min-h-[440px] md:h-[calc(100dvh-170px)] md:grid-cols-[300px_minmax(0,1fr)] lg:h-[calc(100dvh-150px)]">
      {/* ------------------------------------------------- conversazioni */}
      <div className={cx("flex min-h-0 flex-col md:border-r md:border-crm-filo", aperto && "max-md:hidden")}>
        <div className="flex items-center gap-2 border-b border-crm-filo p-3">
          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-crm-spento" />
            <input
              value={cerca}
              onChange={(e) => setCerca(e.target.value)}
              placeholder="Cerca un cliente…"
              aria-label="Cerca un cliente"
              className="crm-campo pl-8 max-sm:min-h-9"
            />
          </label>
          <button
            type="button"
            onClick={conv.ricarica}
            title="Aggiorna"
            aria-label="Aggiorna le conversazioni"
            className="crm-btn h-8 w-8 shrink-0 px-0 max-sm:h-9 max-sm:w-9"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        {conv.errore && (
          <div className="p-3 pb-0">
            <Errore testo={conv.errore} onRiprova={conv.ricarica} />
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {!conv.pronto ? (
            <p className="p-4 text-[13px] text-crm-tenue">Carico le conversazioni…</p>
          ) : filtrati.length === 0 ? (
            <EmptyState
              titolo={q ? "Nessun cliente con questo nome." : "Ancora nessuna conversazione."}
              testo={q ? undefined : "Quando un cliente scrive dall'app, il messaggio arriva qui."}
              icon={<MessageCircle />}
            />
          ) : (
            <>
              {conMessaggi.map((t) => (
                <VoceThread key={t.clienteId} t={t} oggi={oggi} on={aperto?.id === t.clienteId} onClick={() => onApri({ id: t.clienteId, nome: t.nome })} />
              ))}
              {senza.length > 0 && (
                <>
                  <p className="bg-crm-fondo px-3 py-1.5 text-[12px] font-[550] text-[#4a4a4a]">Ancora nessun messaggio</p>
                  {senza.map((t) => (
                    <VoceThread key={t.clienteId} t={t} oggi={oggi} on={aperto?.id === t.clienteId} onClick={() => onApri({ id: t.clienteId, nome: t.nome })} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* ----------------------------------------------- conversazione */}
      <div className={cx("flex min-h-0 flex-col", !aperto && "max-md:hidden")}>
        {aperto ? (
          <Conversazione
            key={aperto.id}
            clienteId={aperto.id}
            nome={thread?.nome ?? aperto.nome}
            ultimoId={thread?.ultimo?.id ?? null}
            visibile={visibile}
            oggi={oggi}
            onLetti={conv.letti}
            onInviato={conv.inviato}
            onIndietro={() => onApri(null)}
          />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-crm-fondo-2 text-crm-spento">
              <MessageCircle className="h-6 w-6" />
            </span>
            <p className="mt-3 text-[13px] font-[650] text-crm-ink">Scegli una conversazione</p>
            <p className="mt-1 max-w-xs text-[13px] leading-5 text-crm-tenue">
              I clienti scrivono dalla sezione Coach dell&apos;app. Le tue risposte le vedono lì.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------ voce dell'elenco */

function VoceThread({ t, oggi, on, onClick }: { t: ThreadAdmin; oggi: DataISO; on: boolean; onClick: () => void }) {
  const nuovi = t.nonLetti > 0;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={on ? "true" : undefined}
      className={cx(
        "flex w-full items-center gap-3 border-b border-crm-filo px-3 py-2.5 text-left transition-colors last:border-b-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-crm-blu",
        on ? "bg-crm-fondo-2" : "hover:bg-crm-fondo"
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crm-fondo-2 text-[12px] font-[650] text-crm-testo shadow-crm-anello"
      >
        {iniziali(t.nome)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-2">
          <span className={cx("truncate text-[13px] leading-5", nuovi ? "font-[650] text-crm-ink" : "font-[550] text-crm-testo")}>
            {t.nome}
          </span>
          {t.ultimo && (
            <span className={cx("ml-auto shrink-0 text-[11px] tabular-nums", nuovi ? "font-[650] text-crm-ink" : "text-crm-spento")}>
              {dataOra(t.ultimo.createdAt, oggi)}
            </span>
          )}
        </span>
        <span className="flex items-center gap-2">
          <span className={cx("min-w-0 flex-1 truncate text-[12px] leading-4", nuovi ? "text-crm-ink" : "text-crm-tenue")}>
            {t.ultimo ? `${t.ultimo.daCoach ? "Tu: " : ""}${t.ultimo.testo}` : "Scrivi per primo"}
          </span>
          {nuovi && (
            <span
              className="min-w-5 shrink-0 rounded-full bg-crm-ink px-1.5 text-center text-[11px] font-[650] leading-5 tabular-nums text-white"
              aria-label={`${t.nonLetti} da leggere`}
            >
              {t.nonLetti}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}

/* --------------------------------------------------------- conversazione */

function Conversazione({
  clienteId,
  nome,
  ultimoId,
  visibile,
  oggi,
  onLetti,
  onInviato,
  onIndietro,
}: {
  clienteId: string;
  nome: string;
  /** ultimo messaggio secondo l'elenco: se cambia, ne e' arrivato uno nuovo */
  ultimoId: string | null;
  visibile: boolean;
  oggi: DataISO;
  onLetti: (clienteId: string) => void;
  onInviato: (clienteId: string, m: Messaggio) => void;
  onIndietro: () => void;
}) {
  const [messaggi, setMessaggi] = useState<Messaggio[]>([]);
  const [pronto, setPronto] = useState(false);
  const [errore, setErrore] = useState("");
  const [versione, setVersione] = useState(0);
  const [testo, setTesto] = useState("");
  const [invio, setInvio] = useState(false);
  const [erroreInvio, setErroreInvio] = useState("");
  // il primo messaggio che era nuovo all'apertura: la riga «Nuovi» resta li'
  // anche dopo i giri da 30 s, quando ormai risultano letti
  const [primoNuovo, setPrimoNuovo] = useState<string | null>(null);
  const scorre = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLTextAreaElement>(null);
  // l'ultima callback: quella vecchia vedrebbe l'elenco di prima
  const letti = useRef(onLetti);
  useEffect(() => {
    letti.current = onLetti;
  });

  // Carica (e cosi' segna letti) all'apertura, ogni 30 s, al ritorno sulla
  // linguetta del browser e quando l'elenco dice che c'e' un messaggio nuovo
  // (ultimoId cambia): cosi' anche il badge dei non letti torna a zero.
  useEffect(() => {
    if (!visibile) return;
    let vivo = true;
    const carica = () => {
      if (document.hidden) return;
      api<{ messaggi: Messaggio[] }>(`${BASE}/${clienteId}/messaggi`)
        .then((j) => {
          if (!vivo) return;
          const lista = j.messaggi ?? [];
          // la risposta porta lo stato di prima della lettura
          const nuovo = lista.find((m) => !m.daCoach && !m.letto);
          setMessaggi(lista);
          if (nuovo) setPrimoNuovo((p) => p ?? nuovo.id);
          setErrore("");
          letti.current(clienteId);
        })
        .catch((e) => vivo && setErrore(testoErrore(e)))
        .finally(() => vivo && setPronto(true));
    };
    carica();
    const giro = setInterval(carica, OGNI_MS);
    const torna = () => {
      if (!document.hidden) carica();
    };
    document.addEventListener("visibilitychange", torna);
    return () => {
      vivo = false;
      clearInterval(giro);
      document.removeEventListener("visibilitychange", torna);
    };
  }, [clienteId, visibile, versione, ultimoId]);

  // in fondo all'ultimo messaggio quando ne arriva uno (o la linguetta riappare)
  const ultimo = messaggi[messaggi.length - 1]?.id;
  useEffect(() => {
    const el = scorre.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [ultimo, pronto, visibile]);

  async function invia(e?: FormEvent) {
    e?.preventDefault();
    const t = testo.trim();
    if (!t || invio) return;
    setInvio(true);
    setErroreInvio("");
    try {
      const r = await api<{ messaggio: Messaggio }>(`${BASE}/${clienteId}/messaggi`, { method: "POST", body: { testo: t } });
      setMessaggi((x) => [...x.filter((m) => m.id !== r.messaggio.id), r.messaggio]);
      setTesto("");
      onInviato(clienteId, r.messaggio);
      campo.current?.focus();
    } catch (err) {
      // il testo resta nel campo: si riprova senza riscriverlo
      setErroreInvio(testoErrore(err));
    } finally {
      setInvio(false);
    }
  }

  // Invio manda, Maiusc+Invio va a capo; sul telefono (dito) Invio va sempre a capo
  function tasti(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Enter" || e.shiftKey || e.nativeEvent.isComposing) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    e.preventDefault();
    void invia();
  }

  const righe = Math.min(6, Math.max(1, testo.split("\n").length));

  return (
    <>
      <header className="flex items-center gap-2 border-b border-crm-filo px-3 py-2.5 sm:px-4">
        <button
          type="button"
          onClick={onIndietro}
          aria-label="Torna alle conversazioni"
          className="crm-btn-piatto -ml-1 h-9 w-9 justify-center px-0 md:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crm-fondo-2 text-[12px] font-[650] text-crm-testo shadow-crm-anello"
        >
          {iniziali(nome)}
        </span>
        <h2 className="min-w-0 flex-1 truncate text-[14px] font-[650] leading-5 text-crm-ink">{nome}</h2>
      </header>

      <div ref={scorre} className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-4" aria-live="polite">
        {errore && <Errore testo={errore} onRiprova={() => setVersione((v) => v + 1)} />}
        {!pronto ? (
          <p className="text-[13px] text-crm-tenue">Carico i messaggi…</p>
        ) : messaggi.length === 0 && !errore ? (
          <p className="mx-auto mt-8 max-w-xs text-center text-[13px] leading-5 text-crm-tenue">
            Ancora nessun messaggio con {nome}. Scrivi qui sotto: lo vede nell&apos;app, nella sezione Coach.
          </p>
        ) : (
          <div className="space-y-1.5">
            {messaggi.map((m, i) => {
              const g = giornoDi(m.createdAt);
              const nuovoGiorno = i === 0 || giornoDi(messaggi[i - 1].createdAt) !== g;
              return (
                <Fragment key={m.id}>
                  {nuovoGiorno && g && (
                    <p className="pb-1 pt-3 text-center first:pt-0">
                      <span className="rounded-full bg-crm-fondo-2 px-2.5 py-0.5 text-[11px] font-[550] capitalize text-crm-tenue">
                        {relativo(g, oggi) ?? dataLunga(g)}
                      </span>
                    </p>
                  )}
                  {m.id === primoNuovo && (
                    <p className="flex items-center gap-2 py-1 text-[11px] font-[650] text-crm-blu">
                      <span className="h-px flex-1 bg-crm-blu/30" aria-hidden="true" />
                      Nuovi
                      <span className="h-px flex-1 bg-crm-blu/30" aria-hidden="true" />
                    </p>
                  )}
                  <div className={cx("flex", m.daCoach ? "justify-end" : "justify-start")}>
                    <div
                      className={cx(
                        "max-w-[85%] rounded-2xl px-3 py-1.5 text-[13px] leading-5 sm:max-w-[70%]",
                        m.daCoach ? "rounded-br-md bg-[#303030] text-white" : "rounded-bl-md bg-crm-fondo-2 text-crm-ink"
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">{m.testo}</p>
                      <p className={cx("text-right text-[11px] tabular-nums leading-4", m.daCoach ? "text-white/60" : "text-crm-spento")}>
                        {orario(m.createdAt)}
                      </p>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        )}
      </div>

      <form onSubmit={invia} className="border-t border-crm-filo p-3">
        {erroreInvio && (
          <div className="mb-2">
            <Errore testo={erroreInvio} />
          </div>
        )}
        <div className="flex items-end gap-2">
          <textarea
            ref={campo}
            value={testo}
            onChange={(e) => setTesto(e.target.value)}
            onKeyDown={tasti}
            rows={righe}
            placeholder={`Scrivi a ${nome.split(/\s+/)[0] || nome}…`}
            aria-label={`Messaggio per ${nome}`}
            className="crm-campo max-h-40 resize-none"
            disabled={invio}
          />
          <button
            type="submit"
            disabled={!testo.trim() || invio}
            className="crm-btn-primario min-h-9 shrink-0 px-3.5"
            aria-label="Invia il messaggio"
          >
            <Send className="h-4 w-4" />
            <span className="max-sm:hidden">{invio ? "Invio…" : "Invia"}</span>
          </button>
        </div>
        <p className="mt-1.5 text-[11px] leading-4 text-crm-spento max-md:hidden">Invio per mandare, Maiusc+Invio per andare a capo.</p>
      </form>
    </>
  );
}
