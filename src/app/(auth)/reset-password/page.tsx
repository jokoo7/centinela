import ResetPasswordForm from './reset-password-form';
import CenteredFormLayout from '@/components/wrapped-form';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;

  return (
    <CenteredFormLayout title="Reset Password" description="Enter your new password below.">
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <p className="text-red-600">
          {error === 'INVALID_TOKEN'
            ? 'Link reset password sudah kedaluwarsa atau tidak valid. Silakan minta link baru.'
            : 'Token tidak ditemukan.'}
        </p>
      )}
    </CenteredFormLayout>
  );
}
