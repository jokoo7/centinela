import { UserIcon } from 'lucide-react';
import { getServerSession } from '@/lib/get-session';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicInformationForm from './basic-information';
import EmailForm from './email-form';
import PasswordForm from './password-form';
import MasterPasswordForm from './master-password-form';
import ResetMasterPassword from './reset-master-password';
import DeleteAccount from './delete-account';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Manage your account information and security settings.',
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect('/login');

  const isHaveMasterPassword = user.encryptedVaultKey && user.encryptedVaultKeyIv;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <UserIcon className="size-5" />
          Account Information
        </div>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your account overview.</p>
      </div>

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
            {isHaveMasterPassword && (
              <>
                <MasterPasswordForm user={user} />
                <ResetMasterPassword />
              </>
            )}
            <DeleteAccount />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
