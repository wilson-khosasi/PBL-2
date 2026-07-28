import { useEffect, useState } from 'react';
import { registrationApi } from '../api/registrationApi';
import { RegistrationCard } from '../components/RegistrationCard';
import { Navbar } from '../components/Navbar';
import { WelcomeBanner } from '../components/WelcomeBanner';
import noEventsImage from '../assets/no-events.png';
import type { Registration } from '../types/registration';

// TEMP: ganti ke userId dari auth context/JWT pas Member 1 udah selesai
const TEMP_USER_ID = '8aad09ad-e5e1-452e-947c-900f0be862a9';

export function MyEventsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      const data = await registrationApi.getMyRegistrations(TEMP_USER_ID);
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
      await registrationApi.cancel(registrationId, TEMP_USER_ID);
      setRegistrations((prev) => prev.filter((r) => r.id !== registrationId));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to cancel');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <WelcomeBanner />

        <h2 className="font-semibold mb-4">Attended Event</h2>

        {isLoading && <p className="text-gray-500">Loading...</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!isLoading && !error && registrations.length === 0 && (
          <div className="flex justify-center py-8">
            <img src={noEventsImage} alt="No events yet" className="max-w-sm w-full" />
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
      </div>
    </div>
  );
}