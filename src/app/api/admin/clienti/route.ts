// Clienti: chi ha un contratto con Angelo, da qualunque parte arrivi.
//
// Due fonti:
// - preventivi firmati (dal 07/10/2026): firma col dito, pagamenti Stripe,
//   rate registrate una per una;
// - contratti del vecchio generatore /contratti (Document type "contract"):
//   dati anagrafici completi ma pagamenti fuori dal sistema (bonifico o
//   PayPal), quindi lo stato dei soldi non si conosce.
//
// I contratti vecchi salvati due volte (stesso nome, pacchetto e inizio)
// diventano uno solo: il generatore salvava a ogni anteprima.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export interface RataCliente {
  id: string;
  numero: number | null;
  importo: number;
  stato: string;
  scadenza: string | null;
  pagatoAt: string | null;
}

/** Il contatto dal sito da cui e' nato il cliente. */
export interface LeadCliente {
  id: string;
  data: string;
  canale: string;
  pagina: string | null;
  servizio: string | null;
  /** risposte del wizard, "Obiettivo: Abnehmen" -> ["Obiettivo", "Abnehmen"] */
  risposte: [string, string][];
  nota: string | null;
}

export interface Cliente {
  id: string;
  fonte: "preventivo" | "contratto";
  /** id del Preventivo o del Document */
  rifId: string;
  numero: string | null;
  nome: string;
  email: string | null;
  telefono: string | null;
  indirizzo: string | null;
  nascita: string | null;
  piva: string | null;
  pacchetto: string;
  totale: number;
  mesi: number;
  mensile: boolean;
  inizio: string | null;
  fine: string | null;
  firmatoAt: string | null;
  firmatoNome: string | null;
  token: string | null;
  incassato: number | null;
  rate: RataCliente[];
  note: string | null;
  /** contratto firmato ma primo pagamento non arrivato */
  inAttesa: boolean;
  lead: LeadCliente | null;
  /** solo contratti vecchi: per riaprirli nel generatore /contratti */
  snapshot: { contractData: unknown; rechnungData: unknown } | null;
  /** solo contratti vecchi: PDF firmato salvato nel database */
  pdfNome: string | null;
}

const piuMesi = (d: Date, m: number) => {
  const x = new Date(d);
  x.setMonth(x.getMonth() + m);
  return x;
};

