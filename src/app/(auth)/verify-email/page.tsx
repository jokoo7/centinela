import prisma from '@/lib/prisma';
import { MailOpen } from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Check your inbox to verify your email address.',
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  if (!email) redirect('/');

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) redirect('/');

  if (user.emailVerified) redirect('/');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <MailOpen className="size-8" />
      <h1 className="text-3xl font-bold text-gray-800">Verify Your Email</h1>
      <p className="max-w-md text-gray-600">
        We&apos;ve sent a verification link to the email address you signed up with. Please check
        your inbox (and spam folder) to verify your account before signing in.
      </p>
    </main>
  );
}
