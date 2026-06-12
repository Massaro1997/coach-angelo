import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: salva un documento (contratto o Rechnung) nell'archivio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, clientName, serviceType, rechnungNr, total, contractData, rechnungData } = body;

    if (!type || !clientName) {
      return NextResponse.json({ error: "type e clientName obbligatori" }, { status: 400 });
    }

    const doc = await prisma.document.create({
      data: {
        type,
        clientName,
        serviceType: serviceType || null,
        rechnungNr: rechnungNr || null,
        total: typeof total === "number" ? total : 0,
        contractData: contractData ?? undefined,
        rechnungData: rechnungData ?? undefined,
      },
    });

    return NextResponse.json({ success: true, id: doc.id }, { status: 201 });
  } catch (error) {
    console.error("Errore salvataggio documento:", error);
    return NextResponse.json({ error: "Errore durante il salvataggio" }, { status: 500 });
  }
}

// GET: lista documenti archiviati
export async function GET() {
  try {
    const docs = await prisma.document.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(docs);
  } catch (error) {
    console.error("Errore recupero documenti:", error);
    return NextResponse.json({ error: "Errore durante il recupero" }, { status: 500 });
  }
}
