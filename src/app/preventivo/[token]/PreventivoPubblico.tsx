"use client";

import { useEffect, useState } from "react";
import { COACH } from "@/lib/preventivo-testi";
import { voceAOre } from "@/lib/preventivo-listino";
import { useFirma } from "./firma";
import ContrattoOre from "./ContrattoOre";
import { STAMPA_A4, eur, vaiAllaCassa, type Dati } from "./comune";

const T = {
  de: {
    angebot: "Vertrag",
    vom: "vom",
    gueltig: "Zu unterschreiben bis",
    an: "An",
    leistungen: "Leistungen",
    menge: "Menge",
    preis: "Preis",
    gesamt: "Gesamtbetrag",
    monatlich: "monatlich",
    bedingungen: "Vertragsbedingungen",
    unterschrift: "Unterschrift",
    nome: "Vor- und Nachname",
    disegna: "Bitte hier unterschreiben",
    cancella: "Löschen",
    firma: "Jetzt unterschreiben",
    firmato: "Unterschrieben am",
    scaduto: "Dieser Vertrag ist abgelaufen. Bitte fordere einen neuen an.",
    sostituito: "Dieser Vertrag wurde durch eine neuere Fassung ersetzt.",
    paga: "Weiter zur Zahlung",
    grazie: "Danke! Dein Vertrag ist unterschrieben.",
    prossimo: "Nächster Schritt: erste Rate bezahlen.",
    invio: "Wird gesendet…",
    gratis: "gratis",
    pdf: "Als PDF speichern",
  },
  it: {
    angebot: "Contratto",
    vom: "del",
    gueltig: "Da firmare entro il",
    an: "Spett.le",
    leistungen: "Servizi",
    menge: "Q.tà",
    preis: "Prezzo",
    gesamt: "Totale",
    monatlich: "al mese",
    bedingungen: "Condizioni contrattuali",
    unterschrift: "Firma",
    nome: "Nome e cognome",
    disegna: "Firma qui",
    cancella: "Cancella",
    firma: "Firma ora",
    firmato: "Firmato il",
    scaduto: "Questo contratto è scaduto. Chiedine uno nuovo.",
    sostituito: "Questo contratto è stato sostituito da una versione più recente.",
    paga: "Vai al pagamento",
    grazie: "Grazie! Il contratto è firmato.",
    prossimo: "Prossimo passo: pagare la prima rata.",
    invio: "Invio…",
    gratis: "gratis",
    pdf: "Salva come PDF",
  },
};

