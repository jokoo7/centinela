import LoadingButton from '@/components/loading-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { useVaultKey } from '@/hooks/use-vault-key';
import { User } from '@/lib/auth';
import { changeMasterPassword } from '@/lib/crypto/setup';
import { useAppForm } from '@/lib/form';
import { updateMasterPasswordSchema } from '@/validation/vault-schema';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateMasterPassword } from './action';
import { useRouter } from 'next/navigation';

export default function MasterPasswordForm({ user }: { user: User }) {
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { unlock } = useVaultKey();
  const router = useRouter();

  const calculateStrenth = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d-]/.test(pwd)) strength++;
    return strength;
  };
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = [
    'bg-destructive',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-emerald-500',
  ];

  const form = useAppForm({
    defaultValues: {
      currentMasterPassword: '',
      newMasterPassword: '',
    },
    validators: {
      onChange: updateMasterPasswordSchema,
      onSubmit: updateMasterPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      let currentVaultKey;

      try {
        currentVaultKey = await unlock(
          value.currentMasterPassword,
          user.vaultSalt!,
          user.encryptedVaultKey!,
          user.encryptedVaultKeyIv!,
        );
      } catch {
        setError('Master password saat ini salah.');
        return;
      }

      try {
        const { encryptedVaultKey, encryptedVaultKeyIv } = await changeMasterPassword(
          currentVaultKey,
          value.newMasterPassword,
          user.vaultSalt!,
        );

        const { error } = await updateMasterPassword(encryptedVaultKey, encryptedVaultKeyIv);

        if (error) {
          setError('Master password gagal diubah');
          return;
        }

        toast('Master password berhasil diubah.');
        form.reset();
        router.refresh();
      } catch (err) {
        console.error(err);
        setError('Something went wrong');
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Master Password</CardTitle>
        <CardDescription>
          Update your master password. Your current master password is required to re-encrypt your
          vault key.
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

            <form.AppField name="currentMasterPassword">
              {(field) => (
                <field.TextField label="Current" placeholder="Enter current master password" />
              )}
            </form.AppField>

            <form.AppField name="newMasterPassword">
              {(field) => (
                <field.TextField
                  label="New"
                  placeholder="Enter new master password"
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    setPasswordStrength(calculateStrenth(e.target.value));
                  }}
                  others={
                    field.state.value && (
                      <div className="space-y-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full ${
                                i < passwordStrength
                                  ? strengthColors[passwordStrength - 1]
                                  : 'bg-border'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Strength:{' '}
                          {strengthLabels[Math.max(0, passwordStrength - 1)] || 'Very Weak'}
                        </p>
                      </div>
                    )
                  }
                />
              )}
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
