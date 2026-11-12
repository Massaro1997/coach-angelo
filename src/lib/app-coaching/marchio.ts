// Marchio dell'app clienti. Oggi c'e' solo FitPrimo; quando l'app si vende in
// white label (max 100 €/mese col marchio del coach) ogni coach avra' la sua
// voce qui, scelta da `AppCliente.coach`. Nessun componente dell'app deve
// scrivere "FitPrimo", colori o loghi a mano: si prendono da qui.

export type Marchio = {
  chiave: string; // = AppCliente.coach
  nome: string; // "FitPrimo"
  nomeApp: string; // nome sotto l'icona sul telefono
  coach: string; // chi scrive i piani, mostrato al cliente
  colore: string; // colore principale
  coloreScuro: string; // hover / testo su chiaro
  sfondoIcona: string; // fondo dell'icona dell'app
  logo: string; // logo su fondo chiaro
  logoSuScuro: string; // logo su fondo scuro
  simbolo: string; // solo il simbolo, per testate strette
  whatsapp: string; // numero senza + per wa.me
  sito: string; // origine pubblica, senza / finale
};

export const FITPRIMO: Marchio = {
  chiave: "fitprimo",
  nome: "FitPrimo",
  nomeApp: "FitPrimo",
  coach: "Coach Angelo",
  colore: "#e30613",
  coloreScuro: "#c1000f",
  sfondoIcona: "#121214",
  logo: "/brand/fitprimo/fitprimo-logo-colore.svg",
  logoSuScuro: "/brand/fitprimo/fitprimo-logo-su-scuro.svg",
  simbolo: "/brand/fitprimo/fitprimo-simbolo-colore.svg",
  whatsapp: "4917693193043",
  sito: "https://www.fitprimo.de",
};

const MARCHI: Record<string, Marchio> = { fitprimo: FITPRIMO };

export function marchioDi(coach: string | null | undefined): Marchio {
  return (coach && MARCHI[coach]) || FITPRIMO;
}

/** Il marchio di questo sito (un deploy = un marchio, per ora). */
export const MARCHIO = FITPRIMO;
