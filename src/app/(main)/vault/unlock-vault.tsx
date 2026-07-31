import { InputPassword } from '@/components/input-password';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { unlockVaultSchema } from '@/validation/auth-schema';
import { useForm } from '@tanstack/react-form';

export default function UnlockVault() {
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
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Unlock vault</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Unlock Vault</DialogTitle>
            <DialogDescription>Enter your master password to access your vault</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex w-full flex-col gap-4"
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
                      Unlock
                    </LoadingButton>
                  </Field>
                )}
              </form.Subscribe>
            </FieldGroup>
          </form>
          {/* <DialogFooter></DialogFooter> */}
        </DialogContent>
      </form>
    </Dialog>
  );
}
