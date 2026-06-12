import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const archivo = Archivo({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  subsets: ["latin"],
});

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Coach Angelo | Personal Trainer Köln",
    template: "%s | Coach Angelo",
  },
  description: "Personal Trainer in Köln. WABBA International Athlet. Personal Training 1-zu-1, Online Coaching und individuelle Trainingspläne. Kostenlose Erstberatung.",
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
  verification: {
    google: "lwHOqV9YwUVEAUtHtYYwOktOyGjaYQdJdHnLiqNuSng",
  },
};

// Schema.org JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Angelo Magliarisi",
  alternateName: "Coach Angelo",
  jobTitle: "Personal Trainer",
  description: "Personal Trainer in Köln, WABBA International Athlet. Personal Training, Online Coaching und individuelle Trainingspläne.",
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  sameAs: [
    "https://www.instagram.com/angelo_fitnesscoach",
    "https://www.tiktok.com/@angelo.fitnesscoach",
  ],
  knowsLanguage: [
    { "@type": "Language", name: "Italian" },
    { "@type": "Language", name: "German" },
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Personal Trainer",
    occupationLocation: {
      "@type": "City",
      name: "Köln",
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
      <body className={`${archivo.variable} font-sans antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
