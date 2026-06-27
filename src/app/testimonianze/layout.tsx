import type { Metadata } from "next";

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  title: "Testimonianze | Coach Angelo",
  description:
    "Risultati reali dei clienti di Coach Angelo, Personal Trainer a Colonia. Recensioni e storie di trasformazione.",
  alternates: { canonical: `${siteUrl}/testimonianze` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/testimonianze`,
    title: "Testimonianze | Coach Angelo",
    description: "Risultati reali dei clienti di Coach Angelo, Personal Trainer a Colonia.",
    images: ["/opengraph-image"],
  },
};

export default function TestimonianzeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
