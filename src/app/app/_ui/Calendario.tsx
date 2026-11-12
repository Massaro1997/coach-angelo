"use client";

// Calendario del mese, da lunedi'. Prende tutta l'altezza che resta nella
// schermata: le righe delle settimane si dividono lo spazio e le celle si
// allungano (niente quadrati fissi che fanno scorrere la pagina). I puntini
// dicono cosa c'e': rosso allenamento, verde alimentazione, grigio riposo; la
// spunta vuol dire che il cliente l'ha fatto. Col dito di lato si cambia mese.

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import type { DataISO, Giornata, MeseISO } from "@/lib/app-coaching/tipi";
import { grigliaMese, spostaMese } from "@/lib/app-coaching/date";
import { caricaMese, impostaMeseVisto, type StatoMese } from "./archivio";
import {
  CARTA,
  formatta,
  haAlimentazione,
  haAllenamento,
  maiuscola,
  useTesti,
} from "./comuni";
import { useScorrimentoLaterale } from "./gesto";
import { segnaDalCalendario } from "./navigazione";

const PUNTO = "size-1.5 rounded-full";
const PUNTO_ALLENAMENTO = `${PUNTO} bg-[var(--app-colore)]`;
const PUNTO_ALIMENTAZIONE = `${PUNTO} bg-emerald-500`;
const PUNTO_RIPOSO = `${PUNTO} bg-neutral-300`;

// classi intere, non composte: Tailwind le deve trovare scritte cosi'
const RIGHE: Record<number, string> = {
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
};

const ENTRATA: Record<-1 | 0 | 1, string> = {
  [-1]: "animate-[app-da-sinistra_180ms_ease-out]",
  0: "",
  1: "animate-[app-da-destra_180ms_ease-out]",
};

const FRECCIA =
  "grid size-11 shrink-0 place-items-center rounded-full text-neutral-700 active:bg-neutral-100";

function Cella({
  data,
  giornata,
  oggi,
}: {
  data: DataISO;
  giornata: Giornata | undefined;
  oggi: boolean;
}) {
  const t = useTesti();
  const allenamento = !!giornata && haAllenamento(giornata);
  const alimentazione = !!giornata && haAlimentazione(giornata);
  const riposo = !!giornata?.riposo;
  const fatto = !!giornata?.fatto;

  // per chi usa il lettore di schermo: la data intera e cosa c'e'
  const etichetta = [
    formatta(data, t, { weekday: "long", day: "numeric", month: "long" }),
    oggi && t.oggi,
    allenamento && t.training,
    alimentazione && t.alimentazione,
    riposo && t.riposo,
    fatto && t.fatto,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      href={`/app/giorno/${data}`}
      // 30 celle: niente prefetch di ognuna, si carica al tocco
      prefetch={false}
      onClick={segnaDalCalendario}
      aria-label={etichetta}
      aria-current={oggi ? "date" : undefined}
      className={`relative flex min-h-0 flex-col items-center justify-center overflow-hidden rounded-xl transition-colors ${
        fatto ? "bg-emerald-50 active:bg-emerald-100" : "active:bg-neutral-100"
      } ${oggi ? "ring-2 ring-inset ring-[var(--app-colore)]" : ""}`}
    >
      <span
        className={`text-lg leading-none tabular-nums ${
          oggi ? "font-bold text-[var(--app-colore-scuro)]" : "font-medium"
        }`}
      >
        {Number(data.slice(8))}
      </span>
      <span className="mt-1.5 flex h-1.5 gap-1" aria-hidden>
        {allenamento && <span className={PUNTO_ALLENAMENTO} />}
        {alimentazione && <span className={PUNTO_ALIMENTAZIONE} />}
        {riposo && !allenamento && <span className={PUNTO_RIPOSO} />}
      </span>
      {fatto && (
        <Check
          className="absolute right-1 top-1 size-3.5 text-emerald-600"
          strokeWidth={3}
          aria-hidden
        />
      )}
    </Link>
  );
}

