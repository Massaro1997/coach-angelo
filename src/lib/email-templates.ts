// Template email ispirati al design del sito Coach Angelo
// Ottimizzati per evitare spam filters

import { TELEFONO, TELEFONO_HREF, WHATSAPP_HREF } from "@/lib/contatto";

const BASE_URL = "https://www.fitprimo.de";
const LOGO_URL = `${BASE_URL}/logo-bianco.png`;

// Stili comuni - semplificati per evitare spam
const styles = {
  container: `
    font-family: Arial, Helvetica, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    background-color: #171717;
    color: #ffffff;
  `,
  header: `
    background: linear-gradient(135deg, #ff2b3a 0%, #e30613 50%, #b3040f 100%);
    border-bottom: 2px solid #e30613;
    padding: 30px;
    text-align: center;
  `,
  content: `
    padding: 30px;
    background-color: #262626;
  `,
  footer: `
    padding: 20px 30px;
    text-align: center;
    background-color: #171717;
    border-top: 1px solid #404040;
  `,
  button: `
    display: inline-block;
    background: linear-gradient(135deg, #ff2b3a 0%, #e30613 50%, #b3040f 100%);
    color: #ffffff;
    padding: 14px 28px;
    text-decoration: none;
    font-weight: bold;
    border-radius: 8px;
    font-size: 14px;
  `,
  badge: `
    display: inline-block;
    background-color: rgba(227, 6, 19, 0.15);
    color: #e30613;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 15px;
  `,
};

// Il testo che arriva dal modulo va nell'HTML delle mail: prima si neutralizza
// (06/11/2026). Senza, un nome con dentro un link finiva tale e quale nella
// conferma mandata all'indirizzo scritto nel modulo, cioe' a chiunque.
function esc(v: string | null | undefined): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Numero per wa.me: solo cifre, prefisso internazionale; 0176... diventa 49176... */
function numeroWhatsApp(telefono: string): string {
  const cifre = telefono.replace(/\D/g, "");
  if (cifre.startsWith("00")) return cifre.slice(2);
  if (cifre.startsWith("0")) return "49" + cifre.slice(1);
  return cifre;
}

// Logo FitPrimo bianco in PNG (le mail non mostrano gli SVG), fatto dal file
// public/brand/fitprimo/fitprimo-logo-bianco.svg il 06/11/2026.
const LOGO_FITPRIMO_URL = `${BASE_URL}/brand/fitprimo/fitprimo-logo-bianco-email.png`;

// I percorsi del wizard (LeadWizard.tsx, domanda 4) e i valori del vecchio modulo.
const SERVIZI_IT: Record<string, string> = {
  "personal-training": "Personal Training",
  "online-coaching": "Coaching Online",
  trainingsplan: "Scheda personalizzata",
  ernaehrungsberatung: "Consulenza alimentare con Natalie",
  beratung: "Non lo sa ancora, vuole un consiglio",
  nutrition: "Piano Alimentare",
  consultation: "Consulenza Gratuita",
};

const SERVIZI_DE: Record<string, string> = {
  "personal-training": "Personal Training in Köln",
  "online-coaching": "Online Coaching",
  trainingsplan: "Individueller Trainingsplan",
  ernaehrungsberatung: "Ernährungsberatung mit Natalie",
  nutrition: "Ernährungsplan",
};

