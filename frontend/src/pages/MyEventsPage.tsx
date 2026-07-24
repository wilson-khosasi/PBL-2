import { useEffect, useState } from 'react';
import { registrationApi } from '../api/registrationApi';
import { RegistrationCard } from '../components/RegistrationCard';
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
      <nav className="bg-gray-200 py-4 text-center font-semibold">[NAVBAR]</nav>

      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-blue-700 flex items-center justify-center text-blue-700 text-2xl">
            👤
          </div>
          <div>
            <p className="font-semibold text-lg">Welcome Home!!</p>
            <p className="text-gray-600">[User name]</p>
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
      </div>
    </div>
  );
}