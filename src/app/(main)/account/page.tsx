import { UserIcon } from 'lucide-react';
import AccountClient from './account-client';

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <UserIcon className="size-5" />
          Account Information
        </div>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your account overview.</p>
      </div>

      <AccountClient />
    </div>
  );
}