// Template per notifica nuovo contatto (al proprietario)
export function contactNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
}) {
  const servizio = data.service ? SERVIZI_IT[data.service] || data.service : "";

  return `
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuovo contatto da ${esc(data.name)}</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #0a0a0a;">
      <div style="${styles.container}">
        <!-- Header con Logo -->
        <div style="${styles.header}">
          <img src="${LOGO_FITPRIMO_URL}" alt="FitPrimo" width="220" style="width: 220px; max-width: 100%; height: auto;" />
        </div>

        <!-- Content -->
        <div style="${styles.content}">
          <div style="text-align: center; margin-bottom: 25px;">
            <span style="${styles.badge}">Nuovo Contatto</span>
            <h2 style="color: #ffffff; font-size: 22px; margin: 10px 0 0 0;">
              Hai ricevuto un nuovo messaggio
            </h2>
          </div>

          <!-- Contact Info -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                  <span style="color: #888; font-size: 12px;">NOME</span>
                  <div style="color: #ffffff; font-size: 15px; margin-top: 4px;">${esc(data.name)}</div>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                  <span style="color: #888; font-size: 12px;">EMAIL</span>
                  <div style="margin-top: 4px;">
                    <a href="mailto:${esc(data.email)}" style="color: #e30613; font-size: 15px; text-decoration: none;">${esc(data.email)}</a>
                  </div>
                </td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                  <span style="color: #888; font-size: 12px;">TELEFONO</span>
                  <div style="margin-top: 4px;">
                    <a href="tel:${esc(data.phone.replace(/[^\d+]/g, ""))}" style="color: #e30613; font-size: 15px; text-decoration: none;">${esc(data.phone)}</a>
                  </div>
                </td>
              </tr>
              ` : ""}
              ${servizio ? `
              <tr>
                <td style="padding: 10px 0;">
                  <span style="color: #888; font-size: 12px;">SERVIZIO RICHIESTO</span>
                  <div style="color: #ffffff; font-size: 15px; margin-top: 4px;">${esc(servizio)}</div>
                </td>
              </tr>
              ` : ""}
            </table>
          </div>

          <!-- Message -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px;">
            <span style="color: #888; font-size: 12px;">MESSAGGIO</span>
            <p style="color: #e5e5e5; font-size: 15px; line-height: 1.6; margin: 10px 0 0 0; white-space: pre-wrap;">${esc(data.message)}</p>
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin-top: 25px;">
            <a href="mailto:${esc(data.email)}" style="${styles.button}">
              Rispondi via Email
            </a>
            ${data.phone ? `
            <p style="margin-top: 15px;">
              <a href="https://wa.me/${numeroWhatsApp(data.phone)}" style="color: #22c55e; text-decoration: none;">
                Contatta su WhatsApp
              </a>
            </p>
            ` : ""}
          </div>
        </div>

        <!-- Footer -->
        <div style="${styles.footer}">
          <p style="color: #666; font-size: 12px; margin: 0;">
            FitPrimo - <a href="${BASE_URL}" style="color: #888; text-decoration: none;">fitprimo.de</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Template per notifica nuovo ordine (al proprietario)
