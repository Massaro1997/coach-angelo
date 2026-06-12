"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Termini() {
  const { language } = useLanguage();

  const t = {
    title1: language === 'de' ? 'Allgemeine ' : 'Termini e ',
    title2: language === 'de' ? 'Geschäftsbedingungen' : 'Condizioni',
    lastUpdate: language === 'de' ? 'Letzte Aktualisierung' : 'Ultimo aggiornamento',

    s1Title: language === 'de' ? '1. Annahme der Bedingungen' : '1. Accettazione dei Termini',
    s1Text: language === 'de'
      ? 'Durch die Nutzung dieser Website und der von Coach Angelo angebotenen Dienstleistungen erklärt sich der Nutzer mit diesen Allgemeinen Geschäftsbedingungen einverstanden. Wenn Sie diese Bedingungen nicht akzeptieren, nutzen Sie die Website bitte nicht.'
      : "Utilizzando questo sito web e i servizi offerti da Coach Angelo, l'utente accetta di essere vincolato dai presenti Termini e Condizioni. Se non si accettano questi termini, si prega di non utilizzare il sito.",

    s2Title: language === 'de' ? '2. Beschreibung der Dienstleistungen' : '2. Descrizione dei Servizi',
    s2Text: language === 'de'
      ? 'Coach Angelo bietet Personal Training, Online-Coaching, personalisierte Trainingspläne und Ernährungspläne an. Die Dienstleistungen werden sowohl vor Ort (in Deutschland) als auch online erbracht.'
      : 'Coach Angelo offre servizi di personal training, coaching online, schede di allenamento personalizzate e piani alimentari. I servizi sono erogati sia in presenza (in Germania) che online.',

    s3Title: language === 'de' ? '3. Eignungsvoraussetzungen' : '3. Requisiti di Idoneità',
    s3Text: language === 'de'
      ? 'Vor Beginn eines Trainingsprogramms wird empfohlen, einen Arzt zu konsultieren. Coach Angelo haftet nicht für Verletzungen, die durch die Ausführung von Übungen ohne angemessene ärztliche Aufsicht entstehen.'
      : "Prima di iniziare qualsiasi programma di allenamento, si consiglia di consultare un medico. Coach Angelo non è responsabile per eventuali infortuni derivanti dall'esecuzione degli esercizi senza adeguata supervisione medica.",

    s4Title: language === 'de' ? '4. Zahlungen und Erstattungen' : '4. Pagamenti e Rimborsi',
    s4Text: language === 'de'
      ? 'Die Zahlung für Dienstleistungen muss im Voraus erfolgen. Für personalisierte Pakete gilt eine 14-tägige Geld-zurück-Garantie, sofern der Kunde nicht bereits mehr als 25% der Dienstleistung in Anspruch genommen hat.'
      : 'I pagamenti per i servizi devono essere effettuati anticipatamente. È prevista una garanzia "soddisfatti o rimborsati" entro 14 giorni dall\'acquisto per i percorsi personalizzati, a condizione che il cliente non abbia già usufruito di più del 25% del servizio.',

    s5Title: language === 'de' ? '5. Geistiges Eigentum' : '5. Proprietà Intellettuale',
    s5Text: language === 'de'
      ? 'Alle Inhalte auf dieser Website, einschließlich Texte, Bilder, Videos und Trainingsprogramme, sind Eigentum von Coach Angelo. Die Vervielfältigung oder Verbreitung ohne schriftliche Genehmigung ist untersagt.'
      : 'Tutti i contenuti presenti su questo sito, inclusi testi, immagini, video e programmi di allenamento, sono di proprietà di Coach Angelo. È vietata la riproduzione o distribuzione senza autorizzazione scritta.',

    s6Title: language === 'de' ? '6. Haftungsbeschränkung' : '6. Limitazione di Responsabilità',
    s6Text: language === 'de'
      ? 'Coach Angelo haftet nicht für indirekte, zufällige oder Folgeschäden, die aus der Nutzung der Dienstleistungen entstehen. Die maximale Haftung ist auf den für die Dienstleistung gezahlten Betrag beschränkt.'
      : "Coach Angelo non sarà responsabile per danni indiretti, incidentali o consequenziali derivanti dall'uso dei servizi. La responsabilità massima è limitata all'importo pagato per il servizio.",

    s7Title: language === 'de' ? '7. Änderungen der Bedingungen' : '7. Modifiche ai Termini',
    s7Text: language === 'de'
      ? 'Coach Angelo behält sich das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen werden ab dem Datum der Veröffentlichung auf der Website wirksam.'
      : 'Coach Angelo si riserva il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno efficaci dalla data di pubblicazione sul sito.',

    s8Title: language === 'de' ? '8. Anwendbares Recht' : '8. Legge Applicabile',
    s8Text: language === 'de'
      ? 'Diese Bedingungen unterliegen deutschem Recht. Für alle Streitigkeiten ist das Gericht in Köln, Deutschland, zuständig.'
      : 'Questi termini sono regolati dalla legge tedesca. Per qualsiasi controversia sarà competente il foro di Colonia, Germania.',

    s9Title: language === 'de' ? '9. Kontakt' : '9. Contatti',
    s9Text: language === 'de'
      ? 'Bei Fragen zu diesen Bedingungen kontaktieren Sie uns unter:'
      : 'Per domande sui presenti termini, contattare:',
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-ink uppercase mb-8">
          {t.title1}<span className="text-gold">{t.title2}</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-white/70 mb-6">{t.lastUpdate}: {new Date().toLocaleDateString(language === 'de' ? "de-DE" : "it-IT")}</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s1Title}</h2>
            <p className="text-white/70 mb-4">{t.s1Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s2Title}</h2>
            <p className="text-white/70 mb-4">{t.s2Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t.s3Title}</h2>
            <p className="text-white/70 mb-4">{t.s3Text}</p>
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
            <p className="text-white/70 mb-4">{t.s6Text}</p>
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
              {t.s9Text}<br />
              Email: magliarisiangelo912@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
