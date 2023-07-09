/*
  Warnings:

  - A unique constraint covering the columns `[creatorid]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_creatorid_key" ON "Conversation"("creatorid");
