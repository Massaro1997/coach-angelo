import type { Metadata } from "next";
import PagamentoPubblico from "./PagamentoPubblico";

export const metadata: Metadata = {
  title: "Zahlung",
  robots: { index: false, follow: false },
};

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <PagamentoPubblico token={token} />;
}
