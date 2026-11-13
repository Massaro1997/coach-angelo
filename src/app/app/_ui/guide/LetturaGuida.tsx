"use client";

// /app/guide/<slug>: una guida da leggere. Dettaglio della Home (la barra
// accende "Home"), "‹" torna alle guide o un passo indietro vero.
// Dall'alto: foto grande 16:9 in una card arrotondata (chiara, niente testo
// sopra), titolo, riga sotto e minuti di lettura, poi i blocchi (testo a
// 17 px ben spaziato, titoletti, elenchi, il consiglio in un riquadro bianco
// con l'icona 3D della guida). In fondo la card per scrivere al coach e due
// altre guide in griglia, cosi' non si finisce in un vicolo cieco.
// Uno slug che non c'e' (link vecchio, indirizzo scritto a mano) mostra un
// vuoto con il tasto per tutte le guide, dentro l'app e non il 404 del sito.

import Image from "next/image";
import { IoChevronForward } from "react-icons/io5";
import { fotoSrc, type NomeIcona } from "../immagini";
import { Icona3D, Scheda, Sezione, Tasto, Vuoto, useLingua } from "../kit";
import AppShell from "../shell/AppShell";
import CardGuida from "./CardGuida";
import { GUIDE, guidaDa, type Blocco, type Guida } from "./dati";

const TXT = {
  de: {
    titolo: "Guide",
    tutteTitolo: "Guides",
    lettura: (n: number) => `${n} Min. Lesezeit`,
    domanda: "Frage an deinen Coach",
    domandaSotto: "Schreib direkt hier in der App.",
    altre: "Weiterlesen",
    nonTrovata: "Diesen Guide gibt es nicht",
    nonTrovataTesto: "Vielleicht hat er einen neuen Namen. Alle Guides findest du hier.",
    tutte: "Alle Guides",
  },
  it: {
    titolo: "Guida",
    tutteTitolo: "Guide",
    lettura: (n: number) => `${n} min di lettura`,
    domanda: "Domanda al tuo coach",
    domandaSotto: "Scrivi direttamente qui nell'app.",
    altre: "Leggi anche",
    nonTrovata: "Questa guida non c'è",
    nonTrovataTesto: "Forse ha cambiato nome. Qui trovi tutte le guide.",
    tutte: "Tutte le guide",
  },
};

/**
 * Le due guide sotto questa: prima una dello stesso tema, poi una di un tema
 * diverso, nell'ordine della lista a partire dalla guida dopo (in giro).
 * Sempre le stesse per la stessa guida: niente sorprese tornando indietro.
 */
function consigliate(g: Guida): Guida[] {
  const i = GUIDE.indexOf(g);
  const giro = [...GUIDE.slice(i + 1), ...GUIDE.slice(0, Math.max(i, 0))];
  const stessa = giro.find((x) => x.categoria === g.categoria);
  const scelte = stessa ? [stessa] : [];
  for (const x of giro) {
    if (scelte.length === 2) break;
    if (!scelte.includes(x) && (scelte.length === 0 || x.categoria !== scelte[0].categoria)) scelte.push(x);
  }
  // non dovrebbe servire (ci sono 4 temi), ma la griglia resta completa
  for (const x of giro) if (scelte.length < 2 && !scelte.includes(x)) scelte.push(x);
  return scelte.slice(0, 2);
}

/**
 * "Tierisch: Hähnchen, Pute …": se tutte le voci di un elenco hanno
 * un'etichetta corta prima di ": ", l'etichetta va in grassetto (si legge
 * scorrendo). Se solo alcune ce l'hanno, l'elenco resta tutto normale.
 */
function conEtichette(punti: string[]): [string, string][] | null {
  const divise = punti.map((p): [string, string] | null => {
    const i = p.indexOf(": ");
    return i > 0 && i <= 32 ? [p.slice(0, i), p.slice(i + 2)] : null;
  });
  return divise.every((d) => d !== null) ? (divise as [string, string][]) : null;
}

/** Spazio sopra un blocco: piu' aria prima dei titoletti, poca tra titoletto e testo. */
function margine(blocchi: Blocco[], i: number): string {
  if (i === 0) return "";
  const b = blocchi[i];
  const prima = blocchi[i - 1];
  if (b.tipo === "titolo") return "mt-8";
  if (b.tipo === "consiglio" || prima.tipo === "consiglio") return "mt-6";
  if (prima.tipo === "titolo") return "mt-2";
  return "mt-4";
}

