"use client";

// Contratto a ore in due passi:
//   1. Angaben: di solito li compila Angelo per la cliente (dati, ore,
//      crocette). Solo lui, entrato nell'admin, vede le ore regalate; con
//      "Salva" il contratto resta pronto sul server.
//   2. Vertrag: il foglio gia' compilato, come il PDF. La cliente spunta le
//      conferme, firma col dito e paga. Un contratto preparato da Angelo si
//      apre direttamente qui e la cliente non ne cambia i dati.
// Se la cliente apre il link prima, compila lei il passo 1 (senza ore
// regalate). Fino alla firma la bozza sta nel browser.

import { useEffect, useState } from "react";
import { ArrowLeft, Gift, Link2 } from "lucide-react";
import { COACH } from "@/lib/preventivo-testi";
import {
  OPZIONI_ORE,
  descrizioneOre,
  erroreArPersona,
  voceAOre,
  type PersonaOre,
} from "@/lib/preventivo-listino";
import { useFirma } from "./firma";
import { Angaben, Casella, SceltaOre, Spunta, scelteVuote, type BozzaScelte } from "./ModuloOre";
import { STAMPA_A4, eur, vaiAllaCassa, type Dati } from "./comune";

const T = {
  de: {
    vertrag: "Vertrag",
    titolo: "Personal Training Vertrag",
    passo1: "Angaben",
    passo2: "Unterschreiben & bezahlen",
    intro: "Bitte alles ausfüllen. Danach erscheint der fertige Vertrag: Bestätigungen ankreuzen, unterschreiben, bezahlen.",
    persona: "Persönliche Daten",
    nome: "Vor- und Nachname",
    strasse: "Straße und Hausnummer",
    plzOrt: "PLZ und Ort",
    geburt: "Geburtsdatum",
    freiwillig: "freiwillig",
    telefono: "Telefon",
    email: "E-Mail",
    bestaetigung: "Bestätigungen",
    gesundheit: "Ich bin gesundheitlich in der Lage zu trainieren und habe bestehende Beschwerden vorab mitgeteilt.",
    accetto: "Ich habe die Vertragsbedingungen und das Widerrufsrecht gelesen und bin einverstanden.",
    sofort: "Ich möchte, dass das Training schon vor Ablauf der 14-tägigen Widerrufsfrist beginnt.",
    pflicht: "Pflichtfeld",
    avanti: "Weiter: fertigen Vertrag ansehen",
    errOre: "Bitte wähle, wie viele Stunden pro Monat du buchst.",
    errPflicht: "Bitte die beiden Pflichtfelder bei den Bestätigungen ankreuzen.",
    vorDerUnterschrift: "Bitte vor der Unterschrift ankreuzen",
    modifica: "Angaben ändern",
    pdf: "Als PDF speichern",
    vom: "vom",
    gueltig: "Zu unterschreiben bis",
    trainer: "Trainer",
    kunde: "Kunde",
    nato: "geb.",
    stnr: "St.-Nr.",
    paket: "Stundenpaket pro Monat",
    leistungen: "Leistungen",
    menge: "Menge",
    preis: "Preis",
    gratis: "gratis",
    monatsbetrag: "Monatsbetrag",
    kuendbar: "monatlich, jederzeit zum Monatsende kündbar",
    ust: "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.",
    proStunde: "pro Stunde",
    angaben: "Angaben der Kundin / des Kunden",
    ziele: "Ziele",
    tage: "Tage",
    zeiten: "Uhrzeit",
    orte: "Ort",
    bedingungen: "Vertragsbedingungen",
    ortDatum: "Ort, Datum",
    unterschrift: "Unterschrift",
    firmaQui: "Hier mit dem Finger unterschreiben",
    cancella: "Löschen",
    firmaPaga: "Unterschreiben und bezahlen",
    sicuro: "Sichere Zahlung über Stripe. Danach wird der Monatsbetrag automatisch eingezogen, jederzeit zum Monatsende kündbar.",
    errFirma: "Bitte im Feld unterschreiben.",
    invio: "Wird gesendet…",
    firmato: "Digital unterschrieben am",
    von: "von",
    paga: "Weiter zur Zahlung",
    grazie: "Danke! Dein Vertrag ist unterschrieben.",
    prossimo: "Nächster Schritt: ersten Monat bezahlen.",
    scaduto: "Dieser Vertrag ist abgelaufen. Bitte fordere einen neuen an.",
    sostituito: "Dieser Vertrag wurde durch eine neuere Fassung ersetzt.",
    bonusMese: "Bonusstunden pro Monat",
    bonusPrimo: "Bonusstunden im ersten Monat",
    bonusNota: "geschenkt, gratis, wird getrennt gezählt",
    primoGratis: "Erstes Treffen kostenlos: Kennenlernen, Check-up und Probetraining",
  },
  it: {
    vertrag: "Contratto",
    titolo: "Contratto Personal Training",
    passo1: "Dati",
    passo2: "Firma e paga",
    intro: "Compila tutto. Poi esce il contratto pronto: spunta le conferme, firma e paga.",
    persona: "Dati personali",
    nome: "Nome e cognome",
    strasse: "Via e numero civico",
    plzOrt: "CAP e città",
    geburt: "Data di nascita",
    freiwillig: "facoltativo",
    telefono: "Telefono",
    email: "Email",
    bestaetigung: "Conferme",
    gesundheit: "Sono in condizione di allenarmi e ho comunicato prima eventuali problemi di salute.",
    accetto: "Ho letto le condizioni del contratto e il diritto di recesso e le accetto.",
    sofort: "Voglio iniziare l'allenamento prima della fine dei 14 giorni di recesso.",
    pflicht: "obbligatorio",
    avanti: "Avanti: vedi il contratto pronto",
    errOre: "Scegli quante ore al mese.",
    errPflicht: "Spunta le due conferme obbligatorie.",
    vorDerUnterschrift: "Da spuntare prima di firmare",
    modifica: "Modifica i dati",
    pdf: "Salva come PDF",
    vom: "del",
    gueltig: "Da firmare entro il",
    trainer: "Trainer",
    kunde: "Cliente",
    nato: "nato/a il",
    stnr: "N. fiscale",
    paket: "Pacchetto ore al mese",
    leistungen: "Servizi",
    menge: "Q.tà",
    preis: "Prezzo",
    gratis: "gratis",
    monatsbetrag: "Importo mensile",
    kuendbar: "al mese, disdetta in ogni momento a fine mese",
    ust: "Senza IVA, piccolo imprenditore (§ 19 UStG).",
    proStunde: "all'ora",
    angaben: "Dati del cliente",
    ziele: "Obiettivi",
    tage: "Giorni",
    zeiten: "Orario",
    orte: "Luogo",
    bedingungen: "Condizioni contrattuali",
    ortDatum: "Luogo, data",
    unterschrift: "Firma",
    firmaQui: "Firma qui con il dito",
    cancella: "Cancella",
    firmaPaga: "Firma e paga",
    sicuro: "Pagamento sicuro con Stripe. Poi l'importo si addebita ogni mese, disdetta in ogni momento a fine mese.",
    errFirma: "Firma nel riquadro.",
    invio: "Invio…",
    firmato: "Firmato digitalmente il",
    von: "da",
    paga: "Vai al pagamento",
    grazie: "Grazie! Il contratto è firmato.",
    prossimo: "Prossimo passo: pagare il primo mese.",
    scaduto: "Questo contratto è scaduto. Chiedine uno nuovo.",
    sostituito: "Questo contratto è stato sostituito da una versione più recente.",
    bonusMese: "ore regalate al mese",
    bonusPrimo: "ore regalate il primo mese",
    bonusNota: "gratis, contate a parte",
    primoGratis: "Primo incontro gratis: conoscenza, check-up e allenamento di prova",
  },
};

