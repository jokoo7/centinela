'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmailForm from './email-form';
import PasswordForm from './password-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MasterPasswordForm from './master-password-form';
import ResetMasterPassword from './reset-master-password';
import BasicInformationForm from './basic-information';
import { User } from '@/lib/auth';

export default function SettingsClient({ user }: { user: User }) {
  return (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div className="mt-4 space-y-4">
          <BasicInformationForm user={user} />
          <EmailForm currentEmail={user.email} />
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div className="mt-4 space-y-4">
          <PasswordForm />
          <MasterPasswordForm />
          <ResetMasterPassword />
          <Card className="ring-destructive/50">
            <CardHeader>
              <CardTitle className="font-semibold text-destructive">Delete Account</CardTitle>
              <CardDescription>
                Irreversible actions. Removing your master password will lock your vault until a new
                one is set, and deleting your account will permanently erase all your data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" type="submit" className="max-w-fit border-destructive">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
