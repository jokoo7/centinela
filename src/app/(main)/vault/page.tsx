import { Button } from '@/components/ui/button';
import WrapperContent from '@/components/wrapper-content';
import AddVaultForm from './add-vault-form';
import VaultList from './vault-list';

export default function VaultPage() {
  return (
    <>
      <WrapperContent className="my-12">
        <div className="mb-8">
          <h1 className="text-3xl font-light tracking-tight text-foreground">My Vault</h1>
          <p className="mt-2 text-muted-foreground">12 items stored securely</p>
        </div>

        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex gap-2">
            <Button>All</Button>
            <Button className="bg-secondary/50 text-foreground hover:bg-secondary">Password</Button>
            <Button className="bg-secondary/50 text-foreground hover:bg-secondary">Note</Button>
            <Button className="bg-secondary/50 text-foreground hover:bg-secondary">Docs</Button>
          </div>
          <AddVaultForm />
        </div>

        {/* <div className="flex flex-col items-center justify-center p-12 text-center">
          <UserRoundKey className="mb-2 h-12 w-12 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">No items in your vault yet</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Create your first secure item to get started
          </p>
        </div> */}

        <VaultList />
      </WrapperContent>
    </>
  );
}
