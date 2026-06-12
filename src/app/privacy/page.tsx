"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Privacy() {
  const { language } = useLanguage();

  const t = {
    title: 'Privacy ',
    titleHighlight: 'Policy',
    lastUpdate: language === 'de' ? 'Letzte Aktualisierung' : 'Ultimo aggiornamento',

    s1Title: language === 'de' ? '1. Verantwortlicher' : '1. Titolare del Trattamento',
    s1Text: language === 'de'
      ? 'Der Verantwortliche für die Datenverarbeitung ist Coach Angelo mit Sitz in Köln, Deutschland.'
      : 'Il titolare del trattamento dei dati è Coach Angelo, con sede a Colonia, Germania.',

    s2Title: language === 'de' ? '2. Erhobene Daten' : '2. Dati Raccolti',
    s2Intro: language === 'de' ? 'Wir erheben folgende personenbezogene Daten:' : 'Raccogliamo i seguenti dati personali:',
    s2Items: language === 'de' ? [
      'Vor- und Nachname',
      'E-Mail-Adresse',
      'Telefonnummer',
      'Rechnungsdaten',
      'Gesundheits- und Fitnessziele (nur mit ausdrücklicher Zustimmung)',
    ] : [
      'Nome e cognome',
      'Indirizzo email',
      'Numero di telefono',
      'Dati di fatturazione',
      'Informazioni relative alla salute e agli obiettivi fitness (solo con consenso esplicito)',
    ],

    s3Title: language === 'de' ? '3. Zweck der Verarbeitung' : '3. Finalità del Trattamento',
    s3Intro: language === 'de' ? 'Die personenbezogenen Daten werden verarbeitet für:' : 'I dati personali sono trattati per:',
    s3Items: language === 'de' ? [
      'Erbringung der angeforderten Dienstleistungen',
      'Kommunikation bezüglich erworbener Dienstleistungen',
      'Rechnungsstellung und steuerliche Verpflichtungen',
      'Direktmarketing (nur mit Zustimmung)',
      'Verbesserung der angebotenen Dienstleistungen',
    ] : [
      'Erogazione dei servizi richiesti',
      'Comunicazioni relative ai servizi acquistati',
      'Fatturazione e adempimenti fiscali',
      'Marketing diretto (solo con consenso)',
      'Miglioramento dei servizi offerti',
    ],

    s4Title: language === 'de' ? '4. Rechtsgrundlage' : '4. Base Giuridica',
    s4Text: language === 'de'
      ? 'Die Datenverarbeitung basiert auf: Vertragserfüllung, Einwilligung des Betroffenen, gesetzliche Verpflichtungen und berechtigtes Interesse des Verantwortlichen.'
      : "Il trattamento dei dati si basa su: esecuzione contrattuale, consenso dell'interessato, obblighi legali e legittimo interesse del titolare.",

    s5Title: language === 'de' ? '5. Speicherdauer' : '5. Conservazione dei Dati',
    s5Text: language === 'de'
      ? 'Personenbezogene Daten werden für die Dauer der Dienstleistungserbringung und zur Erfüllung gesetzlicher steuerlicher Aufbewahrungspflichten gespeichert (in der Regel 10 Jahre für Steuerdokumente).'
      : "I dati personali sono conservati per il tempo necessario all'erogazione dei servizi e per gli adempimenti fiscali previsti dalla legge (generalmente 10 anni per i documenti fiscali).",

    s6Title: language === 'de' ? '6. Rechte des Betroffenen' : "6. Diritti dell'Interessato",
    s6Intro: language === 'de' ? 'Gemäß DSGVO hat der Betroffene das Recht:' : "In conformità al GDPR, l'interessato ha diritto a:",
    s6Items: language === 'de' ? [
      'Auf seine personenbezogenen Daten zuzugreifen',
      'Unrichtige Daten zu berichtigen',
      'Daten zu löschen ("Recht auf Vergessenwerden")',
      'Die Verarbeitung einzuschränken',
      'Auf Datenübertragbarkeit',
      'Der Verarbeitung zu widersprechen',
      'Die Einwilligung jederzeit zu widerrufen',
    ] : [
      'Accedere ai propri dati personali',
      'Rettificare dati inesatti',
      'Cancellare i dati ("diritto all\'oblio")',
      'Limitare il trattamento',
      'Portabilità dei dati',
      'Opporsi al trattamento',
      'Revocare il consenso in qualsiasi momento',
    ],

    s7Title: language === 'de' ? '7. Datensicherheit' : '7. Sicurezza dei Dati',
    s7Text: language === 'de'
      ? 'Wir treffen angemessene technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten vor unbefugtem Zugriff, Verlust oder Zerstörung.'
      : 'Adottiamo misure tecniche e organizzative appropriate per proteggere i dati personali da accessi non autorizzati, perdita o distruzione.',

    s8Title: language === 'de' ? '8. Datenübermittlung' : '8. Trasferimento Dati',
    s8Text: language === 'de'
      ? 'Personenbezogene Daten werden nicht außerhalb der Europäischen Union übermittelt. Falls erforderlich, werden die von der DSGVO vorgesehenen Garantien angewendet.'
      : "I dati personali non vengono trasferiti al di fuori dell'Unione Europea. In caso di necessità, saranno adottate le garanzie previste dal GDPR.",

    s9Title: language === 'de' ? '9. Kontakt' : '9. Contatti',
    s9Intro: language === 'de'
      ? 'Um Ihre Rechte auszuüben oder für Datenschutzinformationen:'
      : 'Per esercitare i propri diritti o per informazioni sulla privacy:',
    s9Outro: language === 'de'
      ? 'Sie können eine Beschwerde bei der zuständigen Aufsichtsbehörde einreichen.'
      : "È possibile presentare reclamo all'autorità di controllo competente.",
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
            <p className="text-white/70 mb-4">
              {t.s1Text}<br />
              Email: magliarisiangelo912@gmail.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s2Title}</h2>
            <p className="text-white/70 mb-4">{t.s2Intro}</p>
            <ul className="list-disc list-inside text-white/70 mb-4 space-y-2">
              {t.s2Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s3Title}</h2>
            <p className="text-white/70 mb-4">{t.s3Intro}</p>
            <ul className="list-disc list-inside text-white/70 mb-4 space-y-2">
              {t.s3Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s4Title}</h2>
            <p className="text-white/70 mb-4">{t.s4Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s5Title}</h2>
            <p className="text-white/70 mb-4">{t.s5Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s6Title}</h2>
            <p className="text-white/70 mb-4">{t.s6Intro}</p>
            <ul className="list-disc list-inside text-white/70 mb-4 space-y-2">
              {t.s6Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s7Title}</h2>
            <p className="text-white/70 mb-4">{t.s7Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s8Title}</h2>
            <p className="text-white/70 mb-4">{t.s8Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s9Title}</h2>
            <p className="text-white/70 mb-4">
              {t.s9Intro}<br />
              Email: magliarisiangelo912@gmail.com<br /><br />
              {t.s9Outro}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
