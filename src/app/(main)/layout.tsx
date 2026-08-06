import Navbar from '@/components/navbar';
import WrapperContent from '@/components/wrapper-content';
import { VaultKeyProvider } from '@/hooks/use-vault-key';
import { getServerSession } from '@/lib/get-session';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect('/login');

  return (
    <VaultKeyProvider>
      <main className="relative flex min-h-screen flex-col">
        <Navbar />
        <WrapperContent className="my-12">{children}</WrapperContent>
      </main>
    </VaultKeyProvider>
  );
}
