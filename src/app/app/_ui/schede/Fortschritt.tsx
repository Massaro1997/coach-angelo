"use client";

// Scheda Fortschritt (app v2, giro «foto e icone» del 13/11): in alto i numeri
// in tessere uguali con l'icona 3D (griglia a due sempre completa), poi le
// misure col tasto «Messen» in testata (peso in linea, circonferenze, elenco)
// e in fondo l'allenamento delle ultime 12 settimane. Tutto nella zona che
// scorre di AppShell; modulo "Messen" e dettaglio di una misura in un Foglio.
// Prima ancora di avere dati: una card con foto e un solo invito, non una
// pagina di zeri. Solo presentazione: dati e salvataggi come prima.

import { useState, type ReactNode } from "react";
import { IoAdd } from "react-icons/io5";
import type { Misura, Progressi } from "@/lib/app-coaching/tipi-v2";
import type { NomeIcona } from "../immagini";
import { Caricamento, ErroreBox, Icona3D, Lista, Riga, Scheda, SchedaFoto, Sezione, Tasto, useLingua } from "../kit";
import { useApi } from "./api";
import { FoglioDettaglioMisura, FoglioNuovaMisura } from "./FoglioMisura";
import { dataBreve, dataCompleta, differenza, giornoBreve, numero, percentuale } from "./formati";
import { BarreSettimane, LineaPeso, SPAZIO_CIFRE_PESO } from "./grafici";
import { CAMPI_MISURA, CIRCONFERENZE, estremi, unitaDi, type CampoMisura } from "./misure";
import { useT, type TestiSchede } from "./testi-schede";

type Lingua = "de" | "it";
type FoglioAperto = null | { tipo: "nuova" } | { tipo: "misura"; misura: Misura };

// stringhe nuove di questo giro: locali, testi-schede.ts lo toccano altri in parallelo
const TXT = {
  de: {
    misure: "Messungen",
    costanza: "geschafft in 12 Wochen",
    nessunaMisura: "Noch keine Messung. Miss dich alle zwei Wochen, dann siehst du hier, was sich tut.",
  },
  it: {
    misure: "Misure",
    costanza: "fatti in 12 settimane",
    nessunaMisura: "Ancora nessuna misura. Misurati ogni due settimane e qui vedrai cosa cambia.",
  },
};
type Txt = (typeof TXT)["de"];

const MISURE_VISIBILI = 3;

const perData = (a: Misura, b: Misura) => (a.data < b.data ? -1 : a.data > b.data ? 1 : 0);

