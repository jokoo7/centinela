import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';
import { username } from 'better-auth/plugins';
import { generateSalt } from './crypto/encoding';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
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
          console.log('HOOK JALAN, vaultSalt:', generateSalt());
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
