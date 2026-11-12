"use client";

// La risposta del cliente al coach, nella barra fissa in fondo alla schermata
// del giorno. "Erledigt" salva subito (e' il tocco che si fa in palestra, non
// deve dipendere dal ricordarsi "Speichern"); fatica 1-5 e "Wie lief es?"
// stanno in un foglio dal basso e si salvano col bottone. Segnato il giorno
// come fatto, se non c'e' ancora una risposta, il foglio si apre da solo.
// Lo stato vive qui e non nel foglio: chiudendolo e riaprendolo quello che si
// e' scritto resta. Parte dalla giornata al montaggio e il genitore usa
// key={data}, cosi' un aggiornamento in sottofondo non lo cancella.

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Circle, CircleCheck, MessageSquareText } from "lucide-react";
import type { Giornata, RispostaCliente } from "@/lib/app-coaching/tipi";
import { salvaRisposta } from "./archivio";
import { FONDO_SICURO, LATI, useTesti } from "./comuni";
import Foglio from "./Foglio";

type Stato = "fermo" | "salvo" | "salvato" | "errore";

/** Dopo "Speichern" andato bene il foglio resta un attimo con la spunta, poi si chiude. */
const CHIUSURA_DOPO_SALVA = 700;

export default function Risposta({ giornata }: { giornata: Giornata }) {
  const t = useTesti();
  const [fatto, setFatto] = useState(giornata.fatto);
  const [fatica, setFatica] = useState<number | null>(giornata.fatica);
  const [feedback, setFeedback] = useState(giornata.feedback ?? "");
  const [stato, setStato] = useState<Stato>("fermo");
  const [foglio, setFoglio] = useState(false);
  // la spunta "Gespeichert" nel foglio vale solo per il suo "Speichern",
  // non per il salvataggio di "Erledigt" che parte mentre il foglio si apre
  const [salvatoFoglio, setSalvatoFoglio] = useState(false);
  const timer = useRef<number | null>(null);

  const fermaTimer = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  }, []);
  useEffect(() => fermaTimer, [fermaTimer]);

  const chiudiFoglio = useCallback(() => {
    fermaTimer();
    setFoglio(false);
  }, [fermaTimer]);

  const cambiato =
    fatto !== giornata.fatto ||
    fatica !== giornata.fatica ||
    feedback.trim() !== (giornata.feedback ?? "").trim();
  const conRisposta = fatica !== null || feedback.trim() !== "";

  async function salva(r: RispostaCliente): Promise<boolean> {
    setStato("salvo");
    const esito = await salvaRisposta(giornata.data, r);
    setStato(esito === "ok" ? "salvato" : "errore");
    return esito === "ok";
  }

  function risposta(parziale: Partial<RispostaCliente> = {}): RispostaCliente {
    return { fatto, fatica, feedback: feedback.trim() || null, ...parziale };
  }

  function cambiaFatto() {
    const nuovo = !fatto;
    setFatto(nuovo);
    void salva(risposta({ fatto: nuovo }));
    // appena fatto: due tocchi per dire com'e' andata, finche' e' fresco
    if (nuovo && !conRisposta) setFoglio(true);
  }

  async function salvaDalFoglio() {
    fermaTimer();
    if (await salva(risposta())) {
      setSalvatoFoglio(true);
      timer.current = window.setTimeout(() => {
        timer.current = null;
        setFoglio(false);
      }, CHIUSURA_DOPO_SALVA);
    }
  }

  const salvando = stato === "salvo";
  const appenaSalvato = salvatoFoglio && !cambiato;

  return (
    <>
      <div
        className={`relative z-10 shrink-0 border-t border-black/[0.06] bg-white pt-3 ${LATI} ${FONDO_SICURO}`}
      >
        {stato === "errore" && !foglio && (
          <p role="alert" className="mx-auto mb-2 max-w-xl text-center text-[15px] leading-snug text-[var(--app-colore-scuro)]">
            {t.erroreSalva}
          </p>
        )}
        <div className="mx-auto flex max-w-xl gap-2">
          <button
            type="button"
            onClick={cambiaFatto}
            disabled={salvando}
            aria-pressed={fatto}
            // 17 px: "Als erledigt markieren" sta su una riga anche sui telefoni da 360 px
            className={`flex h-14 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl px-3 text-[17px] font-bold text-white transition-colors disabled:opacity-70 ${
              fatto ? "bg-emerald-600" : "bg-[var(--app-colore)] active:opacity-90"
            }`}
          >
            {fatto ? (
              <CircleCheck className="size-6 shrink-0" aria-hidden />
            ) : (
              <Circle className="size-6 shrink-0" aria-hidden />
            )}
            <span className="truncate">{fatto ? t.fatto : t.segnaFatto}</span>
          </button>
          <button
            type="button"
            onClick={() => setFoglio(true)}
            aria-label={t.rispostaTitolo}
            aria-haspopup="dialog"
            aria-expanded={foglio}
            className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-neutral-100 text-neutral-800 transition-colors active:bg-neutral-200"
          >
            <MessageSquareText className="size-6" aria-hidden />
            {/* c'e' gia' una risposta (o se ne sta scrivendo una) */}
            {conRisposta && (
              <span
                className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-[var(--app-colore)] ring-2 ring-neutral-100"
                aria-hidden
              />
            )}
          </button>
        </div>
      </div>

      {foglio && (
        <Foglio titolo={t.rispostaTitolo} onChiudi={chiudiFoglio}>
          <fieldset>
            <legend className="font-semibold">{t.fatica}</legend>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((v) => {
                const scelto = fatica === v;
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={scelto}
                    aria-label={`${v}: ${t.faticaVoci[v - 1]}`}
                    onClick={() => {
                      // ritoccare lo stesso numero lo toglie
                      setFatica(scelto ? null : v);
                      setStato("fermo");
                      setSalvatoFoglio(false);
                    }}
                    className={`h-12 rounded-xl text-lg font-bold tabular-nums transition-colors ${
                      scelto ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-800 active:bg-neutral-200"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
            <div className="mt-1.5 flex justify-between text-[15px] text-neutral-500" aria-hidden>
              <span>{t.faticaMin}</span>
              <span>{t.faticaMax}</span>
            </div>
          </fieldset>

          <label htmlFor="feedback" className="mt-5 block font-semibold">
            {t.feedback}
          </label>
          <textarea
            id="feedback"
            rows={3}
            maxLength={2000}
            value={feedback}
            placeholder={t.feedbackSegnaposto}
            onChange={(e) => {
              setFeedback(e.target.value);
              setStato("fermo");
              setSalvatoFoglio(false);
            }}
            // 17 px: sotto i 16 Safari ingrandisce la pagina al tocco
            className="mt-2 w-full resize-none rounded-xl bg-white p-3 text-[17px] leading-relaxed text-neutral-900 outline-none ring-1 ring-black/10 transition-shadow placeholder:text-neutral-400 focus:ring-2 focus:ring-[var(--app-colore)]"
          />

          <button
            type="button"
            onClick={() => void salvaDalFoglio()}
            disabled={!cambiato || salvando}
            className={`mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-lg font-semibold text-white transition-colors ${
              appenaSalvato
                ? "bg-emerald-600"
                : "bg-neutral-900 active:opacity-85 disabled:bg-neutral-200 disabled:text-neutral-500"
            }`}
          >
            {appenaSalvato && <Check className="size-5" strokeWidth={3} aria-hidden />}
            {salvando ? t.salvando : appenaSalvato ? t.salvato : t.salva}
          </button>

          <div className="mt-2 min-h-6" aria-live="polite">
            {stato === "errore" && (
              <p role="alert" className="text-center text-[var(--app-colore-scuro)]">
                {t.erroreSalva}
              </p>
            )}
          </div>
        </Foglio>
      )}
    </>
  );
}
