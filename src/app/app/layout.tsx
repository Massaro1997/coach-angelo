// Layout dell'app clienti (PWA). Sta fuori da testata, piede e banner del sito
// (vedi LayoutWrapper) e ha i suoi colori: il body del sito e' ancora scuro.

import type { CSSProperties, ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { ICONE, MANIFEST_URL, TEMA } from "./_ui/pwa";
import Guscio from "./_ui/Guscio";
import RegistraSW from "./_ui/RegistraSW";
import Sessione from "./_ui/Sessione";
import { testiDi } from "./testi";

const descrizione = testiDi("de").descrizioneApp(MARCHIO.coach);

export const metadata: Metadata = {
  // absolute: niente "| FitPrimo" del sito attaccato al nome dell'app
  title: { absolute: MARCHIO.nomeApp },
  description: descrizione,
  applicationName: MARCHIO.nomeApp,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  manifest: MANIFEST_URL,
  appleWebApp: {
    capable: true,
    title: MARCHIO.nomeApp,
    // barra di stato chiara, contenuto sotto: la testata e' bianca
    statusBarStyle: "default",
  },
  icons: {
    icon: [{ url: ICONE.i192, sizes: "192x192", type: "image/png" }],
    apple: [{ url: ICONE.apple, sizes: "180x180", type: "image/png" }],
  },
  formatDetection: { telephone: false, email: false, address: false },
  // anteprima del link d'accesso su WhatsApp: l'icona dell'app, non la home del sito
  openGraph: {
    type: "website",
    siteName: MARCHIO.nome,
    title: MARCHIO.nomeApp,
    description: descrizione,
    images: [{ url: ICONE.i512, width: 512, height: 512, alt: MARCHIO.nomeApp }],
  },
  twitter: { card: "summary", title: MARCHIO.nomeApp, description: descrizione, images: [ICONE.i512] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // il grigio della testata di AppShell: barra di stato e testata tutt'uno
  themeColor: TEMA.fondo,
  colorScheme: "light",
  // Android: con la tastiera aperta la pagina si accorcia (100dvh compreso),
  // come in un'app; su iPhone ci pensa il Guscio con la visualViewport
  interactiveWidget: "resizes-content",
};

// colori del marchio come variabili: i componenti usano var(--app-colore)
const variabili = {
  "--app-colore": MARCHIO.colore,
  "--app-colore-scuro": MARCHIO.coloreScuro,
  backgroundColor: TEMA.fondo,
  color: TEMA.testo,
  WebkitTapHighlightColor: "transparent",
  touchAction: "manipulation",
} as CSSProperties;

// Regole che valgono solo dentro l'app (globals.css e' del sito):
// - html e body fermi: niente scorrimento ne' rimbalzo della pagina intera,
//   sotto il rimbalzo di iOS e dietro la tastiera non si vede il body del sito;
// - niente barre di scorrimento (sul computer quella del sito e' rossa e
//   sembrava una barra laterale): come in un'app si scorre e basta;
// - controlli da app: niente evidenziazione al tocco, niente selezione del
//   testo ne' menu del tocco lungo, niente link sottolineati;
// - le animazioni brevi di fogli e giorni (niente, se il telefono chiede meno movimento).
const CSS_APP = `
html,body{background:${TEMA.fondo};color:${TEMA.testo};height:100%;overflow:hidden;overscroll-behavior:none}
[data-app]{-webkit-text-size-adjust:100%;text-size-adjust:100%}
[data-app] :is(a,button,label,summary,[role=tab]){-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}
[data-app] a{text-decoration:none}
[data-app] *{scrollbar-width:none}
[data-app] ::-webkit-scrollbar{display:none;width:0;height:0}
[data-app][data-tastiera] .app-via-con-tastiera{display:none}
/* grafica del sito (globals.css .fp-titolo, .fp-forma): titoli Kanit corsivo maiuscolo, forme inclinate */
.app-titolo{font-family:var(--font-kanit),var(--font-archivo),sans-serif;font-style:italic;font-weight:700;text-transform:uppercase;letter-spacing:0;line-height:1.05}
.app-forma{position:absolute;border-radius:14px;transform:skewX(-12deg);pointer-events:none}
@keyframes app-appare{from{opacity:0}to{opacity:1}}
@keyframes app-su{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes app-respiro{from{transform:scale(1)}to{transform:scale(1.07)}}
@keyframes app-sale{from{transform:translateY(100%)}to{transform:none}}
@keyframes app-da-destra{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}
@keyframes app-da-sinistra{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){[data-app] *{animation:none!important;scroll-behavior:auto!important}}
`;

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Guscio style={variabili}>
      <style>{CSS_APP}</style>
      {/* accesso deciso qui per tutte le route (vedi Sessione) */}
      <Sessione>{children}</Sessione>
      <RegistraSW />
    </Guscio>
  );
}
