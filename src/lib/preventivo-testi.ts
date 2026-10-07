// Dati del prestatore, usabili anche lato client.
// Stanno qui e non in lib/preventivo.ts perche' quel file importa Prisma:
// tirarselo dentro una pagina pubblica porterebbe il client nel bundle.

export const COACH = {
  name: "Angelo Magliarisi",
  address: "Köln, Deutschland",
  email: "magliarisiangelo912@gmail.com",
  phone: "+49 176 93193043",
  taxId: "224/5190/4079",
  bankName: "Revolut",
  bankIban: "DE02 1001 0178 0592 8925 62",
  bankBic: "REVODEB2XXX",
} as const;
