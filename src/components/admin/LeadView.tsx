"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Inbox } from "lucide-react";
import { Card, Badge, EmptyState, cx } from "./ui";

export interface Contatto {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  createdAt: string;
  read: boolean;
  referrer: string | null;
  landingPage: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

/** Da dove arriva il contatto, in una parola. */
function canale(c: Contatto): { label: string; tone: string } {
  if (c.utmSource)
    return { label: `${c.utmSource}${c.utmMedium ? ` / ${c.utmMedium}` : ""}`, tone: "violet" };
  if (!c.referrer) return { label: "Diretto", tone: "neutral" };
  try {
    const h = new URL(c.referrer).hostname.replace(/^www\./, "");
    if (h.includes("angelocoach.com")) return { label: "Diretto", tone: "neutral" };
    if (h.includes("google")) return { label: "Google", tone: "blue" };
    if (h.includes("chatgpt") || h.includes("openai")) return { label: "ChatGPT", tone: "green" };
    if (h.includes("instagram")) return { label: "Instagram", tone: "brand" };
    if (h.includes("tiktok")) return { label: "TikTok", tone: "ink" };
    if (h.includes("facebook")) return { label: "Facebook", tone: "blue" };
    return { label: h, tone: "neutral" };
  } catch {
    return { label: "Sconosciuto", tone: "neutral" };
  }
}

const dataOra = (s: string) =>
  new Date(s).toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function LeadView() {
  const [contatti, setContatti] = useState<Contatto[]>([]);
  const [caricando, setCaricando] = useState(true);
  const [soloNuovi, setSoloNuovi] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => (r.ok ? r.json() : []))
      .then(setContatti)
      .finally(() => setCaricando(false));
  }, []);

  if (caricando) return <p className="py-10 text-sm text-neutral-400">Carico i lead…</p>;

  const mostrati = soloNuovi ? contatti.filter((c) => !c.read) : contatti;
  const nuovi = contatti.filter((c) => !c.read).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setSoloNuovi(false)}
          className={cx(
            "px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-all",
            !soloNuovi
              ? "bg-neutral-900 text-white"
              : "border border-black/10 bg-white text-neutral-500 hover:border-black/30"
          )}
        >
          Tutti ({contatti.length})
        </button>
        <button
          onClick={() => setSoloNuovi(true)}
          className={cx(
            "px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-all",
            soloNuovi
              ? "bg-neutral-900 text-white"
              : "border border-black/10 bg-white text-neutral-500 hover:border-black/30"
          )}
        >
          Da leggere ({nuovi})
        </button>
      </div>

      {mostrati.length === 0 ? (
        <Card>
          <EmptyState
            titolo={soloNuovi ? "Nessun lead da leggere." : "Nessun lead ricevuto."}
            icon={<Inbox className="h-8 w-8" />}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {mostrati.map((c) => {
            const ch = canale(c);
            return (
              <Card key={c.id} bodyClassName="p-4">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-neutral-900">{c.name.trim()}</p>
                      {!c.read && <Badge tone="red">nuovo</Badge>}
                      <Badge tone={ch.tone}>{ch.label}</Badge>
                      {c.service && <Badge tone="outline">{c.service}</Badge>}
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <a
                        href={`mailto:${c.email}`}
                        className="inline-flex items-center gap-1 text-neutral-600 hover:text-gold"
                      >
                        <Mail className="h-3 w-3" />
                        {c.email}
                      </a>
                      {c.phone && (
                        <a
                          href={`tel:${c.phone}`}
                          className="inline-flex items-center gap-1 text-neutral-600 hover:text-gold"
                        >
                          <Phone className="h-3 w-3" />
                          {c.phone}
                        </a>
                      )}
                    </div>

                    <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-neutral-600">
                      {c.message}
                    </p>

                    {c.landingPage && (
                      <p className="mt-2 text-[11px] text-neutral-400">
                        Atterrato su{" "}
                        <span className="font-semibold text-neutral-500">{c.landingPage}</span>
                      </p>
                    )}
                  </div>

                  <p className="shrink-0 text-[11px] tabular-nums text-neutral-400">
                    {dataOra(c.createdAt)}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
