"use client";

// Schermata d'ingresso: codice a 8 cifre che il coach ha mandato al cliente.
// Sotto, se l'app non e' ancora installata, come metterla sul telefono.

import { useState, type FormEvent } from "react";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { accedi, type EsitoAccesso } from "./archivio";
import { useStandalone } from "./dispositivo";
import { useTesti } from "./comuni";
import { Installa } from "./Installa";
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
    <main className="mx-auto flex min-h-dvh max-w-md flex-col pb-[calc(2.5rem_+_env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pt-[calc(3rem_+_env(safe-area-inset-top))]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MARCHIO.logo} alt={MARCHIO.nome} className="h-8 w-auto self-start" />

      <h1 className="fp-titolo mt-12 text-[40px]">{t.benvenuto}</h1>
      <p className="mt-3 text-lg text-neutral-600">{t.introCodice(MARCHIO.coach)}</p>

      <form onSubmit={invia} className="mt-8" noValidate>
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
          className="mt-2 h-16 w-full rounded-2xl bg-white px-4 text-center text-[30px] font-bold tracking-[0.12em] text-neutral-900 tabular-nums outline-none ring-1 ring-black/10 transition-shadow placeholder:text-neutral-300 focus:ring-2 focus:ring-[var(--app-colore)]"
        />
        {errore && (
          <p id="errore-codice" role="alert" className="mt-3 text-[var(--app-colore-scuro)]">
            {errore}
          </p>
        )}
        <button
          type="submit"
          disabled={!completo || invio}
          className="mt-4 h-14 w-full rounded-2xl bg-[var(--app-colore)] text-lg font-semibold text-white transition-opacity active:opacity-85 disabled:opacity-40"
        >
          {invio ? t.attendi : t.entra}
        </button>
      </form>

      {!standalone && (
        <div className="mt-12 border-t border-black/10 pt-8">
          <Installa />
        </div>
      )}
    </main>
  );
}
