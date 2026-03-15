import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bewerbung - Angelo Magliarisi | Personal Trainer",
  description: "Bewerbung als Personal Trainer bei XTRAFIT - Angelo Magliarisi",
  robots: "noindex, nofollow",
};

export default function BewerbungLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Layout semplice senza Header/Footer/Cart/Cookie
  return <>{children}</>;
}
