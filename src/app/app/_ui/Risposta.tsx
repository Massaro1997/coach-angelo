"use client";

// La risposta del cliente al coach: la card "Fertig?" in fondo al giorno,
// DENTRO il contenuto che scorre (#app-scroll). Fino al 13/11 stava in un
// piede fisso (PiedeFisso): entrando nel giorno compariva una seconda barra
// sopra quella delle sezioni e al proprietario sembrava "la barra che sale e
// scende". Ora in basso c'e' solo la barra delle sezioni, ferma; che il giorno
// e' fatto si vede anche in alto, nella Pillola sulla foto (Giorno).
// "Erledigt" salva subito (e' il tocco che si fa in palestra, non deve
// dipendere dal ricordarsi "Speichern"); fatica 1-5 e "Wie lief es?" stanno in
// un foglio dal basso e si salvano col bottone. Il foglio si apre solo col
// tocco: nella v1 si apriva da solo dopo "Erledigt" e sembrava un foglio che
// non se ne va. Appena fatto, "Wie lief es?" diventa scuro per invitare.
// Lo stato vive qui e non nel foglio: chiudendolo e riaprendolo quello che si
// e' scritto resta. Parte dalla giornata al montaggio e il genitore usa
// key={data}, cosi' un aggiornamento in sottofondo non lo cancella.

import { useCallback, useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipsesOutline, IoCheckmark, IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5";
import type { Giornata, RispostaCliente } from "@/lib/app-coaching/tipi";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { salvaRisposta } from "./archivio";
import { CARTA, useTesti } from "./comuni";
import Foglio from "./Foglio";
import { Icona3D, Pillola, useLingua } from "./kit";

type Stato = "fermo" | "salvo" | "salvato" | "errore";

/** Dopo "Speichern" andato bene il foglio resta un attimo con la spunta, poi si chiude. */
const CHIUSURA_DOPO_SALVA = 700;

// stringhe solo di questa card (testi.ts lo toccano altri in parallelo)
const TXT = {
  de: {
    titolo: "Fertig?",
    testo: (coach: string) => `Markier den Tag als erledigt, ${coach} sieht es sofort.`,
    fattoTitolo: "Geschafft!",
    fattoTesto: (coach: string) => `Sag ${coach} noch kurz, wie es lief.`,
    grazie: (coach: string) => `Danke, ${coach} hat deine Rückmeldung.`,
  },
  it: {
    titolo: "Finito?",
    testo: (coach: string) => `Segna il giorno come fatto, ${coach} lo vede subito.`,
    fattoTitolo: "Fatto!",
    fattoTesto: (coach: string) => `Racconta in breve a ${coach} com'è andata.`,
    grazie: (coach: string) => `Grazie, ${coach} ha il tuo feedback.`,
  },
};

export default function Risposta({ giornata }: { giornata: Giornata }) {
  const t = useTesti();
  const x = TXT[useLingua()];
  const [fatto, setFatto] = useState(giornata.fatto);
  const [fatica, setFatica] = useState<number | null>(giornata.fatica);
  const [feedback, setFeedback] = useState(giornata.feedback ?? "");
  const [stato, setStato] = useState<Stato>("fermo");
  const [foglio, setFoglio] = useState(false);
  // la spunta "Gespeichert" nel foglio vale solo per il suo "Speichern",
  // non per il salvataggio di "Erledigt"
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
  // quella che il coach ha davvero (salvata), per il "Danke"
  const rispostaSalvata = giornata.fatica !== null || !!giornata.feedback?.trim();

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
  // fatto e ancora senza risposta: "Wie lief es?" si fa notare
  const invito = fatto && !conRisposta;
  const sotto = !fatto
    ? x.testo(MARCHIO.coach)
    : rispostaSalvata
      ? x.grazie(MARCHIO.coach)
      : x.fattoTesto(MARCHIO.coach);

  return (
    <>
      <section aria-labelledby="risposta-titolo" className={`${CARTA} p-4`}>
        <div className="flex items-center gap-3">
          <Icona3D nome={fatto ? "coppa" : "spunta"} dimensione={48} />
          <div className="min-w-0 flex-1">
            <h2 id="risposta-titolo" className="text-[20px] font-bold leading-snug">
              {fatto ? x.fattoTitolo : x.titolo}
            </h2>
            <p className="text-[15px] leading-snug text-neutral-500">{sotto}</p>
          </div>
        </div>

        {stato === "errore" && !foglio && (
          <p role="alert" className="mt-3 text-[15px] leading-snug text-[#7f1d1d]">
            {t.erroreSalva}
          </p>
        )}

        <button
          type="button"
          onClick={cambiaFatto}
          disabled={salvando}
          aria-pressed={fatto}
          // 17 px: "Als erledigt markieren" sta su una riga anche sui telefoni da 360 px
          className={`mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full px-4 text-[17px] font-bold text-white transition-colors disabled:opacity-70 ${
            fatto ? "bg-emerald-600" : "bg-[var(--app-colore)] active:opacity-90"
          }`}
        >
          {fatto ? (
            <IoCheckmarkCircle className="size-6 shrink-0" aria-hidden />
          ) : (
            <IoEllipseOutline className="size-6 shrink-0" aria-hidden />
          )}
          <span className="truncate">{fatto ? t.fatto : t.segnaFatto}</span>
        </button>

        <button
          type="button"
          onClick={() => setFoglio(true)}
          aria-haspopup="dialog"
          aria-expanded={foglio}
          className={`mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-[16px] font-semibold transition-colors ${
            invito
              ? "bg-neutral-900 text-white active:bg-neutral-800"
              : "bg-white text-neutral-900 ring-1 ring-black/10 active:bg-neutral-50"
          }`}
        >
          <IoChatbubbleEllipsesOutline className="size-5 shrink-0" aria-hidden />
          <span className="truncate">{t.feedback}</span>
          {/* c'e' gia' una risposta (o se ne sta scrivendo una): la fatica, o una spunta */}
          {conRisposta && (
            <Pillola>
              {fatica !== null ? (
                t.faticaVoci[fatica - 1]
              ) : (
                <IoCheckmark className="size-3.5" aria-hidden />
              )}
            </Pillola>
          )}
        </button>
      </section>

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
            className="mt-2 w-full resize-none rounded-xl bg-white p-3 text-[17px] leading-relaxed text-neutral-900 outline-none ring-1 ring-black/10 transition-shadow placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-900"
          />

          <button
            type="button"
            onClick={() => void salvaDalFoglio()}
            disabled={!cambiato || salvando}
            className={`mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full text-lg font-semibold text-white transition-colors ${
              appenaSalvato
                ? "bg-emerald-600"
                : "bg-[var(--app-colore)] active:opacity-85 disabled:bg-neutral-200 disabled:text-neutral-500"
            }`}
          >
            {appenaSalvato && <IoCheckmark className="size-5" aria-hidden />}
            {salvando ? t.salvando : appenaSalvato ? t.salvato : t.salva}
          </button>

          <div className="mt-2 min-h-6" aria-live="polite">
            {stato === "errore" && (
              <p role="alert" className="text-center text-[#7f1d1d]">
                {t.erroreSalva}
              </p>
            )}
          </div>
        </Foglio>
      )}
    </>
  );
}
