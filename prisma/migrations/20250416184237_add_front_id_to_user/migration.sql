/*
  Warnings:

  - A unique constraint covering the columns `[frontId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `frontId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "frontId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_frontId_key" ON "User"("frontId");
