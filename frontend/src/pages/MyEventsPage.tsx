import { useEffect, useState } from 'react';
import { registrationApi } from '../api/registrationApi';
import { RegistrationCard } from '../components/RegistrationCard';
import { WelcomeBanner } from '../components/WelcomeBanner';
import noEventsImage from '../assets/no-events.png';
import { useAuth } from '../hooks/useAuth';
import type { Registration } from '../types/registration';

interface MyEventsPageProps {
  onBack: () => void;
}

export function MyEventsPage({ onBack }: MyEventsPageProps) {
  const { user, logout } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setIsLoading(true);
        const data = await registrationApi.getMyRegistrations();
        setRegistrations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchRegistrations();
  }, []);

  const handleCancel = async (registrationId: string) => {
    try {
      setCancellingId(registrationId);
      await registrationApi.cancel(registrationId);
      setRegistrations((current) => current.filter((registration) => registration.id !== registrationId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel registration');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-blue-700">My Events</p>
            <p className="text-sm text-slate-500">{user?.fullName}</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={onBack} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
              Back to Home
            </button>
            <button type="button" onClick={logout} className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-6">
        <WelcomeBanner />
        <h2 className="mb-4 font-semibold">Attended Events</h2>
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!isLoading && !error && registrations.length === 0 && (
          <div className="flex justify-center py-8">
            <img src={noEventsImage} alt="No events yet" className="w-full max-w-sm" />
          </div>
        )}
        {!isLoading && !error && registrations.length > 0 && (
          <div className="flex flex-col gap-4">
            {registrations.map((registration) => (
              <RegistrationCard key={registration.id} registration={registration} onCancel={handleCancel} isCancelling={cancellingId === registration.id} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
