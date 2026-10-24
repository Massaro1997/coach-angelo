"use client";

// Contratto a ore: il cliente sceglie quante ore al mese e mette le
// crocette, come su un modulo di carta. Le caselle hanno la X vera anche
// in stampa, cosi' il PDF del contratto si legge come quello firmato a mano.

import { Gift } from "lucide-react";
import {
  OPZIONI_ORE,
  allaSettimana,
  type ScelteOre,
  type VocePreventivo,
} from "@/lib/preventivo-listino";

export type BozzaScelte = Omit<ScelteOre, "am">;

export const scelteVuote = (ore = 0): BozzaScelte => ({
  ore,
  ziele: [],
  tage: [],
  zeiten: [],
  orte: [],
  gesundheit: false,
  bedingungen: false,
  sofortBeginn: false,
});

const eur0 = (n: number) => `${n.toLocaleString("de-DE")} €`;

/** La casella con la X. */
export function Casella({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 bg-white text-neutral-900 ${
        on ? "border-neutral-900" : "border-black/25"
      }`}
    >
      {on && (
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
          <path d="M4 4l12 12M16 4L4 16" />
        </svg>
      )}
    </span>
  );
}

/** Una riga spuntabile: casella + testo. */
export function Spunta({
  on,
  onClick,
  sola,
  children,
  className = "",
}: {
  on: boolean;
  onClick: () => void;
  sola?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      disabled={sola}
      onClick={onClick}
      className={`flex items-start gap-2.5 text-left disabled:cursor-default ${className}`}
    >
      <Casella on={on} />
      <span className="pt-px">{children}</span>
    </button>
  );
}

const T = {
  de: {
    titolo: "Dein Stundenpaket",
    scegli: "Wie viele Stunden pro Monat möchtest du buchen? Bitte ein Feld ankreuzen.",
    fisse: "Mit Angelo vereinbart:",
    std: "Std.",
    stunden: "Stunden pro Monat",
    mese: "/ Monat",
    bonus: "geschenkt — gratis, wird getrennt gezählt",
    gratis: "Erstes Treffen kostenlos: Kennenlernen, Check-up und Probetraining",
    angaben: "Deine Angaben",
    mehrfach: "Mehrfachauswahl möglich",
    ziele: "Deine Ziele",
    tage: "Bevorzugte Tage",
    zeiten: "Bevorzugte Uhrzeit",
    orte: "Wo möchtest du trainieren?",
  },
  it: {
    titolo: "Il tuo pacchetto ore",
    scegli: "Quante ore al mese vuoi prenotare? Metti una crocetta.",
    fisse: "Concordato con Angelo:",
    std: "ore",
    stunden: "ore al mese",
    mese: "/ mese",
    bonus: "in regalo — gratis, contate a parte",
    gratis: "Primo incontro gratis: conoscenza, check-up e allenamento di prova",
    angaben: "I tuoi dati",
    mehrfach: "Puoi scegliere più risposte",
    ziele: "I tuoi obiettivi",
    tage: "Giorni preferiti",
    zeiten: "Orario preferito",
    orte: "Dove vuoi allenarti?",
  },
};

const titoletto = "text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500";

/** Selettore delle ore + ore regalate + prima visita gratis. */
export function SceltaOre({
  voce,
  bonus,
  sc,
  setSc,
  sola,
  lingua,
}: {
  voce: VocePreventivo;
  bonus: VocePreventivo | null;
  sc: BozzaScelte;
  setSc: (s: BozzaScelte) => void;
  sola: boolean;
  lingua: string;
}) {
  const t = T[lingua === "it" ? "it" : "de"];
  const fisse = voce.oreFisse;
  const lista = voce.ore?.length ? voce.ore : [];

  return (
    <section className="mt-8 border-t border-black/10 pt-6 break-inside-avoid">
      <p className={titoletto}>{t.titolo}</p>

      {fisse ? (
        <div className="mt-3 flex items-center gap-3 border border-neutral-900 bg-white p-4">
          <Casella on />
          <div>
            <p className="text-xs text-neutral-500">{t.fisse}</p>
            <p className="font-bold text-neutral-900">
              {fisse} {t.stunden} · {eur0(fisse * voce.prezzo)} {t.mese}
            </p>
            <p className="text-xs text-neutral-500">{allaSettimana(fisse)}</p>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-1 text-sm text-neutral-600">{t.scegli}</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {lista.map((n) => {
              const on = sc.ore === n;
              return (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  disabled={sola}
                  onClick={() => setSc({ ...sc, ore: n })}
                  className={`flex items-start gap-2 border bg-white p-2.5 text-left transition-colors disabled:cursor-default sm:p-3 ${
                    on ? "border-neutral-900 shadow-[0_6px_18px_rgba(0,0,0,0.08)]" : "border-black/10 hover:border-black/30"
                  }`}
                >
                  <Casella on={on} />
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-neutral-900 sm:text-base">
                      {n} {t.std}
                    </span>
                    <span className="block text-xs font-semibold tabular-nums text-neutral-700">
                      {eur0(n * voce.prezzo)}
                    </span>
                    <span className="block text-[10px] leading-tight text-neutral-500 sm:text-[11px]">
                      {allaSettimana(n)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {bonus && (
        <p className="mt-3 flex items-start gap-2 border border-dashed border-black/20 bg-[#fafafa] px-3 py-2.5 text-sm text-neutral-700">
          <Gift className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900" />
          <span>
            <strong>
              + {bonus.quantita} {bonus.descrizione.includes("ersten Monat") ? "Bonusstunden im ersten Monat" : "Bonusstunden pro Monat"}
            </strong>{" "}
            {t.bonus}
          </span>
        </p>
      )}
      <p className="mt-2 flex items-start gap-2 px-3 text-sm text-neutral-700">
        <Gift className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900" />
        <span>{t.gratis}</span>
      </p>
    </section>
  );
}

/** Le crocette a scelta multipla: obiettivi, giorni, orari, luogo. */
export function Angaben({
  sc,
  setSc,
  sola,
  lingua,
}: {
  sc: BozzaScelte;
  setSc: (s: BozzaScelte) => void;
  sola: boolean;
  lingua: string;
}) {
  const t = T[lingua === "it" ? "it" : "de"];
  const gruppi = [
    { k: "ziele", titolo: t.ziele, valori: OPZIONI_ORE.ziele },
    { k: "tage", titolo: t.tage, valori: OPZIONI_ORE.tage },
    { k: "zeiten", titolo: t.zeiten, valori: OPZIONI_ORE.zeiten },
    { k: "orte", titolo: t.orte, valori: OPZIONI_ORE.orte },
  ] as const;

  const cambia = (k: (typeof gruppi)[number]["k"], v: string) => {
    const ora = sc[k];
    setSc({ ...sc, [k]: ora.includes(v) ? ora.filter((x) => x !== v) : [...ora, v] });
  };

  return (
    <section className="mt-8 border-t border-black/10 pt-6 break-inside-avoid">
      <p className={titoletto}>
        {t.angaben} <span className="normal-case tracking-normal text-neutral-500">· {t.mehrfach}</span>
      </p>
      <div className="mt-3 space-y-5">
        {gruppi.map((g) => (
          <div key={g.k}>
            <p className="text-sm font-bold text-neutral-900">{g.titolo}</p>
            <div className={`mt-2 flex flex-wrap ${g.k === "tage" ? "gap-x-4 gap-y-2" : "gap-x-6 gap-y-2.5"}`}>
              {g.valori.map((v) => (
                <Spunta key={v} on={sc[g.k].includes(v)} onClick={() => cambia(g.k, v)} sola={sola} className="text-sm text-neutral-700">
                  {v}
                </Spunta>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
