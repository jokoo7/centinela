'use client';

import { Button } from '@/components/ui/button';
import VaultForm from './vault-form';
import { Pin, Search, StickyNote, UserRound, UserRoundKey } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { VaultItem, VaultItemType } from '@/types/vault-type';
import { useMemo, useOptimistic, useState, useTransition } from 'react';
import VaultCard from './vault-card';
import VaultDetail from './vault-detail';

type FilterType = VaultItemType | 'ALL';

export default function VaultClient({ initialVaults }: { initialVaults: VaultItem[] }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [search, setSearch] = useState('');
  const [selectedVault, setSelectedVault] = useState<VaultItem | null>(null);
  const [, startTransition] = useTransition();

  const [optimisticItems, setOptimisticPin] = useOptimistic(
    initialVaults,
    (state, { id, pinned }: { id: string; pinned: boolean }) =>
      state.map((item) => (item.id === id ? { ...item, pinned } : { ...item })),
  );

  const { pinnedItems, otherItems, isEmpty } = useMemo(() => {
    const query = search.trim().toLowerCase();

    const bySearch = query
      ? optimisticItems.filter((item) => {
          const inTitle = item.title.toLowerCase().includes(query);
          const inSubTitle =
            item.type === 'ACCOUNT' &&
            (item.data.email?.toLowerCase().includes(query) ||
              item.data.username?.toLowerCase().includes(query));
          return inTitle || inSubTitle;
        })
      : initialVaults;

    const filtered = filter === 'ALL' ? bySearch : bySearch.filter((item) => item.type === filter);

    return {
      pinnedItems: filtered.filter((item) => item.pinned),
      otherItems: filtered.filter((item) => !item.pinned),
      isEmpty: filtered.length === 0,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optimisticItems, filter, search]);

  /** TODO: HANDLE TOGGLE PIN */
  // function handleTogglePin(item: VaultItem) {
  //   startTransition(async () => {
  //     setOptimisticPin({ id: item.id, pinned: !item.pinned });
  //     await action(item.id, !item.pinned);
  //   });
  // }

  const filterOptions: { lebel: string; value: FilterType }[] = [
    { lebel: 'All', value: 'ALL' },
    { lebel: 'Account', value: 'ACCOUNT' },
    { lebel: 'Note', value: 'NOTE' },
  ];

  const typeIcons = {
    ACCOUNT: UserRound,
    NOTE: StickyNote,
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-foreground">My Vault</h1>
        <p className="mt-2 text-muted-foreground">{initialVaults.length} items stored securely</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto]">
        {/* search */}
        <div className="order-1">
          <InputGroup className="w-full md:max-w-xs">
            <InputGroupInput
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end" className="text-xs">
              12 results
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* add vault form */}
        <div className="order-2 md:row-span-2">
          <VaultForm />
        </div>

        {/* filter tab */}
        <div className="order-3 flex gap-2">
          {filterOptions.map((opt) => (
            <Button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              variant={filter === opt.value ? 'default' : 'secondary'}
            >
              {opt.lebel}
            </Button>
          ))}
        </div>
      </div>

      {pinnedItems.length > 0 && (
        <section>
          <div className="mb-2 flex items-center gap-1">
            <Pin size={16} className="-rotate-45" />
            <span className="inline-block">Pinned</span>
          </div>
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {pinnedItems.map((vault: VaultItem) => {
              const Icon = typeIcons[vault.type];

              return (
                <VaultCard
                  key={vault.id}
                  vault={vault}
                  setVault={setSelectedVault}
                  setDetailOpen={setDetailOpen}
                  Icon={Icon}
                />
              );
            })}
          </div>
        </section>
      )}

      {otherItems.length > 0 && (
        <section>
          <span className="mb-2 inline-block">Others</span>
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {otherItems.map((vault: VaultItem) => {
              const Icon = typeIcons[vault.type];

              return (
                <VaultCard
                  key={vault.id}
                  vault={vault}
                  setVault={setSelectedVault}
                  setDetailOpen={setDetailOpen}
                  Icon={Icon}
                />
              );
            })}
          </div>
        </section>
      )}

      {isEmpty && (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <UserRoundKey className="mb-2 h-12 w-12 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">No items in your vault yet</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Create your first secure item to get started
          </p>
        </div>
      )}

      <VaultDetail open={detailOpen} onOpenChange={setDetailOpen} vault={selectedVault} />
    </>
  );
}
