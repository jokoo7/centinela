import Navbar from '@/components/navbar';
import WrapperContent from '@/components/wrapper-content';
import React from 'react';

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Navbar />
      <WrapperContent className="my-12">{children}</WrapperContent>
    </main>
  );
}
