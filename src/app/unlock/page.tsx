import CenteredFormLayout from '@/components/layout/centered-form-layout';
import UnlockForm from './unlock-form';

export default function UnlockPage() {
  return (
    <CenteredFormLayout
      title="Welcome Back"
      description="Enter your master password to access your vault"
    >
      <UnlockForm />
    </CenteredFormLayout>
  );
}
