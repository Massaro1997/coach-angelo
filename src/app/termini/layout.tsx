import type { Metadata } from "next";

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  title: "Termini e Condizioni | Coach Angelo",
  description: "Termini e condizioni di utilizzo dei servizi di Coach Angelo, Personal Trainer a Colonia.",
  alternates: { canonical: `${siteUrl}/termini` },
};

export default function TerminiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
