import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend, OWNER_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { contactNotificationEmail, contactConfirmationEmail } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, referrer, landingPage, utmSource, utmMedium, utmCampaign } = body;

    // Validazione base
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nome, email e messaggio sono obbligatori" },
        { status: 400 }
      );
    }

    // Salva nel database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        service: service || null,
        message,
        referrer: referrer || null,
        landingPage: landingPage || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      },
    });

    // Riga sorgente nella mail di notifica
    const sourceParts = [
      referrer ? `Referrer: ${referrer}` : null,
      landingPage ? `Landing: ${landingPage}` : null,
      utmSource ? `UTM: ${utmSource}${utmMedium ? ` / ${utmMedium}` : ""}${utmCampaign ? ` / ${utmCampaign}` : ""}` : null,
    ].filter(Boolean);
    const messageWithSource = sourceParts.length
      ? `${message}\n---\nSorgente: ${sourceParts.join(" | ")}`
      : message;

    // Invia email di notifica al proprietario con template professionale
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `🔔 Nuovo contatto da ${name}`,
      html: contactNotificationEmail({
        name,
        email,
        phone,
        service,
        message: messageWithSource,
      }),
    });

    // Invia email di conferma al cliente
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `✅ Ho ricevuto il tuo messaggio - Coach Angelo`,
      html: contactConfirmationEmail({
        name,
        service,
      }),
    });

    return NextResponse.json(
      { success: true, id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Errore salvataggio contatto:", error);
    return NextResponse.json(
      { error: "Errore durante il salvataggio" },
      { status: 500 }
    );
  }
}

// GET per recuperare i contatti (admin)
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Errore recupero contatti:", error);
    return NextResponse.json(
      { error: "Errore durante il recupero" },
      { status: 500 }
    );
  }
}
