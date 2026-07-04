'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Key } from 'lucide-react';
import React, { useState } from 'react';
import EditVaultForm from './edit-vault-form';
import DeleteVaultForm from './delete-vault-form';
import { VaultDetail } from './vault-detail';

export default function VaultList() {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card
          className="group relative mx-auto w-full cursor-pointer rounded-lg border border-border/40 bg-card py-5 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
          onClick={() => setDetailOpen(true)}
        >
          <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="shrink-0 rounded-md bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/15">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <div className="w-full space-y-1">
              <h3 className="line-clamp-2 text-lg font-medium text-foreground transition-colors group-hover:text-primary">
                Facebook
              </h3>
              <div className="flex flex-wrap items-center gap-1">
                <Badge variant="secondary">Joko Santoso</Badge>
                <Badge variant="secondary">facebook.com</Badge>
                <Badge>Password</Badge>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <EditVaultForm />
              <DeleteVaultForm />
            </div>
          </CardContent>
        </Card>
      </div>

      <VaultDetail open={detailOpen} onOpenChange={setDetailOpen} />
    </>
  );
}
