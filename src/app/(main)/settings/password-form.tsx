import { InputPassword } from '@/components/input-password';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

export default function PasswordForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Password</CardTitle>
        <CardDescription>Change the password you use to sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-current-passowrd">Current</FieldLabel>
            <InputPassword placeholder="Current password" />
          </Field>
          <Field>
            <FieldLabel htmlFor="fieldgroup-new-password">New</FieldLabel>
            <InputPassword placeholder="New password" />
          </Field>

          <Field orientation="horizontal">
            <Button type="submit">Save change</Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
