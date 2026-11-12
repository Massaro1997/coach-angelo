"use client";

// Un cliente dell'app aperto: testata con accesso (codice, link, WhatsApp) e
// azioni, poi calendario del mese ed editor del giorno toccato. Il modulo del
// giorno vive qui: se ci sono modifiche non salvate, cambiare giorno, chiudere
// o tornare all'elenco chiede prima conferma (dentro la pagina).

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Copy,
  KeyRound,
  MessageCircle,
  Pencil,
  Power,
  PowerOff,
  Trash2,
} from "lucide-react";
import { Badge, Btn, cx } from "../ui";
import type { ClienteApp, DataISO, Giornata, MeseISO } from "@/lib/app-coaching/tipi";
import { meseDi, oggiISO } from "@/lib/app-coaching/date";
import {
  api,
  BASE,
  CAMPO,
  Conferma,
  Errore,
  codiceLeggibile,
  dataLunga,
  linkWhatsApp,
  messaggioAccesso,
  momento,
  testoErrore,
  useCopia,
} from "./comune";
import { daPiano, firma, pulisci, type Modulo } from "./piano";
import ModuloCliente, { type DatiCliente } from "./ModuloCliente";
import Calendario from "./Calendario";
import EditorGiorno from "./EditorGiorno";

type Aperto = { data: DataISO; modulo: Modulo; base: string };
type Azione = { tipo: "giorno"; data: DataISO } | { tipo: "chiudi" } | { tipo: "indietro" };
type Chiesta = "codice" | "disattiva" | "elimina" | null;

/** Modulo e impronta di partenza di un giorno (vuoto se non c'e' piano). */
function apertoDa(data: DataISO, g: Giornata | null | undefined): Aperto {
  const modulo = daPiano(g);
  return { data, modulo, base: firma(pulisci(modulo)) };
}

