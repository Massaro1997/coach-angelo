// Layout dell'app clienti (PWA). Sta fuori da testata, piede e banner del sito
// (vedi LayoutWrapper) e ha i suoi colori: il body del sito e' ancora scuro.

import type { CSSProperties, ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { ICONE, MANIFEST_URL, TEMA } from "./_ui/pwa";
import RegistraSW from "./_ui/RegistraSW";
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
  themeColor: TEMA.superficie,
  colorScheme: "light",
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

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh text-[17px] leading-normal antialiased" style={variabili}>
      {/* sotto il rimbalzo di iOS e dietro la tastiera si vedrebbe il body scuro del sito */}
      <style>{`html,body{background:${TEMA.fondo};color:${TEMA.testo}}`}</style>
      {children}
      <RegistraSW />
    </div>
  );
}
