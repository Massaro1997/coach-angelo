"use client";

import { useEffect, useState } from "react";
import { Receipt } from "lucide-react";
import { Card, Badge, Stat, EmptyState } from "./ui";

interface Riga {
  name: string;
  variant?: string;
  price: number;
  quantity: number;
}

export interface Ordine {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string;
  items: Riga[];
  totalPrice: number;
  paypalOrderId: string | null;
  paypalStatus: string | null;
  createdAt: string;
  status: string;
}

const eur = (n: number) => `${n.toLocaleString("it-IT", { minimumFractionDigits: 2 })} €`;

const dataOra = (s: string) =>
  new Date(s).toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function statoTono(o: Ordine): { label: string; tone: string } {
  if (o.status === "completed" || o.paypalStatus === "COMPLETED")
    return { label: "pagato", tone: "green" };
  if (o.status === "cancelled") return { label: "annullato", tone: "red" };
  return { label: "in attesa", tone: "amber" };
}

export default function OrdiniView() {
  const [ordini, setOrdini] = useState<Ordine[]>([]);
  const [caricando, setCaricando] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => (r.ok ? r.json() : []))
      .then(setOrdini)
      .finally(() => setCaricando(false));
  }, []);

  if (caricando) return <p className="py-10 text-sm text-neutral-400">Carico gli ordini…</p>;

  const pagati = ordini.filter((o) => o.status === "completed" || o.paypalStatus === "COMPLETED");
  const incassato = pagati.reduce((s, o) => s + (o.totalPrice || 0), 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Stat label="Ordini" value={ordini.length} tone="ink" />
        <Stat label="Pagati" value={pagati.length} tone="green" />
        <Stat label="Incassato" value={eur(incassato)} tone="brand" />
      </div>

      {ordini.length === 0 ? (
        <Card>
          <EmptyState
            titolo="Nessun ordine ricevuto."
            testo="Qui compaiono gli acquisti dei pacchetti dal sito."
            icon={<Receipt className="h-8 w-8" />}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {ordini.map((o) => {
            const st = statoTono(o);
            return (
              <Card key={o.id} bodyClassName="p-4">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-neutral-900">
                        {o.firstName} {o.lastName}
                      </p>
                      <Badge tone={st.tone}>{st.label}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-neutral-600">{o.email}</p>
                    {(o.address || o.city) && (
                      <p className="mt-0.5 text-[11px] text-neutral-400">
                        {[o.address, o.postalCode, o.city, o.country].filter(Boolean).join(", ")}
                      </p>
                    )}
                    <ul className="mt-2 space-y-0.5">
                      {(o.items || []).map((r, i) => (
                        <li key={i} className="text-xs text-neutral-600">
                          {r.quantity}× {r.name}
                          {r.variant ? ` (${r.variant})` : ""} — {eur(r.price)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold tabular-nums text-neutral-900">
                      {eur(o.totalPrice)}
                    </p>
                    <p className="mt-0.5 text-[11px] tabular-nums text-neutral-400">
                      {dataOra(o.createdAt)}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
