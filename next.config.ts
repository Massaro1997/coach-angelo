import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 serve alla foto dell'hero: a 75 le facce escono impastate.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // 18/10/2026: il sito passa da angelocoach.com a www.fitprimo.de. Ogni pagina
      // del dominio vecchio (con e senza www) va con 301 sulla stessa pagina del
      // nuovo, query comprese: serve al "Cambio di indirizzo" di Search Console.
      // /api resta fuori: webhook Stripe/PayPal e moduli gia' aperti possono
      // puntare ancora al dominio vecchio, e un redirect su una POST li romperebbe.
      {
        source: '/:path((?!api/).*)',
        has: [{ type: 'host', value: '(?:www\\.)?angelocoach\\.com' }],
        destination: 'https://www.fitprimo.de/:path',
        statusCode: 301,
      },
      // 04/10/2026: la pagina delle testimonianze non c'e' piu', recensioni e
      // trasformazioni stanno in fondo a ogni pagina. L'indirizzo vecchio e'
      // indicizzato, quindi porta alla home invece di dare 404.
      {
        source: '/testimonianze',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
