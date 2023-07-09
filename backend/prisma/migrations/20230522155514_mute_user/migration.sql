-- CreateTable
CREATE TABLE "MutedUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "durationMinutes" INTEGER NOT NULL,

    CONSTRAINT "MutedUser_pkey" PRIMARY KEY ("id")
);