export default function PreventivoPubblico({ token }: { token: string }) {
  const [d, setD] = useState<Dati | null>(null);
  const [errore, setErrore] = useState("");
  const [nome, setNome] = useState("");
  const [invio, setInvio] = useState(false);
  const [fatto, setFatto] = useState<{ token: string } | null>(null);
  const firma = useFirma(d);

  useEffect(() => {
    fetch(`/api/preventivo/${token}`)
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "Errore");
        return j;
      })
      .then(setD)
      .catch((e) => setErrore(e.message));
  }, [token]);

  async function firmaOra() {
    if (!d) return;
    setErrore("");
    if (nome.trim().length < 3) {
      setErrore(d.lingua === "de" ? "Bitte Namen eingeben." : "Inserisci nome e cognome.");
      return;
    }
    if (firma.vuota()) {
      setErrore(d.lingua === "de" ? "Bitte unterschreiben." : "Disegna la firma.");
      return;
    }
    setInvio(true);
    try {
      const res = await fetch(`/api/preventivo/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim(), firma: firma.png() }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Errore");
      // Come in DirezioneX: firmato si va dritti alla cassa.
      const resta = await vaiAllaCassa(j.pagamento?.token || "");
      if (resta !== null) setFatto({ token: resta });
    } catch (e) {
      setErrore((e as Error).message);
    } finally {
      setInvio(false);
    }
  }

  /* ------------------------------------------------------------- render */

  if (errore && !d) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f4f5] px-4">
        <p className="text-sm text-neutral-500">{errore}</p>
      </main>
    );
  }
  if (!d) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f4f5]">
        <p className="text-sm text-neutral-400">…</p>
      </main>
    );
  }

  // Contratto a ore: prima si compila, poi esce il foglio da firmare.
  if (voceAOre(d.items)) return <ContrattoOre d={d} token={token} onAggiorna={setD} />;

  const t = T[d.lingua === "it" ? "it" : "de"];
  const loc = d.lingua === "it" ? "it-IT" : "de-DE";
  const mensile = d.periodicita === "mensile" && d.mesi > 1;
  const giaFirmato = !!d.firmatoAt;
  const bloccato = d.scaduto || d.stato === "sostituito";

  return (
    <main className="min-h-screen bg-[#f4f4f5] px-4 py-8 sm:py-12 print:min-h-0 print:bg-white print:p-0">
      <style>{STAMPA_A4}</style>
      <div className="mx-auto max-w-3xl space-y-4 print:max-w-none">
        <div className="flex justify-end print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="text-xs font-semibold text-neutral-500 underline-offset-2 hover:text-neutral-900 hover:underline"
          >
            {t.pdf}
          </button>
        </div>
        {/* ------------------------------------------------- il documento */}
        <article className="border border-black/10 bg-white p-6 sm:p-10 print:border-0 print:p-0">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-black/10 pb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                {t.angebot}
              </p>
              <p className="mt-1 text-2xl font-bold text-neutral-900">{d.numero}</p>
              <p className="mt-0.5 text-xs text-neutral-500">
                {t.vom} {new Date(d.createdAt).toLocaleDateString(loc)}
                {d.validoFino && (
                  <> · {t.gueltig} {new Date(d.validoFino).toLocaleDateString(loc)}</>
                )}
              </p>
            </div>
            <div className="text-right text-xs leading-relaxed text-neutral-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={COACH.logo} alt={COACH.marchio} className="mb-2 ml-auto h-7 w-auto" />
              <p className="font-bold text-neutral-900">Inh. {COACH.name}</p>
              <p>{COACH.address}</p>
              <p>{COACH.email}</p>
              <p>{COACH.phone}</p>
              <p>{COACH.web}</p>
            </div>
          </header>

          <section className="mt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              {t.an}
            </p>
            <p className="mt-1 font-bold text-neutral-900">{d.clienteNome}</p>
            {d.clienteIndirizzo && (
              <p className="text-xs text-neutral-500">{d.clienteIndirizzo}</p>
            )}
            {d.clientePiva && <p className="text-xs text-neutral-500">{d.clientePiva}</p>}
          </section>

          {d.oggetto && (
            <h1 className="mt-6 text-lg font-bold text-neutral-900">{d.oggetto}</h1>
          )}
          {d.premesse && (
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-neutral-600">
              {d.premesse}
            </p>
          )}

          {/* voci */}
          <section className="mt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              {t.leistungen}
            </p>
            <table className="mt-2 w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 text-[10px] uppercase tracking-wider text-neutral-400">
                  <th className="pb-2 text-left font-bold">{t.leistungen}</th>
                  <th className="pb-2 text-right font-bold">{t.menge}</th>
                  <th className="pb-2 text-right font-bold">{t.preis}</th>
                </tr>
              </thead>
              <tbody>
                {(d.items || []).map((v, i) => (
                  <tr key={i} className="border-b border-black/[0.06]">
                    <td className="py-2.5 pr-3 text-neutral-700">{v.descrizione}</td>
                    <td className="py-2.5 text-right tabular-nums text-neutral-500">
                      {v.quantita || 1}
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-neutral-900">
                      {v.prezzo === 0 ? t.gratis : eur(v.prezzo * (v.quantita || 1))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex items-baseline justify-end gap-3 border-t-2 border-neutral-900 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                {t.gesamt}
              </span>
              <span className="text-2xl font-bold tabular-nums text-neutral-900">
                {eur(d.totale)}
              </span>
            </div>
            {mensile && (
              <p className="mt-1 text-right text-xs text-neutral-500">
                {eur(Math.round((d.totale / d.mesi) * 100) / 100)} {t.monatlich} × {d.mesi}
              </p>
            )}
            {d.importoNota && (
              <p className="mt-1 text-right text-xs text-neutral-400">{d.importoNota}</p>
            )}
          </section>

          {/* clausole */}
          {d.articoli && d.articoli.length > 0 && (
            <section className="mt-8 border-t border-black/10 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                {t.bedingungen}
              </p>
              <ol className="mt-3 space-y-3">
                {d.articoli.map((a, i) => (
                  <li key={i} className="text-xs leading-relaxed text-neutral-600">
                    <span className="font-bold text-neutral-900">
                      § {i + 1} {a.titolo}
                    </span>
                    <br />
                    {a.testo}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </article>

        {/* ---------------------------------------------------- la firma */}
        {fatto ? (
          <div className="border border-green-600/30 bg-green-50 p-6 text-center print:hidden">
            <p className="font-bold text-green-800">{t.grazie}</p>
            {fatto.token && (
              <>
                <p className="mt-1 text-sm text-green-700">{t.prossimo}</p>
                <a
                  href={`/pagamento/${fatto.token}`}
                  className="mt-4 inline-block bg-neutral-900 px-6 py-3 text-sm font-bold text-white"
                >
                  {t.paga}
                </a>
              </>
            )}
          </div>
        ) : giaFirmato ? (
          <div className="border border-black/10 bg-white p-6 text-center print:hidden">
            <p className="text-sm text-neutral-600">
              {t.firmato} {new Date(d.firmatoAt!).toLocaleDateString(loc)} — {d.firmatoNome}
            </p>
            {d.pagamento && (
              <a
                href={`/pagamento/${d.pagamento.token}`}
                className="mt-4 inline-block bg-neutral-900 px-6 py-3 text-sm font-bold text-white"
              >
                {t.paga} · {eur(d.pagamento.importo)}
              </a>
            )}
          </div>
        ) : bloccato ? (
          <div className="border border-amber-500/40 bg-amber-50 p-6 text-center print:hidden">
            <p className="text-sm font-semibold text-amber-800">
              {d.scaduto ? t.scaduto : t.sostituito}
            </p>
          </div>
        ) : (
          <section className="border border-black/10 bg-white p-6 sm:p-8 print:hidden">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              {t.unterschrift}
            </p>

            <label className="mt-4 block">
              <span className="text-xs font-semibold text-neutral-600">{t.nome}</span>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-1 w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
                autoComplete="name"
              />
            </label>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600">{t.disegna}</span>
                <button
                  onClick={firma.pulisci}
                  className="text-[11px] font-semibold text-neutral-400 hover:text-neutral-700"
                >
                  {t.cancella}
                </button>
              </div>
              <canvas
                ref={firma.canvasRef}
                {...firma.handlers}
                className="mt-1 h-40 w-full touch-none border border-dashed border-black/25 bg-[#fafafa]"
              />
            </div>

            {errore && <p className="mt-3 text-sm text-red-500">{errore}</p>}

            <button
              onClick={firmaOra}
              disabled={invio}
              className="mt-4 w-full bg-neutral-900 py-3.5 text-sm font-bold text-white disabled:opacity-50"
            >
              {invio ? t.invio : t.firma}
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
