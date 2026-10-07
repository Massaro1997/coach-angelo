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
  /** solo contratti vecchi: per riaprirli nel generatore /contratti */
  snapshot: { contractData: unknown; rechnungData: unknown } | null;
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

  const [preventivi, documenti] = await Promise.all([
    prisma.preventivo.findMany({
      where: { firmatoAt: { not: null } },
      include: { pagamenti: { orderBy: [{ rataNumero: "asc" }, { createdAt: "asc" }] } },
      orderBy: { firmatoAt: "desc" },
    }),
    prisma.document.findMany({ where: { type: "contract" }, orderBy: { createdAt: "desc" } }),
  ]);

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
      snapshot: null,
    };
  });

  const visti = new Set<string>();
  for (const d of documenti) {
    const c = (d.contractData || {}) as Record<string, string>;
    const nome = (c.clientName || d.clientName || "").trim();
    const chiave = `${nome.toLowerCase()}|${d.serviceType}|${c.startDate || ""}`;
    if (visti.has(chiave)) continue;
    visti.add(chiave);

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
      incassato: null,
      rate: [],
      note: c.notes || null,
      inAttesa: false,
      snapshot: { contractData: d.contractData, rechnungData: d.rechnungData },
    });
  }

  return NextResponse.json(clienti);
}
