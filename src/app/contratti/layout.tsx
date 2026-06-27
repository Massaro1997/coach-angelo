import type { Metadata } from "next";

// Area contratti: contiene PII dei clienti, non deve essere indicizzata.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContrattiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
