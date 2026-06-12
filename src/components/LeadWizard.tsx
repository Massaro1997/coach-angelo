"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type WizardAnswers = {
  goal: string;
  level: string;
  frequency: string;
  service: string;
  budget: string;
};

export default function LeadWizard({ bare = false }: { bare?: boolean }) {
  const { language } = useLanguage();
  const de = language === "de";

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>({
    goal: "",
    level: "",
    frequency: "",
    service: "",
    budget: "",
  });
  const [contact, setContact] = useState({ name: "", email: "", phone: "", note: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = {
    stepLabel: de ? "Frage" : "Domanda",
    of: de ? "von" : "di",
    back: de ? "Zurück" : "Indietro",
    lastStep: de ? "Letzter Schritt" : "Ultimo step",

    q1: de ? "Was ist dein Ziel?" : "Qual è il tuo obiettivo?",
    q1opts: de
      ? [
          { value: "abnehmen", icon: "🔥", label: "Abnehmen", desc: "Fett verlieren, Form zurück" },
          { value: "muskelaufbau", icon: "💪", label: "Muskelaufbau", desc: "Masse und Kraft aufbauen" },
          { value: "rekomposition", icon: "⚖️", label: "Body Recomposition", desc: "Fett runter, Muskeln rauf" },
          { value: "wettkampf", icon: "🏆", label: "Wettkampf", desc: "Bühne, WABBA, Athletik" },
        ]
      : [
          { value: "dimagrire", icon: "🔥", label: "Dimagrire", desc: "Perdere grasso, tornare in forma" },
          { value: "massa", icon: "💪", label: "Massa muscolare", desc: "Costruire muscoli e forza" },
          { value: "ricomposizione", icon: "⚖️", label: "Ricomposizione", desc: "Giù il grasso, su i muscoli" },
          { value: "gara", icon: "🏆", label: "Preparazione gara", desc: "Palco, WABBA, performance" },
        ],

    q2: de ? "Wie viel Erfahrung hast du?" : "Quanta esperienza hai?",
    q2opts: de
      ? [
          { value: "anfaenger", icon: "🌱", label: "Anfänger", desc: "Ich starte bei null oder fast" },
          { value: "fortgeschritten", icon: "📈", label: "Fortgeschritten", desc: "1-3 Jahre Training" },
          { value: "profi", icon: "🎯", label: "Sehr erfahren", desc: "Training ist mein Lifestyle" },
        ]
      : [
          { value: "principiante", icon: "🌱", label: "Principiante", desc: "Parto da zero o quasi" },
          { value: "intermedio", icon: "📈", label: "Intermedio", desc: "1-3 anni di allenamento" },
          { value: "avanzato", icon: "🎯", label: "Avanzato", desc: "Allenarsi è il mio lifestyle" },
        ],

    q3: de ? "Wie oft pro Woche kannst du trainieren?" : "Quante volte a settimana puoi allenarti?",
    q3opts: de
      ? [
          { value: "1-2", icon: "🕐", label: "1-2 Mal", desc: "Wenig Zeit, maximale Effizienz" },
          { value: "3-4", icon: "🕒", label: "3-4 Mal", desc: "Konstantes Engagement" },
          { value: "5+", icon: "🕔", label: "5+ Mal", desc: "Volle Hingabe" },
        ]
      : [
          { value: "1-2", icon: "🕐", label: "1-2 volte", desc: "Poco tempo, massima efficienza" },
          { value: "3-4", icon: "🕒", label: "3-4 volte", desc: "Impegno costante" },
          { value: "5+", icon: "🕔", label: "5+ volte", desc: "Dedizione totale" },
        ],

    q4: de ? "Welche Betreuung passt zu dir?" : "Che percorso ti interessa?",
    q4opts: de
      ? [
          { value: "personal-training", icon: "🏋️", label: "Personal Training in Köln", desc: "1-zu-1 im Studio" },
          { value: "online-coaching", icon: "📱", label: "Online Coaching", desc: "Plan + Ernährung + Check-ins" },
          { value: "trainingsplan", icon: "📋", label: "Individueller Trainingsplan", desc: "Maßgeschneidertes Programm" },
          { value: "beratung", icon: "💬", label: "Ich weiß es noch nicht", desc: "Angelo soll mich beraten" },
        ]
      : [
          { value: "personal-training", icon: "🏋️", label: "Personal Training a Colonia", desc: "1-to-1 in palestra" },
          { value: "online-coaching", icon: "📱", label: "Coaching Online", desc: "Scheda + alimentazione + check" },
          { value: "trainingsplan", icon: "📋", label: "Scheda personalizzata", desc: "Programma su misura" },
          { value: "beratung", icon: "💬", label: "Non lo so ancora", desc: "Fatti consigliare da Angelo" },
        ],

    q5: de
      ? "Ein betreutes Programm beginnt bei ca. 150€/Monat. Bereit zu investieren?"
      : "Un percorso seguito parte da circa 150€/mese. Pronto a investire su di te?",
    q5opts: de
      ? [
          { value: "ja", icon: "✅", label: "Ja, ich bin bereit", desc: "Ich will ernsthafte Ergebnisse" },
          { value: "beratung-zuerst", icon: "🤝", label: "Erst die kostenlose Beratung", desc: "Ich möchte zuerst sprechen" },
        ]
      : [
          { value: "si", icon: "✅", label: "Sì, sono pronto", desc: "Voglio risultati seri" },
          { value: "prima-consulenza", icon: "🤝", label: "Prima la consulenza gratuita", desc: "Preferisco prima parlarne" },
        ],

    contactTitle: de ? "Fast geschafft. Wohin darf ich dir antworten?" : "Ci siamo quasi. Dove posso risponderti?",
    labelName: de ? "Vollständiger Name *" : "Nome completo *",
    labelEmail: "Email *",
    labelPhone: de ? "Telefon *" : "Telefono *",
    labelNote: de ? "Willst du mir noch etwas sagen? (optional)" : "Vuoi dirmi altro? (opzionale)",
    placeholderName: de ? "Dein Name" : "Il tuo nome",
    placeholderEmail: de ? "deine@email.de" : "la.tua@email.com",
    placeholderPhone: "+49 ...",
    placeholderNote: de ? "Verletzungen, Zeitplan, Fragen..." : "Infortuni, orari, domande...",
    phoneHint: de
      ? "Für die kostenlose Erstberatung ruft Angelo dich an oder schreibt dir."
      : "Per la consulenza gratuita Angelo ti chiama o ti scrive.",

    submitButton: de ? "Kostenlose Beratung anfragen" : "Richiedi la consulenza gratuita",
    submitting: de ? "Wird gesendet..." : "Invio in corso...",
    privacyNote: de
      ? "* Pflichtfelder. Deine Daten werden gemäß der Datenschutzrichtlinie behandelt."
      : "* Campi obbligatori. I tuoi dati saranno trattati nel rispetto della privacy.",
    errorMsg: de ? "Fehler beim Senden. Bitte versuche es erneut." : "Errore durante l'invio. Riprova più tardi.",

    successTitle: de ? "Anfrage erhalten!" : "Richiesta ricevuta!",
    successMessage: de
      ? "Danke! Angelo meldet sich innerhalb von 24 Stunden bei dir für deine kostenlose Beratung."
      : "Grazie! Angelo ti contatterà entro 24 ore per la tua consulenza gratuita.",
  };

  const questions = [
    { key: "goal" as const, title: t.q1, options: t.q1opts },
    { key: "level" as const, title: t.q2, options: t.q2opts },
    { key: "frequency" as const, title: t.q3, options: t.q3opts },
    { key: "service" as const, title: t.q4, options: t.q4opts },
    { key: "budget" as const, title: t.q5, options: t.q5opts },
  ];

  const totalSteps = questions.length + 1;

  const selectOption = (key: keyof WizardAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => Math.min(s + 1, totalSteps - 1)), 180);
  };

  const labelFor = (key: keyof WizardAnswers) => {
    const q = questions.find((q) => q.key === key);
    return q?.options.find((o) => o.value === answers[key])?.label || answers[key];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const message = [
      `[LEAD QUALIFICATO — Wizard ${de ? "DE" : "IT"}]`,
      `Obiettivo: ${labelFor("goal")}`,
      `Livello: ${labelFor("level")}`,
      `Frequenza: ${labelFor("frequency")}/settimana`,
      `Percorso: ${labelFor("service")}`,
      `Investimento 150€+/mese: ${labelFor("budget")}`,
      contact.note ? `---\nNote: ${contact.note}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          service: answers.service,
          message,
        }),
      });

      if (!response.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setError(t.errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = step < questions.length ? questions[step] : null;

  return (
    <div className={bare ? "" : "bg-surface border border-line rounded-lg p-6 sm:p-10"}>
      {submitted ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-ink uppercase mb-4">{t.successTitle}</h3>
          <p className="text-ink/60 max-w-md mx-auto">{t.successMessage}</p>
        </div>
      ) : (
        <>
          {/* Step indicator: pallini numerati */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i < step ? "w-2 bg-gold" : i === step ? "w-8 bg-gold" : "w-2 bg-elevated"
                    }`}
                  />
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="text-xs uppercase tracking-wider text-ink/50 hover:text-ink transition-colors font-semibold"
                >
                  ← {t.back}
                </button>
              )}
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              {step < questions.length
                ? `${t.stepLabel} ${step + 1} ${t.of} ${questions.length}`
                : t.lastStep}
            </span>
          </div>

          {currentQuestion ? (
            <div key={currentQuestion.key} className="fade-in">
              <h3 className="text-2xl sm:text-3xl font-black text-ink mb-8 leading-snug">
                {currentQuestion.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options.map((opt) => {
                  const selected = answers[currentQuestion.key] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectOption(currentQuestion.key, opt.value)}
                      className={`group relative flex flex-col items-start text-left p-7 sm:p-8 rounded-2xl border-2 min-h-[180px] sm:min-h-[200px] transition-all ${
                        selected
                          ? "border-gold bg-elevated shadow-lg"
                          : "border-line bg-background hover:border-gold-deep hover:bg-elevated/60 hover:-translate-y-1 hover:shadow-md"
                      }`}
                    >
                      <span className={`flex items-center justify-center w-16 h-16 rounded-xl text-3xl mb-4 transition-colors ${selected ? 'bg-gold' : 'bg-elevated group-hover:bg-elevated'}`}>
                        {opt.icon}
                      </span>
                      <span className="block font-black text-ink text-xl sm:text-2xl leading-tight mb-1.5">{opt.label}</span>
                      <span className="block text-base text-ink/50">{opt.desc}</span>
                      {selected && (
                        <span className="absolute top-5 right-5 text-gold">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="fade-in space-y-5">
              <h3 className="text-xl sm:text-2xl font-black text-ink mb-2 leading-snug">
                {t.contactTitle}
              </h3>
              {error && (
                <div className="border border-red-500/50 bg-red-500/10 text-red-400 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="lw-name" className="block text-sm font-medium text-ink/80 mb-2">
                    {t.labelName}
                  </label>
                  <input
                    type="text"
                    id="lw-name"
                    required
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-md bg-elevated border border-line text-ink placeholder-ink/30 focus:border-gold outline-none transition-colors"
                    placeholder={t.placeholderName}
                  />
                </div>
                <div>
                  <label htmlFor="lw-email" className="block text-sm font-medium text-ink/80 mb-2">
                    {t.labelEmail}
                  </label>
                  <input
                    type="email"
                    id="lw-email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-md bg-elevated border border-line text-ink placeholder-ink/30 focus:border-gold outline-none transition-colors"
                    placeholder={t.placeholderEmail}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lw-phone" className="block text-sm font-medium text-ink/80 mb-2">
                  {t.labelPhone}
                </label>
                <input
                  type="tel"
                  id="lw-phone"
                  required
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-md bg-elevated border border-line text-ink placeholder-ink/30 focus:border-gold outline-none transition-colors"
                  placeholder={t.placeholderPhone}
                />
                <p className="text-xs text-ink/40 mt-1.5">{t.phoneHint}</p>
              </div>
              <div>
                <label htmlFor="lw-note" className="block text-sm font-medium text-ink/80 mb-2">
                  {t.labelNote}
                </label>
                <textarea
                  id="lw-note"
                  rows={3}
                  value={contact.note}
                  onChange={(e) => setContact({ ...contact, note: e.target.value })}
                  className="w-full px-4 py-3 rounded-md bg-elevated border border-line text-ink placeholder-ink/30 focus:border-gold outline-none transition-colors resize-none"
                  placeholder={t.placeholderNote}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-white px-8 py-4 rounded-md font-bold uppercase tracking-wider text-base disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? t.submitting : t.submitButton}
              </button>
              <p className="text-xs text-ink/40 text-center">{t.privacyNote}</p>
            </form>
          )}
        </>
      )}
    </div>
  );
}
