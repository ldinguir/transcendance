/*
  Warnings:

  - You are about to drop the column `name` on the `Conversation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recipient]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_recipient_key" ON "Conversation"("recipient");
