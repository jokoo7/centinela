'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { VaultItem } from '@/types/vault-type';
import { Check, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface VaultDetailProps extends React.ComponentProps<typeof Dialog> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vault: VaultItem | null;
}

export default function VaultDetail({ open, onOpenChange, vault, ...props }: VaultDetailProps) {
  if (!vault) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
      // onCloseAutoFocus={(e) => {
      //   e.preventDefault();
      // }}
      >
        <DialogHeader>
          <DialogTitle>{vault.title}</DialogTitle>
          <DialogDescription>
            View the complete information stored in this vault item
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <div className="flex flex-col">
            {/* <h2 className="mb-3 text-base font-medium">{vault.title}</h2> */}
            <div className="space-y-2">
              {vault.type === 'ACCOUNT' && (
                <>
                  {vault.data.email && (
                    <>
                      <label className="text-sm text-muted-foreground">Email</label>
                      <p className="font-mono text-foreground">{vault.data.email}</p>
                    </>
                  )}
                  {vault.data.username && (
                    <>
                      <label className="text-sm text-muted-foreground">Username</label>
                      <p className="font-mono text-foreground">{vault.data.username}</p>
                    </>
                  )}
                  {vault.data.phone && (
                    <>
                      <label className="text-sm text-muted-foreground">Phone</label>
                      <p className="font-mono text-foreground">{vault.data.phone}</p>
                    </>
                  )}
                </>
              )}

              {vault.url && (
                <div>
                  <label className="text-sm text-muted-foreground">URL</label>
                  <Link
                    href={vault.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary hover:underline"
                  >
                    {vault.url}
                  </Link>
                </div>
              )}

              <div>
                <label className="text-sm text-muted-foreground">
                  {vault.type === 'ACCOUNT' ? 'Password' : 'Content'}
                </label>
                <div className="mt-1 flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <EyeOff className="h-4 w-4" />
                    Hide
                  </Button>

                  <Button variant="outline" size="sm" className="gap-2">
                    <Check className="h-4 w-4" />
                    Copied
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
