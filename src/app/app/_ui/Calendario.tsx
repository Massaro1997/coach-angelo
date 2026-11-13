"use client";

// I due modi di vedere il piano, senza scorrimenti propri (scorre
// #app-scroll di AppShell) e con altezze fisse, cosi' arrivando i dati non
// salta niente:
// - GrigliaMese: il mese da lunedi', celle alte uguali. Nel tondo il numero:
//   nero oggi, verde se fatto. Sotto un puntino: nero allenamento, verde solo
//   alimentazione, grigio riposo. Sotto la griglia, nella stessa card, la
//   legenda.
// - ListaSettimana: i 7 giorni in righe, ognuna con l'icona 3D del tipo di
//   giorno (manubri allenamento, luna riposo, ciotola solo pasti), il titolo
//   dell'allenamento e la spunta verde quando e' fatto; oggi col giorno nero.
// Tocco su un giorno = /app/giorno/[data] (passo avanti: "‹" torna qui).

import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";
import type { DataISO, Giornata, MeseISO } from "@/lib/app-coaching/tipi";
import { aggiungiGiorni, grigliaMese } from "@/lib/app-coaching/date";
import type { StatoMese } from "./archivio";
import {
  dettaglioGiorno,
  formatta,
  haAlimentazione,
  haAllenamento,
  haPiano,
  titoloGiorno,
  useTesti,
} from "./comuni";
import { Icona3D, Lista } from "./kit";
import type { NomeIcona } from "./immagini";
import { segnaAvanti } from "./navigazione";

const PUNTO = "h-1.5 w-1.5 rounded-full";
export const PUNTO_ALLENAMENTO = `${PUNTO} bg-neutral-800`;
export const PUNTO_ALIMENTAZIONE = `${PUNTO} bg-emerald-500`;
export const PUNTO_RIPOSO = `${PUNTO} bg-neutral-300`;

/** Colori del tondo col numero del giorno. */
function tondo(oggi: boolean, fatto: boolean): string {
  if (oggi) return fatto ? "bg-emerald-600 font-bold text-white" : "bg-neutral-900 font-bold text-white";
  return fatto ? "bg-[#dff5e3] font-semibold text-[#14532d]" : "font-medium text-neutral-900";
}

/**
 * L'icona 3D del tipo di giorno, come la foto in cima al giorno: il riposo
 * vince (anche con un po' di mobilita'), poi allenamento, poi solo pasti;
 * con la sola nota del coach il piano scritto.
 */
function iconaGiorno(g: Giornata): NomeIcona {
  if (g.riposo) return "luna";
  if (haAllenamento(g)) return "manubri";
  if (haAlimentazione(g)) return "ciotola";
  return "scheda";
}

function useEtichetta() {
  const t = useTesti();
  // per chi usa il lettore di schermo: la data intera e cosa c'e'
  return (data: DataISO, g: Giornata | undefined, oggi: boolean) =>
    [
      formatta(data, t, { weekday: "long", day: "numeric", month: "long" }),
      oggi && t.oggi,
      haPiano(g) && titoloGiorno(g, t),
      g?.fatto && t.fatto,
    ]
      .filter(Boolean)
      .join(", ");
}

// ---------------------------------------------------------------- mese

