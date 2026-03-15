import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lebenslauf - Angelo Magliarisi | Personal Trainer",
  description: "Lebenslauf von Angelo Magliarisi - Fitnesstrainer",
  robots: "noindex, nofollow",
};

export default function LebenslaufLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
