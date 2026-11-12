"use client";

// La risposta del cliente al coach: fatto si'/no, fatica 1-5, due righe.
// "Erledigt" salva subito (e' il tocco che si fa in palestra, non deve
// dipendere dal ricordarsi "Speichern"); fatica e testo col bottone Salva.
// Lo stato parte dalla giornata al montaggio: il genitore usa key={data},
// cosi' un aggiornamento in sottofondo non cancella quello che si sta scrivendo.

import { useState } from "react";
import { Check, Circle, CircleCheck } from "lucide-react";
import type { Giornata, RispostaCliente } from "@/lib/app-coaching/tipi";
import { salvaRisposta } from "./archivio";
import { CARTA, useTesti } from "./comuni";

type Stato = "fermo" | "salvo" | "salvato" | "errore";

export default function Risposta({ giornata }: { giornata: Giornata }) {
  const t = useTesti();
  const [fatto, setFatto] = useState(giornata.fatto);
  const [fatica, setFatica] = useState<number | null>(giornata.fatica);
  const [feedback, setFeedback] = useState(giornata.feedback ?? "");
  const [stato, setStato] = useState<Stato>("fermo");

  const cambiato =
    fatto !== giornata.fatto ||
    fatica !== giornata.fatica ||
    feedback.trim() !== (giornata.feedback ?? "").trim();

  async function salva(r: RispostaCliente) {
    setStato("salvo");
    const esito = await salvaRisposta(giornata.data, r);
    setStato(esito === "ok" ? "salvato" : "errore");
  }

  function risposta(parziale: Partial<RispostaCliente> = {}): RispostaCliente {
    return { fatto, fatica, feedback: feedback.trim() || null, ...parziale };
  }

  function cambiaFatto() {
    const nuovo = !fatto;
    setFatto(nuovo);
    void salva(risposta({ fatto: nuovo }));
  }

  const salvando = stato === "salvo";

  return (
    <section className={`${CARTA} mt-8 p-4`} aria-labelledby="sezione-risposta">
      <h2 id="sezione-risposta" className="text-2xl font-bold">
        {t.rispostaTitolo}
      </h2>

      <button
        type="button"
        onClick={cambiaFatto}
        disabled={salvando}
        aria-pressed={fatto}
        className={`mt-4 flex h-16 w-full items-center justify-center gap-2.5 rounded-2xl text-lg font-bold transition-colors disabled:opacity-70 ${
          fatto ? "bg-emerald-600 text-white" : "bg-[var(--app-colore)] text-white active:opacity-90"
        }`}
      >
        {fatto ? (
          <CircleCheck className="size-6" aria-hidden />
        ) : (
          <Circle className="size-6" aria-hidden />
        )}
        {fatto ? t.fatto : t.segnaFatto}
      </button>

      <fieldset className="mt-6">
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

      <label htmlFor="feedback" className="mt-6 block font-semibold">
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
        }}
        // 17 px: sotto i 16 Safari ingrandisce la pagina al tocco
        className="mt-2 w-full resize-y rounded-xl bg-white p-3 text-[17px] leading-relaxed text-neutral-900 outline-none ring-1 ring-black/10 transition-shadow placeholder:text-neutral-400 focus:ring-2 focus:ring-[var(--app-colore)]"
      />

      <button
        type="button"
        onClick={() => void salva(risposta())}
        disabled={!cambiato || salvando}
        className="mt-4 h-14 w-full rounded-2xl bg-neutral-900 text-lg font-semibold text-white transition-opacity active:opacity-85 disabled:bg-neutral-200 disabled:text-neutral-500"
      >
        {salvando ? t.salvando : t.salva}
      </button>

      <div className="mt-3 min-h-6" aria-live="polite">
        {stato === "salvato" && !cambiato && (
          <p className="flex items-center justify-center gap-1.5 font-semibold text-emerald-700">
            <Check className="size-5" strokeWidth={3} aria-hidden />
            {t.salvato}
          </p>
        )}
        {stato === "errore" && (
          <p role="alert" className="text-center text-[var(--app-colore-scuro)]">
            {t.erroreSalva}
          </p>
        )}
      </div>
    </section>
  );
}
