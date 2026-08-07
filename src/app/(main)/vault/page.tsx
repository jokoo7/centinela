import VaultClient from './vault-client';
import { getServerSession } from '@/lib/get-session';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function VaultPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect('/login');

  const vaultItems = await prisma.vaultItem.findMany({ where: { userId: session.user.id } });

  return <VaultClient initialVaults={vaultItems} session={user} />;
}