/** "Online-Coaching 6 Monate" -> 6 */
const mesiDa = (s?: string | null) => Number(s?.match(/(\d+)\s*(Monat|mes)/i)?.[1] || 1);

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const [preventivi, documenti, contatti] = await Promise.all([
    prisma.preventivo.findMany({
      where: { firmatoAt: { not: null } },
      include: { pagamenti: { orderBy: [{ rataNumero: "asc" }, { createdAt: "asc" }] } },
      orderBy: { firmatoAt: "desc" },
    }),
    // il PDF (bytea) resta fuori dall'elenco: si scarica a parte
    prisma.document.findMany({
      where: { type: "contract" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        clientName: true,
        serviceType: true,
        rechnungNr: true,
        total: true,
        contractData: true,
        rechnungData: true,
        pdfNome: true,
      },
    }),
    prisma.contact.findMany({ orderBy: { createdAt: "asc" } }),
  ]);

  // Rate dei contratti vecchi, segnate a mano (bonifico): documento = "doc:<id>"
  const rateDoc = await prisma.pagamento.findMany({
    where: { documento: { startsWith: "doc:" }, stato: { not: "annullato" } },
    orderBy: [{ rataNumero: "asc" }, { createdAt: "asc" }],
  });
  const comeRata = (r: (typeof rateDoc)[number]): RataCliente => ({
    id: r.id,
    numero: r.rataNumero,
    importo: r.importo,
    stato: r.stato,
    scadenza: r.scadenza?.toISOString() ?? null,
    pagatoAt: r.pagatoAt?.toISOString() ?? null,
  });

  const clienti: Cliente[] = preventivi.map((p) => {
    const inizio = p.dataInizio ?? p.accontoIncassatoAt ?? null;
    const mesi = Math.max(1, p.mesi);
    return {
      id: `p-${p.id}`,
      fonte: "preventivo",
      rifId: p.id,
      numero: p.numero,
      nome: p.clienteNome,
      email: p.clienteEmail,
      telefono: p.clienteTelefono,
      indirizzo: p.clienteIndirizzo,
      nascita: null,
      piva: p.clientePiva,
      pacchetto: p.oggetto || "Coaching",
      totale: p.totale,
      mesi,
      mensile: p.periodicita === "mensile",
      inizio: inizio ? inizio.toISOString() : null,
      fine: inizio && (p.periodicita !== "mensile" || mesi > 1) ? piuMesi(inizio, mesi).toISOString() : null,
      firmatoAt: p.firmatoAt?.toISOString() ?? null,
      firmatoNome: p.firmatoNome,
      token: p.token,
      incassato: p.accontoIncassato,
      rate: p.pagamenti
        .filter((r) => r.stato !== "annullato")
        .map((r) => ({
          id: r.id,
          numero: r.rataNumero,
          importo: r.importo,
          stato: r.stato,
          scadenza: r.scadenza?.toISOString() ?? null,
          pagatoAt: r.pagatoAt?.toISOString() ?? null,
        })),
      note: p.lavoroNote,
      inAttesa: p.stato !== "firmato",
      lead: null,
      snapshot: null,
      pdfNome: null,
    };
  });

  // Copie dello stesso contratto: si tiene la piu' recente, ma rate e PDF
  // si raccolgono da tutte le copie (possono stare su una qualunque).
  const chiaveDoc = (d: (typeof documenti)[number]) => {
    const c = (d.contractData || {}) as Record<string, string>;
    return `${(c.clientName || d.clientName || "").trim().toLowerCase()}|${d.serviceType}|${c.startDate || ""}`;
  };
  const gruppi = new Map<string, typeof documenti>();
  for (const d of documenti) gruppi.set(chiaveDoc(d), [...(gruppi.get(chiaveDoc(d)) || []), d]);

  const visti = new Set<string>();
  for (const d of documenti) {
    const c = (d.contractData || {}) as Record<string, string>;
    const nome = (c.clientName || d.clientName || "").trim();
    const chiave = chiaveDoc(d);
    if (visti.has(chiave)) continue;
    visti.add(chiave);
    const copie = gruppi.get(chiave) || [d];
    const ids = new Set(copie.map((x) => `doc:${x.id}`));
    const rate = rateDoc.filter((r) => r.documento && ids.has(r.documento)).map(comeRata);
    const conPdf = copie.find((x) => x.pdfNome);

    const mesi = mesiDa(d.serviceType || c.serviceType);
    const inizio = c.startDate ? new Date(c.startDate) : null;
    clienti.push({
      id: `d-${d.id}`,
      fonte: "contratto",
      rifId: d.id,
      numero: d.rechnungNr,
      nome,
      email: c.clientEmail || null,
      telefono: c.clientPhone || null,
      indirizzo: c.clientAddress || null,
      nascita: c.clientDob || null,
      piva: null,
      pacchetto: d.serviceType || c.serviceType || "Coaching",
      totale: d.total,
      mesi,
      mensile: mesi > 1,
      inizio: inizio ? inizio.toISOString() : null,
      fine: inizio ? piuMesi(inizio, mesi).toISOString() : null,
      firmatoAt: null,
      firmatoNome: null,
      token: null,
      incassato: rate.length
        ? Math.round(rate.filter((r) => r.stato === "pagato").reduce((s, r) => s + r.importo, 0) * 100) / 100
        : null,
      rate,
      note: c.notes || null,
      inAttesa: false,
      lead: null,
      snapshot: { contractData: d.contractData, rechnungData: d.rechnungData },
      pdfNome: conPdf?.pdfNome ?? null,
    });
    // il PDF si scarica dalla copia che ce l'ha
    if (conPdf && conPdf.id !== d.id) clienti[clienti.length - 1].rifId = conPdf.id;
  }

  // Il lead si riconosce dall'email o dalle ultime 9 cifre del telefono:
  // il wizard salva il numero come lo scrive il cliente (+49, 0049, 0151...).
  const cifre = (t?: string | null) => (t || "").replace(/\D/g, "").slice(-9);
  for (const c of clienti) {
    const email = c.email?.trim().toLowerCase();
    const tel = cifre(c.telefono);
    const l = contatti.find(
      (x) =>
        (email && x.email.trim().toLowerCase() === email) ||
        (tel.length === 9 && cifre(x.phone) === tel)
    );
    if (l) c.lead = leadDa(l);
  }

  return NextResponse.json(clienti);
}

/** Da dove arriva il contatto, in una parola: stessa regola della scheda Lead. */
function canale(c: { utmSource: string | null; utmMedium: string | null; referrer: string | null }) {
  if (c.utmSource) return `${c.utmSource}${c.utmMedium ? ` / ${c.utmMedium}` : ""}`;
  if (!c.referrer) return "Diretto";
  try {
    const h = new URL(c.referrer).hostname.replace(/^www\./, "");
    if (h.includes("angelocoach.com") || h.includes("fitprimo.de")) return "Diretto";
    if (h.includes("google")) return "Google";
    if (h.includes("chatgpt") || h.includes("openai")) return "ChatGPT";
    if (h.includes("instagram")) return "Instagram";
    if (h.includes("tiktok")) return "TikTok";
    if (h.includes("facebook")) return "Facebook";
    return h;
  } catch {
    return "Sconosciuto";
  }
}

function leadDa(l: {
  id: string;
  createdAt: Date;
  service: string | null;
  message: string;
  landingPage: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
}): LeadCliente {
  const [corpo, coda = ""] = l.message.split(/\r?\n-{3,}\r?\n/);
  const risposte: [string, string][] = [];
  for (const riga of corpo.split(/\r?\n/)) {
    const m = riga.match(/^([^:\[]{2,40}):\s*(.+)$/);
    if (m) risposte.push([m[1].trim(), m[2].trim()]);
  }
  const nota = coda.replace(/^Note:\s*/i, "").trim() || (risposte.length ? null : l.message.trim());
  return {
    id: l.id,
    data: l.createdAt.toISOString(),
    canale: canale(l),
    pagina: l.landingPage ? l.landingPage.split("?")[0] || "/" : null,
    servizio: l.service,
    risposte,
    nota,
  };
}
