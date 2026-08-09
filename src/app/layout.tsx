import type { Metadata } from 'next';
import { Architects_Daughter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { SignOutOverlay } from '@/components/signout-overlay';

const fontSans = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Centinela App',
  description: 'Web untuk enyimpan data rahasia anda',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${fontSans.variable} antialiased`}>
        {children}
        <Toaster
          toastOptions={{
            classNames: {
              toast: 'font-sans',
            },
          }}
        />
        <SignOutOverlay />
      </body>
    </html>
  );
}
