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
