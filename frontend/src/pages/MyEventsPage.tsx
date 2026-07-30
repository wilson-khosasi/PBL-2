import { useEffect, useState } from 'react';
import { registrationApi } from '../api/registrationApi';
import { RegistrationCard } from '../components/RegistrationCard';
import type { AuthResult } from '../types/auth';
import type { Registration } from '../types/registration';

interface MyEventsPageProps {
  auth: AuthResult;
  onLogout: () => void;
  onBack: () => void;
}

export function MyEventsPage({ auth, onLogout, onBack }: MyEventsPageProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      const data = await registrationApi.getMyRegistrations(auth.user.id);
      setRegistrations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleCancel = async (registrationId: string) => {
    try {
      setCancellingId(registrationId);
      await registrationApi.cancel(registrationId, auth.user.id);
      setRegistrations((prev) => prev.filter((r) => r.id !== registrationId));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to cancel');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-sm text-blue-700 font-semibold">My Events</p>
            <p className="text-sm text-slate-500">{auth.user.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Back to Home
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-blue-700 flex items-center justify-center text-blue-700 text-2xl">
            👤
          </div>
          <div>
            <p className="font-semibold text-lg">Welcome back, {auth.user.name}!</p>
            <p className="text-gray-600">Your saved events appear below.</p>
          </div>
        </div>

        <h2 className="font-semibold mb-4">Attended Events</h2>

        {isLoading && <p className="text-gray-500">Loading...</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!isLoading && !error && registrations.length === 0 && (
          <div className="flex justify-center py-16">
            <div className="w-56 h-56 rounded-full bg-blue-400 flex items-center justify-center text-white text-center p-6 font-medium">
              Seems like you don't have any Attended Events
            </div>
          </div>
        )}

        {!isLoading && !error && registrations.length > 0 && (
          <div className="flex flex-col gap-4">
            {registrations.map((registration) => (
              <RegistrationCard
                key={registration.id}
                registration={registration}
                onCancel={handleCancel}
                isCancelling={cancellingId === registration.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}