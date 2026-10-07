// PayPal per le rate del preventivo: e' il conto di pagamento gia' attivo sul
// sito (lo stesso di /contratti e del carrello). Si usa quando Stripe non e'
// configurato.
//
// - acconto, saldo, unica: ordine PayPal, catturato al ritorno del cliente.
// - pacchetto mensile: abbonamento PayPal. Il primo mese e' la setup fee,
//   addebitata subito all'attivazione (se non passa l'abbonamento si annulla);
//   i mesi dopo sono N-1 cicli che partono fra un mese e finiscono da soli.
//
// Lo stato si legge sempre da PayPal (sincronizzaPaypal): il webhook e il
// ritorno del cliente servono solo a dire "guarda adesso". Cosi' una chiamata
// falsa al webhook non puo' segnare pagato niente.

import { prisma } from "@/lib/prisma";
import { nuovoToken } from "@/lib/preventivo";
import { COACH } from "@/lib/preventivo-testi";
import { registraIncasso, fineDopoMesi, SITE } from "@/lib/stripe";

const PAYPAL_API = "https://api-m.paypal.com"; // live, come il resto del sito
const PRODOTTO = "FITPRIMO-COACHING";

export function paypalAttivo() {
  return Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

async function token(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");
  const r = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("PayPal non risponde");
  return j.access_token;
}

async function pp<T = Record<string, unknown>>(
  metodo: "GET" | "POST",
  path: string,
  body?: unknown,
  idem?: string
): Promise<{ ok: boolean; status: number; j: T }> {
  const r = await fetch(`${PAYPAL_API}${path}`, {
    method: metodo,
    headers: {
      Authorization: `Bearer ${await token()}`,
      "Content-Type": "application/json",
      ...(idem ? { "PayPal-Request-Id": idem } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const j = (await r.json().catch(() => ({}))) as T;
  return { ok: r.ok, status: r.status, j };
}

const importo = (n: number) => n.toFixed(2);
const approva = (links?: { rel: string; href: string }[]) =>
  links?.find((l) => l.rel === "approve" || l.rel === "payer-action")?.href;

/** Prodotto di catalogo unico per tutti i piani, creato la prima volta. */
async function prodotto() {
  const g = await pp("GET", `/v1/catalogs/products/${PRODOTTO}`);
  if (g.ok) return PRODOTTO;
  const c = await pp<{ id?: string }>("POST", "/v1/catalogs/products", {
    id: PRODOTTO,
    name: "Coaching",
    type: "SERVICE",
    category: "EXERCISE_AND_FITNESS",
  });
  if (!c.j.id) throw new Error("PayPal: prodotto non creato");
  return c.j.id;
}

/** Avvia il pagamento PayPal di una rata e restituisce il link di approvazione. */
export async function sessionePaypal(pagamentoId: string): Promise<string> {
  const pag = await prisma.pagamento.findUnique({
    where: { id: pagamentoId },
    include: { preventivo: true },
  });
  if (!pag) throw new Error("Pagamento non trovato");
  if (pag.stato === "pagato") throw new Error("Questa rata risulta gia' pagata");

  const prev = pag.preventivo;
  const lingua = prev?.lingua === "it" ? "it-IT" : "de-DE";
  const ritorno = {
    return_url: `${SITE}/pagamento/${pag.token}?esito=ok`,
    cancel_url: `${SITE}/pagamento/${pag.token}?esito=annullato`,
  };

  let ref: string | undefined;
  let url: string | undefined;

  if (pag.tipo === "abbonamento") {
    const mesi = prev?.mesi && prev.mesi > 1 ? prev.mesi : 0;
    const nome = prev?.oggetto || "Coaching";
    const piano = await pp<{ id?: string }>("POST", "/v1/billing/plans", {
      product_id: await prodotto(),
      name: `${nome} ${pag.documento || ""}`.trim().slice(0, 127),
      billing_cycles: [
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          // il primo mese e' la setup fee: qui restano gli altri (0 = senza fine)
          total_cycles: mesi ? mesi - 1 : 0,
          pricing_scheme: { fixed_price: { value: importo(pag.importo), currency_code: "EUR" } },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        payment_failure_threshold: 3,
        setup_fee: { value: importo(pag.importo), currency_code: "EUR" },
        setup_fee_failure_action: "CANCEL",
      },
    });
    if (!piano.j.id) throw new Error("PayPal: piano non creato");

    const nomi = pag.clienteNome.trim().split(/\s+/);
    const sub = await pp<{ id?: string; links?: { rel: string; href: string }[] }>(
      "POST",
      "/v1/billing/subscriptions",
      {
        plan_id: piano.j.id,
        custom_id: pag.id,
        // i mesi dopo il primo partono fra un mese esatto
        start_time: new Date(fineDopoMesi(Math.floor(Date.now() / 1000), 1) * 1000).toISOString(),
        subscriber: {
          name: { given_name: nomi[0], surname: nomi.slice(1).join(" ") || nomi[0] },
          email_address: pag.clienteEmail || undefined,
        },
        application_context: {
          brand_name: COACH.name,
          locale: lingua,
          shipping_preference: "NO_SHIPPING",
          user_action: "SUBSCRIBE_NOW",
          ...ritorno,
        },
      },
      `sub-${pag.id}-${Date.now()}`
    );
    ref = sub.j.id;
    url = approva(sub.j.links);
  } else {
    const ord = await pp<{ id?: string; links?: { rel: string; href: string }[] }>(
      "POST",
      "/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: pag.id,
            custom_id: pag.id,
            invoice_id: `${pag.documento || "P"}-${pag.id}`.slice(0, 127),
            description: pag.descrizione.slice(0, 127),
            amount: { currency_code: "EUR", value: importo(pag.importo) },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              brand_name: COACH.name,
              locale: lingua,
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
              ...ritorno,
            },
          },
        },
      },
      `ord-${pag.id}-${Date.now()}`
    );
    ref = ord.j.id;
    url = approva(ord.j.links);
  }

  if (!ref || !url) throw new Error("PayPal: pagamento non avviato");

  await prisma.pagamento.update({
    where: { id: pag.id },
    data: { stato: "in corso", provider: "paypal", providerRef: ref },
  });
  return url;
}

/**
 * Allinea una riga (e le sue sorelle dello stesso abbonamento) a quello che
 * dice PayPal. Idempotente: si puo' chiamare quante volte si vuole.
 * Restituisce le righe appena segnate pagate, per gli avvisi.
 */
export async function sincronizzaPaypal(pagamentoId: string) {
  const pag = await prisma.pagamento.findUnique({ where: { id: pagamentoId } });
  if (!pag || pag.provider !== "paypal" || !pag.providerRef) return [];
  const ref = pag.providerRef;

  // abbonamento: id "I-..."
  if (ref.startsWith("I-")) return sincronizzaAbbonamento(ref);

  // ordine singolo
  if (pag.stato === "pagato") return [];
  let ord = await pp<{ status?: string }>("GET", `/v2/checkout/orders/${ref}`);
  if (ord.j.status === "APPROVED") {
    ord = await pp("POST", `/v2/checkout/orders/${ref}/capture`, {}, `cap-${ref}`);
  }
  if (ord.j.status !== "COMPLETED") return [];
  const fatto = await registraIncasso({ pagamentoId: pag.id, providerRef: ref, metodo: "paypal", provider: "paypal" });
  return fatto ? [fatto] : [];
}

/**
 * Righe pagate = setup fee (1, se l'abbonamento e' partito) + cicli
 * regolari gia' addebitati. Mancano righe? Si chiudono le prossime aperte,
 * e per un canone senza fine se ne creano di nuove.
 */
export async function sincronizzaAbbonamento(subId: string) {
  const s = await pp<{
    status?: string;
    custom_id?: string;
    billing_info?: {
      cycle_executions?: { tenure_type: string; cycles_completed: number }[];
      last_payment?: { amount?: { value: string } };
    };
  }>("GET", `/v1/billing/subscriptions/${subId}`);
  if (!s.ok) return [];

  const partito = ["ACTIVE", "SUSPENDED", "EXPIRED"].includes(s.j.status || "") ||
    (s.j.status === "CANCELLED" && Boolean(s.j.billing_info?.last_payment));
  if (!partito) return [];
  const cicli =
    s.j.billing_info?.cycle_executions?.find((c) => c.tenure_type === "REGULAR")?.cycles_completed || 0;
  const dovute = 1 + cicli;

  const prima = await prisma.pagamento.findFirst({
    where: { OR: [{ id: s.j.custom_id || "-" }, { providerRef: subId }] },
    orderBy: [{ rataNumero: "asc" }, { createdAt: "asc" }],
  });
  if (!prima) return [];

  // alla partenza, le rate sorelle si legano all'abbonamento
  if (prima.preventivoId) {
    await prisma.pagamento.updateMany({
      where: {
        preventivoId: prima.preventivoId,
        tipo: "abbonamento",
        stato: { in: ["aperto", "in corso"] },
        OR: [{ providerRef: null }, { providerRef: { not: subId } }],
        id: { not: prima.id },
      },
      data: { provider: "paypal", metodo: "abbonamento", providerRef: subId },
    });
  }

  const righe = await prisma.pagamento.findMany({
    where: prima.preventivoId
      ? { preventivoId: prima.preventivoId, tipo: "abbonamento" }
      : { id: prima.id },
    orderBy: [{ rataNumero: "asc" }, { createdAt: "asc" }],
  });
  let pagate = righe.filter((r) => r.stato === "pagato").length;
  const nuove = [];

  for (const r of righe) {
    if (pagate >= dovute) break;
    if (r.stato === "pagato") continue;
    const f = await registraIncasso({ pagamentoId: r.id, providerRef: subId, metodo: "abbonamento", provider: "paypal" });
    if (f) {
      nuove.push(f);
      pagate++;
    }
  }

  // canone senza fine: un mese in piu' diventa una riga nuova
  const ultima = righe[righe.length - 1] || prima;
  let numero = Math.max(0, ...righe.map((r) => r.rataNumero || 0));
  while (pagate < dovute) {
    numero++;
    const r = await prisma.pagamento.create({
      data: {
        token: nuovoToken(),
        preventivoId: ultima.preventivoId,
        documento: ultima.documento,
        descrizione: ultima.descrizione.replace(/ — .*$/, "") + " — monatlich",
        clienteNome: ultima.clienteNome,
        clienteEmail: ultima.clienteEmail,
        importo: ultima.importo,
        tipo: "abbonamento",
        rataNumero: numero,
        provider: "paypal",
        metodo: "abbonamento",
        providerRef: subId,
      },
    });
    const f = await registraIncasso({ pagamentoId: r.id, providerRef: subId, metodo: "abbonamento", provider: "paypal" });
    if (f) nuove.push(f);
    pagate++;
  }

  return nuove;
}
