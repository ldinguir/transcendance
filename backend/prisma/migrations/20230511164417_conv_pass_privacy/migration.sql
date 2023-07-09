-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "password" TEXT,
ADD COLUMN     "privacy" BOOLEAN NOT NULL DEFAULT false;
