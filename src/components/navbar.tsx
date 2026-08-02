import { cn } from '@/lib/utils';
import WrapperContent from './wrapper-content';
import { UserRoundKey } from 'lucide-react';
import { getServerSession } from '@/lib/get-session';
import UserDropdown from './user-dropdown';

export default async function Navbar() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

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

        <UserDropdown user={user} />
      </WrapperContent>
    </nav>
  );
}
