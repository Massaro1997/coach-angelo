"use client";

import { useState } from "react";
import Image from "next/image";

// Coach data - fixed
const COACH = {
  name: "Angelo Magliarisi",
  address: "Köln, Deutschland",
  fullAddress: "Köln, Deutschland",
  email: "magliarisiangelo912@gmail.com",
  phone: "+49 176 93193043",
  taxId: "224/5190/4079",
  bankName: "N26 Bank",
  bankIban: "DE61 1001 1001 2627 6180 39",
  bankBic: "NTSBDEB1XXX",
};

// ============ TYPES ============

type PageView = "menu" | "contract-form" | "contract-preview" | "blank-preview" | "rechnung-form" | "rechnung-preview";

interface ContractData {
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  clientDob: string;
  serviceType: string;
  duration: string;
  sessionsPerWeek: string;
  monthlyPrice: string;
  paymentType: string;
  paymentMethod: string;
  einmalMethod: string;
  startDate: string;
  location: string;
  notes: string;
  accountHolder: string;
  iban: string;
  bic: string;
}

interface RechnungData {
  clientName: string;
  clientAddress: string;
  clientCity: string;
  rechnungNr: string;
  rechnungDate: string;
  leistungszeitraum: string;
  items: { title: string; desc: string; qty: number; price: number }[];
  notes: string;
}

// ============ CONSTANTS ============

const SERVICE_OPTIONS = [
  "Personal Training 1-to-1",
  "Online-Coaching 3 Monate (€300)",
  "Online-Coaching 6 Monate (€600)",
  "Online-Coaching 12 Monate (€950)",
  "Individueller Trainingsplan",
];

const DURATION_OPTIONS = ["1 Monat", "3 Monate", "6 Monate", "12 Monate", "Einzelsitzung"];

const PAYMENT_TYPE_OPTIONS = ["Einmalzahlung", "Monatliche Ratenzahlung"];

const PAYMENT_OPTIONS = ["SEPA-Lastschrift (Dauerauftrag)", "Einmalzahlung"];

const EINMAL_OPTIONS = ["Barzahlung", "PayPal", "Kreditkarte", "Überweisung"];

// ============ MAIN COMPONENT ============

