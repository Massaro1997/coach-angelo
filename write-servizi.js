const fs = require('fs');
const content = `"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Servizi() {
  const { addItem } = useCart();
  const { language } = useLanguage();

  // Translations
  const t = {
    title: language === 'de' ? 'Meine' : 'I Miei',
    titleHighlight: language === 'de' ? 'Leistungen' : 'Servizi',
    subtitle: language === 'de'
      ? 'Programme für jedes Ziel und jedes Erfahrungslevel. Wähle den für dich passenden Weg.'
      : 'Programmi per ogni obiettivo e livello di esperienza. Scegli il percorso più adatto a te.',
    discount: '-50%',
    discountBadge: language === 'de' ? '-50% RABATT' : '-50% SCONTO',
    readyPlans: language === 'de' ? 'Fertige' : 'Schede',
    readyPlansHighlight: language === 'de' ? 'Pläne' : 'Pronte',
    readyPlansDesc: language === 'de'
      ? 'Fertige Trainingsprogramme im PDF-Format. Sofortiger Download nach dem Kauf.'
      : "Programmi di allenamento già pronti in formato PDF. Download immediato dopo l'acquisto.",
    beginner: language === 'de' ? 'Anfänger' : 'Principiante',
    intermediate: language === 'de' ? 'Fortgeschritten' : 'Intermedio',
    advanced: language === 'de' ? 'Profi' : 'Avanzato',
    exp06: language === 'de' ? '0-6 Monate' : '0-6 mesi',
    exp618: language === 'de' ? '6-18 Monate' : '6-18 mesi',
    exp18: language === 'de' ? '18+ Monate' : '18+ mesi',
    expLabel: language === 'de' ? 'Erfahrung' : 'di esperienza',
    instantDownload: language === 'de' ? 'Sofortiger Download' : 'Download immediato',
    demoVideos: language === 'de' ? 'Demonstrationsvideos' : 'Video dimostrativi',
    buyNow: language === 'de' ? 'Jetzt Kaufen' : 'Acquista Ora',
    contactNote: language === 'de' ? 'Du wirst innerhalb von 12-24 Stunden kontaktiert' : 'Verrai contattato entro 12-24 ore',
    customBadge: language === 'de' ? 'MASSGESCHNEIDERT' : 'SU MISURA',
    customTitle: language === 'de' ? 'Personalisierte' : 'Schede',
    customTitleHighlight: language === 'de' ? 'Pläne' : 'Personalizzate',
    customDesc: language === 'de'
      ? 'Ein Trainingsprogramm, das speziell für dich erstellt wird, basierend auf deinen Zielen, deinem aktuellen Level, deiner Verfügbarkeit und den verfügbaren Geräten.'
      : 'Programma di allenamento creato su misura per te, basato sui tuoi obiettivi, il tuo livello attuale, la tua disponibilità e le attrezzature che hai a disposizione.',
    customF1: language === 'de' ? 'Ausführlicher Eingangsfragebogen' : 'Questionario iniziale approfondito',
    customF2: language === 'de' ? 'Plan nach deinen Bedürfnissen erstellt' : 'Scheda creata in base alle tue esigenze',
    customF3: language === 'de' ? 'WhatsApp-Support für Fragen' : 'Supporto via WhatsApp per domande',
    customF4: language === 'de' ? 'Lieferung innerhalb 48-72 Stunden' : 'Consegna entro 48-72 ore',
    ptBadge: language === 'de' ? 'VOR ORT' : 'IN PRESENZA',
    ptTitle: 'Personal Training',
    ptTitleHighlight: '1-to-1',
    ptDesc: language === 'de'
      ? 'Individuelle Trainingseinheiten vor Ort. Ich begleite dich bei jeder Bewegung, korrigiere deine Technik und bringe dich sicher über deine Grenzen.'
      : 'Allenamenti individuali in presenza. Ti seguo in ogni movimento, correggo la tua tecnica e ti spingo oltre i tuoi limiti in totale sicurezza.',
    ptF1: language === 'de' ? 'Individuelle Einheiten von 60-90 Minuten' : 'Sessioni individuali di 60-90 minuti',
    ptF2: language === 'de' ? 'Echtzeit-Technikkorrektur' : 'Correzione tecnica in tempo reale',
    ptF3: language === 'de' ? 'Motivation und ständige Unterstützung' : 'Motivazione e supporto costante',
    ptF4: language === 'de' ? 'Verfügbar in Deutschland' : 'Disponibile in Germania',
    ptHour: language === 'de' ? '/Std' : '/ora',
    bookSession: language === 'de' ? 'Termin Buchen' : 'Prenota una Sessione',
    bestSeller: language === 'de' ? 'UNSER BESTSELLER' : 'IL NOSTRO BEST SELLER',
    pathTitle: language === 'de' ? 'Personalisierter' : 'Percorso',
    pathTitleHighlight: language === 'de' ? 'Weg' : 'Personalizzato',
    pathDesc: language === 'de'
      ? 'Der komplette Weg für ernsthafte Ergebnisse. Monatliche Betreuung mit Trainingsplan, Ernährungsplan, wöchentlichen Check-ins und unbegrenztem WhatsApp-Support.'
      : 'Il percorso completo per chi vuole risultati seri. Seguimento mensile con scheda allenamento, piano alimentare, check-in settimanali e supporto WhatsApp illimitato.',
    fatLoss: language === 'de' ? 'Fettabbau' : 'Dimagrimento',
    muscle: language === 'de' ? 'Muskelaufbau' : 'Massa',
    recomp: language === 'de' ? 'Rekomposition' : 'Ricomposizione',
    pathF1: language === 'de' ? 'Plan + Ernährungstipps' : 'Scheda + consigli alimentari',
    pathF2: language === 'de' ? 'Wöchentliches Feedback' : 'Feedback settimanali',
    pathF3: language === 'de' ? '2 vollständige Checks pro Monat' : '2 check completi al mese',
    pathF4: language === 'de' ? 'Update Training- und Ernährungsplan inklusive' : 'Aggiornamento scheda allenamento e alimentare inclusa',
    months3: language === 'de' ? '3 Monate' : '3 Mesi',
    months6: language === 'de' ? '6 Monate' : '6 Mesi',
    year1: language === 'de' ? '1 Jahr' : '1 Anno',
    perfectStart: language === 'de' ? 'Perfekt zum Starten' : 'Perfetto per iniziare',
    visibleResults: language === 'de' ? 'Für sichtbare Ergebnisse' : 'Per risultati visibili',
    completeTransform: language === 'de' ? 'Komplette Transformation' : 'Trasformazione completa',
    save: language === 'de' ? 'Ersparnis' : 'Risparmi',
    recommended: language === 'de' ? 'EMPFOHLEN' : 'CONSIGLIATO',
    bestValue: language === 'de' ? 'BESTER WERT' : 'MIGLIOR VALORE',
    guarantee: language === 'de' ? '14 Tage Geld-zurück-Garantie' : 'Garanzia soddisfatti o rimborsati entro 14 giorni',
    questionsTitle: language === 'de' ? 'Hast du Fragen?' : 'Hai Domande?',
    questionsDesc: language === 'de'
      ? 'Kontaktiere mich für eine kostenlose Beratung. Ich helfe dir, den perfekten Weg für deine Ziele zu finden.'
      : 'Contattami per una consulenza gratuita. Ti aiuterò a scegliere il percorso perfetto per i tuoi obiettivi.',
    freeConsult: language === 'de' ? 'Kostenlose Beratung' : 'Consulenza Gratuita',
  };

  const schedePronte = [
    { id: "scheda-beginner", name: language === 'de' ? 'Anfänger Plan' : 'Scheda Beginner', level: t.beginner, experience: t.exp06, color: "green", price: 25, originalPrice: 50 },
    { id: "scheda-intermediate", name: language === 'de' ? 'Fortgeschrittenen Plan' : 'Scheda Intermediate', level: t.intermediate, experience: t.exp618, color: "yellow", price: 25, originalPrice: 50 },
    { id: "scheda-advanced", name: language === 'de' ? 'Profi Plan' : 'Scheda Advanced', level: t.advanced, experience: t.exp18, color: "red", price: 25, originalPrice: 50 },
  ];

  return (
    <>
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            {t.title} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.titleHighlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">{t.discountBadge}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.readyPlans} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.readyPlansHighlight}</span></h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">{t.readyPlansDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {schedePronte.map((scheda) => (
                <div key={scheda.id} className="bg-neutral-900 rounded-2xl overflow-hidden group hover:ring-2 hover:ring-fuchsia-500 transition-all">
                  <div className="relative h-48">
                    <Image src={\`https://images.unsplash.com/photo-\${scheda.color === 'green' ? '1534438327276-14e5300c3a48' : scheda.color === 'yellow' ? '1583454110551-21f2fa2afe61' : '1605296867304-46d5465a13f1'}?w=600&q=80\`} alt={scheda.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">-50%</div>
                    <div className={\`absolute top-3 left-3 \${scheda.color === 'green' ? 'bg-green-500' : scheda.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'} text-white text-xs font-bold px-2 py-1 rounded\`}>{scheda.level}</div>
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
            <div className="relative h-96 rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" alt={t.customTitle} fill className="object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-fuchsia-500/20 text-fuchsia-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">{t.customBadge}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.customTitle} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.customTitleHighlight}</span></h2>
              <p className="text-lg text-white/70 mb-6">{t.customDesc}</p>
              <div className="bg-neutral-900 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4"><span className="text-4xl font-bold text-white">€50</span></div>
                <ul className="space-y-2 text-sm text-white/70 mb-4">
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.customF1}</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.customF2}</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.customF3}</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.customF4}</li>
                </ul>
                <button type="button" onClick={() => addItem({ id: "scheda-personalizzata", name: language === 'de' ? 'Personalisierter Plan' : 'Scheda Personalizzata', price: 50, type: "scheda-personalizzata" })} className="w-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 text-white py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  {t.buyNow}
                </button>
                <p className="text-xs text-white/50 text-center mt-3">{t.contactNote}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">{t.ptBadge}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.ptTitle} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.ptTitleHighlight}</span></h2>
              <p className="text-lg text-white/70 mb-6">{t.ptDesc}</p>
              <div className="bg-neutral-900 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4"><span className="text-4xl font-bold text-white">€30</span><span className="text-white/60">{t.ptHour}</span></div>
                <ul className="space-y-2 text-sm text-white/70 mb-4">
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.ptF1}</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.ptF2}</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.ptF3}</li>
                  <li className="flex items-center"><svg className="w-4 h-4 text-fuchsia-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.ptF4}</li>
                </ul>
                <Link href="/contatti?servizio=personal-training" className="block w-full text-center bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 text-white py-3 rounded-full font-semibold transition-all">{t.bookSession}</Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80" alt="Personal Training 1-to-1" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="percorso" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image src="/images/Foto Angelo/angelo-4.jpg" alt={t.pathTitle} fill className="object-cover" />
            </div>
            <div>
              <div className="inline-block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">{t.bestSeller}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.pathTitle} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.pathTitleHighlight}</span></h2>
              <p className="text-lg text-white/70 mb-6">{t.pathDesc}</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-neutral-800 rounded-lg p-3 text-center"><div className="text-2xl mb-1">🔥</div><p className="text-white text-xs font-semibold">{t.fatLoss}</p></div>
                <div className="bg-neutral-800 rounded-lg p-3 text-center"><div className="text-2xl mb-1">💪</div><p className="text-white text-xs font-semibold">{t.muscle}</p></div>
                <div className="bg-neutral-800 rounded-lg p-3 text-center"><div className="text-2xl mb-1">⚡</div><p className="text-white text-xs font-semibold">{t.recomp}</p></div>
              </div>
              <ul className="space-y-2 text-white/70 mb-6">
                <li className="flex items-center"><svg className="w-5 h-5 text-fuchsia-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF1}</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-fuchsia-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF2}</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-fuchsia-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF3}</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-fuchsia-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF4}</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <h3 className="text-2xl font-bold text-white mb-2">{t.months3}</h3>
              <p className="text-white/60 mb-6">{t.perfectStart}</p>
              <div className="mb-6">
                <span className="text-white/40 line-through text-xl">€300</span>
                <div className="flex items-end gap-2"><span className="text-5xl font-bold text-white">€200</span></div>
                <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold mt-2">{t.save} €100 (-33%)</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF1}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF2}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF3}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF4}</li>
              </ul>
              <button type="button" onClick={() => addItem({ id: "percorso-3-mesi", name: language === 'de' ? '3-Monats-Paket' : 'Percorso 3 Mesi', price: 200, originalPrice: 300, type: "percorso", variant: t.months3 })} className="w-full border-2 border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-white py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {t.buyNow}
              </button>
              <p className="text-xs text-white/50 text-center mt-3">{t.contactNote}</p>
            </div>

            <div className="bg-neutral-800 rounded-2xl p-8 border-2 border-fuchsia-500 relative transform md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-6 py-2 rounded-full text-sm font-bold">{t.recommended}</div>
              <h3 className="text-2xl font-bold text-white mb-2 mt-2">{t.months6}</h3>
              <p className="text-white/60 mb-6">{t.visibleResults}</p>
              <div className="mb-6">
                <span className="text-white/40 line-through text-xl">€600</span>
                <div className="flex items-end gap-2"><span className="text-5xl font-bold text-white">€300</span></div>
                <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold mt-2">{t.save} €300 (-50%)</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF1}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF2}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF3}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-fuchsia-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF4}</li>
              </ul>
              <button type="button" onClick={() => addItem({ id: "percorso-6-mesi", name: language === 'de' ? '6-Monats-Paket' : 'Percorso 6 Mesi', price: 300, originalPrice: 600, type: "percorso", variant: t.months6 })} className="w-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 text-white py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {t.buyNow}
              </button>
              <p className="text-xs text-white/50 text-center mt-3">{t.contactNote}</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 via-fuchsia-500/10 to-violet-500/10 rounded-2xl p-8 border-2 border-violet-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-500 text-white px-6 py-2 rounded-full text-sm font-bold">{t.bestValue}</div>
              <h3 className="text-2xl font-bold text-white mb-2 mt-2">{t.year1}</h3>
              <p className="text-white/60 mb-6">{t.completeTransform}</p>
              <div className="mb-6">
                <span className="text-white/40 line-through text-xl">€1200</span>
                <div className="flex items-end gap-2"><span className="text-5xl font-bold text-white">€500</span></div>
                <span className="inline-block bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-semibold mt-2">{t.save} €700 (-58%)</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-violet-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF1}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-violet-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF2}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-violet-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF3}</li>
                <li className="flex items-center text-white/70"><svg className="w-5 h-5 text-violet-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t.pathF4}</li>
              </ul>
              <button type="button" onClick={() => addItem({ id: "percorso-1-anno", name: language === 'de' ? '1-Jahres-Paket' : 'Percorso 1 Anno', price: 500, originalPrice: 1200, type: "percorso", variant: t.year1 })} className="w-full bg-violet-500 hover:bg-violet-400 text-white py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {t.buyNow}
              </button>
              <p className="text-xs text-white/50 text-center mt-3">{t.contactNote}</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-neutral-800 px-6 py-3 rounded-full">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="text-white/80">{t.guarantee}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32">
        <Image src="/hero bassa.png" alt="Coach Angelo" fill className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.questionsTitle}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{t.questionsDesc}</p>
          <Link href="/contatti" className="bg-white text-fuchsia-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all inline-block">{t.freeConsult}</Link>
        </div>
      </section>
    </>
  );
}
`;
fs.writeFileSync('src/app/servizi/page.tsx', content);
console.log('Done');
