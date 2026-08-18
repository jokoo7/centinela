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
import { Field, FieldGroup } from '@/components/ui/field';
import LoadingButton from '@/components/loading-button';
import { DecryptedVaultItem, VaultItemFormInput } from '@/types/vault-type';
import { vaultItemFormSchema } from '@/validation/vault-schema';
import { useEffect } from 'react';
import { useAppForm } from '@/lib/form';
import { encryptData } from '@/lib/crypto/encryption';
import { useVaultKey } from '@/hooks/use-vault-key';
import { createEncryptedVaultItem, updateEncryptedVaultItem } from './action';
import isEqual from 'lodash.isequal';
import { toast } from 'sonner';

function defaultAccountValues(): VaultItemFormInput {
  return {
    title: '',
    url: '',
    pinned: false,
    type: 'ACCOUNT',
    data: {
      email: '',
      username: '',
      phone: '',
      password: '',
      pin: '',
      notes: '',
    },
  };
}

function defaultNoteValues(): VaultItemFormInput {
  return {
    title: '',
    url: '',
    pinned: false,
    type: 'NOTE',
    data: {
      content: '',
    },
  };
}

function toFormValues(item: DecryptedVaultItem): VaultItemFormInput {
  const base = { title: item.title, url: item.url ?? undefined, pinned: item.pinned };

  if (item.type === 'ACCOUNT') {
    const { email, username, phone, password, pin, notes } = item.data;
    return { ...base, type: 'ACCOUNT', data: { email, username, phone, password, pin, notes } };
  }

  return { ...base, type: 'NOTE', data: { content: item.data.content } };
}

interface VaultFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingItem?: DecryptedVaultItem;
  itemId?: string;
}

