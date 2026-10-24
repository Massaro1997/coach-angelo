// Preventivo contrattuale: dati fissi, catalogo, numerazione e piano rate.
// Stessa impostazione di DirezioneX (proposta e contratto sono lo stesso
// documento), adattata al business di Angelo: pacchetti coaching, niente rete
// vendita ne' commissioni.

import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

// I dati del prestatore stanno in preventivo-testi.ts, che non importa
// Prisma e quindi si puo' usare anche dalle pagine pubbliche.
export { COACH } from "./preventivo-testi";
export { LISTINO, type VoceListino, type VocePreventivo } from "./preventivo-listino";
import type { VocePreventivo } from "./preventivo-listino";
import { COACH } from "./preventivo-testi";

export const eur = (n: number) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

export const totaleVoci = (items: VocePreventivo[]) =>
  Math.round(items.reduce((s, v) => s + v.prezzo * (v.quantita || 1), 0) * 100) / 100;

/** Token del link pubblico: 32 hex, come in DirezioneX. */
export const nuovoToken = () => randomBytes(16).toString("hex");

/**
 * Numero progressivo P-<anno>-<progressivo>. Il progressivo guarda solo
 * l'anno corrente, cosi' ogni gennaio riparte da 001.
 */
export async function prossimoNumero(): Promise<string> {
  const anno = new Date().getFullYear();
  const ultimo = await prisma.preventivo.findFirst({
    where: { numero: { startsWith: `P-${anno}-` } },
    orderBy: { numero: "desc" },
    select: { numero: true },
  });
  const n = ultimo ? Number(ultimo.numero.split("-")[2]) + 1 : 1;
  return `P-${anno}-${String(n).padStart(3, "0")}`;
}

export interface RataPiano {
  tipo: "acconto" | "saldo" | "rata" | "unica" | "abbonamento";
  descrizione: string;
  importo: number;
  rataNumero?: number;
  rateTotali?: number;
  scadenza?: Date;
}

/**
 * Piano di pagamento alla firma.
 *
 * - una tantum: acconto (default 50%) + saldo alla consegna.
 * - mensile: una riga per mese, tutte uguali. La prima si paga alla firma e
 *   apre l'abbonamento Stripe, le altre le chiude il webhook a ogni addebito
 *   automatico. Stripe addebita sempre lo stesso importo: per questo il
 *   totale deve dividersi in mesi uguali (lo controlla la creazione).
 * - mensile senza durata: una riga sola, abbonamento aperto; i mesi dopo
 *   diventano righe nuove man mano che vengono addebitati.
 */
export function pianoAllaFirma(p: {
  totale: number;
  periodicita: string;
  mesi: number;
  accontoPerc: number;
  oggetto?: string | null;
}): RataPiano[] {
  const oggi = new Date();

  if (p.periodicita === "mensile" && p.mesi > 1) {
    const rata = Math.round((p.totale / p.mesi) * 100) / 100;
    return Array.from({ length: p.mesi }, (_, i) => {
      const scadenza = new Date(oggi);
      scadenza.setMonth(scadenza.getMonth() + i);
      return {
        tipo: "abbonamento" as const,
        descrizione: `${p.oggetto || "Coaching"} — Monat ${i + 1} von ${p.mesi}`,
        importo: rata,
        rataNumero: i + 1,
        rateTotali: p.mesi,
        scadenza,
      };
    });
  }

  if (p.periodicita === "mensile") {
    return [
      {
        tipo: "abbonamento",
        descrizione: `${p.oggetto || "Coaching"} — monatlich`,
        importo: p.totale,
        rataNumero: 1,
        scadenza: oggi,
      },
    ];
  }

  const perc = Math.min(Math.max(p.accontoPerc, 0), 100);
  if (perc >= 100 || p.totale <= 0) {
    return [
      {
        tipo: "unica",
        descrizione: p.oggetto || "Leistung",
        importo: p.totale,
        scadenza: oggi,
      },
    ];
  }

  const acconto = Math.round(p.totale * (perc / 100) * 100) / 100;
  return [
    {
      tipo: "acconto",
      descrizione: `Anzahlung ${perc}% — ${p.oggetto || "Leistung"}`,
      importo: acconto,
      rataNumero: 1,
      rateTotali: 2,
      scadenza: oggi,
    },
    {
      tipo: "saldo",
      descrizione: `Restbetrag — ${p.oggetto || "Leistung"}`,
      importo: Math.round((p.totale - acconto) * 100) / 100,
      rataNumero: 2,
      rateTotali: 2,
    },
  ];
}

/**
 * Clausole del contratto a ore (Personal Training, 50 € l'ora, abbonamento
 * mensile senza durata). Il paragrafo sulle ore regalate c'e' solo se Angelo
 * ne ha messe.
 */
