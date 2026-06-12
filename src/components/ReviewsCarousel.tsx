"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ReviewsCarousel() {
  const { language } = useLanguage();
  const de = language === "de";

  const reviews = de
    ? [
        { name: "Marco R.", loc: "Köln", result: "-15kg in 4 Monaten", text: "Angelo hat mir geholfen, in 4 Monaten 15kg abzunehmen. Sein Ansatz und seine ständige Motivation haben den Unterschied gemacht. Ich hätte nie gedacht, dass ich das schaffe." },
        { name: "Laura M.", loc: "Köln", result: "Muskelmasse +20%", text: "Endlich ein Trainer, der dich auch in den schwersten Momenten motiviert. Ich fühle mich stärker als je zuvor und schaue wieder gern in den Spiegel." },
        { name: "Giuseppe T.", loc: "Online", result: "Komplette Definition", text: "Das Online-Coaching ist perfekt für meinen vollen Terminkalender. Trotz Distanz fühle ich mich rundum betreut, als wäre Angelo direkt neben mir." },
        { name: "Francesca B.", loc: "Düsseldorf", result: "-12kg nach Schwangerschaft", text: "Nach der Schwangerschaft dachte ich, ich komme nie wieder in Form. Angelo hat ein perfektes Programm gebaut und heute bin ich fitter als vorher." },
      ]
    : [
        { name: "Marco R.", loc: "Colonia", result: "-15kg in 4 mesi", text: "Angelo mi ha aiutato a perdere 15kg in 4 mesi. Il suo approccio e la motivazione costante hanno fatto la differenza. Non avrei mai pensato di farcela." },
        { name: "Laura M.", loc: "Colonia", result: "Massa +20%", text: "Finalmente un trainer che ti motiva anche nei momenti più difficili. Mi sento più forte che mai e mi guardo di nuovo volentieri allo specchio." },
        { name: "Giuseppe T.", loc: "Online", result: "Definizione completa", text: "Il coaching online è perfetto per i miei impegni. Nonostante la distanza mi sento seguito al 100%, come se Angelo fosse accanto a me." },
        { name: "Francesca B.", loc: "Düsseldorf", result: "-12kg post gravidanza", text: "Dopo la gravidanza pensavo di non tornare più in forma. Angelo ha costruito un programma perfetto e oggi sono più in forma di prima." },
      ];

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIdx((i) => (i + 1) % reviews.length), [reviews.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused, idx]);

  const r = reviews[idx];

  return (
    <div
      className="relative max-w-4xl mx-auto text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* stelle */}
      <div className="flex justify-center gap-1 mb-8">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* quote grande, fade tra una e l'altra */}
      <blockquote key={idx} className="fade-in">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink leading-[1.15] mb-10">
          &ldquo;{r.text}&rdquo;
        </p>
        <div className="flex items-center justify-center gap-3 text-ink/60">
          <span className="font-bold text-ink">{r.name}</span>
          <span className="text-ink/30">·</span>
          <span>{r.loc}</span>
          <span className="text-ink/30">·</span>
          <span className="text-accent font-bold uppercase tracking-wider text-sm">{r.result}</span>
        </div>
      </blockquote>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-10">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Recensione ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-gold" : "w-2 bg-ink/20 hover:bg-ink/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
