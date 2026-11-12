// Manifest della PWA clienti, servito da /app/manifest.webmanifest.
// Una rotta e non un file statico: nomi e colori vengono da MARCHIO.

import { MARCHIO } from "@/lib/app-coaching/marchio";
import { ICONE, SCOPE, TEMA } from "../_ui/pwa";
import { testiDi } from "../testi";

export function GET() {
  const manifest = {
    // l'id resta fisso anche se cambiano start_url o scope: e' l'identita'
    // dell'app installata sul telefono
    id: "/app/",
    name: MARCHIO.nomeApp,
    short_name: MARCHIO.nomeApp,
    description: testiDi("de").descrizioneApp(MARCHIO.coach),
    lang: "de",
    dir: "ltr",
    start_url: SCOPE,
    scope: SCOPE,
    display: "standalone",
    orientation: "portrait",
    // fondo dello splash di Android: lo stesso dell'icona
    background_color: MARCHIO.sfondoIcona,
    // barra di stato chiara come la testata dell'app
    theme_color: TEMA.superficie,
    categories: ["health", "fitness", "lifestyle"],
    icons: [
      { src: ICONE.i192, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: ICONE.i512, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: ICONE.maskable, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