function Blocchi({ blocchi, icona }: { blocchi: Blocco[]; icona: NomeIcona }) {
  return (
    <>
      {blocchi.map((b, i) => {
        const m = margine(blocchi, i);
        switch (b.tipo) {
          case "testo":
            return (
              <p key={i} className={`${m} text-[17px] leading-[1.6] text-neutral-800`}>
                {b.testo}
              </p>
            );
          case "titolo":
            return (
              <h3 key={i} className={`${m} text-[20px] font-bold leading-snug text-neutral-900`}>
                {b.testo}
              </h3>
            );
          case "punti": {
            const etichette = conEtichette(b.punti);
            return (
              <ul key={i} className={`${m} space-y-2.5`}>
                {b.punti.map((p, j) => (
                  <li key={j} className="flex gap-3 text-[17px] leading-[1.55] text-neutral-800">
                    <span aria-hidden className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--app-colore,#e30613)]" />
                    <span className="min-w-0">
                      {etichette ? (
                        <>
                          <strong className="font-semibold text-neutral-900">{etichette[j][0]}</strong>: {etichette[j][1]}
                        </>
                      ) : (
                        p
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            );
          }
          case "consiglio":
            return (
              <div
                key={i}
                className={`${m} flex items-center gap-3.5 rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]`}
              >
                <Icona3D nome={icona} dimensione={44} />
                <p className="min-w-0 text-[16px] font-semibold leading-snug text-neutral-900">{b.testo}</p>
              </div>
            );
        }
      })}
    </>
  );
}

export default function LetturaGuida({ slug }: { slug: string }) {
  const lingua = useLingua();
  const tx = TXT[lingua];
  const guida = guidaDa(slug);

  if (!guida) {
    return (
      <AppShell tab="home" titolo={tx.tutteTitolo} indietro="/app/guide">
        <Vuoto
          icona={<Icona3D nome="libro" dimensione={64} />}
          titolo={tx.nonTrovata}
          testo={tx.nonTrovataTesto}
          azione={<Tasto href="/app/guide">{tx.tutte}</Tasto>}
        />
      </AppShell>
    );
  }

  const testo = guida[lingua];
  return (
    <AppShell tab="home" titolo={tx.titolo} indietro="/app/guide">
      <article lang={lingua} className="pt-2">
        {/* testata in stile Apple: titolo dentro la foto, in basso */}
        <div
          className="relative isolate flex w-full flex-col justify-end overflow-hidden rounded-[22px] bg-neutral-800 text-white shadow-[0_2px_14px_rgba(0,0,0,0.08)]"
          style={{ aspectRatio: "4/3" }}
        >
          <Image
            src={fotoSrc(guida.foto)}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 36rem) 100vw, 36rem"
            draggable={false}
            loading="eager"
            fetchPriority="high"
            className="-z-10 select-none object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 -z-10 h-[75%] bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.42)_45%,rgba(0,0,0,0)_100%)]"
          />
          <div className="px-5 pb-5 pt-16">
            <span className="inline-flex rounded-full bg-white/20 px-2.5 py-0.5 text-[12px] font-semibold text-white backdrop-blur-md">
              {tx.lettura(guida.minuti)}
            </span>
            <h2 className="mt-2 text-[26px] font-bold leading-[1.12] tracking-[-0.015em] [text-shadow:0_1px_12px_rgba(0,0,0,0.25)]">
              {testo.titolo}
            </h2>
            <p className="mt-1 text-[16px] font-medium leading-snug text-white/85">{testo.sotto}</p>
          </div>
        </div>

        <div className="mt-6">
          <Blocchi blocchi={testo.blocchi} icona={guida.icona} />
        </div>
      </article>

      <div className="mt-10">
        <Scheda href="/app/coach">
          <span className="flex items-center gap-4">
            <Icona3D nome="chat" dimensione={48} />
            <span className="min-w-0 flex-1">
              <span className="block text-[17px] font-bold leading-snug">{tx.domanda}</span>
              <span className="mt-0.5 block text-[15px] leading-snug text-neutral-500">{tx.domandaSotto}</span>
            </span>
            <IoChevronForward className="h-5 w-5 shrink-0 text-neutral-400" aria-hidden />
          </span>
        </Scheda>
      </div>

      <Sezione titolo={tx.altre}>
        <ul className="grid grid-cols-2 gap-3">
          {consigliate(guida).map((g) => (
            <li key={g.slug} className="flex">
              <CardGuida guida={g} />
            </li>
          ))}
        </ul>
      </Sezione>
    </AppShell>
  );
}
