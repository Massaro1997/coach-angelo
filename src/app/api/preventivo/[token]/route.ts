// Preventivo pubblico via token: lettura, preparazione (solo Angelo, per il
// contratto a ore) e firma del cliente.
//
// Come in DirezioneX, la firma da sola non perfeziona il contratto: il cliente
// disegna la firma e viene portato al pagamento della prima rata. Il
// preventivo passa a "firmato" solo quando l'incasso risulta pagato
// (registraIncasso in lib/stripe). Chi firma e non paga resta "inviato" con
// una firma in attesa.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { gmailTransport, GMAIL_FROM } from "@/lib/gmail";
import { NOTIFY_EMAILS } from "@/lib/resend";
import { isAdmin } from "@/lib/admin-auth";
import { articoliOre, nuovoToken, pianoAllaFirma, eur, totaleVoci } from "@/lib/preventivo";
import {
  ORE_MESE,
  OPZIONI_ORE,
  descrizioneBonus,
  descrizioneOre,
  erroreArPersona,
  type PersonaOre,
  voceAOre,
  type ScelteOre,
  type VocePreventivo,
} from "@/lib/preventivo-listino";

export const dynamic = "force-dynamic";

const TOKEN_OK = /^[a-f0-9]{32}$/i;

/** Testo scritto dal cliente dentro l'HTML della mail. */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Crocette del modulo a ore: solo i valori ammessi, il resto si scarta. */
const tieni = (ammessi: readonly string[], v: unknown) =>
  Array.isArray(v) ? ammessi.filter((x) => v.includes(x)) : [];
const crocette = (s: Partial<ScelteOre>) => ({
  ziele: tieni(OPZIONI_ORE.ziele, s.ziele),
  tage: tieni(OPZIONI_ORE.tage, s.tage),
  zeiten: tieni(OPZIONI_ORE.zeiten, s.zeiten),
  orte: tieni(OPZIONI_ORE.orte, s.orte),
});

/** Dati della cliente gia' controllati da erroreArPersona. */
const clienteDa = (c: Partial<PersonaOre>) => ({
  clienteNome: c.nome!.trim().slice(0, 120),
  clienteIndirizzo: `${c.strasse!.trim()}, ${c.plzOrt!.trim()}`.slice(0, 200),
  clienteTelefono: c.telefono!.trim().slice(0, 40),
  clienteEmail: c.email!.trim().slice(0, 160),
});

/** Le crocette del contratto a ore, per la mail ad Angelo. */
function righeScelte(s: ScelteOre, items: VocePreventivo[]) {
  const bonus = items.find((v) => v.modulo === "bonus");
  const riga = (k: string, v: string[]) => `<li>${k}: ${v.length ? v.join(", ") : "—"}</li>`;
  return `<ul>
    <li>Ore pagate: <strong>${s.ore} al mese</strong></li>
    ${bonus ? `<li>Ore regalate: ${bonus.quantita} (${bonus.descrizione.replace(/^.*— /, "")})</li>` : ""}
    ${riga("Obiettivi", s.ziele)}
    ${riga("Giorni", s.tage)}
    ${riga("Orari", s.zeiten)}
    ${riga("Dove", s.orte)}
    <li>Inizio subito (prima dei 14 giorni di recesso): ${s.sofortBeginn ? "sì" : "no"}</li>
  </ul>`;
}

/** Vista pubblica: mai la firma grezza, mai i campi interni. */
function pubblico(p: {
  numero: string;
  clienteNome: string;
  clienteEmail: string | null;
  clienteTelefono: string | null;
  clienteIndirizzo: string | null;
  clientePiva: string | null;
  oggetto: string | null;
  premesse: string | null;
  items: unknown;
  totale: number;
  periodicita: string;
  mesi: number;
  importoNota: string | null;
  articoli: unknown;
  lingua: string;
  stato: string;
  validoFino: Date | null;
  firmatoNome: string | null;
  firmatoAt: Date | null;
  createdAt: Date;
}) {
  return {
    numero: p.numero,
    clienteNome: p.clienteNome,
    // la pagina a ore li mette gia' nei campi da compilare
    clienteEmail: p.clienteEmail,
    clienteTelefono: p.clienteTelefono,
    clienteIndirizzo: p.clienteIndirizzo,
    clientePiva: p.clientePiva,
    oggetto: p.oggetto,
    premesse: p.premesse,
    items: p.items,
    totale: p.totale,
    periodicita: p.periodicita,
    mesi: p.mesi,
    importoNota: p.importoNota,
    articoli: p.articoli,
    lingua: p.lingua,
    stato: p.stato,
    validoFino: p.validoFino,
    firmatoNome: p.firmatoNome,
    firmatoAt: p.firmatoAt,
    createdAt: p.createdAt,
    scaduto: !!p.validoFino && p.validoFino < new Date() && p.stato === "inviato",
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!TOKEN_OK.test(token)) {
    return NextResponse.json({ error: "Link non valido" }, { status: 400 });
  }

  const p = await prisma.preventivo.findUnique({
    where: { token },
    include: {
      pagamenti: {
        where: { stato: { in: ["aperto", "in corso"] } },
        orderBy: [{ rataNumero: "asc" }],
        take: 1,
        select: { token: true, importo: true, descrizione: true },
      },
    },
  });
  if (!p) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  return NextResponse.json({
    ...pubblico(p),
    // se c'e' una rata aperta, il cliente ritrova il link al pagamento
    pagamento: p.pagamenti[0] ?? null,
    // Angelo loggato nell'admin su questo telefono: vede anche le ore regalate
    admin: await isAdmin(),
  });
}

