'use server';

import { getServerSession } from '@/lib/get-session';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createEncryptedVaultItem = async (vaultItem: {
  ciphertext: string;
  iv: string;
  title: string;
  url?: string | undefined;
  pinned: boolean;
  type: 'ACCOUNT' | 'NOTE';
}): Promise<{ error: boolean }> => {
  try {
    const session = await getServerSession();
    if (!session) return { error: true };

    await prisma.vaultItem.create({
      data: { ...vaultItem, userId: session.user.id },
    });

    revalidatePath('/vault');
    return { error: false };
  } catch {
    return { error: true };
  }
};

export const updateEncryptedVaultItem = async (
  itemId: string,
  vaultItem: {
    ciphertext: string;
    iv: string;
    title: string;
    url?: string | undefined;
    pinned: boolean;
    type: 'ACCOUNT' | 'NOTE';
  },
): Promise<{ error: boolean }> => {
  try {
    const session = await getServerSession();
    if (!session) return { error: true };

    const result = await prisma.vaultItem.updateMany({
      where: { id: itemId, userId: session.user.id },
      data: { ...vaultItem, updatedAt: new Date() },
    });

    if (result.count === 0) return { error: true };

    revalidatePath('/vault');
    return { error: false };
  } catch {
    return { error: true };
  }
};

export const deleteVaultItem = async (id: string): Promise<{ error: boolean }> => {
  try {
    const session = await getServerSession();
    if (!session?.user) return { error: true };

    const result = await prisma.vaultItem.deleteMany({
      where: { id, userId: session.user.id },
    });

    if (result.count === 0) {
      return { error: true };
    }

    revalidatePath('/vault');
    return { error: false };
  } catch {
    return { error: true };
  }
};

export const toggleVaultItemPin = async (id: string, pinned: boolean) => {
  const session = await getServerSession();
  if (!session?.user) throw new Error('Unauthorized');

  const result = await prisma.$executeRaw`
    UPDATE "vault"
    SET "pinned" = ${pinned}
    WHERE "id" = ${id} AND "userId" = ${session.user.id}
  `;

  if (result === 0) {
    throw new Error('Item not found');
  }
};
