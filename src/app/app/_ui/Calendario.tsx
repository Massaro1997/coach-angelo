"use client";

// Calendario del mese, da lunedi'. Ogni giorno e' una cella grande da toccare
// col pollice; i puntini dicono cosa c'e': rosso allenamento, verde
// alimentazione, grigio riposo. La spunta vuol dire che il cliente l'ha fatto.

import Link from "next/link";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { DataISO, Giornata, MeseISO } from "@/lib/app-coaching/tipi";
import { grigliaMese, spostaMese } from "@/lib/app-coaching/date";
import { caricaMese, impostaMeseVisto, type StatoMese } from "./archivio";
import {
  CARTA,
  Errore,
  formatta,
  haAlimentazione,
  haAllenamento,
  maiuscola,
  useTesti,
} from "./comuni";

const PUNTO = "size-1.5 rounded-full";
const PUNTO_ALLENAMENTO = `${PUNTO} bg-[var(--app-colore)]`;
const PUNTO_ALIMENTAZIONE = `${PUNTO} bg-emerald-500`;
const PUNTO_RIPOSO = `${PUNTO} bg-neutral-300`;

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
      aria-label={etichetta}
      aria-current={oggi ? "date" : undefined}
      className={`relative flex aspect-square min-h-11 flex-col items-center justify-center rounded-xl transition-colors ${
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
  const settimane = grigliaMese(mese);
  const giornate = stato?.tipo === "ok" ? stato.giornate : {};
  const titolo = maiuscola(formatta(`${mese}-01`, t, { month: "long", year: "numeric" }));

  return (
    <section className={`${CARTA} px-2 pb-4 pt-2`} aria-label={titolo}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => impostaMeseVisto(spostaMese(mese, -1))}
          aria-label={t.mesePrima}
          className="grid size-11 place-items-center rounded-full text-neutral-700 active:bg-neutral-100"
        >
          <ChevronLeft className="size-6" aria-hidden />
        </button>
        <h2 className="text-xl font-bold" aria-live="polite">
          {titolo}
        </h2>
        <button
          type="button"
          onClick={() => impostaMeseVisto(spostaMese(mese, 1))}
          aria-label={t.meseDopo}
          className="grid size-11 place-items-center rounded-full text-neutral-700 active:bg-neutral-100"
        >
          <ChevronRight className="size-6" aria-hidden />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-0.5 text-center text-sm font-medium text-neutral-500" aria-hidden>
        {t.settimana.map((g) => (
          <span key={g} className="py-1">
            {g}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-0.5">
        {settimane.flat().map((data, i) =>
          data ? (
            <Cella key={data} data={data} giornata={giornate[data]} oggi={data === oggi} />
          ) : (
            <span key={`vuota-${i}`} aria-hidden />
          ),
        )}
      </div>

      {stato?.tipo === "errore" && (
        <div className="mt-3 px-1">
          <Errore testo={t.erroreCarica} onRiprova={() => void caricaMese(mese)} />
        </div>
      )}

      <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 px-2 text-[15px] text-neutral-600">
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
    </section>
  );
}
