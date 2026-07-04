import Navbar from '@/components/navbar';
import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Navbar />
      {children}
    </main>
  );
}
