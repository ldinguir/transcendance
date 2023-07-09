/*
  Warnings:

  - Added the required column `connect` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socket` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "connect" BOOLEAN NOT NULL,
ADD COLUMN     "socket" INTEGER NOT NULL;
