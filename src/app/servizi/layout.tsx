import type { Metadata } from "next";

const siteUrl = "https://www.fitprimo.de";

export const metadata: Metadata = {
  title: "Servizi",
  description:
    "Personal Training 1-a-1, Online Coaching e schede di allenamento personalizzate. Scopri i pacchetti di Coach Angelo, Personal Trainer a Colonia.",
  alternates: { canonical: `${siteUrl}/servizi` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/servizi`,
    title: "Servizi | FitPrimo",
    description: "Personal Training 1-a-1, Online Coaching e schede di allenamento personalizzate.",
    images: ["/opengraph-image"],
  },
};

export default function ServiziLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
