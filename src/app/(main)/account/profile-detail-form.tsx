import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { ProfileAvatar } from './profile-avatar-form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { FileWithPreview } from '@/hooks/use-file-upload';
import { useForm } from '@tanstack/react-form';
import { updateProfileDetailSchema } from '@/validation/auth-schema';
import LoadingButton from '@/components/loading-button';

export default function ProfileDetailForm() {
  const [avatarFile, setAvatarFile] = useState<FileWithPreview | null>(null);

  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
    },
    validators: {
      onChange: updateProfileDetailSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log({ ...value, avatar: avatarFile });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Profile Detail</CardTitle>
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
            <Field>
              <ProfileAvatar onFileChange={setAvatarFile} />
            </Field>
            <form.Field name="name">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="text-start">
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value as string}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Joko Ganteng"
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
                    <Input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value as string}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="joko_ganteng"
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
