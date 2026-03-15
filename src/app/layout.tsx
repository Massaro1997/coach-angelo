import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});

const siteUrl = "https://coachangelo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Coach Angelo | Personal Trainer in Germania",
    template: "%s | Coach Angelo",
  },
  description: "Personal Trainer italiano in Germania. Trasforma il tuo corpo e la tua vita con allenamenti personalizzati. Online e in presenza. Risultati garantiti.",
  keywords: [
    "personal trainer",
    "personal trainer Germania",
    "fitness coach",
    "allenamento personalizzato",
    "personal trainer italiano",
    "dimagrimento",
    "massa muscolare",
    "coaching online",
    "trainer online",
    "fitness Italia Germania",
  ],
  authors: [{ name: "Coach Angelo" }],
  creator: "Coach Angelo",
  openGraph: {
    type: "website",
    locale: "it_IT",
    alternateLocale: "de_DE",
    url: siteUrl,
    siteName: "Coach Angelo - Personal Trainer",
    title: "Coach Angelo | Personal Trainer in Germania",
    description: "Trasforma il tuo corpo con allenamenti personalizzati. Personal Trainer italiano in Germania.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coach Angelo - Personal Trainer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coach Angelo | Personal Trainer",
    description: "Personal Trainer italiano in Germania. Allenamenti personalizzati per risultati concreti.",
    images: ["/og-image.jpg"],
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
};

// Schema.org JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Coach Angelo",
  jobTitle: "Personal Trainer",
  description: "Personal Trainer italiano in Germania specializzato in allenamenti personalizzati per dimagrimento e massa muscolare.",
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  sameAs: [],
  knowsLanguage: [
    { "@type": "Language", name: "Italian" },
    { "@type": "Language", name: "German" },
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Personal Trainer",
    occupationLocation: {
      "@type": "Country",
      name: "Germany",
    },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${lato.variable} font-sans antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
