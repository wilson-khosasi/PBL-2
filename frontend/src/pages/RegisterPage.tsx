import { useState } from 'react';
import { ApiError, getFieldErrors } from '../api/apiClient';
import { authApi } from '../api/authApi';
import { AuthField } from '../components/auth/AuthField';
import { AuthLayout } from '../components/auth/AuthLayout';
import type { RegisterInput } from '../types/auth';

const initialForm: RegisterInput = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof RegisterInput, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);
    setSuccessMessage(null);

    if (form.password !== form.confirmPassword) {
      setFieldErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setIsSubmitting(true);

    try {
      await authApi.register(form);
      setSuccessMessage('Account created successfully. You can now log in.');
      setForm(initialForm);
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
      title="Create Account"
      subtitle="Fill in the details to create your account"
      footer={
        <>
          Already have an account?{' '}
          <a href="/login" className="text-[#415aa7] transition hover:text-[#31498f]">
            Login
          </a>
        </>
      }
    >
      <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          value={form.fullName}
          error={fieldErrors.fullName}
          disabled={isSubmitting}
          onChange={(value) => updateField('fullName', value)}
        />
        <AuthField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          error={fieldErrors.email}
          disabled={isSubmitting}
          onChange={(value) => updateField('email', value)}
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          error={fieldErrors.password}
          disabled={isSubmitting}
          onChange={(value) => updateField('password', value)}
        />
        <AuthField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          error={fieldErrors.confirmPassword}
          disabled={isSubmitting}
          onChange={(value) => updateField('confirmPassword', value)}
        />

        {formError && <p className="text-center text-sm font-medium text-red-600">{formError}</p>}
        {successMessage && <p className="text-center text-sm font-medium text-green-700">{successMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-[22px] border-2 border-black/20 bg-[#415aa7] px-6 py-4 text-xl font-medium text-white transition hover:bg-[#31498f] focus:outline-none focus:ring-4 focus:ring-[#415aa7]/30 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-[28px] sm:py-5 sm:text-2xl"
        >
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </AuthLayout>
  );
}
