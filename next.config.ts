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
      // 24/10/2026: indirizzi che Google mostra ancora e che davano 404. Lo slug
      // del blog vecchio aveva "lusttrotzdem" attaccato; il confronto fra
      // quartieri non esiste piu', la pagina piu' vicina e' quella del quartiere.
      // /datenschutz e' l'indirizzo che un tedesco scrive a mano.
      {
        source: '/blog/training-motivation-keine-lusttrotzdem-sport',
        destination: '/blog/training-motivation-keine-lust-trotzdem-sport',
        permanent: true,
      },
      {
        source: '/koeln-vergleich/braunsfeld-vs-ehrenfeld/online-coaching',
        destination: '/koeln/braunsfeld/online-coaching',
        permanent: true,
      },
      {
        source: '/datenschutz',
        destination: '/privacy',
        permanent: true,
      },
      // 25/10/2026: due pagine sui prezzi a Colonia. Google ha tenuto la FAQ e
      // lasciato fuori l'articolo, che sul dominio vecchio era la pagina piu'
      // vista. La FAQ si unisce all'articolo.
      {
        source: '/fitness-faq/was-kostet-personal-trainer-koeln',
        destination: '/blog/was-kostet-personal-trainer-koeln',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
