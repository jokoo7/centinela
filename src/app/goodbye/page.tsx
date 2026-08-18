import { getServerSession } from '@/lib/get-session';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Goodbye',
  description: 'Your account has been deleted.',
  robots: { index: false, follow: false },
};

export default async function GoodbyePage() {
  const session = await getServerSession();
  const user = session?.user;
  if (user) redirect('/vault');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Goodbye 👋</h1>
      <p className="max-w-md text-gray-600">
        Your Centinela account and all associated vault data have been permanently deleted.
        We&apos;re sorry to see you go.
      </p>
    </main>
  );
}
