import Link from 'next/link';
import RegisterForm from './register-form';
import { LockKeyhole } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="/" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <LockKeyhole className="size-6" />
            </div>
            <span className="sr-only">Centinela</span>
          </Link>
          <div className="mb-4 flex flex-col items-center gap-1">
            <h1 className="text-2xl font-bold">Get Started</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Join now and take control of your digital security.
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
