"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const products: Record<string, { nameIt: string; nameDe: string }> = {
  "scheda-beginner": { nameIt: "Scheda Beginner", nameDe: "Trainingsplan Anfänger" },
  "scheda-intermediate": { nameIt: "Scheda Intermediate", nameDe: "Trainingsplan Fortgeschritten" },
  "scheda-advanced": { nameIt: "Scheda Advanced", nameDe: "Trainingsplan Profi" },
  "scheda-personalizzata": { nameIt: "Scheda Personalizzata", nameDe: "Personalisierter Trainingsplan" },
  "percorso-3-mesi": { nameIt: "Percorso 3 Mesi", nameDe: "3-Monats-Coaching" },
  "percorso-6-mesi": { nameIt: "Percorso 6 Mesi", nameDe: "6-Monats-Coaching" },
  "percorso-1-anno": { nameIt: "Percorso 1 Anno", nameDe: "1-Jahres-Coaching" },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const productId = searchParams.get("product");
  const product = productId ? products[productId] : null;
  const productName = product ? (language === 'de' ? product.nameDe : product.nameIt) : null;

  const t = {
    paymentTitle1: language === 'de' ? 'Zahlung ' : 'Pagamento ',
    paymentTitle2: language === 'de' ? 'Abgeschlossen!' : 'Completato!',
    thankYou: language === 'de'
      ? `Vielen Dank für Ihren Kauf${productName ? ` von "${productName}"` : ''}!`
      : `Grazie per il tuo acquisto${productName ? ` di "${productName}"` : ''}!`,
    nextSteps: language === 'de' ? 'Nächste Schritte:' : 'Prossimi passi:',
    step1: language === 'de'
      ? 'Sie erhalten eine Bestätigungs-E-Mail an die angegebene Adresse'
      : 'Riceverai una email di conferma all\'indirizzo fornito',
    step2: language === 'de'
      ? 'Ich werde Sie innerhalb von 24 Stunden kontaktieren'
      : 'Ti contatterò entro 24 ore per iniziare',
    step3: language === 'de'
      ? 'Bereiten Sie sich darauf vor, Ihren Körper zu transformieren!'
      : 'Preparati a trasformare il tuo corpo!',
    backToHome: language === 'de' ? 'Zurück zur Startseite' : 'Torna alla Home',
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-8 border-2 border-gold rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-ink uppercase mb-4">
          {t.paymentTitle1}<span className="text-gold">{t.paymentTitle2}</span>
        </h1>

        <p className="text-xl text-ink/70 mb-8">
          {t.thankYou}
        </p>

        <div className="bg-surface border border-line rounded-lg p-8 mb-8 text-left">
          <h2 className="text-xl font-black text-ink uppercase mb-4">{t.nextSteps}</h2>
          <ul className="space-y-4 text-ink/70">
            {[t.step1, t.step2, t.step3].map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">{idx + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block bg-gold text-white px-8 py-4 rounded-md font-bold uppercase tracking-wider hover:bg-gold-soft transition-colors"
        >
          {t.backToHome}
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
