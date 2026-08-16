'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import LoadingButton from '@/components/loading-button';
import { withEmailSchema } from '@/validation/auth-schema';
import { useAppForm } from '@/lib/form';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function EmailForm({ currentEmail }: { currentEmail: string }) {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues: {
      email: currentEmail,
    },
    validators: {
      onChange: withEmailSchema,
      onSubmit: withEmailSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      await authClient.changeEmail(
        {
          newEmail: value.email,
          callbackURL: '/settings',
        },
        {
          onSuccess: () => {
            setStatus('Verification email sent to your current address');
          },
          onError: (ctx) => {
            setError(ctx.error.message || 'Failed to initiate email change');
          },
        },
      );
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Email Address</CardTitle>
        <CardDescription>
          Manage the email address associated with your account. Changing your email requires
          verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {error && <FieldError>{error}</FieldError>}

            <form.AppField name="email">
              {(field) => (
                <field.TextField label="Email" type="email" placeholder="your@gmail.com" />
              )}
            </form.AppField>

            {status && <p className="text-sm text-green-600">{status}</p>}

            <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit] as const}>
              {([isSubmitting, canSubmit]) => (
                <Field orientation="horizontal">
                  <LoadingButton loading={isSubmitting} disabled={!canSubmit} type="submit">
                    Save change
                  </LoadingButton>
                </Field>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
