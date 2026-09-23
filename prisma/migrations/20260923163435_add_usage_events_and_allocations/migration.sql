-- CreateEnum
CREATE TYPE "UsageEventStatus" AS ENUM ('RECEIVED', 'PROCESSING', 'PROCESSED', 'REJECTED', 'FAILED');

-- CreateTable
CREATE TABLE "UsageEvent" (
    "id" TEXT NOT NULL,
    "externalEventId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "usageType" "UsageType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "UsageEventStatus" NOT NULL DEFAULT 'RECEIVED',
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsageEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allocation" (
    "id" TEXT NOT NULL,
    "usageEventId" TEXT NOT NULL,
    "allowanceId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Allocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsageEvent_externalEventId_key" ON "UsageEvent"("externalEventId");

-- CreateIndex
CREATE INDEX "UsageEvent_subscriptionId_occurredAt_idx" ON "UsageEvent"("subscriptionId", "occurredAt");

-- CreateIndex
CREATE INDEX "UsageEvent_status_idx" ON "UsageEvent"("status");

-- CreateIndex
CREATE INDEX "Allocation_allowanceId_idx" ON "Allocation"("allowanceId");

-- CreateIndex
CREATE UNIQUE INDEX "Allocation_usageEventId_allowanceId_key" ON "Allocation"("usageEventId", "allowanceId");

-- AddForeignKey
ALTER TABLE "UsageEvent" ADD CONSTRAINT "UsageEvent_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allocation" ADD CONSTRAINT "Allocation_usageEventId_fkey" FOREIGN KEY ("usageEventId") REFERENCES "UsageEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allocation" ADD CONSTRAINT "Allocation_allowanceId_fkey" FOREIGN KEY ("allowanceId") REFERENCES "Allowance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
