import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // SEO FIX 2026-06-23: apex -> www con 308 PERMANENTE (era 302 temporaneo da Vercel
  // -> Google non consolidava l'indicizzazione, sito fermo). Niente loop: matcha solo apex nudo.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'angelocoach.com' }],
        destination: 'https://www.angelocoach.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