export default function Fortschritt() {
  const t = useT();
  const lingua = useLingua();
  const txt = TXT[lingua];
  const { stato, riprova, modifica } = useApi<Progressi>("/api/app/progressi", t);
  const [foglio, setFoglio] = useState<FoglioAperto>(null);
  const [tutte, setTutte] = useState(false);

  if (stato.tipo === "attesa") return <Caricamento />;
  if (stato.tipo === "errore") return <ErroreBox testo={stato.testo} riprova={riprova} />;

  const p = stato.dati;
  const misure = p.misure ?? [];
  const settimane = p.settimane ?? [];
  const apriNuova = () => setFoglio({ tipo: "nuova" });
  const senzaNiente =
    p.totaleFatti === 0 &&
    p.oreSvolte === 0 &&
    misure.length === 0 &&
    settimane.every((s) => s.pianificati === 0 && s.fatti === 0);

  const fogli =
    foglio?.tipo === "nuova" ? (
      <FoglioNuovaMisura
        ultimi={ultimiValori(misure)}
        onChiudi={() => setFoglio(null)}
        onSalvata={(m) => {
          modifica((d) => ({ ...d, misure: [...d.misure.filter((x) => x.id !== m.id), m].sort(perData) }));
          setFoglio(null);
        }}
      />
    ) : foglio?.tipo === "misura" ? (
      <FoglioDettaglioMisura
        misura={foglio.misura}
        onChiudi={() => setFoglio(null)}
        onEliminata={(id) => {
          modifica((d) => ({ ...d, misure: d.misure.filter((x) => x.id !== id) }));
          setFoglio(null);
        }}
      />
    ) : null;

  if (senzaNiente) {
    return (
      <>
        <Sezione>
          <SchedaFoto foto="piano" priorita titolo={t.vuotoTitolo} sotto={t.vuotoTesto}>
            <Tasto pieno icona={<IoAdd aria-hidden />} onClick={apriNuova}>
              {t.primaMisura}
            </Tasto>
          </SchedaFoto>
        </Sezione>
        {fogli}
      </>
    );
  }

  const recenti = [...misure].reverse();
  const visibili = tutte ? recenti : recenti.slice(0, MISURE_VISIBILI);
  const pesi = misure.filter((m) => m.peso != null).map((m) => ({ data: m.data, valore: m.peso as number }));

  return (
    <>
      <Sezione>
        <div className="grid auto-rows-fr grid-cols-2 gap-3">
          {tessereNumeri(p, pesi, t, txt, lingua).map((d) => (
            <Numero key={d.chiave} {...d} />
          ))}
        </div>
      </Sezione>

      <Sezione
        titolo={txt.misure}
        azione={
          <Tasto icona={<IoAdd aria-hidden />} onClick={apriNuova}>
            {t.misura}
          </Tasto>
        }
      >
        {recenti.length === 0 ? (
          <Scheda>
            <div className="flex flex-col items-center px-2 py-6 text-center">
              <Icona3D nome="metro" dimensione={72} />
              <p className="mt-3 max-w-xs text-[15px] leading-snug text-neutral-600">{txt.nessunaMisura}</p>
            </div>
          </Scheda>
        ) : (
          <div className="space-y-3">
            {pesi.length > 0 && <SchedaPeso pesi={pesi} t={t} lingua={lingua} />}
            <SchedaUmfaenge misure={misure} t={t} lingua={lingua} />
            <Lista>
              {visibili.map((m) => (
                <Riga
                  key={m.id}
                  icona3d={m.peso != null ? "bilancia" : "metro"}
                  titolo={giornoBreve(m.data, lingua)}
                  sotto={riassunto(m, t, lingua)}
                  destra={m.peso != null ? `${numero(m.peso, lingua)} kg` : undefined}
                  onClick={() => setFoglio({ tipo: "misura", misura: m })}
                />
              ))}
            </Lista>
            {recenti.length > MISURE_VISIBILI && (
              <div className="-mt-1 flex justify-center">
                <Tasto variante="testo" onClick={() => setTutte((v) => !v)}>
                  {tutte ? t.mostraMeno : t.mostraTutte(recenti.length)}
                </Tasto>
              </div>
            )}
          </div>
        )}
      </Sezione>

      <SezioneTraining p={p} t={t} lingua={lingua} />

      {fogli}
    </>
  );
}

/* ----------------------------------------------------------- tessere */

type DatoNumero = { chiave: string; icona: NomeIcona; valore: ReactNode; etichetta: string; sotto?: string };

/**
 * I numeri in alto: serie, allenamenti del mese, costanza (o il totale) e
 * peso. La griglia a due resta completa: con un numero dispari di dati si
 * aggiunge un dato vero che non c'e' ancora (ore 1:1, totale), mai un buco.
 */
