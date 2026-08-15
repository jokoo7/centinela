import { UserIcon } from 'lucide-react';
import { getServerSession } from '@/lib/get-session';
import { redirect } from 'next/navigation';
import SettingsClient from './settings-client';

export default async function AccountPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect('/login');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <UserIcon className="size-5" />
          Account Information
        </div>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your account overview.</p>
      </div>

      <SettingsClient user={user} />
    </div>
  );
}
