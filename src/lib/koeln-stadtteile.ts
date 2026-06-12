// Dataset reale Stadtteile Köln — fonte: Stadt Köln / Wikipedia "Liste der Stadtteile Kölns"
// Einwohner/Fläche: Stand 2021. Spots outdoor: luoghi reali verificati.
// Usato da /personal-trainer-koeln/[stadtteil] e dal generatore candidates per forge.py

export interface Stadtteil {
  slug: string;
  name: string;
  bezirk: string;
  einwohner: number;
  flaecheKm2: number;
  rechtsrheinisch: boolean;
  neighbors: string[]; // slugs
  spots: string[]; // luoghi reali per outdoor training (vuoto se non verificato)
}

export const stadtteile: Stadtteil[] = [
  // ── Innenstadt ──
  { slug: "altstadt-sued", name: "Altstadt-Süd", bezirk: "Innenstadt", einwohner: 27764, flaecheKm2: 2.36, rechtsrheinisch: false, neighbors: ["neustadt-sued", "altstadt-nord", "bayenthal"], spots: ["Rheinufer", "Innerer Grüngürtel"] },
  { slug: "neustadt-sued", name: "Neustadt-Süd", bezirk: "Innenstadt", einwohner: 37803, flaecheKm2: 2.87, rechtsrheinisch: false, neighbors: ["altstadt-sued", "neustadt-nord", "suelz", "zollstock"], spots: ["Volksgarten", "Innerer Grüngürtel"] },
  { slug: "altstadt-nord", name: "Altstadt-Nord", bezirk: "Innenstadt", einwohner: 18617, flaecheKm2: 2.46, rechtsrheinisch: false, neighbors: ["altstadt-sued", "neustadt-nord", "deutz"], spots: ["Rheinufer", "Theodor-Heuss-Ring Grünanlage"] },
  { slug: "neustadt-nord", name: "Neustadt-Nord", bezirk: "Innenstadt", einwohner: 28604, flaecheKm2: 3.49, rechtsrheinisch: false, neighbors: ["altstadt-nord", "neustadt-sued", "nippes", "neuehrenfeld"], spots: ["Stadtgarten", "Innerer Grüngürtel"] },
  { slug: "deutz", name: "Deutz", bezirk: "Innenstadt", einwohner: 15644, flaecheKm2: 5.24, rechtsrheinisch: true, neighbors: ["altstadt-nord", "kalk", "poll", "muelheim"], spots: ["Rheinpark", "Rheinboulevard"] },
  // ── Rodenkirchen ──
  { slug: "bayenthal", name: "Bayenthal", bezirk: "Rodenkirchen", einwohner: 11161, flaecheKm2: 1.28, rechtsrheinisch: false, neighbors: ["altstadt-sued", "marienburg", "raderberg"], spots: ["Rheinufer Süd"] },
  { slug: "marienburg", name: "Marienburg", bezirk: "Rodenkirchen", einwohner: 7200, flaecheKm2: 3.05, rechtsrheinisch: false, neighbors: ["bayenthal", "raderthal", "rodenkirchen"], spots: ["Südpark", "Rheinufer"] },
  { slug: "raderberg", name: "Raderberg", bezirk: "Rodenkirchen", einwohner: 6676, flaecheKm2: 0.84, rechtsrheinisch: false, neighbors: ["bayenthal", "raderthal", "zollstock"], spots: [] },
  { slug: "raderthal", name: "Raderthal", bezirk: "Rodenkirchen", einwohner: 4909, flaecheKm2: 3.21, rechtsrheinisch: false, neighbors: ["raderberg", "marienburg", "zollstock"], spots: ["Vorgebirgspark"] },
  { slug: "zollstock", name: "Zollstock", bezirk: "Rodenkirchen", einwohner: 23327, flaecheKm2: 5.03, rechtsrheinisch: false, neighbors: ["neustadt-sued", "raderthal", "suelz", "rondorf"], spots: ["Vorgebirgspark", "Äußerer Grüngürtel"] },
  { slug: "rondorf", name: "Rondorf", bezirk: "Rodenkirchen", einwohner: 9293, flaecheKm2: 8.2, rechtsrheinisch: false, neighbors: ["zollstock", "rodenkirchen", "meschenich", "hahnwald"], spots: [] },
  { slug: "hahnwald", name: "Hahnwald", bezirk: "Rodenkirchen", einwohner: 2028, flaecheKm2: 2.99, rechtsrheinisch: false, neighbors: ["rondorf", "rodenkirchen", "suerth"], spots: [] },
  { slug: "rodenkirchen", name: "Rodenkirchen", bezirk: "Rodenkirchen", einwohner: 17732, flaecheKm2: 7.86, rechtsrheinisch: false, neighbors: ["marienburg", "rondorf", "hahnwald", "weiss"], spots: ["Rheinufer Rodenkirchen", "Forstbotanischer Garten", "Friedenswald"] },
  { slug: "weiss", name: "Weiß", bezirk: "Rodenkirchen", einwohner: 5923, flaecheKm2: 4.16, rechtsrheinisch: false, neighbors: ["rodenkirchen", "suerth", "hahnwald"], spots: ["Rheinufer Weiß"] },
  { slug: "suerth", name: "Sürth", bezirk: "Rodenkirchen", einwohner: 11033, flaecheKm2: 3.42, rechtsrheinisch: false, neighbors: ["weiss", "godorf", "hahnwald"], spots: ["Rheinufer Sürth"] },
  { slug: "godorf", name: "Godorf", bezirk: "Rodenkirchen", einwohner: 2657, flaecheKm2: 4.59, rechtsrheinisch: false, neighbors: ["suerth", "immendorf", "meschenich"], spots: [] },
  { slug: "immendorf", name: "Immendorf", bezirk: "Rodenkirchen", einwohner: 2121, flaecheKm2: 5.2, rechtsrheinisch: false, neighbors: ["godorf", "meschenich"], spots: [] },
  { slug: "meschenich", name: "Meschenich", bezirk: "Rodenkirchen", einwohner: 7789, flaecheKm2: 4.72, rechtsrheinisch: false, neighbors: ["rondorf", "immendorf", "godorf"], spots: [] },
  // ── Lindenthal ──
  { slug: "klettenberg", name: "Klettenberg", bezirk: "Lindenthal", einwohner: 10476, flaecheKm2: 1.8, rechtsrheinisch: false, neighbors: ["suelz", "zollstock"], spots: ["Klettenbergpark", "Äußerer Grüngürtel"] },
  { slug: "suelz", name: "Sülz", bezirk: "Lindenthal", einwohner: 36851, flaecheKm2: 5.17, rechtsrheinisch: false, neighbors: ["klettenberg", "lindenthal", "neustadt-sued", "zollstock"], spots: ["Beethovenpark", "Decksteiner Weiher"] },
  { slug: "lindenthal", name: "Lindenthal", bezirk: "Lindenthal", einwohner: 30725, flaecheKm2: 7.64, rechtsrheinisch: false, neighbors: ["suelz", "braunsfeld", "junkersdorf", "muengersdorf"], spots: ["Stadtwald", "Aachener Weiher", "Lindenthaler Tierpark"] },
  { slug: "braunsfeld", name: "Braunsfeld", bezirk: "Lindenthal", einwohner: 12362, flaecheKm2: 1.69, rechtsrheinisch: false, neighbors: ["lindenthal", "muengersdorf", "ehrenfeld"], spots: ["Stadtwald"] },
  { slug: "muengersdorf", name: "Müngersdorf", bezirk: "Lindenthal", einwohner: 8305, flaecheKm2: 5.13, rechtsrheinisch: false, neighbors: ["braunsfeld", "lindenthal", "junkersdorf", "vogelsang"], spots: ["Äußerer Grüngürtel", "Jahnwiesen am RheinEnergieStadion"] },
  { slug: "junkersdorf", name: "Junkersdorf", bezirk: "Lindenthal", einwohner: 15301, flaecheKm2: 7.38, rechtsrheinisch: false, neighbors: ["lindenthal", "muengersdorf", "weiden", "loevenich"], spots: ["Äußerer Grüngürtel"] },
  { slug: "weiden", name: "Weiden", bezirk: "Lindenthal", einwohner: 17795, flaecheKm2: 3.66, rechtsrheinisch: false, neighbors: ["junkersdorf", "loevenich", "widdersdorf"], spots: [] },
  { slug: "loevenich", name: "Lövenich", bezirk: "Lindenthal", einwohner: 9167, flaecheKm2: 3.57, rechtsrheinisch: false, neighbors: ["weiden", "junkersdorf", "widdersdorf"], spots: [] },
  { slug: "widdersdorf", name: "Widdersdorf", bezirk: "Lindenthal", einwohner: 12398, flaecheKm2: 5.72, rechtsrheinisch: false, neighbors: ["loevenich", "weiden", "bocklemuend-mengenich"], spots: [] },
  // ── Ehrenfeld ──
  { slug: "ehrenfeld", name: "Ehrenfeld", bezirk: "Ehrenfeld", einwohner: 38405, flaecheKm2: 3.71, rechtsrheinisch: false, neighbors: ["neuehrenfeld", "braunsfeld", "bickendorf", "neustadt-nord"], spots: ["Innerer Grüngürtel", "Grüner Weg Park"] },
  { slug: "neuehrenfeld", name: "Neuehrenfeld", bezirk: "Ehrenfeld", einwohner: 23626, flaecheKm2: 2.54, rechtsrheinisch: false, neighbors: ["ehrenfeld", "bickendorf", "bilderstoeckchen", "nippes"], spots: ["Blücherpark"] },
  { slug: "bickendorf", name: "Bickendorf", bezirk: "Ehrenfeld", einwohner: 16779, flaecheKm2: 2.33, rechtsrheinisch: false, neighbors: ["ehrenfeld", "neuehrenfeld", "vogelsang", "ossendorf"], spots: ["Äußerer Grüngürtel"] },
  { slug: "vogelsang", name: "Vogelsang", bezirk: "Ehrenfeld", einwohner: 8336, flaecheKm2: 3.64, rechtsrheinisch: false, neighbors: ["bickendorf", "muengersdorf", "bocklemuend-mengenich"], spots: [] },
  { slug: "bocklemuend-mengenich", name: "Bocklemünd/Mengenich", bezirk: "Ehrenfeld", einwohner: 10629, flaecheKm2: 4.94, rechtsrheinisch: false, neighbors: ["vogelsang", "ossendorf", "widdersdorf"], spots: [] },
  { slug: "ossendorf", name: "Ossendorf", bezirk: "Ehrenfeld", einwohner: 12297, flaecheKm2: 6.81, rechtsrheinisch: false, neighbors: ["bickendorf", "bocklemuend-mengenich", "longerich"], spots: [] },
  // ── Nippes ──
  { slug: "nippes", name: "Nippes", bezirk: "Nippes", einwohner: 36913, flaecheKm2: 2.98, rechtsrheinisch: false, neighbors: ["neustadt-nord", "neuehrenfeld", "mauenheim", "riehl", "bilderstoeckchen"], spots: ["Nippeser Tälchen", "Johannes-Giesberts-Park"] },
  { slug: "mauenheim", name: "Mauenheim", bezirk: "Nippes", einwohner: 5596, flaecheKm2: 0.51, rechtsrheinisch: false, neighbors: ["nippes", "weidenpesch", "bilderstoeckchen"], spots: [] },
  { slug: "riehl", name: "Riehl", bezirk: "Nippes", einwohner: 12020, flaecheKm2: 2.39, rechtsrheinisch: false, neighbors: ["nippes", "niehl", "neustadt-nord"], spots: ["Rheinufer Riehl", "Flora und Botanischer Garten"] },
  { slug: "niehl", name: "Niehl", bezirk: "Nippes", einwohner: 20219, flaecheKm2: 12.06, rechtsrheinisch: false, neighbors: ["riehl", "weidenpesch", "merkenich", "longerich"], spots: ["Nordpark"] },
  { slug: "weidenpesch", name: "Weidenpesch", bezirk: "Nippes", einwohner: 13632, flaecheKm2: 3.91, rechtsrheinisch: false, neighbors: ["nippes", "mauenheim", "niehl", "longerich"], spots: ["Weidenpescher Park"] },
  { slug: "longerich", name: "Longerich", bezirk: "Nippes", einwohner: 13971, flaecheKm2: 6.16, rechtsrheinisch: false, neighbors: ["weidenpesch", "niehl", "ossendorf", "lindweiler"], spots: [] },
  { slug: "bilderstoeckchen", name: "Bilderstöckchen", bezirk: "Nippes", einwohner: 15516, flaecheKm2: 3.75, rechtsrheinisch: false, neighbors: ["nippes", "mauenheim", "neuehrenfeld", "longerich"], spots: ["Blücherpark"] },
  // ── Chorweiler ──
  { slug: "merkenich", name: "Merkenich", bezirk: "Chorweiler", einwohner: 5878, flaecheKm2: 12.15, rechtsrheinisch: false, neighbors: ["niehl", "fuehlingen", "seeberg"], spots: ["Rheinufer Nord"] },
  { slug: "fuehlingen", name: "Fühlingen", bezirk: "Chorweiler", einwohner: 2193, flaecheKm2: 4.94, rechtsrheinisch: false, neighbors: ["merkenich", "seeberg", "volkhoven-weiler", "worringen"], spots: ["Fühlinger See"] },
  { slug: "seeberg", name: "Seeberg", bezirk: "Chorweiler", einwohner: 11094, flaecheKm2: 1.78, rechtsrheinisch: false, neighbors: ["fuehlingen", "chorweiler", "heimersdorf", "merkenich"], spots: ["Fühlinger See"] },
  { slug: "heimersdorf", name: "Heimersdorf", bezirk: "Chorweiler", einwohner: 6278, flaecheKm2: 1.75, rechtsrheinisch: false, neighbors: ["seeberg", "chorweiler", "lindweiler", "pesch"], spots: [] },
  { slug: "lindweiler", name: "Lindweiler", bezirk: "Chorweiler", einwohner: 3549, flaecheKm2: 1.16, rechtsrheinisch: false, neighbors: ["heimersdorf", "pesch", "longerich"], spots: [] },
  { slug: "pesch", name: "Pesch", bezirk: "Chorweiler", einwohner: 7799, flaecheKm2: 2.83, rechtsrheinisch: false, neighbors: ["lindweiler", "heimersdorf", "esch-auweiler"], spots: [] },
  { slug: "esch-auweiler", name: "Esch/Auweiler", bezirk: "Chorweiler", einwohner: 6964, flaecheKm2: 7.61, rechtsrheinisch: false, neighbors: ["pesch", "volkhoven-weiler", "widdersdorf"], spots: [] },
  { slug: "volkhoven-weiler", name: "Volkhoven/Weiler", bezirk: "Chorweiler", einwohner: 5921, flaecheKm2: 4.35, rechtsrheinisch: false, neighbors: ["esch-auweiler", "fuehlingen", "chorweiler"], spots: ["Fühlinger See"] },
  { slug: "chorweiler", name: "Chorweiler", bezirk: "Chorweiler", einwohner: 13340, flaecheKm2: 1.92, rechtsrheinisch: false, neighbors: ["seeberg", "heimersdorf", "volkhoven-weiler", "blumenberg"], spots: ["Fühlinger See"] },
  { slug: "blumenberg", name: "Blumenberg", bezirk: "Chorweiler", einwohner: 5147, flaecheKm2: 3.2, rechtsrheinisch: false, neighbors: ["chorweiler", "worringen", "roggendorf-thenhoven"], spots: [] },
  { slug: "roggendorf-thenhoven", name: "Roggendorf/Thenhoven", bezirk: "Chorweiler", einwohner: 4784, flaecheKm2: 13.76, rechtsrheinisch: false, neighbors: ["blumenberg", "worringen"], spots: ["Chorbusch"] },
  { slug: "worringen", name: "Worringen", bezirk: "Chorweiler", einwohner: 10365, flaecheKm2: 11.73, rechtsrheinisch: false, neighbors: ["roggendorf-thenhoven", "blumenberg", "fuehlingen"], spots: ["Rheinufer Worringen", "Worringer Bruch"] },
  // ── Porz ──
  { slug: "poll", name: "Poll", bezirk: "Porz", einwohner: 11184, flaecheKm2: 5.17, rechtsrheinisch: true, neighbors: ["deutz", "westhoven", "humboldt-gremberg"], spots: ["Poller Wiesen", "Rheinufer Poll"] },
  { slug: "westhoven", name: "Westhoven", bezirk: "Porz", einwohner: 5715, flaecheKm2: 4.22, rechtsrheinisch: true, neighbors: ["poll", "ensen", "gremberghoven"], spots: ["Rheinufer Westhoven"] },
  { slug: "ensen", name: "Ensen", bezirk: "Porz", einwohner: 7684, flaecheKm2: 1.62, rechtsrheinisch: true, neighbors: ["westhoven", "porz"], spots: ["Rheinufer Ensen"] },
  { slug: "gremberghoven", name: "Gremberghoven", bezirk: "Porz", einwohner: 3149, flaecheKm2: 6.0, rechtsrheinisch: true, neighbors: ["westhoven", "eil", "humboldt-gremberg"], spots: [] },
  { slug: "eil", name: "Eil", bezirk: "Porz", einwohner: 9336, flaecheKm2: 16.25, rechtsrheinisch: true, neighbors: ["gremberghoven", "porz", "urbach", "grengel"], spots: ["Wahner Heide"] },
  { slug: "porz", name: "Porz", bezirk: "Porz", einwohner: 15155, flaecheKm2: 3.12, rechtsrheinisch: true, neighbors: ["ensen", "eil", "urbach", "zuendorf"], spots: ["Rheinufer Porz"] },
  { slug: "urbach", name: "Urbach", bezirk: "Porz", einwohner: 13179, flaecheKm2: 2.29, rechtsrheinisch: true, neighbors: ["porz", "eil", "elsdorf", "wahnheide"], spots: [] },
  { slug: "elsdorf", name: "Elsdorf", bezirk: "Porz", einwohner: 1726, flaecheKm2: 1.77, rechtsrheinisch: true, neighbors: ["urbach", "wahnheide", "zuendorf"], spots: [] },
  { slug: "grengel", name: "Grengel", bezirk: "Porz", einwohner: 5555, flaecheKm2: 10.66, rechtsrheinisch: true, neighbors: ["eil", "wahnheide", "urbach"], spots: ["Wahner Heide"] },
  { slug: "wahnheide", name: "Wahnheide", bezirk: "Porz", einwohner: 7859, flaecheKm2: 2.88, rechtsrheinisch: true, neighbors: ["grengel", "wahn", "elsdorf", "urbach"], spots: ["Wahner Heide"] },
  { slug: "wahn", name: "Wahn", bezirk: "Porz", einwohner: 7263, flaecheKm2: 2.25, rechtsrheinisch: true, neighbors: ["wahnheide", "lind", "zuendorf"], spots: ["Wahner Heide"] },
  { slug: "lind", name: "Lind", bezirk: "Porz", einwohner: 3691, flaecheKm2: 2.25, rechtsrheinisch: true, neighbors: ["wahn", "libur", "wahnheide"], spots: ["Wahner Heide"] },
  { slug: "libur", name: "Libur", bezirk: "Porz", einwohner: 1145, flaecheKm2: 6.35, rechtsrheinisch: true, neighbors: ["lind", "zuendorf", "langel"], spots: [] },
  { slug: "zuendorf", name: "Zündorf", bezirk: "Porz", einwohner: 11699, flaecheKm2: 8.12, rechtsrheinisch: true, neighbors: ["porz", "wahn", "langel", "libur"], spots: ["Groov Zündorf", "Rheinufer Zündorf"] },
  { slug: "langel", name: "Langel", bezirk: "Porz", einwohner: 3588, flaecheKm2: 5.33, rechtsrheinisch: true, neighbors: ["zuendorf", "libur"], spots: ["Rheinufer Langel"] },
  { slug: "finkenberg", name: "Finkenberg", bezirk: "Porz", einwohner: 6870, flaecheKm2: 0.64, rechtsrheinisch: true, neighbors: ["porz", "eil", "gremberghoven"], spots: [] },
  // ── Kalk ──
  { slug: "humboldt-gremberg", name: "Humboldt/Gremberg", bezirk: "Kalk", einwohner: 15111, flaecheKm2: 2.82, rechtsrheinisch: true, neighbors: ["kalk", "poll", "vingst", "gremberghoven"], spots: [] },
  { slug: "kalk", name: "Kalk", bezirk: "Kalk", einwohner: 24911, flaecheKm2: 2.97, rechtsrheinisch: true, neighbors: ["deutz", "humboldt-gremberg", "vingst", "hoehenberg", "buchforst"], spots: ["Bürgerpark Kalk"] },
  { slug: "vingst", name: "Vingst", bezirk: "Kalk", einwohner: 12711, flaecheKm2: 1.12, rechtsrheinisch: true, neighbors: ["kalk", "humboldt-gremberg", "hoehenberg", "ostheim"], spots: [] },
  { slug: "hoehenberg", name: "Höhenberg", bezirk: "Kalk", einwohner: 12532, flaecheKm2: 2.2, rechtsrheinisch: true, neighbors: ["kalk", "vingst", "ostheim", "buchheim", "merheim"], spots: ["Merheimer Heide"] },
  { slug: "ostheim", name: "Ostheim", bezirk: "Kalk", einwohner: 13951, flaecheKm2: 3.75, rechtsrheinisch: true, neighbors: ["vingst", "hoehenberg", "merheim", "neubrueck", "rath-heumar"], spots: ["Merheimer Heide"] },
  { slug: "merheim", name: "Merheim", bezirk: "Kalk", einwohner: 11354, flaecheKm2: 3.81, rechtsrheinisch: true, neighbors: ["hoehenberg", "ostheim", "brueck", "buchheim", "holweide"], spots: ["Merheimer Heide"] },
  { slug: "brueck", name: "Brück", bezirk: "Kalk", einwohner: 10234, flaecheKm2: 7.5, rechtsrheinisch: true, neighbors: ["merheim", "rath-heumar", "neubrueck", "holweide", "dellbrueck"], spots: ["Königsforst"] },
  { slug: "rath-heumar", name: "Rath/Heumar", bezirk: "Kalk", einwohner: 11833, flaecheKm2: 12.91, rechtsrheinisch: true, neighbors: ["brueck", "ostheim", "neubrueck", "gremberghoven"], spots: ["Königsforst"] },
  { slug: "neubrueck", name: "Neubrück", bezirk: "Kalk", einwohner: 8342, flaecheKm2: 1.1, rechtsrheinisch: true, neighbors: ["brueck", "rath-heumar", "ostheim", "merheim"], spots: ["Königsforst"] },
  // ── Mülheim ──
  { slug: "muelheim", name: "Mülheim", bezirk: "Mülheim", einwohner: 43296, flaecheKm2: 7.07, rechtsrheinisch: true, neighbors: ["deutz", "buchforst", "buchheim", "hoehenhaus", "stammheim"], spots: ["Mülheimer Stadtgarten", "Rheinufer Mülheim"] },
  { slug: "buchforst", name: "Buchforst", bezirk: "Mülheim", einwohner: 7385, flaecheKm2: 0.83, rechtsrheinisch: true, neighbors: ["muelheim", "buchheim", "kalk"], spots: [] },
  { slug: "buchheim", name: "Buchheim", bezirk: "Mülheim", einwohner: 13067, flaecheKm2: 2.86, rechtsrheinisch: true, neighbors: ["buchforst", "muelheim", "holweide", "merheim", "hoehenberg"], spots: [] },
  { slug: "holweide", name: "Holweide", bezirk: "Mülheim", einwohner: 21001, flaecheKm2: 4.11, rechtsrheinisch: true, neighbors: ["buchheim", "merheim", "brueck", "dellbrueck", "hoehenhaus"], spots: [] },
  { slug: "dellbrueck", name: "Dellbrück", bezirk: "Mülheim", einwohner: 21954, flaecheKm2: 9.95, rechtsrheinisch: true, neighbors: ["holweide", "brueck", "duennwald", "hoehenhaus"], spots: ["Dellbrücker Heide", "Thielenbruch"] },
  { slug: "hoehenhaus", name: "Höhenhaus", bezirk: "Mülheim", einwohner: 15897, flaecheKm2: 5.08, rechtsrheinisch: true, neighbors: ["muelheim", "holweide", "dellbrueck", "duennwald", "stammheim"], spots: [] },
  { slug: "duennwald", name: "Dünnwald", bezirk: "Mülheim", einwohner: 11662, flaecheKm2: 10.84, rechtsrheinisch: true, neighbors: ["hoehenhaus", "dellbrueck", "stammheim", "flittard"], spots: ["Dünnwalder Wald", "Wildpark Dünnwald", "Höhenfelder See"] },
  { slug: "stammheim", name: "Stammheim", bezirk: "Mülheim", einwohner: 8215, flaecheKm2: 3.78, rechtsrheinisch: true, neighbors: ["muelheim", "hoehenhaus", "duennwald", "flittard"], spots: ["Schlosspark Stammheim", "Rheinufer Stammheim"] },
  { slug: "flittard", name: "Flittard", bezirk: "Mülheim", einwohner: 8133, flaecheKm2: 7.7, rechtsrheinisch: true, neighbors: ["stammheim", "duennwald"], spots: ["Rheinufer Flittard"] },
];

export function getStadtteil(slug: string): Stadtteil | undefined {
  return stadtteile.find((s) => s.slug === slug);
}

export function getNeighbors(st: Stadtteil): Stadtteil[] {
  return st.neighbors
    .map((slug) => getStadtteil(slug))
    .filter((s): s is Stadtteil => Boolean(s));
}

// Densità abitativa, datapoint calcolato unico per Stadtteil
export function density(st: Stadtteil): number {
  return Math.round(st.einwohner / st.flaecheKm2);
}
