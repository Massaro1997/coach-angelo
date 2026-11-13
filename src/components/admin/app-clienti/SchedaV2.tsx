"use client";

// Pezzi v2 della scheda cliente: contratto collegato (da cui l'app prende ore
// incluse, abbonamento e rate), riga in testata con contratto, prossima ora
// 1:1 e messaggi, elenco delle prossime ore e misure del corpo con il peso.

import { useEffect, useState, type FormEvent } from "react";
import { CalendarCheck, Check, FileSignature, Link2, MessageCircle, Ruler, X } from "lucide-react";
import { Card, EmptyState, cx } from "../ui";
import type { DataISO } from "@/lib/app-coaching/tipi";
import type { ContrattoCollegabile, Misura, PrenotazioneAdmin, ThreadAdmin } from "@/lib/app-coaching/tipi-v2";
import { api, Avviso, BASE, Campo, Errore, dataBreve, dataCorta, testoErrore } from "./comune";
import {
  API,
  STATO,
  attiva,
  badgeContratto,
  dataOra,
  perOrdine,
  relativo,
  type ClienteAppV2,
  type Prenotazioni,
} from "./dati-v2";
import GraficoPeso from "./GraficoPeso";

export type ContrattoBreve = { numero: string; titolo: string; stato: string };

/* ------------------------------------------------------ riga in testata */

const CELLA = "min-w-0 bg-white px-4 py-3 sm:px-5";
const ETICHETTA = "text-[12px] font-[550] leading-4 text-crm-tenue";

