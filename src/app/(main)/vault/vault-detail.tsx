'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn, formatDate } from '@/lib/utils';
import { VaultItem } from '@/types/vault-type';
import { Calendar, CircleCheckBig, Copy, Eye, EyeOff, FileText, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface VaultDetailProps extends React.ComponentProps<typeof Dialog> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vault: VaultItem | null;
}

export default function VaultDetail({ open, onOpenChange, vault, ...props }: VaultDetailProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!vault || !open) return null;

  const typeIcons = {
    ACCOUNT: UserRound,
    NOTE: FileText,
  };

  const Icon = typeIcons[vault.type];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const renderFieldWithCopy = (
    label: string,
    value: string | undefined,
    fieldName: string,
    isSecret: boolean = false,
  ) => {
    if (!value) return null;
    return (
      <Field>
        <Label className="text-muted-foreground">{label}</Label>
        <div className="flex items-center justify-between gap-1 rounded-[min(var(--radius-md),10px)] bg-muted/50 px-2.5 py-2">
          <div className="flex-1">
            {isSecret && !showPassword ? (
              <span>********</span>
            ) : (
              <span className="font-medium break-all text-accent-foreground">{value}</span>
            )}
          </div>
          {isSecret && (
            <Button size="icon-xs" variant="outline" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          )}
          <Button
            size="icon-xs"
            variant="outline"
            onClick={() => handleCopy(value, fieldName)}
            disabled={copiedField === fieldName}
          >
            {copiedField === fieldName ? <CircleCheckBig className="text-green-800" /> : <Copy />}
          </Button>
        </div>
      </Field>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent>
        <DialogHeader className="flex">
          <div className="flex items-center gap-2">
            <div className={cn(buttonVariants({ size: 'icon' }), 'cursor-default')}>
              <Icon />
            </div>
            <div>
              <DialogTitle>{vault.title}</DialogTitle>
              <DialogDescription>{vault.type === 'ACCOUNT' ? 'Account' : 'Note'}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <div className="flex flex-col">
            <div className="mb-4 space-y-4">
              {vault.url && (
                <Field>
                  <Label className="text-sm text-muted-foreground">URL</Label>
                  <Link
                    href={vault.url}
                    target="_blank"
                    className="block max-w-fit text-primary hover:underline"
                  >
                    {vault.url}
                  </Link>
                </Field>
              )}

              {vault.type === 'ACCOUNT' && (
                <>
                  {renderFieldWithCopy('Email', vault.data.email, 'email')}
                  {renderFieldWithCopy('Username', vault.data.username, 'username')}
                  {renderFieldWithCopy('Password', vault.data.password, 'password', true)}
                  {renderFieldWithCopy('Nomor Telepon', vault.data.phone, 'phone')}
                  {renderFieldWithCopy('PIN', vault.data.pin, 'pin', true)}
                  {vault.data.notes && (
                    <Field>
                      <Label className="text-muted-foreground">Notes</Label>
                      <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                        <AlertDescription>{vault.data.notes}</AlertDescription>
                      </Alert>
                    </Field>
                  )}
                  {vault.data.credentialHistory && vault.data.credentialHistory.length > 0 && (
                    <Field>
                      <Label className="text-muted-foreground">Credential History</Label>
                      <div className="space-y-4">
                        {vault.data.credentialHistory.map((entry, i) => (
                          <div
                            key={i}
                            className="flex flex-col gap-1 rounded-[min(var(--radius-md),10px)] bg-muted/50 px-2.5 py-2 text-xs"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span>{entry.type}</span>
                              <span className="text-muted-foreground">
                                {formatDate(entry.changedAt)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-accent-foreground">
                                {showPassword ? entry.value : '********'}
                              </span>
                              <Button
                                size="icon-xs"
                                variant="outline"
                                onClick={() => handleCopy(entry.value, `history-${i}`)}
                                disabled={copiedField === `history-${i}`}
                              >
                                {copiedField === `history-${i}` ? (
                                  <CircleCheckBig className="text-green-800" />
                                ) : (
                                  <Copy />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Field>
                  )}
                </>
              )}

              {vault.type === 'NOTE' && vault.data.content && (
                <Field>
                  <Label>Content</Label>
                  <div className="flex items-center justify-between gap-2 rounded-[min(var(--radius-md),10px)] bg-muted/50 p-4 whitespace-pre-wrap">
                    {vault.data.content}
                  </div>
                </Field>
              )}

              <Separator />

              <div className="flex gap-4">
                <div className="space-y-2 rounded-[min(var(--radius-md),10px)] bg-muted/50 px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs font-medium">Created At</span>
                  </div>
                  <span className="text-xs font-medium text-accent-foreground">
                    {formatDate(vault.createdAt)}
                  </span>
                </div>
                <div className="space-y-2 rounded-[min(var(--radius-md),10px)] bg-muted/50 px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs font-medium">Updated At</span>
                  </div>
                  <span className="text-xs font-medium text-accent-foreground">
                    {formatDate(vault.updatedAt)}
                  </span>
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
