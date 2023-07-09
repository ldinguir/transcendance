-- CreateTable
CREATE TABLE "_ConversationAdmins" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationAdmins_AB_unique" ON "_ConversationAdmins"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationAdmins_B_index" ON "_ConversationAdmins"("B");

-- AddForeignKey
ALTER TABLE "_ConversationAdmins" ADD CONSTRAINT "_ConversationAdmins_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationAdmins" ADD CONSTRAINT "_ConversationAdmins_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
