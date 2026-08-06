'use client';

import LoadingButton from '@/components/loading-button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { withEmailSchema } from '@/validation/auth-schema';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';

export default function ForgotPasswordForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onChange: withEmailSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setSuccess(null);
      await authClient.requestPasswordReset(
        {
          email: value.email,
          redirectTo: '/reset-password',
        },
        {
          onSuccess: () => {
            setSuccess(
              'Jika akun terdaftar, link reset sudah dikirim. Tidak menerima email dalam 5 menit? Coba kirim ulang.',
            );
            form.reset();
          },
          onError: (ctx) => {
            setError(ctx.error.message || 'Something went wrong');
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex w-full flex-col gap-4"
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="text-start">
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="your@gmail.com"
                  autoComplete="email"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit] as const}>
          {([isSubmitting, canSubmit]) => (
            <Field>
              <LoadingButton loading={isSubmitting} disabled={!canSubmit} type="submit">
                Send reset link
              </LoadingButton>
            </Field>
          )}
        </form.Subscribe>

        {error && <FieldError>{error}</FieldError>}
        {success && <p className="text-sm text-green-600">{success}</p>}
      </FieldGroup>
    </form>
  );
}