export default function SchedaCliente({
  cliente,
  appenaCreato,
  onCliente,
  onIndietro,
  onEliminato,
}: {
  cliente: ClienteApp;
  appenaCreato?: boolean;
  onCliente: (c: ClienteApp) => void;
  onIndietro: () => void;
  onEliminato: () => void;
}) {
  /* ------------------------------------------------------- calendario */
  const [oggi, setOggi] = useState<DataISO>(() => oggiISO());
  const [mese, setMese] = useState<MeseISO>(() => meseDi(oggiISO()));
  const [versione, setVersione] = useState(0);
  const [caricato, setCaricato] = useState("");
  const [giornate, setGiornate] = useState<Record<DataISO, Giornata>>({});
  const [erroreMese, setErroreMese] = useState("");
  const chiaveMese = `${mese}#${versione}`;
  const caricando = caricato !== chiaveMese;

  useEffect(() => {
    let vivo = true;
    const chiave = `${mese}#${versione}`;
    api<{ giornate: Giornata[]; oggi: DataISO }>(`${BASE}/${cliente.id}/giornate?mese=${mese}`)
      .then((j) => {
        if (!vivo) return;
        // Tengo in memoria i giorni degli altri mesi: il giorno aperto puo'
        // stare in un mese diverso da quello che si sta guardando.
        setGiornate((prima) => {
          const n: Record<DataISO, Giornata> = {};
          for (const [k, g] of Object.entries(prima)) if (meseDi(k) !== mese) n[k] = g;
          for (const g of j.giornate ?? []) n[g.data] = g;
          return n;
        });
        if (j.oggi) setOggi(j.oggi);
        setErroreMese("");
        setCaricato(chiave);
      })
      .catch((e) => {
        if (!vivo) return;
        setErroreMese(testoErrore(e));
        setCaricato(chiave);
      });
    return () => {
      vivo = false;
    };
  }, [cliente.id, mese, versione]);

  /* ----------------------------------------------------------- editor */
  const [aperto, setAperto] = useState<Aperto | null>(null);
  const [inSospeso, setInSospeso] = useState<Azione | null>(null);
  const sporco = aperto ? firma(pulisci(aperto.modulo)) !== aperto.base : false;

  // Chiudere la scheda del browser con modifiche non salvate: avviso nativo.
  useEffect(() => {
    if (!sporco) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [sporco]);

  function esegui(a: Azione) {
    setInSospeso(null);
    if (a.tipo === "giorno") setAperto(apertoDa(a.data, giornate[a.data]));
    else if (a.tipo === "chiudi") setAperto(null);
    else onIndietro();
  }
  function chiedi(a: Azione) {
    if (a.tipo === "giorno" && aperto?.data === a.data) return;
    if (sporco) setInSospeso(a);
    else esegui(a);
  }

  /* ----------------------------------------------- azioni sul cliente */
  const [modifica, setModifica] = useState(false);
  const [chiesta, setChiesta] = useState<Chiesta>(null);
  const [nomeConferma, setNomeConferma] = useState("");
  const [occupato, setOccupato] = useState(false);
  const [erroreAzione, setErroreAzione] = useState("");
  const [nuovoCodice, setNuovoCodice] = useState(false);
  const [copiato, copia, erroreCopia] = useCopia();

  async function patch(body: Record<string, unknown>) {
    const r = await api<{ cliente: ClienteApp }>(`${BASE}/${cliente.id}`, { method: "PATCH", body });
    onCliente(r.cliente);
  }

  async function azione(fn: () => Promise<void>) {
    setOccupato(true);
    setErroreAzione("");
    try {
      await fn();
      setChiesta(null);
    } catch (e) {
      setErroreAzione(testoErrore(e));
    } finally {
      setOccupato(false);
    }
  }

  async function salvaDati(d: DatiCliente) {
    // campo svuotato = null, cosi' il server lo cancella davvero
    await patch({
      nome: d.nome,
      email: d.email || null,
      telefono: d.telefono || null,
      lingua: d.lingua,
      obiettivo: d.obiettivo || null,
      note: d.note || null,
    });
    setModifica(false);
  }

  const wa = linkWhatsApp(cliente);
  const nomeOk = nomeConferma.trim().toLowerCase() === cliente.nome.trim().toLowerCase();

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => chiedi({ tipo: "indietro" })}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500 hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" /> Tutti i clienti dell&apos;app
      </button>

      {/* ---------------------------------------------------------- testata */}
      <section className="border border-black/10 bg-white">
        <div className="flex flex-wrap items-start gap-x-4 gap-y-3 px-4 py-4 sm:px-5">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-neutral-900">{cliente.nome}</h2>
              <Badge tone="outline">{cliente.lingua === "it" ? "Italiano" : "Tedesco"}</Badge>
              {!cliente.attivo && <Badge tone="red">disattivato</Badge>}
            </div>
            {cliente.obiettivo && <p className="mt-0.5 text-[13px] text-neutral-600">{cliente.obiettivo}</p>}
            <p className="mt-1 text-[12px] text-neutral-400">
              {[
                cliente.telefono,
                cliente.email,
                cliente.ultimoAccesso ? `ultimo accesso ${momento(cliente.ultimoAccesso)}` : "non è ancora entrato nell'app",
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
          {!modifica && (
            <div className="flex flex-wrap gap-1.5">
              <Btn size="sm" variant="outline" onClick={() => {
                  setModifica(true);
                  setChiesta(null);
                }}>
                <Pencil className="h-3 w-3" /> Modifica
              </Btn>
              <Btn size="sm" variant="outline" onClick={() => setChiesta("codice")}>
                <KeyRound className="h-3 w-3" /> Nuovo codice
              </Btn>
              {cliente.attivo ? (
                <Btn size="sm" variant="outline" onClick={() => setChiesta("disattiva")}>
                  <PowerOff className="h-3 w-3" /> Disattiva
                </Btn>
              ) : (
                <Btn size="sm" variant="outline" disabled={occupato} onClick={() => azione(() => patch({ attivo: true }))}>
                  <Power className="h-3 w-3" /> Riattiva
                </Btn>
              )}
              <button
                type="button"
                onClick={() => {
                  setChiesta("elimina");
                  setNomeConferma("");
                }}
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold text-red-600 transition-all hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" /> Elimina
              </button>
            </div>
          )}
        </div>

        {/* conferme e modifica, sotto la testata */}
        {(modifica || chiesta || erroreAzione || appenaCreato || nuovoCodice) && (
          <div className="space-y-3 border-t border-black/[0.07] px-4 py-4 sm:px-5">
            {appenaCreato && !nuovoCodice && (
              <p className="border border-green-600/30 bg-green-50 px-3 py-2 text-[13px] text-green-900">
                Cliente creato. Ora mandagli l&apos;accesso con <b>Manda su WhatsApp</b>, poi scrivi il piano toccando un giorno del calendario.
              </p>
            )}
            {nuovoCodice && (
              <p className="border border-green-600/30 bg-green-50 px-3 py-2 text-[13px] text-green-900">
                Nuovo codice pronto: il vecchio non funziona più. Rimandalo al cliente con <b>Manda su WhatsApp</b>.
              </p>
            )}
            {modifica && (
              <ModuloCliente iniziale={cliente} etichettaSalva="Salva i dati" onSalva={salvaDati} onAnnulla={() => setModifica(false)} />
            )}
            {chiesta === "codice" && (
              <Conferma
                testo={
                  <>
                    Creo un nuovo codice d&apos;accesso? <b>Il codice di adesso smette subito di funzionare</b>: dopo devi rimandare
                    l&apos;accesso al cliente.
                  </>
                }
                conferma="Crea nuovo codice"
                occupato={occupato}
                onConferma={() =>
                  azione(async () => {
                    await patch({ nuovoCodice: true });
                    setNuovoCodice(true);
                  })
                }
                onAnnulla={() => setChiesta(null)}
              />
            )}
            {chiesta === "disattiva" && (
              <Conferma
                testo={
                  <>
                    Disattivo {cliente.nome}? Non può più entrare nell&apos;app finché non lo riattivi. Piani e risposte restano salvati.
                  </>
                }
                conferma="Disattiva"
                occupato={occupato}
                onConferma={() => azione(() => patch({ attivo: false }))}
                onAnnulla={() => setChiesta(null)}
              />
            )}
            {chiesta === "elimina" && (
              <Conferma
                pericolo
                testo={
                  <>
                    Elimino <b>{cliente.nome}</b> con tutti i suoi piani e le sue risposte? Non si può annullare. Se vuoi solo
                    fermarlo, usa <b>Disattiva</b>.
                  </>
                }
                conferma="Elimina per sempre"
                occupato={occupato}
                bloccato={!nomeOk}
                onConferma={() =>
                  azione(async () => {
                    await api(`${BASE}/${cliente.id}`, { method: "DELETE" });
                    onEliminato();
                  })
                }
                onAnnulla={() => setChiesta(null)}
              >
                <label className="block">
                  <span className="mb-1 block text-[12px]">
                    Per confermare scrivi il nome: <b>{cliente.nome}</b>
                  </span>
                  <input
                    value={nomeConferma}
                    onChange={(e) => setNomeConferma(e.target.value)}
                    className={cx(CAMPO, "max-w-sm")}
                    autoComplete="off"
                    aria-label="Nome del cliente per confermare"
                  />
                </label>
              </Conferma>
            )}
            {erroreAzione && <Errore testo={erroreAzione} />}
          </div>
        )}

        {/* ------------------------------------------------------- accesso */}
        <div className="grid gap-px border-t border-black/[0.07] bg-black/[0.07] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="bg-white px-4 py-3 sm:px-5">
            <p className="text-[11px] font-semibold text-neutral-500">Codice d&apos;accesso</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="select-all font-mono text-xl font-bold tracking-[0.12em] text-neutral-900">
                {codiceLeggibile(cliente.codice)}
              </span>
              <BtnCopia fatto={copiato === "codice"} onClick={() => copia("codice", cliente.codice)} etichetta="Copia il codice" />
            </div>
          </div>
          <div className="min-w-0 bg-white px-4 py-3 sm:px-5">
            <p className="text-[11px] font-semibold text-neutral-500">Link d&apos;accesso (entra senza codice)</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="min-w-0 flex-1 select-all truncate text-[13px] text-neutral-800" title={cliente.linkAccesso}>
                {cliente.linkAccesso.replace(/^https?:\/\/(www\.)?/, "")}
              </span>
              <BtnCopia fatto={copiato === "link"} onClick={() => copia("link", cliente.linkAccesso)} etichetta="Copia il link" />
            </div>
          </div>
          <div className="bg-white px-4 py-3 sm:px-5">
            <p className="text-[11px] font-semibold text-neutral-500">
              Messaggio in {cliente.lingua === "it" ? "italiano" : "tedesco"}, con istruzioni per installarla
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] px-3 py-2 text-[12px] font-semibold text-white hover:opacity-90"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Manda su WhatsApp
                </a>
              ) : (
                <span className="text-[12px] text-neutral-400">Aggiungi il telefono (Modifica) per mandarlo su WhatsApp.</span>
              )}
              <button
                type="button"
                onClick={() => copia("messaggio", messaggioAccesso(cliente))}
                className="inline-flex items-center gap-1.5 border border-black/15 px-2.5 py-2 text-[12px] font-semibold text-neutral-700 hover:border-black/30"
              >
                {copiato === "messaggio" ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copiato === "messaggio" ? "Copiato" : "Copia messaggio"}
              </button>
            </div>
          </div>
        </div>
        {erroreCopia && (
          <p className="border-t border-black/[0.07] px-4 py-2 text-[12px] text-red-600 sm:px-5">{erroreCopia}</p>
        )}

        {cliente.note && (
          <p className="whitespace-pre-line border-t border-black/[0.07] px-4 py-3 text-[12px] leading-relaxed text-neutral-600 sm:px-5">
            <span className="font-semibold text-neutral-800">Note interne: </span>
            {cliente.note}
          </p>
        )}
      </section>

      {/* ------------------------------------------- calendario + editor */}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:items-start">
        <div className="space-y-3">
          {erroreMese && <Errore testo={erroreMese} onRiprova={() => setVersione((v) => v + 1)} />}
          <Calendario
            mese={mese}
            oggi={oggi}
            giornate={giornate}
            aperto={aperto?.data ?? null}
            caricando={caricando}
            onMese={setMese}
            onGiorno={(d) => chiedi({ tipo: "giorno", data: d })}
          />
        </div>

        {aperto ? (
          <EditorGiorno
            key={aperto.data}
            clienteId={cliente.id}
            data={aperto.data}
            modulo={aperto.modulo}
            onModulo={(f) => setAperto((a) => (a ? { ...a, modulo: f(a.modulo) } : a))}
            giornata={giornate[aperto.data] ?? null}
            sporco={sporco}
            avviso={
              inSospeso && (
                <Conferma
                  testo={
                    <>
                      Ci sono modifiche non salvate su <b className="capitalize">{dataLunga(aperto.data)}</b>. Le butto via?
                    </>
                  }
                  conferma="Butta le modifiche"
                  annulla="Resta qui"
                  onConferma={() => esegui(inSospeso)}
                  onAnnulla={() => setInSospeso(null)}
                />
              )
            }
            onSalvato={(g) => {
              setInSospeso(null);
              setGiornate((x) => ({ ...x, [aperto.data]: g }));
              setAperto(apertoDa(aperto.data, g));
            }}
            onEliminato={() => {
              setInSospeso(null);
              setGiornate((x) => {
                const n = { ...x };
                delete n[aperto.data];
                return n;
              });
              setAperto(apertoDa(aperto.data, null));
            }}
            onChiudi={() => chiedi({ tipo: "chiudi" })}
            onCopiato={() => setVersione((v) => v + 1)}
          />
        ) : (
          <div className="hidden flex-col items-center justify-center border border-dashed border-black/15 bg-white/60 px-8 py-16 text-center xl:flex">
            <CalendarDays className="h-8 w-8 text-neutral-300" />
            <p className="mt-3 text-sm font-bold text-neutral-700">Tocca un giorno del calendario</p>
            <p className="mt-1 max-w-sm text-xs leading-relaxed text-neutral-400">
              Qui scrivete allenamento e alimentazione di quel giorno. Con «Copia e ripeti» lo portate sugli altri giorni o sulle
              settimane dopo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BtnCopia({ fatto, onClick, etichetta }: { fatto: boolean; onClick: () => void; etichetta: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={etichetta}
      aria-label={etichetta}
      className="inline-flex shrink-0 items-center gap-1 border border-black/15 px-2 py-1 text-[11px] font-semibold text-neutral-700 hover:border-black/30"
    >
      {fatto ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
      {fatto ? "Copiato" : "Copia"}
    </button>
  );
}
