-- AlterTable
ALTER TABLE "AppCliente" ADD COLUMN     "preventivoId" TEXT;

-- CreateTable
CREATE TABLE "AppSlot" (
    "id" TEXT NOT NULL,
    "coach" TEXT NOT NULL DEFAULT 'fitprimo',
    "giorno" INTEGER NOT NULL,
    "inizio" TEXT NOT NULL,
    "fine" TEXT NOT NULL,
    "luogo" TEXT,
    "attivo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppChiusura" (
    "id" TEXT NOT NULL,
    "coach" TEXT NOT NULL DEFAULT 'fitprimo',
    "data" TEXT NOT NULL,
    "nota" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppChiusura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppPrenotazione" (
    "id" TEXT NOT NULL,
    "coach" TEXT NOT NULL DEFAULT 'fitprimo',
    "clienteId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "inizio" TEXT NOT NULL,
    "fine" TEXT NOT NULL,
    "luogo" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'inclusa',
    "stato" TEXT NOT NULL DEFAULT 'confermata',
    "pagamentoId" TEXT,
    "nota" TEXT,
    "annullataAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppPrenotazione_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppMisura" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "peso" DOUBLE PRECISION,
    "vita" DOUBLE PRECISION,
    "fianchi" DOUBLE PRECISION,
    "petto" DOUBLE PRECISION,
    "braccio" DOUBLE PRECISION,
    "coscia" DOUBLE PRECISION,
    "grasso" DOUBLE PRECISION,
    "nota" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppMisura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppMessaggio" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "daCoach" BOOLEAN NOT NULL,
    "testo" TEXT NOT NULL,
    "lettoAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppMessaggio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AppSlot_coach_idx" ON "AppSlot"("coach");

-- CreateIndex
CREATE UNIQUE INDEX "AppChiusura_coach_data_key" ON "AppChiusura"("coach", "data");

-- CreateIndex
CREATE INDEX "AppPrenotazione_coach_data_idx" ON "AppPrenotazione"("coach", "data");

-- CreateIndex
CREATE INDEX "AppPrenotazione_clienteId_idx" ON "AppPrenotazione"("clienteId");

-- CreateIndex
CREATE INDEX "AppMisura_clienteId_data_idx" ON "AppMisura"("clienteId", "data");

-- CreateIndex
CREATE INDEX "AppMessaggio_clienteId_createdAt_idx" ON "AppMessaggio"("clienteId", "createdAt");

-- AddForeignKey
ALTER TABLE "AppPrenotazione" ADD CONSTRAINT "AppPrenotazione_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "AppCliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppMisura" ADD CONSTRAINT "AppMisura_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "AppCliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppMessaggio" ADD CONSTRAINT "AppMessaggio_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "AppCliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Due clienti non possono prendere la stessa ora del coach (solo prenotazioni attive).
CREATE UNIQUE INDEX IF NOT EXISTS "AppPrenotazione_ora_attiva" ON "AppPrenotazione"("coach", "data", "inizio") WHERE "stato" IN ('confermata', 'da pagare', 'svolta');
