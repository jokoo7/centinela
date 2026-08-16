'use client';

import LoadingButton from '@/components/loading-button';
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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useVaultKey } from '@/hooks/use-vault-key';
import { authClient } from '@/lib/auth-client';
import { Trash2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function DeleteAccount() {
  const { lock } = useVaultKey();
  const [checked, setChecked] = useState(false);
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDeleteAccount() {
    startTransition(async () => {
      const { error } = await authClient.deleteUser({
        callbackURL: '/goodbye',
      });

      if (error) {
        toast(error.message ?? 'Gagal mengirim email konfirmasi.');
        return;
      }

      lock();
      toast('Cek your email forn confirmation delete account');
      setSent(true);
    });
  }

  if (sent) {
    return (
      <Card className="ring-destructive/50">
        <CardHeader>
          <CardTitle>Cek email kamu</CardTitle>
          <CardDescription>
            Kami sudah kirim link konfirmasi ke email kamu. Klik link tersebut untuk menyelesaikan
            penghapusan akun.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="ring-destructive/50">
      <CardHeader>
        <CardTitle className="font-semibold text-destructive">Delete Account</CardTitle>
        <CardDescription>
          Permanently delete your account and everything in your vault. This cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" type="button" className="max-w-fit border-destructive">
              Delete account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <Trash2 />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                We&apos;ll send a confirmation link to your email. Once confirmed, your account and
                all vault items will be permanently deleted.
              </AlertDialogDescription>
              <FieldGroup className="mt-2">
                <Field orientation="horizontal">
                  <Checkbox
                    id="delete-account-confirm"
                    onCheckedChange={(value) => setChecked(value === true)}
                    checked={checked}
                  />
                  <FieldContent>
                    <FieldLabel htmlFor="delete-account-confirm">
                      I understand this is permanent
                    </FieldLabel>
                    <FieldDescription>
                      All vault items and account data will be lost forever.
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
                disabled={!checked || isPending}
                onClick={handleDeleteAccount}
              >
                Send confirmation
              </LoadingButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
