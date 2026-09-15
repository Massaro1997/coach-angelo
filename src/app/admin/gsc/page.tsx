"use client";

import AdminGate from "@/components/AdminGate";
import GSCDashboard from "./GSCDashboard";

// L'auth e' in AdminGate: cookie HttpOnly firmato lato server, la password non
// sta piu' nel bundle JS. Le rotte /api/gsc/* ricontrollano comunque il cookie.
export default function GSCAdminPage() {
  return (
    <AdminGate>
      <GSCDashboard />
    </AdminGate>
  );
}
