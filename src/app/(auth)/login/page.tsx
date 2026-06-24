import Link from 'next/link';
import LoginForm from './login-form';
import { UserRoundKey } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="/" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <UserRoundKey className="size-6" />
            </div>
            <span className="sr-only">Centinela</span>
          </Link>
          <h1 className="mb-4 text-xl font-bold">Login Akun</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
