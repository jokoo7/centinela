'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileDetailForm from './profile-detail-form';
import EmailForm from './email-form';
import PasswordForm from './password-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import MasterPasswordForm from './master-password-form';

export default function AccountClient() {
  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div className="mt-4 space-y-4">
          <ProfileDetailForm />
          <EmailForm />
          <Card className="ring-destructive/50">
            <CardHeader>
              <CardTitle className="font-semibold text-destructive">Danger zone</CardTitle>
            </CardHeader>
            <CardContent>
              <Field>
                <p>Deleting an account will permanently delete the entire vault.</p>
                <Button
                  variant="destructive"
                  type="submit"
                  className="max-w-fit border-destructive"
                >
                  Delete Account
                </Button>
              </Field>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div className="mt-4 space-y-4">
          <PasswordForm />
          <MasterPasswordForm />
        </div>
      </TabsContent>
    </Tabs>
  );
}
