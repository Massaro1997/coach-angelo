"use client";

import { useEffect, useRef, useState } from "react";
import { COACH } from "@/lib/preventivo-testi";
import { descrizioneOre, voceAOre, type VocePreventivo } from "@/lib/preventivo-listino";
import { Angaben, SceltaOre, Spunta, scelteVuote, type BozzaScelte } from "./ModuloOre";

type Voce = VocePreventivo;
interface Articolo { titolo: string; testo: string }

interface Dati {
  numero: string;
  clienteNome: string;
  clienteIndirizzo: string | null;
  clientePiva: string | null;
  oggetto: string | null;
  premesse: string | null;
  items: Voce[];
  totale: number;
  periodicita: string;
  mesi: number;
  importoNota: string | null;
  articoli: Articolo[] | null;
  lingua: string;
  stato: string;
  validoFino: string | null;
  firmatoNome: string | null;
  firmatoAt: string | null;
  createdAt: string;
  scaduto: boolean;
  pagamento: { token: string; importo: number; descrizione: string } | null;
}

const eur = (n: number) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

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
    monatsbetrag: "Monatsbetrag",
    kuendbar: "monatlich, jederzeit zum Monatsende kündbar",
    waehle: "Bitte oben die Stunden wählen",
    bestaetigung: "Bestätigungen",
    gesundheit: "Ich bin gesundheitlich in der Lage zu trainieren und habe bestehende Beschwerden vorab mitgeteilt.",
    accetto: "Ich habe die Vertragsbedingungen und das Widerrufsrecht gelesen und bin einverstanden.",
    sofort: "Ich möchte, dass das Training schon vor Ablauf der 14-tägigen Widerrufsfrist beginnt.",
    pflicht: "Pflichtfeld",
    freiwillig: "freiwillig",
    errOre: "Bitte wähle, wie viele Stunden pro Monat du buchst.",
    errPflicht: "Bitte die beiden Pflichtfelder ankreuzen.",
    pdf: "Als PDF speichern",
    ortDatum: "Ort, Datum",
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
    monatsbetrag: "Importo mensile",
    kuendbar: "al mese, disdetta in ogni momento a fine mese",
    waehle: "Scegli prima le ore",
    bestaetigung: "Conferme",
    gesundheit: "Sono in condizione di allenarmi e ho comunicato prima eventuali problemi di salute.",
    accetto: "Ho letto le condizioni del contratto e il diritto di recesso e le accetto.",
    sofort: "Voglio iniziare l'allenamento prima della fine dei 14 giorni di recesso.",
    pflicht: "obbligatorio",
    freiwillig: "facoltativo",
    errOre: "Scegli quante ore al mese.",
    errPflicht: "Spunta le due conferme obbligatorie.",
    pdf: "Salva come PDF",
    ortDatum: "Luogo, data",
  },
};

