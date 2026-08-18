'use client';

import LoadingButton from '@/components/loading-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { authClient } from '@/lib/auth-client';
import { useAppForm } from '@/lib/form';
import { updatePasswordSchema } from '@/validation/auth-schema';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PasswordForm() {
  const [error, setError] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    validators: {
      onChange: updatePasswordSchema,
      onSubmit: updatePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      await authClient.changePassword(
        {
          newPassword: value.newPassword,
          currentPassword: value.currentPassword,
          revokeOtherSessions: true,
        },
        {
          onSuccess: () => {
            toast('Password changed successfully.');
            form.reset();
          },
          onError: (ctx) => {
            setError(ctx.error.message || 'Failed to password change');
          },
        },
      );
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Password</CardTitle>
        <CardDescription>Change the password you use to sign in to your account.</CardDescription>
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

            <form.AppField name="currentPassword">
              {(field) => (
                <field.PasswordField label="Current" placeholder="Enter current password" />
              )}
            </form.AppField>

            <form.AppField name="newPassword">
              {(field) => <field.PasswordField label="New" placeholder="Enter new password" />}
            </form.AppField>

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
