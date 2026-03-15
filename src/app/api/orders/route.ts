import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend, OWNER_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { orderNotificationEmail, orderConfirmationEmail, schedaProntaEmail } from "@/lib/email-templates";
import * as fs from "fs";
import * as path from "path";

interface OrderItem {
  id?: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
}

// Mappa schede pronte -> PDF files
const SCHEDE_PDF_MAP: Record<string, { filename: string; level: string }> = {
  "scheda-beginner": { filename: "Principiante.pdf", level: "Principiante" },
  "scheda-intermediate": { filename: "Intermedio.pdf", level: "Intermedio" },
  "scheda-advanced": { filename: "Avanzato.pdf", level: "Avanzato" },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      items,
      totalPrice,
      paypalOrderId,
      paypalStatus,
    } = body;

    // Validazione base
    if (!firstName || !lastName || !email || !items || !totalPrice) {
      return NextResponse.json(
        { error: "Dati obbligatori mancanti" },
        { status: 400 }
      );
    }

    // Salva nel database
    const order = await prisma.order.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        address: address || null,
        city: city || null,
        postalCode: postalCode || null,
        country: country || "Deutschland",
        items,
        totalPrice,
        paypalOrderId: paypalOrderId || null,
        paypalStatus: paypalStatus || null,
        status: paypalStatus === "COMPLETED" ? "completed" : "pending",
      },
    });

    // Invia email di notifica al proprietario con template professionale
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `💰 Nuovo ordine da ${firstName} ${lastName} - €${totalPrice}`,
      html: orderNotificationEmail({
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        items: items as OrderItem[],
        totalPrice,
        paypalOrderId,
      }),
    });

    // Invia email di conferma al cliente con template professionale
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `✅ Ordine confermato - Coach Angelo Fitness`,
      html: orderConfirmationEmail({
        firstName,
        items: items as OrderItem[],
        totalPrice,
      }),
    });

    // Invia email con PDF per ogni scheda pronta acquistata
    const orderItems = items as OrderItem[];
    for (const item of orderItems) {
      const schedaInfo = item.id ? SCHEDE_PDF_MAP[item.id] : null;
      if (schedaInfo) {
        try {
          // Leggi il PDF dalla cartella public
          const pdfPath = path.join(process.cwd(), "public", "Schede pronte", schedaInfo.filename);
          const pdfBuffer = fs.readFileSync(pdfPath);
          const pdfBase64 = pdfBuffer.toString("base64");

          await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `📋 La tua Scheda ${schedaInfo.level} - Coach Angelo Fitness`,
            html: schedaProntaEmail({
              firstName,
              schedaName: item.name,
              schedaLevel: schedaInfo.level,
            }),
            attachments: [
              {
                filename: `Scheda-${schedaInfo.level}-Coach-Angelo.pdf`,
                content: pdfBase64,
              },
            ],
          });
        } catch (pdfError) {
          console.error(`Errore invio PDF ${schedaInfo.filename}:`, pdfError);
          // Continua comunque, l'ordine è già salvato
        }
      }
    }

    return NextResponse.json(
      { success: true, id: order.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Errore salvataggio ordine:", error);
    return NextResponse.json(
      { error: "Errore durante il salvataggio" },
      { status: 500 }
    );
  }
}

// GET per recuperare gli ordini (admin)
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Errore recupero ordini:", error);
    return NextResponse.json(
      { error: "Errore durante il recupero" },
      { status: 500 }
    );
  }
}
