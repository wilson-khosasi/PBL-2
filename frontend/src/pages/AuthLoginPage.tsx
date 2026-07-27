import { useState } from 'react';
import type { FormEvent } from 'react';
import { authApi } from '../api/authApi';
import { AuthLogo } from '../components/AuthLogo';
import type { AuthResult } from '../types/auth';

interface LoginPageProps {
  onLoggedIn: (result: AuthResult) => void;
  onSwitchToRegister: () => void;
}

export function LoginPage({ onLoggedIn, onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setIsSubmitting(true);
      const result = await authApi.login({ email, password });
      onLoggedIn(result);
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

        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="mt-2 text-center text-gray-800 font-semibold">Login to your account</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B4C9E] focus:border-transparent"
            />
          </div>

          {error && <p className="text-sm text-red-600 font-medium text-center">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-full bg-[#3B4C9E] text-white font-semibold py-3.5 hover:bg-[#324180] transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-[#3B4C9E] font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