export function GrigliaMese({
  mese,
  stato,
  oggi,
}: {
  mese: MeseISO;
  stato: StatoMese | undefined;
  oggi: DataISO | null;
}) {
  const t = useTesti();
  const etichetta = useEtichetta();
  const giornate = stato?.tipo === "ok" ? stato.giornate : {};
  const settimane = grigliaMese(mese);

  return (
    <div>
      <div className="grid grid-cols-7 pb-1.5 text-center text-[13px] font-semibold text-neutral-400" aria-hidden>
        {t.settimana.map((g) => (
          <span key={g}>{g}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {settimane.flat().map((data, i) => {
          if (!data) return <span key={`vuota-${i}`} aria-hidden />;
          const g = giornate[data];
          const eOggi = data === oggi;
          const fatto = !!g?.fatto;
          const allenamento = !!g && haAllenamento(g);
          const alimentazione = !!g && haAlimentazione(g);
          const riposo = !!g?.riposo;
          return (
            <Link
              key={data}
              href={`/app/giorno/${data}`}
              // 30 celle: niente prefetch di ognuna, si carica al tocco
              prefetch={false}
              onClick={segnaAvanti}
              aria-label={etichetta(data, g, eOggi)}
              aria-current={eOggi ? "date" : undefined}
              className="flex h-[52px] flex-col items-center justify-center rounded-2xl transition-colors active:bg-neutral-100"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[16px] tabular-nums ${tondo(eOggi, fatto)}`}
              >
                {Number(data.slice(8))}
              </span>
              <span className="mt-0.5 flex h-1.5 items-center gap-0.5" aria-hidden>
                {allenamento && <span className={PUNTO_ALLENAMENTO} />}
                {!allenamento && alimentazione && <span className={PUNTO_ALIMENTAZIONE} />}
                {!allenamento && !alimentazione && riposo && <span className={PUNTO_RIPOSO} />}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/** Cosa vogliono dire tondi e puntini, sotto la griglia (nella stessa card). */
export function Legenda() {
  const t = useTesti();
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 px-1 text-[14px] text-neutral-600">
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
        <span className="h-3 w-3 rounded-full bg-[#dff5e3] ring-1 ring-[#14532d]/20" aria-hidden />
        {t.fatto}
      </li>
    </ul>
  );
}

// ---------------------------------------------------------------- settimana

export function ListaSettimana({
  lunedi,
  mesi,
  oggi,
}: {
  lunedi: DataISO;
  /** i mesi toccati dalla settimana (uno o due) */
  mesi: Partial<Record<MeseISO, StatoMese>>;
  oggi: DataISO | null;
}) {
  const t = useTesti();
  const etichetta = useEtichetta();

  return (
    <Lista>
      {t.settimana.map((sigla, i) => {
        const data = aggiungiGiorni(lunedi, i);
        const stato = mesi[data.slice(0, 7)];
        const pronto = stato?.tipo === "ok";
        const g = pronto ? stato.giornate[data] : undefined;
        const conPiano = haPiano(g);
        const eOggi = data === oggi;
        const dettaglio = conPiano ? dettaglioGiorno(g, t) : "";
        return (
          <Link
            key={data}
            href={`/app/giorno/${data}`}
            prefetch={false}
            onClick={segnaAvanti}
            aria-label={etichetta(data, g, eOggi)}
            aria-current={eOggi ? "date" : undefined}
            className="flex min-h-[76px] items-center gap-3 px-4 py-3 transition-colors active:bg-neutral-50"
          >
            <span
              className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl leading-none ${
                eOggi ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-900"
              }`}
              aria-hidden
            >
              <span className={`text-[12px] font-semibold ${eOggi ? "text-white/70" : "text-neutral-500"}`}>{sigla}</span>
              <span className="mt-1 text-[18px] font-bold tabular-nums">{Number(data.slice(8))}</span>
            </span>
            {/* posto fisso per l'icona: i titoli restano in colonna anche nei giorni vuoti */}
            <span className="flex size-10 shrink-0 items-center justify-center" aria-hidden>
              {!pronto ? (
                <span className="size-9 rounded-full bg-black/[0.06]" />
              ) : conPiano ? (
                <Icona3D nome={iconaGiorno(g)} dimensione={40} />
              ) : null}
            </span>
            <span className="min-w-0 flex-1" aria-hidden>
              {!pronto ? (
                <span className="block h-4 w-32 rounded-full bg-black/[0.06]" />
              ) : conPiano ? (
                <>
                  <span className="block truncate text-[16px] font-semibold">{titoloGiorno(g, t)}</span>
                  {dettaglio && <span className="block truncate text-[14px] text-neutral-500">{dettaglio}</span>}
                </>
              ) : (
                <span className="block truncate text-[16px] text-neutral-400">{t.nientePianoBreve}</span>
              )}
            </span>
            {g?.fatto && <IoCheckmarkCircle className="h-6 w-6 shrink-0 text-emerald-600" aria-hidden />}
          </Link>
        );
      })}
    </Lista>
  );
}
