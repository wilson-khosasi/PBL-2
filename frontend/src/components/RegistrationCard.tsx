import type { Registration } from '../types/registration';

interface RegistrationCardProps {
  registration: Registration;
  onCancel: (registrationId: string) => void;
  isCancelling?: boolean;
}

export function RegistrationCard({ registration, onCancel, isCancelling }: RegistrationCardProps) {
  const { event } = registration;

  const formattedDate = new Date(event.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="border border-yellow-400 rounded-xl p-4 flex gap-4 items-center">
      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0" />
      )}

      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{event.description}</p>

        <div className="flex items-center gap-1 text-sm text-blue-700">
          <span>📅</span>
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-blue-700">
          <span>📍</span>
          <span>{event.location}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-800">
          See Details
        </button>
        <button
          onClick={() => onCancel(registration.id)}
          disabled={isCancelling}
          className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 disabled:opacity-50"
        >
          {isCancelling ? 'Cancelling...' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}