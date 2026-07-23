'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import VaultForm from './vault-form';
import DeleteVault from './delete-vault';
import { VaultItem } from '@/types/vault-type';
import { Dispatch, ForwardRefExoticComponent, RefAttributes, SetStateAction } from 'react';
import { LucideProps, Pin } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn, formatRelativeDate } from '@/lib/utils';

interface VaultCardProps {
  vault: VaultItem | null;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  setVault: Dispatch<SetStateAction<VaultItem | null>>;
  setDetailOpen: Dispatch<SetStateAction<boolean>>;
}

export default function VaultCard({ vault, Icon, setVault, setDetailOpen }: VaultCardProps) {
  if (!vault) return null;

  return (
    <Card
      className="group relative mx-auto flex w-full cursor-pointer flex-col justify-center rounded-lg border border-border/40 bg-card py-5 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
      onClick={() => {
        setVault(vault);
        setDetailOpen(true);
      }}
    >
      <div className={cn(buttonVariants({ size: 'icon' }), 'absolute top-3 right-3')}>
        <Icon />
      </div>
      <CardContent>
        <h3 className="line-clamp-2 text-lg font-medium text-foreground transition-colors group-hover:text-primary">
          {vault.title}
        </h3>
        <p className="mb-2 truncate text-accent-foreground">
          {(vault.type === 'ACCOUNT' && vault.data.email) ||
            (vault.type === 'ACCOUNT' && vault.data.username) ||
            (vault.type === 'ACCOUNT' && vault.data.phone) ||
            'Detail informasi tersimpan'}
        </p>
        <div className="flex items-center gap-2">
          <Badge className="text-xs" variant="secondary">
            {vault.type === 'ACCOUNT' ? '🔐Account' : '📝Note'}
          </Badge>
          <p className="text-xs">Diperbarui {formatRelativeDate(vault.updatedAt)}</p>
        </div>
      </CardContent>
      <CardFooter
        className="flex gap-2 group-hover:cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <Button className="" variant={vault.pinned ? 'default' : 'outline'}>
          <Pin />
          <span className="inline">{vault.pinned ? 'Pinned' : 'Pin'}</span>
        </Button>
        <VaultForm existingItem={vault} itemId="22323" />
        <DeleteVault />
      </CardFooter>
    </Card>
  );
}
