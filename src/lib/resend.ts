import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Email del proprietario per ricevere notifiche
export const OWNER_EMAIL = "angelocoach74@gmail.com";

// Email mittente (dominio verificato su Resend)
export const FROM_EMAIL = "Coach Angelo <info@angelocoach.com>";
