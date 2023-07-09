-- CreateTable
CREATE TABLE "_Bann" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Bann_AB_unique" ON "_Bann"("A", "B");

-- CreateIndex
CREATE INDEX "_Bann_B_index" ON "_Bann"("B");

-- AddForeignKey
ALTER TABLE "_Bann" ADD CONSTRAINT "_Bann_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Bann" ADD CONSTRAINT "_Bann_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
