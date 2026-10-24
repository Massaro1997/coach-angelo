"use client";

// 24/10/2026: in Germania l'Impressum e' obbligatorio (§ 5 DDG) e il sito non
// lo aveva. Indirizzo confermato da Calogero; CAP di Frechen 50226.
// Kleinunternehmer (§ 19 UStG): nessuna USt-IdNr da indicare.

import { useLanguage } from "@/context/LanguageContext";

const ANBIETER = {
  name: "Angelo Magliarisi",
  marchio: "FitPrimo – Personal Training",
  strasse: "Freiheitsring 1",
  ort: "50226 Frechen",
  telefon: "+49 176 93193043",
  email: "magliarisiangelo912@gmail.com",
};

export default function Impressum() {
  const { language } = useLanguage();
  const de = language === 'de';

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl fp-titolo text-ink mb-8">
          {de ? 'Impressum' : 'Note '}<span className="text-gold">{de ? '' : 'legali'}</span>
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-ink mb-4">
              {de ? 'Angaben gemäß § 5 DDG' : 'Informazioni ai sensi del § 5 DDG'}
            </h2>
            <p className="text-ink/70 mb-4">
              {ANBIETER.name}<br />
              {ANBIETER.marchio}<br />
              {ANBIETER.strasse}<br />
              {ANBIETER.ort}<br />
              {de ? 'Deutschland' : 'Germania'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-ink mb-4">{de ? 'Kontakt' : 'Contatti'}</h2>
            <p className="text-ink/70 mb-4">
              {de ? 'Telefon' : 'Telefono'}: <a href="tel:+4917693193043">{ANBIETER.telefon}</a><br />
              E-Mail: <a href={`mailto:${ANBIETER.email}`}>{ANBIETER.email}</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-ink mb-4">
              {de ? 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV' : 'Responsabile dei contenuti (§ 18 comma 2 MStV)'}
            </h2>
            <p className="text-ink/70 mb-4">
              {ANBIETER.name}, {ANBIETER.strasse}, {ANBIETER.ort}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
