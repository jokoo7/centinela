/*
  Warnings:

  - Added the required column `vaultSalt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VaultItemType" AS ENUM ('ACCOUNT', 'NOTE');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "encryptedVaultKey" TEXT,
ADD COLUMN     "vaultSalt" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "vault" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "VaultItemType" NOT NULL DEFAULT 'ACCOUNT',
    "title" TEXT NOT NULL,
    "url" TEXT,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "ciphertext" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "encVersion" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vault_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vault_userId_idx" ON "vault"("userId");

-- CreateIndex
CREATE INDEX "vault_userId_type_idx" ON "vault"("userId", "type");

-- AddForeignKey
ALTER TABLE "vault" ADD CONSTRAINT "vault_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
