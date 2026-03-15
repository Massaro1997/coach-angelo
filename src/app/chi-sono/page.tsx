"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function ChiSono() {
  const { language } = useLanguage();

  // Translations
  const t = {
    heroTitle1: language === 'de' ? 'Über ' : 'Chi ',
    heroTitle2: language === 'de' ? 'Mich' : 'Sono',
    heroSubtitle: language === 'de'
      ? 'Meine Geschichte, meine Leidenschaft, meine Mission.'
      : 'La mia storia, la mia passione, la mia missione.',

    greeting: language === 'de' ? 'Hallo, ich bin ' : 'Ciao, sono ',
    aboutP1: language === 'de'
      ? 'Ich bin ein italienischer Personal Trainer, der seit mehreren Jahren in Deutschland lebt und arbeitet. Meine Leidenschaft für Fitness begann in meiner Jugend und seitdem habe ich nie aufgehört zu trainieren und zu lernen.'
      : 'Sono un Personal Trainer italiano che vive e lavora in Germania da diversi anni. La mia passione per il fitness è nata quando ero ancora adolescente e da allora non ho mai smesso di allenarmi e di studiare.',
    aboutP2: language === 'de'
      ? 'Ich habe verschiedene Zertifizierungen in Fitness, Ernährung und Bodybuilding erworben. Jeden Tag bilde ich mich weiter, um meinen Kunden die aktuellsten und wissenschaftlich bewährten Methoden anzubieten.'
      : 'Ho conseguito diverse certificazioni nel campo del fitness, della nutrizione e del bodybuilding. Ogni giorno continuo a formarmi per offrire ai miei clienti le metodologie più aggiornate e scientificamente provate.',
    aboutP3: language === 'de'
      ? 'Meine Mission ist einfach: Menschen dabei zu helfen, ihre Fitnessziele auf gesunde, nachhaltige und dauerhafte Weise zu erreichen. Ich glaube nicht an extreme Diäten oder unhaltbare Workouts. Ich glaube an einen ausgewogenen Ansatz, der sich an deinen Lebensstil anpasst.'
      : 'La mia missione è semplice: aiutare le persone a raggiungere i propri obiettivi di fitness in modo sano, sostenibile e duraturo. Non credo nelle diete estreme o negli allenamenti insostenibili. Credo in un approccio bilanciato che si adatti al tuo stile di vita.',
    aboutP4: language === 'de'
      ? 'Ob du Italiener in Deutschland bist und einen Trainer suchst, der deine Sprache spricht, oder Deutscher, der neugierig auf die italienische Methode ist – ich bin hier, um dir zu helfen.'
      : 'Che tu sia italiano in Germania in cerca di un trainer che parli la tua lingua, o tedesco curioso del metodo italiano, sono qui per aiutarti.',

    qualificationsTitle1: language === 'de' ? 'Meine ' : 'Le Mie ',
    qualificationsTitle2: language === 'de' ? 'Qualifikationen' : 'Qualifiche',
    qualificationsSubtitle: language === 'de'
      ? 'Kontinuierliche Weiterbildung für maximale Professionalität.'
      : 'Formazione continua per garantirti il massimo della professionalità.',

    qual1Title: language === 'de' ? 'Zertifizierter Personal Trainer' : 'Personal Trainer Certificato',
    qual1Desc: language === 'de' ? 'International anerkannte Zertifizierung' : 'Certificazione riconosciuta a livello internazionale',
    qual2Title: language === 'de' ? 'B-Lizenz' : 'Licenza B',
    qual2Desc: language === 'de' ? 'Zertifizierter Personal Trainer' : 'Personal Trainer certificato',
    qual3Title: language === 'de' ? 'Functional Training' : 'Functional Training',
    qual3Desc: language === 'de' ? 'Funktionelles Training und Verletzungsprävention' : 'Allenamento funzionale e prevenzione infortuni',
    qual4Title: language === 'de' ? 'Bodybuilding Coach' : 'Bodybuilding Coach',
    qual4Desc: language === 'de' ? 'Athletische Vorbereitung und Wettkämpfe' : 'Preparazione atletica e competizioni',

    valuesTitle1: language === 'de' ? 'Meine ' : 'I Miei ',
    valuesTitle2: language === 'de' ? 'Werte' : 'Valori',

    value1Title: language === 'de' ? 'Personalisierung' : 'Personalizzazione',
    value1Desc: language === 'de'
      ? 'Jeder Mensch ist einzigartig. Meine Programme werden maßgeschneidert für dich, deine Ziele und deinen Lebensstil erstellt.'
      : 'Ogni persona è unica. I miei programmi sono creati su misura per te, i tuoi obiettivi e il tuo stile di vita.',
    value2Title: language === 'de' ? 'Beständigkeit' : 'Costanza',
    value2Desc: language === 'de'
      ? 'Ergebnisse kommen mit Beständigkeit. Ich begleite dich Schritt für Schritt und motiviere dich in schwierigen Momenten.'
      : 'I risultati arrivano con la costanza. Ti accompagno passo dopo passo, motivandoti nei momenti difficili.',
    value3Title: language === 'de' ? 'Ergebnisse' : 'Risultati',
    value3Desc: language === 'de'
      ? 'Ich verspreche keine Wunder, ich verspreche konkrete und dauerhafte Ergebnisse basierend auf Wissenschaft und Hingabe.'
      : 'Non prometto miracoli, prometto risultati concreti e duraturi basati su scienza e dedizione.',

    ctaTitle: language === 'de' ? 'Möchtest du mehr erfahren?' : 'Vuoi Saperne di Più?',
    ctaText: language === 'de'
      ? 'Kontaktiere mich für eine kostenlose Beratung. Ich freue mich, alle deine Fragen zu beantworten.'
      : 'Contattami per una consulenza gratuita. Sarò felice di rispondere a tutte le tue domande.',
    ctaButton: language === 'de' ? 'Jetzt Kontaktieren' : 'Contattami Ora',
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 bg-neutral-900 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>

        {/* Floating gradient orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 left-20 w-80 h-80 bg-fuchsia-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            {t.heroTitle1}<span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.heroTitle2}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 bg-neutral-800 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-violet-950/10 to-neutral-800"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/8 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/Foto Angelo/angelo normale.jpg"
                alt="Coach Angelo"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t.greeting}<span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">Angelo</span>
              </h2>
              <div className="space-y-4 text-lg text-white/70">
                <p>{t.aboutP1}</p>
                <p>{t.aboutP2}</p>
                <p>{t.aboutP3}</p>
                <p>{t.aboutP4}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="relative py-20 bg-neutral-900 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-pink-950/15 to-neutral-900"></div>
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-fuchsia-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.qualificationsTitle1}<span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.qualificationsTitle2}</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {t.qualificationsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-neutral-800 rounded-2xl p-6 text-center shadow-lg">
              <h3 className="font-bold text-white text-lg mb-2">{t.qual1Title}</h3>
              <p className="text-sm text-white/70">{t.qual1Desc}</p>
            </div>

            <div className="bg-neutral-800 rounded-2xl p-6 text-center shadow-lg">
              <h3 className="font-bold text-white text-lg mb-2">{t.qual2Title}</h3>
              <p className="text-sm text-white/70">{t.qual2Desc}</p>
            </div>

            <div className="bg-neutral-800 rounded-2xl p-6 text-center shadow-lg">
              <h3 className="font-bold text-white text-lg mb-2">{t.qual3Title}</h3>
              <p className="text-sm text-white/70">{t.qual3Desc}</p>
            </div>

            <div className="bg-neutral-800 rounded-2xl p-6 text-center shadow-lg">
              <h3 className="font-bold text-white text-lg mb-2">{t.qual4Title}</h3>
              <p className="text-sm text-white/70">{t.qual4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 bg-neutral-800 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-fuchsia-950/10 to-neutral-800"></div>
        <div className="absolute top-0 left-1/3 w-[550px] h-[550px] bg-pink-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.valuesTitle1}<span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.valuesTitle2}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.value1Title}</h3>
              <p className="text-white/70">{t.value1Desc}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.value2Title}</h3>
              <p className="text-white/70">{t.value2Desc}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.value3Title}</h3>
              <p className="text-white/70">{t.value3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <Image
          src="/hero bassa.png"
          alt="Coach Angelo"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t.ctaText}
          </p>
          <Link
            href="/contatti"
            className="bg-white text-fuchsia-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all inline-block"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
