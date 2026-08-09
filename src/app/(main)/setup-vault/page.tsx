import CenteredFormLayout from '@/components/layout/centered-form-layout';
import SetupVaultForm from './setup-vault-form';
import { getServerSession } from '@/lib/get-session';
import { redirect } from 'next/navigation';

export default async function SetupUnlockPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect('/login');

  return (
    <CenteredFormLayout
      title="Create Your Vault"
      description="Set a strong master password to secure your data"
    >
      <SetupVaultForm user={user} />
    </CenteredFormLayout>
  );
}
