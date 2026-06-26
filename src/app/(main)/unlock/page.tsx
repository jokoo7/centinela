import LoadingButton from '@/components/loading-button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LockKeyhole } from 'lucide-react';
import Link from 'next/link';

export default function UnlockPage() {
  return (
    <div>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            <Link href="/" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex items-center justify-center rounded-md">
                <LockKeyhole className="size-6" />
              </div>
            </Link>
            <div className="mb-6 flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Enter your master password to access your vault
              </p>
            </div>
          </div>
          <FieldGroup>
            <Field>
              <FieldLabel>Master Password</FieldLabel>
              <Input placeholder="Enter your master password" autoComplete="username" />
            </Field>
            <Field>
              <LoadingButton loading={false} disabled={false} type="submit">
                Unlock Vault
              </LoadingButton>
            </Field>
            <FieldDescription className="text-center">
              Don&apos;t have a vault? <Link href="/register">Create vault</Link>
            </FieldDescription>
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
