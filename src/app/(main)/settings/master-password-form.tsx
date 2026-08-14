import { InputPassword } from '@/components/input-password';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

export default function MasterPasswordForm() {
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
        <FieldGroup>
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
      </CardContent>
    </Card>
  );
}
