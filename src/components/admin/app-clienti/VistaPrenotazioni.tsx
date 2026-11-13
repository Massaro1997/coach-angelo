"use client";

// Linguetta Prenotazioni: agenda delle ore 1:1 delle prossime 4 settimane,
// giorno per giorno. In cima le ore passate (ultimi 14 giorni) ancora
// «confermata»: vanno segnate svolte, cosi' il conteggio delle ore del
// cliente torna. Azioni: Svolta, Annulla (conferma dentro la pagina),
// Riattiva; Nuova prenotazione per chi chiama o scrive su WhatsApp.

import { useState } from "react";
import { CalendarCheck, CalendarPlus, Check, RefreshCw, RotateCcw, X } from "lucide-react";
import { Card, EmptyState, Stat, cx } from "../ui";
import type { DataISO } from "@/lib/app-coaching/tipi";
import type { PrenotazioneAdmin, StatoPrenotazione } from "@/lib/app-coaching/tipi-v2";
import { aggiungiGiorni } from "@/lib/app-coaching/date";
import { api, Avviso, Conferma, Errore, dataCorta, dataLunga, testoErrore } from "./comune";
import { API, GIORNI_AVANTI, STATO, attiva, perOrdine, relativo, type Prenotazioni } from "./dati-v2";
import ModuloPrenotazione from "./ModuloPrenotazione";

const ore = (n: number) => (n === 1 ? "1 ora" : `${n} ore`);

/** Agenda raggruppata per giorno, gia' in ordine. */
function perGiorno(lista: PrenotazioneAdmin[]): { data: DataISO; voci: PrenotazioneAdmin[] }[] {
  const out: { data: DataISO; voci: PrenotazioneAdmin[] }[] = [];
  for (const p of lista) {
    const g = out[out.length - 1];
    if (g && g.data === p.data) g.voci.push(p);
    else out.push({ data: p.data, voci: [p] });
  }
  return out;
}

