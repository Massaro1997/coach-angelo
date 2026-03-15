"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import PayPalProvider from "@/components/PayPalProvider";
import PayPalButton from "@/components/PayPalButton";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: language === 'de' ? "Deutschland" : "Germania",
    acceptTerms: false,
    acceptPrivacy: false,
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [formValid, setFormValid] = useState(false);

  // Translations
  const t = {
    checkoutTitle: language === 'de' ? 'Checkout' : 'Checkout',
    billingTitle: language === 'de' ? 'Rechnungsdaten' : 'Dati di Fatturazione',
    orderSummary: language === 'de' ? 'Bestellübersicht' : 'Riepilogo Ordine',

    labelFirstName: language === 'de' ? 'Vorname *' : 'Nome *',
    labelLastName: language === 'de' ? 'Nachname *' : 'Cognome *',
    labelEmail: language === 'de' ? 'E-Mail *' : 'Email *',
    labelPhone: language === 'de' ? 'Telefon' : 'Telefono',
    labelAddress: language === 'de' ? 'Adresse' : 'Indirizzo',
    labelCity: language === 'de' ? 'Stadt' : 'Città',
    labelPostalCode: language === 'de' ? 'PLZ' : 'CAP',

    acceptTerms1: language === 'de' ? 'Ich akzeptiere die ' : 'Accetto i ',
    acceptTermsLink: language === 'de' ? 'AGB' : 'Termini e Condizioni',
    acceptPrivacy1: language === 'de' ? 'Ich habe die ' : 'Ho letto e accetto la ',
    acceptPrivacyLink: language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy',
    acceptPrivacy2: language === 'de' ? ' gelesen und akzeptiert' : '',

    quantity: language === 'de' ? 'Menge' : 'Quantità',
    subtotal: language === 'de' ? 'Zwischensumme' : 'Subtotale',
    vatIncluded: language === 'de' ? 'MwSt. enthalten' : 'IVA inclusa',
    total: language === 'de' ? 'Gesamt' : 'Totale',

    payWithPaypal: language === 'de' ? 'Mit PayPal bezahlen' : 'Paga con PayPal',
    paypalNote: language === 'de'
      ? 'Sichere Zahlung über PayPal. Sie können mit Kreditkarte oder PayPal-Konto bezahlen.'
      : 'Pagamento sicuro tramite PayPal. Puoi pagare con carta di credito o conto PayPal.',
    fillRequired: language === 'de'
      ? 'Füllen Sie die Pflichtfelder (Vorname, Nachname, E-Mail) aus und akzeptieren Sie die Bedingungen, um fortzufahren'
      : 'Compila i campi obbligatori (Nome, Cognome, Email) e accetta i termini per procedere al pagamento',
    guarantee: language === 'de'
      ? '14-Tage-Geld-zurück-Garantie'
      : 'Garanzia soddisfatti o rimborsati entro 14 giorni',

    // Order Complete
    paymentComplete: language === 'de' ? 'Zahlung Abgeschlossen!' : 'Pagamento Completato!',
    thankYou: language === 'de'
      ? 'Vielen Dank für Ihren Kauf! Sie erhalten in Kürze eine Bestätigungs-E-Mail. Ich werde Sie innerhalb von 24 Stunden per WhatsApp oder E-Mail kontaktieren, um Ihre Reise zu beginnen.'
      : 'Grazie per il tuo acquisto! Riceverai una email di conferma a breve. Ti contatterò entro 24 ore via WhatsApp o email per iniziare il tuo percorso.',
    backToHome: language === 'de' ? 'Zurück zur Startseite' : 'Torna alla Home',
    contactWhatsApp: language === 'de' ? 'Kontakt via WhatsApp' : 'Contattami su WhatsApp',

    // Empty Cart
    emptyCart: language === 'de' ? 'Dein Warenkorb ist leer' : 'Il tuo carrello è vuoto',
    emptyCartDesc: language === 'de'
      ? 'Füge Leistungen zum Warenkorb hinzu, um mit dem Kauf fortzufahren.'
      : 'Aggiungi dei servizi al carrello per procedere con l\'acquisto.',
    discoverServices: language === 'de' ? 'Leistungen Entdecken' : 'Scopri i Servizi',

    // Errors
    paymentError: language === 'de'
      ? 'Bei der Zahlung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
      : 'Si è verificato un errore durante il pagamento. Riprova.',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    };
    setFormData(newFormData);

    // Check if form is valid for PayPal
    const isValid =
      newFormData.firstName.trim() !== "" &&
      newFormData.lastName.trim() !== "" &&
      newFormData.email.trim() !== "" &&
      newFormData.acceptTerms &&
      newFormData.acceptPrivacy;
    setFormValid(isValid);
  };

  const handlePaymentSuccess = async (details: Record<string, unknown>) => {
    console.log("Payment successful:", details);

    // Salva l'ordine nel database
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          address: formData.address || null,
          city: formData.city || null,
          postalCode: formData.postalCode || null,
          country: formData.country,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            variant: item.variant,
            price: item.price,
            quantity: item.quantity,
          })),
          totalPrice,
          paypalOrderId: (details as { id?: string }).id || null,
          paypalStatus: "COMPLETED",
        }),
      });
    } catch (error) {
      console.error("Error saving order:", error);
    }

    setOrderComplete(true);
    clearCart();
  };

  const handlePaymentError = (error: unknown) => {
    console.error("Payment error:", error);
    alert(t.paymentError);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-neutral-800 rounded-2xl p-12">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">{t.paymentComplete}</h1>
            <p className="text-white/70 mb-8">
              {t.thankYou}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-8 py-4 rounded-full font-semibold inline-block"
              >
                {t.backToHome}
              </Link>
              <a
                href="https://wa.me/4917693193043"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.contactWhatsApp}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-neutral-800 rounded-2xl p-12">
            <svg className="w-24 h-24 mx-auto text-white/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="text-3xl font-bold text-white mb-4">{t.emptyCart}</h1>
            <p className="text-white/70 mb-8">
              {t.emptyCartDesc}
            </p>
            <Link
              href="/servizi"
              className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-8 py-4 rounded-full font-semibold inline-block"
            >
              {t.discoverServices}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.checkoutTitle}</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-neutral-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">{t.billingTitle}</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t.labelFirstName}</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t.labelLastName}</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">{t.labelEmail}</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">{t.labelPhone}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">{t.labelAddress}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t.labelCity}</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t.labelPostalCode}</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-neutral-700 pt-6 space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-neutral-600 bg-neutral-700 text-fuchsia-500 focus:ring-fuchsia-500"
                  />
                  <span className="text-sm text-white/70">
                    {t.acceptTerms1}
                    <Link href="/termini" className="text-fuchsia-400 hover:text-fuchsia-300">
                      {t.acceptTermsLink}
                    </Link>{" "}
                    *
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptPrivacy"
                    checked={formData.acceptPrivacy}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-neutral-600 bg-neutral-700 text-fuchsia-500 focus:ring-fuchsia-500"
                  />
                  <span className="text-sm text-white/70">
                    {t.acceptPrivacy1}
                    <Link href="/privacy" className="text-fuchsia-400 hover:text-fuchsia-300">
                      {t.acceptPrivacyLink}
                    </Link>
                    {t.acceptPrivacy2}{" "}
                    *
                  </span>
                </label>
              </div>

            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-neutral-800 rounded-2xl p-8 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6">{t.orderSummary}</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-4 border-b border-neutral-700">
                    <div>
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      {item.variant && <p className="text-sm text-white/60">{item.variant}</p>}
                      <p className="text-sm text-white/60">{t.quantity}: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      {item.originalPrice && (
                        <p className="text-sm text-white/40 line-through">€{item.originalPrice * item.quantity}</p>
                      )}
                      <p className="font-bold text-white">€{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-700 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>{t.subtotal}</span>
                  <span>€{totalPrice}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>{t.vatIncluded}</span>
                  <span>€{(totalPrice * 0.19).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-neutral-700">
                  <span>{t.total}</span>
                  <span>€{totalPrice}</span>
                </div>
              </div>

              {/* PayPal Button */}
              {formValid ? (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">{t.payWithPaypal}</h3>
                  <PayPalProvider>
                    <PayPalButton
                      productId={items.map(i => i.id).join("-")}
                      productName={items.map(item => `${item.name} x${item.quantity}`).join(", ")}
                      price={totalPrice}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </PayPalProvider>
                  <p className="text-xs text-white/50 text-center mt-4">
                    {t.paypalNote}
                  </p>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-neutral-700/50 rounded-xl text-center">
                  <p className="text-white/70 text-sm">
                    {t.fillRequired}
                  </p>
                </div>
              )}

              <div className="p-4 bg-neutral-700/50 rounded-xl">
                <div className="flex items-center gap-3 text-white/70">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm">{t.guarantee}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