export function RigaV2({
  contratto,
  collegato,
  prossima,
  oggi,
  thread,
  onContratto,
  onApriPrenotazioni,
  onApriMessaggi,
}: {
  contratto: ContrattoBreve | null;
  /** c'e' un preventivoId anche se i dettagli non sono (ancora) arrivati */
  collegato: boolean;
  prossima: PrenotazioneAdmin | null;
  oggi: DataISO;
  thread: ThreadAdmin | null;
  onContratto: () => void;
  onApriPrenotazioni: () => void;
  onApriMessaggi: () => void;
}) {
  const nonLetti = thread?.nonLetti ?? 0;
  const ultimo = thread?.ultimo ?? null;
  const rel = prossima ? relativo(prossima.data, oggi) : null;

  return (
    <div className="grid gap-px border-t border-crm-filo bg-crm-filo md:grid-cols-3">
      {/* contratto */}
      <div className={CELLA}>
        <p className={ETICHETTA}>Contratto collegato</p>
        <div className="mt-1.5 flex items-start gap-2">
          <div className="min-w-0 flex-1">
            {contratto ? (
              <>
                <p className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[13px] font-[650] tabular-nums text-crm-ink">{contratto.numero}</span>
                  <span className={cx("crm-badge", badgeContratto(contratto.stato))}>{contratto.stato}</span>
                </p>
                <p className="truncate text-[12px] leading-4 text-crm-tenue" title={contratto.titolo}>
                  {contratto.titolo}
                </p>
              </>
            ) : collegato ? (
              <p className="text-[13px] text-crm-testo">Collegato</p>
            ) : (
              <>
                <p className="text-[13px] text-crm-testo">Nessuno</p>
                <p className="text-[12px] leading-4 text-crm-tenue">Senza contratto le ore 1:1 incluse sono 0.</p>
              </>
            )}
          </div>
          <button type="button" onClick={onContratto} className="crm-btn shrink-0 max-sm:min-h-9">
            <Link2 className="h-3.5 w-3.5" /> {contratto || collegato ? "Cambia" : "Collega"}
          </button>
        </div>
      </div>

      {/* prossima ora */}
      <div className={CELLA}>
        <p className={ETICHETTA}>Prossima ora 1:1</p>
        <div className="mt-1.5 flex items-start gap-2">
          <div className="min-w-0 flex-1">
            {prossima ? (
              <>
                <p className="flex flex-wrap items-center gap-1.5 text-[13px] font-[650] text-crm-ink">
                  <span className="capitalize">{rel ?? dataCorta(prossima.data)}</span>
                  <span className="tabular-nums">
                    {prossima.inizio}–{prossima.fine}
                  </span>
                  {prossima.stato !== "confermata" && (
                    <span className={cx("crm-badge", STATO[prossima.stato].badge)}>{STATO[prossima.stato].testo}</span>
                  )}
                </p>
                <p className="truncate text-[12px] leading-4 text-crm-tenue">
                  {[rel ? dataCorta(prossima.data) : null, prossima.luogo, prossima.tipo === "extra" ? "ora extra" : "inclusa"]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </>
            ) : (
              <p className="text-[13px] text-crm-testo">Nessuna nelle prossime 4 settimane</p>
            )}
          </div>
          <button type="button" onClick={onApriPrenotazioni} className="crm-btn-piatto shrink-0 max-sm:min-h-9">
            <CalendarCheck className="h-3.5 w-3.5" /> Agenda
          </button>
        </div>
      </div>

      {/* messaggi */}
      <div className={CELLA}>
        <p className={ETICHETTA}>Messaggi</p>
        <div className="mt-1.5 flex items-start gap-2">
          <div className="min-w-0 flex-1">
            {ultimo ? (
              <>
                <p className="flex items-center gap-1.5">
                  {nonLetti > 0 ? (
                    <span className="crm-badge crm-badge-info">{nonLetti === 1 ? "1 da leggere" : `${nonLetti} da leggere`}</span>
                  ) : (
                    <span className="text-[13px] text-crm-testo">Tutto letto</span>
                  )}
                  <span className="text-[12px] text-crm-tenue">{dataOra(ultimo.createdAt, oggi)}</span>
                </p>
                <p className="truncate text-[12px] leading-4 text-crm-tenue" title={ultimo.testo}>
                  {ultimo.daCoach ? "Tu: " : ""}
                  {ultimo.testo}
                </p>
              </>
            ) : (
              <p className="text-[13px] text-crm-testo">Ancora nessun messaggio</p>
            )}
          </div>
          <button
            type="button"
            onClick={onApriMessaggi}
            className={cx(nonLetti > 0 ? "crm-btn-primario" : "crm-btn", "shrink-0 max-sm:min-h-9")}
          >
            <MessageCircle className="h-3.5 w-3.5" /> {ultimo ? "Apri" : "Scrivi"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------- contratto collegato */

const norma = (s: string | null | undefined) =>
  (s ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Perche' un contratto e' suggerito per questo cliente (stessa email, o almeno stesso nome). */
function motivo(c: ContrattoCollegabile, cliente: ClienteAppV2): string | null {
  if (cliente.email && norma(c.clienteEmail) === norma(cliente.email)) return "stessa email";
  if (norma(c.clienteNome) === norma(cliente.nome)) return "stesso nome";
  return null;
}

const etichetta = (c: ContrattoCollegabile) => [c.numero, c.clienteNome, c.titolo, c.stato].filter(Boolean).join(" · ");

export function ModuloContratto({
  cliente,
  onSalva,
  onAnnulla,
}: {
  cliente: ClienteAppV2;
  /** lancia se il server rifiuta: il modulo mostra l'errore e resta aperto */
  onSalva: (preventivoId: string | null, scelto: ContrattoCollegabile | null) => Promise<void>;
  onAnnulla: () => void;
}) {
  const [contratti, setContratti] = useState<ContrattoCollegabile[] | null>(null);
  const [erroreLista, setErroreLista] = useState("");
  const [versione, setVersione] = useState(0);
  const [scelto, setScelto] = useState<string>(cliente.preventivoId ?? "");
  const [salvando, setSalvando] = useState(false);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    let vivo = true;
    api<{ contratti: ContrattoCollegabile[] }>(API.contratti)
      .then((j) => {
        if (!vivo) return;
        const lista = j.contratti ?? [];
        setContratti(lista);
        setErroreLista("");
        // nessun contratto ancora: parto gia' da quello con la stessa email
        if (!cliente.preventivoId) {
          const s = lista.find((c) => motivo(c, cliente) === "stessa email");
          if (s) setScelto(s.id);
        }
      })
      .catch((e) => vivo && setErroreLista(testoErrore(e)));
    return () => {
      vivo = false;
    };
    // il cliente non cambia mentre il modulo e' aperto: in pratica si carica
    // all'apertura e su Riprova
  }, [cliente, versione]);

  const lista = contratti ?? [];
  const suggeriti = lista.filter((c) => motivo(c, cliente));
  const altri = lista
    .filter((c) => !motivo(c, cliente))
    .sort((a, b) => Number(b.stato === "firmato") - Number(a.stato === "firmato") || b.numero.localeCompare(a.numero));
  const sceltoC = lista.find((c) => c.id === scelto) ?? null;
  const consigliato = suggeriti.find((c) => motivo(c, cliente) === "stessa email") ?? null;
  const invariato = (cliente.preventivoId ?? "") === scelto;

  async function invia(e: FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErrore("");
    try {
      await onSalva(scelto || null, sceltoC);
    } catch (err) {
      setErrore(testoErrore(err));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={invia} className="space-y-3">
      <p className="text-[13px] leading-5 text-crm-testo">
        Dal contratto collegato l&apos;app prende le <b className="font-[650]">ore 1:1 incluse</b> ogni mese, l&apos;abbonamento e le
        rate che il cliente vede nello shop.
      </p>

      {erroreLista ? (
        <Errore testo={erroreLista} onRiprova={() => setVersione((v) => v + 1)} />
      ) : contratti === null ? (
        <p className="text-[13px] text-crm-tenue">Carico i contratti…</p>
      ) : (
        <>
          {consigliato && consigliato.id !== scelto && (
            <Avviso tono="attesa" className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="min-w-0 flex-1">
                <b className="font-[650]">{consigliato.numero}</b> ha la stessa email del cliente ({consigliato.clienteEmail}).
              </span>
              <button type="button" onClick={() => setScelto(consigliato.id)} className="crm-btn shrink-0 max-sm:min-h-9">
                Usa questo
              </button>
            </Avviso>
          )}
          <Campo etichetta="Contratto">
            <select value={scelto} onChange={(e) => setScelto(e.target.value)} className="crm-campo" disabled={salvando}>
              <option value="">Nessun contratto</option>
              {suggeriti.length > 0 && (
                <optgroup label="Suggeriti per questo cliente">
                  {suggeriti.map((c) => (
                    <option key={c.id} value={c.id}>
                      {etichetta(c)} ({motivo(c, cliente)})
                    </option>
                  ))}
                </optgroup>
              )}
              <optgroup label={suggeriti.length ? "Tutti gli altri" : "Tutti i contratti"}>
                {altri.map((c) => (
                  <option key={c.id} value={c.id}>
                    {etichetta(c)}
                  </option>
                ))}
              </optgroup>
            </select>
          </Campo>
          {lista.length === 0 && (
            <p className="text-[12px] leading-4 text-crm-tenue">Non c&apos;è ancora nessun contratto: crealo nella sezione Contratti.</p>
          )}
          {sceltoC && (
            <div className="rounded-xl bg-crm-fondo px-3 py-2.5 text-[13px] leading-5">
              <p className="flex flex-wrap items-center gap-2">
                <FileSignature className="h-3.5 w-3.5 text-crm-spento" aria-hidden="true" />
                <span className="font-[650] tabular-nums text-crm-ink">{sceltoC.numero}</span>
                <span className={cx("crm-badge", badgeContratto(sceltoC.stato))}>{sceltoC.stato}</span>
              </p>
              <p className="mt-0.5 text-crm-testo">{sceltoC.titolo}</p>
              <p className="text-[12px] leading-4 text-crm-tenue">
                {[sceltoC.clienteNome, sceltoC.clienteEmail].filter(Boolean).join(" · ")}
              </p>
            </div>
          )}
        </>
      )}

      {errore && <Errore testo={errore} />}
      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={salvando || contratti === null || invariato} className="crm-btn-primario max-sm:min-h-9">
          <Check className="h-3.5 w-3.5" /> {salvando ? "Salvo…" : scelto ? "Collega il contratto" : "Scollega"}
        </button>
        <button type="button" onClick={onAnnulla} disabled={salvando} className="crm-btn-piatto disabled:opacity-50 max-sm:min-h-9">
          <X className="h-3.5 w-3.5" /> Annulla
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------ prossime ore 1:1 */

export function ProssimeOre({
  clienteId,
  pren,
  onApriPrenotazioni,
}: {
  clienteId: string;
  pren: Prenotazioni;
  onApriPrenotazioni: () => void;
}) {
  const { lista, oggi, pronto, errore, ricarica } = pren;
  const mie = lista.filter((p) => p.clienteId === clienteId);
  const prossime = mie.filter((p) => p.data >= oggi && attiva(p)).sort(perOrdine);
  const daSegnare = mie.filter((p) => p.data < oggi && p.stato === "confermata").length;
  const svolte = mie.filter((p) => p.stato === "svolta").length;

  return (
    <Card
      title="Prossime ore 1:1"
      subtitle={`Prossime 4 settimane · ${svolte === 1 ? "1 svolta" : `${svolte} svolte`} negli ultimi 14 giorni`}
      action={
        <button type="button" onClick={onApriPrenotazioni} className="crm-btn max-sm:min-h-9">
          Agenda
        </button>
      }
    >
      {errore && <Errore testo={errore} onRiprova={ricarica} />}
      {daSegnare > 0 && (
        <Avviso tono="attesa" className="mb-3">
          {daSegnare === 1 ? "1 ora passata è" : `${daSegnare} ore passate sono`} ancora da segnare svolte: le trovi in cima
          all&apos;agenda.
        </Avviso>
      )}
      {!pronto ? (
        <p className="text-[13px] text-crm-tenue">Carico le prenotazioni…</p>
      ) : prossime.length === 0 ? (
        <p className="text-[13px] leading-5 text-crm-tenue">
          Nessuna ora prenotata. Il cliente prenota dall&apos;app negli orari liberi, oppure la crei tu da Prenotazioni.
        </p>
      ) : (
        <ul className="-my-1">
          {prossime.slice(0, 6).map((p) => {
            const rel = relativo(p.data, oggi);
            return (
              <li key={p.id} className="flex items-center gap-3 border-b border-crm-filo py-2 last:border-b-0">
                <div className="w-[88px] shrink-0">
                  <p className="text-[13px] font-[650] capitalize leading-5 text-crm-ink">{rel ?? dataCorta(p.data)}</p>
                  <p className="text-[12px] tabular-nums leading-4 text-crm-tenue">
                    {p.inizio}–{p.fine}
                  </p>
                </div>
                <p className="min-w-0 flex-1 truncate text-[12px] leading-4 text-crm-tenue">
                  {[rel ? dataCorta(p.data) : null, p.luogo, p.tipo === "extra" ? "ora extra" : "inclusa"].filter(Boolean).join(" · ")}
                </p>
                <span className={cx("crm-badge shrink-0", STATO[p.stato].badge)}>{STATO[p.stato].testo}</span>
              </li>
            );
          })}
          {prossime.length > 6 && (
            <li className="pt-2 text-[12px] text-crm-tenue">e altre {prossime.length - 6} nell&apos;agenda</li>
          )}
        </ul>
      )}
    </Card>
  );
}

/* ---------------------------------------------------------------- misure */

const COLONNE: { k: keyof Misura; titolo: string; unita: string }[] = [
  { k: "peso", titolo: "Peso", unita: "kg" },
  { k: "vita", titolo: "Vita", unita: "cm" },
  { k: "fianchi", titolo: "Fianchi", unita: "cm" },
  { k: "petto", titolo: "Petto", unita: "cm" },
  { k: "braccio", titolo: "Braccio", unita: "cm" },
  { k: "coscia", titolo: "Coscia", unita: "cm" },
  { k: "grasso", titolo: "Grasso", unita: "%" },
];

export const numero = (n: number, decimali = 1) => n.toLocaleString("it-IT", { maximumFractionDigits: decimali });

/** "−3,2" / "+0,5" / "0": il segno meno tipografico si legge meglio. */
const differenza = (n: number) => (Math.abs(n) < 0.05 ? "0" : `${n > 0 ? "+" : "−"}${numero(Math.abs(n))}`);

export function Misure({ clienteId }: { clienteId: string }) {
  const [misure, setMisure] = useState<Misura[] | null>(null);
  const [errore, setErrore] = useState("");
  const [versione, setVersione] = useState(0);
  const [tutte, setTutte] = useState(false);

  useEffect(() => {
    let vivo = true;
    api<{ misure: Misura[] }>(`${BASE}/${clienteId}/misure`)
      .then((j) => {
        if (!vivo) return;
        // dalla piu' vecchia: l'ordine del server qui non conta
        setMisure([...(j.misure ?? [])].sort((a, b) => a.data.localeCompare(b.data)));
        setErrore("");
      })
      .catch((e) => vivo && setErrore(testoErrore(e)));
    return () => {
      vivo = false;
    };
  }, [clienteId, versione]);

  const lista = misure ?? [];
  const pesi = lista.filter((m) => m.peso !== null).map((m) => ({ data: m.data, valore: m.peso as number }));
  // solo le colonne con almeno un valore: sul telefono la tabella resta stretta
  const colonne = COLONNE.filter((c) => lista.some((m) => m[c.k] !== null));
  const recenti = [...lista].reverse();
  const visibili = tutte ? recenti : recenti.slice(0, 8);
  const primo = pesi[0];
  const ultimo = pesi[pesi.length - 1];

  return (
    <Card title="Misure" subtitle="Le segna il cliente nell'app, in Progressi.">
      {errore ? (
        <Errore testo={errore} onRiprova={() => setVersione((v) => v + 1)} />
      ) : misure === null ? (
        <p className="text-[13px] text-crm-tenue">Carico le misure…</p>
      ) : lista.length === 0 ? (
        <EmptyState
          titolo="Ancora nessuna misura."
          testo="Quando il cliente segna peso o circonferenze nell'app, qui vedi la tabella e l'andamento del peso."
          icon={<Ruler />}
        />
      ) : (
        <div className="space-y-4">
          {pesi.length > 0 && (
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-xl font-[650] leading-7 tracking-[-0.02em] tabular-nums text-crm-ink">
                  {numero(ultimo.valore)} kg
                </span>
                {pesi.length > 1 && (
                  <span
                    className={cx(
                      "text-[13px] font-[550] tabular-nums",
                      ultimo.valore < primo.valore ? "text-crm-verde" : "text-crm-testo"
                    )}
                  >
                    {differenza(ultimo.valore - primo.valore)} kg dal {dataBreve(primo.data)}
                  </span>
                )}
                <span className="text-[12px] text-crm-tenue">ultimo peso, {dataBreve(ultimo.data)}</span>
              </div>
              {pesi.length > 1 ? (
                <GraficoPeso punti={pesi} className="mt-3" />
              ) : (
                <p className="mt-1 text-[12px] text-crm-tenue">Con due pesi segnati compare il grafico.</p>
              )}
            </div>
          )}

          <div className="-mx-4 overflow-x-auto px-4">
            <table className="crm-tabella min-w-[420px]">
              <thead>
                <tr>
                  <th>Data</th>
                  {colonne.map((c) => (
                    <th key={c.k} className="num">
                      {c.titolo} <span className="font-normal text-crm-spento">{c.unita}</span>
                    </th>
                  ))}
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {visibili.map((m) => (
                  <tr key={m.id}>
                    <td className="whitespace-nowrap capitalize">{dataCorta(m.data)}</td>
                    {colonne.map((c) => {
                      const v = m[c.k];
                      return (
                        <td key={c.k} className="num">
                          {typeof v === "number" ? numero(v) : <span className="text-crm-spento">—</span>}
                        </td>
                      );
                    })}
                    <td className="max-w-[220px] truncate text-crm-tenue" title={m.nota ?? undefined}>
                      {m.nota || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {recenti.length > 8 && (
            <button type="button" onClick={() => setTutte((t) => !t)} className="crm-btn-piatto max-sm:min-h-9">
              {tutte ? "Mostra solo le ultime 8" : `Mostra tutte (${recenti.length})`}
            </button>
          )}
        </div>
      )}
    </Card>
  );
}
