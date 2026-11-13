// Disponibilita' settimanale del coach per le ore 1:1 (fasce AppSlot) e
// giorni di chiusura. Il PUT sostituisce tutte le fasce: il gestionale manda
// sempre la settimana intera. Le prenotazioni gia' fatte non si toccano
// (hanno i loro orari).

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { oggiISO } from "@/lib/app-coaching/date";
import {
  oraValida,
  siSovrappongono,
  testoBreve,
  toChiusura,
  toSlotAdmin,
} from "@/lib/app-coaching/prenotazioni";
import type { SlotAdmin } from "@/lib/app-coaching/tipi-v2";

export const dynamic = "force-dynamic";

const MAX_SLOT = 100;
const GIORNI = ["lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato", "domenica"];

type SlotNuovo = Omit<SlotAdmin, "id">;

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const coach = MARCHIO.chiave;
  const [slot, chiusure] = await Promise.all([
    prisma.appSlot.findMany({ where: { coach }, orderBy: [{ giorno: "asc" }, { inizio: "asc" }] }),
    // le chiusure passate non servono piu' a niente
    prisma.appChiusura.findMany({ where: { coach, data: { gte: oggiISO() } }, orderBy: { data: "asc" } }),
  ]);
  return NextResponse.json({ slot: slot.map(toSlotAdmin), chiusure: chiusure.map(toChiusura) });
}

function pulisciSlot(body: unknown): { slot: SlotNuovo[]; errore: null } | { slot: null; errore: string } {
  const lista =
    body && typeof body === "object" && !Array.isArray(body) ? (body as { slot?: unknown }).slot : undefined;
  if (!Array.isArray(lista)) return { slot: null, errore: "Richiesta non valida: serve {slot: [...]}" };
  if (lista.length > MAX_SLOT) return { slot: null, errore: `Massimo ${MAX_SLOT} fasce` };

  const slot: SlotNuovo[] = [];
  for (let i = 0; i < lista.length; i++) {
    const x = lista[i];
    const n = `Fascia ${i + 1}`;
    if (!x || typeof x !== "object") return { slot: null, errore: `${n}: non valida` };
    const o = x as Record<string, unknown>;
    const giorno =
      typeof o.giorno === "number" ? o.giorno : typeof o.giorno === "string" && o.giorno.trim() ? Number(o.giorno) : NaN;
    if (!Number.isInteger(giorno) || giorno < 0 || giorno > 6) {
      return { slot: null, errore: `${n}: giorno non valido (0 = lunedì ... 6 = domenica)` };
    }
    const inizio = oraValida(o.inizio);
    const fine = oraValida(o.fine);
    if (!inizio || !fine) return { slot: null, errore: `${n}: orario non valido (HH:MM)` };
    if (inizio >= fine) return { slot: null, errore: `${n}: l'inizio deve venire prima della fine` };
    const s: SlotNuovo = {
      giorno,
      inizio,
      fine,
      luogo: testoBreve(o.luogo, 120),
      attivo: typeof o.attivo === "boolean" ? o.attivo : true,
    };
    // la stessa fascia due volte (doppio clic nel gestionale) vale una
    if (slot.some((y) => y.giorno === s.giorno && y.inizio === s.inizio && y.fine === s.fine)) continue;
    slot.push(s);
  }

  // il coach e' uno solo: due fasce attive che si accavallano sarebbero due clienti insieme
  for (const a of slot) {
    if (!a.attivo) continue;
    const b = slot.find((y) => y !== a && y.attivo && y.giorno === a.giorno && siSovrappongono(a, y));
    if (b) {
      return {
        slot: null,
        errore: `${GIORNI[a.giorno]}: le fasce ${a.inizio}–${a.fine} e ${b.inizio}–${b.fine} si sovrappongono`,
      };
    }
  }
  return { slot, errore: null };
}

export async function PUT(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  const { slot, errore } = pulisciSlot(body);
  if (errore !== null) return NextResponse.json({ error: errore }, { status: 400 });

  const coach = MARCHIO.chiave;
  // tutto o niente: una settimana a meta' lascerebbe buchi che il coach non ha scelto
  await prisma.$transaction([
    prisma.appSlot.deleteMany({ where: { coach } }),
    prisma.appSlot.createMany({ data: slot.map((s) => ({ ...s, coach })) }),
  ]);
  const righe = await prisma.appSlot.findMany({
    where: { coach },
    orderBy: [{ giorno: "asc" }, { inizio: "asc" }],
  });
  return NextResponse.json({ slot: righe.map(toSlotAdmin) });
}
