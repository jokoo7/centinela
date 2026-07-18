import { Button } from '@/components/ui/button';
import VaultForm from './vault-form';
import VaultList from './vault-list';
import { Search, UserRoundKey } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { VaultItem } from '@/types/vault-type';

export default function VaultClient({ initialItems }: { initialItems: VaultItem[] }) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-foreground">My Vault</h1>
        <p className="mt-2 text-muted-foreground">{initialItems.length} items stored securely</p>
      </div>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex flex-col gap-4">
          <InputGroup className="max-w-xs min-w-[10rem]">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end" className="text-xs">
              12 results
            </InputGroupAddon>
          </InputGroup>
          <div className="flex gap-2">
            <Button>All</Button>
            <Button className="bg-secondary/50 text-foreground hover:bg-secondary">Account</Button>
            <Button className="bg-secondary/50 text-foreground hover:bg-secondary">Note</Button>
          </div>
        </div>
        <VaultForm />
      </div>

      {initialItems.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <UserRoundKey className="mb-2 h-12 w-12 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">No items in your vault yet</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Create your first secure item to get started
          </p>
        </div>
      )}

      <VaultList />
    </>
  );
}
