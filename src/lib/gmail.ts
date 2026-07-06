// Invio notifiche interne via Gmail SMTP (ufficio.massaro@gmail.com),
// stesso sistema usato da Orchestra. Le email al cliente restano su Resend
// (dominio brand info@angelocoach.com).
import nodemailer from "nodemailer";

export const gmailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.GMAIL_SMTP_USER,
    pass: process.env.GMAIL_SMTP_PASSWORD,
  },
});

export const GMAIL_FROM = `Coach Angelo Leads <${process.env.GMAIL_SMTP_USER || "ufficio.massaro@gmail.com"}>`;