export function orderNotificationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string;
  items: Array<{ name: string; variant?: string; price: number; quantity: number }>;
  totalPrice: number;
  paypalOrderId?: string | null;
}) {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #333;">
          <div style="color: #ffffff;">${item.name}</div>
          ${item.variant ? `<div style="color: #888; font-size: 13px;">${item.variant}</div>` : ""}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #333; text-align: center; color: #888;">
          x${item.quantity}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #333; text-align: right; color: #e30613;">
          ${(item.price * item.quantity).toFixed(2)} EUR
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuovo ordine da ${data.firstName} ${data.lastName}</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #0a0a0a;">
      <div style="${styles.container}">
        <!-- Header con Logo -->
        <div style="${styles.header}">
          <img src="${LOGO_URL}" alt="Coach Angelo" style="max-width: 180px; height: auto;" />
        </div>

        <!-- Content -->
        <div style="${styles.content}">
          <div style="text-align: center; margin-bottom: 25px;">
            <span style="display: inline-block; background-color: rgba(34, 197, 94, 0.15); color: #22c55e; padding: 6px 14px; border-radius: 20px; font-size: 12px; text-transform: uppercase; margin-bottom: 15px;">
              Nuovo Ordine
            </span>
            <h2 style="color: #ffffff; font-size: 22px; margin: 10px 0 0 0;">
              Hai ricevuto un nuovo ordine
            </h2>
            <p style="color: #e30613; font-size: 28px; font-weight: bold; margin: 10px 0 0 0;">
              ${data.totalPrice.toFixed(2)} EUR
            </p>
          </div>

          <!-- Customer Info -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #e30613; font-size: 13px; text-transform: uppercase; margin: 0 0 15px 0;">
              Dati Cliente
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #888; width: 100px;">Nome:</td>
                <td style="padding: 6px 0; color: #ffffff;">${data.firstName} ${data.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #888;">Email:</td>
                <td style="padding: 6px 0;"><a href="mailto:${data.email}" style="color: #e30613; text-decoration: none;">${data.email}</a></td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 6px 0; color: #888;">Telefono:</td>
                <td style="padding: 6px 0;"><a href="tel:${data.phone}" style="color: #e30613; text-decoration: none;">${data.phone}</a></td>
              </tr>
              ` : ""}
              ${data.address ? `
              <tr>
                <td style="padding: 6px 0; color: #888;">Indirizzo:</td>
                <td style="padding: 6px 0; color: #ffffff;">${data.address}, ${data.postalCode} ${data.city}, ${data.country}</td>
              </tr>
              ` : ""}
            </table>
          </div>

          <!-- Order Items -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #e30613; font-size: 13px; text-transform: uppercase; margin: 0 0 15px 0;">
              Prodotti
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${itemsHtml}
              <tr>
                <td colspan="2" style="padding: 15px 0 0 0; color: #ffffff; font-weight: bold;">
                  TOTALE
                </td>
                <td style="padding: 15px 0 0 0; text-align: right; color: #e30613; font-weight: bold; font-size: 18px;">
                  ${data.totalPrice.toFixed(2)} EUR
                </td>
              </tr>
            </table>
          </div>

          ${data.paypalOrderId ? `
          <div style="background-color: #171717; border-radius: 12px; padding: 15px; margin-bottom: 20px;">
            <span style="color: #888; font-size: 12px;">PAYPAL ORDER ID</span>
            <div style="color: #ffffff; font-family: monospace; margin-top: 4px; font-size: 13px;">${data.paypalOrderId}</div>
          </div>
          ` : ""}

          <!-- Action Button -->
          <div style="text-align: center; margin-top: 25px;">
            <a href="mailto:${data.email}" style="${styles.button}">
              Contatta Cliente
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="${styles.footer}">
          <p style="color: #666; font-size: 12px; margin: 0;">
            Coach Angelo Fitness - angelocoach.com
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Template conferma ordine (al cliente)
export function orderConfirmationEmail(data: {
  firstName: string;
  items: Array<{ name: string; variant?: string; price: number; quantity: number }>;
  totalPrice: number;
}) {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #333;">
          <div style="color: #ffffff;">${item.name}</div>
          ${item.variant ? `<div style="color: #888; font-size: 13px;">${item.variant}</div>` : ""}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #333; text-align: center; color: #888;">
          x${item.quantity}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #333; text-align: right; color: #e30613;">
          ${(item.price * item.quantity).toFixed(2)} EUR
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ordine confermato - Coach Angelo</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #0a0a0a;">
      <div style="${styles.container}">
        <!-- Header con Logo -->
        <div style="${styles.header}">
          <img src="${LOGO_URL}" alt="Coach Angelo" style="max-width: 180px; height: auto;" />
        </div>

        <!-- Content -->
        <div style="${styles.content}">
          <!-- Success Message -->
          <div style="text-align: center; margin-bottom: 25px;">
            <div style="color: #22c55e; font-size: 48px; margin-bottom: 15px;">&#10003;</div>
            <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0;">
              Grazie, ${data.firstName}!
            </h2>
            <p style="color: #a3a3a3; font-size: 15px; margin: 0;">
              Il tuo ordine e stato ricevuto con successo.
            </p>
          </div>

          <!-- Order Summary -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #e30613; font-size: 13px; text-transform: uppercase; margin: 0 0 15px 0;">
              Riepilogo Ordine
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${itemsHtml}
              <tr>
                <td colspan="2" style="padding: 15px 0 0 0; color: #ffffff; font-weight: bold;">
                  TOTALE
                </td>
                <td style="padding: 15px 0 0 0; text-align: right; color: #e30613; font-weight: bold; font-size: 18px;">
                  ${data.totalPrice.toFixed(2)} EUR
                </td>
              </tr>
            </table>
          </div>

          <!-- Next Steps -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 12px 0;">
              Prossimi Passi
            </h3>
            <p style="color: #a3a3a3; line-height: 1.6; margin: 0; font-size: 14px;">
              Ti contattero entro 24 ore per iniziare il tuo percorso di trasformazione.
            </p>
          </div>

          <!-- Contact Info -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px;">
            <h3 style="color: #ffffff; font-size: 15px; margin: 0 0 12px 0;">
              Hai domande? Contattami!
            </h3>
            <p style="margin: 8px 0; font-size: 14px;">
              <a href="mailto:info@angelocoach.com" style="color: #e30613; text-decoration: none;">
                Email: info@angelocoach.com
              </a>
            </p>
            <p style="margin: 8px 0; font-size: 14px;">
              <a href="https://instagram.com/am_fitprimo" style="color: #e30613; text-decoration: none;">
                Instagram: @am_fitprimo
              </a>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="${styles.footer}">
          <p style="color: #a3a3a3; font-size: 13px; margin: 0 0 8px 0;">
            A presto!
          </p>
          <p style="color: #888; font-size: 13px; margin: 0;">
            Coach Angelo
          </p>
          <p style="color: #666; font-size: 11px; margin: 15px 0 0 0;">
            Coach Angelo Fitness - angelocoach.com<br>
            <a href="https://angelocoach.com" style="color: #666; text-decoration: none;">angelocoach.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Template conferma ordine scheda pronta con PDF (al cliente)
export function schedaProntaEmail(data: {
  firstName: string;
  schedaName: string;
  schedaLevel: string;
}) {
  return `
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ecco la tua Scheda - Coach Angelo</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #0a0a0a;">
      <div style="${styles.container}">
        <!-- Header con Logo -->
        <div style="${styles.header}">
          <img src="${LOGO_URL}" alt="Coach Angelo" style="max-width: 180px; height: auto;" />
        </div>

        <!-- Content -->
        <div style="${styles.content}">
          <!-- Success Message -->
          <div style="text-align: center; margin-bottom: 25px;">
            <div style="color: #22c55e; font-size: 48px; margin-bottom: 15px;">&#127942;</div>
            <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0;">
              Ciao ${data.firstName}!
            </h2>
            <p style="color: #a3a3a3; font-size: 15px; margin: 0;">
              Ecco la tua scheda di allenamento!
            </p>
          </div>

          <!-- Scheda Info -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
            <div style="display: inline-block; background-color: rgba(227, 6, 19, 0.15); color: #e30613; padding: 6px 14px; border-radius: 20px; font-size: 12px; text-transform: uppercase; margin-bottom: 15px;">
              ${data.schedaLevel}
            </div>
            <h3 style="color: #ffffff; font-size: 20px; margin: 0 0 10px 0;">
              ${data.schedaName}
            </h3>
            <p style="color: #a3a3a3; font-size: 14px; margin: 0;">
              Trovi il PDF allegato a questa email
            </p>
          </div>

          <!-- Instructions -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 12px 0;">
              Come usare la tua scheda
            </h3>
            <ul style="color: #a3a3a3; line-height: 1.8; margin: 0; padding-left: 20px; font-size: 14px;">
              <li>Scarica e salva il PDF sul tuo telefono</li>
              <li>Segui gli esercizi nell'ordine indicato</li>
              <li>Rispetta i tempi di recupero</li>
              <li>Guarda i video dimostrativi per la tecnica corretta</li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px;">
            <h3 style="color: #ffffff; font-size: 15px; margin: 0 0 12px 0;">
              Hai domande sulla scheda?
            </h3>
            <p style="margin: 8px 0; font-size: 14px;">
              <a href="mailto:info@angelocoach.com" style="color: #e30613; text-decoration: none;">
                Email: info@angelocoach.com
              </a>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="${styles.footer}">
          <p style="color: #a3a3a3; font-size: 13px; margin: 0 0 8px 0;">
            Buon allenamento!
          </p>
          <p style="color: #888; font-size: 13px; margin: 0;">
            Coach Angelo
          </p>
          <p style="color: #666; font-size: 11px; margin: 15px 0 0 0;">
            Coach Angelo Fitness - angelocoach.com<br>
            <a href="https://angelocoach.com" style="color: #666; text-decoration: none;">angelocoach.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/*
  Conferma al cliente che ha compilato il wizard. In tedesco e con il marchio
  FitPrimo dal 06/11/2026: prima era in italiano ("Ho ricevuto il tuo
  messaggio - Coach Angelo") con il pulsante verso angelocoach.com, mentre il
  sito e' solo in tedesco. Il mittente resta info@angelocoach.com: il dominio
  verificato su Resend e' quello.
*/
export const CONTACT_CONFIRMATION_SUBJECT = "Deine Anfrage bei FitPrimo ist angekommen";

// Solo il nome, e solo lettere: un "nome" come www.esempio.com nella conferma
// diventerebbe un link cliccabile mandato a un indirizzo qualsiasi.
function vornameDa(name: string): string {
  const primo = name.trim().split(/\s+/)[0] || "";
  return primo.replace(/[^\p{L}\p{M}'-]/gu, "").slice(0, 40);
}

export function contactConfirmationEmail(data: {
  name: string;
  service?: string | null;
}) {
  const vorname = vornameDa(data.name);
  const leistung = data.service ? SERVIZI_DE[data.service] : undefined;

  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${CONTACT_CONFIRMATION_SUBJECT}</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #0a0a0a;">
      <div style="${styles.container}">
        <!-- Header con Logo -->
        <div style="${styles.header}">
          <img src="${LOGO_FITPRIMO_URL}" alt="FitPrimo" width="220" style="width: 220px; max-width: 100%; height: auto;" />
        </div>

        <!-- Content -->
        <div style="${styles.content}">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0;">
              Hallo${vorname ? ` ${esc(vorname)}` : ""}!
            </h2>
            <p style="color: #a3a3a3; font-size: 15px; margin: 0;">
              Deine Anfrage ist angekommen.
            </p>
          </div>

          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="color: #e5e5e5; line-height: 1.7; margin: 0; font-size: 15px;">
              Danke, dass du dich bei FitPrimo meldest.<br><br>
              ${leistung ? `Du interessierst dich für: <strong style="color: #ffffff;">${esc(leistung)}</strong><br><br>` : ""}
              Angelo meldet sich innerhalb von <strong style="color: #ffffff;">24 Stunden</strong> bei dir, um deine
              kostenlose Erstberatung zu vereinbaren. Das Gespräch ist unverbindlich.
            </p>
          </div>

          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 12px 0;">
              Du willst nicht warten?
            </h3>
            <p style="color: #a3a3a3; line-height: 1.6; margin: 0 0 10px 0; font-size: 14px;">
              Schreib Angelo direkt oder ruf ihn an:
            </p>
            <p style="margin: 6px 0; font-size: 14px;">
              <a href="${WHATSAPP_HREF}" style="color: #22c55e; text-decoration: none;">WhatsApp: ${TELEFONO}</a>
            </p>
            <p style="margin: 6px 0; font-size: 14px;">
              <a href="${TELEFONO_HREF}" style="color: #ff2b3a; text-decoration: none;">Telefon: ${TELEFONO}</a>
            </p>
          </div>

          <div style="background-color: #171717; border-radius: 12px; padding: 20px;">
            <h3 style="color: #ffffff; font-size: 15px; margin: 0 0 12px 0;">
              Bis dahin
            </h3>
            <p style="color: #a3a3a3; line-height: 1.6; margin: 0 0 8px 0; font-size: 14px;">
              Auf Instagram zeigen wir Training und Ernährung aus dem Alltag bei FitPrimo.
            </p>
            <p style="margin: 8px 0 0 0; font-size: 14px;">
              <a href="https://www.instagram.com/am_fitprimo" style="color: #ff2b3a; text-decoration: none;">
                Instagram: @am_fitprimo
              </a>
            </p>
          </div>

          <div style="text-align: center; margin-top: 25px;">
            <a href="${BASE_URL}" style="${styles.button}">
              Zur Website
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="${styles.footer}">
          <p style="color: #a3a3a3; font-size: 13px; margin: 0 0 8px 0;">
            Sportliche Grüße
          </p>
          <p style="color: #888; font-size: 13px; margin: 0;">
            Angelo, FitPrimo
          </p>
          <p style="color: #666; font-size: 11px; line-height: 1.6; margin: 15px 0 0 0;">
            FitPrimo · Personal Training und Ernährungsberatung in Köln<br>
            <a href="${BASE_URL}" style="color: #888; text-decoration: none;">www.fitprimo.de</a>
            &nbsp;·&nbsp;
            <a href="${BASE_URL}/impressum" style="color: #888; text-decoration: none;">Impressum</a><br>
            Du bekommst diese E-Mail, weil du auf fitprimo.de eine Anfrage gestellt hast.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/** La stessa conferma in solo testo, per i programmi di posta senza HTML. */
export function contactConfirmationText(data: { name: string; service?: string | null }) {
  const vorname = vornameDa(data.name);
  const leistung = data.service ? SERVIZI_DE[data.service] : undefined;
  return [
    `Hallo${vorname ? ` ${vorname}` : ""}!`,
    "",
    "Deine Anfrage ist angekommen. Danke, dass du dich bei FitPrimo meldest.",
    leistung ? `Du interessierst dich für: ${leistung}` : null,
    "",
    "Angelo meldet sich innerhalb von 24 Stunden bei dir, um deine kostenlose Erstberatung zu vereinbaren. Das Gespräch ist unverbindlich.",
    "",
    "Du willst nicht warten? Schreib Angelo direkt oder ruf ihn an:",
    `WhatsApp: ${WHATSAPP_HREF}`,
    `Telefon: ${TELEFONO}`,
    "",
    "Sportliche Grüße",
    "Angelo, FitPrimo",
    "",
    "FitPrimo · Personal Training und Ernährungsberatung in Köln",
    `${BASE_URL} · Impressum: ${BASE_URL}/impressum`,
  ]
    .filter((r) => r !== null)
    .join("\n");
}
