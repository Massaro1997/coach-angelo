-- Lavorazione dei lead: stato, qualita, motivo, note.
-- Solo colonne nuove con default o nullable: i lead esistenti restano intatti.
ALTER TABLE "Contact" ADD COLUMN IF NOT EXISTS "stato" TEXT NOT NULL DEFAULT 'nuovo';
ALTER TABLE "Contact" ADD COLUMN IF NOT EXISTS "qualita" TEXT;
ALTER TABLE "Contact" ADD COLUMN IF NOT EXISTS "motivo" TEXT;
ALTER TABLE "Contact" ADD COLUMN IF NOT EXISTS "note" TEXT;
ALTER TABLE "Contact" ADD COLUMN IF NOT EXISTS "contattatoAt" TIMESTAMP(3);
ALTER TABLE "Contact" ADD COLUMN IF NOT EXISTS "aggiornatoAt" TIMESTAMP(3);
