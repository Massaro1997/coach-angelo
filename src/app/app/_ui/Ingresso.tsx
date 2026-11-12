"use client";

// Schermata d'ingresso: codice a 8 cifre che il coach ha mandato al cliente,
// al centro della schermata. Con la tastiera aperta la zona si accorcia
// (Guscio) e il campo resta in vista; la riga per installare l'app, in fondo,
// sparisce finche' la tastiera e' su. Le istruzioni stanno in un foglio.

import { useState, type FormEvent } from "react";
import { ChevronUp, Smartphone } from "lucide-react";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { accedi, type EsitoAccesso } from "./archivio";
import { useStandalone } from "./dispositivo";
import { FONDO_SICURO, LATI, SCORRE, useTesti } from "./comuni";
import { FoglioInstalla } from "./Installa";
import type { Testi } from "../testi";

function messaggio(esito: EsitoAccesso, t: Testi): string {
  if (esito === "codice") return t.codiceErrato;
  if (esito === "troppi") return t.troppiTentativi;
  if (esito === "rete") return t.nienteRete;
  return t.erroreGenerico;
}

export default function Ingresso() {
  const t = useTesti();
  const standalone = useStandalone();
  const [cifre, setCifre] = useState("");
  const [invio, setInvio] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  const [istruzioni, setIstruzioni] = useState(false);

  // si mostra come "1234 5678", come lo scrive il coach
  const valore = cifre.length > 4 ? `${cifre.slice(0, 4)} ${cifre.slice(4)}` : cifre;
  const completo = cifre.length === 8;

  async function invia(e: FormEvent) {
    e.preventDefault();
    if (!completo || invio) return;
    setInvio(true);
    setErrore(null);
    const esito = await accedi({ codice: cifre });
    // se va bene la home passa da sola al calendario
    if (esito !== "ok") {
      setInvio(false);
      setErrore(messaggio(esito, t));
    }
  }

  return (
    <>
      <main className={`flex flex-col pt-[env(safe-area-inset-top)] ${SCORRE} ${LATI}`}>
        {/* my-auto: al centro, ma se la tastiera lascia poco spazio si scorre dall'inizio */}
        <div className="mx-auto my-auto w-full max-w-md py-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARCHIO.logo} alt={MARCHIO.nome} className="h-8 w-auto" />

          <h1 className="fp-titolo mt-8 pr-1 text-[36px]">{t.benvenuto}</h1>
          <p className="mt-2 text-lg leading-snug text-neutral-600">{t.introCodice(MARCHIO.coach)}</p>

          <form onSubmit={invia} className="mt-6" noValidate>
            <label htmlFor="codice" className="block font-semibold">
              {t.etichettaCodice}
            </label>
            <input
              id="codice"
              name="codice"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              enterKeyHint="go"
              autoCorrect="off"
              spellCheck={false}
              placeholder="1234 5678"
              value={valore}
              onChange={(e) => {
                // incollato con spazi, trattini o altro: contano solo le cifre
                setCifre(e.target.value.replace(/\D/g, "").slice(0, 8));
                setErrore(null);
              }}
              aria-invalid={errore ? true : undefined}
              aria-describedby={errore ? "errore-codice" : undefined}
              // 30 px: sopra i 16 Safari non ingrandisce la pagina al tocco
              className="mt-2 h-16 w-full scroll-my-4 rounded-2xl bg-white px-4 text-center text-[30px] font-bold tracking-[0.12em] text-neutral-900 tabular-nums outline-none ring-1 ring-black/10 transition-shadow placeholder:text-neutral-300 focus:ring-2 focus:ring-[var(--app-colore)]"
            />
            {errore && (
              <p id="errore-codice" role="alert" className="mt-2 text-[var(--app-colore-scuro)]">
                {errore}
              </p>
            )}
            <button
              type="submit"
              disabled={!completo || invio}
              className="mt-3 h-14 w-full rounded-2xl bg-[var(--app-colore)] text-lg font-semibold text-white transition-opacity active:opacity-85 disabled:opacity-40"
            >
              {invio ? t.attendi : t.entra}
            </button>
          </form>
        </div>
      </main>

      {/* nel browser: una riga in fondo, le istruzioni nel foglio */}
      {!standalone && (
        <div className={`app-via-con-tastiera shrink-0 pt-2 ${LATI} ${FONDO_SICURO}`}>
          <button
            type="button"
            onClick={() => setIstruzioni(true)}
            aria-haspopup="dialog"
            className="mx-auto flex min-h-12 w-full max-w-md items-center gap-3 rounded-2xl bg-white px-4 text-left ring-1 ring-black/[0.06] transition-colors active:bg-neutral-50"
          >
            <Smartphone className="size-5 shrink-0 text-neutral-500" aria-hidden />
            <span className="min-w-0 flex-1 truncate font-semibold">{t.installaTitolo}</span>
            <ChevronUp className="size-5 shrink-0 text-neutral-400" aria-hidden />
          </button>
        </div>
      )}
      {standalone && <div className={`shrink-0 ${FONDO_SICURO}`} aria-hidden />}

      {istruzioni && <FoglioInstalla onChiudi={() => setIstruzioni(false)} />}
    </>
  );
}
