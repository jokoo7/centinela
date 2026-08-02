'use client';

import { InputPassword } from '@/components/input-password';
import LoadingButton from '@/components/loading-button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { registerSchema } from '@/validation/auth-schema';
import { useForm } from '@tanstack/react-form';
import { Check, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

function slugifyUsername(name: string, maxLength = 12) {
  const slug = name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // hilangkan aksen
    .replace(/[^a-z0-9\s_]/g, '') // buang karakter di luar huruf kecil/angka/spasi/underscore
    .replace(/\s+/g, '_') // spasi -> underscore
    .replace(/_+/g, '_') // underscore ganda -> satu
    .replace(/^_|_$/g, ''); // buang underscore di awal/akhir

  return slug.slice(0, maxLength).replace(/_$/, ''); // potong ke maxLength, buang trailing _ sisa potongan
}

export default function RegisterForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [error, setError] = useState<string | null>(null);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const router = useRouter();

  const checkUsername = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value) {
      setAvailable(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setChecking(true);
      const res = await authClient.isUsernameAvailable({ username: value });
      setAvailable(res.data?.available ?? null);
      setChecking(false);
    }, 400);
  }, []);

  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const { error } = await authClient.signUp.email({
        email: value.email,
        name: value.name,
        username: value.username,
        password: value.password,
      });

      if (error) {
        setError(error.message || 'Something went wrong');
      } else {
        toast('Register successfully');
        router.push('/vault');
      }
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
      {error && (
        <div role="alert" className="text-sm text-red-600">
          {error}
        </div>
      )}
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="text-start">
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.handleChange(value);

                    if (!usernameTouched) {
                      const slug = slugifyUsername(value);
                      form.setFieldValue('username', slug);
                      checkUsername(slug);
                    }
                  }}
                  placeholder="Bahlil Ganteng"
                  autoComplete="name"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="username">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="text-start">
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      setUsernameTouched(true);
                      field.handleChange(e.target.value);
                      checkUsername(e.target.value);
                    }}
                    placeholder="e.g. bahlil_ganteng"
                    autoComplete="username"
                  />
                  <InputGroupAddon align="inline-end">
                    {checking && <Spinner />}
                    {!checking && available === true && <Check className="text-green-800" />}
                    {!checking && available === false && <X className="text-destructive" />}
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}

                {!checking && available === true && (
                  <FieldDescription className="text-green-800">
                    Username is available
                  </FieldDescription>
                )}
                {!checking && available === false && (
                  <FieldDescription className="text-destructive">
                    Username is already taken
                  </FieldDescription>
                )}
              </Field>
            );
          }}
        </form.Field>

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

        <form.Field name="password">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="text-start">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <InputPassword
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Password"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit] as const}>
          {([isSubmitting, canSubmit]) => (
            <Field>
              <LoadingButton
                loading={isSubmitting}
                disabled={!canSubmit || available !== true}
                type="submit"
              >
                Register
              </LoadingButton>
            </Field>
          )}
        </form.Subscribe>
      </FieldGroup>
      <FieldDescription className="text-center">
        Already have an account? <Link href="/login">Login</Link>
      </FieldDescription>
    </form>
  );
}
