import { useEffect, useMemo, useState } from 'react';
import logoImage from '../assets/logo_himti.png';
import { eventApi } from '../api/eventApi';
import { registrationApi } from '../api/registrationApi';
import { withEventExtras } from '../data/dummyEvents';
import type { AuthUser } from '../types/auth';
import type { Event } from '../types/registration';

interface EventDetailPageProps {
  eventId: string;
  user: AuthUser;
  onBack: () => void;
  onLogout: () => void;
}

export function EventDetailPage({ eventId, user, onBack, onLogout }: EventDetailPageProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await eventApi.getById(eventId);
        if (isMounted) setEvent(data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Failed to load event');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadEvent();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  
  const details = useMemo(() => (event ? withEventExtras(event) : null), [event]);

  const isPastEvent = details ? new Date(details.date) <= new Date() : false;
  const isRegistrationClosed = isPastEvent || details?.registrationStatus === 'closed';

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      setSuccessMessage(null);
      setError(null);
      await registrationApi.register(eventId);
      setSuccessMessage('Registration successful! Check your My Events page.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="HIMTI logo" className="h-12 w-12 rounded-2xl object-cover" />
            <div>
              <p className="text-sm text-slate-500">HIMTI Students Organization</p>
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
              {user.fullName}
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-red-500 bg-white px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          ← Back to Events
        </button>

        {isLoading ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-slate-500">Loading event details...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-rose-100 px-6 py-4 text-rose-900 shadow-sm">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        ) : details ? (
          <div className="grid gap-6">
            {/* Banner */}
            <div className="relative h-72 overflow-hidden rounded-3xl bg-slate-800 shadow-lg sm:h-96">
              {details.imageUrl ? (
                <img src={details.imageUrl} alt={details.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400 text-lg">No image available</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-900/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center gap-3 px-8 sm:px-12">
                <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                  {details.category}
                </span>
                <h1 className="max-w-xl text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
                  {details.title}
                </h1>
                <p className="max-w-lg text-sm text-blue-50 sm:text-base">{details.description}</p>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {/* Title and Basic Info */}
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{details.title}</h2>
                  <p className="mb-6 text-sm text-slate-500">{details.category}</p>

                  <div className="grid gap-5 sm:grid-cols-4">
                    <div className="flex items-start gap-2">
                      <span className="text-xl">📅</span>
                      <div>
                        <p className="text-xs text-slate-500">Date</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {new Date(details.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xl">⏰</span>
                      <div>
                        <p className="text-xs text-slate-500">Time</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {details.agenda[0]?.startTime} - {details.agenda[details.agenda.length - 1]?.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xl">📍</span>
                      <div>
                        <p className="text-xs text-slate-500">Location</p>
                        <p className="text-sm font-semibold text-slate-900">{details.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xl">👥</span>
                      <div>
                        <p className="text-xs text-slate-500">Capacity</p>
                        <p className="text-sm font-semibold text-slate-900">{details.capacity} participants</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Event */}
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">About Event</h2>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-full shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-4xl sm:w-32">
                      🧑‍💻
                    </div>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{details.description}</p>
                  </div>
                </div>

                {/* Speakers */}
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900 mb-5">Speaker</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {details.speakers.map((sp) => (
                      <div key={sp.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <img
                          src={sp.imageUrl}
                          alt={sp.name}
                          className="h-16 w-16 shrink-0 rounded-full bg-white object-cover shadow-sm"
                        />
                        <div>
                          <p className="font-semibold text-blue-800">{sp.name}</p>
                          <p className="text-xs text-slate-500">{sp.title}</p>
                          {sp.linkedinUrl && (
                            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                              🔗 LinkedIn
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agenda */}
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                  <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 mb-5">Agenda</h2>
                      <ul className="space-y-4">
                        {details.agenda.map((item) => (
                          <li key={item.id} className="flex items-start gap-3">
                            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                            <div>
                              <span className="text-sm font-semibold text-blue-700">
                                {item.startTime} - {item.endTime}
                              </span>
                              <p className="text-sm text-slate-700">{item.title}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="hidden items-center justify-center sm:flex">
                      <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-blue-50 text-5xl">
                        🗓️
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="rounded-3xl bg-white p-6 shadow-sm sticky top-6">
                  {successMessage && (
                    <div className="mb-4 rounded-2xl bg-emerald-100 px-4 py-3 text-emerald-900 text-sm shadow-sm">
                      {successMessage}
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <p className="text-sm text-slate-500">Registration Status</p>
                      <p className="mt-1 flex items-center gap-2 font-semibold text-slate-900">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            isRegistrationClosed ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}
                        />
                        {isRegistrationClosed ? 'Closed for Registration' : 'Open for Registration'}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">Price</p>
                      <p className="mt-1 text-2xl font-bold text-emerald-600">{details.price}</p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">Event Category</p>
                      <span className="mt-2 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
                        {details.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isRegistering || isRegistrationClosed}
                      onClick={handleRegister}
                      className="w-full rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isRegistering ? 'Registering...' : isRegistrationClosed ? 'Registration Closed' : 'Register Now'}
                    </button>

                    <button
                      type="button"
                      onClick={onBack}
                      className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Back to Events
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 text-xs text-slate-500">
                    <div>
                      <p className="font-semibold text-slate-700">Share Event</p>
                      <p className="mt-2">Invite your friends to this amazing event!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-slate-500">Event not found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
