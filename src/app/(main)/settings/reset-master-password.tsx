import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResetMasterPassword() {
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
        <Button variant="destructive" type="submit" className="max-w-fit border-destructive">
          Reset master password
        </Button>
      </CardContent>
    </Card>
  );
}
