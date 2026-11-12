import Entra from "../../_ui/Entra";

// Sempre dinamica: il token non deve finire in una cache condivisa.
export const dynamic = "force-dynamic";

export default async function PaginaEntra({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <Entra token={token} />;
}
