import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';
import { username } from 'better-auth/plugins';
import { generateSalt } from './crypto/encoding';
import { nextCookies } from 'better-auth/next-js';
import { sendEmail } from './email';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: 900, // 15 menit
    revokeSessionsOnPasswordReset: true, // logout semua device lain setelah reset berhasil
    sendResetPassword: async ({ user, url }) => {
      try {
        await sendEmail({
          to: user.email,
          subject: 'Reset your password',
          text: `Click the link to reset your password: ${url}`,
        });
      } catch (err) {
        console.error('Failed to send reset password email:', err);
      }
    },
  },
  user: {
    additionalFields: {
      vaultSalt: {
        type: 'string',
        required: false,
        input: false,
      },
      encryptedVaultKey: {
        type: 'string',
        required: false,
        input: false,
      },
      encryptedVaultKeyIv: {
        type: 'string',
        required: false,
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              vaultSalt: generateSalt(),
            },
          };
        },
      },
    },
  },
  plugins: [
    username({
      minUsernameLength: 1,
      maxUsernameLength: 12,
      usernameValidator: (username) => /^[a-z0-9_]+$/.test(username),
    }),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
