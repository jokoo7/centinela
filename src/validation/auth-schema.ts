import * as z from 'zod';

export const usernameSchema = z
  .string()
  .trim()
  .min(1, 'Username tidak boleh kosong')
  .max(12, { message: 'Username maksimal 12 karakter' })
  .regex(/^\S+$/, { message: 'Username tidak boleh mengandung spasi' })
  .regex(/^[a-z0-9_]+$/, {
    message: 'Username hanya boleh berisi huruf kecil, angka, dan underscore (_)',
  });
export const emailSchema = z.string().trim().pipe(z.email('Format email tidak valid'));
export const nameSchema = z.string().trim().min(1, 'Nama tidak boleh kosong');
export const passwordSchema = z
  .string()
  .min(1, 'Password wajib diisi.')
  .min(8, 'Password minimal 8 karakter.')
  .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf kapital')
  .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka');

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, 'Email atau username wajib diisi'),
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const updateProfileDetailSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Masukkan password akun ini sekarang'),
  newPassword: passwordSchema,
});

export const withEmailSchema = z.object({
  email: emailSchema,
});

export const withPasswordSchema = z.object({
  password: passwordSchema,
});
