import type { Metadata } from "next";

const siteUrl = "https://www.fitprimo.de";

export const metadata: Metadata = {
  title: "Kostenlose Erstberatung in Köln anfragen",
  description:
    "Beantworte 5 kurze Fragen und erhalte deine kostenlose Erstberatung bei FitPrimo in Köln. Antwort innerhalb von 24 Stunden, unverbindlich.",
  alternates: { canonical: `${siteUrl}/contatti` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/contatti`,
    title: "Kostenlose Erstberatung in Köln anfragen | FitPrimo",
    description: "5 kurze Fragen, Antwort innerhalb von 24 Stunden. Unverbindlich und kostenlos.",
    images: ["/opengraph-image"],
  },
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