export default function VaultForm({ open, onOpenChange, existingItem, itemId }: VaultFormProps) {
  const { vaultKey } = useVaultKey();

  const isEditMode = existingItem != undefined && itemId !== undefined;

  function switchItemType(
    newType: VaultItemFormInput['type'],
    current: VaultItemFormInput,
  ): VaultItemFormInput {
    const base = newType === 'ACCOUNT' ? defaultAccountValues() : defaultNoteValues();
    return { ...base, title: current.title, url: current.url, pinned: current.pinned };
  }

  const form = useAppForm({
    defaultValues: existingItem ? toFormValues(existingItem) : defaultAccountValues(),
    validators: {
      onChange: vaultItemFormSchema,
      onSubmit: vaultItemFormSchema,
    },
    onSubmit: async ({ value }) => {
      const parsed = vaultItemFormSchema.parse(value);

      if (isEditMode) {
        const originalValues = vaultItemFormSchema.parse(toFormValues(existingItem));
        if (isEqual(parsed, originalValues)) {
          toast('No changes to save');
          onOpenChange(false);
          return;
        }
      }

      try {
        const { data, ...others } = value;
        const { ciphertext, iv } = await encryptData(data, vaultKey!);

        const payload = { ...others, ciphertext, iv };
        const { error } = isEditMode
          ? await updateEncryptedVaultItem(itemId, payload)
          : await createEncryptedVaultItem(payload);

        if (error) {
          toast('Failed to save vault');
          return;
        }

        toast('Vault saved successfully');
        onOpenChange(false);
      } catch {
        toast('Something went wrong');
      }
    },
  });

  useEffect(() => {
    if (!open) return;

    if (existingItem) {
      form.reset(toFormValues(existingItem));
    } else {
      form.reset(defaultAccountValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, itemId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Vault' : 'Add New Vault'}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update the details for this vault item.'
              : 'Enter the details for the new vault item.'}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 pb-4">
            <FieldGroup>
              <div className="flex flex-col gap-3">
                <form.AppField name="type">
                  {(field) => (
                    <field.SelectField
                      label="Type"
                      disabled={isEditMode}
                      placeholder="-- Select a type --"
                      groupLabel="Vault Item Type"
                      options={[
                        { value: 'ACCOUNT', label: 'Account' },
                        { value: 'NOTE', label: 'Note' },
                      ]}
                      onValueChange={(value) => {
                        const newType = value as VaultItemFormInput['type'];
                        form.reset(switchItemType(newType, form.state.values));
                      }}
                    />
                  )}
                </form.AppField>

                <form.AppField name="title">
                  {(field) => <field.TextField label="Title" placeholder="e.g. Account Gmail" />}
                </form.AppField>

                <form.AppField name="url">
                  {(field) => (
                    <field.TextField
                      type="url"
                      label="URL"
                      placeholder="e.g. https://example.com"
                    />
                  )}
                </form.AppField>
              </div>

              {/* Dynamic Form */}
              <form.Subscribe selector={(state) => state.values.type}>
                {(type) =>
                  type === 'ACCOUNT' ? (
                    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Please provide at least one identifier (email/username/phone) and one
                        credential (password/PIN).
                      </p>

                      <div className="mb-4 flex flex-col gap-3">
                        <span className="text-base font-medium">Identifiers</span>

                        <form.AppField name="data.email">
                          {(field) => (
                            <field.TextField
                              label="Email"
                              type="email"
                              placeholder="e.g. your@gmail.com"
                              autoComplete="off"
                              data-1p-ignore
                              data-lpignore="true"
                              data-bwignore
                            />
                          )}
                        </form.AppField>

                        <form.AppField name="data.username">
                          {(field) => (
                            <field.TextField
                              label="Username"
                              placeholder="e.g. bahlil_ganteng"
                              autoComplete="off"
                              data-1p-ignore
                              data-lpignore="true"
                              data-bwignore
                            />
                          )}
                        </form.AppField>

                        <form.AppField name="data.phone">
                          {(field) => (
                            <field.TextField
                              label="Phone"
                              type="tel"
                              inputMode="tel"
                              placeholder="e.g. +62 812-xxxx-xxxx"
                            />
                          )}
                        </form.AppField>
                      </div>

                      <div className="mb-4 flex flex-col gap-3">
                        <span className="text-base font-medium">Credentials</span>

                        <form.AppField name="data.password">
                          {(field) => (
                            <field.PasswordField
                              label="Password"
                              placeholder="Enter password"
                              autoComplete="new-password"
                              data-1p-ignore
                              data-lpignore="true"
                              data-bwignore
                            />
                          )}
                        </form.AppField>

                        <form.AppField name="data.pin">
                          {(field) => (
                            <field.PasswordField
                              label="PIN"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={12}
                              placeholder="Enter your digit PIN"
                              autoComplete="off"
                              data-1p-ignore
                              data-lpignore="true"
                              data-bwignore
                            />
                          )}
                        </form.AppField>
                      </div>

                      <form.AppField name="data.notes">
                        {(field) => (
                          <field.TextareaField
                            label="Note (opsional)"
                            placeholder="Type your note here."
                          />
                        )}
                      </form.AppField>
                    </div>
                  ) : (
                    <form.AppField name="data.content">
                      {(field) => (
                        <field.TextareaField
                          label="Secure Note"
                          placeholder="Type your secure note here."
                        />
                      )}
                    </form.AppField>
                  )
                }
              </form.Subscribe>
            </FieldGroup>
          </div>
          <DialogFooter className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <form.Subscribe
              selector={(state) => [state.isSubmitting, state.canSubmit, state.values] as const}
            >
              {([isSubmitting, canSubmit, values]) => {
                const noChange = isEditMode && isEqual(values, toFormValues(existingItem));
                return (
                  <Field className="sm:w-fit">
                    <LoadingButton
                      loading={isSubmitting}
                      disabled={!canSubmit || noChange}
                      type="submit"
                    >
                      Save
                    </LoadingButton>
                  </Field>
                );
              }}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
