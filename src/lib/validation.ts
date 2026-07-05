import * as z from 'zod';

export const usernameSchema = z
  .string()
  .min(1, 'Username tidak boleh kosong')
  .max(12, { message: 'Username maksimal 12 karakter' })
  .regex(/^\S+$/, { message: 'Username tidak boleh mengandung spasi' })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: 'Username hanya boleh berisi huruf, angka, dan underscore (_)',
  });

export const passwordSchema = z
  .string()
  .min(1, 'Password wajib diisi.')
  .min(8, 'Password minimal 8 karakter.')
  .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf kapital')
  .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka');

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Nama tidak boleh kosong'),
  username: usernameSchema,
  email: z.email(),
  password: passwordSchema,
});

export const masterPasswordSchema = z
  .string()
  .min(8, 'Master password minimal 8 karakter')
  .regex(/^[^-]*$/, 'Master password tidak boleh mengandung -');

export const setupMasterPasswordSchema = z
  .object({
    masterPassword: masterPasswordSchema,
    confirmMasterPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.masterPassword === data.confirmMasterPassword, {
    error: 'Konfirmasi password tidak cocok',
    path: ['confirmMasterPassword'],
  });

export const unlockVaultSchema = z.object({
  masterPassword: z.string().min(1, 'Master password wajib diisi'),
});

// IDENTIFIER
export const identifierSchema = z.discriminatedUnion('identifierType', [
  z.object({
    identifierType: z.literal('USERNAME'),
    value: z.string().min(1, 'Username tidak boleh kosong'),
  }),
  z.object({
    identifierType: z.literal('EMAIL'),
    value: z.email('Format email tidak valid'),
  }),
  z.object({
    identifierType: z.literal('PHONE'),
    value: z.string().regex(/^\+?[0-9]{8,15}$/, 'Format nomor HP tidak valid'),
  }),
]);

// CREDENTIAL
export const credentialSchema = z.discriminatedUnion('credentialType', [
  z.object({
    credentialType: z.literal('PASSWORD'),
    value: z
      .string()
      .min(1, 'Password tidak boleh kosong')
      .refine((val) => !val.includes('-'), { error: 'Password tidak boleh mengandung (-)' }),
  }),
  z.object({
    credentialType: z.literal('PIN'),
    value: z.string().min(1, 'Pin tidak boleh kosong'),
  }),
]);

// CREDENTIAL HISTORY
export const credentialHistoryEntrySchema = z.object({
  credential: credentialSchema,
  changeAt: z.iso.datetime(),
});

// ACCOUNT DATA
export const accountDataSchema = z.object({
  identifier: z
    .array(identifierSchema)
    .min(1, 'Minimal harus ada satu identifier (username/email/phone)'),
  credential: credentialSchema,
  totpSecret: z.string().optional(),
  notes: z.string().optional(),
  credentialHistory: z.array(credentialHistoryEntrySchema).optional(),
});

// NOTE DATA
export const noteDataSchema = z.object({
  content: z.string().min(1, 'Isi catatan tidak boleh kosong'),
});

// VAULT ITEM DATA
export const vaultItemDataSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('ACCOUNT'),
    data: accountDataSchema,
  }),
  z.object({
    type: z.literal('NOTE'),
    data: noteDataSchema,
  }),
]);

// TODO: METADATA (bagian plaintext, level Prisma — bukan yang dienkripsi)
