"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Contatti() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Translations
  const t = {
    heroTitle: language === 'de' ? 'Kontaktiere Mich' : 'Contattami',
    heroSubtitle: language === 'de'
      ? 'Bereit, deinen Weg zu starten? Schreib mir für eine kostenlose Beratung.'
      : 'Pronto a iniziare il tuo percorso? Scrivimi per una consulenza gratuita.',

    formTitle1: language === 'de' ? 'Lass uns über deine ' : 'Parliamo dei Tuoi ',
    formTitle2: language === 'de' ? 'Ziele' : 'Obiettivi',
    formDesc: language === 'de'
      ? 'Ob du abnehmen, Muskelmasse aufbauen oder dich einfach besser fühlen möchtest, ich bin hier, um dir zu helfen. Fülle das Formular aus oder kontaktiere mich direkt über meine Kanäle.'
      : 'Che tu voglia perdere peso, aumentare la massa muscolare o semplicemente sentirti meglio, sono qui per aiutarti. Compila il form o contattami direttamente sui miei canali.',

    phoneLabel: language === 'de' ? 'Telefon' : 'Telefono',
    phoneHours: language === 'de' ? 'Mo-Fr 9:00-18:00' : 'Lun-Ven 9:00-18:00',
    emailResponse: language === 'de' ? 'Antwort innerhalb von 24 Stunden' : 'Rispondo entro 24 ore',
    whatsappCta: language === 'de' ? 'Schreib mir auf WhatsApp' : 'Scrivimi su WhatsApp',
    whatsappNote: language === 'de' ? 'Der schnellste Weg, mich zu kontaktieren' : 'Il modo più veloce per contattarmi',
    instagramNote: language === 'de' ? 'Folge mir für Tipps und Motivation' : 'Seguimi per tips e motivazione',

    successTitle: language === 'de' ? 'Nachricht Gesendet!' : 'Messaggio Inviato!',
    successMessage: language === 'de'
      ? 'Danke für deine Nachricht. Ich antworte dir innerhalb von 24 Stunden.'
      : 'Grazie per avermi contattato. Ti risponderò entro 24 ore.',
    sendAnother: language === 'de' ? 'Weitere Nachricht senden' : 'Invia un altro messaggio',

    labelName: language === 'de' ? 'Vollständiger Name *' : 'Nome Completo *',
    labelEmail: language === 'de' ? 'E-Mail *' : 'Email *',
    labelPhone: language === 'de' ? 'Telefon' : 'Telefono',
    labelService: language === 'de' ? 'Gewünschte Leistung' : 'Servizio di Interesse',
    labelMessage: language === 'de' ? 'Nachricht *' : 'Messaggio *',

    placeholderName: language === 'de' ? 'Dein Name' : 'Il tuo nome',
    placeholderEmail: language === 'de' ? 'deine@email.de' : 'la.tua@email.com',
    placeholderPhone: '+49 176 93193043',
    placeholderMessage: language === 'de' ? 'Erzähl mir von deinen Zielen...' : 'Raccontami dei tuoi obiettivi...',

    selectService: language === 'de' ? 'Wähle eine Leistung' : 'Seleziona un servizio',
    servicePersonal: language === 'de' ? 'Personal Training' : 'Personal Training',
    serviceOnline: language === 'de' ? 'Online Coaching' : 'Coaching Online',
    serviceNutrition: language === 'de' ? 'Ernährungsplan' : 'Piano Alimentare',
    serviceConsultation: language === 'de' ? 'Kostenlose Beratung' : 'Consulenza Gratuita',

    submitButton: language === 'de' ? 'Nachricht Senden' : 'Invia Messaggio',
    submitting: language === 'de' ? 'Wird gesendet...' : 'Invio in corso...',
    requiredNote: language === 'de'
      ? '* Pflichtfelder. Deine Daten werden gemäß der Datenschutzrichtlinie behandelt.'
      : '* Campi obbligatori. I tuoi dati saranno trattati nel rispetto della privacy.',

    ctaTitle1: language === 'de' ? 'Wo bin ' : 'Dove Mi ',
    ctaTitle2: language === 'de' ? 'Ich' : 'Trovo',
    ctaText: language === 'de'
      ? 'Ich biete Präsenztraining in Deutschland und Online-Coaching weltweit an.'
      : 'Offro servizi in presenza in Germania e coaching online in tutto il mondo.',
    sendEmail: language === 'de' ? 'E-Mail Senden' : 'Invia Email',
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio");
      }

      setSubmitted(true);
    } catch {
      setError(
        language === "de"
          ? "Fehler beim Senden. Bitte versuche es erneut."
          : "Errore durante l'invio. Riprova più tardi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 bg-neutral-900 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>

        {/* Floating gradient orbs */}
        <div className="absolute top-16 left-16 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-24 right-10 w-96 h-96 bg-fuchsia-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.heroTitle}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 bg-neutral-800 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-violet-950/15 to-neutral-800"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                {t.formTitle1}<span className="text-fuchsia-400">{t.formTitle2}</span>
              </h2>
              <p className="text-lg text-white/70 mb-8">
                {t.formDesc}
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-fuchsia-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{t.phoneLabel}</h3>
                    <p className="text-white/70">+49 176 93193043</p>
                    <p className="text-sm text-white/50">{t.phoneHours}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-fuchsia-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-white/70">magliarisiangelo912@gmail.com</p>
                    <p className="text-sm text-white/50">{t.emailResponse}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-fuchsia-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-fuchsia-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">WhatsApp</h3>
                    <a
                      href="https://wa.me/4917693193043"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fuchsia-400 hover:text-fuchsia-300"
                    >
                      {t.whatsappCta}
                    </a>
                    <p className="text-sm text-white/50">{t.whatsappNote}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-fuchsia-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-fuchsia-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Instagram</h3>
                    <a
                      href="https://www.instagram.com/angelo_fitnesscoach"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fuchsia-400 hover:text-fuchsia-300"
                    >
                      @angelo_fitnesscoach
                    </a>
                    <p className="text-sm text-white/50">{t.instagramNote}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-neutral-900 rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t.successTitle}</h3>
                  <p className="text-white/70 mb-6">
                    {t.successMessage}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
                    }}
                    className="text-fuchsia-400 hover:text-fuchsia-300 font-semibold"
                  >
                    {t.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      {t.labelName}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-600 text-white placeholder-white/50 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                      placeholder={t.placeholderName}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      {t.labelEmail}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-600 text-white placeholder-white/50 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                      placeholder={t.placeholderEmail}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                      {t.labelPhone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-600 text-white placeholder-white/50 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                      placeholder={t.placeholderPhone}
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-white/80 mb-2">
                      {t.labelService}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-600 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">{t.selectService}</option>
                      <option value="personal-training">{t.servicePersonal}</option>
                      <option value="online-coaching">{t.serviceOnline}</option>
                      <option value="nutrition">{t.serviceNutrition}</option>
                      <option value="consultation">{t.serviceConsultation}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      {t.labelMessage}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-600 text-white placeholder-white/50 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder={t.placeholderMessage}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 disabled:opacity-50 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
                  >
                    {isSubmitting ? t.submitting : t.submitButton}
                  </button>

                  <p className="text-sm text-white/50 text-center">
                    {t.requiredNote}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <Image
          src="/hero bassa.png"
          alt="Coach Angelo"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.ctaTitle1}<span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.ctaTitle2}</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/4917693193043"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