export default function VistaPrenotazioni({ pren }: { pren: Prenotazioni }) {
  const { lista, oggi, pronto, caricando, errore, ricarica, metti } = pren;
  const [annullate, setAnnullate] = useState(false);
  const [nuova, setNuova] = useState(false);
  const [creata, setCreata] = useState<PrenotazioneAdmin | null>(null);
  const [chiesta, setChiesta] = useState<string | null>(null); // riga con «Annullo?» aperto
  const [inCorso, setInCorso] = useState<string | null>(null); // riga che sta salvando
  const [erroreRiga, setErroreRiga] = useState<{ id: string; testo: string } | null>(null);
  const [tutte, setTutte] = useState(""); // «Segno 2 di 5…»
  const [erroreTutte, setErroreTutte] = useState("");

  const ultimo = aggiungiGiorni(oggi, GIORNI_AVANTI);
  const daSegnare = lista.filter((p) => p.data < oggi && p.stato === "confermata").sort(perOrdine);
  const future = lista.filter((p) => p.data >= oggi && p.data <= ultimo);
  const agenda = perGiorno(future.filter((p) => annullate || p.stato !== "annullata").sort(perOrdine));
  const nAnnullate = future.filter((p) => p.stato === "annullata").length;
  const settimana = future.filter((p) => attiva(p) && p.data <= aggiungiGiorni(oggi, 6)).length;
  const daPagare = future.filter((p) => p.stato === "da pagare").length;

  async function cambia(p: PrenotazioneAdmin, stato: StatoPrenotazione) {
    setInCorso(p.id);
    setErroreRiga(null);
    try {
      const r = await api<{ prenotazione: PrenotazioneAdmin }>(`${API.prenotazioni}/${p.id}`, { method: "PATCH", body: { stato } });
      metti({ ...p, ...r.prenotazione });
      setChiesta(null);
    } catch (e) {
      setErroreRiga({ id: p.id, testo: testoErrore(e) });
    } finally {
      setInCorso(null);
    }
  }

  /** Tutte le passate svolte, una dopo l'altra (niente raffiche al server). */
  async function segnaTutte() {
    const coda = [...daSegnare];
    setErroreTutte("");
    let fatte = 0;
    try {
      for (const p of coda) {
        setTutte(`Segno ${fatte + 1} di ${coda.length}…`);
        const r = await api<{ prenotazione: PrenotazioneAdmin }>(`${API.prenotazioni}/${p.id}`, {
          method: "PATCH",
          body: { stato: "svolta" },
        });
        metti({ ...p, ...r.prenotazione });
        fatte++;
      }
    } catch (e) {
      setErroreTutte(fatte ? `${testoErrore(e)}\nPrima dell'errore ne ho segnate ${fatte}.` : testoErrore(e));
    } finally {
      setTutte("");
    }
  }

  const riga = (p: PrenotazioneAdmin, conData: boolean) => (
    <Riga
      key={p.id}
      p={p}
      oggi={oggi}
      conData={conData}
      occupato={inCorso === p.id || !!tutte}
      chiesta={chiesta === p.id}
      errore={erroreRiga?.id === p.id ? erroreRiga.testo : ""}
      onStato={(s) => cambia(p, s)}
      onChiedi={() => {
        setChiesta(p.id);
        setErroreRiga(null);
      }}
      onLascia={() => setChiesta(null)}
    />
  );

  if (!pronto) return <p className="py-10 text-[13px] text-crm-tenue">Carico le prenotazioni…</p>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Prossimi 7 giorni" value={ore(settimana)} sub="confermate o da pagare" />
        <Stat label="Prossime 4 settimane" value={ore(future.filter(attiva).length)} sub={`fino a ${dataCorta(ultimo)}`} />
        <Stat
          label="Da pagare"
          value={daPagare}
          sub="ore extra in attesa del pagamento"
          tone={daPagare ? "amber" : "ink"}
        />
        <Stat
          label="Da segnare svolte"
          value={daSegnare.length}
          sub="ore passate ancora «confermata»"
          tone={daSegnare.length ? "red" : "green"}
        />
      </div>

      {errore && <Errore testo={errore} onRiprova={ricarica} />}

      {/* azioni della pagina, come in alto a destra in Shopify */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <label className="mr-auto inline-flex min-h-8 cursor-pointer items-center gap-2 text-[13px] text-crm-testo">
          <input type="checkbox" checked={annullate} onChange={(e) => setAnnullate(e.target.checked)} className="h-4 w-4" />
          Mostra annullate
          {nAnnullate > 0 && <span className="text-[12px] tabular-nums text-crm-spento">{nAnnullate}</span>}
        </label>
        <button
          type="button"
          onClick={ricarica}
          disabled={caricando}
          title="Aggiorna"
          aria-label="Aggiorna le prenotazioni"
          className="crm-btn h-8 w-8 shrink-0 px-0 max-sm:h-9 max-sm:w-9"
        >
          <RefreshCw className={cx("h-4 w-4", caricando && "animate-spin")} />
        </button>
        <button
          type="button"
          onClick={() => {
            setNuova(true);
            setCreata(null);
          }}
          className="crm-btn-primario h-8 shrink-0 max-sm:h-9 max-sm:px-4"
        >
          <CalendarPlus className="h-4 w-4" /> Nuova prenotazione
        </button>
      </div>

      {creata && (
        <Avviso className="flex flex-wrap items-center gap-2">
          <span className="min-w-0 flex-1">
            Prenotazione creata: <b className="font-[650]">{creata.clienteNome}</b>,{" "}
            <span className="capitalize">{dataLunga(creata.data)}</span> {creata.inizio}–{creata.fine}
            {creata.data > ultimo || creata.data < aggiungiGiorni(oggi, -14) ? " (fuori dalle 4 settimane dell'agenda)" : ""}.
          </span>
          <button type="button" onClick={() => setCreata(null)} className="crm-btn-piatto shrink-0" aria-label="Chiudi l'avviso">
            <X className="h-3.5 w-3.5" />
          </button>
        </Avviso>
      )}

      {nuova && (
        <Card title="Nuova prenotazione" subtitle="Per chi ti chiama o ti scrive: la vede subito nell'app, tra le sue ore.">
          <ModuloPrenotazione
            oggi={oggi}
            esistenti={lista}
            onCreata={(p) => {
              metti(p);
              setCreata(p);
              setNuova(false);
            }}
            onAnnulla={() => setNuova(false)}
          />
        </Card>
      )}

      {/* ------------------------------------------ passate da segnare */}
      {daSegnare.length > 0 && (
        <section className="crm-card shadow-[0_0_0_1px_rgba(178,132,0,0.35),var(--shadow-crm-card)]">
          <header className="flex flex-wrap items-start gap-3 bg-[#fff7d1] px-4 py-3">
            <div className="min-w-0 flex-1">
              <h2 className="text-[13px] font-[650] leading-5 text-crm-attesa-ink">
                {daSegnare.length === 1 ? "1 ora passata da segnare svolta" : `${daSegnare.length} ore passate da segnare svolte`}
              </h2>
              <p className="text-[12px] leading-4 text-crm-attesa-ink/80">
                Ultimi 14 giorni. Se il cliente non è venuto, annullala.
              </p>
            </div>
            {daSegnare.length > 1 && (
              <button type="button" onClick={segnaTutte} disabled={!!tutte} className="crm-btn shrink-0 max-sm:min-h-9">
                <Check className="h-3.5 w-3.5" /> {tutte || "Segna tutte svolte"}
              </button>
            )}
          </header>
          {erroreTutte && (
            <div className="px-4 pt-3">
              <Errore testo={erroreTutte} />
            </div>
          )}
          <ul>{daSegnare.map((p) => riga(p, true))}</ul>
        </section>
      )}

      {/* ------------------------------------------------------- agenda */}
      <section className="crm-card">
        <header className="px-4 pb-2 pt-4">
          <h2 className="text-[13px] font-[650] leading-5 text-crm-ink">Agenda</h2>
          <p className="text-[13px] leading-5 text-crm-tenue">
            Da oggi a {dataCorta(ultimo)}. I clienti prenotano dall&apos;app negli orari di Disponibilità.
          </p>
        </header>
        {agenda.length === 0 ? (
          <EmptyState
            titolo="Nessuna ora prenotata nelle prossime 4 settimane."
            testo={
              nAnnullate && !annullate
                ? `Ci sono ${nAnnullate} prenotazioni annullate: spunta «Mostra annullate» per vederle.`
                : "Quando un cliente prenota dall'app la trovi qui. Puoi crearla anche tu con Nuova prenotazione."
            }
            icon={<CalendarCheck />}
          />
        ) : (
          <div className={cx("pb-1 transition-opacity", caricando && "opacity-60")}>
            {agenda.map((g) => {
              const rel = relativo(g.data, oggi);
              const n = g.voci.filter(attiva).length;
              return (
                <div key={g.data}>
                  <h3 className="flex items-center gap-2 bg-crm-fondo px-4 py-1.5 text-[12px] font-[550] leading-4 text-[#4a4a4a]">
                    <span className="capitalize">{dataLunga(g.data)}</span>
                    {rel && <span className="crm-badge crm-badge-scuro py-0 text-[11px]">{rel}</span>}
                    <span className="ml-auto font-normal tabular-nums text-crm-tenue">{ore(n)}</span>
                  </h3>
                  <ul>{g.voci.map((p) => riga(p, false))}</ul>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

/* --------------------------------------------------------------- riga */

function Riga({
  p,
  oggi,
  conData,
  occupato,
  chiesta,
  errore,
  onStato,
  onChiedi,
  onLascia,
}: {
  p: PrenotazioneAdmin;
  oggi: DataISO;
  conData: boolean;
  occupato: boolean;
  chiesta: boolean;
  errore: string;
  onStato: (s: StatoPrenotazione) => void;
  onChiedi: () => void;
  onLascia: () => void;
}) {
  const stato = STATO[p.stato] ?? { testo: p.stato, badge: "" };
  const annullata = p.stato === "annullata";

  return (
    <li className={cx("border-b border-crm-filo px-4 py-3 last:border-b-0", annullata && "bg-[#fbfbfb]")}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="w-[92px] shrink-0">
          {conData && (
            <p className="text-[12px] font-[550] capitalize leading-4 text-crm-tenue">{relativo(p.data, oggi) ?? dataCorta(p.data)}</p>
          )}
          <p className={cx("text-[13px] font-[650] tabular-nums leading-5", annullata ? "text-crm-spento line-through" : "text-crm-ink")}>
            {p.inizio}–{p.fine}
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <p className={cx("truncate text-[13px] font-[550] leading-5", annullata ? "text-crm-tenue" : "text-crm-ink")}>{p.clienteNome}</p>
          <p className="truncate text-[12px] leading-4 text-crm-tenue">
            {[p.tipo === "extra" ? "Ora extra" : "Inclusa nel pacchetto", p.luogo, p.nota].filter(Boolean).join(" · ")}
          </p>
        </div>
        <span className={cx("crm-badge shrink-0", stato.badge)}>{stato.testo}</span>

        <div className="flex shrink-0 flex-wrap justify-end gap-1.5 max-sm:w-full sm:w-[190px]">
          {p.stato === "confermata" && p.data <= oggi && (
            <button type="button" disabled={occupato} onClick={() => onStato("svolta")} className="crm-btn max-sm:min-h-9">
              <Check className="h-3.5 w-3.5" /> Svolta
            </button>
          )}
          {attiva(p) && !chiesta && (
            <button
              type="button"
              disabled={occupato}
              onClick={onChiedi}
              className="crm-btn-piatto text-crm-rosso hover:bg-[#fff1f1] disabled:opacity-50 max-sm:min-h-9"
            >
              <X className="h-3.5 w-3.5" /> Annulla
            </button>
          )}
          {p.stato === "svolta" && (
            <button
              type="button"
              disabled={occupato}
              onClick={() => onStato("confermata")}
              title="Torna «confermata», se l'hai segnata per sbaglio"
              className="crm-btn-piatto disabled:opacity-50 max-sm:min-h-9"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Non svolta
            </button>
          )}
          {annullata && p.data >= oggi && (
            <button type="button" disabled={occupato} onClick={() => onStato("confermata")} className="crm-btn max-sm:min-h-9">
              <RotateCcw className="h-3.5 w-3.5" /> Riattiva
            </button>
          )}
        </div>
      </div>

      {chiesta && (
        <div className="mt-3">
          <Conferma
            pericolo
            testo={
              <>
                Annullo l&apos;ora di <b>{p.clienteNome}</b>, <span className="capitalize">{dataLunga(p.data)}</span> alle {p.inizio}?
                Nell&apos;app la vede annullata e l&apos;ora torna libera per gli altri clienti.
              </>
            }
            conferma="Annulla l'ora"
            annulla="Lascia così"
            occupato={occupato}
            onConferma={() => onStato("annullata")}
            onAnnulla={onLascia}
          />
        </div>
      )}
      {errore && (
        <div className="mt-3">
          <Errore testo={errore} />
        </div>
      )}
    </li>
  );
}