function tessereNumeri(
  p: Progressi,
  pesi: { data: string; valore: number }[],
  t: TestiSchede,
  txt: Txt,
  lingua: Lingua,
): DatoNumero[] {
  const s = p.statistiche;
  const settimane = p.settimane ?? [];
  const fatti12 = settimane.reduce((n, w) => n + w.fatti, 0);
  const pianificati12 = settimane.reduce((n, w) => n + w.pianificati, 0);

  const serie: DatoNumero = { chiave: "serie", icona: "fiamma", valore: s.serie, etichetta: t.serie(s.serie) };
  const mese: DatoNumero = {
    chiave: "mese",
    icona: "spunta",
    valore:
      s.mesePianificati > 0 ? (
        <>
          {s.meseFatti}
          <span className="text-[20px] text-neutral-400">/{s.mesePianificati}</span>
        </>
      ) : (
        s.meseFatti
      ),
    etichetta: t.allenamentiMese,
  };
  const totale = (icona: NomeIcona): DatoNumero => ({ chiave: "totale", icona, valore: p.totaleFatti, etichetta: t.totaleFatti });
  const ore: DatoNumero = { chiave: "ore", icona: "stretta", valore: p.oreSvolte, etichetta: t.ore1a1 };

  // coppa: la costanza delle ultime 12 settimane se c'e' un piano, se no il totale da sempre
  const costanza: DatoNumero | null =
    pianificati12 > 0
      ? { chiave: "costanza", icona: "coppa", valore: percentuale(Math.min(fatti12 / pianificati12, 1), lingua), etichetta: txt.costanza }
      : null;
  const coppa = costanza ?? (p.totaleFatti > 0 ? totale("coppa") : null);

  const primo = pesi[0];
  const ultimo = pesi[pesi.length - 1];
  const peso: DatoNumero | null = ultimo
    ? {
        chiave: "peso",
        icona: "bilancia",
        valore: (
          <>
            {numero(ultimo.valore, lingua)} <span className="text-[17px] font-semibold text-neutral-500">kg</span>
          </>
        ),
        etichetta: t.peso,
        // colore neutro: dimagrire o mettere massa dipende dall'obiettivo
        sotto: pesi.length > 1 ? `${differenza(ultimo.valore - primo.valore, lingua)} kg` : undefined,
      }
    : null;

  const out = [serie, mese, ...[coppa, peso].filter((d): d is DatoNumero => d !== null)];
  if (out.length % 2) out.push(p.oreSvolte > 0 || !costanza ? ore : totale("manubri"));
  return out;
}

function Numero({ icona, valore, etichetta, sotto }: DatoNumero) {
  return (
    <div className="flex flex-col rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <Icona3D nome={icona} dimensione={44} />
      <p className="mt-3 text-[30px] font-bold leading-none tabular-nums">{valore}</p>
      <p className="mt-1.5 text-[14px] leading-snug text-neutral-500">{etichetta}</p>
      {sotto && <p className="text-[14px] font-semibold leading-snug tabular-nums text-neutral-700">{sotto}</p>}
    </div>
  );
}

/* ------------------------------------------------------------- card */

/** Testata di una card: icona 3D, titolo, riga grigia; a destra un dato breve. */
function Testata({ icona, titolo, sotto, destra }: { icona: NomeIcona; titolo: ReactNode; sotto?: ReactNode; destra?: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <Icona3D nome={icona} dimensione={40} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[18px] font-bold leading-tight">{titolo}</h3>
        {sotto && <p className="mt-0.5 truncate text-[14px] text-neutral-500">{sotto}</p>}
      </div>
      {destra && <div className="shrink-0">{destra}</div>}
    </div>
  );
}

function SchedaPeso({ pesi, t, lingua }: { pesi: { data: string; valore: number }[]; t: TestiSchede; lingua: Lingua }) {
  const primo = pesi[0];
  const ultimo = pesi[pesi.length - 1];
  const diff = ultimo.valore - primo.valore;
  const curva = pesi.length > 1;

  return (
    <Scheda>
      <Testata icona="grafico" titolo={t.peso} sotto={curva ? t.dallInizio(dataCompleta(primo.data, lingua)) : undefined} />
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-[34px] font-bold leading-none tabular-nums">
          {numero(ultimo.valore, lingua)} <span className="text-[18px] font-semibold text-neutral-500">kg</span>
        </p>
        {/* colore neutro: dimagrire o mettere massa dipende dall'obiettivo */}
        {curva && <p className="text-[17px] font-semibold tabular-nums">{differenza(diff, lingua)} kg</p>}
      </div>
      {curva ? (
        <div className="mt-4">
          <LineaPeso
            punti={pesi}
            descrizione={t.grafPeso(dataCompleta(primo.data, lingua), dataCompleta(ultimo.data, lingua))}
            formato={(n) => numero(n, lingua)}
          />
          <div className={`mt-1.5 flex justify-between text-[12px] text-neutral-500 ${SPAZIO_CIFRE_PESO}`} aria-hidden>
            <span>{dataBreve(primo.data, lingua)}</span>
            <span>{dataBreve(ultimo.data, lingua)}</span>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-[15px] leading-snug text-neutral-500">{t.unaMisuraSola}</p>
      )}
    </Scheda>
  );
}

