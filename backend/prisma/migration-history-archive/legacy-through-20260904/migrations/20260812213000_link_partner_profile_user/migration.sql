-- AlterTable
ALTER TABLE "ReligiousPartner" ADD COLUMN "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ReligiousPartner_userId_key" ON "ReligiousPartner"("userId");

-- AddForeignKey
ALTER TABLE "ReligiousPartner" ADD CONSTRAINT "ReligiousPartner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
