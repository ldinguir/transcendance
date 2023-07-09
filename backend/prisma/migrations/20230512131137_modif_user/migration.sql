/*
  Warnings:

  - A unique constraint covering the columns `[socket]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "connect" SET DEFAULT false,
ALTER COLUMN "socket" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_socket_key" ON "User"("socket");
