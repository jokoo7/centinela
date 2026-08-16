'use server';

import { getServerSession } from '@/lib/get-session';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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

export const resetMasterPassword = async (): Promise<{ error?: string; success?: boolean }> => {
  const session = await getServerSession();
  if (!session?.user) return { success: false, error: 'User not found' };

  const userId = session.user.id;

  try {
    await prisma.$transaction([
      prisma.vaultItem.deleteMany({ where: { userId } }),
      prisma.user.update({
        where: { id: userId },
        data: {
          encryptedVaultKey: null,
          encryptedVaultKeyIv: null,
        },
      }),
    ]);

    revalidatePath('/vault');
    revalidatePath('/settings');

    return { success: true };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: 'Something went wrong',
    };
  }
};
