import CenteredFormLayout from '@/components/layout/centered-form-layout';
import ForgotPasswordForm from './forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <CenteredFormLayout
      title="Forgot Password"
      description="Enter your email address and we'll send you a link to reset your password."
    >
      <ForgotPasswordForm />
    </CenteredFormLayout>
  );
}
