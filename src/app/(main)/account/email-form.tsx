import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck, BadgeX } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import LoadingButton from '@/components/loading-button';
import { withEmailSchema } from '@/validation/auth-schema';

export default function EmailForm() {
  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onChange: withEmailSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log(value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Change Email</CardTitle>
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
            <form.Field name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="text-start">
                    <FieldLabel htmlFor={field.name}>
                      Email{' '}
                      <Badge className="ml-auto bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                        <BadgeCheck data-icon="inline-start" />
                        Verified
                      </Badge>
                      <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                        <BadgeX data-icon="inline-start" />
                        Unverified
                      </Badge>
                    </FieldLabel>
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
                <Field orientation="horizontal">
                  <LoadingButton loading={isSubmitting} disabled={!canSubmit} type="submit">
                    Save Change
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