/**
 * Angelo prepara il contratto a ore per la cliente: dati, ore, crocette e
 * ore regalate. Serve la sessione admin: dallo stesso link la cliente non
 * deve potersi regalare ore. Da qui la cliente vede solo il foglio pronto:
 * spunta le conferme, firma e paga.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo Angelo, entrato nell'admin, può preparare il contratto" }, { status: 401 });
  }
  const { token } = await params;
  if (!TOKEN_OK.test(token)) {
    return NextResponse.json({ error: "Link non valido" }, { status: 400 });
  }

  let body: { cliente?: Partial<PersonaOre>; scelte?: Partial<ScelteOre>; bonus?: { ore?: number; ogniMese?: boolean } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const p = await prisma.preventivo.findUnique({ where: { token } });
  if (!p) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  if (p.firmatoAt) return NextResponse.json({ error: "Contratto già firmato: non si cambia più" }, { status: 409 });
  if (p.stato === "sostituito") return NextResponse.json({ error: "Contratto sostituito" }, { status: 409 });
  const voce = voceAOre(p.items);
  if (!voce) return NextResponse.json({ error: "Non è un contratto a ore" }, { status: 400 });

  const c = body.cliente || {};
  const errC = erroreArPersona(c, p.lingua === "de");
  if (errC) return NextResponse.json({ error: errC }, { status: 400 });
  const s = body.scelte || {};
  const ore = Math.round(Number(s.ore));
  if (!(ore >= 1 && ore <= 40)) {
    return NextResponse.json({ error: "Ore pagate: da 1 a 40 al mese" }, { status: 400 });
  }
  const bonusOre = Math.round(Number(body.bonus?.ore) || 0);
  if (bonusOre < 0 || bonusOre > 20) {
    return NextResponse.json({ error: "Ore regalate: da 0 a 20" }, { status: 400 });
  }
  const ogniMese = body.bonus?.ogniMese !== false;

  // Le conferme restano vuote: le spunta la cliente prima di firmare.
  const scelte: ScelteOre = {
    ore,
    ...crocette(s),
    gesundheit: false,
    bedingungen: false,
    sofortBeginn: false,
    ...(c.geburtsdatum?.trim() ? { geburtsdatum: c.geburtsdatum.trim() } : {}),
  };
  const nellaLista = (voce.ore?.length ? voce.ore : ORE_MESE).includes(ore);
  const { oreFisse, ...resto } = voce;
  const items: VocePreventivo[] = [
    {
      ...resto,
      descrizione: descrizioneOre(ore),
      quantita: ore,
      scelte,
      preparato: new Date().toISOString(),
      // fuori lista (es. 5 ore) o gia' fissate: sul foglio c'e' solo quella
      ...(oreFisse || !nellaLista ? { oreFisse: ore } : {}),
    },
    ...(bonusOre > 0
      ? [{ descrizione: descrizioneBonus(bonusOre, ogniMese), prezzo: 0, quantita: bonusOre, modulo: "bonus" as const }]
      : []),
    ...(p.items as unknown as VocePreventivo[]).filter((v) => v.modulo !== "ore" && v.modulo !== "bonus"),
  ];

  // preparato oggi: la cliente ha di nuovo 14 giorni per firmare
  const validoFino = new Date();
  validoFino.setDate(validoFino.getDate() + 14);

  const agg = await prisma.preventivo.update({
    where: { id: p.id },
    data: {
      items: items as unknown as object,
      totale: totaleVoci(items),
      oggetto: descrizioneOre(ore),
      articoli: articoliOre(bonusOre > 0) as unknown as object,
      validoFino: p.validoFino && p.validoFino > validoFino ? p.validoFino : validoFino,
      ...clienteDa(c),
    },
  });

  return NextResponse.json({ ...pubblico(agg), pagamento: null, admin: true });
}

/** Firma del cliente. */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!TOKEN_OK.test(token)) {
    return NextResponse.json({ error: "Link non valido" }, { status: 400 });
  }

  let body: { nome?: string; firma?: string; scelte?: Partial<ScelteOre>; cliente?: Partial<PersonaOre> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const nome = body.nome?.trim();
  if (!nome || nome.length < 3) {
    return NextResponse.json({ error: "Serve il nome e cognome di chi firma" }, { status: 400 });
  }
  if (!body.firma?.startsWith("data:image/png;base64,")) {
    return NextResponse.json({ error: "Firma mancante" }, { status: 400 });
  }

  const p = await prisma.preventivo.findUnique({ where: { token } });
  if (!p) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  // il cliente legge questi errori: nella lingua del suo contratto
  const de = p.lingua === "de";
  if (p.firmatoAt) {
    return NextResponse.json(
      { error: de ? "Dieser Vertrag ist bereits unterschrieben." : "Questo contratto risulta gia' firmato" },
      { status: 409 }
    );
  }
  if (p.stato === "sostituito") {
    return NextResponse.json(
      {
        error: de
          ? "Dieser Vertrag wurde durch eine neuere Fassung ersetzt."
          : "Questo contratto e' stato sostituito da una versione piu' recente",
      },
      { status: 409 }
    );
  }
  if (p.validoFino && p.validoFino < new Date()) {
    return NextResponse.json(
      {
        error: de
          ? "Dieser Vertrag ist abgelaufen. Bitte fordere einen neuen an."
          : "Questo contratto e' scaduto. Chiedine uno nuovo.",
      },
      { status: 409 }
    );
  }

  // Contratto a ore: le ore e le crocette arrivano con la firma. Voci e
  // totale si ricalcolano qui dalla scelta, mai da un prezzo del browser.
  const voceOre = voceAOre(p.items);
  let ricalcolo: {
    items: VocePreventivo[];
    totale: number;
    oggetto: string;
    scelte: ScelteOre;
    cliente: { clienteNome: string; clienteIndirizzo: string; clienteTelefono: string; clienteEmail: string };
  } | null = null;
  if (voceOre) {
    // le conferme le spunta sempre la cliente, prima di firmare
    const s = body.scelte || {};
    if (!s.gesundheit || !s.bedingungen) {
      return NextResponse.json(
        { error: de ? "Bitte die beiden Pflichtfelder ankreuzen." : "Spunta le due conferme obbligatorie." },
        { status: 400 }
      );
    }

    let base: Pick<ScelteOre, "ore" | "ziele" | "tage" | "zeiten" | "orte" | "geburtsdatum">;
    let cliente: { clienteNome: string; clienteIndirizzo: string; clienteTelefono: string; clienteEmail: string };
    if (voceOre.preparato && voceOre.scelte) {
      // preparato da Angelo: dati, ore e crocette sono quelli salvati, il
      // browser della cliente non li cambia
      const { ore, ziele, tage, zeiten, orte, geburtsdatum } = voceOre.scelte;
      base = { ore, ziele, tage, zeiten, orte, geburtsdatum };
      cliente = {
        clienteNome: p.clienteNome,
        clienteIndirizzo: p.clienteIndirizzo || "",
        clienteTelefono: p.clienteTelefono || "",
        clienteEmail: p.clienteEmail || "",
      };
    } else {
      // compilato dalla cliente: i dati arrivano con la firma
      const c = body.cliente || {};
      const errC = erroreArPersona(c, de);
      if (errC) return NextResponse.json({ error: errC }, { status: 400 });
      const ore = voceOre.oreFisse ?? Number(s.ore);
      if (!voceOre.oreFisse && !(voceOre.ore?.length ? voceOre.ore : ORE_MESE).includes(ore)) {
        return NextResponse.json(
          { error: de ? "Bitte wähle, wie viele Stunden pro Monat du buchst." : "Scegli quante ore al mese." },
          { status: 400 }
        );
      }
      base = { ore, ...crocette(s), ...(c.geburtsdatum?.trim() ? { geburtsdatum: c.geburtsdatum.trim() } : {}) };
      cliente = clienteDa(c);
    }

    const scelte: ScelteOre = {
      ...base,
      gesundheit: true,
      bedingungen: true,
      sofortBeginn: !!s.sofortBeginn,
      am: new Date().toISOString(),
    };
    const items = (p.items as unknown as VocePreventivo[]).map((v) =>
      v.modulo === "ore" ? { ...v, descrizione: descrizioneOre(base.ore), quantita: base.ore, scelte } : v
    );
    ricalcolo = { items, totale: totaleVoci(items), oggetto: descrizioneOre(base.ore), scelte, cliente };
  }

  const png = Buffer.from(body.firma.split(",")[1], "base64");
  // Una firma disegnata sta in poche decine di KB: oltre, e' un'immagine
  // caricata a mano e non la accettiamo.
  if (png.length > 400_000) {
    return NextResponse.json({ error: "Firma troppo grande" }, { status: 400 });
  }

  await prisma.preventivo.update({
    where: { id: p.id },
    data: {
      firma: png,
      firmatoNome: nome,
      firmatoAt: new Date(),
      ...(ricalcolo
        ? {
            items: ricalcolo.items as unknown as object,
            totale: ricalcolo.totale,
            oggetto: ricalcolo.oggetto,
            ...ricalcolo.cliente,
          }
        : {}),
    },
  });
  const totale = ricalcolo?.totale ?? p.totale;
  const oggetto = ricalcolo?.oggetto ?? p.oggetto;
  const clienteNome = ricalcolo?.cliente.clienteNome ?? p.clienteNome;
  const clienteEmail = ricalcolo?.cliente.clienteEmail ?? p.clienteEmail;

  // Piano rate: si crea alla firma, cosi' il cliente trova subito da pagare.
  const gia = await prisma.pagamento.count({ where: { preventivoId: p.id } });
  if (gia === 0) {
    const piano = pianoAllaFirma({
      totale,
      periodicita: p.periodicita,
      mesi: p.mesi,
      accontoPerc: p.accontoPerc,
      oggetto,
    });
    await prisma.pagamento.createMany({
      data: piano.map((r) => ({
        token: nuovoToken(),
        preventivoId: p.id,
        documento: p.numero,
        descrizione: r.descrizione,
        clienteNome,
        clienteEmail,
        importo: r.importo,
        tipo: r.tipo,
        rataNumero: r.rataNumero ?? null,
        rateTotali: r.rateTotali ?? null,
        scadenza: r.scadenza ?? null,
      })),
    });
  }

  const prima = await prisma.pagamento.findFirst({
    where: { preventivoId: p.id, stato: { in: ["aperto", "in corso"] } },
    orderBy: [{ rataNumero: "asc" }, { createdAt: "asc" }],
    select: { token: true, importo: true, descrizione: true },
  });

  // Avviso ad Angelo: un contratto firmato va visto subito.
  try {
    await gmailTransport.sendMail({
      from: GMAIL_FROM,
      to: NOTIFY_EMAILS,
      subject: `✍️ ${p.numero} firmato da ${nome}`,
      html: `
        <div style="font-family:system-ui,sans-serif">
          <p><strong>${esc(nome)}</strong> ha firmato il contratto <strong>${p.numero}</strong>.</p>
          <p>Cliente: ${esc(clienteNome)}${clienteEmail ? ` — ${esc(clienteEmail)}` : ""}</p>
          ${ricalcolo ? `<p>${esc(ricalcolo.cliente.clienteIndirizzo)} · ${esc(ricalcolo.cliente.clienteTelefono)}${ricalcolo.scelte.geburtsdatum ? ` · nata/o il ${esc(ricalcolo.scelte.geburtsdatum)}` : ""}</p>` : ""}
          <p>Totale: <strong>${eur(totale)}</strong>${p.periodicita === "mensile" && p.mesi <= 1 ? " al mese" : ""}</p>
          ${ricalcolo ? righeScelte(ricalcolo.scelte, ricalcolo.items) : ""}
          <p>${prima ? `Prima rata da incassare: ${eur(prima.importo)}` : "Nessuna rata generata."}</p>
          <p style="color:#666;font-size:13px">
            Il contratto si perfeziona quando la prima rata risulta pagata.
          </p>
        </div>`,
    });
  } catch {
    // la firma resta valida anche se l'avviso non parte
  }

  return NextResponse.json({ ok: true, pagamento: prima ?? null });
}
