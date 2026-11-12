"use client";

// Strumenti per non riscrivere tutto ogni settimana: copia il giorno aperto
// su altre date, copia la sua settimana (lun-dom) alla successiva, ripeti la
// settimana per N settimane. Si copia sempre quello che e' salvato sul server;
// i giorni gia' pieni vengono saltati e poi si chiede se sovrascriverli.

import { useState } from "react";
import { CalendarPlus, CopyPlus, Plus, Repeat, X } from "lucide-react";
import type { DataISO } from "@/lib/app-coaching/tipi";
import { aggiungiGiorni, dataValida, giornoSettimana } from "@/lib/app-coaching/date";
import { api, Avviso, BASE, CAMPO_PICCOLO, Conferma, Errore, dataCorta, testoErrore } from "./comune";

type Op = { da: DataISO; a: DataISO; verso: DataISO };
type Esito = { testo: string; daRifare: Op[]; saltate: number };

const giorni = (n: number) => (n === 1 ? "1 giorno" : `${n} giorni`);

export default function StrumentiCopia({
  clienteId,
  data,
  esisteGiorno,
  sporco,
  onCopiato,
}: {
  clienteId: string;
  data: DataISO;
  esisteGiorno: boolean;
  sporco: boolean;
  onCopiato: () => void;
}) {
  const [destinazioni, setDestinazioni] = useState<DataISO[]>([]);
  const [nuovaData, setNuovaData] = useState("");
  const [settimane, setSettimane] = useState("4");
  const [lavoro, setLavoro] = useState<string | null>(null);
  const [esito, setEsito] = useState<Esito | null>(null);
  const [errore, setErrore] = useState("");

  const lun = aggiungiGiorni(data, -giornoSettimana(data));
  const dom = aggiungiGiorni(lun, 6);
  const nSett = Math.min(12, Math.max(1, Math.round(Number(settimane)) || 1));
  const occupato = lavoro !== null;

  /** Le copie una dopo l'altra (niente raffiche al server), sommando i risultati. */
  async function esegui(ops: Op[], sovrascrivi: boolean) {
    setErrore("");
    setEsito(null);
    let copiate = 0;
    let saltate = 0;
    const daRifare: Op[] = [];
    try {
      for (let i = 0; i < ops.length; i++) {
        setLavoro(ops.length > 1 ? `Copio ${i + 1} di ${ops.length}…` : "Copio…");
        const r = await api<{ copiate: number; saltate: number }>(`${BASE}/${clienteId}/copia`, {
          method: "POST",
          body: { ...ops[i], sovrascrivi },
        });
        copiate += r.copiate || 0;
        saltate += r.saltate || 0;
        if (r.saltate > 0) daRifare.push(ops[i]);
      }
      let testo: string;
      if (sovrascrivi) testo = `Fatto: ${giorni(copiate)} copiati, sovrascritti anche quelli già pieni.`;
      else if (!copiate && !saltate) testo = "Niente da copiare: i giorni di partenza sono vuoti.";
      else
        testo =
          `Copiati ${giorni(copiate)}.` +
          (saltate ? ` ${saltate === 1 ? "1 giorno saltato perché aveva" : `${saltate} giorni saltati perché avevano`} già un piano.` : "");
      setEsito({ testo, daRifare: sovrascrivi ? [] : daRifare, saltate: sovrascrivi ? 0 : saltate });
      if (sovrascrivi || !saltate) setDestinazioni([]);
    } catch (e) {
      setErrore(
        copiate || saltate
          ? `${testoErrore(e)}\nPrima dell'errore: ${giorni(copiate)} copiati, ${saltate} saltati.`
          : testoErrore(e)
      );
    } finally {
      setLavoro(null);
      onCopiato();
    }
  }

  function aggiungi(d: string) {
    if (!dataValida(d) || d === data) return;
    setDestinazioni((x) => (x.includes(d) ? x : [...x, d].sort()));
    setNuovaData("");
  }

  /** Lo stesso giorno della prima settimana dopo non ancora in elenco. */
  function prossimaSettimana() {
    let k = 1;
    while (destinazioni.includes(aggiungiGiorni(data, 7 * k))) k++;
    aggiungi(aggiungiGiorni(data, 7 * k));
  }

  const avvisoSalva = sporco ? "Salva prima le modifiche: si copia quello che è salvato." : "";

  return (
    <div className="space-y-4">
      {avvisoSalva && <Avviso tono="attesa">{avvisoSalva}</Avviso>}

      {/* ---------------------------------------------- giorno su altre date */}
      <div>
        <p className="flex items-center gap-1.5 text-[13px] font-[650] leading-5 text-crm-ink">
          <CopyPlus className="h-3.5 w-3.5 text-crm-spento" /> Copia questo giorno su…
        </p>
        {!esisteGiorno ? (
          <p className="mt-1 text-[12px] leading-4 text-crm-tenue">Il giorno è vuoto: scrivi il piano e salvalo, poi puoi copiarlo.</p>
        ) : (
          <>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="w-44">
                <input
                  type="date"
                  value={nuovaData}
                  onChange={(e) => setNuovaData(e.target.value)}
                  className={CAMPO_PICCOLO}
                  aria-label="Data su cui copiare"
                />
              </div>
              <button
                type="button"
                onClick={() => aggiungi(nuovaData)}
                disabled={!dataValida(nuovaData) || nuovaData === data}
                className="crm-btn max-sm:min-h-9"
              >
                <Plus className="h-3.5 w-3.5" /> Aggiungi
              </button>
              <button type="button" onClick={prossimaSettimana} className="crm-btn-piatto max-sm:min-h-9">
                <CalendarPlus className="h-3.5 w-3.5" /> + stesso giorno, settimana dopo
              </button>
            </div>
            {destinazioni.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {destinazioni.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-0.5 rounded-lg bg-black/[0.06] py-0.5 pl-2 pr-0.5 text-[12px] font-[550] capitalize leading-5 text-crm-testo"
                  >
                    {dataCorta(d)}
                    <button
                      type="button"
                      onClick={() => setDestinazioni((x) => x.filter((y) => y !== d))}
                      aria-label={`Togli ${dataCorta(d)}`}
                      className="inline-flex h-5 w-5 items-center justify-center rounded-md text-crm-tenue hover:bg-black/[0.08] hover:text-crm-ink"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <button
              type="button"
              className="crm-btn mt-2 max-sm:min-h-9"
              disabled={!destinazioni.length || sporco || occupato}
              onClick={() => esegui(destinazioni.map((d) => ({ da: data, a: data, verso: d })), false)}
            >
              Copia su {destinazioni.length ? giorni(destinazioni.length) : "…"}
            </button>
          </>
        )}
      </div>

      {/* ------------------------------------------- settimana alla prossima */}
      <div className="border-t border-crm-filo pt-4">
        <p className="flex items-center gap-1.5 text-[13px] font-[650] leading-5 text-crm-ink">
          <CopyPlus className="h-3.5 w-3.5 text-crm-spento" /> Copia la settimana alla prossima
        </p>
        <p className="mt-1 text-[12px] leading-4 text-crm-tenue">
          Da <span className="font-[550] text-crm-ink">{dataCorta(lun)} – {dataCorta(dom)}</span> a{" "}
          <span className="font-[550] text-crm-ink">
            {dataCorta(aggiungiGiorni(lun, 7))} – {dataCorta(aggiungiGiorni(lun, 13))}
          </span>
        </p>
        <button
          type="button"
          className="crm-btn mt-2 max-sm:min-h-9"
          disabled={sporco || occupato}
          onClick={() => esegui([{ da: lun, a: dom, verso: aggiungiGiorni(lun, 7) }], false)}
        >
          Copia la settimana
        </button>
      </div>

      {/* --------------------------------------------- ripeti per N settimane */}
      <div className="border-t border-crm-filo pt-4">
        <p className="flex items-center gap-1.5 text-[13px] font-[650] leading-5 text-crm-ink">
          <Repeat className="h-3.5 w-3.5 text-crm-spento" /> Ripeti questa settimana
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-crm-testo">
          <span>per</span>
          <div className="w-16">
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={12}
              value={settimane}
              onChange={(e) => setSettimane(e.target.value)}
              className={`${CAMPO_PICCOLO} text-center`}
              aria-label="Numero di settimane"
            />
          </div>
          <span>settimane, fino a {dataCorta(aggiungiGiorni(lun, 7 * nSett + 6))}</span>
        </div>
        <button
          type="button"
          className="crm-btn mt-2 max-sm:min-h-9"
          disabled={sporco || occupato}
          onClick={() =>
            esegui(
              Array.from({ length: nSett }, (_, i) => ({ da: lun, a: dom, verso: aggiungiGiorni(lun, 7 * (i + 1)) })),
              false
            )
          }
        >
          Ripeti per {nSett} {nSett === 1 ? "settimana" : "settimane"}
        </button>
      </div>

      {/* --------------------------------------------------------- esito */}
      {lavoro && <p className="text-[12px] font-[550] text-crm-tenue">{lavoro}</p>}
      {errore && <Errore testo={errore} />}
      {esito &&
        (esito.saltate > 0 ? (
          <Conferma
            testo={
              <>
                {esito.testo}
                <br />
                Vuoi sovrascrivere {esito.saltate === 1 ? "il giorno già pieno" : `i ${esito.saltate} giorni già pieni`}? Il piano
                che c&apos;è adesso viene sostituito.
              </>
            }
            conferma="Sovrascrivi"
            annulla="Lascia così"
            occupato={occupato}
            onConferma={() => esegui(esito.daRifare, true)}
            onAnnulla={() => setEsito({ ...esito, saltate: 0, daRifare: [] })}
          />
        ) : (
          <Avviso>{esito.testo}</Avviso>
        ))}
    </div>
  );
}
