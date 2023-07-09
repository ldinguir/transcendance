/*
  Warnings:

  - You are about to drop the column `usersMuted` on the `Conversation` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `MutedUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "usersMuted";

-- AlterTable
ALTER TABLE "MutedUser" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "_ConversationMutedUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationMutedUser_AB_unique" ON "_ConversationMutedUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationMutedUser_B_index" ON "_ConversationMutedUser"("B");

-- AddForeignKey
ALTER TABLE "_ConversationMutedUser" ADD CONSTRAINT "_ConversationMutedUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationMutedUser" ADD CONSTRAINT "_ConversationMutedUser_B_fkey" FOREIGN KEY ("B") REFERENCES "MutedUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
