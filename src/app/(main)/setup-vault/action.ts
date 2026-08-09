'use server';

import prisma from '@/lib/prisma';

export async function saveEncryptedVaultKey(
  id: string,
  encryptedVaultKey: string,
  encryptedVaultKeyIv: string,
): Promise<{ error: boolean; vaultKey?: CryptoKey }> {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        encryptedVaultKey,
        encryptedVaultKeyIv,
      },
    });
    return { error: false };
  } catch {
    return { error: true };
  }
}
