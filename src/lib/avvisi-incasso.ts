// Mail ad Angelo quando entra un pagamento o un addebito mensile non passa.
// Un avviso che non parte non ferma niente: l'incasso e' gia' scritto.

import { gmailTransport, GMAIL_FROM } from "@/lib/gmail";
import { NOTIFY_EMAILS } from "@/lib/resend";
import { eur } from "@/lib/preventivo";

export async function avvisaIncasso(pag: {
  importo: number;
  clienteNome: string;
  descrizione: string;
  documento: string | null;
}) {
  try {
    await gmailTransport.sendMail({
      from: GMAIL_FROM,
      to: NOTIFY_EMAILS,
      subject: `💰 Incassati ${eur(pag.importo)} — ${pag.documento || pag.descrizione}`,
      html: `
        <div style="font-family:system-ui,sans-serif">
          <p>Pagamento ricevuto da <strong>${pag.clienteNome}</strong>.</p>
          <p>${pag.descrizione}</p>
          <p>Importo: <strong>${eur(pag.importo)}</strong></p>
        </div>`,
    });
  } catch {
    // l'incasso e' registrato comunque
  }
}

export async function avvisaAddebitoFallito(cliente: string, importo: number | null) {
  try {
    await gmailTransport.sendMail({
      from: GMAIL_FROM,
      to: NOTIFY_EMAILS,
      subject: `⚠️ Addebito non riuscito — ${cliente}`,
      html: `
        <div style="font-family:system-ui,sans-serif">
          <p>L'addebito mensile${importo ? ` di <strong>${eur(importo)}</strong>` : ""} di <strong>${cliente}</strong> non è passato.</p>
          <p style="color:#666;font-size:13px">Il sistema di pagamento riprova da solo nei prossimi giorni. Conviene sentire il cliente.</p>
        </div>`,
    });
  } catch {
    // l'avviso non e' indispensabile
  }
}
