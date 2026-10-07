// PDF del contratto firmato salvato sul documento dell'archivio.
// GET lo apre nel browser, POST (multipart, campo "file") lo carica o lo
// sostituisce. Solo admin: dentro ci sono dati personali.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const MAX = 10 * 1024 * 1024;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const d = await prisma.document.findUnique({ where: { id }, select: { pdf: true, pdfNome: true } });
  if (!d?.pdf) return NextResponse.json({ error: "Nessun PDF" }, { status: 404 });

  const nome = (d.pdfNome || "contratto.pdf").replace(/[^\w.\- ]/g, "_");
  return new NextResponse(Buffer.from(d.pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${nome}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const esiste = await prisma.document.findUnique({ where: { id }, select: { id: true } });
  if (!esiste) return NextResponse.json({ error: "Documento non trovato" }, { status: 404 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Manca il file" }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "Il PDF supera 10 MB" }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  // un PDF vero comincia con %PDF
  if (buf.subarray(0, 4).toString() !== "%PDF") {
    return NextResponse.json({ error: "Non è un PDF" }, { status: 400 });
  }

  await prisma.document.update({
    where: { id },
    data: { pdf: buf, pdfNome: file.name || "contratto.pdf", pdfCaricatoAt: new Date() },
  });
  return NextResponse.json({ ok: true, pdfNome: file.name });
}