export default function Calendario({
  mese,
  stato,
  oggi,
}: {
  mese: MeseISO;
  stato: StatoMese | undefined;
  oggi: DataISO | null;
}) {
  const t = useTesti();
  // da che lato entra il mese nuovo (solo animazione)
  const [verso, setVerso] = useState<-1 | 0 | 1>(0);
  const settimane = grigliaMese(mese);
  const giornate = stato?.tipo === "ok" ? stato.giornate : {};
  const titolo = maiuscola(formatta(`${mese}-01`, t, { month: "long", year: "numeric" }));

  function sposta(n: -1 | 1) {
    setVerso(n);
    impostaMeseVisto(spostaMese(mese, n));
  }

  const gesto = useScorrimentoLaterale(
    () => sposta(1),
    () => sposta(-1),
  );

  return (
    <section className={`${CARTA} flex min-h-0 flex-1 flex-col px-2 pb-2 pt-1`} aria-label={titolo}>
      <div className="flex shrink-0 items-center justify-between">
        <button type="button" onClick={() => sposta(-1)} aria-label={t.mesePrima} className={FRECCIA}>
          <ChevronLeft className="size-6" aria-hidden />
        </button>
        <h2 className="truncate text-lg font-bold" aria-live="polite">
          {titolo}
        </h2>
        <button type="button" onClick={() => sposta(1)} aria-label={t.meseDopo} className={FRECCIA}>
          <ChevronRight className="size-6" aria-hidden />
        </button>
      </div>

      <div
        className="grid shrink-0 grid-cols-7 gap-0.5 pb-1 text-center text-[13px] font-medium text-neutral-500"
        aria-hidden
      >
        {t.settimana.map((g) => (
          <span key={g}>{g}</span>
        ))}
      </div>

      {/* le settimane si dividono l'altezza che resta; il dito di lato cambia mese */}
      <div
        key={mese}
        className={`grid min-h-0 flex-1 grid-cols-7 gap-0.5 ${RIGHE[settimane.length] ?? "grid-rows-6"} ${ENTRATA[verso]}`}
        {...gesto}
      >
        {settimane.flat().map((data, i) =>
          data ? (
            <Cella key={data} data={data} giornata={giornate[data]} oggi={data === oggi} />
          ) : (
            <span key={`vuota-${i}`} aria-hidden />
          ),
        )}
      </div>

      {stato?.tipo === "errore" ? (
        // al posto della legenda: una riga, non un blocco che spinge giu' tutto
        <div role="alert" className="mt-1 flex shrink-0 items-center justify-between gap-3 pl-2">
          <p className="min-w-0 text-[15px] leading-snug">{t.erroreCarica}</p>
          <button
            type="button"
            onClick={() => void caricaMese(mese)}
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-neutral-900 px-3.5 text-[15px] font-semibold text-white active:opacity-80"
          >
            <RotateCw className="size-4" aria-hidden />
            {t.riprova}
          </button>
        </div>
      ) : (
        <ul className="mt-1 flex shrink-0 flex-wrap justify-center gap-x-3 gap-y-0.5 px-1 text-[13px] text-neutral-600 [@media(max-height:640px)]:hidden">
          <li className="flex items-center gap-1.5">
            <span className={PUNTO_ALLENAMENTO} aria-hidden />
            {t.training}
          </li>
          <li className="flex items-center gap-1.5">
            <span className={PUNTO_ALIMENTAZIONE} aria-hidden />
            {t.alimentazione}
          </li>
          <li className="flex items-center gap-1.5">
            <span className={PUNTO_RIPOSO} aria-hidden />
            {t.riposo}
          </li>
          <li className="flex items-center gap-1.5">
            <Check className="size-3.5 text-emerald-600" strokeWidth={3} aria-hidden />
            {t.fatto}
          </li>
        </ul>
      )}
    </section>
  );
}
