'use client';

import { cn } from '@/lib/utils';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import LoadingButton from '@/components/loading-button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import Link from 'next/link';
import { InputPassword } from '@/components/input-password';
import { unlockVaultSchema } from '@/validation/auth-schema';

export default function UnlockForm({ className, ...props }: React.ComponentProps<'form'>) {
  const form = useForm({
    defaultValues: {
      masterPassword: '',
    },
    validators: {
      onSubmit: unlockVaultSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={cn('flex w-full flex-col gap-4', className)}
      {...props}
    >
      <FieldGroup>
        <form.Field name="masterPassword">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="text-start">
                <div className="flex items-center">
                  <FieldLabel htmlFor={field.name}>Master Password</FieldLabel>
                </div>
                <InputPassword
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your password"
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
                Unlock Vault
              </LoadingButton>
            </Field>
          )}
        </form.Subscribe>
        <FieldDescription className="text-center">
          Don&apos;t have a vault? <Link href="/setup-vault">Create one</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
