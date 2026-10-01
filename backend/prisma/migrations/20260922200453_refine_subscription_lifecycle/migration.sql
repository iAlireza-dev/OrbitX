/*
  Warnings:

  - You are about to drop the column `startedAt` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "startedAt",
ADD COLUMN     "activatedAt" TIMESTAMP(3);
