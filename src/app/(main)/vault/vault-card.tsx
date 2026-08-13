'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import DeleteVault from './delete-vault';
import { DecryptedVaultItem } from '@/types/vault-type';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Edit2, LucideProps, Pin } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn, formatRelativeDate } from '@/lib/utils';

interface VaultCardProps {
  vault: DecryptedVaultItem | null;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  onView: (vault: DecryptedVaultItem) => void;
  onEdit: (vault: DecryptedVaultItem) => void;
  onTogglePin: (vault: DecryptedVaultItem) => void;
}

export default function VaultCard({ vault, Icon, onView, onEdit, onTogglePin }: VaultCardProps) {
  if (!vault) return null;

  return (
    <Card
      className="group relative mx-auto flex w-full cursor-pointer flex-col justify-center rounded-lg border border-border/40 bg-card py-5 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
      onClick={() => onView(vault)}
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
        <Button variant={vault.pinned ? 'default' : 'outline'} onClick={() => onTogglePin(vault)}>
          <Pin />
          <span className="inline">{vault.pinned ? 'Pinned' : 'Pin'}</span>
        </Button>
        <Button variant="secondary" size="icon" onClick={() => onEdit(vault)}>
          <Edit2 />
        </Button>
        <DeleteVault id={vault.id} />
      </CardFooter>
    </Card>
  );
}
