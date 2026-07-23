'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import { Edit2, Plus } from 'lucide-react';
import LoadingButton from '@/components/loading-button';
import { VaultItemFormValues, VaultItemMetadata, VaultItemPlaintext } from '@/types/vault-type';
import { vaultItemFormSchema } from '@/validation/vault-schema';
import { useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { InputPassword } from '@/components/input-password';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';

function defaultAccountValues(): VaultItemFormValues {
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

function defaultNoteValues(): VaultItemFormValues {
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

function toFormValues(item: VaultItemMetadata & VaultItemPlaintext): VaultItemFormValues {
  if (item.type === 'ACCOUNT') {
    const { email, username, phone, password, pin, notes } = item.data;
    return { ...item, data: { email, username, phone, password, pin, notes } };
  }

  return item;
}

type VaultFormProps =
  | { existingItem?: undefined; itemId?: undefined }
  | { existingItem: VaultItemMetadata & VaultItemPlaintext; itemId: string };

export default function VaultForm({ existingItem, itemId }: VaultFormProps) {
  const isEditMode = existingItem != undefined;
  // const existingAccountData = existingItem?.type === "ACCOUNT" ? existingItem.data : undefined

  const form = useForm({
    defaultValues: existingItem ? toFormValues(existingItem) : defaultAccountValues(),
    validators: {
      onChange: vaultItemFormSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log(value);
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
                {/* TYPE */}
                <form.Field name="type">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <Label htmlFor={field.name}>Type</Label>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            const newType = value as VaultItemFormValues['type'];
                            const current = form.state.values;
                            const nextValues =
                              newType === 'ACCOUNT'
                                ? {
                                    ...defaultAccountValues(),
                                    title: current.title,
                                    url: current.url,
                                    pinned: current.pinned,
                                  }
                                : {
                                    ...defaultNoteValues(),
                                    title: current.title,
                                    url: current.url,
                                    pinned: current.pinned,
                                  };

                            form.reset(nextValues);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="-- Select a type --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Vault Item Type</SelectLabel>
                              <SelectItem value="ACCOUNT">Account</SelectItem>
                              <SelectItem value="NOTE">Note</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* TITLE */}
                <form.Field name="title">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid} className="text-start">
                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                        <Input
                          id={field.name}
                          type="text"
                          name={field.name}
                          value={field.state.value as string}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g. Account Gmail"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* URL  */}
                <form.Field name="url">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid} className="text-start">
                        <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                        <Input
                          type="url"
                          id={field.name}
                          name={field.name}
                          value={field.state.value as string}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://example.com"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                </form.Field>
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

                        <form.Field name="data.email">
                          {(field) => {
                            const isInvalid =
                              field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid} className="text-start">
                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                <Input
                                  id={field.name}
                                  type="email"
                                  inputMode="email"
                                  placeholder="your@gmail.com"
                                  autoComplete="email"
                                  value={field.state.value as string}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </Field>
                            );
                          }}
                        </form.Field>

                        <form.Field name="data.username">
                          {(field) => {
                            const isInvalid =
                              field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid} className="text-start">
                                <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                                <Input
                                  id={field.name}
                                  type="text"
                                  inputMode="text"
                                  placeholder="username"
                                  autoComplete="username"
                                  value={field.state.value as string}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </Field>
                            );
                          }}
                        </form.Field>

                        <form.Field name="data.phone">
                          {(field) => {
                            const isInvalid =
                              field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid} className="text-start">
                                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                <Input
                                  id={field.name}
                                  type="tel"
                                  inputMode="tel"
                                  placeholder="+62 812-xxxx-xxxx"
                                  autoComplete="tel"
                                  // pattern="[0-9+()\- ]*"
                                  value={field.state.value as string}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </Field>
                            );
                          }}
                        </form.Field>
                      </div>

                      {/* --- Credentials: field tetap, semua opsional --- */}
                      <div className="mb-4 flex flex-col gap-3">
                        <span className="text-base font-medium">Credentials</span>

                        <form.Field name="data.password">
                          {(field) => {
                            const isInvalid =
                              field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid} className="text-start">
                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                <InputPassword
                                  id={field.name}
                                  placeholder="password"
                                  autoComplete="new-password"
                                  value={field.state.value as string}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </Field>
                            );
                          }}
                        </form.Field>

                        <form.Field name="data.pin">
                          {(field) => {
                            const isInvalid =
                              field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid} className="text-start">
                                <FieldLabel htmlFor={field.name}>PIN</FieldLabel>
                                <Input
                                  id={field.name}
                                  type="password"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  maxLength={12}
                                  autoComplete="off"
                                  placeholder="4-12 digit angka"
                                  value={field.state.value as string}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </Field>
                            );
                          }}
                        </form.Field>
                      </div>

                      <form.Field name="data.notes">
                        {(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid} className="text-start">
                              <FieldLabel htmlFor={field.name}>Note (opsional)</FieldLabel>
                              <Textarea
                                id={field.name}
                                value={field.state.value as string}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Type your secure note here."
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          );
                        }}
                      </form.Field>
                    </div>
                  ) : (
                    <form.Field name="data.content">
                      {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid} className="text-start">
                            <FieldLabel htmlFor={field.name}>Secure Note</FieldLabel>
                            <Textarea
                              id={field.name}
                              value={field.state.value as string}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              placeholder="Type your secure note here."
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        );
                      }}
                    </form.Field>
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
