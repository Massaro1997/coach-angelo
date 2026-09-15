-- CreateTable
CREATE TABLE "Preventivo" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "clienteNome" TEXT NOT NULL,
    "clienteEmail" TEXT,
    "clienteTelefono" TEXT,
    "clienteIndirizzo" TEXT,
    "clientePiva" TEXT,
    "oggetto" TEXT,
    "premesse" TEXT,
    "items" JSONB NOT NULL,
    "totale" DOUBLE PRECISION NOT NULL,
    "periodicita" TEXT NOT NULL DEFAULT 'una tantum',
    "mesi" INTEGER NOT NULL DEFAULT 1,
    "importoNota" TEXT,
    "articoli" JSONB,
    "lingua" TEXT NOT NULL DEFAULT 'de',
    "stato" TEXT NOT NULL DEFAULT 'inviato',
    "sostituitoDa" TEXT,
    "validoFino" TIMESTAMP(3),
    "inviatoAt" TIMESTAMP(3),
    "inviatoA" TEXT,
    "firma" BYTEA,
    "firmatoNome" TEXT,
    "firmatoAt" TIMESTAMP(3),
    "accontoPerc" INTEGER NOT NULL DEFAULT 50,
    "accontoIncassato" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "accontoIncassatoAt" TIMESTAMP(3),
    "lavoro" TEXT NOT NULL DEFAULT 'da iniziare',
    "lavoroNote" TEXT,
    "dataInizio" TIMESTAMP(3),
    "dataFine" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preventivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "preventivoId" TEXT,
    "documento" TEXT,
    "descrizione" TEXT NOT NULL,
    "clienteNome" TEXT NOT NULL,
    "clienteEmail" TEXT,
    "importo" DOUBLE PRECISION NOT NULL,
    "valuta" TEXT NOT NULL DEFAULT 'EUR',
    "tipo" TEXT NOT NULL DEFAULT 'unica',
    "rataNumero" INTEGER,
    "rateTotali" INTEGER,
    "scadenza" TIMESTAMP(3),
    "stato" TEXT NOT NULL DEFAULT 'aperto',
    "provider" TEXT,
    "metodo" TEXT,
    "providerRef" TEXT,
    "pagatoAt" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preventivo_numero_key" ON "Preventivo"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Preventivo_token_key" ON "Preventivo"("token");

-- CreateIndex
CREATE INDEX "Preventivo_stato_idx" ON "Preventivo"("stato");

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_token_key" ON "Pagamento"("token");

-- CreateIndex
CREATE INDEX "Pagamento_stato_idx" ON "Pagamento"("stato");

-- CreateIndex
CREATE INDEX "Pagamento_documento_idx" ON "Pagamento"("documento");

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_preventivoId_fkey" FOREIGN KEY ("preventivoId") REFERENCES "Preventivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

