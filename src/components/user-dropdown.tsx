'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { CircleUserRound, Loader2, LogOutIcon, Vault } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/auth';
import { useVaultKey } from '@/hooks/use-vault-key';
import { useSignOutState } from '@/hooks/use-signout';

export default function UserDropdown({ user }: { user: User }) {
  const { lock } = useVaultKey();
  const router = useRouter();

  const isSignOut = useSignOutState((s) => s.isSignOut);
  const setSignOut = useSignOutState((s) => s.setSignOut);

  async function handleLogout() {
    setSignOut(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast('Signed out successfully');
          lock();
          router.push('/login');
        },
        onError: (ctx) => {
          setSignOut(false);
          toast(ctx.error.message || 'Something went wrong');
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" disabled={isSignOut}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>@{user.username}</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <CircleUserRound />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/vault">
              <Vault />
              Vault
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            {isSignOut ? <Loader2 className="animate-spin" /> : <LogOutIcon />}
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
