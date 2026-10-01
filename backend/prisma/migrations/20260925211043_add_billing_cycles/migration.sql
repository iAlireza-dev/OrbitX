-- CreateEnum
CREATE TYPE "BillingCycleStatus" AS ENUM ('ACTIVE', 'CLOSED');

-- AlterTable
ALTER TABLE "Allowance" ADD COLUMN     "billingCycleId" TEXT;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "nextBillingAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "BillingCycle" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "status" "BillingCycleStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingCycle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BillingCycle_subscriptionId_status_idx" ON "BillingCycle"("subscriptionId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "BillingCycle_subscriptionId_startsAt_key" ON "BillingCycle"("subscriptionId", "startsAt");

-- CreateIndex
CREATE INDEX "Allowance_billingCycleId_idx" ON "Allowance"("billingCycleId");

-- AddForeignKey
ALTER TABLE "Allowance" ADD CONSTRAINT "Allowance_billingCycleId_fkey" FOREIGN KEY ("billingCycleId") REFERENCES "BillingCycle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingCycle" ADD CONSTRAINT "BillingCycle_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
