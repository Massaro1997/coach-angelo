-- PDF del contratto firmato dentro l'archivio documenti.
ALTER TABLE "Document" ADD COLUMN IF NOT EXISTS "pdf" BYTEA;
ALTER TABLE "Document" ADD COLUMN IF NOT EXISTS "pdfNome" TEXT;
ALTER TABLE "Document" ADD COLUMN IF NOT EXISTS "pdfCaricatoAt" TIMESTAMP(3);
