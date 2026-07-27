import { useState } from 'react';
import type { FormEvent } from 'react';
import { authApi } from '../api/authApi';
import { AuthLogo } from '../components/AuthLogo';
import type { AuthResult } from '../types/auth';

interface RegisterPageProps {
  onRegistered: (result: AuthResult) => void;
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onRegistered, onSwitchToLogin }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await authApi.register({ name, email, password, confirmPassword });
      onRegistered(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#e4e4e4] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl px-8 py-10 sm:px-10">
        <AuthLogo />

        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">Create Account</h1>
        <p className="mt-2 text-center text-gray-500 font-medium">
          Fill in the details to create your account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-800 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              minLength={3}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B4C9E] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold text-gray-800 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B4C9E] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-semibold text-gray-800 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B4C9E] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-semibold text-gray-800 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your Password"
              required
              minLength={6}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B4C9E] focus:border-transparent"
            />
          </div>

          {error && <p className="text-sm text-red-600 font-medium text-center">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-full bg-[#3B4C9E] text-white font-semibold py-3.5 hover:bg-[#324180] transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#3B4C9E] font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