export default function ContrattiPage() {
  const [view, setView] = useState<PageView>("menu");

  const [formData, setFormData] = useState<ContractData>({
    clientName: "", clientAddress: "", clientEmail: "", clientPhone: "", clientDob: "",
    serviceType: SERVICE_OPTIONS[0], duration: DURATION_OPTIONS[0], sessionsPerWeek: "3",
    monthlyPrice: "", paymentType: PAYMENT_TYPE_OPTIONS[0], paymentMethod: PAYMENT_OPTIONS[0],
    einmalMethod: EINMAL_OPTIONS[0], startDate: new Date().toISOString().split("T")[0],
    location: "Köln", notes: "", accountHolder: "", iban: "", bic: "",
  });

  const [paypalLink, setPaypalLink] = useState<string | null>(null);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);

  const [rechnungData, setRechnungData] = useState<RechnungData>({
    clientName: "", clientAddress: "", clientCity: "",
    rechnungNr: "2026-004", rechnungDate: new Date().toISOString().split("T")[0],
    leistungszeitraum: new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" }),
    items: [{ title: "", desc: "", qty: 1, price: 0 }],
    notes: "",
  });

  const updateField = (field: keyof ContractData, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));
  const updateRechnung = (field: keyof RechnungData, value: string | RechnungData["items"]) => setRechnungData((prev) => ({ ...prev, [field]: value }));

  // ============ HELPERS ============
  const formatDateDE = (dateStr: string) => {
    if (!dateStr) return "_______________";
    const d = new Date(dateStr);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const todayDE = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
  const blank = "_______________";
  // Wider blank line for handwriting in blank contract
  const blankLine = <span className="inline-block border-b-2 border-neutral-300 min-w-[200px] w-full">&nbsp;</span>;
  const blankShort = <span className="inline-block border-b-2 border-neutral-300 min-w-[120px]">&nbsp;</span>;

  const getMonths = (duration: string): number => {
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 1;
  };
  const months = getMonths(formData.duration);
  const isInstallment = formData.paymentType === "Monatliche Ratenzahlung" && months > 1;
  const monthlyPrice = formData.monthlyPrice ? parseFloat(formData.monthlyPrice) : 0;
  const monthlyPriceStr = monthlyPrice ? monthlyPrice.toFixed(2) : "";
  const isSepa = formData.paymentMethod === "SEPA-Lastschrift (Dauerauftrag)";
  const resolvedPayment = isSepa ? "SEPA-Lastschrift" : formData.einmalMethod;

  const formatIBAN = (raw: string) => raw.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
  const mandateRef = `CA-${formData.startDate.replace(/-/g, "")}-${formData.clientName.replace(/\s/g, "").substring(0, 6).toUpperCase() || "XXXXX"}`;

  // Rechnung helpers
  const rechnungTotal = rechnungData.items.reduce((s, i) => s + i.qty * i.price, 0);
  const addDays = (dateStr: string, days: number) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  };
  const zahlungsziel = addDays(rechnungData.rechnungDate, 14);

  // ========================================
  // MENU VIEW
  // ========================================
  if (view === "menu") {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Documenti{" "}
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">Coach Angelo</span>
            </h1>
            <p className="text-white/50">Scegli il documento da generare</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Contratto compilato */}
            <button type="button" onClick={() => setView("contract-form")}
              className="bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-fuchsia-500/50 rounded-2xl p-8 text-left transition-all group">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-fuchsia-300 transition-colors">Contratto Compilato</h3>
              <p className="text-white/50 text-sm">Compila i dati del cliente e genera il contratto in PDF</p>
            </button>

            {/* Contratto vuoto */}
            <button type="button" onClick={() => setView("blank-preview")}
              className="bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-violet-500/50 rounded-2xl p-8 text-left transition-all group">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">Contratto Vuoto</h3>
              <p className="text-white/50 text-sm">Scarica il contratto vuoto da compilare a mano</p>
            </button>

            {/* Rechnung */}
            <button type="button" onClick={() => setView("rechnung-form")}
              className="bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-pink-500/50 rounded-2xl p-8 text-left transition-all group">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">Rechnung</h3>
              <p className="text-white/50 text-sm">Genera una fattura professionale in PDF</p>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ============ PRINT CSS (shared) ============
  const printCSS = (
    <style jsx global>{`
      @media print {
        @page { size: A4; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
        .no-print { display: none !important; }
        .print-wrapper { margin: 0 !important; padding: 0 !important; background: white !important; min-height: auto !important; gap: 0 !important; display: block !important; }
        .contract-page, .invoice-page { width: 210mm !important; height: 297mm !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; break-after: page; overflow: hidden !important; }
        .contract-page:last-child, .invoice-page:last-child { break-after: auto; }
      }
    `}</style>
  );

  // Generate Rechnung from contract data
  const generateRechnungFromContract = () => {
    const mp = formData.monthlyPrice ? parseFloat(formData.monthlyPrice) : 0;
    const m = getMonths(formData.duration);
    const isRate = formData.paymentType === "Monatliche Ratenzahlung" && m > 1;

    // Split address into street + city if possible (e.g. "Musterstraße 12, 50667 Köln")
    const addrParts = formData.clientAddress.split(",").map(s => s.trim());
    const street = addrParts[0] || formData.clientAddress;
    const city = addrParts[1] || "";

    setRechnungData({
      clientName: formData.clientName,
      clientAddress: street,
      clientCity: city,
      rechnungNr: rechnungData.rechnungNr, // keep current number
      rechnungDate: new Date().toISOString().split("T")[0],
      leistungszeitraum: new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" }),
      items: isRate
        ? [{ title: formData.serviceType, desc: `Monatliche Rate (${formData.duration})`, qty: 1, price: mp }]
        : [{ title: formData.serviceType, desc: formData.duration, qty: 1, price: mp * m }],
      notes: "",
    });
    setView("rechnung-form");
  };

  // Generate PayPal subscription link
  const generatePayPalLink = async () => {
    if (!monthlyPrice || !formData.clientName) {
      setPaypalError("Inserisci nome cliente e prezzo mensile");
      return;
    }
    setPaypalLoading(true);
    setPaypalError(null);
    setPaypalLink(null);

    try {
      const res = await fetch("/api/paypal/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: formData.serviceType,
          monthlyPrice: monthlyPrice,
          totalCycles: months,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail || undefined,
        }),
      });

      const data = await res.json();

      if (data.approvalUrl) {
        setPaypalLink(data.approvalUrl);
      } else {
        setPaypalError(data.error || "Errore nella creazione dell'abbonamento");
      }
    } catch {
      setPaypalError("Errore di connessione");
    } finally {
      setPaypalLoading(false);
    }
  };

  // ============ TOOLBAR ============
  const Toolbar = ({ onBack, label, extraButton }: { onBack: () => void; label?: string; extraButton?: React.ReactNode }) => (
    <div className="no-print fixed top-0 left-0 right-0 z-50 bg-neutral-900 border-b border-neutral-700 px-6 py-4 flex items-center justify-between">
      <button type="button" onClick={onBack} className="text-white/70 hover:text-white flex items-center gap-2 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Zurück
      </button>
      {label && <span className="text-white/40 text-sm hidden sm:block">{label}</span>}
      <div className="flex items-center gap-3">
        {extraButton}
        <button type="button" onClick={() => window.print()}
          className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-6 py-2.5 rounded-full font-semibold hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Drucken / PDF
        </button>
      </div>
    </div>
  );

  // ============ CONTRACT PAGE CONTENT (shared between filled & blank) ============
  const contractPageContent = (filled: boolean) => {
    const cn = filled ? formData.clientName : blank;
    const ca = filled ? formData.clientAddress : blank;
    const ce = filled ? formData.clientEmail : blank;
    const cp = filled ? formData.clientPhone : blank;
    const cd = filled && formData.clientDob ? formatDateDE(formData.clientDob) : blank;
    const sd = filled ? formatDateDE(formData.startDate) : blank;
    const dur = filled ? formData.duration : blank;
    const svc = filled ? formData.serviceType : blank;
    const spw = filled ? formData.sessionsPerWeek : "___";
    const loc = filled ? (formData.location || "nach Vereinbarung") : blank;
    const pay = filled ? resolvedPayment : blank;
    const mp = filled && monthlyPriceStr ? `€${monthlyPriceStr}` : blank;
    const mpFull = filled && monthlyPriceStr ? `€${monthlyPriceStr}/Monat` : blank;
    const showSepa = filled && isSepa;

    return (
      <>
        {/* ==================== PAGE 1 ==================== */}
        <div className="contract-page w-[210mm] h-[297mm] bg-white text-black shadow-2xl overflow-hidden"
          style={{ fontFamily: "'Lato', 'Helvetica Neue', Arial, sans-serif", padding: "10px" }}>
          <div className="flex flex-col h-full overflow-hidden rounded-sm">
            {/* HEADER */}
            <div className="bg-neutral-800 flex items-center justify-between flex-shrink-0" style={{ padding: "14px 18mm" }}>
              <Image src="/logo-bianco.png" alt="Coach Angelo" width={130} height={42} className="h-9 w-auto" unoptimized />
              <div className="text-right">
                <p className="text-white text-[13px] font-semibold tracking-wide uppercase">Coaching-Vertrag</p>
                <p className="text-white/50 text-[10px] mt-0.5">{filled ? todayDE : blank} &mdash; {loc}</p>
              </div>
            </div>
            <div className="h-[3px] flex-shrink-0" style={{ background: "linear-gradient(90deg, #ec4899, #a855f7, #6366f1)" }} />

            <div className="flex-1 text-[11.5px] leading-[1.6] text-neutral-600" style={{ padding: "28px 18mm 16px" }}>
              <Heading>§1 Vertragsparteien</Heading>
              <div className="grid grid-cols-2 gap-10 mb-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-1">Coach (Auftragnehmer)</p>
                  <p className="font-bold text-[14px] text-black">{COACH.name}</p>
                  <p className="text-neutral-500 mt-1.5 leading-relaxed">{COACH.address}<br/>E-Mail: {COACH.email}<br/>Tel.: {COACH.phone}</p>
                  {COACH.taxId && <p className="text-neutral-500">USt-ID: {COACH.taxId}</p>}
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-1">Kunde (Auftraggeber)</p>
                  {filled ? (
                    <>
                      <p className="font-bold text-[14px] text-black">{cn}</p>
                      <p className="text-neutral-500 mt-1.5 leading-relaxed">{ca}<br/>E-Mail: {ce}<br/>Tel.: {cp}</p>
                      {formData.clientDob && <p className="text-neutral-500">Geb.: {cd}</p>}
                    </>
                  ) : (
                    <div className="space-y-3 mt-2">
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-14">Name:</span>{blankLine}</div>
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-14">Adresse:</span>{blankLine}</div>
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-14">E-Mail:</span>{blankLine}</div>
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-14">Tel.:</span>{blankLine}</div>
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-14">Geb.:</span>{blankLine}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* SERVICE CARD */}
              <div className="bg-neutral-50 rounded-lg border border-neutral-200 mb-6" style={{ padding: "16px 18px" }}>
                <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-2.5">Leistungsübersicht</p>
                {filled ? (
                  <>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
                      <div><span className="text-neutral-400 text-[10px]">Leistung</span><p className="font-semibold text-black text-[11.5px]">{svc}</p></div>
                      <div><span className="text-neutral-400 text-[10px]">Laufzeit</span><p className="font-semibold text-black text-[11.5px]">{dur}</p></div>
                      <div><span className="text-neutral-400 text-[10px]">Sitzungen/Woche</span><p className="font-semibold text-black text-[11.5px]">{spw}</p></div>
                      <div><span className="text-neutral-400 text-[10px]">Beginn</span><p className="font-semibold text-black text-[11.5px]">{sd}</p></div>
                      <div><span className="text-neutral-400 text-[10px]">Ort</span><p className="font-semibold text-black text-[11.5px]">{loc}</p></div>
                      <div><span className="text-neutral-400 text-[10px]">Zahlung</span><p className="font-semibold text-black text-[11.5px]">{pay}</p></div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between">
                      <div>
                        <span className="text-neutral-400 text-[10.5px]">Monatliche Vergütung</span>
                        {isInstallment && <p className="text-neutral-500 text-[10px] mt-0.5">{months} Monate Laufzeit</p>}
                      </div>
                      <span className="text-[17px] font-bold text-black">{mpFull}</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-28">Leistung:</span>{blankLine}</div>
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-28">Laufzeit:</span>{blankLine}</div>
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-28">Sitzungen/Woche:</span>{blankLine}</div>
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-28">Beginn:</span>{blankLine}</div>
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-28">Ort:</span>{blankLine}</div>
                      <div className="flex items-end gap-2"><span className="text-neutral-400 text-[10px] whitespace-nowrap w-28">Zahlung:</span>{blankLine}</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-neutral-200 flex items-end gap-2">
                      <span className="text-neutral-400 text-[10.5px] whitespace-nowrap">Monatliche Vergütung:</span>{blankLine}
                    </div>
                  </div>
                )}
              </div>

              <Heading>§2 Gegenstand des Vertrages</Heading>
              <p className="mb-5">
                Der Coach bietet dem Kunden ein Coaching-Programm im Bereich Fitness und Personal Training an,
                wie in der obigen Leistungsübersicht beschrieben. Das Coaching umfasst persönliche Trainingssitzungen,
                individuelle Trainingsplanung sowie unterstützende Beratung. Das Coaching stellt keine medizinische,
                psychologische oder therapeutische Behandlung dar.
              </p>

              <Heading>§3 Vertragsdauer</Heading>
              <p className="mb-5">
                Der Vertrag beginnt am {filled ? sd : blankShort} und hat eine Laufzeit von {filled ? dur : blankShort}.
                Eine automatische Verlängerung erfolgt nicht. Eine Verlängerung bedarf einer gesonderten schriftlichen Vereinbarung.
              </p>

              <Heading>§4 Vergütung und Zahlung</Heading>
              <p className="mb-5">
                Die monatliche Vergütung beträgt <strong className="text-black">{filled ? mp : blankShort}</strong>.
                {filled && isInstallment ? (
                  <> Die Zahlung erfolgt in <strong className="text-black">{months} monatlichen Raten</strong>,
                  jeweils fällig zum Monatsanfang, per {pay}.
                  {showSepa && " Der Einzug erfolgt mittels SEPA-Lastschrift gemäß dem beigefügten Lastschriftmandat."}</>
                ) : filled ? (
                  <> Die Zahlung erfolgt per {pay}.
                  {showSepa && " Der Einzug erfolgt mittels SEPA-Lastschrift gemäß dem beigefügten Lastschriftmandat."}</>
                ) : (
                  <> Die Zahlung erfolgt per {blankShort}.</>
                )}
                {" "}Bei Zahlungsverzug von mehr als 14 Tagen behält sich der Coach das Recht vor, die Leistungen
                auszusetzen. Verzugszinsen können gemäß §288 BGB erhoben werden.
                {filled && isInstallment && " Bei Ausbleiben von zwei aufeinanderfolgenden Zahlungen behält sich der Coach das Recht vor, den Vertrag fristlos zu kündigen."}
              </p>

              <Heading>§5 Termine und Absagen</Heading>
              <p className="mb-5">
                Vereinbarte Termine können bis spätestens <strong className="text-black">24 Stunden</strong> vorher kostenfrei verschoben
                oder abgesagt werden. Bei späterer Absage oder Nichterscheinen gilt der Termin als durchgeführt und wird vollständig berechnet.
              </p>

              <Heading>§6 Pflichten des Kunden</Heading>
              <p className="mb-5">
                Der Kunde verpflichtet sich, die Anweisungen des Coaches zu befolgen, alle gesundheitlichen
                Einschränkungen vor Beginn mitzuteilen, die Zahlungen fristgerecht zu leisten und aktiv
                an der Erreichung der vereinbarten Ziele mitzuwirken.
              </p>

              <Heading>§7 Haftungsausschluss</Heading>
              <p>
                Der Coach haftet nur bei Vorsatz oder grober Fahrlässigkeit. Das Coaching stellt keine Garantie
                für bestimmte Ergebnisse dar. Der Kunde erklärt, gesundheitlich für sportliche Aktivitäten geeignet
                zu sein. Für Verletzungen außerhalb der Sitzungen oder bei Verschweigen von Vorerkrankungen
                übernimmt der Coach keine Haftung.
              </p>
            </div>

            <div className="border-t border-neutral-200 flex items-center justify-between text-[9px] text-neutral-400 flex-shrink-0" style={{ padding: "10px 16mm" }}>
              <span>{COACH.name} &mdash; Personal Training &amp; Fitness Coaching</span>
              <span>Seite 1 von 2</span>
            </div>
          </div>
        </div>

        {/* ==================== PAGE 2 ==================== */}
        <div className="contract-page w-[210mm] h-[297mm] bg-white text-black shadow-2xl overflow-hidden"
          style={{ fontFamily: "'Lato', 'Helvetica Neue', Arial, sans-serif", padding: "10px" }}>
          <div className="flex flex-col h-full overflow-hidden rounded-sm">
            <div className="bg-neutral-800 flex items-center justify-between flex-shrink-0" style={{ padding: "10px 16mm" }}>
              <p className="text-white/80 text-[10.5px] font-semibold tracking-wide uppercase">Coaching-Vertrag &mdash; {COACH.name}</p>
              <p className="text-white/50 text-[10.5px]">{filled ? todayDE : blank}</p>
            </div>
            <div className="h-[2px] flex-shrink-0" style={{ background: "linear-gradient(90deg, #ec4899, #a855f7, #6366f1)" }} />

            <div className="flex-1 text-[11.5px] leading-[1.6] text-neutral-600" style={{ padding: "28px 18mm 16px" }}>
              <Heading>§8 Vertraulichkeit</Heading>
              <p className="mb-5">Alle im Coaching besprochenen Inhalte werden vertraulich behandelt. Eine Weitergabe an Dritte erfolgt nur mit schriftlicher Zustimmung der anderen Partei.</p>

              <Heading>§9 Datenschutz (DSGVO)</Heading>
              <p className="mb-5">Die Verarbeitung personenbezogener Daten erfolgt gemäß der DSGVO. Die Daten werden ausschließlich zur Vertragsabwicklung verwendet. Der Kunde hat jederzeit Recht auf Auskunft, Berichtigung und Löschung seiner Daten.</p>

              <Heading>§10 Widerrufsrecht</Heading>
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg mb-5" style={{ padding: "14px 16px" }}>
                <p className="font-semibold text-black mb-2 text-[12px]">Widerrufsbelehrung</p>
                <p>Der Kunde hat das Recht, diesen Vertrag innerhalb von <strong className="text-black">14 Tagen</strong> ohne Angabe von Gründen zu widerrufen. Die Frist beträgt 14 Tage ab Vertragsabschluss. Der Widerruf erfolgt per E-Mail. Bereits geleistete Zahlungen werden innerhalb von 14 Tagen zurückerstattet. Der Kunde stimmt zu, dass das Coaching vor Ablauf der Widerrufsfrist beginnen kann; in diesem Fall ist ein anteiliger Betrag zu zahlen.</p>
              </div>

              <Heading>§11 Gerichtsstand</Heading>
              <p className="mb-5">Gerichtsstand ist <strong className="text-black">Köln, Deutschland</strong>. Es gilt ausschließlich deutsches Recht.</p>

              <Heading>§12 Salvatorische Klausel</Heading>
              <p className="mb-6">Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam. An die Stelle der unwirksamen Bestimmung tritt eine Regelung, die dem wirtschaftlichen Zweck möglichst nahekommt.</p>

              {/* SEPA LASTSCHRIFTMANDAT */}
              {showSepa && (
                <div className="mb-5 border-2 border-neutral-300 rounded-lg" style={{ padding: "14px 16px" }}>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-neutral-800 font-bold mb-2">SEPA-Lastschriftmandat</p>
                  <p className="text-[10px] text-neutral-500 mb-3">Mandatsreferenz: {mandateRef} &bull; Gläubiger-ID: {COACH.name}, {COACH.address}</p>
                  <p className="mb-2.5">
                    Ich ermächtige <strong className="text-black">{COACH.name}</strong>, Zahlungen von meinem Konto mittels
                    SEPA-Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von {COACH.name} auf
                    mein Konto gezogenen Lastschriften einzulösen.
                  </p>
                  <p className="mb-3 text-[10.5px] text-neutral-500">
                    Hinweis: Ich kann innerhalb von 8 Wochen, beginnend mit dem Belastungsdatum, die Erstattung des
                    belasteten Betrages verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.
                  </p>
                  <div className="grid grid-cols-2 gap-6 bg-neutral-50 rounded border border-neutral-200" style={{ padding: "10px 14px" }}>
                    <div>
                      <span className="text-neutral-400 text-[10px]">Kontoinhaber</span>
                      <p className="font-semibold text-black text-[11.5px]">{formData.accountHolder || formData.clientName || blank}</p>
                    </div>
                    <div>
                      <span className="text-neutral-400 text-[10px]">IBAN</span>
                      <p className="font-semibold text-black text-[11.5px] font-mono tracking-wide">{formData.iban ? formatIBAN(formData.iban) : blank}</p>
                    </div>
                    {formData.bic && (
                      <div>
                        <span className="text-neutral-400 text-[10px]">BIC</span>
                        <p className="font-semibold text-black text-[11.5px] font-mono">{formData.bic}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-neutral-400 text-[10px]">Einzugsbetrag</span>
                      <p className="font-semibold text-black text-[11.5px]">{mpFull}</p>
                    </div>
                  </div>
                </div>
              )}


              {/* NOTES */}
              {filled && formData.notes && (
                <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 rounded-r" style={{ padding: "12px 16px" }}>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-amber-600 font-bold mb-1.5">Sonstige Vereinbarungen</p>
                  <p className="text-neutral-700">{formData.notes}</p>
                </div>
              )}
              {!filled && (
                <div className="mb-6">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-3">Sonstige Vereinbarungen</p>
                  <div className="border-b-2 border-neutral-300 h-7 mb-1" />
                  <div className="border-b-2 border-neutral-300 h-7 mb-1" />
                  <div className="border-b-2 border-neutral-300 h-7" />
                </div>
              )}

              {/* SIGNATURES */}
              <div className="border-t border-neutral-300 pt-7 mt-auto">
                <p className="text-[9.5px] uppercase tracking-[0.12em] text-neutral-400 font-bold mb-6">Unterschriften</p>
                <div className="grid grid-cols-2 gap-14">
                  <div>
                    <p className="text-neutral-400 text-[10.5px] mb-1">Ort, Datum</p>
                    {filled ? (
                      <p className="font-semibold text-[11.5px] text-black mb-12">{formData.location}, {formatDateDE(formData.startDate)}</p>
                    ) : (
                      <div className="border-b-2 border-neutral-300 h-7 mb-10" />
                    )}
                    <div className="border-b-2 border-neutral-800 w-full" />
                    <p className="text-[10px] text-neutral-500 mt-2">{COACH.name} (Coach)</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-[10.5px] mb-1">Ort, Datum</p>
                    {filled ? (
                      <p className="font-semibold text-[11.5px] text-black mb-12">{formData.location}, {formatDateDE(formData.startDate)}</p>
                    ) : (
                      <div className="border-b-2 border-neutral-300 h-7 mb-10" />
                    )}
                    <div className="border-b-2 border-neutral-800 w-full" />
                    <p className="text-[10px] text-neutral-500 mt-2">{filled ? cn : "Kunde/in"} (Kunde)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-200 flex items-center justify-between text-[9px] text-neutral-400 flex-shrink-0" style={{ padding: "10px 16mm" }}>
              <span>{COACH.name} &mdash; {COACH.address} &mdash; {COACH.email}</span>
              <span>Seite 2 von 2</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  // ========================================
  // CONTRACT PREVIEW (filled)
  // ========================================
  if (view === "contract-preview") {
    return (
      <>
        {printCSS}
        <Toolbar onBack={() => setView("contract-form")} label="Coaching-Vertrag"
          extraButton={
            <div className="flex items-center gap-2">
              <button type="button" onClick={generateRechnungFromContract}
                className="border border-pink-500/50 text-pink-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-500/10 transition-all flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Rechnung
              </button>
              {monthlyPrice > 0 && (
                <button type="button" onClick={generatePayPalLink} disabled={paypalLoading}
                  className="border border-blue-500/50 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-500/10 transition-all flex items-center gap-2 disabled:opacity-50">
                  {paypalLoading ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" /></svg>
                  )}
                  PayPal Link
                </button>
              )}
            </div>
          } />
        {/* PayPal Link Result - Fixed overlay */}
        {(paypalLink || paypalError) && (
          <div className="no-print fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
            <div className="max-w-xl w-full">
              {paypalLink && (
                <div className="bg-neutral-900 border border-green-500/40 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-green-400 font-bold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Link PayPal creato!
                    </p>
                    <button type="button" aria-label="Chiudi" onClick={() => setPaypalLink(null)} className="text-white/40 hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <p className="text-white/60 text-sm mb-4">Manda questo link al cliente. Paga con PayPal o carta — ogni mese viene addebitato €{monthlyPriceStr} per {months} mesi.</p>
                  <input readOnly value={paypalLink} aria-label="PayPal Link"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-600 text-white text-sm font-mono mb-4" />
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => { navigator.clipboard.writeText(paypalLink); }}
                      className="flex-1 bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                      Copia Link
                    </button>
                    <a href={`https://wa.me/?text=${encodeURIComponent(`Hallo ${formData.clientName},\n\nhier ist der Link für dein Coaching-Abo (€${monthlyPriceStr}/Monat):\n${paypalLink}\n\nViele Grüße,\nAngelo`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.822-6.34-2.2l-.144-.112-3.1 1.04 1.04-3.1-.112-.144A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
              {paypalError && (
                <div className="bg-neutral-900 border border-red-500/40 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <p className="text-red-400 font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {paypalError}
                    </p>
                    <button type="button" onClick={() => setPaypalError(null)} className="text-white/40 hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PayPal Loading overlay */}
        {paypalLoading && (
          <div className="no-print fixed inset-0 z-[60] bg-black/70 flex items-center justify-center">
            <div className="bg-neutral-900 border border-blue-500/30 rounded-2xl p-8 text-center shadow-2xl">
              <svg className="w-10 h-10 animate-spin text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              <p className="text-white font-semibold">Creazione abbonamento PayPal...</p>
              <p className="text-white/50 text-sm mt-1">Attendere prego</p>
            </div>
          </div>
        )}

        <div className="print-wrapper min-h-screen bg-neutral-800 pt-24 pb-16 flex flex-col items-center gap-10">
          {contractPageContent(true)}
        </div>
      </>
    );
  }

  // ========================================
  // BLANK CONTRACT PREVIEW
  // ========================================
  if (view === "blank-preview") {
    return (
      <>
        {printCSS}
        <Toolbar onBack={() => setView("menu")} label="Contratto Vuoto" />
        <div className="print-wrapper min-h-screen bg-neutral-800 pt-24 pb-16 flex flex-col items-center gap-10">
          {contractPageContent(false)}
        </div>
      </>
    );
  }

  // ========================================
  // RECHNUNG PREVIEW
  // ========================================
  if (view === "rechnung-preview") {
    return (
      <>
        {printCSS}
        <Toolbar onBack={() => setView("rechnung-form")} label={`Rechnung ${rechnungData.rechnungNr}`} />
        <div className="print-wrapper min-h-screen bg-neutral-800 pt-24 pb-16 flex flex-col items-center gap-10">
          <div className="invoice-page w-[210mm] h-[297mm] bg-white text-black shadow-2xl overflow-hidden"
            style={{ fontFamily: "'Lato', 'Helvetica Neue', Arial, sans-serif", padding: "10px" }}>
            <div className="flex flex-col h-full overflow-hidden rounded-sm">
              {/* HEADER */}
              <div className="bg-neutral-800 flex items-center justify-between flex-shrink-0" style={{ padding: "18px 18mm" }}>
                <Image src="/logo-bianco.png" alt="Coach Angelo" width={130} height={42} className="h-10 w-auto" unoptimized />
                <div className="text-right">
                  <p className="text-white text-[18px] font-light tracking-[3px] uppercase">Rechnung</p>
                  <p className="text-white/60 text-[11px] mt-1">Nr. <strong className="text-white font-semibold">{rechnungData.rechnungNr}</strong></p>
                </div>
              </div>
              <div className="h-[3px] flex-shrink-0" style={{ background: "linear-gradient(90deg, #ec4899, #a855f7, #6366f1)" }} />

              {/* BODY */}
              <div className="flex-1 text-[12px] leading-[1.5] text-neutral-700" style={{ padding: "28px 18mm 16px" }}>
                {/* Info grid */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-2 pb-1.5 border-b border-neutral-200">Von</p>
                    <p className="font-semibold text-[13px] text-black mb-1.5">{COACH.name}</p>
                    <p className="text-neutral-500 text-[11px]">{COACH.fullAddress}</p>
                    {COACH.taxId && <p className="text-neutral-400 text-[10px] mt-2">Steuernr.: {COACH.taxId}</p>}
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-2 pb-1.5 border-b border-neutral-200">An</p>
                    <p className="font-semibold text-[13px] text-black mb-1.5">{rechnungData.clientName || blank}</p>
                    <p className="text-neutral-500 text-[11px]">{rechnungData.clientAddress || blank}</p>
                    <p className="text-neutral-500 text-[11px]">{rechnungData.clientCity || blank}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-2 pb-1.5 border-b border-neutral-200">Details</p>
                    <p className="text-[11px]"><strong>Datum:</strong> {formatDateDE(rechnungData.rechnungDate)}</p>
                    <p className="text-[11px]"><strong>Leistungszeitraum:</strong> {rechnungData.leistungszeitraum}</p>
                    <p className="text-[11px]"><strong>Zahlungsziel:</strong> 14 Tage (bis {zahlungsziel})</p>
                  </div>
                </div>

                {/* Table */}
                <div className="mb-6">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-3">Leistungen</p>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-neutral-800">
                        <th className="text-left text-[9px] font-semibold text-white uppercase tracking-wider" style={{ padding: "10px 12px" }}>Beschreibung</th>
                        <th className="text-center text-[9px] font-semibold text-white uppercase w-16" style={{ padding: "10px 12px" }}>Menge</th>
                        <th className="text-right text-[9px] font-semibold text-white uppercase" style={{ padding: "10px 12px" }}>Einzelpreis</th>
                        <th className="text-right text-[9px] font-semibold text-white uppercase" style={{ padding: "10px 12px" }}>Gesamt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rechnungData.items.map((item, i) => (
                        <tr key={i} className="border-b border-neutral-200">
                          <td style={{ padding: "12px" }}>
                            <p className="font-medium text-black text-[12px]">{item.title || "—"}</p>
                            {item.desc && <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>}
                          </td>
                          <td className="text-center" style={{ padding: "12px" }}>{item.qty}</td>
                          <td className="text-right font-medium text-black whitespace-nowrap" style={{ padding: "12px" }}>€ {item.price.toFixed(2).replace(".", ",")}</td>
                          <td className="text-right font-medium text-black whitespace-nowrap" style={{ padding: "12px" }}>€ {(item.qty * item.price).toFixed(2).replace(".", ",")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div className="flex justify-end mb-8">
                  <div className="border-2 border-neutral-800" style={{ padding: "16px 24px", minWidth: "260px" }}>
                    <div className="flex justify-between">
                      <span className="text-[16px] font-semibold text-neutral-800">Gesamtbetrag</span>
                      <span className="text-[16px] font-semibold text-neutral-800">€ {rechnungTotal.toFixed(2).replace(".", ",")}</span>
                    </div>
                  </div>
                </div>

                {/* Payment info */}
                <div className="grid grid-cols-2 gap-6 bg-neutral-50 mb-6" style={{ padding: "16px 20px" }}>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-800 font-bold mb-2">Zahlungsbedingungen</p>
                    <p className="text-[11px] text-neutral-600">Zahlbar innerhalb von 14 Tagen ohne Abzug</p>
                    <p className="text-[11px] text-neutral-600 mt-1"><strong>Fällig bis:</strong> {zahlungsziel}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-800 font-bold mb-2">Bankverbindung</p>
                    <p className="text-[11px] font-medium text-black">{COACH.bankName}</p>
                    <p className="text-[11px] text-neutral-600">Kontoinhaber: {COACH.name}</p>
                    <p className="text-[11px] text-neutral-600">IBAN: {COACH.bankIban}</p>
                    <p className="text-[11px] text-neutral-600">BIC: {COACH.bankBic}</p>
                  </div>
                </div>

                {/* Note */}
                {rechnungData.notes && (
                  <div className="border-l-3 bg-neutral-50 mb-6" style={{ padding: "14px 18px", borderLeft: "3px solid #1e3a5f" }}>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">{rechnungData.notes}</p>
                  </div>
                )}
                <div className="border-l-3 bg-neutral-50" style={{ padding: "14px 18px", borderLeft: "3px solid #1e3a5f" }}>
                  <p className="text-[11px] text-neutral-800 font-semibold">Gemäß § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet.</p>
                </div>
              </div>

              {/* FOOTER */}
              <div className="border-t border-neutral-200 text-center flex-shrink-0" style={{ padding: "12px 16mm" }}>
                <p className="text-[10px] text-neutral-400">{COACH.name} &middot; {COACH.fullAddress} &middot; {COACH.email}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ========================================
  // CONTRACT FORM
  // ========================================
  if (view === "contract-form") {
    return (
      <div className="min-h-screen bg-neutral-900 pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <button type="button" onClick={() => setView("menu")} className="text-white/50 hover:text-white flex items-center gap-2 mb-6 transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Menu
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">
              Genera{" "}
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">Contratto</span>
            </h1>
            <p className="text-white/60 text-center">Compila i campi per generare un Coaching-Vertrag</p>
          </div>

          <div className="space-y-8">
            {/* Client */}
            <section className="bg-neutral-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Dati del Cliente
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Nome completo" value={formData.clientName} onChange={(v) => updateField("clientName", v)} placeholder="Mario Rossi" />
                <InputField label="Data di nascita" type="date" value={formData.clientDob} onChange={(v) => updateField("clientDob", v)} />
                <InputField label="Email" type="email" value={formData.clientEmail} onChange={(v) => updateField("clientEmail", v)} />
                <InputField label="Telefono" type="tel" value={formData.clientPhone} onChange={(v) => updateField("clientPhone", v)} />
                <div className="sm:col-span-2">
                  <InputField label="Indirizzo" value={formData.clientAddress} onChange={(v) => updateField("clientAddress", v)} placeholder="Musterstraße 12, 50667 Köln" />
                </div>
              </div>
            </section>

            {/* Service */}
            <section className="bg-neutral-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Dettagli Servizio
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField label="Tipo di servizio" value={formData.serviceType} options={SERVICE_OPTIONS} onChange={(v) => updateField("serviceType", v)} />
                <SelectField label="Durata" value={formData.duration} options={DURATION_OPTIONS} onChange={(v) => updateField("duration", v)} />
                <InputField label="Sessioni a settimana" type="number" value={formData.sessionsPerWeek} onChange={(v) => updateField("sessionsPerWeek", v)} />
                <InputField label="Data inizio" type="date" value={formData.startDate} onChange={(v) => updateField("startDate", v)} />
                <InputField label="Prezzo mensile (€)" type="number" value={formData.monthlyPrice} onChange={(v) => updateField("monthlyPrice", v)} placeholder="es. 80" />
                <SelectField label="Tipo di pagamento" value={formData.paymentType} options={PAYMENT_TYPE_OPTIONS} onChange={(v) => updateField("paymentType", v)} />
                <SelectField label="Metodo di pagamento" value={formData.paymentMethod} options={PAYMENT_OPTIONS} onChange={(v) => updateField("paymentMethod", v)} />
                {!isSepa && (
                  <SelectField label="Come paga" value={formData.einmalMethod} options={EINMAL_OPTIONS} onChange={(v) => updateField("einmalMethod", v)} />
                )}
                {isSepa && (
                  <div className="sm:col-span-2 bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 space-y-4">
                    <p className="text-violet-300 text-sm font-semibold flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      Dati SEPA Lastschrift (Dauerauftrag)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <InputField label="Titolare del conto (Kontoinhaber)" value={formData.accountHolder} onChange={(v) => updateField("accountHolder", v)} placeholder="Nome come sul conto bancario" />
                      </div>
                      <InputField label="IBAN" value={formData.iban} onChange={(v) => updateField("iban", v)} placeholder="DE89 3704 0044 0532 0130 00" />
                      <InputField label="BIC (opzionale)" value={formData.bic} onChange={(v) => updateField("bic", v)} placeholder="COBADEFFXXX" />
                    </div>
                  </div>
                )}
                {monthlyPrice > 0 && months > 0 && (
                  <div className="bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl px-4 py-3">
                    <p className="text-fuchsia-300 text-sm font-semibold">€{monthlyPriceStr}/mese × {months} mesi</p>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <InputField label="Luogo" value={formData.location} onChange={(v) => updateField("location", v)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">Note aggiuntive</label>
                  <textarea value={formData.notes} onChange={(e) => updateField("notes", e.target.value)} rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-700 border border-neutral-600 text-white placeholder:text-white/30 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Condizioni particolari..." />
                </div>
              </div>
            </section>

            <div className="text-center pt-4">
              <button type="button" onClick={() => setView("contract-preview")}
                className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 transition-all shadow-lg hover:shadow-fuchsia-500/25 flex items-center gap-3 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Genera Contratto
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // RECHNUNG FORM
  // ========================================
  if (view === "rechnung-form") {
    return (
      <div className="min-h-screen bg-neutral-900 pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <button type="button" onClick={() => setView("menu")} className="text-white/50 hover:text-white flex items-center gap-2 mb-6 transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Menu
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">
              Genera{" "}
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">Rechnung</span>
            </h1>
            <p className="text-white/60 text-center">Compila i campi per generare una fattura</p>
          </div>

          <div className="space-y-8">
            {/* Invoice info */}
            <section className="bg-neutral-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Dati Fattura
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField label="Numero fattura" value={rechnungData.rechnungNr} onChange={(v) => updateRechnung("rechnungNr", v)} placeholder="2026-004" />
                <InputField label="Data fattura" type="date" value={rechnungData.rechnungDate} onChange={(v) => updateRechnung("rechnungDate", v)} />
                <InputField label="Periodo prestazione" value={rechnungData.leistungszeitraum} onChange={(v) => updateRechnung("leistungszeitraum", v)} placeholder="März 2026" />
              </div>
            </section>

            {/* Client */}
            <section className="bg-neutral-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Cliente
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Nome completo" value={rechnungData.clientName} onChange={(v) => updateRechnung("clientName", v)} placeholder="Mario Rossi" />
                <InputField label="Indirizzo" value={rechnungData.clientAddress} onChange={(v) => updateRechnung("clientAddress", v)} placeholder="Musterstraße 12" />
                <InputField label="Città / CAP" value={rechnungData.clientCity} onChange={(v) => updateRechnung("clientCity", v)} placeholder="50667 Köln" />
              </div>
            </section>

            {/* Items */}
            <section className="bg-neutral-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                Prestazioni
              </h2>
              {rechnungData.items.map((item, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4 pb-4 border-b border-neutral-700 last:border-0">
                  <div className="sm:col-span-5">
                    <InputField label="Titolo" value={item.title} onChange={(v) => {
                      const items = [...rechnungData.items]; items[i] = { ...items[i], title: v }; updateRechnung("items", items);
                    }} placeholder="Personal Training" />
                  </div>
                  <div className="sm:col-span-3">
                    <InputField label="Descrizione" value={item.desc} onChange={(v) => {
                      const items = [...rechnungData.items]; items[i] = { ...items[i], desc: v }; updateRechnung("items", items);
                    }} placeholder="Dettagli..." />
                  </div>
                  <div className="sm:col-span-1">
                    <InputField label="Qtà" type="number" value={String(item.qty)} onChange={(v) => {
                      const items = [...rechnungData.items]; items[i] = { ...items[i], qty: parseInt(v) || 1 }; updateRechnung("items", items);
                    }} />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField label="Prezzo (€)" type="number" value={String(item.price)} onChange={(v) => {
                      const items = [...rechnungData.items]; items[i] = { ...items[i], price: parseFloat(v) || 0 }; updateRechnung("items", items);
                    }} />
                  </div>
                  <div className="sm:col-span-1 flex items-end pb-1">
                    {rechnungData.items.length > 1 && (
                      <button type="button" aria-label="Rimuovi prestazione" onClick={() => {
                        const items = rechnungData.items.filter((_, j) => j !== i); updateRechnung("items", items);
                      }} className="text-red-400 hover:text-red-300 p-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => updateRechnung("items", [...rechnungData.items, { title: "", desc: "", qty: 1, price: 0 }])}
                className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-semibold flex items-center gap-1.5 mt-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Aggiungi prestazione
              </button>
              {rechnungTotal > 0 && (
                <div className="mt-4 pt-4 border-t border-neutral-700 text-right">
                  <span className="text-fuchsia-300 font-bold text-lg">Totale: €{rechnungTotal.toFixed(2)}</span>
                </div>
              )}
            </section>

            {/* Notes */}
            <section className="bg-neutral-800 rounded-2xl p-6 sm:p-8">
              <label className="block text-sm font-medium text-white/80 mb-2">Note aggiuntive</label>
              <textarea value={rechnungData.notes} onChange={(e) => updateRechnung("notes", e.target.value)} rows={2}
                className="w-full px-4 py-3 rounded-xl bg-neutral-700 border border-neutral-600 text-white placeholder:text-white/30 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Note sulla fattura..." />
            </section>

            <div className="text-center pt-4">
              <button type="button" onClick={() => setView("rechnung-preview")}
                className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 transition-all shadow-lg hover:shadow-fuchsia-500/25 flex items-center gap-3 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Genera Rechnung
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ============ SHARED COMPONENTS ============

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[0.1em] text-neutral-800 font-bold mb-1.5 mt-4 first:mt-0">{children}</p>;
}

function InputField({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/80 mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-neutral-700 border border-neutral-600 text-white placeholder:text-white/30 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all" />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/80 mb-2">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}
        className="w-full px-4 py-3 rounded-xl bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all">
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
