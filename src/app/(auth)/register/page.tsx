import RegisterForm from './register-form';
import { Metadata } from 'next';
import CenteredFormLayout from '@/components/wrapped-form';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return (
    <CenteredFormLayout
      title="Get Started"
      description="Join now and take control of your digital security."
    >
      <RegisterForm />
    </CenteredFormLayout>
  );
}
