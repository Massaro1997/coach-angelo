"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Servizi() {
  const { language } = useLanguage();
  const { addItem } = useCart();

  // Translations
  const t = {
    title: language === 'de' ? 'Meine ' : 'I Miei ',
    titleHighlight: language === 'de' ? 'Leistungen' : 'Servizi',
    subtitle: language === 'de'
      ? 'Wähle den Weg, der am besten zu deinen Zielen passt. Von fertigen Plänen bis hin zu personalisiertem 1-zu-1 Coaching.'
      : 'Scegli il percorso più adatto ai tuoi obiettivi. Dalle schede pronte al coaching personalizzato 1-to-1.',

    readyPlans: language === 'de' ? 'Fertige Trainingspläne' : 'Schede Pronte',
    readyPlansHighlight: language === 'de' ? 'Sofortiger Download' : 'Download Immediato',
    readyPlansDesc: language === 'de'
      ? 'Perfekt für alle, die sofort starten wollen. Wähle dein Level und erhalte deinen Plan direkt als PDF.'
      : 'Perfetto per chi vuole iniziare subito. Scegli il tuo livello e ricevi la scheda direttamente in PDF.',
    discountBadge: language === 'de' ? 'Bis zu -50% Rabatt' : 'Sconti fino al -50%',

    beginner: language === 'de' ? 'Anfänger' : 'Principiante',
    intermediate: language === 'de' ? 'Fortgeschritten' : 'Intermedio',
    advanced: language === 'de' ? 'Profi' : 'Avanzato',

    exp06: language === 'de' ? '0-6 Monate Erfahrung' : '0-6 mesi di esperienza',
    exp618: language === 'de' ? '6-18 Monate Erfahrung' : '6-18 mesi di esperienza',
    exp18: language === 'de' ? '> 18 Monate Erfahrung' : '> 18 mesi di esperienza',
    expLabel: language === 'de' ? 'Erfahrung' : '',

    instantDownload: language === 'de' ? 'Sofortiger PDF Download' : 'Download immediato PDF',
    demoVideos: language === 'de' ? 'Video-Demonstrationen' : 'Video dimostrativi esercizi',
    buyNow: language === 'de' ? 'Jetzt Kaufen' : 'Acquista Ora',
    contactNote: language === 'de' ? 'Fragen? Schreib mir über das Kontaktformular' : 'Dubbi? Scrivimi dal form contatti',

    ptTitle: 'Personal Training',
    ptTitleHighlight: language === 'de' ? '1-zu-1' : '1-to-1',
    ptBadge: language === 'de' ? 'Nur in Köln' : 'Solo a Colonia',
    ptDesc: language === 'de'
      ? 'Erreiche deine Ziele schneller mit persönlicher Betreuung. Technik-Korrektur, Motivation und maßgeschneiderte Anpassungen direkt im Training.'
      : 'Raggiungi i tuoi obiettivi più velocemente con il supporto personale. Correzione tecnica, motivazione e adattamenti su misura direttamente durante l\'allenamento.',
    ptHour: language === 'de' ? '/Stunde' : '/ora',
    ptF1: language === 'de' ? 'Technik-Perfektionierung' : 'Perfezionamento tecnico',
    ptF2: language === 'de' ? 'Maximale Motivation' : 'Massima motivazione',
    ptF3: language === 'de' ? 'Individuelle Anpassung' : 'Adattamento individuale',
    ptF4: language === 'de' ? 'Ernährungs-Tipps' : 'Consigli nutrizionali',

    pathTitle: language === 'de' ? 'Personalisierte ' : 'Percorsi ',
    pathTitleHighlight: language === 'de' ? 'Wege' : 'Personalizzati',
    pathDesc: language === 'de'
      ? 'Der komplette Weg zu deinem Traumkörper. Training, Ernährung und Mindset in einem Paket.'
      : 'La strada completa verso il tuo fisico ideale. Allenamento, nutrizione e mindset in un unico pacchetto.',

    pathF1: language === 'de' ? 'Maßgeschneiderter Trainingsplan' : 'Scheda di allenamento su misura',
    pathF2: language === 'de' ? 'Personalisierter Ernährungsplan' : 'Piano alimentare personalizzato',
    pathF3: language === 'de' ? 'Wöchentliche Check-ins' : 'Check settimanali',
    whatsappSupport: language === 'de' ? '24/7 WhatsApp Support' : 'Supporto WhatsApp 24/7',

    pathDuration1: language === 'de' ? 'Kurzzeit-Ziel' : 'Obiettivo a breve termine',
    pathDuration2: language === 'de' ? 'Mittelfristiges Ziel' : 'Obiettivo a medio termine',
    pathDuration3: language === 'de' ? 'Langfristige Transformation' : 'Trasformazione a lungo termine',

    buyPath: language === 'de' ? 'Weg Starten' : 'Inizia il Percorso',
    installments: language === 'de' ? 'Ratenzahlung möglich' : 'Possibilità di pagare a rate',

    guarantee: language === 'de' ? '30 Tage Geld-zurück-Garantie bei Unzufriedenheit' : 'Soddisfatti o rimborsati entro 30 giorni',
  };

  const service3Cta = language === 'de' ? 'Termin Buchen' : 'Prenota Un Appuntamento';

  const checkIcon = (
    <svg className="w-4 h-4 text-gold mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  );

  const schedePronte = [
    { id: "scheda-beginner", name: language === 'de' ? 'Anfänger Plan' : 'Scheda Beginner', level: t.beginner, experience: t.exp06, img: '/images/services/scheda-beginner.png', price: 25, originalPrice: 50 },
    { id: "scheda-intermediate", name: language === 'de' ? 'Fortgeschrittenen Plan' : 'Scheda Intermediate', level: t.intermediate, experience: t.exp618, img: '/images/services/scheda-intermediate.png', price: 25, originalPrice: 50 },
    { id: "scheda-advanced", name: language === 'de' ? 'Profi Plan' : 'Scheda Advanced', level: t.advanced, experience: t.exp18, img: '/images/services/scheda-advanced.png', price: 25, originalPrice: 50 },
  ];

  const paths = [
    {
      id: "path-3-months",
      months: 3,
      duration: t.pathDuration1,
      price: 450,
      priceNote: language === 'de' ? '150€/Monat' : '150€/mese',
      variant: "3 months",
      featured: false,
    },
    {
      id: "path-6-months",
      months: 6,
      duration: t.pathDuration2,
      price: 850,
      priceNote: language === 'de' ? 'oder ~142€/Monat in Raten' : 'o ~142€/mese a rate',
      variant: "6 months",
      featured: true,
    },
    {
      id: "path-12-months",
      months: 12,
      duration: t.pathDuration3,
      price: 1500,
      priceNote: language === 'de' ? 'oder 125€/Monat in Raten' : 'o 125€/mese a rate',
      variant: "12 months",
      featured: false,
    },
  ];

  return (
    <>
      {/* Schede pronte */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4">{t.discountBadge}</p>
            <h2 className="text-3xl md:text-4xl font-black text-ink uppercase mb-4">
              {t.readyPlans} <span className="text-accent">{t.readyPlansHighlight}</span>
            </h2>
            <p className="text-lg text-ink/60 max-w-2xl">{t.readyPlansDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schedePronte.map((scheda) => (
              <div key={scheda.id} className="bg-background border border-line rounded-lg overflow-hidden hover:border-gold-deep transition-colors">
                <div className="relative h-48">
                  <Image src={scheda.img} alt={scheda.name} fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-2 py-1 rounded-sm">-50%</div>
                  <div className="absolute top-3 left-3 bg-background/85 text-ink text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">{scheda.level}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-ink uppercase mb-1">{scheda.name}</h3>
                  <p className="text-ink/50 text-sm mb-4">{scheda.experience} {t.expLabel}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-ink/40 line-through">€{scheda.originalPrice}</span>
                    <span className="text-2xl font-black text-gold">€{scheda.price}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-ink/60 mb-5">
                    <li className="flex items-center">{checkIcon}{t.instantDownload}</li>
                    <li className="flex items-center">{checkIcon}{t.demoVideos}</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => addItem({ id: scheda.id, name: scheda.name, price: scheda.price, originalPrice: scheda.originalPrice, type: "scheda-pronta", variant: scheda.level })}
                    className="w-full bg-gold text-white py-3 rounded-md font-bold uppercase tracking-wider hover:bg-gold-soft transition-colors"
                  >
                    {t.buyNow}
                  </button>
                  <p className="text-xs text-ink/40 text-center mt-3">
                    <Link href="/contatti" className="hover:text-gold transition-colors">{t.contactNote}</Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Training */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4">{t.ptBadge}</p>
              <h2 className="text-3xl md:text-4xl font-black text-ink uppercase mb-6">
                {t.ptTitle} <span className="text-accent">{t.ptTitleHighlight}</span>
              </h2>
              <p className="text-lg text-ink/60 mb-8">{t.ptDesc}</p>
              <div className="border border-line rounded-lg p-6 bg-surface">
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-4xl font-black text-gold">€50</span>
                  <span className="text-ink/60">{t.ptHour}</span>
                </div>
                <ul className="space-y-2.5 text-sm text-ink/70 mb-6">
                  <li className="flex items-center">{checkIcon}{t.ptF1}</li>
                  <li className="flex items-center">{checkIcon}{t.ptF2}</li>
                  <li className="flex items-center">{checkIcon}{t.ptF3}</li>
                  <li className="flex items-center">{checkIcon}{t.ptF4}</li>
                </ul>
                <Link href="/contatti" className="block w-full text-center bg-gold text-white py-3.5 rounded-md font-bold uppercase tracking-wider hover:bg-gold-soft transition-colors">
                  {service3Cta}
                </Link>
              </div>
            </div>
            <div className="relative h-96 lg:h-[480px] rounded-lg overflow-hidden border border-line">
              <Image src="/images/services/personal.png" alt="Personal Training 1-to-1" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Percorsi */}
      <section id="percorso" className="py-20 sm:py-24 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-96 lg:h-[480px] rounded-lg overflow-hidden border border-line">
              <Image src="/images/Foto Angelo/angelo-4.jpg" alt={t.pathTitle} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-ink uppercase mb-6">
                {t.pathTitle}<span className="text-accent">{t.pathTitleHighlight}</span>
              </h2>
              <p className="text-lg text-ink/60 mb-6">{t.pathDesc}</p>
              <ul className="space-y-3">
                <li className="flex items-center text-ink/80">{checkIcon}{t.pathF1}</li>
                <li className="flex items-center text-ink/80">{checkIcon}{t.pathF2}</li>
                <li className="flex items-center text-ink/80">{checkIcon}{t.pathF3}</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paths.map((path) => (
              <div
                key={path.id}
                className={`relative bg-background rounded-lg p-8 border transition-colors ${
                  path.featured ? 'border-gold' : 'border-line hover:border-gold-deep'
                }`}
              >
                {path.featured && (
                  <div className="absolute -top-3 left-6 bg-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    Best Value
                  </div>
                )}
                <h3 className="text-xl font-black text-ink uppercase mb-1">
                  {path.months} {language === 'de' ? 'Monate' : 'Mesi'}
                </h3>
                <p className="text-ink/50 text-sm mb-6">{path.duration}</p>
                <div className="mb-6">
                  <span className="text-5xl font-black text-gold">€{path.price}</span>
                  <p className="text-ink/50 text-sm mt-2">{path.priceNote}</p>
                </div>
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center text-ink/70">{checkIcon}{t.pathF1}</li>
                  <li className="flex items-center text-ink/70">{checkIcon}{t.pathF2}</li>
                  <li className="flex items-center text-ink/70">{checkIcon}{t.whatsappSupport}</li>
                </ul>
                <button
                  type="button"
                  onClick={() => addItem({ id: path.id, name: `Percorso ${path.months} ${language === 'de' ? 'Monate' : 'Mesi'}`, price: path.price, type: "percorso", variant: path.variant })}
                  className={`w-full py-3 rounded-md font-bold uppercase tracking-wider transition-colors ${
                    path.featured
                      ? 'bg-gold text-white hover:bg-gold-soft'
                      : 'border border-line text-ink hover:bg-elevated hover:border-ink/40'
                  }`}
                >
                  {t.buyPath}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 border border-line bg-background px-6 py-3 rounded-md">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="text-ink/80">{t.guarantee}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
