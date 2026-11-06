// Telefono e WhatsApp di Angelo, in un posto solo (06/11/2026). Il numero e'
// quello dell'Impressum (src/app/impressum/page.tsx): se cambia la', cambia qui.
//
// Clic su chiamata e WhatsApp non sono misurati: il sito conta solo le
// richieste del wizard (vedi src/app/api/rankx/lead/route.ts, "nonMisurati").

export const TELEFONO = "+49 176 93193043";
export const TELEFONO_HREF = "tel:+4917693193043";

const WHATSAPP_NUMERO = "4917693193043";
const WHATSAPP_TESTO = "Hallo Angelo, ich interessiere mich für ein kostenloses Erstgespräch.";

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_TESTO)}`;
