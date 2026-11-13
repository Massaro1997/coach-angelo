"use client";

// Un cliente dell'app aperto: testata con accesso (codice, link, WhatsApp) e
// azioni, poi calendario del mese ed editor del giorno toccato. Il modulo del
// giorno vive qui: se ci sono modifiche non salvate, cambiare giorno, chiudere
// o tornare all'elenco chiede prima conferma (dentro la pagina).
// v2: in testata contratto collegato, prossima ora 1:1 e messaggi; sotto il
// calendario le prossime ore e le misure (pezzi in SchedaV2.tsx).

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
import { cx } from "../ui";
import type { ClienteApp, DataISO, Giornata, MeseISO } from "@/lib/app-coaching/tipi";
import { meseDi, oggiISO } from "@/lib/app-coaching/date";
import {
  api,
  Avviso,
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
import type { ContrattoCollegabile, ThreadAdmin } from "@/lib/app-coaching/tipi-v2";
import { attiva, perOrdine, type ClienteAppV2, type Prenotazioni } from "./dati-v2";
import { Misure, ModuloContratto, ProssimeOre, RigaV2, type ContrattoBreve } from "./SchedaV2";

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
  prenotazioni,
  thread,
  onApriMessaggi,
  onApriPrenotazioni,
  onCliente,
  onIndietro,
  onEliminato,
}: {
  cliente: ClienteApp;
  appenaCreato?: boolean;
  /** tutte le ore 1:1 caricate dal contenitore: qui si filtrano quelle del cliente */
  prenotazioni: Prenotazioni;
  thread: ThreadAdmin | null;
  onApriMessaggi: () => void;
  onApriPrenotazioni: () => void;
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

  /* --------------------------------------------- v2: contratto e ore 1:1 */
  const [contrattoAperto, setContrattoAperto] = useState(false);
  // dettagli del contratto appena collegato, se la risposta del server non li porta
  const [contrattoLocale, setContrattoLocale] = useState<ContrattoBreve | null>(null);
  const v2 = cliente as ClienteAppV2;
  const contratto: ContrattoBreve | null =
    v2.contratto !== undefined ? v2.contratto : v2.preventivoId ? contrattoLocale : null;
  const prossima =
    prenotazioni.lista
      .filter((p) => p.clienteId === cliente.id && p.data >= prenotazioni.oggi && attiva(p))
      .sort(perOrdine)[0] ?? null;

  async function collegaContratto(id: string | null, scelto: ContrattoCollegabile | null) {
    await patch({ preventivoId: id });
    setContrattoLocale(scelto ? { numero: scelto.numero, titolo: scelto.titolo, stato: scelto.stato } : null);
    setContrattoAperto(false);
  }

  const wa = linkWhatsApp(cliente);
  const nomeOk = nomeConferma.trim().toLowerCase() === cliente.nome.trim().toLowerCase();

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => chiedi({ tipo: "indietro" })}
        className="crm-btn-piatto -ml-2 text-[13px] text-crm-tenue hover:text-crm-ink"
      >
        <ArrowLeft className="h-4 w-4" /> Tutti i clienti dell&apos;app
      </button>

      {/* ---------------------------------------------------------- testata */}
      <section className="crm-card">
        <div className="flex flex-wrap items-start gap-x-4 gap-y-3 p-4 sm:px-5">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[20px] font-[650] leading-7 tracking-[-0.02em] text-crm-ink">{cliente.nome}</h2>
              <span className="crm-badge">{cliente.lingua === "it" ? "Italiano" : "Tedesco"}</span>
              {!cliente.attivo && <span className="crm-badge crm-badge-errore">disattivato</span>}
            </div>
            {cliente.obiettivo && <p className="mt-0.5 text-[13px] leading-5 text-crm-testo">{cliente.obiettivo}</p>}
            <p className="mt-1 text-[12px] leading-4 text-crm-tenue">
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
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setModifica(true);
                  setChiesta(null);
                }}
                className="crm-btn max-sm:min-h-9"
              >
                <Pencil className="h-3.5 w-3.5" /> Modifica
              </button>
              <button type="button" onClick={() => setChiesta("codice")} className="crm-btn max-sm:min-h-9">
                <KeyRound className="h-3.5 w-3.5" /> Nuovo codice
              </button>
              {cliente.attivo ? (
                <button type="button" onClick={() => setChiesta("disattiva")} className="crm-btn max-sm:min-h-9">
                  <PowerOff className="h-3.5 w-3.5" /> Disattiva
                </button>
              ) : (
                <button
                  type="button"
                  disabled={occupato}
                  onClick={() => azione(() => patch({ attivo: true }))}
                  className="crm-btn max-sm:min-h-9"
                >
                  <Power className="h-3.5 w-3.5" /> Riattiva
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setChiesta("elimina");
                  setNomeConferma("");
                }}
                className="crm-btn-piatto text-crm-rosso hover:bg-[#fff1f1] max-sm:min-h-9"
              >
                <Trash2 className="h-3.5 w-3.5" /> Elimina
              </button>
            </div>
          )}
        </div>

        {/* conferme e modifica, sotto la testata */}
        {(modifica || chiesta || erroreAzione || appenaCreato || nuovoCodice || contrattoAperto) && (
          <div className="space-y-3 border-t border-crm-filo p-4 sm:px-5">
            {contrattoAperto && (
              <div>
                <p className="mb-2 text-[13px] font-[650] leading-5 text-crm-ink">Contratto collegato</p>
                <ModuloContratto cliente={v2} onSalva={collegaContratto} onAnnulla={() => setContrattoAperto(false)} />
              </div>
            )}
            {appenaCreato && !nuovoCodice && (
              <Avviso>
                Cliente creato. Ora mandagli l&apos;accesso con <b className="font-[650]">Manda su WhatsApp</b>, poi scrivi il piano toccando un giorno del calendario.
              </Avviso>
            )}
            {nuovoCodice && (
              <Avviso>
                Nuovo codice pronto: il vecchio non funziona più. Rimandalo al cliente con <b className="font-[650]">Manda su WhatsApp</b>.
              </Avviso>
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
                  <span className="mb-1 block text-[13px]">
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
        <div className="grid gap-px border-t border-crm-filo bg-crm-filo md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="bg-white px-4 py-3 sm:px-5">
            <p className="text-[12px] font-[550] leading-4 text-crm-tenue">Codice d&apos;accesso</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="select-all font-mono text-xl font-[650] tracking-[0.12em] text-crm-ink">
                {codiceLeggibile(cliente.codice)}
              </span>
              <BtnCopia fatto={copiato === "codice"} onClick={() => copia("codice", cliente.codice)} etichetta="Copia il codice" />
            </div>
          </div>
          <div className="min-w-0 bg-white px-4 py-3 sm:px-5">
            <p className="text-[12px] font-[550] leading-4 text-crm-tenue">Link d&apos;accesso (entra senza codice)</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="min-w-0 flex-1 select-all truncate text-[13px] text-crm-testo" title={cliente.linkAccesso}>
                {cliente.linkAccesso.replace(/^https?:\/\/(www\.)?/, "")}
              </span>
              <BtnCopia fatto={copiato === "link"} onClick={() => copia("link", cliente.linkAccesso)} etichetta="Copia il link" />
            </div>
          </div>
          <div className="bg-white px-4 py-3 sm:px-5">
            <p className="text-[12px] font-[550] leading-4 text-crm-tenue">
              Messaggio in {cliente.lingua === "it" ? "italiano" : "tedesco"}, con istruzioni per installarla
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-[28px] items-center gap-1.5 rounded-[10px] bg-[#25D366] px-3 py-1 text-[12px] font-[650] leading-4 text-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.16),0_1px_2px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#1fbf5b] max-sm:min-h-9"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Manda su WhatsApp
                </a>
              ) : (
                <span className="text-[12px] leading-4 text-crm-tenue">Aggiungi il telefono (Modifica) per mandarlo su WhatsApp.</span>
              )}
              <button
                type="button"
                onClick={() => copia("messaggio", messaggioAccesso(cliente))}
                className="crm-btn max-sm:min-h-9"
              >
                {copiato === "messaggio" ? <Check className="h-3.5 w-3.5 text-crm-verde" /> : <Copy className="h-3.5 w-3.5" />}
                {copiato === "messaggio" ? "Copiato" : "Copia messaggio"}
              </button>
            </div>
          </div>
        </div>
        {erroreCopia && (
          <p className="border-t border-crm-filo px-4 py-2 text-[12px] text-crm-rosso sm:px-5">{erroreCopia}</p>
        )}

        {/* --------------------------- v2: contratto, prossima ora, messaggi */}
        <RigaV2
          contratto={contratto}
          collegato={!!v2.preventivoId}
          prossima={prossima}
          oggi={prenotazioni.oggi}
          thread={thread}
          onContratto={() => setContrattoAperto(true)}
          onApriPrenotazioni={onApriPrenotazioni}
          onApriMessaggi={onApriMessaggi}
        />

        {cliente.note && (
          <p className="whitespace-pre-line border-t border-crm-filo bg-crm-fondo px-4 py-3 text-[13px] leading-5 text-crm-testo sm:px-5">
            <span className="font-[650] text-crm-ink">Note interne: </span>
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
          <div className="hidden flex-col items-center justify-center rounded-[20px] bg-white px-8 py-16 text-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] xl:flex">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-crm-filo text-crm-spento">
              <CalendarDays className="h-7 w-7" />
            </span>
            <p className="mt-4 text-sm font-[650] text-crm-ink">Tocca un giorno del calendario</p>
            <p className="mt-1 max-w-sm text-[13px] leading-5 text-crm-tenue">
              Qui scrivete allenamento e alimentazione di quel giorno. Con «Copia e ripeti» lo portate sugli altri giorni o sulle
              settimane dopo.
            </p>
          </div>
        )}
      </div>

      {/* ------------------------------------- v2: prossime ore e misure */}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:items-start">
        <ProssimeOre clienteId={cliente.id} pren={prenotazioni} onApriPrenotazioni={onApriPrenotazioni} />
        <Misure clienteId={cliente.id} />
      </div>
    </div>
  );
}

function BtnCopia({ fatto, onClick, etichetta }: { fatto: boolean; onClick: () => void; etichetta: string }) {
  return (
    <button type="button" onClick={onClick} title={etichetta} aria-label={etichetta} className="crm-btn shrink-0 px-2.5 max-sm:min-h-8">
      {fatto ? <Check className="h-3.5 w-3.5 text-crm-verde" /> : <Copy className="h-3.5 w-3.5" />}
      {fatto ? "Copiato" : "Copia"}
    </button>
  );
}
