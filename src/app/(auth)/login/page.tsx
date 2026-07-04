import LoginForm from './login-form';
import { Metadata } from 'next';
import CenteredFormLayout from '@/components/layout/centered-form-layout';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <CenteredFormLayout
      title="Welcome Back"
      description="Your secure vault is waiting. Log in to continue."
    >
      <LoginForm />
    </CenteredFormLayout>
  );
}
