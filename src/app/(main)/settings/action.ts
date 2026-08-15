'use server';

import { getServerSession } from '@/lib/get-session';
import prisma from '@/lib/prisma';

export const updateMasterPassword = async (
  encryptedVaultKey: string,
  encryptedVaultKeyIv: string,
): Promise<{ error: boolean }> => {
  try {
    const session = await getServerSession();
    if (!session) return { error: true };

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        encryptedVaultKey,
        encryptedVaultKeyIv,
      },
    });
    return { error: false };
  } catch {
    return { error: true };
  }
};
