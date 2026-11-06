import { NextRequest, NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { resend, NOTIFY_EMAILS, FROM_EMAIL } from "@/lib/resend";
import { gmailTransport, GMAIL_FROM } from "@/lib/gmail";
import {
  contactNotificationEmail,
  contactConfirmationEmail,
  contactConfirmationText,
  CONTACT_CONFIRMATION_SUBJECT,
} from "@/lib/email-templates";

// Stesso indirizzo di FROM_EMAIL (info@angelocoach.com, il dominio verificato
// su Resend), ma il cliente legge il marchio del sito: "FitPrimo".
const FROM_CONFERMA = FROM_EMAIL.replace(/^[^<]*</, "FitPrimo <");

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

    // 06/11/2026: da qui la richiesta e' gia' salvata, quindi il cliente riceve
    // la conferma comunque. Prima le due mail stavano dentro il try con await:
    // se Gmail o Resend davano errore, la risposta era 500 e il wizard diceva
    // "Fehler beim Senden" a una richiesta arrivata (e chi riprovava la
    // mandava due volte). Ora partono dopo la risposta (after) e un errore
    // finisce solo nei log di Vercel, con l'id del contatto.
    after(async () => {
      const esiti = await Promise.allSettled([
        // Notifica interna via Gmail SMTP (ufficio.massaro, come Orchestra)
        gmailTransport.sendMail({
          from: GMAIL_FROM,
          to: NOTIFY_EMAILS,
          subject: `🔔 Nuovo contatto da ${name}`,
          html: contactNotificationEmail({
            name,
            email,
            phone,
            service,
            message: messageWithSource,
          }),
        }),
        // Conferma al cliente, in tedesco. Resend non lancia eccezioni:
        // l'errore sta nella risposta.
        resend.emails
          .send({
            from: FROM_CONFERMA,
            to: email,
            subject: CONTACT_CONFIRMATION_SUBJECT,
            html: contactConfirmationEmail({ name, service }),
            text: contactConfirmationText({ name, service }),
          })
          .then(({ error }) => {
            if (error) throw new Error(`Resend ${error.name}: ${error.message}`);
          }),
      ]);
      esiti.forEach((esito, i) => {
        if (esito.status === "rejected") {
          console.error(
            `Contatto ${contact.id} salvato, ma la mail ${i === 0 ? "di notifica ad Angelo" : "di conferma al cliente"} non e' partita:`,
            esito.reason
          );
        }
      });
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
  // Questa rotta espone dati personali: solo admin autenticato.
  const denied = await requireAdmin();
  if (denied) return denied;

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
