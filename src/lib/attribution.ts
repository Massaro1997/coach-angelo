// Attribuzione sorgente lead: catturata alla prima pagina della sessione,
// persistita in sessionStorage, inviata insieme al form contatti.

export type Attribution = {
  referrer: string | null;
  landingPage: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

const KEY = "lead_attribution";

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return;

    const params = new URLSearchParams(window.location.search);
    // Referrer interno (navigazione con reload) non dice nulla sulla sorgente
    const ref = document.referrer || "";
    const isInternal = ref.includes(window.location.hostname);

    const data: Attribution = {
      referrer: ref && !isInternal ? ref : null,
      landingPage: window.location.pathname + window.location.search,
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
    };
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // sessionStorage non disponibile (privacy mode): nessuna attribuzione
  }
}

export function getAttribution(): Attribution {
  const empty: Attribution = {
    referrer: null,
    landingPage: null,
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
  };
  if (typeof window === "undefined") return empty;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}
