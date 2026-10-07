"use client";

import { useState } from "react";
import {
  CircleCheck,
  ClipboardList,
  Clock12,
  Clock3,
  Clock9,
  Dumbbell,
  Flame,
  Handshake,
  MessageCircle,
  Scale,
  Smartphone,
  Sprout,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import IconBadge from "@/components/IconBadge";
import { useLanguage } from "@/context/LanguageContext";
import { getAttribution } from "@/lib/attribution";

type WizardAnswers = {
  goal: string;
  level: string;
  frequency: string;
  service: string;
  budget: string;
};

/**
 * largo: la veste del tema FITPRIMO (03/10/2026). Le risposte non sono pillole
 * dentro una scheda ma tessere grandi a tutta larghezza, con l'icona grande
 * sopra il testo.
 * compatto: per la landing del QR (/start, 06/10/2026), aperta dal telefono.
 * Sotto i 640 px le risposte diventano righe basse con l'icona a sinistra,
 * cosi' le prime stanno nel primo schermo; da sm in su resta uguale a largo.
 */
export default function LeadWizard({
  bare = false,
  largo = false,
  compatto = false,
}: {
  bare?: boolean;
  largo?: boolean;
  compatto?: boolean;
}) {
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
          { value: "abnehmen", icon: Flame, label: "Abnehmen", desc: "Fett verlieren, Form zurück" },
          { value: "muskelaufbau", icon: Dumbbell, label: "Muskelaufbau", desc: "Masse und Kraft aufbauen" },
          { value: "rekomposition", icon: Scale, label: "Body Recomposition", desc: "Fett runter, Muskeln rauf" },
          { value: "wettkampf", icon: Trophy, label: "Wettkampf", desc: "Bühne, WABBA, Athletik" },
        ]
      : [
          { value: "dimagrire", icon: Flame, label: "Dimagrire", desc: "Perdere grasso, tornare in forma" },
          { value: "massa", icon: Dumbbell, label: "Massa muscolare", desc: "Costruire muscoli e forza" },
          { value: "ricomposizione", icon: Scale, label: "Ricomposizione", desc: "Giù il grasso, su i muscoli" },
          { value: "gara", icon: Trophy, label: "Preparazione gara", desc: "Palco, WABBA, performance" },
        ],

    q2: de ? "Wie viel Erfahrung hast du?" : "Quanta esperienza hai?",
    q2opts: de
      ? [
          { value: "anfaenger", icon: Sprout, label: "Anfänger", desc: "Ich starte bei null oder fast" },
          { value: "fortgeschritten", icon: TrendingUp, label: "Fortgeschritten", desc: "1-3 Jahre Training" },
          { value: "profi", icon: Target, label: "Sehr erfahren", desc: "Training ist mein Lifestyle" },
        ]
      : [
          { value: "principiante", icon: Sprout, label: "Principiante", desc: "Parto da zero o quasi" },
          { value: "intermedio", icon: TrendingUp, label: "Intermedio", desc: "1-3 anni di allenamento" },
          { value: "avanzato", icon: Target, label: "Avanzato", desc: "Allenarsi è il mio lifestyle" },
        ],

    q3: de ? "Wie oft pro Woche kannst du trainieren?" : "Quante volte a settimana puoi allenarti?",
    q3opts: de
      ? [
          { value: "1-2", icon: Clock3, label: "1-2 Mal", desc: "Wenig Zeit, maximale Effizienz" },
          { value: "3-4", icon: Clock9, label: "3-4 Mal", desc: "Konstantes Engagement" },
          { value: "5+", icon: Clock12, label: "5+ Mal", desc: "Volle Hingabe" },
        ]
      : [
          { value: "1-2", icon: Clock3, label: "1-2 volte", desc: "Poco tempo, massima efficienza" },
          { value: "3-4", icon: Clock9, label: "3-4 volte", desc: "Impegno costante" },
          { value: "5+", icon: Clock12, label: "5+ volte", desc: "Dedizione totale" },
        ],

    q4: de ? "Welche Betreuung passt zu dir?" : "Che percorso ti interessa?",
    q4opts: de
      ? [
          { value: "personal-training", icon: Dumbbell, label: "Personal Training in Köln", desc: "1-zu-1 im Studio" },
          { value: "online-coaching", icon: Smartphone, label: "Online Coaching", desc: "Plan + Ernährung + Check-ins" },
          { value: "trainingsplan", icon: ClipboardList, label: "Individueller Trainingsplan", desc: "Maßgeschneidertes Programm" },
          { value: "beratung", icon: MessageCircle, label: "Ich weiß es noch nicht", desc: "Angelo soll mich beraten" },
        ]
      : [
          { value: "personal-training", icon: Dumbbell, label: "Personal Training a Colonia", desc: "1-to-1 in palestra" },
          { value: "online-coaching", icon: Smartphone, label: "Coaching Online", desc: "Scheda + alimentazione + check" },
          { value: "trainingsplan", icon: ClipboardList, label: "Scheda personalizzata", desc: "Programma su misura" },
          { value: "beratung", icon: MessageCircle, label: "Non lo so ancora", desc: "Fatti consigliare da Angelo" },
        ],

    q5: de
      ? "Ein betreutes Programm beginnt bei ca. 150€/Monat. Bereit zu investieren?"
      : "Un percorso seguito parte da circa 150€/mese. Pronto a investire su di te?",
    q5opts: de
      ? [
          { value: "ja", icon: CircleCheck, label: "Ja, ich bin bereit", desc: "Ich will ernsthafte Ergebnisse" },
          { value: "beratung-zuerst", icon: Handshake, label: "Erst die kostenlose Beratung", desc: "Ich möchte zuerst sprechen" },
        ]
      : [
          { value: "si", icon: CircleCheck, label: "Sì, sono pronto", desc: "Voglio risultati seri" },
          { value: "prima-consulenza", icon: Handshake, label: "Prima la consulenza gratuita", desc: "Preferisco prima parlarne" },
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
          ...getAttribution(),
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
          {currentQuestion ? (
            <div key={currentQuestion.key} className="fade-in">
              <h3
                className={
                  largo
                    ? `fp-titolo text-center text-ink sm:mb-10 sm:text-4xl lg:text-5xl ${compatto ? "mb-5 text-[26px]" : "mb-8 text-3xl"}`
                    : "mb-5 text-2xl font-black leading-snug text-ink sm:mb-6 sm:text-3xl"
                }
              >
                {currentQuestion.title}
              </h3>
              {/*
                Le risposte sono pillole in fila, non riquadri (22.09.2026).
                A card occupavano due colonne alte 200 px e sembravano un
                blocco appoggiato sotto l'hero; in fila stanno su una o due
                righe, si leggono in un colpo e la scelta resta un gesto solo.
              */}
              <div
                className={
                  largo
                    ? `grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ${compatto ? "grid-cols-1 gap-2.5" : "grid-cols-2 gap-3"}`
                    : "grid grid-flow-row auto-rows-auto grid-cols-1 gap-2.5 sm:flex sm:flex-wrap sm:gap-3"
                }
              >
                {currentQuestion.options.map((opt) => {
                  const selected = answers[currentQuestion.key] === opt.value;
                  if (largo) {
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => selectOption(currentQuestion.key, opt.value)}
                        className={`group flex items-center rounded-2xl border-2 bg-white transition-all duration-200 sm:flex-col sm:gap-5 sm:px-5 sm:py-9 sm:text-center ${
                          compatto ? "flex-row gap-4 px-4 py-3 text-left" : "flex-col gap-4 px-3 py-6 text-center"
                        } ${
                          selected
                            ? "border-gold shadow-[0_24px_50px_-26px_rgba(227,6,19,0.55)]"
                            : "border-line hover:-translate-y-1 hover:border-gold hover:shadow-[0_24px_50px_-28px_rgba(18,18,20,0.35)]"
                        }`}
                      >
                        <IconBadge
                          come={opt.icon}
                          misura="lg"
                          attivo={selected}
                          className={`sm:!h-24 sm:!w-24 sm:[&>svg]:!h-12 sm:[&>svg]:!w-12 ${
                            compatto ? "!h-12 !w-12 shrink-0 [&>svg]:!h-6 [&>svg]:!w-6" : "!h-[72px] !w-[72px] [&>svg]:!h-9 [&>svg]:!w-9"
                          }`}
                        />
                        <span className={`font-black leading-tight text-ink sm:text-xl ${compatto ? "text-[17px]" : "text-[15px]"}`}>{opt.label}</span>
                        {opt.desc && (
                          <span className="hidden text-sm leading-snug text-ink/55 sm:block">{opt.desc}</span>
                        )}
                      </button>
                    );
                  }
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectOption(currentQuestion.key, opt.value)}
                      title={opt.desc}
                      className={`group inline-flex items-center gap-3 rounded-full border-2 px-4 py-3 text-left transition-all sm:px-5 ${
                        selected
                          ? "border-gold bg-elevated"
                          : "border-line bg-background hover:border-gold-deep hover:bg-elevated/60"
                      }`}
                    >
                      <IconBadge come={opt.icon} misura="sm" attivo={selected} />
                      <span className="font-black leading-tight text-ink text-[16px] sm:text-[17px]">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`fade-in space-y-5 ${largo ? "mx-auto max-w-2xl" : ""}`}>
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

          {/*
            Contatore e pallini stanno SOTTO le risposte (Calogero, 22.09.2026):
            sopra rubavano la prima riga alla domanda, che e' la cosa da leggere
            per prima. Qui dicono a che punto sei dopo che hai gia' scelto.
          */}
          <div
            className={`flex items-center justify-between gap-4 ${
              largo ? "mx-auto mt-9 max-w-2xl" : "mt-7 border-t border-line pt-5"
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i < step ? "w-2 bg-gold" : i === step ? "w-8 bg-gold" : "w-2 bg-elevated"
                  }`}
                />
              ))}
              <span className="ml-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
                {step < questions.length
                  ? `${t.stepLabel} ${step + 1} ${t.of} ${questions.length}`
                  : t.lastStep}
              </span>
            </div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="text-xs font-semibold uppercase tracking-wider text-ink/50 transition-colors hover:text-ink"
              >
                ← {t.back}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
