import type { Metadata } from "next";

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  title: "Servizi | Coach Angelo",
  description:
    "Personal Training 1-a-1, Online Coaching e schede di allenamento personalizzate. Scopri i pacchetti di Coach Angelo, Personal Trainer a Colonia.",
  alternates: { canonical: `${siteUrl}/servizi` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/servizi`,
    title: "Servizi | Coach Angelo",
    description: "Personal Training 1-a-1, Online Coaching e schede di allenamento personalizzate.",
    images: ["/og-image.jpg"],
  },
};

export default function ServiziLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
