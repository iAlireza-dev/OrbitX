-- CreateEnum
CREATE TYPE "SimType" AS ENUM ('PHYSICAL', 'ESIM');

-- CreateEnum
CREATE TYPE "SimStatus" AS ENUM ('AVAILABLE', 'ACTIVE', 'SUSPENDED', 'RETIRED');

-- CreateTable
CREATE TABLE "Sim" (
    "id" TEXT NOT NULL,
    "iccid" TEXT NOT NULL,
    "msisdn" TEXT,
    "type" "SimType" NOT NULL,
    "status" "SimStatus" NOT NULL DEFAULT 'AVAILABLE',
    "subscriptionId" TEXT,
    "activatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sim_iccid_key" ON "Sim"("iccid");

-- CreateIndex
CREATE UNIQUE INDEX "Sim_msisdn_key" ON "Sim"("msisdn");

-- CreateIndex
CREATE UNIQUE INDEX "Sim_subscriptionId_key" ON "Sim"("subscriptionId");

-- AddForeignKey
ALTER TABLE "Sim" ADD CONSTRAINT "Sim_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
