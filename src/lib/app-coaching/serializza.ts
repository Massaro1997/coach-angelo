// Dalle righe Prisma alle forme di tipi.ts (e ritorno per le colonne Json).
// Solo server: importa prisma per i riassunti della lista clienti.
//
// Regola: le note del coach (AppCliente.note) non escono mai verso il cliente,
// quindi il profilo si costruisce campo per campo, mai con uno spread della riga.

import { Prisma } from "@prisma/client";
import type { AppCliente, AppGiornata } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { MARCHIO } from "./marchio";
import type {
  Alimentazione,
  Allenamento,
  ClienteApp,
  DataISO,
  Giornata,
  Lingua,
  ProfiloCliente,
} from "./tipi";

export type RiassuntoCliente = Pick<
  ClienteApp,
  "giorniPianificati" | "ultimoGiornoPianificato" | "ultimoFatto"
>;

export const RIASSUNTO_VUOTO: RiassuntoCliente = {
  giorniPianificati: 0,
  ultimoGiornoPianificato: null,
  ultimoFatto: null,
};

function lingua(s: string): Lingua {
  return s === "it" ? "it" : "de";
}

// Il jsonb lo scrive solo pulisciPiano: qui basta un controllo di forma, cosi'
// una riga rovinata a mano non fa cadere l'app del cliente.
function comeAllenamento(v: Prisma.JsonValue | null): Allenamento | null {
  return v && typeof v === "object" && !Array.isArray(v) && Array.isArray(v.esercizi)
    ? (v as unknown as Allenamento)
    : null;
}

function comeAlimentazione(v: Prisma.JsonValue | null): Alimentazione | null {
  return v && typeof v === "object" && !Array.isArray(v) && Array.isArray(v.pasti)
    ? (v as unknown as Alimentazione)
    : null;
}

export function toGiornata(r: AppGiornata): Giornata {
  return {
    data: r.data,
    riposo: r.riposo,
    allenamento: comeAllenamento(r.allenamento),
    alimentazione: comeAlimentazione(r.alimentazione),
    notaCoach: r.notaCoach,
    fatto: r.fatto,
    fatica: r.fatica,
    feedback: r.feedback,
    fattoAt: r.fattoAt ? r.fattoAt.toISOString() : null,
    aggiornatoAt: r.updatedAt.toISOString(),
  };
}

export function linkAccesso(token: string): string {
  return `${MARCHIO.sito}/app/entra/${token}`;
}

export function toClienteApp(r: AppCliente, riassunto: RiassuntoCliente): ClienteApp {
  return {
    id: r.id,
    nome: r.nome,
    email: r.email,
    telefono: r.telefono,
    lingua: lingua(r.lingua),
    obiettivo: r.obiettivo,
    note: r.note,
    codice: r.codice,
    linkAccesso: linkAccesso(r.token),
    attivo: r.attivo,
    ultimoAccesso: r.ultimoAccesso ? r.ultimoAccesso.toISOString() : null,
    createdAt: r.createdAt.toISOString(),
    giorniPianificati: riassunto.giorniPianificati,
    ultimoGiornoPianificato: riassunto.ultimoGiornoPianificato,
    ultimoFatto: riassunto.ultimoFatto,
  };
}

/** Quello che il cliente vede di se stesso: niente note, codice, token. */
export function toProfilo(r: AppCliente): ProfiloCliente {
  return { nome: r.nome, lingua: lingua(r.lingua), obiettivo: r.obiettivo };
}

/** Per scrivere una colonna Json? : null diventa NULL SQL, non il valore json null. */
export function jsonDb(
  v: Prisma.JsonValue | object | null
): Prisma.InputJsonValue | typeof Prisma.DbNull {
  return v === null ? Prisma.DbNull : (v as Prisma.InputJsonValue);
}

/** Riassunti per la lista clienti: tre aggregazioni in parallelo, non una query per cliente. */
export async function caricaRiassunti(
  ids: string[],
  oggi: DataISO
): Promise<Map<string, RiassuntoCliente>> {
  const out = new Map<string, RiassuntoCliente>();
  if (!ids.length) return out;
  const dei = { clienteId: { in: ids } };
  const [futuri, ultimi, fatti] = await Promise.all([
    prisma.appGiornata.groupBy({
      by: ["clienteId"],
      where: { ...dei, data: { gte: oggi } },
      _count: { _all: true },
    }),
    prisma.appGiornata.groupBy({ by: ["clienteId"], where: dei, _max: { data: true } }),
    prisma.appGiornata.groupBy({
      by: ["clienteId"],
      where: { ...dei, fatto: true },
      _max: { data: true },
    }),
  ]);
  const prendi = (id: string) => {
    let r = out.get(id);
    if (!r) out.set(id, (r = { ...RIASSUNTO_VUOTO }));
    return r;
  };
  for (const g of futuri) prendi(g.clienteId).giorniPianificati = g._count._all;
  for (const g of ultimi) prendi(g.clienteId).ultimoGiornoPianificato = g._max.data;
  for (const g of fatti) prendi(g.clienteId).ultimoFatto = g._max.data;
  return out;
}
