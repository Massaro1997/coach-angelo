import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// DELETE: rimuove un documento dall'archivio
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Cancella contratti e fatture: solo admin autenticato.
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await params;
    await prisma.document.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore eliminazione documento:", error);
    return NextResponse.json({ error: "Errore durante l'eliminazione" }, { status: 500 });
  }
}
