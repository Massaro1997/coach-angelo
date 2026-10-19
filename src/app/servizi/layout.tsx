import type { Metadata } from "next";

const siteUrl = "https://www.fitprimo.de";

export const metadata: Metadata = {
  title: "Leistungen & Preise: Personal Training Köln",
  description:
    "Personal Training 1-zu-1 für 50€ pro Stunde, Online Coaching ab 150€ im Monat, Trainingspläne als PDF ab 25€. Kostenlose Erstberatung in Köln.",
  alternates: { canonical: `${siteUrl}/servizi` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/servizi`,
    title: "Leistungen & Preise: Personal Training Köln | FitPrimo",
    description: "Personal Training 1-zu-1 für 50€/Stunde, Online Coaching ab 150€/Monat, Trainingspläne ab 25€.",
    images: ["/opengraph-image"],
  },
};

export default function ServiziLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
