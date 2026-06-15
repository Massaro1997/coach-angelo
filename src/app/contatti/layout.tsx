import type { Metadata } from "next";

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  title: "Contatti | Coach Angelo",
  description:
    "Prenota la tua consulenza gratuita con Coach Angelo, Personal Trainer a Colonia. Rispondo entro 24 ore.",
  alternates: { canonical: `${siteUrl}/contatti` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/contatti`,
    title: "Contatti | Coach Angelo",
    description: "Prenota la tua consulenza gratuita con Coach Angelo, Personal Trainer a Colonia.",
    images: ["/og-image.jpg"],
  },
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