function SchedaUmfaenge({ misure, t, lingua }: { misure: Misura[]; t: TestiSchede; lingua: Lingua }) {
  const campi: CampoMisura[] = [...CIRCONFERENZE, "grasso"];
  const righe = campi.flatMap((c) => {
    const e = estremi(misure, c);
    return e ? [{ c, ...e }] : [];
  });
  if (!righe.length) return null;

  return (
    <Scheda>
      <Testata icona="metro" titolo={t.circonferenze} />
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
        {righe.map(({ c, primo, ultimo, quante }) => (
          <div key={c}>
            <p className="text-[14px] text-neutral-500">{t.campi[c]}</p>
            <p className="text-[22px] font-bold leading-tight tabular-nums">
              {numero(ultimo, lingua)} <span className="text-[14px] font-semibold text-neutral-500">{unitaDi(c)}</span>
            </p>
            {quante > 1 && (
              <p className="text-[14px] tabular-nums text-neutral-600">
                {differenza(ultimo - primo, lingua)} {unitaDi(c)}
              </p>
            )}
          </div>
        ))}
      </div>
    </Scheda>
  );
}

function SezioneTraining({ p, t, lingua }: { p: Progressi; t: TestiSchede; lingua: Lingua }) {
  const settimane = p.settimane ?? [];
  const fatti = settimane.reduce((n, s) => n + s.fatti, 0);
  const pianificati = settimane.reduce((n, s) => n + s.pianificati, 0);
  const conDati = fatti > 0 || pianificati > 0;
  const ultimo = settimane.length - 1;
  // etichette ogni 4 settimane, contate dalla fine: l'ultima e' "jetzt"
  const etichette = settimane.map((s, i) =>
    i === ultimo ? t.adesso : (ultimo - i) % 4 === 0 ? dataBreve(s.lunedi, lingua) : "",
  );
  const fatica = p.faticaMedia;

  return (
    <Sezione titolo={t.training}>
      <Scheda>
        <Testata icona="manubri" titolo={t.ultime12} />
        <p className="mt-4 text-[28px] font-bold leading-tight tabular-nums">
          {fatti}{" "}
          <span className="text-[16px] font-semibold text-neutral-500">
            {pianificati > 0 ? t.fattiDi(pianificati) : t.legendaFatti}
          </span>
        </p>

        {conDati ? (
          <div className="mt-4">
            <BarreSettimane settimane={settimane} etichette={etichette} descrizione={t.grafBarre(fatti, pianificati)} />
            <div className="mt-3 flex gap-4 text-[13px] text-neutral-600">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--app-colore,#e30613)]" aria-hidden />
                {t.legendaFatti}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ececef]" aria-hidden />
                {t.legendaPianificati}
              </span>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-[15px] leading-snug text-neutral-500">{t.nienteSettimane}</p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-black/[0.06] pt-3">
          <div>
            <p className="text-[14px] text-neutral-500">{t.faticaMedia}</p>
            <p className="text-[18px] font-semibold tabular-nums">
              {fatica != null ? `${numero(fatica, lingua)} / 5` : "–"}
            </p>
            {fatica != null && (
              <p className="text-[14px] text-neutral-500">{t.faticaVoci[Math.min(5, Math.max(1, Math.round(fatica))) - 1]}</p>
            )}
          </div>
          <div>
            <p className="text-[14px] text-neutral-500">{t.totaleFatti}</p>
            <p className="text-[18px] font-semibold tabular-nums">{p.totaleFatti}</p>
          </div>
        </div>
      </Scheda>
    </Sezione>
  );
}

/* --------------------------------------------------------------- utilita' */

function ultimiValori(misure: Misura[]): Partial<Record<CampoMisura, number>> {
  const out: Partial<Record<CampoMisura, number>> = {};
  for (const c of CAMPI_MISURA) {
    const e = estremi(misure, c);
    if (e) out[c] = e.ultimo;
  }
  return out;
}

/** "Taille 84 · Hüfte 98 · …" sotto la data di una misura. */
function riassunto(m: Misura, t: TestiSchede, lingua: Lingua): string | undefined {
  const parti = ([...CIRCONFERENZE, "grasso"] as CampoMisura[])
    .filter((c) => m[c] != null)
    .map((c) => `${t.campi[c]} ${numero(m[c] as number, lingua)}${c === "grasso" ? " %" : ""}`);
  return parti.length ? parti.join(" · ") : (m.nota ?? undefined);
}
