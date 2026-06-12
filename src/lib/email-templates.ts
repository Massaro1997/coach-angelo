// Template email ispirati al design del sito Coach Angelo
// Ottimizzati per evitare spam filters

const BASE_URL = "https://angelocoach.com";
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
    background: linear-gradient(135deg, #ec4899 0%, #d946ef 50%, #8b5cf6 100%);
    border-bottom: 2px solid #d946ef;
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
    background: linear-gradient(135deg, #ec4899 0%, #d946ef 50%, #8b5cf6 100%);
    color: #ffffff;
    padding: 14px 28px;
    text-decoration: none;
    font-weight: bold;
    border-radius: 8px;
    font-size: 14px;
  `,
  badge: `
    display: inline-block;
    background-color: rgba(217, 70, 239, 0.15);
    color: #d946ef;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 15px;
  `,
};

// Template per notifica nuovo contatto (al proprietario)
export function contactNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
}) {
  const serviceLabels: Record<string, string> = {
    "personal-training": "Personal Training",
    "online-coaching": "Coaching Online",
    "nutrition": "Piano Alimentare",
    "consultation": "Consulenza Gratuita",
  };

  return `
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuovo contatto da ${data.name}</title>
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
                  <div style="color: #ffffff; font-size: 15px; margin-top: 4px;">${data.name}</div>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                  <span style="color: #888; font-size: 12px;">EMAIL</span>
                  <div style="margin-top: 4px;">
                    <a href="mailto:${data.email}" style="color: #d946ef; font-size: 15px; text-decoration: none;">${data.email}</a>
                  </div>
                </td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                  <span style="color: #888; font-size: 12px;">TELEFONO</span>
                  <div style="margin-top: 4px;">
                    <a href="tel:${data.phone}" style="color: #d946ef; font-size: 15px; text-decoration: none;">${data.phone}</a>
                  </div>
                </td>
              </tr>
              ` : ""}
              ${data.service ? `
              <tr>
                <td style="padding: 10px 0;">
                  <span style="color: #888; font-size: 12px;">SERVIZIO RICHIESTO</span>
                  <div style="color: #ffffff; font-size: 15px; margin-top: 4px;">${serviceLabels[data.service] || data.service}</div>
                </td>
              </tr>
              ` : ""}
            </table>
          </div>

          <!-- Message -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px;">
            <span style="color: #888; font-size: 12px;">MESSAGGIO</span>
            <p style="color: #e5e5e5; font-size: 15px; line-height: 1.6; margin: 10px 0 0 0; white-space: pre-wrap;">${data.message}</p>
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin-top: 25px;">
            <a href="mailto:${data.email}" style="${styles.button}">
              Rispondi via Email
            </a>
            ${data.phone ? `
            <p style="margin-top: 15px;">
              <a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="color: #22c55e; text-decoration: none;">
                Contatta su WhatsApp
              </a>
            </p>
            ` : ""}
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
        <td style="padding: 12px 0; border-bottom: 1px solid #333; text-align: right; color: #d946ef;">
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
            <p style="color: #d946ef; font-size: 28px; font-weight: bold; margin: 10px 0 0 0;">
              ${data.totalPrice.toFixed(2)} EUR
            </p>
          </div>

          <!-- Customer Info -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #d946ef; font-size: 13px; text-transform: uppercase; margin: 0 0 15px 0;">
              Dati Cliente
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #888; width: 100px;">Nome:</td>
                <td style="padding: 6px 0; color: #ffffff;">${data.firstName} ${data.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #888;">Email:</td>
                <td style="padding: 6px 0;"><a href="mailto:${data.email}" style="color: #d946ef; text-decoration: none;">${data.email}</a></td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 6px 0; color: #888;">Telefono:</td>
                <td style="padding: 6px 0;"><a href="tel:${data.phone}" style="color: #d946ef; text-decoration: none;">${data.phone}</a></td>
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
            <h3 style="color: #d946ef; font-size: 13px; text-transform: uppercase; margin: 0 0 15px 0;">
              Prodotti
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${itemsHtml}
              <tr>
                <td colspan="2" style="padding: 15px 0 0 0; color: #ffffff; font-weight: bold;">
                  TOTALE
                </td>
                <td style="padding: 15px 0 0 0; text-align: right; color: #d946ef; font-weight: bold; font-size: 18px;">
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
        <td style="padding: 10px 0; border-bottom: 1px solid #333; text-align: right; color: #d946ef;">
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
            <h3 style="color: #d946ef; font-size: 13px; text-transform: uppercase; margin: 0 0 15px 0;">
              Riepilogo Ordine
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${itemsHtml}
              <tr>
                <td colspan="2" style="padding: 15px 0 0 0; color: #ffffff; font-weight: bold;">
                  TOTALE
                </td>
                <td style="padding: 15px 0 0 0; text-align: right; color: #d946ef; font-weight: bold; font-size: 18px;">
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
              <a href="mailto:info@angelocoach.com" style="color: #d946ef; text-decoration: none;">
                Email: info@angelocoach.com
              </a>
            </p>
            <p style="margin: 8px 0; font-size: 14px;">
              <a href="https://instagram.com/angelo_fitnesscoach" style="color: #d946ef; text-decoration: none;">
                Instagram: @angelo_fitnesscoach
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
            <div style="display: inline-block; background-color: rgba(217, 70, 239, 0.15); color: #d946ef; padding: 6px 14px; border-radius: 20px; font-size: 12px; text-transform: uppercase; margin-bottom: 15px;">
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
              <a href="mailto:info@angelocoach.com" style="color: #d946ef; text-decoration: none;">
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

// Template conferma contatto (al cliente che ha compilato il form)
export function contactConfirmationEmail(data: {
  name: string;
  service?: string | null;
}) {
  const serviceLabels: Record<string, string> = {
    "personal-training": "Personal Training",
    "online-coaching": "Coaching Online",
    "nutrition": "Piano Alimentare",
    "consultation": "Consulenza Gratuita",
  };

  return `
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ho ricevuto il tuo messaggio - Coach Angelo</title>
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
            <div style="color: #d946ef; font-size: 48px; margin-bottom: 15px;">&#9993;</div>
            <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0;">
              Ciao, ${data.name}!
            </h2>
            <p style="color: #a3a3a3; font-size: 15px; margin: 0;">
              Ho ricevuto il tuo messaggio.
            </p>
          </div>

          <!-- Confirmation Message -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="color: #e5e5e5; line-height: 1.7; margin: 0; font-size: 15px;">
              Grazie per avermi contattato!<br><br>
              ${data.service ? `Hai richiesto informazioni su: <strong style="color: #d946ef;">${serviceLabels[data.service] || data.service}</strong><br><br>` : ""}
              Ti rispondero entro <strong style="color: #d946ef;">24 ore</strong>.
            </p>
          </div>

          <!-- What to Expect -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 12px 0;">
              Nel frattempo...
            </h3>
            <p style="color: #a3a3a3; line-height: 1.6; margin: 0; font-size: 14px;">
              Dai un'occhiata ai miei programmi e scopri le trasformazioni dei miei clienti. Il primo passo verso il tuo obiettivo inizia oggi!
            </p>
          </div>

          <!-- Contact Info -->
          <div style="background-color: #171717; border-radius: 12px; padding: 20px;">
            <h3 style="color: #ffffff; font-size: 15px; margin: 0 0 12px 0;">
              Nel frattempo seguimi
            </h3>
            <p style="margin: 8px 0; font-size: 14px;">
              <a href="https://instagram.com/angelo_fitnesscoach" style="color: #d946ef; text-decoration: none;">
                Instagram: @angelo_fitnesscoach
              </a>
            </p>
          </div>

          <!-- CTA -->
          <div style="text-align: center; margin-top: 25px;">
            <a href="https://angelocoach.com" style="${styles.button}">
              Scopri i Programmi
            </a>
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
