import { useEffect, useState } from 'react';
import { registrationApi } from '../api/registrationApi';
import { RegistrationCard } from '../components/RegistrationCard';
import { WelcomeBanner } from '../components/WelcomeBanner';
import logoImage from '../assets/logo_himti.png';
import noEventsImage from '../assets/no-events.png';
import { useAuth } from '../hooks/useAuth';
import type { Registration } from '../types/registration';

interface MyEventsPageProps {
  onBack: () => void;
  onViewEventDetail: (eventId: string) => void;
}

export function MyEventsPage({ onBack, onViewEventDetail }: MyEventsPageProps) {
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
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="HIMTI logo" className="h-12 w-12 rounded-2xl object-cover" />
            <div>
              <p className="text-sm text-slate-500">HIMIT Event Organizer</p>
              <h1 className="text-xl font-semibold text-slate-900">Event management made easy</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <button type="button" onClick={onBack} className="rounded-full px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">
              Home
            </button>
            <button type="button" onClick={onBack} className="rounded-full px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">
              Events
            </button>
            <button type="button" className="rounded-full px-4 py-2 font-semibold text-blue-700 transition hover:bg-blue-50">
              My Events
            </button>
            <div className="ml-3 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800">
              <span className="text-lg">👤</span>
              {user?.fullName}
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-red-500 bg-white px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-6">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          ← Back to Home
        </button>
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
              <RegistrationCard
                key={registration.id}
                registration={registration}
                onCancel={handleCancel}
                onViewDetails={onViewEventDetail}
                isCancelling={cancellingId === registration.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}