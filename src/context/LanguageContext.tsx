'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'it' | 'de'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Traduzioni
const translations: Record<Language, Record<string, string>> = {
  it: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Servizi',
    'nav.about': 'Chi Sono',
    'nav.testimonials': 'Testimonianze',
    'nav.contact': 'Contatti',

    // Home
    'home.hero.title': 'Trasforma il Tuo Corpo',
    'home.hero.subtitle': 'Personal Training Online e Offline',
    'home.hero.description': 'Raggiungi i tuoi obiettivi con programmi personalizzati, supporto costante e la guida di un professionista dedicato al tuo successo.',
    'home.hero.cta': 'Inizia Ora',
    'home.hero.discover': 'Scopri di più',

    'home.services.title': 'I Miei Servizi',
    'home.services.subtitle': 'Soluzioni personalizzate per ogni obiettivo',
    'home.services.card1.title': 'Schede Personalizzate',
    'home.services.card1.desc': 'Programmi di allenamento creati su misura per te, basati sui tuoi obiettivi e livello di fitness.',
    'home.services.card2.title': 'Coaching Online',
    'home.services.card2.desc': 'Supporto costante via chat, videochiamate settimanali e monitoraggio dei progressi.',
    'home.services.card3.title': 'Consulenza Nutrizionale',
    'home.services.card3.desc': 'Consigli alimentari per ottimizzare i risultati del tuo allenamento.',
    'home.services.cta': 'Scopri Tutti i Servizi',

    'home.about.title': 'Chi Sono',
    'home.about.subtitle': 'La tua guida verso il cambiamento',
    'home.about.p1': 'Sono Angelo, Personal Trainer certificato con anni di esperienza nel fitness e nella trasformazione fisica.',
    'home.about.p2': 'La mia missione è aiutarti a raggiungere i tuoi obiettivi attraverso metodi scientifici e un approccio personalizzato.',
    'home.about.cta': 'Scopri la Mia Storia',

    'home.cta.title': 'Pronto a Iniziare?',
    'home.cta.subtitle': 'Il primo passo verso la tua trasformazione',
    'home.cta.description': 'Contattami oggi per una consulenza gratuita e scopri come posso aiutarti a raggiungere i tuoi obiettivi.',
    'home.cta.button': 'Contattami Ora',

    // Servizi
    'services.title': 'I Miei Servizi',
    'services.subtitle': 'Scegli il percorso più adatto a te',

    'services.schede.title': 'Schede Pronte',
    'services.schede.desc': 'Programmi di allenamento pronti all\'uso per ogni livello',
    'services.schede.beginner': 'Beginner',
    'services.schede.beginner.desc': 'Perfetto per chi inizia il percorso fitness',
    'services.schede.intermediate': 'Intermediate',
    'services.schede.intermediate.desc': 'Per chi ha già esperienza in palestra',
    'services.schede.advanced': 'Advanced',
    'services.schede.advanced.desc': 'Per atleti esperti che vogliono il massimo',
    'services.schede.buy': 'Acquista Ora',
    'services.schede.contact.note': 'Verrai contattato entro 12-24 ore dal pagamento',

    'services.personalizzata.title': 'Scheda Personalizzata',
    'services.personalizzata.desc': 'Un programma creato esclusivamente per te',
    'services.personalizzata.feature1': 'Analisi completa dei tuoi obiettivi',
    'services.personalizzata.feature2': 'Programma su misura',
    'services.personalizzata.feature3': 'Supporto via chat',
    'services.personalizzata.feature4': 'Aggiornamenti periodici',

    'services.percorsi.title': 'Percorsi di Coaching',
    'services.percorsi.desc': 'Accompagnamento completo verso i tuoi obiettivi',
    'services.percorsi.3mesi': 'Percorso 3 Mesi',
    'services.percorsi.6mesi': 'Percorso 6 Mesi',
    'services.percorsi.1anno': 'Percorso 1 Anno',
    'services.percorsi.popular': 'Più Popolare',
    'services.percorsi.best': 'Miglior Valore',
    'services.percorsi.feature1': 'Scheda personalizzata',
    'services.percorsi.feature2': 'Check-in settimanali',
    'services.percorsi.feature3': 'Supporto WhatsApp',
    'services.percorsi.feature4': 'Aggiornamenti scheda',
    'services.percorsi.feature5': 'Consulenza nutrizionale',
    'services.percorsi.feature6': 'Videochiamate mensili',

    // Chi Sono
    'about.title': 'Chi Sono',
    'about.subtitle': 'La mia storia e la mia missione',
    'about.intro': 'Ciao, sono Angelo!',
    'about.p1': 'Sono un Personal Trainer certificato con una passione profonda per il fitness e il benessere. La mia missione è aiutare le persone a trasformare non solo il loro corpo, ma anche la loro mentalità verso uno stile di vita più sano.',
    'about.p2': 'Ho iniziato il mio percorso nel mondo del fitness diversi anni fa, quando ho scoperto quanto l\'allenamento potesse cambiare la vita. Da allora, ho dedicato la mia carriera ad approfondire le conoscenze in ambito di allenamento, nutrizione e mindset.',
    'about.p3': 'Ogni cliente è unico, e per questo creo programmi personalizzati che si adattano alle esigenze, agli obiettivi e allo stile di vita di ciascuno. Non esiste un approccio universale: lavoro con te per trovare il percorso migliore.',
    'about.certifications': 'Certificazioni',
    'about.experience': 'Esperienza',
    'about.clients': 'Clienti Seguiti',
    'about.cta': 'Inizia il Tuo Percorso',

    // Contatti
    'contact.title': 'Contattami',
    'contact.subtitle': 'Sono qui per aiutarti',
    'contact.description': 'Hai domande sui miei servizi? Vuoi iniziare il tuo percorso di trasformazione? Contattami e risponderò il prima possibile!',
    'contact.whatsapp': 'Scrivimi su WhatsApp',
    'contact.whatsapp.desc': 'Il modo più veloce per contattarmi',
    'contact.email': 'Inviami una Email',
    'contact.email.desc': 'Per richieste dettagliate',
    'contact.social': 'Seguimi sui Social',
    'contact.social.desc': 'Resta aggiornato sui miei contenuti',
    'contact.form.title': 'Invia un Messaggio',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.message': 'Messaggio',
    'contact.form.submit': 'Invia Messaggio',

    // Testimonianze
    'testimonials.title': 'Testimonianze',
    'testimonials.subtitle': 'Cosa dicono i miei clienti',

    // Footer
    'footer.rights': 'Tutti i diritti riservati',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Termini e Condizioni',
    'footer.cookies': 'Cookie Policy',

    // Cart
    'cart.title': 'Carrello',
    'cart.empty': 'Il carrello è vuoto',
    'cart.total': 'Totale',
    'cart.checkout': 'Procedi al Checkout',
    'cart.remove': 'Rimuovi',
    'cart.continue': 'Continua lo Shopping',

    // Checkout
    'checkout.title': 'Checkout',
    'checkout.summary': 'Riepilogo Ordine',
    'checkout.pay': 'Paga con PayPal',
    'checkout.secure': 'Pagamento sicuro con PayPal',
    'checkout.success.title': 'Pagamento Completato!',
    'checkout.success.message': 'Grazie per il tuo acquisto! Ti contatteremo entro 12-24 ore.',
    'checkout.success.whatsapp': 'Contattaci su WhatsApp',
    'checkout.success.home': 'Torna alla Home',

    // Common
    'common.loading': 'Caricamento...',
    'common.error': 'Si è verificato un errore',
    'common.back': 'Indietro',
    'common.close': 'Chiudi',
  },
  de: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Leistungen',
    'nav.about': 'Über Mich',
    'nav.testimonials': 'Bewertungen',
    'nav.contact': 'Kontakt',

    // Home
    'home.hero.title': 'Transformiere Deinen Körper',
    'home.hero.subtitle': 'Personal Training Online und Offline',
    'home.hero.description': 'Erreiche deine Ziele mit personalisierten Programmen, ständiger Unterstützung und der Anleitung eines Profis, der sich deinem Erfolg verschrieben hat.',
    'home.hero.cta': 'Jetzt Starten',
    'home.hero.discover': 'Mehr Erfahren',

    'home.services.title': 'Meine Leistungen',
    'home.services.subtitle': 'Maßgeschneiderte Lösungen für jedes Ziel',
    'home.services.card1.title': 'Personalisierte Trainingspläne',
    'home.services.card1.desc': 'Trainingsprogramme, die speziell für dich erstellt wurden, basierend auf deinen Zielen und deinem Fitnesslevel.',
    'home.services.card2.title': 'Online Coaching',
    'home.services.card2.desc': 'Ständige Unterstützung per Chat, wöchentliche Videoanrufe und Fortschrittskontrolle.',
    'home.services.card3.title': 'Ernährungsberatung',
    'home.services.card3.desc': 'Ernährungstipps zur Optimierung deiner Trainingsergebnisse.',
    'home.services.cta': 'Alle Leistungen Entdecken',

    'home.about.title': 'Über Mich',
    'home.about.subtitle': 'Dein Guide zur Veränderung',
    'home.about.p1': 'Ich bin Angelo, zertifizierter Personal Trainer mit jahrelanger Erfahrung im Fitness und körperlicher Transformation.',
    'home.about.p2': 'Meine Mission ist es, dir zu helfen, deine Ziele durch wissenschaftliche Methoden und einen personalisierten Ansatz zu erreichen.',
    'home.about.cta': 'Meine Geschichte Entdecken',

    'home.cta.title': 'Bereit zu Starten?',
    'home.cta.subtitle': 'Der erste Schritt zu deiner Transformation',
    'home.cta.description': 'Kontaktiere mich heute für eine kostenlose Beratung und erfahre, wie ich dir helfen kann, deine Ziele zu erreichen.',
    'home.cta.button': 'Jetzt Kontaktieren',

    // Servizi
    'services.title': 'Meine Leistungen',
    'services.subtitle': 'Wähle den für dich passenden Weg',

    'services.schede.title': 'Fertige Trainingspläne',
    'services.schede.desc': 'Sofort einsatzbereite Trainingsprogramme für jedes Level',
    'services.schede.beginner': 'Anfänger',
    'services.schede.beginner.desc': 'Perfekt für Fitness-Einsteiger',
    'services.schede.intermediate': 'Fortgeschritten',
    'services.schede.intermediate.desc': 'Für erfahrene Fitnessstudio-Besucher',
    'services.schede.advanced': 'Profi',
    'services.schede.advanced.desc': 'Für erfahrene Athleten, die das Maximum wollen',
    'services.schede.buy': 'Jetzt Kaufen',
    'services.schede.contact.note': 'Du wirst innerhalb von 12-24 Stunden nach der Zahlung kontaktiert',

    'services.personalizzata.title': 'Personalisierter Trainingsplan',
    'services.personalizzata.desc': 'Ein Programm, das exklusiv für dich erstellt wird',
    'services.personalizzata.feature1': 'Vollständige Analyse deiner Ziele',
    'services.personalizzata.feature2': 'Maßgeschneidertes Programm',
    'services.personalizzata.feature3': 'Chat-Support',
    'services.personalizzata.feature4': 'Regelmäßige Updates',

    'services.percorsi.title': 'Coaching-Pakete',
    'services.percorsi.desc': 'Komplette Begleitung zu deinen Zielen',
    'services.percorsi.3mesi': '3-Monats-Paket',
    'services.percorsi.6mesi': '6-Monats-Paket',
    'services.percorsi.1anno': '1-Jahres-Paket',
    'services.percorsi.popular': 'Am Beliebtesten',
    'services.percorsi.best': 'Bester Wert',
    'services.percorsi.feature1': 'Personalisierter Trainingsplan',
    'services.percorsi.feature2': 'Wöchentliche Check-ins',
    'services.percorsi.feature3': 'WhatsApp-Support',
    'services.percorsi.feature4': 'Plan-Updates',
    'services.percorsi.feature5': 'Ernährungsberatung',
    'services.percorsi.feature6': 'Monatliche Videoanrufe',

    // Chi Sono
    'about.title': 'Über Mich',
    'about.subtitle': 'Meine Geschichte und Mission',
    'about.intro': 'Hallo, ich bin Angelo!',
    'about.p1': 'Ich bin ein zertifizierter Personal Trainer mit einer tiefen Leidenschaft für Fitness und Wohlbefinden. Meine Mission ist es, Menschen zu helfen, nicht nur ihren Körper zu transformieren, sondern auch ihre Einstellung zu einem gesünderen Lebensstil.',
    'about.p2': 'Ich habe meine Reise in der Fitnesswelt vor mehreren Jahren begonnen, als ich entdeckte, wie sehr Training das Leben verändern kann. Seitdem habe ich meine Karriere der Vertiefung von Wissen in Training, Ernährung und Mindset gewidmet.',
    'about.p3': 'Jeder Kunde ist einzigartig, deshalb erstelle ich personalisierte Programme, die sich an die Bedürfnisse, Ziele und den Lebensstil jedes Einzelnen anpassen. Es gibt keinen universellen Ansatz: Ich arbeite mit dir, um den besten Weg zu finden.',
    'about.certifications': 'Zertifizierungen',
    'about.experience': 'Erfahrung',
    'about.clients': 'Betreute Kunden',
    'about.cta': 'Starte Deine Reise',

    // Contatti
    'contact.title': 'Kontakt',
    'contact.subtitle': 'Ich bin hier, um dir zu helfen',
    'contact.description': 'Hast du Fragen zu meinen Leistungen? Möchtest du deine Transformation starten? Kontaktiere mich und ich werde so schnell wie möglich antworten!',
    'contact.whatsapp': 'Schreib mir auf WhatsApp',
    'contact.whatsapp.desc': 'Der schnellste Weg, mich zu kontaktieren',
    'contact.email': 'Schick mir eine E-Mail',
    'contact.email.desc': 'Für detaillierte Anfragen',
    'contact.social': 'Folge mir auf Social Media',
    'contact.social.desc': 'Bleib über meine Inhalte auf dem Laufenden',
    'contact.form.title': 'Nachricht Senden',
    'contact.form.name': 'Name',
    'contact.form.email': 'E-Mail',
    'contact.form.message': 'Nachricht',
    'contact.form.submit': 'Nachricht Senden',

    // Testimonianze
    'testimonials.title': 'Bewertungen',
    'testimonials.subtitle': 'Was meine Kunden sagen',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.cookies': 'Cookie-Richtlinie',

    // Cart
    'cart.title': 'Warenkorb',
    'cart.empty': 'Der Warenkorb ist leer',
    'cart.total': 'Gesamt',
    'cart.checkout': 'Zur Kasse',
    'cart.remove': 'Entfernen',
    'cart.continue': 'Weiter Einkaufen',

    // Checkout
    'checkout.title': 'Kasse',
    'checkout.summary': 'Bestellübersicht',
    'checkout.pay': 'Mit PayPal bezahlen',
    'checkout.secure': 'Sichere Zahlung mit PayPal',
    'checkout.success.title': 'Zahlung Abgeschlossen!',
    'checkout.success.message': 'Vielen Dank für deinen Einkauf! Wir werden dich innerhalb von 12-24 Stunden kontaktieren.',
    'checkout.success.whatsapp': 'Kontaktiere uns auf WhatsApp',
    'checkout.success.home': 'Zurück zur Startseite',

    // Common
    'common.loading': 'Laden...',
    'common.error': 'Ein Fehler ist aufgetreten',
    'common.back': 'Zurück',
    'common.close': 'Schließen',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de')

  useEffect(() => {
    // Carica la lingua salvata dal localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'it' || savedLanguage === 'de')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