const titoletto = "text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400";
const campo =
  "mt-1 w-full border border-black/15 bg-white px-3 py-2.5 text-[15px] outline-none transition-colors focus:border-neutral-900";

/** "Musterstr. 1, 50667 Köln" -> via + CAP e citta' */
function dividiIndirizzo(s: string | null) {
  if (!s) return { strasse: "", plzOrt: "" };
  const i = s.indexOf(", ");
  return i < 0 ? { strasse: s, plzOrt: "" } : { strasse: s.slice(0, i), plzOrt: s.slice(i + 2) };
}

const dataDa = (iso: string, loc: string) => {
  const [a, m, g] = iso.split("-").map(Number);
  return new Date(a, m - 1, g).toLocaleDateString(loc);
};

interface Bozza { persona: PersonaOre; sc: BozzaScelte }

export default function ContrattoOre({
  d,
  token,
  onAggiorna,
}: {
  d: Dati;
  token: string;
  onAggiorna: (d: Dati) => void;
}) {
  const de = d.lingua !== "it";
  const t = T[de ? "de" : "it"];
  const loc = de ? "de-DE" : "it-IT";
  const vOre = voceAOre(d.items)!;
  const vBonus = d.items.find((v) => v.modulo === "bonus") ?? null;
  const giaFirmato = !!d.firmatoAt;
  const bloccato = d.scaduto || d.stato === "sostituito";
  const chiaveBozza = `fp-vertrag-${token}`;
  // Angelo entrato nell'admin su questo telefono
  const admin = !!d.admin;
  // preparato da Angelo: la cliente vede solo il foglio
  const preparato = !!vOre.preparato;

  // La bozza si legge qui, all'avvio dello stato: con un effetto il
  // salvataggio (che parte anche lui al montaggio) la sovrascriverebbe prima.
  // La pagina si disegna solo nel browser, dopo il fetch: window c'e'.
  const [bozza] = useState<Partial<Bozza>>(() => {
    if (giaFirmato || preparato) return {};
    try {
      return (JSON.parse(localStorage.getItem(chiaveBozza) || "{}") as Partial<Bozza>) || {};
    } catch {
      return {};
    }
  });
  const [persona, setPersona] = useState<PersonaOre>(() => ({
    nome: d.clienteNome || "",
    ...dividiIndirizzo(d.clienteIndirizzo),
    geburtsdatum: vOre.scelte?.geburtsdatum || "",
    telefono: d.clienteTelefono || "",
    email: d.clienteEmail || "",
    ...bozza.persona,
  }));
  const [sc, setSc] = useState<BozzaScelte>(() => {
    if (vOre.scelte) return { ...scelteVuote(), ...vOre.scelte };
    const base = { ...scelteVuote(), ...bozza.sc };
    // ore fissate da Angelo: valgono sempre quelle
    return vOre.oreFisse ? { ...base, ore: vOre.oreFisse } : base;
  });
  const [passo, setPasso] = useState<"angaben" | "vertrag">(
    giaFirmato || bloccato || preparato ? "vertrag" : "angaben"
  );
  // ore regalate: le decide solo Angelo (il server rifiuta chi non e' admin)
  const [bonus, setBonus] = useState(() => ({
    ore: vBonus?.quantita ?? 0,
    ogniMese: !vBonus?.descrizione.includes("ersten Monat"),
  }));
  const [salvo, setSalvo] = useState(false);
  const [copiato, setCopiato] = useState(false);
  const [errore, setErrore] = useState("");
  const [invio, setInvio] = useState(false);
  const [fatto, setFatto] = useState<{ token: string } | null>(null);
  const firma = useFirma(passo);

  // bozza nel browser: si riprende dopo un ricarico, sparisce con la firma
  useEffect(() => {
    if (giaFirmato || fatto || preparato) return;
    try {
      localStorage.setItem(chiaveBozza, JSON.stringify({ persona, sc } satisfies Bozza));
    } catch {
      // storage pieno o bloccato: la bozza vive solo in pagina
    }
  }, [persona, sc, giaFirmato, fatto, preparato, chiaveBozza]);

  const ore = giaFirmato ? vOre.quantita : sc.ore;
  const mensile = ore * vOre.prezzo;
  const imposta = (k: keyof PersonaOre) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPersona({ ...persona, [k]: e.target.value });

  /** Passo 1: dati e ore. Le conferme si spuntano sul foglio. */
  function controlla(): string | null {
    const e = erroreArPersona(persona, de);
    if (e) return e;
    if (!sc.ore) return t.errOre;
    return null;
  }

  async function avanti() {
    const e = controlla();
    setErrore(e || "");
    if (e) return;
    if (admin) {
      // Angelo: si salva sul server, cosi' la cliente trova il foglio pronto
      // anche dal suo telefono
      setSalvo(true);
      try {
        const res = await fetch(`/api/preventivo/${token}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cliente: persona, scelte: sc, bonus }),
        });
        const j = await res.json();
        if (!res.ok) throw new Error(j.error || "Errore");
        try {
          localStorage.removeItem(chiaveBozza);
        } catch {
          // niente da togliere
        }
        onAggiorna(j);
      } catch (err) {
        setErrore((err as Error).message);
        return;
      } finally {
        setSalvo(false);
      }
    }
    setPasso("vertrag");
    window.scrollTo({ top: 0 });
  }

  async function firmaEPaga() {
    setErrore("");
    if (!sc.gesundheit || !sc.bedingungen) {
      setErrore(t.errPflicht);
      return;
    }
    const e = preparato ? null : controlla();
    if (e) {
      setErrore(e);
      return;
    }
    if (firma.vuota()) {
      setErrore(t.errFirma);
      return;
    }
    setInvio(true);
    try {
      const res = await fetch(`/api/preventivo/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: persona.nome.trim(), firma: firma.png(), scelte: sc, cliente: persona }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Errore");
      try {
        localStorage.removeItem(chiaveBozza);
      } catch {
        // niente da togliere
      }
      const resta = await vaiAllaCassa(j.pagamento?.token || "");
      if (resta !== null) setFatto({ token: resta });
    } catch (err) {
      setErrore((err as Error).message);
    } finally {
      setInvio(false);
    }
  }

  /* ------------------------------------------------------- testata passi */
  const passi = (
    <ol className="flex items-center gap-2 text-[12px] font-semibold print:hidden">
      {[t.passo1, t.passo2].map((l, i) => {
        const attivo = (i === 0 && passo === "angaben") || (i === 1 && passo === "vertrag");
        return (
          <li key={l} className="flex items-center gap-2">
            {i > 0 && <span className="h-px w-5 bg-black/15" />}
            <span
              className={`flex h-5 w-5 items-center justify-center text-[11px] ${
                attivo ? "bg-neutral-900 text-white" : "bg-black/10 text-neutral-500"
              }`}
            >
              {i + 1}
            </span>
            <span className={attivo ? "text-neutral-900" : "text-neutral-400"}>{l}</span>
          </li>
        );
      })}
    </ol>
  );

  /* ============================================================ passo 1 */
  if (passo === "angaben") {
    return (
      <main className="min-h-screen bg-[#f4f4f5] px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-2xl space-y-4">
          <header className="flex flex-wrap items-center justify-between gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={COACH.logo} alt={COACH.marchio} className="h-7 w-auto" />
            {passi}
          </header>

          <section className="border border-black/10 bg-white p-5 sm:p-8">
            <p className={titoletto}>
              {t.vertrag} {d.numero}
            </p>
            <h1 className="mt-1 text-xl font-bold text-neutral-900">{t.titolo}</h1>
            <p className="mt-1 text-sm text-neutral-600">{t.intro}</p>

            {/* dati */}
            <div className="mt-6 border-t border-black/10 pt-6">
              <p className={titoletto}>{t.persona}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold text-neutral-600">{t.nome}</span>
                  <input value={persona.nome} onChange={imposta("nome")} autoComplete="name" className={campo} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold text-neutral-600">{t.strasse}</span>
                  <input value={persona.strasse} onChange={imposta("strasse")} autoComplete="street-address" className={campo} />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-neutral-600">{t.plzOrt}</span>
                  <input value={persona.plzOrt} onChange={imposta("plzOrt")} placeholder="50667 Köln" className={campo} />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-neutral-600">
                    {t.geburt} <span className="font-normal text-neutral-400">({t.freiwillig})</span>
                  </span>
                  <input value={persona.geburtsdatum} onChange={imposta("geburtsdatum")} type="date" autoComplete="bday" className={campo} />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-neutral-600">{t.telefono}</span>
                  <input value={persona.telefono} onChange={imposta("telefono")} type="tel" autoComplete="tel" className={campo} />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-neutral-600">{t.email}</span>
                  <input value={persona.email} onChange={imposta("email")} type="email" autoComplete="email" className={campo} />
                </label>
              </div>
            </div>

            {admin && (
              <p className="mt-4 border-l-4 border-neutral-900 bg-[#f4f4f5] px-3 py-2 text-[13px] text-neutral-700">
                <strong>Modalità Angelo:</strong> compili tu per la cliente. Le ore regalate le vedi solo tu. Con
                «Salva» il contratto resta pronto: lei spunta le conferme, firma e paga.
              </p>
            )}
            <SceltaOre voce={vOre} bonus={admin ? null : vBonus} sc={sc} setSc={setSc} sola={false} lingua={d.lingua} />
            <Angaben sc={sc} setSc={setSc} sola={false} lingua={d.lingua} />

            {admin && <OreRegalate bonus={bonus} setBonus={setBonus} />}

            {errore && <p className="mt-6 text-sm font-semibold text-red-600">{errore}</p>}
            <button
              type="button"
              onClick={avanti}
              disabled={salvo}
              className="mt-6 w-full bg-neutral-900 py-4 text-sm font-bold text-white hover:bg-neutral-800 disabled:opacity-50"
            >
              {salvo ? t.invio : admin ? "Salva e prepara il foglio da firmare" : t.avanti}
              {sc.ore > 0 && <span className="font-semibold text-white/60"> · {eur(mensile)} / Monat</span>}
            </button>
          </section>
        </div>
      </main>
    );
  }

  /* ============================================================ passo 2 */
  const oggi = new Date().toLocaleDateString(loc);
  const liste = [
    { titolo: t.ziele, valori: OPZIONI_ORE.ziele, scelti: sc.ziele },
    { titolo: t.tage, valori: OPZIONI_ORE.tage, scelti: sc.tage },
    { titolo: t.zeiten, valori: OPZIONI_ORE.zeiten, scelti: sc.zeiten },
    { titolo: t.orte, valori: OPZIONI_ORE.orte, scelti: sc.orte },
  ];
  const conferme = [
    { k: "gesundheit", testo: t.gesundheit, nota: t.pflicht },
    { k: "bedingungen", testo: t.accetto, nota: t.pflicht },
    { k: "sofortBeginn", testo: t.sofort, nota: t.freiwillig },
  ] as const;
  const puoFirmare = !giaFirmato && !bloccato && !fatto;
  const link = typeof window !== "undefined" ? `${window.location.origin}/preventivo/${token}` : "";

  return (
    <main className="min-h-screen bg-[#e9e9eb] px-3 py-6 sm:px-4 sm:py-10 print:min-h-0 print:bg-white print:p-0">
      <style>{STAMPA_A4}</style>
      <div className="mx-auto max-w-[794px] space-y-4 print:max-w-none">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          {puoFirmare && (!preparato || admin) ? (
            <button
              type="button"
              onClick={() => {
                setErrore("");
                setPasso("angaben");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t.modifica}
            </button>
          ) : (
            <span />
          )}
          {passi}
          <button
            type="button"
            onClick={() => window.print()}
            className="text-xs font-semibold text-neutral-600 underline-offset-2 hover:text-neutral-900 hover:underline"
          >
            {t.pdf}
          </button>
        </div>

        {admin && preparato && puoFirmare && (
          <div className="flex flex-wrap items-center gap-3 border border-green-600/30 bg-green-50 px-4 py-3 text-[13px] text-green-900 print:hidden">
            <p className="min-w-0 flex-1">
              <strong>Contratto pronto e salvato.</strong> Dai il telefono alla cliente: spunta le conferme, firma e paga.
              Oppure mandale il link: vede solo questo foglio.
            </p>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(link);
                setCopiato(true);
              }}
              className="inline-flex items-center gap-1.5 bg-neutral-900 px-3 py-2 text-[12px] font-semibold text-white"
            >
              <Link2 className="h-3.5 w-3.5" />
              {copiato ? "Copiato" : "Copia link"}
            </button>
          </div>
        )}

        {/* ------------------------------------------------- il foglio */}
        <article className="bg-white px-5 py-7 text-neutral-800 shadow-[0_12px_40px_rgba(0,0,0,0.10)] sm:px-12 sm:py-12 print:p-0 print:shadow-none">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-neutral-900 pb-5">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={COACH.logo} alt={COACH.marchio} className="h-8 w-auto" />
              <h1 className="mt-3 text-xl font-bold text-neutral-900 sm:text-2xl">{t.titolo}</h1>
            </div>
            <div className="text-right text-xs leading-relaxed text-neutral-500">
              <p className="text-base font-bold text-neutral-900">{d.numero}</p>
              <p>
                {t.vom} {new Date(d.createdAt).toLocaleDateString(loc)}
              </p>
              {d.validoFino && !giaFirmato && (
                <p>
                  {t.gueltig} {new Date(d.validoFino).toLocaleDateString(loc)}
                </p>
              )}
            </div>
          </header>

          {/* le parti */}
          <section className="mt-5 grid gap-5 text-[13px] leading-relaxed sm:grid-cols-2">
            <div>
              <p className={titoletto}>{t.trainer}</p>
              <p className="mt-1 font-bold text-neutral-900">{COACH.name}</p>
              <p>
                {COACH.marchio} · {COACH.address}
              </p>
              <p>{COACH.email}</p>
              <p>{COACH.phone}</p>
              <p>
                {t.stnr} {COACH.taxId}
              </p>
            </div>
            <div>
              <p className={titoletto}>{t.kunde}</p>
              <p className="mt-1 font-bold text-neutral-900">{persona.nome}</p>
              <p>{persona.strasse}</p>
              <p>{persona.plzOrt}</p>
              {persona.geburtsdatum && (
                <p>
                  {t.nato} {dataDa(persona.geburtsdatum, loc)}
                </p>
              )}
              <p>{persona.telefono}</p>
              <p>{persona.email}</p>
            </div>
          </section>

          {/* ore con la X */}
          <section className="mt-6 break-inside-avoid">
            <p className={titoletto}>{t.paket}</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
              {(vOre.oreFisse ? [vOre.oreFisse] : vOre.ore || []).map((n) => (
                <span key={n} className="inline-flex items-center gap-1.5">
                  <Casella on={ore === n} />
                  <span className={ore === n ? "font-bold text-neutral-900" : "text-neutral-500"}>{n} Std.</span>
                </span>
              ))}
            </div>
          </section>

          {/* voci */}
          <section className="mt-5 break-inside-avoid">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-black/15 text-[10px] uppercase tracking-wider text-neutral-400">
                  <th className="pb-2 text-left font-bold">{t.leistungen}</th>
                  <th className="pb-2 text-right font-bold">{t.menge}</th>
                  <th className="pb-2 text-right font-bold">{t.preis}</th>
                </tr>
              </thead>
              <tbody>
                {d.items.map((v, i) => {
                  const aOre = v.modulo === "ore";
                  return (
                    <tr key={i} className="border-b border-black/[0.07] align-top">
                      <td className="py-2 pr-3">
                        {aOre ? descrizioneOre(ore) : v.descrizione}
                        {aOre && (
                          <span className="block text-[11px] text-neutral-400">
                            {eur(v.prezzo)} {t.proStunde}
                          </span>
                        )}
                      </td>
                      <td className="py-2 text-right tabular-nums text-neutral-500">{aOre ? ore : v.quantita || 1}</td>
                      <td className="py-2 text-right tabular-nums text-neutral-900">
                        {v.prezzo === 0 ? t.gratis : eur(v.prezzo * (aOre ? ore : v.quantita || 1))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-3 flex items-baseline justify-end gap-3">
              <span className={titoletto}>{t.monatsbetrag}</span>
              <span className="text-xl font-bold tabular-nums text-neutral-900">{eur(mensile)}</span>
            </div>
            <p className="text-right text-[11px] text-neutral-500">{t.kuendbar}</p>
            <p className="text-right text-[11px] text-neutral-400">{t.ust}</p>
            {vBonus && (
              <p className="mt-2 flex items-center gap-1.5 text-[12px] text-neutral-600">
                <Gift className="h-3.5 w-3.5 text-neutral-900" />
                <strong>
                  + {vBonus.quantita} {vBonus.descrizione.includes("ersten Monat") ? t.bonusPrimo : t.bonusMese}
                </strong>{" "}
                {t.bonusNota}
              </p>
            )}
            <p className="mt-1 flex items-center gap-1.5 text-[12px] text-neutral-600">
              <Gift className="h-3.5 w-3.5 text-neutral-900" />
              {t.primoGratis}
            </p>
          </section>

          {/* crocette */}
          <section className="mt-6 break-inside-avoid border-t border-black/10 pt-4">
            <p className={titoletto}>{t.angaben}</p>
            <dl className="mt-2 space-y-2 text-[12px]">
              {liste.map((g) => (
                <div key={g.titolo} className="grid gap-1 sm:grid-cols-[90px_1fr]">
                  <dt className="font-bold text-neutral-900">{g.titolo}</dt>
                  <dd className="flex flex-wrap gap-x-3.5 gap-y-1.5">
                    {g.valori.map((v) => (
                      <span key={v} className="inline-flex items-center gap-1.5">
                        <Casella on={g.scelti.includes(v)} />
                        <span className={g.scelti.includes(v) ? "text-neutral-900" : "text-neutral-500"}>{v}</span>
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* clausole */}
          <section className="mt-5 border-t border-black/10 pt-4">
            <p className={titoletto}>{t.bedingungen}</p>
            <Clausole d={d} />
          </section>

          {/* conferme: le spunta la cliente, poi firma */}
          <section className="mt-6 break-inside-avoid border-2 border-neutral-900 p-4 print:border print:p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">
              {t.bestaetigung}
              {puoFirmare && <span className="normal-case tracking-normal text-neutral-500"> · {t.vorDerUnterschrift}</span>}
            </p>
            <div className="mt-3 space-y-2.5 text-[13px] text-neutral-800">
              {conferme.map((c) => (
                <Spunta key={c.k} on={sc[c.k]} onClick={() => setSc({ ...sc, [c.k]: !sc[c.k] })} sola={!puoFirmare}>
                  {c.testo} <span className="text-[11px] text-neutral-400">({c.nota})</span>
                </Spunta>
              ))}
            </div>
          </section>

          {/* firma */}
          <section className="mt-8 grid break-inside-avoid gap-6 sm:grid-cols-[1fr_1.4fr]">
            <div className="self-end">
              <p className="border-b border-neutral-900 pb-1 text-[13px] text-neutral-900">
                Köln, {giaFirmato ? new Date(d.firmatoAt!).toLocaleDateString(loc) : oggi}
              </p>
              <p className="mt-1 text-[11px] text-neutral-500">{t.ortDatum}</p>
            </div>
            <div>
              {giaFirmato ? (
                <p className="border-b border-neutral-900 pb-1 text-[13px] text-neutral-900">
                  {t.firmato} {new Date(d.firmatoAt!).toLocaleString(loc)} {t.von} {d.firmatoNome}
                </p>
              ) : (
                <>
                  <div className="flex items-center justify-between print:hidden">
                    <span className="text-[11px] font-semibold text-neutral-500">{t.firmaQui}</span>
                    {puoFirmare && (
                      <button type="button" onClick={firma.pulisci} className="text-[11px] font-semibold text-neutral-400 hover:text-neutral-700">
                        {t.cancella}
                      </button>
                    )}
                  </div>
                  <canvas
                    ref={firma.canvasRef}
                    {...(puoFirmare ? firma.handlers : {})}
                    className="mt-1 h-32 w-full touch-none border border-dashed border-black/30 bg-[#fafafa] print:border-0 print:border-b print:border-solid print:border-neutral-900 print:bg-white"
                  />
                </>
              )}
              <p className="mt-1 text-[11px] text-neutral-500">
                {t.unterschrift} · {giaFirmato ? d.firmatoNome : persona.nome}
              </p>
            </div>
          </section>
        </article>

        {/* ------------------------------------------- firma e paga */}
        <div className="print:hidden">
          {fatto ? (
            <div className="border border-green-600/30 bg-green-50 p-6 text-center">
              <p className="font-bold text-green-800">{t.grazie}</p>
              {fatto.token && (
                <>
                  <p className="mt-1 text-sm text-green-700">{t.prossimo}</p>
                  <a href={`/pagamento/${fatto.token}`} className="mt-4 inline-block bg-neutral-900 px-6 py-3 text-sm font-bold text-white">
                    {t.paga}
                  </a>
                </>
              )}
            </div>
          ) : giaFirmato ? (
            d.pagamento && (
              <div className="text-center">
                <a href={`/pagamento/${d.pagamento.token}`} className="inline-block bg-neutral-900 px-6 py-3.5 text-sm font-bold text-white">
                  {t.paga} · {eur(d.pagamento.importo)}
                </a>
              </div>
            )
          ) : bloccato ? (
            <div className="border border-amber-500/40 bg-amber-50 p-6 text-center">
              <p className="text-sm font-semibold text-amber-800">{d.scaduto ? t.scaduto : t.sostituito}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {errore && <p className="text-center text-sm font-semibold text-red-600">{errore}</p>}
              <button
                type="button"
                onClick={firmaEPaga}
                disabled={invio}
                className="w-full bg-neutral-900 py-4 text-[15px] font-bold text-white hover:bg-neutral-800 disabled:opacity-50"
              >
                {invio ? t.invio : `${t.firmaPaga} · ${eur(mensile)}`}
              </button>
              <p className="text-center text-[11px] leading-relaxed text-neutral-500">{t.sicuro}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/** Solo per Angelo: se regalare ore, quante, ogni mese o solo il primo. */
function OreRegalate({
  bonus,
  setBonus,
}: {
  bonus: { ore: number; ogniMese: boolean };
  setBonus: (b: { ore: number; ogniMese: boolean }) => void;
}) {
  const scelta = "px-3.5 py-2 text-[13px] font-semibold";
  const si = bonus.ore > 0;
  return (
    <div className="mt-8 border-2 border-dashed border-neutral-900/40 bg-[#fafafa] p-4">
      <p className="flex items-center gap-2 text-sm font-bold text-neutral-900">
        <Gift className="h-4 w-4" />
        Regali ore? <span className="text-[11px] font-normal text-neutral-500">(lo vedi solo tu)</span>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="flex border border-black/15 bg-white">
          {[false, true].map((v) => (
            <button
              key={String(v)}
              type="button"
              onClick={() => setBonus({ ...bonus, ore: v ? Math.max(bonus.ore, 1) : 0 })}
              className={`${scelta} ${si === v ? "bg-neutral-900 text-white" : "text-neutral-600"}`}
            >
              {v ? "Sì" : "No"}
            </button>
          ))}
        </div>
        {si && (
          <>
            <div className="flex items-stretch border border-black/15 bg-white">
              <button
                type="button"
                onClick={() => setBonus({ ...bonus, ore: Math.max(1, bonus.ore - 1) })}
                className="px-3.5 text-lg font-bold text-neutral-600"
                aria-label="Un'ora regalata in meno"
              >
                −
              </button>
              <span className="w-14 border-x border-black/15 py-2 text-center text-sm font-bold tabular-nums">
                {bonus.ore} {bonus.ore === 1 ? "ora" : "ore"}
              </span>
              <button
                type="button"
                onClick={() => setBonus({ ...bonus, ore: Math.min(20, bonus.ore + 1) })}
                className="px-3.5 text-lg font-bold text-neutral-600"
                aria-label="Un'ora regalata in più"
              >
                +
              </button>
            </div>
            <div className="flex border border-black/15 bg-white">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setBonus({ ...bonus, ogniMese: v })}
                  className={`${scelta} ${bonus.ogniMese === v ? "bg-neutral-900 text-white" : "text-neutral-600"}`}
                >
                  {v ? "Ogni mese" : "Solo il primo mese"}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <p className="mt-2 text-[12px] text-neutral-500">
        {si
          ? `Sul contratto: «+ ${bonus.ore} Bonusstunden ${bonus.ogniMese ? "pro Monat" : "im ersten Monat"}», gratis, su una riga a parte.`
          : "Nessuna ora regalata: sul contratto solo le ore pagate e la prima visita gratis."}
      </p>
    </div>
  );
}

function Clausole({ d }: { d: Dati }) {
  if (!d.articoli?.length) return null;
  return (
    <ol className="mt-2 space-y-2">
      {d.articoli.map((a, i) => (
        <li key={i} className="text-[11px] leading-relaxed text-neutral-600">
          <span className="font-bold text-neutral-900">
            § {i + 1} {a.titolo}
          </span>{" "}
          {a.testo}
        </li>
      ))}
    </ol>
  );
}
