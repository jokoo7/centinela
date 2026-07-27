import { InputPassword } from '@/components/input-password';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

export default function PasswordForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Change Password Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <Button type="submit">Save</Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
