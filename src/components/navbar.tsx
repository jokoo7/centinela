import { cn } from '@/lib/utils';
import WrapperContent from './wrapper-content';
import { CircleUserRound, LogOutIcon, UserRoundKey, Vault } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      className={cn(
        'sticky top-0 right-0 left-0 z-50 w-full border-b border-border/10 bg-background/30 backdrop-blur-sm',
      )}
    >
      <WrapperContent className="flex justify-between gap-6 py-3">
        <div className="flex items-center gap-1">
          <UserRoundKey className="h-5 w-5 shrink-0 text-primary" />
          <span className="text-lg font-light text-foreground">Centinela</span>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>@jokombur</DropdownMenuLabel>
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
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </WrapperContent>
    </nav>
  );
}
