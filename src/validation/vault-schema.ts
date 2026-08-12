import { VaultItemFormInput } from '@/types/vault-type';
import * as z from 'zod';

const phonePattern = /^[0-9+()\- ]+$/;
const pinPattern = /^\d{4,12}$/;

export const accountDataSchema = z
  .object({
    email: z.string().trim().pipe(z.email('Format email tidak valid')).optional().or(z.literal('')),
    username: z.string().trim().optional(),
    phone: z
      .string()
      .trim()
      .regex(phonePattern, 'Format nomor telepon tidak valid')
      .optional()
      .or(z.literal('')),

    password: z.string().optional(),
    pin: z
      .string()
      .regex(pinPattern, 'PIN harus berupa 4-12 digit angka')
      .optional()
      .or(z.literal('')),

    notes: z.string().trim().max(2000, 'Catatan maksimal 2000 karakter').optional(),
  })
  .superRefine((data, ctx) => {
    const hasIdentifier = Boolean(data.email || data.username || data.phone);
    if (!hasIdentifier) {
      const message = 'Minimal isi salah satu: email, username, atau nomor telepon';
      ctx.addIssue({ code: 'custom', message, path: ['email'] });
      ctx.addIssue({ code: 'custom', message, path: ['username'] });
      ctx.addIssue({ code: 'custom', message, path: ['phone'] });
    }

    const hasCredential = Boolean(data.password || data.pin);
    if (!hasCredential) {
      const message = 'Minimal isi salah satu: password atau PIN';
      ctx.addIssue({ code: 'custom', message, path: ['password'] });
      ctx.addIssue({ code: 'custom', message, path: ['pin'] });
    }
  });

export const noteDataSchema = z.object({
  content: z
    .string()
    .trim()
    .max(10_000, 'Catatan maksimal 10.000 karakter')
    .refine((val) => val.length > 0, {
      error: 'Isi catatan tidak boleh kosong',
    }),
});

export const metadataSchema = z.object({
  title: z.string().trim().min(1, 'Title wajib diisi.').max(100, 'Maksimal 100 karakter'),
  url: z.string().trim().pipe(z.url('Format URL tidak valid')).optional().or(z.literal('')),
  pinned: z.boolean(),
});

export const vaultItemFormSchema = z.discriminatedUnion('type', [
  metadataSchema.extend({
    type: z.literal('ACCOUNT'),
    data: accountDataSchema,
  }),
  metadataSchema.extend({
    type: z.literal('NOTE'),
    data: noteDataSchema,
  }),
]);

type _SchemaMatchesType =
  z.infer<typeof vaultItemFormSchema> extends VaultItemFormInput
    ? VaultItemFormInput extends z.infer<typeof vaultItemFormSchema>
      ? true
      : false
    : false;

const _typeCheck: _SchemaMatchesType = true;
void _typeCheck;

export type VaultItemFormSchema = z.infer<typeof vaultItemFormSchema>;
