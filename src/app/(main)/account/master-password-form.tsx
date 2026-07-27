import { InputPassword } from '@/components/input-password';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { AlertCircleIcon } from 'lucide-react';

export default function MasterPasswordForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Master Password Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldGroup>
          <h1 className="font-semibold">Change master password</h1>
          <Field>
            <FieldLabel htmlFor="fieldgroup-current-masster-passowrd">Current</FieldLabel>
            <InputPassword placeholder="Current master password" />
          </Field>
          <Field>
            <FieldLabel htmlFor="fieldgroup-new-masster-password">New</FieldLabel>
            <InputPassword placeholder="New master password" />
          </Field>

          <Field orientation="horizontal">
            <Button type="submit">Save</Button>
          </Field>
        </FieldGroup>

        <Separator />

        <div>
          <h1 className="mb-4 font-semibold">Delete master password</h1>
          <Alert variant="destructive" className="mb-4 border-destructive">
            <AlertCircleIcon />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Deleting an master password will permanently delete the entire vault.
            </AlertDescription>
          </Alert>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fieldgroup-del-masster-password">Master Password</FieldLabel>
              <InputPassword placeholder="Enter master password to confirm deletion" />
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <FieldLabel htmlFor="terms-checkbox-basic">Accept terms and conditions</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Button type="submit" variant="destructive">
                Delete Master Password
              </Button>
            </Field>
          </FieldGroup>
        </div>
      </CardContent>
    </Card>
  );
}
