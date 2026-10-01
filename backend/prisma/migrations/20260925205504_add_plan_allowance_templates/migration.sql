-- CreateTable
CREATE TABLE "PlanAllowanceTemplate" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "usageType" "UsageType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 20,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanAllowanceTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlanAllowanceTemplate_planId_idx" ON "PlanAllowanceTemplate"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanAllowanceTemplate_planId_usageType_key" ON "PlanAllowanceTemplate"("planId", "usageType");

-- AddForeignKey
ALTER TABLE "PlanAllowanceTemplate" ADD CONSTRAINT "PlanAllowanceTemplate_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
