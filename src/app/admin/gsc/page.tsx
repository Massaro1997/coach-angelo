"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// La dashboard Search Console ora vive dentro il gestionale, scheda "SEO".
// Questa rotta resta solo per i vecchi segnalibri e rimanda li'.
export default function GSCAdminPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-crm-fondo">
      <p className="text-[13px] text-crm-spento">Ti porto al gestionale…</p>
    </div>
  );
}