export function articoliOre(conBonus: boolean) {
  const base = (titolo: string) => ARTICOLI_BASE.find((a) => a.titolo === titolo)!;
  return [
    {
      titolo: "Gegenstand des Vertrags",
      testo:
        "Der Trainer erbringt Personal Training 1-zu-1 in Köln, im Studio oder outdoor; der genaue Ort wird abgesprochen. Der Kunde wählt in diesem Vertrag ein monatliches Stundenkontingent. Eine Stunde entspricht 60 Minuten Training. Trainingspläne und Empfehlungen sind individuell und nicht zur Weitergabe an Dritte bestimmt.",
    },
    {
      titolo: "Erstes Treffen kostenlos",
      testo:
        "Das erste Treffen (Kennenlernen, Check-up und Probetraining) ist kostenlos und wird nicht auf das Stundenkontingent angerechnet.",
    },
    {
      titolo: "Vergütung und Zahlung",
      testo:
        "Jede gebuchte Stunde kostet 50 €. Der Monatsbetrag ergibt sich aus den gebuchten Stunden mal 50 € (z. B. 8 Stunden = 400 €). Der erste Monat ist bei Unterzeichnung fällig; danach wird der Monatsbetrag jeweils am gleichen Tag des Folgemonats automatisch über das bei der ersten Zahlung hinterlegte Zahlungsmittel eingezogen.",
    },
    ...(conBonus
      ? [
          {
            titolo: "Bonusstunden",
            testo:
              "Vom Trainer geschenkte Bonusstunden sind kostenlos und werden getrennt vom gebuchten Stundenkontingent geführt. Sie werden weder in Geld ausgezahlt noch erstattet und entfallen mit Ende des Vertrags.",
          },
        ]
      : []),
    {
      titolo: "Stundenkontingent",
      testo:
        "Die Termine werden gemeinsam vereinbart. Nicht genutzte Stunden können in den Folgemonat übertragen werden und verfallen danach. Der Stundenumfang kann jeweils zum nächsten Abrechnungsmonat geändert werden.",
    },
    base("Termine und Absagen"),
    {
      titolo: "Laufzeit und Kündigung",
      testo:
        "Der Vertrag beginnt mit der Unterzeichnung und läuft auf unbestimmte Zeit. Beide Seiten können jederzeit zum Ende des laufenden Abrechnungsmonats kündigen; eine Nachricht per E-Mail oder WhatsApp genügt. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.",
    },
    base("Gesundheit und Eigenverantwortung"),
    {
      titolo: "Widerrufsrecht",
      testo: `Der Kunde kann diesen Vertrag binnen 14 Tagen ab Vertragsabschluss ohne Angabe von Gründen widerrufen. Dafür genügt eine eindeutige Erklärung an ${COACH.name}, ${COACH.address} (${COACH.email}, ${COACH.phone}), z. B. per E-Mail oder WhatsApp. Im Fall des Widerrufs werden alle Zahlungen unverzüglich, spätestens binnen 14 Tagen, über dasselbe Zahlungsmittel erstattet. Hat der Kunde verlangt, dass das Training schon während der Widerrufsfrist beginnt, zahlt er für die bis zum Widerruf erbrachten Stunden einen anteiligen Betrag.`,
    },
    base("Datenschutz"),
  ];
}

/** Clausole predefinite, in tedesco: sono quelle del contratto esistente. */
export const ARTICOLI_BASE = [
  {
    titolo: "Gegenstand des Vertrags",
    testo:
      "Der Trainer erbringt die in diesem Vertrag aufgeführten Leistungen. Trainingspläne und Ernährungsempfehlungen sind individuell und nicht zur Weitergabe an Dritte bestimmt.",
  },
  {
    titolo: "Gesundheit und Eigenverantwortung",
    testo:
      "Der Kunde bestätigt, gesundheitlich in der Lage zu sein, am Training teilzunehmen, und bestehende Beschwerden vorab mitzuteilen. Der Trainer ist kein Arzt und ersetzt keine ärztliche Beratung.",
  },
  {
    titolo: "Termine und Absagen",
    testo:
      "Vereinbarte Termine sind verbindlich. Absagen sind bis 24 Stunden vorher kostenfrei möglich; danach gilt die Einheit als erbracht.",
  },
  {
    titolo: "Vergütung und Zahlung",
    testo:
      "Die Vergütung ergibt sich aus diesem Vertrag. Bei Paketen mit monatlicher Zahlung ist der erste Monat bei Unterzeichnung fällig; die weiteren Monatsbeträge werden jeweils am gleichen Tag des Folgemonats automatisch über das bei der ersten Zahlung hinterlegte Zahlungsmittel eingezogen und enden automatisch mit Ablauf der vereinbarten Laufzeit. Einmalzahlungen erfolgen per Karte, einer anderen angebotenen Zahlungsart oder per Überweisung auf das angegebene Konto.",
  },
  {
    titolo: "Laufzeit",
    testo:
      "Der Vertrag beginnt mit der Unterzeichnung und läuft über die vereinbarte Dauer. Eine vorzeitige Kündigung aus wichtigem Grund bleibt unberührt.",
  },
  {
    titolo: "Datenschutz",
    testo:
      "Personenbezogene Daten werden ausschließlich zur Durchführung des Vertrags verarbeitet (Art. 6 Abs. 1 lit. b DSGVO) und nicht an Dritte weitergegeben.",
  },
];
