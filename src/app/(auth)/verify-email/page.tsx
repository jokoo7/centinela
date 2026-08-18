import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Check your inbox to verify your email address.',
};

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Verify Your Email</h1>
      <p className="max-w-md text-gray-600">
        We&apos;ve sent a verification link to the email address you signed up with. Please check
        your inbox (and spam folder) to verify your account before signing in.
      </p>
    </main>
  );
}
