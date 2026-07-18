'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import VaultForm from './vault-form';
import DeleteVault from './delete-vault';
import { VaultItem } from '@/types/vault-type';
import { Dispatch, ForwardRefExoticComponent, RefAttributes, SetStateAction } from 'react';
import { LucideProps, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="h-fit w-fit shrink-0 rounded-md bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/15">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="w-full space-y-1">
          <h3 className="line-clamp-2 text-lg font-medium text-foreground transition-colors group-hover:text-primary">
            {vault.title}
          </h3>
          <div className="flex flex-wrap items-center gap-1">
            {vault.type === 'ACCOUNT' && (
              <>
                {vault.data.email && <Badge variant="secondary">{vault.data.email}</Badge>}

                {vault.data.username && <Badge variant="secondary">{vault.data.username}</Badge>}

                {vault.data.phone && <Badge variant="secondary">{vault.data.phone}</Badge>}
              </>
            )}
            {vault.url && (
              <Badge variant="link" className="underline">
                {new URL(vault.url).hostname}
              </Badge>
            )}
            <Badge>{vault.type === 'ACCOUNT' ? 'Account' : 'Note'}</Badge>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <VaultForm existingItem={vault} itemId="22323" />
          <DeleteVault />
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Pin className="h-4 w-4" fill={vault.pinned ? 'currentColor' : 'none'} />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
