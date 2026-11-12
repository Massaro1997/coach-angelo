-- App clienti: due tabelle nuove, nessuna tabella esistente toccata.
CREATE TABLE IF NOT EXISTS "AppCliente" (
    "id" TEXT NOT NULL,
    "coach" TEXT NOT NULL DEFAULT 'fitprimo',
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefono" TEXT,
    "lingua" TEXT NOT NULL DEFAULT 'de',
    "obiettivo" TEXT,
    "note" TEXT,
    "codice" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "attivo" BOOLEAN NOT NULL DEFAULT true,
    "ultimoAccesso" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AppCliente_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "AppCliente_codice_key" ON "AppCliente"("codice");
CREATE UNIQUE INDEX IF NOT EXISTS "AppCliente_token_key" ON "AppCliente"("token");
CREATE INDEX IF NOT EXISTS "AppCliente_coach_idx" ON "AppCliente"("coach");

CREATE TABLE IF NOT EXISTS "AppGiornata" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "riposo" BOOLEAN NOT NULL DEFAULT false,
    "allenamento" JSONB,
    "alimentazione" JSONB,
    "notaCoach" TEXT,
    "fatto" BOOLEAN NOT NULL DEFAULT false,
    "fattoAt" TIMESTAMP(3),
    "fatica" INTEGER,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AppGiornata_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "AppGiornata_clienteId_data_key" ON "AppGiornata"("clienteId", "data");
CREATE INDEX IF NOT EXISTS "AppGiornata_data_idx" ON "AppGiornata"("data");
DO $$ BEGIN
  ALTER TABLE "AppGiornata" ADD CONSTRAINT "AppGiornata_clienteId_fkey"
    FOREIGN KEY ("clienteId") REFERENCES "AppCliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
