'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RotateCcw } from 'lucide-react';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useTransition } from 'react';
import LoadingButton from '@/components/loading-button';
import { resetMasterPassword } from './action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useVaultKey } from '@/hooks/use-vault-key';

export default function ResetMasterPassword() {
  const [checked, setChecked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { lock } = useVaultKey();

  function handleResetMasterPassword() {
    startTransition(async () => {
      const { error, success } = await resetMasterPassword();

      if (!success) {
        toast(error ?? 'Something went wrong.');
        return;
      }

      lock();
      toast('Master password deleted successfully.');
      router.push('/setup-vault');
    });
  }

  return (
    <Card className="ring-destructive/50">
      <CardHeader>
        <CardTitle className="font-semibold text-destructive">Reset Master Password</CardTitle>
        <CardDescription>
          Forgot your master password? Since we never store it, there&apos;s no way to recover your
          vault key. Resetting will permanently delete all items in your vault.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" type="submit" className="max-w-fit border-destructive">
              Reset master password
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <RotateCcw />
              </AlertDialogMedia>
              <AlertDialogTitle>Reset master passowrd?</AlertDialogTitle>
              <AlertDialogDescription>
                Since we never store it, there&apos;s no way to recover your vault key. Resetting
                will permanently delete all items in your vault.
              </AlertDialogDescription>
              <FieldGroup className="mt-2">
                <Field orientation="horizontal">
                  <Checkbox
                    id="terms-checkbox-desc"
                    name="terms-checkbox-desc"
                    onCheckedChange={(value) => setChecked(value === true)}
                    checked={checked}
                  />
                  <FieldContent>
                    <FieldLabel htmlFor="terms-checkbox-desc">
                      Accept terms and conditions
                    </FieldLabel>
                    <FieldDescription>
                      By clicking this checkbox, you agree to the terms and conditions.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
              <LoadingButton
                variant="destructive"
                loading={isPending}
                disabled={!checked}
                onClick={handleResetMasterPassword}
              >
                Reset
              </LoadingButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
