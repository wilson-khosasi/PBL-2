import { useState } from 'react';
import { ApiError, getFieldErrors } from '../api/apiClient';
import { authApi } from '../api/authApi';
import { AuthField } from '../components/auth/AuthField';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);
    setIsSubmitting(true);

    try {
      const result = await authApi.login({ email, password });
      signIn(result.token, result.user);
    } catch (error) {
      if (error instanceof ApiError) {
        setFieldErrors(getFieldErrors(error.validationIssues));
        setFormError(error.message);
      } else {
        setFormError('Unable to connect to the server. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Login to your account"
      footer={
        <>
          Don’t have an account?{' '}
          <a href="/register" className="text-[#415aa7] transition hover:text-[#31498f]">
            Register
          </a>
        </>
      }
    >
      <form className="space-y-6 sm:space-y-7" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          error={fieldErrors.email}
          disabled={isSubmitting}
          onChange={setEmail}
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          error={fieldErrors.password}
          disabled={isSubmitting}
          onChange={setPassword}
        />

        {formError && <p className="text-center text-sm font-medium text-red-600">{formError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-[22px] border-2 border-black/20 bg-[#415aa7] px-6 py-4 text-xl font-medium text-white transition hover:bg-[#31498f] focus:outline-none focus:ring-4 focus:ring-[#415aa7]/30 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-[28px] sm:py-5 sm:text-2xl"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </AuthLayout>
  );
}
