import type { Metadata } from "next";
import { Archivo, Kanit } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const archivo = Archivo({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  subsets: ["latin"],
});

// Il carattere dei titoli: lo stesso della scritta del logo FITPRIMO.
const kanit = Kanit({
  weight: ["600", "700"],
  style: ["italic"],
  variable: "--font-kanit",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.fitprimo.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Dal 18/10/2026 il marchio e' FitPrimo su www.fitprimo.de; "Coach Angelo" resta
  // nel default perche' la gente cerca ancora "coach angelo" / "angelo coach".
  title: {
    default: "Personal Trainer Köln | FitPrimo mit Coach Angelo",
    template: "%s | FitPrimo",
  },
  description: "Personal Trainer in Köln. WABBA Athlet. Personal Training 1-zu-1, Online Coaching und Trainingspläne. Kostenlose Erstberatung.",
  keywords: [
    "personal trainer Köln",
    "fitness coach Köln",
    "personal training Köln",
    "abnehmen coach Köln",
    "muskelaufbau Köln",
    "online coaching",
    "personal trainer italiano Germania",
    "WABBA",
  ],
  authors: [{ name: "Angelo Magliarisi" }],
  creator: "FitPrimo",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: "it_IT",
    url: siteUrl,
    siteName: "FitPrimo",
    title: "FitPrimo | Personal Trainer Köln",
    description: "Personal Training 1-zu-1, Online Coaching und Trainingspläne in Köln. Kostenlose Erstberatung.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FitPrimo, Personal Trainer Köln",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitPrimo | Personal Trainer Köln",
    description: "Personal Training 1-zu-1, Online Coaching und Trainingspläne in Köln. Kostenlose Erstberatung.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "lwHOqV9YwUVEAUtHtYYwOktOyGjaYQdJdHnLiqNuSng",
  },
};

// Schema.org JSON-LD
const sameAs = [
  "https://www.instagram.com/am_fitprimo",
  "https://www.tiktok.com/@am_fitprimo",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#angelo`,
      name: "Angelo Magliarisi",
      alternateName: "Coach Angelo",
      jobTitle: "Personal Trainer",
      description: "Personal Trainer in Köln, WABBA International Athlet. Personal Training, Online Coaching und individuelle Trainingspläne.",
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      sameAs,
      knowsLanguage: [
        { "@type": "Language", name: "Italian" },
        { "@type": "Language", name: "German" },
      ],
      areaServed: { "@type": "City", name: "Köln" },
      hasOccupation: {
        "@type": "Occupation",
        name: "Personal Trainer",
        occupationLocation: { "@type": "City", name: "Köln" },
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Personal Training in Presenza",
            description: "Allenamenti personalizzati one-to-one",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Coaching Online",
            description: "Programmi di allenamento online personalizzati",
          },
        },
      ],
    },
    {
      "@type": ["LocalBusiness", "SportsActivityLocation"],
      "@id": `${siteUrl}/#business`,
      name: "FitPrimo",
      alternateName: ["Coach Angelo", "Angelo Coach"],
      description: "Personal Training, Online Coaching und individuelle Trainingspläne in Köln. WABBA International Athlet, kostenlose Erstberatung.",
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      logo: `${siteUrl}/logo.png`,
      founder: { "@id": `${siteUrl}/#angelo` },
      sameAs,
      priceRange: "€€",
      currenciesAccepted: "EUR",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Köln",
        addressRegion: "NRW",
        addressCountry: "DE",
      },
      geo: { "@type": "GeoCoordinates", latitude: 50.9375, longitude: 6.9603 },
      areaServed: { "@type": "City", name: "Köln" },
      // Stesso valore mostrato in homepage ("4,9/5 · 100+ clienti")
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        reviewCount: "100",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${archivo.variable} ${kanit.variable} font-sans antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
