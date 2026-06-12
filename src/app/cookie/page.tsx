"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Cookie() {
  const { language } = useLanguage();

  const t = {
    title: 'Cookie ',
    titleHighlight: 'Policy',
    lastUpdate: language === 'de' ? 'Letzte Aktualisierung' : 'Ultimo aggiornamento',

    s1Title: language === 'de' ? '1. Was sind Cookies' : '1. Cosa Sono i Cookie',
    s1Text: language === 'de'
      ? 'Cookies sind kleine Textdateien, die auf dem Gerät des Nutzers gespeichert werden, wenn er eine Website besucht. Sie dienen dazu, das Surferlebnis zu verbessern und wesentliche Funktionen der Website bereitzustellen.'
      : "I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente quando visita un sito web. Servono a migliorare l'esperienza di navigazione e a fornire funzionalità essenziali del sito.",

    s2Title: language === 'de' ? '2. Arten von verwendeten Cookies' : '2. Tipi di Cookie Utilizzati',

    s2a: language === 'de' ? 'Technische Cookies (Erforderlich)' : 'Cookie Tecnici (Necessari)',
    s2aText: language === 'de'
      ? 'Diese Cookies sind für den Betrieb der Website unerlässlich. Sie umfassen:'
      : 'Questi cookie sono essenziali per il funzionamento del sito. Includono:',
    s2aItems: language === 'de' ? [
      'Sitzungscookies zur Aufrechterhaltung des Navigationsstatus',
      'Warenkorb-Cookies zum Speichern ausgewählter Produkte',
      'Präferenz-Cookies für Benutzereinstellungen',
    ] : [
      'Cookie di sessione per mantenere lo stato di navigazione',
      'Cookie del carrello per memorizzare i prodotti selezionati',
      "Cookie di preferenze per le impostazioni dell'utente",
    ],

    s2b: language === 'de' ? 'Analyse-Cookies' : 'Cookie Analitici',
    s2bText: language === 'de'
      ? 'Wir verwenden Analyse-Cookies, um zu verstehen, wie Besucher mit der Website interagieren. Diese Daten helfen uns, unsere Dienste zu verbessern.'
      : 'Utilizziamo cookie analitici per comprendere come i visitatori interagiscono con il sito. Questi dati ci aiutano a migliorare i nostri servizi.',

    s2c: language === 'de' ? 'Marketing-Cookies' : 'Cookie di Marketing',
    s2cText: language === 'de'
      ? 'Mit Zustimmung des Nutzers können wir Marketing-Cookies verwenden, um relevante Anzeigen auf anderen Plattformen anzuzeigen.'
      : "Con il consenso dell'utente, possiamo utilizzare cookie di marketing per mostrare annunci pertinenti su altre piattaforme.",

    s3Title: language === 'de' ? '3. Cookie-Dauer' : '3. Durata dei Cookie',
    s3Text: language === 'de' ? 'Cookies können sein:' : 'I cookie possono essere:',
    s3Items: language === 'de' ? [
      { strong: 'Sitzungscookies:', text: 'werden beim Schließen des Browsers gelöscht' },
      { strong: 'Persistente Cookies:', text: 'bleiben für einen bestimmten Zeitraum auf dem Gerät' },
    ] : [
      { strong: 'Cookie di sessione:', text: 'vengono eliminati alla chiusura del browser' },
      { strong: 'Cookie persistenti:', text: 'rimangono sul dispositivo per un periodo definito' },
    ],

    s4Title: language === 'de' ? '4. Cookie-Verwaltung' : '4. Gestione dei Cookie',
    s4Text1: language === 'de'
      ? 'Der Nutzer kann Cookie-Präferenzen über die Browsereinstellungen verwalten. Es ist jederzeit möglich, Cookies zu blockieren oder zu löschen. Die Deaktivierung einiger Cookies kann jedoch die Funktionalität der Website beeinträchtigen.'
      : "L'utente può gestire le preferenze sui cookie attraverso le impostazioni del browser. È possibile bloccare o eliminare i cookie in qualsiasi momento. Tuttavia, la disabilitazione di alcuni cookie potrebbe influire sulla funzionalità del sito.",
    s4Text2: language === 'de' ? 'Anweisungen für die wichtigsten Browser:' : 'Istruzioni per i principali browser:',
    s4Items: language === 'de' ? [
      'Chrome: Einstellungen > Datenschutz und Sicherheit > Cookies',
      'Firefox: Optionen > Datenschutz und Sicherheit > Cookies',
      'Safari: Einstellungen > Datenschutz > Cookies',
      'Edge: Einstellungen > Cookies und Websiteberechtigungen',
    ] : [
      'Chrome: Impostazioni > Privacy e sicurezza > Cookie',
      'Firefox: Opzioni > Privacy e sicurezza > Cookie',
      'Safari: Preferenze > Privacy > Cookie',
      'Edge: Impostazioni > Cookie e autorizzazioni sito',
    ],

    s5Title: language === 'de' ? '5. Cookies von Drittanbietern' : '5. Cookie di Terze Parti',
    s5Text: language === 'de'
      ? 'Die Website kann Cookies von Drittanbietern enthalten für:'
      : 'Il sito potrebbe contenere cookie di terze parti per:',
    s5Items: language === 'de' ? [
      'Traffic-Analyse (z.B. Google Analytics)',
      'Social-Media-Integration',
      'Zahlungsabwicklung',
    ] : [
      'Analisi del traffico (es. Google Analytics)',
      'Integrazione social media',
      'Elaborazione pagamenti',
    ],

    s6Title: language === 'de' ? '6. Aktualisierungen' : '6. Aggiornamenti',
    s6Text: language === 'de'
      ? 'Diese Cookie-Richtlinie kann regelmäßig aktualisiert werden. Es wird empfohlen, sie regelmäßig zu überprüfen, um über Änderungen informiert zu sein.'
      : 'Questa Cookie Policy può essere aggiornata periodicamente. Si consiglia di consultarla regolarmente per essere informati su eventuali modifiche.',

    s7Title: language === 'de' ? '7. Kontakt' : '7. Contatti',
    s7Text: language === 'de'
      ? 'Bei Fragen zur Cookie-Richtlinie:'
      : 'Per domande sulla Cookie Policy:',
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-ink uppercase mb-8">
          {t.title}<span className="text-gold">{t.titleHighlight}</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-white/70 mb-6">{t.lastUpdate}: {new Date().toLocaleDateString(language === 'de' ? "de-DE" : "it-IT")}</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s1Title}</h2>
            <p className="text-white/70 mb-4">{t.s1Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s2Title}</h2>

            <h3 className="text-lg font-semibold text-white mb-2">{t.s2a}</h3>
            <p className="text-white/70 mb-4">{t.s2aText}</p>
            <ul className="list-disc list-inside text-white/70 mb-4 space-y-2">
              {t.s2aItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">{t.s2b}</h3>
            <p className="text-white/70 mb-4">{t.s2bText}</p>

            <h3 className="text-lg font-semibold text-white mb-2">{t.s2c}</h3>
            <p className="text-white/70 mb-4">{t.s2cText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s3Title}</h2>
            <p className="text-white/70 mb-4">{t.s3Text}</p>
            <ul className="list-disc list-inside text-white/70 mb-4 space-y-2">
              {t.s3Items.map((item, i) => (
                <li key={i}><strong>{item.strong}</strong> {item.text}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s4Title}</h2>
            <p className="text-white/70 mb-4">{t.s4Text1}</p>
            <p className="text-white/70 mb-4">{t.s4Text2}</p>
            <ul className="list-disc list-inside text-white/70 mb-4 space-y-2">
              {t.s4Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s5Title}</h2>
            <p className="text-white/70 mb-4">{t.s5Text}</p>
            <ul className="list-disc list-inside text-white/70 mb-4 space-y-2">
              {t.s5Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s6Title}</h2>
            <p className="text-white/70 mb-4">{t.s6Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s7Title}</h2>
            <p className="text-white/70 mb-4">
              {t.s7Text}<br />
              Email: magliarisiangelo912@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
