import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields, usernameClient } from 'better-auth/client/plugins';
import { auth } from './auth';
import { nextCookies } from 'better-auth/next-js';

export const authClient = createAuthClient({
  plugins: [usernameClient(), inferAdditionalFields<typeof auth>(), nextCookies()],
});
