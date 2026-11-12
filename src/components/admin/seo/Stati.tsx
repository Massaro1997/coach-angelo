"use client";

import { ExternalLink, PlugZap } from "lucide-react";
import type { ErroreSeo } from "./tipi";

/* ------------------------------------------------------------ caricamento */

const Blocco = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-lg bg-black/[0.06] ${className}`} />
);

/** Stessa forma della pagina vera, cosi' quando arrivano i dati niente salta. */
export function Caricamento() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Carico i dati di Google">
      <Blocco className="h-6 w-full max-w-xl" />
      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="crm-card space-y-3 p-4">
            <Blocco className="h-3.5 w-28" />
            <Blocco className="h-9 w-24" />
            <Blocco className="h-3 w-32" />
            <Blocco className="h-3 w-full" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-12">
        <div className="crm-card p-4 2xl:col-span-7">
          <Blocco className="h-4 w-48" />
          <div className="mt-6 flex h-44 items-end gap-1 sm:h-56">
            {Array.from({ length: 28 }, (_, i) => (
              <div
                key={i}
                className="flex-1 animate-pulse rounded-t-[3px] bg-black/[0.06]"
                style={{ height: `${25 + ((i * 37) % 60)}%` }}
              />
            ))}
          </div>
        </div>
        <div className="crm-card space-y-3 p-4 2xl:col-span-5">
          <Blocco className="h-4 w-28" />
          {[0, 1, 2, 3].map((i) => (
            <Blocco key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
      <p className="text-[12px] text-crm-spento">Chiedo i numeri a Google Search Console…</p>
    </div>
  );
}

/* ------------------------------------------------------------ errore */

const CODICE = "rounded-md bg-crm-fondo-2 px-1 py-0.5 font-mono text-[12px] text-crm-ink";

function testi(e: ErroreSeo): { titolo: string; corpo: React.ReactNode; passi?: React.ReactNode[] } {
  switch (e.tipo) {
    case "token":
      return {
        titolo: "Il collegamento con Google si è interrotto",
        corpo: (
          <>
            Google ha ritirato il permesso con cui il gestionale legge Search Console. Succede quando cambia la password
            dell&apos;account Google, quando l&apos;accesso viene revocato o dopo mesi senza uso.{" "}
            <b>Il sito e la sua posizione su Google non ne risentono</b>: manca solo la lettura dei numeri.
          </>
        ),
        passi: [
          <>
            Nella cartella del progetto lancia <code className={CODICE}>node scripts/get-refresh-token.mjs</code> con i
            valori di <code className={CODICE}>GOOGLE_OAUTH_CLIENT_ID</code> e{" "}
            <code className={CODICE}>GOOGLE_OAUTH_CLIENT_SECRET</code>.
          </>,
          <>
            Si apre Google: entra con l&apos;account proprietario del sito in Search Console e dai il consenso. Il
            nuovo token viene scritto da solo in <code className={CODICE}>.env.local</code>.
          </>,
          <>
            Copia lo stesso valore di <code className={CODICE}>GSC_REFRESH_TOKEN</code> nelle variabili di Vercel
            (Production) e pubblica di nuovo il sito.
          </>,
        ],
      };
    case "config":
      return {
        titolo: "Search Console non è collegata",
        corpo: (
          <>
            Mancano le chiavi per leggere Google Search Console (
            <code className={CODICE}>GOOGLE_OAUTH_CLIENT_ID</code>, <code className={CODICE}>GOOGLE_OAUTH_CLIENT_SECRET</code>,{" "}
            <code className={CODICE}>GSC_REFRESH_TOKEN</code>). Chi gestisce il sito deve aggiungerle nelle variabili
            d&apos;ambiente.
          </>
        ),
      };
    case "permessi":
      return {
        titolo: "L'account collegato non vede questo sito",
        corpo: (
          <>
            Il collegamento con Google funziona, ma l&apos;account usato non ha accesso alla proprietà di Search
            Console. In Search Console, sotto Impostazioni e poi Utenti e autorizzazioni, aggiungi quell&apos;account
            come proprietario.
          </>
        ),
      };
    case "quota":
      return {
        titolo: "Google ha chiesto di rallentare",
        corpo: <>Troppe richieste in poco tempo. Riprova fra qualche minuto.</>,
      };
    case "sessione":
      return {
        titolo: "La sessione del gestionale è scaduta",
        corpo: <>Ricarica la pagina e rientra con la password.</>,
      };
    case "rete":
      return {
        titolo: "Il gestionale non risponde",
        corpo: <>Controlla la connessione a internet e riprova.</>,
      };
    default:
      return {
        titolo: "Search Console non ha risposto",
        corpo: <>Google ha restituito un errore inatteso. Riprova fra poco; se continua, passa il dettaglio qui sotto a chi gestisce il sito.</>,
      };
  }
}

export function Errore({
  errore,
  proprieta,
  riprova,
  riprovo,
}: {
  errore: ErroreSeo;
  proprieta: string | null;
  riprova: () => void;
  riprovo: boolean;
}) {
  const t = testi(errore);
  return (
    <section className="crm-card">
      <div className="max-w-3xl p-4 sm:p-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-crm-attesa text-crm-attesa-ink">
          <PlugZap className="h-5 w-5" />
        </span>
        <h2 className="mt-3 text-[15px] font-[650] leading-6 tracking-[-0.01em] text-crm-ink sm:text-[17px]">{t.titolo}</h2>
        <p className="mt-1 text-[13px] leading-5 text-crm-testo [&_b]:font-[650] [&_b]:text-crm-ink">
          {t.corpo}
        </p>

        {t.passi && (
          <>
            <p className="mt-5 text-[13px] font-[650] text-crm-ink">
              Per rimetterlo a posto (lo fa chi gestisce il sito, dieci minuti):
            </p>
            <ol className="mt-2 space-y-2">
              {t.passi.map((p, i) => (
                <li key={i} className="flex gap-3 text-[13px] leading-5 text-crm-testo">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crm-fondo-2 text-[11px] font-[650] tabular-nums text-crm-testo">
                    {i + 1}
                  </span>
                  <span className="min-w-0">{p}</span>
                </li>
              ))}
            </ol>
          </>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {errore.tipo === "sessione" ? (
            <button type="button" className="crm-btn-primario" onClick={() => window.location.reload()}>
              Ricarica la pagina
            </button>
          ) : (
            <button type="button" className="crm-btn-primario" onClick={riprova} disabled={riprovo}>
              {riprovo ? "Riprovo…" : "Riprova"}
            </button>
          )}
          {proprieta && errore.tipo !== "sessione" && (
            <a
              href={`https://search.google.com/search-console?resource_id=${encodeURIComponent(proprieta)}`}
              target="_blank"
              rel="noopener"
              className="crm-btn"
            >
              Guarda i numeri direttamente su Search Console <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {errore.dettaglio && errore.tipo !== "sessione" && (
          <p className="mt-5 break-words text-[12px] leading-4 text-crm-spento">
            Risposta tecnica di Google: <span className="font-mono">{errore.dettaglio}</span>
          </p>
        )}
      </div>
    </section>
  );
}
