"use client";

// Training del giorno, sotto la foto del giorno (Giorno), che ne porta gia'
// titolo, durata e numero di esercizi: qui la testata con i manubri 3D, la
// nota del coach sull'allenamento, poi gli esercizi in UNA card come lista
// curata (numero nel tondo, nome grande, i numeri che servono in palestra in
// pillole, note, video come tasto piccolo). Card unica e non una per
// esercizio: si legge come una scheda d'allenamento, non come un modulo.
// Nessuno scorrimento proprio: scorre #app-scroll di AppShell.
// TestataParte e NotaPiano li usa anche Alimentazione: stesse testate e note.

import type { ReactNode } from "react";
import { IoPlayCircle } from "react-icons/io5";
import type { Allenamento, Esercizio } from "@/lib/app-coaching/tipi";
import type { Testi } from "../testi";
import { CARTA, linkSicuro, useTesti } from "./comuni";
import { Icona3D } from "./kit";
import type { NomeIcona } from "./immagini";

/** Testata di una parte del giorno: icona 3D e titolo. */
export function TestataParte({ id, icona, titolo }: { id: string; icona: NomeIcona; titolo: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3 px-1">
      <Icona3D nome={icona} dimensione={40} />
      <h2 id={id} className="min-w-0 flex-1 truncate text-[20px] font-bold">
        {titolo}
      </h2>
    </div>
  );
}

/** Nota scritta dal coach su allenamento o pasti: la scheda 3D dice cos'e', niente titoletto. */
export function NotaPiano({ testo }: { testo: string }) {
  return (
    <div className={`${CARTA} flex gap-3 p-4`}>
      <Icona3D nome="scheda" dimensione={40} />
      <p className="min-w-0 flex-1 self-center whitespace-pre-line break-words text-[16px] leading-relaxed text-neutral-800">
        {testo}
      </p>
    </div>
  );
}

function Pill({ children, forte }: { children: ReactNode; forte?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 tabular-nums ${
        forte ? "text-[16px] font-bold text-neutral-900" : "text-[15px] font-medium text-neutral-700"
      }`}
    >
      {children}
    </span>
  );
}

function serieRipetizioni(e: Esercizio, t: Testi): string | null {
  const s = e.serie?.trim();
  const r = e.ripetizioni?.trim();
  if (s && r) return t.serieRip(s, r);
  if (s) return t.soloSerie(s);
  if (r) return t.soloRip(r);
  return null;
}

function VoceEsercizio({ e, n }: { e: Esercizio; n: number }) {
  const t = useTesti();
  const sr = serieRipetizioni(e, t);
  const carico = e.carico?.trim();
  const pausa = e.pausa?.trim();
  const note = e.note?.trim();
  const video = linkSicuro(e.video);

  return (
    <li className="flex gap-3.5 p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-900 text-[16px] font-bold text-white tabular-nums">
        {n}
      </span>
      {/* pt: il nome sta in riga col numero */}
      <div className="min-w-0 flex-1 pt-1">
        <h3 className="text-[18px] font-bold leading-snug break-words">{e.nome}</h3>
        {(sr || carico || pausa) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {sr && <Pill forte>{sr}</Pill>}
            {carico && (
              <Pill>
                <span className="sr-only">{t.carico}: </span>
                {carico}
              </Pill>
            )}
            {pausa && <Pill>{t.pausa(pausa)}</Pill>}
          </div>
        )}
        {note && <p className="mt-2 whitespace-pre-line break-words text-[15px] leading-relaxed text-neutral-600">{note}</p>}
        {video && (
          <a
            href={video}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-100 pl-3 pr-4 text-[15px] font-semibold text-neutral-900 transition-colors active:bg-neutral-200"
          >
            <IoPlayCircle className="size-5 text-[var(--app-colore)]" aria-hidden />
            {t.video}
          </a>
        )}
      </div>
    </li>
  );
}

export default function SezioneAllenamento({ allenamento }: { allenamento: Allenamento }) {
  const t = useTesti();
  const esercizi = allenamento.esercizi ?? [];
  const nota = allenamento.note?.trim();

  return (
    <section aria-labelledby="sezione-training">
      {/* durata e numero di esercizi li dice gia' la foto del giorno */}
      <TestataParte id="sezione-training" icona="manubri" titolo={t.training} />

      {nota && (
        <div className="mb-3">
          <NotaPiano testo={nota} />
        </div>
      )}

      {esercizi.length > 0 && (
        <ol className={`${CARTA} divide-y divide-black/[0.06] overflow-hidden`}>
          {esercizi.map((e, i) => (
            <VoceEsercizio key={e.id || i} e={e} n={i + 1} />
          ))}
        </ol>
      )}
    </section>
  );
}
