import CenteredFormLayout from '@/components/layout/centered-form-layout';
import SetupVaultForm from './setup-vault-form';

export default function SetupUnlockPage() {
  return (
    <CenteredFormLayout
      title="Create Your Vault"
      description="Set a strong master password to secure your data"
    >
      <SetupVaultForm />
    </CenteredFormLayout>
  );
}
