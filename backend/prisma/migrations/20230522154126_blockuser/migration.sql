-- CreateTable
CREATE TABLE "_Blocks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Blocks_AB_unique" ON "_Blocks"("A", "B");

-- CreateIndex
CREATE INDEX "_Blocks_B_index" ON "_Blocks"("B");

-- AddForeignKey
ALTER TABLE "_Blocks" ADD CONSTRAINT "_Blocks_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Blocks" ADD CONSTRAINT "_Blocks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
