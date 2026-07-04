import { cn } from '@/lib/utils';
import WrapperContent from './wrapper-content';
import { BadgeCheckIcon, LogOutIcon, Search, UserRoundKey } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
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
          <InputGroup className="max-w-xs min-w-[10rem]">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end" className="text-xs">
              12 results
            </InputGroupAddon>
          </InputGroup>

          {/* <Button>
            <Plus className="h-4 w-4" />
          </Button> */}

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
                <DropdownMenuItem>
                  <BadgeCheckIcon />
                  <Link href="/profile">Account</Link>
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
