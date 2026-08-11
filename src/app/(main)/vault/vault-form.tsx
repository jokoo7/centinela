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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Edit2, Plus } from 'lucide-react';
import LoadingButton from '@/components/loading-button';
import { DecryptedVaultItem, VaultItemFormInput } from '@/types/vault-type';
import { vaultItemFormSchema } from '@/validation/vault-schema';
import { useEffect } from 'react';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { useAppForm } from '@/lib/form';
import { encryptData } from '@/lib/crypto/encryption';
import { useVaultKey } from '@/hooks/use-vault-key';
import { createEncryptedVaultItem, updateEncryptedVaultItem } from './action';
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

type VaultFormProps =
  | { existingItem?: undefined; itemId?: undefined }
  | { existingItem: DecryptedVaultItem; itemId: string };

export default function VaultForm({ existingItem, itemId }: VaultFormProps) {
  const { vaultKey } = useVaultKey();

  const isEditMode = existingItem != undefined;
  // const existingAccountData = existingItem?.type === "ACCOUNT" ? existingItem.data : undefined

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
    },
    onSubmit: async ({ value }) => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const { data, ...others } = value;
        const { ciphertext, iv } = await encryptData(data, vaultKey!);

        const payload = { ...others, ciphertext, iv };
        const { error } = isEditMode
          ? await updateEncryptedVaultItem(itemId, payload)
          : await createEncryptedVaultItem(payload);

        toast(error ? 'Gagal menyimpan vault' : 'Berhasil menyimpan vault');
      } catch {
        toast('Gagal membuat vault');
      }
    },
  });

  useEffect(() => {
    if (existingItem) {
      form.reset(toFormValues(existingItem));
    } else {
      form.reset(defaultAccountValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return (
    <Dialog onOpenChange={(c) => !c && form.reset()}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant="secondary" size="icon">
            <Edit2 />
          </Button>
        ) : (
          <ButtonGroup>
            <Button>Add New Vault</Button>
            <ButtonGroupSeparator />
            <Button size="icon">
              <Plus />
            </Button>
          </ButtonGroup>
        )}
      </DialogTrigger>
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
                        Minimal isi salah satu identifier (email/username/telepon) dan salah satu
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

                      {/* --- Credentials: field tetap, semua opsional --- */}
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
            <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit] as const}>
              {([isSubmitting, canSubmit]) => (
                <Field className="sm:w-fit">
                  <LoadingButton loading={isSubmitting} disabled={!canSubmit} type="submit">
                    Save
                  </LoadingButton>
                </Field>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
