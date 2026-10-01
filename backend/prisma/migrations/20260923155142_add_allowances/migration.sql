-- CreateEnum
CREATE TYPE "UsageType" AS ENUM ('DATA', 'VOICE', 'SMS');

-- CreateEnum
CREATE TYPE "AllowanceSource" AS ENUM ('PLAN', 'ADDON', 'PROMOTION');

-- CreateEnum
CREATE TYPE "AllowanceStatus" AS ENUM ('ACTIVE', 'EXHAUSTED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Allowance" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "usageType" "UsageType" NOT NULL,
    "source" "AllowanceSource" NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "remainingAmount" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "status" "AllowanceStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Allowance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Allowance_subscriptionId_idx" ON "Allowance"("subscriptionId");

-- CreateIndex
CREATE INDEX "Allowance_subscriptionId_usageType_status_priority_idx" ON "Allowance"("subscriptionId", "usageType", "status", "priority");

-- AddForeignKey
ALTER TABLE "Allowance" ADD CONSTRAINT "Allowance_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
