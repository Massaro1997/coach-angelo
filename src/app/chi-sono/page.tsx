"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function ChiSono() {
  const { language } = useLanguage();
  const de = language === "de";

  return (
    <>
      {/* HERO PROFILO — mobile: foto intera + testo sotto; desktop: full-bleed sovrapposto */}
      {/* Mobile */}
      <section className="sm:hidden bg-background pt-20">
        <div className="relative w-full aspect-[16/10]">
          <Image
            src="/hero bassa.png"
            alt="Angelo Magliarisi, WABBA International Athlet"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="px-6 -mt-8 relative z-10 pb-4">
          <h1 className="text-5xl font-black text-ink uppercase leading-[0.9] mb-4">
            Angelo<br /><span className="text-accent">Magliarisi</span>
          </h1>
          <p className="text-lg text-ink/80 font-medium">
            {de
              ? "Aus Sizilien. Seit 10 Jahren in Köln. Auf der Bühne und an deiner Seite."
              : "Dalla Sicilia. Da 10 anni a Colonia. Sul palco e al tuo fianco."}
          </p>
        </div>
      </section>
      {/* Desktop */}
      <section className="hidden sm:flex relative min-h-[92vh] items-end bg-background overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero bassa.png"
            alt="Angelo Magliarisi, WABBA International Athlet"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-16 sm:pb-24">
          <h1 className="text-7xl lg:text-8xl font-black text-ink uppercase leading-[0.9] mb-5">
            Angelo<br /><span className="text-accent">Magliarisi</span>
          </h1>
          <p className="text-2xl text-ink/85 max-w-2xl font-medium">
            {de
              ? "Aus Sizilien. Seit 10 Jahren in Köln. Auf der Bühne und an deiner Seite."
              : "Dalla Sicilia. Da 10 anni a Colonia. Sul palco e al tuo fianco."}
          </p>
        </div>
      </section>

      {/* STAT BAR credibilità */}
      <section className="bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-line">
            {(de
              ? [
                  { n: "WABBA", l: "International Athlet" },
                  { n: "10+", l: "Jahre in Köln" },
                  { n: "100+", l: "Transformationen" },
                  { n: "IT · DE", l: "Zwei Sprachen" },
                ]
              : [
                  { n: "WABBA", l: "International Athlet" },
                  { n: "10+", l: "Anni a Colonia" },
                  { n: "100+", l: "Trasformazioni" },
                  { n: "IT · DE", l: "Due lingue" },
                ]
            ).map((s, i) => (
              <div key={i} className="py-8 px-3 text-center">
                <div className="text-3xl sm:text-4xl font-black text-accent mb-1">{s.n}</div>
                <div className="text-ink/55 uppercase tracking-wider text-[10px] sm:text-xs font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RACCONTO 1 — le radici, testo + foto */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase mb-8 leading-tight">
                {de ? (
                  <>Sizilien bringt dir bei, dass <span className="text-accent">nichts geschenkt</span> wird.</>
                ) : (
                  <>La Sicilia ti insegna che <span className="text-accent">niente</span> ti viene regalato.</>
                )}
              </h2>
              <div className="space-y-6 text-lg text-ink/70 leading-relaxed max-w-prose">
                <p>
                  {de
                    ? "Ich bin in einem Land aufgewachsen, in dem die Sonne brennt und das Leben dich nichts geschenkt sein lässt. Wer etwas will, steht früh auf und arbeitet dafür. Diese Haltung trage ich bis heute in mir, in jeder Wiederholung, in jedem Plan, den ich schreibe."
                    : "Sono cresciuto in una terra dove il sole picchia e la vita non ti regala niente. Chi vuole qualcosa si alza presto e se la suda. Questa mentalità me la porto dentro ancora oggi, in ogni ripetizione, in ogni scheda che scrivo."}
                </p>
                <p>
                  {de
                    ? "Vor zehn Jahren habe ich meine Koffer gepackt und alles zurückgelassen, was ich kannte. Köln war für mich eine fremde Stadt, eine Sprache, die ich nicht sprach, ein Neuanfang bei null. Ich kannte niemanden. Was ich hatte, war zwei Dinge: die Disziplin, die mir mein Land mitgegeben hat, und eine Leidenschaft, die mich nie verlassen hat, das Eisen."
                    : "Dieci anni fa ho fatto le valigie e ho lasciato tutto quello che conoscevo. Colonia per me era una città straniera, una lingua che non parlavo, ripartire da zero. Non conoscevo nessuno. Quello che avevo erano due cose: la disciplina che mi ha dato la mia terra, e una passione che non mi ha mai abbandonato, il ferro."}
                </p>
                <p>
                  {de
                    ? "Die ersten Jahre waren hart. Aber das Training war mein Anker, der eine Ort, an dem ich immer wusste, wer ich bin. Heute ist Köln mein Zuhause. Und was als Leidenschaft begann, ist zu meinem Beruf geworden, dem, in dem ich mein ganzes Herz gebe."
                    : "I primi anni sono stati duri. Ma l'allenamento è stato la mia àncora, l'unico posto dove sapevo sempre chi ero. Oggi Colonia è casa mia. E quella che era una passione è diventata il mio mestiere, quello in cui metto tutto il cuore."}
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-[480px] lg:h-[600px] rounded-xl overflow-hidden border border-line">
              <Image src="/images/Foto Angelo/angelo normale.jpg" alt="Angelo Magliarisi im Studio" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* RACCONTO 2 — sul palco, grigio scuro */}
      <section className="py-20 sm:py-28 section-dim">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative h-[480px] lg:h-[620px] rounded-xl overflow-hidden border border-line order-2 lg:order-1">
              <Image src="/images/Foto Angelo/angelo-3.jpg" alt="Angelo Magliarisi Wettkampf WABBA" fill className="object-cover object-top" />
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase mb-8 leading-tight">
                {de ? (
                  <>Ich rede nicht nur über Wettkämpfe. <span className="text-accent">Ich stehe selbst drauf.</span></>
                ) : (
                  <>Non parlo solo di gare. <span className="text-accent">Sul palco ci salgo io.</span></>
                )}
              </h2>
              <div className="space-y-6 text-lg text-ink/70 leading-relaxed max-w-prose">
                <p>
                  {de
                    ? "Als Athlet im WABBA International Verband stehe ich vor einer Jury und vor Menschen, die ihr Leben diesem Sport widmen. Diese Bühne ist gnadenlos ehrlich: Sie zeigt genau das, was du in den Monaten davor getan hast, oder eben nicht getan hast. Da gibt es keine Ausreden, keine Filter, keine Abkürzungen."
                    : "Come atleta nella federazione WABBA International salgo davanti a una giuria e a persone che dedicano la vita a questo sport. Quel palco è spietatamente onesto: mostra esattamente quello che hai fatto nei mesi prima, o che non hai fatto. Lì non ci sono scuse, non ci sono filtri, non ci sono scorciatoie."}
                </p>
                <p>
                  {de
                    ? "Genau diese Erfahrung nehme ich mit in jedes einzelne Coaching. Ich verlange von dir nichts, was ich nicht selbst jeden Tag durchziehe. Wenn ich dir sage, dass es funktioniert, dann weil ich es an meinem eigenen Körper getestet habe, nicht weil ich es in einem Buch gelesen habe."
                    : "Proprio questa esperienza la porto in ogni singolo coaching. Non ti chiedo niente che io stesso non faccia ogni giorno. Quando ti dico che funziona, è perché l'ho testato sul mio corpo, non perché l'ho letto su un libro."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RACCONTO 3 — la soddisfazione, grande citazione */}
      <section className="py-20 sm:py-32 section-light">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink leading-[1.15] mb-10">
            {de
              ? "Mein größter Sieg ist nicht meine Medaille. Es ist die Nachricht eines Kunden: „Angelo, schau mal.“"
              : "La mia vittoria più grande non è la mia medaglia. È il messaggio di un cliente: “Angelo, guarda.”"}
          </p>
          <div className="space-y-6 text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto text-left">
            <p>
              {de
                ? "Ich erinnere mich an jeden einzelnen. Den Mann, der monatelang den Spiegel gemieden hat und mir nach zwölf Wochen ein Foto schickt, auf dem er zum ersten Mal seit Jahren lächelt. Die Frau, die nach der Schwangerschaft dachte, ihr Körper gehöre nicht mehr ihr, und die heute stärker ist als mit zwanzig. Den Kollegen, der nur abnehmen wollte und am Ende ein ganz neues Verhältnis zu sich selbst gefunden hat."
                : "Mi ricordo ognuno di loro. L'uomo che per mesi ha evitato lo specchio e dopo dodici settimane mi manda una foto in cui sorride per la prima volta da anni. La donna che dopo la gravidanza pensava che il suo corpo non fosse più suo, e che oggi è più forte di quando aveva vent'anni. Il ragazzo che voleva solo dimagrire e alla fine ha trovato un rapporto completamente nuovo con se stesso."}
            </p>
            <p>
              {de
                ? "Das ist der Moment, für den ich das mache. Nicht für eine schnelle Diät, die nach zwei Wochen zusammenbricht. Sondern für die echte, dauerhafte Veränderung, die bleibt: einen Trainingsplan, der zu deinem Leben passt, eine Ernährung ohne Hungern, und jemanden, der jede Woche an deiner Seite ist, auch und gerade dann, wenn du keine Lust hast."
                : "È questo il momento per cui lo faccio. Non per una dieta veloce che crolla dopo due settimane. Ma per il cambiamento vero e duraturo, quello che resta: una scheda che entra nella tua vita, un'alimentazione senza patire la fame, e qualcuno che è al tuo fianco ogni settimana, anche e soprattutto quando non hai voglia."}
            </p>
            <p className="text-ink font-bold text-xl">
              {de
                ? "Ich bin nicht hier, um dir Wunder zu verkaufen. Ich bin hier, um den Weg mit dir zu gehen, Schritt für Schritt, bis du im Spiegel jemanden siehst, auf den du stolz bist."
                : "Non sono qui per venderti miracoli. Sono qui per fare il percorso con te, passo dopo passo, finché allo specchio non vedi una persona di cui sei fiero."}
            </p>
          </div>
        </div>
      </section>

      {/* QUALIFICHE */}
      <section className="py-20 sm:py-24 bg-background border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            {(de
              ? [
                  { t: "WABBA Athlet", d: "Aktiver Wettkampfathlet. Ich lebe, was ich coache." },
                  { t: "Italienisch & Deutsch", d: "Coaching in beiden Sprachen, für Italiener in Köln und Einheimische." },
                  { t: "Maßgeschneidert", d: "Plan um deinen Alltag, Anpassung bei Plateau, Urlaub, Verletzung." },
                  { t: "Ehrliche Ernährung", d: "Kein Hungern, keine Verbote. Eine Ernährung, die du durchhältst." },
                ]
              : [
                  { t: "Atleta WABBA", d: "Atleta agonista attivo. Vivo quello che insegno." },
                  { t: "Italiano & Tedesco", d: "Coaching in entrambe le lingue, per italiani a Colonia e locali." },
                  { t: "Su misura", d: "Piano sulla tua vita, adatto a stalli, vacanze, infortuni." },
                  { t: "Alimentazione onesta", d: "Niente fame, niente divieti. Un'alimentazione che reggi." },
                ]
            ).map((item, idx) => (
              <div key={item.t}>
                <div className="text-4xl font-black text-gold/30 mb-3">0{idx + 1}</div>
                <h2 className="font-black text-ink uppercase mb-2">{item.t}</h2>
                <p className="text-ink/60 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — foto palco */}
      <section className="relative py-28 sm:py-36 border-t border-line">
        <Image src="/images/Foto Angelo/angelo-4.jpg" alt="Coach Angelo WABBA" fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-ink uppercase mb-6 leading-tight">
            {de ? "Schreiben wir deine Geschichte" : "Scriviamo la tua storia"}
          </h2>
          <p className="text-xl text-ink/80 mb-8 max-w-2xl mx-auto">
            {de
              ? "Die erste Beratung ist kostenlos. Erzähl mir, wo du stehst, und ich zeig dir, wie dein Weg aussieht."
              : "La prima consulenza è gratuita. Raccontami dove sei, e ti mostro com'è il tuo percorso."}
          </p>
          <Link
            href="/contatti"
            className="bg-gold text-white hover:bg-gold-soft px-10 py-5 rounded-md font-bold uppercase tracking-wider text-lg transition-colors inline-block"
          >
            {de ? "Kostenlose Beratung" : "Consulenza gratuita"}
          </Link>
        </div>
      </section>
    </>
  );
}
