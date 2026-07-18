'use client';

import { Pin, StickyNote, UserRound } from 'lucide-react';
import { useState } from 'react';
import VaultDetail from './vault-detail';
import { dummyVaultItems } from '@/lib/dummy-data';
import { VaultItem } from '@/types/vault-type';
import VaultCard from './vault-card';

export default function VaultList() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [vault, setVault] = useState<VaultItem | null>(null);

  const vaultPinned = dummyVaultItems.filter((d) => d.pinned);
  const vaultNotPinned = dummyVaultItems.filter((d) => !d.pinned);

  const typeIcons = {
    ACCOUNT: UserRound,
    NOTE: StickyNote,
  };

  return (
    <>
      <div className="mb-2 flex items-center gap-1">
        <Pin size={16} className="-rotate-45" />
        <span className="inline-block">Pinned</span>
      </div>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {vaultPinned.map((vault: VaultItem) => {
          const Icon = typeIcons[vault.type];

          return (
            <VaultCard
              key={vault.id}
              vault={vault}
              setVault={setVault}
              setDetailOpen={setDetailOpen}
              Icon={Icon}
            />
          );
        })}
      </div>

      <span className="mb-2 inline-block">Lainya</span>

      <div className="grid gap-4 md:grid-cols-2">
        {vaultNotPinned.map((vault: VaultItem) => {
          const Icon = typeIcons[vault.type];

          return (
            <VaultCard
              key={vault.id}
              vault={vault}
              setVault={setVault}
              setDetailOpen={setDetailOpen}
              Icon={Icon}
            />
          );
        })}
      </div>

      <VaultDetail open={detailOpen} onOpenChange={setDetailOpen} vault={vault} />
    </>
  );
}
