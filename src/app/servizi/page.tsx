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
    contactNote: language === 'de' ? 'Bei Fragen kontaktiere mich auf WhatsApp' : 'Dubbi? Scrivimi su WhatsApp',

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
    steps: language === 'de' ? 'Wege' : 'Percorsi',

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

  const schedePronte = [
    { id: "scheda-beginner", name: language === 'de' ? 'Anfänger Plan' : 'Scheda Beginner', level: t.beginner, experience: t.exp06, color: "green", price: 25, originalPrice: 50 },
    { id: "scheda-intermediate", name: language === 'de' ? 'Fortgeschrittenen Plan' : 'Scheda Intermediate', level: t.intermediate, experience: t.exp618, color: "yellow", price: 25, originalPrice: 50 },
    { id: "scheda-advanced", name: language === 'de' ? 'Profi Plan' : 'Scheda Advanced', level: t.advanced, experience: t.exp18, color: "red", price: 25, originalPrice: 50 },
  ];

  return (
    <>
      {/* Hero Section con gradienti animati */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 bg-neutral-900 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>

        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-fuchsia-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            {t.title} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.titleHighlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <section className="relative py-20 bg-neutral-800 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-800 to-neutral-900"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block bg-fuchsia-500/20 text-fuchsia-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">{t.discountBadge}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.readyPlans} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.readyPlansHighlight}</span></h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">{t.readyPlansDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {schedePronte.map((scheda) => (
                <div key={scheda.id} className="bg-neutral-900 rounded-2xl overflow-hidden group hover:ring-2 hover:ring-fuchsia-500 transition-all">
                  <div className="relative h-48">
                    <Image src={`https://images.unsplash.com/photo-${scheda.color === 'green' ? '1534438327276-14e5300c3a48' : scheda.color === 'yellow' ? '1583454110551-21f2fa2afe61' : '1605296867304-46d5465a13f1'}?w=600&q=80`} alt={scheda.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white text-xs font-bold px-2 py-1 rounded">-50%</div>
                    <div className="absolute top-3 left-3 bg-fuchsia-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">{scheda.level}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{scheda.name}</h3>
                    <p className="text-white/50 text-sm mb-4">{scheda.experience} {t.expLabel}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-white/40 line-through">€{scheda.originalPrice}</span>
                      <span className="text-2xl font-bold text-white">€{scheda.price}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-white/60 mb-4">
                      <li className="flex items-center"><svg className="w-3 h-3 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.instantDownload}</li>
                      <li className="flex items-center"><svg className="w-3 h-3 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.demoVideos}</li>
                    </ul>
                    <button type="button" onClick={() => addItem({ id: scheda.id, name: scheda.name, price: scheda.price, originalPrice: scheda.originalPrice, type: "scheda-pronta", variant: scheda.level })} className="w-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 text-white py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      {t.buyNow}
                    </button>
                    <p className="text-xs text-white/50 text-center mt-2">{t.contactNote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-block bg-violet-500/20 text-violet-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">{t.ptBadge}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.ptTitle} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.ptTitleHighlight}</span></h2>
              <p className="text-lg text-white/70 mb-6">{t.ptDesc}</p>
              <div className="bg-neutral-900 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4"><span className="text-4xl font-bold text-white">€50</span><span className="text-white/60">{t.ptHour}</span></div>
                <ul className="space-y-2 text-sm text-white/70 mb-4">
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.ptF1}</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.ptF2}</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.ptF3}</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.ptF4}</li>
                </ul>
                <Link href="/contatti" className="block w-full text-center bg-white text-neutral-900 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                  {service3Cta}
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80" alt="Personal Training 1-to-1" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="percorso" className="relative py-20 bg-neutral-900 overflow-hidden">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-fuchsia-950/20 to-neutral-900"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-fuchsia-500/8 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image src="/images/Foto Angelo/angelo-4.jpg" alt={t.pathTitle} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.pathTitle} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.pathTitleHighlight}</span></h2>
              <p className="text-lg text-white/70 mb-6">
                {t.pathDesc}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white/80"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF1}</li>
                <li className="flex items-center text-white/80"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF2}</li>
                <li className="flex items-center text-white/80"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF3}</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-800 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-transform duration-300 border border-neutral-700">
              <h3 className="text-xl font-bold text-white mb-2">3 {language === 'de' ? 'Monate' : 'Mesi'}</h3>
              <p className="text-white/50 text-sm mb-6">{t.pathDuration1}</p>
              <div className="mb-4">
                <div className="flex items-end gap-2"><span className="text-5xl font-bold text-white">€300</span></div>
                <p className="text-white/50 text-sm mt-2">{language === 'de' ? 'oder €100/Monat in Raten' : 'o €100/mese a rate'}</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF1}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF2}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.whatsappSupport}</li>
              </ul>
              <button onClick={() => addItem({ id: "path-3-months", name: `Percorso 3 ${language === 'de' ? 'Monate' : 'Mesi'}`, price: 300, type: "percorso", variant: "3 months" })} className="w-full bg-neutral-700 hover:bg-neutral-600 text-white py-3 rounded-full font-semibold transition-all">
                {t.buyPath}
              </button>
            </div>

            <div className="bg-neutral-800 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-transform duration-300 border-2 border-fuchsia-500 relative">
              <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">BEST VALUE</div>
              <h3 className="text-xl font-bold text-white mb-2">6 {language === 'de' ? 'Monate' : 'Mesi'}</h3>
              <p className="text-white/50 text-sm mb-6">{t.pathDuration2}</p>
              <div className="mb-4">
                <div className="flex items-end gap-2"><span className="text-5xl font-bold text-white">€600</span></div>
                <p className="text-white/50 text-sm mt-2">{language === 'de' ? 'oder €100/Monat in Raten' : 'o €100/mese a rate'}</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF1}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF2}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.whatsappSupport}</li>
              </ul>
              <button onClick={() => addItem({ id: "path-6-months", name: `Percorso 6 ${language === 'de' ? 'Monate' : 'Mesi'}`, price: 600, type: "percorso", variant: "6 months" })} className="w-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-fuchsia-500/25">
                {t.buyPath}
              </button>
            </div>

            <div className="bg-neutral-800 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-transform duration-300 border border-neutral-700">
              <h3 className="text-xl font-bold text-white mb-2">12 {language === 'de' ? 'Monate' : 'Mesi'}</h3>
              <p className="text-white/50 text-sm mb-6">{t.pathDuration3}</p>
              <div className="mb-4">
                <div className="flex items-end gap-2"><span className="text-5xl font-bold text-white">€950</span></div>
                <p className="text-white/50 text-sm mt-2">{language === 'de' ? 'oder ~€80/Monat in Raten' : 'o ~€80/mese a rate'}</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-violet-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF1}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-violet-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF2}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-violet-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.whatsappSupport}</li>
              </ul>
              <button onClick={() => addItem({ id: "path-12-months", name: `Percorso 12 ${language === 'de' ? 'Monate' : 'Mesi'}`, price: 950, type: "percorso", variant: "12 months" })} className="w-full bg-neutral-700 hover:bg-neutral-600 text-white py-3 rounded-full font-semibold transition-all">
                {t.buyPath}
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-neutral-800 px-6 py-3 rounded-full">
              <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="text-white/80">{t.guarantee}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