export default function PreventivoPubblico({ token }: { token: string }) {
  const [d, setD] = useState<Dati | null>(null);
  const [errore, setErrore] = useState("");
  const [nome, setNome] = useState("");
  const [invio, setInvio] = useState(false);
  const [fatto, setFatto] = useState<{ token: string } | null>(null);
  // contratto a ore: ore scelte e crocette
  const [sc, setSc] = useState<BozzaScelte>(scelteVuote());

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const disegna = useRef(false);
  const vuoto = useRef(true);

  useEffect(() => {
    fetch(`/api/preventivo/${token}`)
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "Errore");
        return j;
      })
      .then((j: Dati) => {
        setD(j);
        const v = voceAOre(j.items);
        if (v) setSc(v.scelte ? { ...scelteVuote(), ...v.scelte } : scelteVuote(v.oreFisse ?? 0));
      })
      .catch((e) => setErrore(e.message));
  }, [token]);

  /* ----------------------------------------------------- firma disegnata */

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    // il canvas va dimensionato sui pixel reali, altrimenti il tratto
    // esce sfocato e disallineato dal dito
    const dpr = window.devicePixelRatio || 1;
    const r = c.getBoundingClientRect();
    c.width = r.width * dpr;
    c.height = r.height * dpr;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0d0d0d";
  }, [d]);

  function punto(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function giu(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    disegna.current = true;
    vuoto.current = false;
    const p = punto(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function muovi(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!disegna.current) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = punto(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  const su = () => { disegna.current = false; };

  function pulisci() {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    vuoto.current = true;
  }

  async function firma() {
    if (!d) return;
    setErrore("");
    if (nome.trim().length < 3) {
      setErrore(d.lingua === "de" ? "Bitte Namen eingeben." : "Inserisci nome e cognome.");
      return;
    }
    if (vuoto.current) {
      setErrore(d.lingua === "de" ? "Bitte unterschreiben." : "Disegna la firma.");
      return;
    }
    const tt = T[d.lingua === "it" ? "it" : "de"];
    if (voceAOre(d.items)) {
      if (!sc.ore) return setErrore(tt.errOre);
      if (!sc.gesundheit || !sc.bedingungen) return setErrore(tt.errPflicht);
    }
    setInvio(true);
    try {
      const res = await fetch(`/api/preventivo/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          firma: canvasRef.current!.toDataURL("image/png"),
          ...(voceAOre(d.items) ? { scelte: sc } : {}),
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Errore");
      const pagTok: string = j.pagamento?.token || "";
      // Come in DirezioneX: firmato si va dritti alla cassa. Se il checkout
      // non parte (Stripe non attivo) resta il pulsante verso /pagamento.
      if (pagTok) {
        try {
          const r = await fetch(`/api/pagamento/${pagTok}`, { method: "POST" });
          const c = await r.json();
          if (r.ok && c.url) {
            window.location.href = c.url;
            return;
          }
        } catch {
          // si ripiega sul pulsante
        }
      }
      setFatto({ token: pagTok });
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

  const t = T[d.lingua === "it" ? "it" : "de"];
  const loc = d.lingua === "it" ? "it-IT" : "de-DE";
  const mensile = d.periodicita === "mensile" && d.mesi > 1;
  const giaFirmato = !!d.firmatoAt;
  const bloccato = d.scaduto || d.stato === "sostituito";

  // Contratto a ore: fino alla firma ore e totale seguono la scelta sul
  // telefono; dopo, valgono quelli salvati dal server.
  const vOre = voceAOre(d.items);
  const vBonus = (d.items || []).find((v) => v.modulo === "bonus") ?? null;
  const oreOra = vOre ? (giaFirmato ? vOre.quantita : sc.ore) : 0;
  const totaleVista = vOre && !giaFirmato ? oreOra * vOre.prezzo : d.totale;
  const sola = giaFirmato || bloccato || !!fatto;

  return (
    <main className="min-h-screen bg-[#f4f4f5] px-4 py-8 sm:py-12 print:min-h-0 print:bg-white print:p-0">
      <style>{`@page { size: A4; margin: 14mm; } @media print { * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }`}</style>
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
                {(d.items || []).map((v, i) => {
                  const ore = v.modulo === "ore";
                  const q = ore ? oreOra : v.quantita || 1;
                  return (
                    <tr key={i} className="border-b border-black/[0.06]">
                      <td className="py-2.5 pr-3 text-neutral-700">
                        {ore && oreOra ? descrizioneOre(oreOra) : v.descrizione}
                        {ore && <span className="block text-[11px] text-neutral-400">{eur(v.prezzo)} pro Stunde</span>}
                      </td>
                      <td className="py-2.5 text-right tabular-nums text-neutral-500">{q || "—"}</td>
                      <td className="py-2.5 text-right tabular-nums text-neutral-900">
                        {v.prezzo === 0 ? (
                          <span className="font-semibold">{t.gratis}</span>
                        ) : ore && !q ? (
                          "—"
                        ) : (
                          eur(v.prezzo * q)
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-4 flex items-baseline justify-end gap-3 border-t-2 border-neutral-900 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                {vOre ? t.monatsbetrag : t.gesamt}
              </span>
              <span className="text-2xl font-bold tabular-nums text-neutral-900">
                {vOre && !oreOra ? "—" : eur(totaleVista)}
              </span>
            </div>
            {vOre && (
              <p className="mt-1 text-right text-xs text-neutral-500">{oreOra ? t.kuendbar : t.waehle}</p>
            )}
            {mensile && (
              <p className="mt-1 text-right text-xs text-neutral-500">
                {eur(Math.round((d.totale / d.mesi) * 100) / 100)} {t.monatlich} × {d.mesi}
              </p>
            )}
            {d.importoNota && (
              <p className="mt-1 text-right text-xs text-neutral-400">{d.importoNota}</p>
            )}
          </section>

          {vOre && (
            <>
              <SceltaOre voce={vOre} bonus={vBonus} sc={sc} setSc={setSc} sola={sola} lingua={d.lingua} />
              <Angaben sc={sc} setSc={setSc} sola={sola} lingua={d.lingua} />
            </>
          )}

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

          {vOre && (
            <section className="mt-8 border-t border-black/10 pt-6 break-inside-avoid">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                {t.bestaetigung}
              </p>
              <div className="mt-3 space-y-3 text-sm text-neutral-700">
                {([
                  ["gesundheit", t.gesundheit, t.pflicht],
                  ["bedingungen", t.accetto, t.pflicht],
                  ["sofortBeginn", t.sofort, t.freiwillig],
                ] as const).map(([k, testo, nota]) => (
                  <Spunta key={k} on={sc[k]} onClick={() => setSc({ ...sc, [k]: !sc[k] })} sola={sola}>
                    {testo} <span className="text-[11px] text-neutral-400">({nota})</span>
                  </Spunta>
                ))}
              </div>
            </section>
          )}

          {/* firma su carta: si vede solo nel PDF di un contratto non ancora firmato */}
          {!giaFirmato && !fatto && (
            <section className="mt-10 hidden grid-cols-2 gap-10 print:grid">
              {[t.ortDatum, t.unterschrift].map((l) => (
                <div key={l}>
                  <div className="h-12 border-b border-neutral-900" />
                  <p className="mt-1 text-[11px] text-neutral-500">{l}</p>
                </div>
              ))}
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
                  onClick={pulisci}
                  className="text-[11px] font-semibold text-neutral-400 hover:text-neutral-700"
                >
                  {t.cancella}
                </button>
              </div>
              <canvas
                ref={canvasRef}
                onPointerDown={giu}
                onPointerMove={muovi}
                onPointerUp={su}
                onPointerLeave={su}
                className="mt-1 h-40 w-full touch-none border border-dashed border-black/25 bg-[#fafafa]"
              />
            </div>

            {errore && <p className="mt-3 text-sm text-red-500">{errore}</p>}

            <button
              onClick={firma}
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
