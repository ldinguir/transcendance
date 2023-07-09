/*
  Warnings:

  - You are about to drop the `_ConversationMutedUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `conversationId` to the `MutedUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ConversationMutedUser" DROP CONSTRAINT "_ConversationMutedUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationMutedUser" DROP CONSTRAINT "_ConversationMutedUser_B_fkey";

-- AlterTable
ALTER TABLE "MutedUser" ADD COLUMN     "conversationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ConversationMutedUser";

-- AddForeignKey
ALTER TABLE "MutedUser" ADD CONSTRAINT "MutedUser_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
