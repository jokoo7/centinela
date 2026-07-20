import { dummyVaultItems } from '@/lib/dummy-data';
import VaultClient from './vault-client';

export default function VaultPage() {
  return <VaultClient initialVaults={dummyVaultItems} />;
}
