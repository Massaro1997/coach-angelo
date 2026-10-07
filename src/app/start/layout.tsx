import type { Metadata } from "next";

// La landing del codice QR su brochure e biglietto: fuori da Google (noindex),
// cosi' non fa concorrenza a /contatti, che ha le stesse domande.
export const metadata: Metadata = {
  title: "Kostenlose Erstberatung",
  description: "5 kurze Fragen, dann meldet sich Angelo innerhalb von 24 Stunden bei dir.",
  robots: { index: false, follow: false },
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
