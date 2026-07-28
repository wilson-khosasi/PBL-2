import { useEffect, useState } from 'react';
import logoImage from '../assets/logo_himti.png';
import { eventApi } from '../api/eventApi';
import { registrationApi } from '../api/registrationApi';
import type { AuthResult } from '../types/auth';
import type { Event } from '../types/registration';

interface EventDetailPageProps {
  eventId: string;
  auth: AuthResult;
  onBack: () => void;
  onLogout: () => void;
}

export function EventDetailPage({ eventId, auth, onBack, onLogout }: EventDetailPageProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await eventApi.getById(eventId);
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load event');
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [eventId]);

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      setSuccessMessage(null);
      setError(null);
      await registrationApi.register(eventId, auth.user.id);
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
              <p className="text-sm text-slate-500">HIMTI Event Organizer</p>
              <h1 className="text-xl font-semibold text-slate-900">Event management made easy</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <button type="button" className="rounded-full px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">
              Home
            </button>
            <button type="button" className="rounded-full px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">
              Events
            </button>
            <button type="button" className="rounded-full px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">
              Tickets
            </button>
            <button type="button" className="rounded-full px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">
              About
            </button>
            <div className="ml-3 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800">
              {auth.user.name}
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
        ) : event ? (
          <div className="grid gap-6">
            {/* Image Section */}
            <div className="relative h-96 overflow-hidden rounded-3xl bg-slate-200 shadow-lg">
              {event.imageUrl ? (
                <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400 text-lg">No image available</div>
              )}
            </div>

            {/* Event Details */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {/* Title and Basic Info */}
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                      Event
                    </span>
                    <span className="text-sm text-slate-500">
                      {new Date(event.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h1 className="text-4xl font-bold text-slate-900 mb-4">{event.title}</h1>

                  <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📅</span>
                      <div>
                        <p className="text-sm text-slate-500">Date</p>
                        <p className="font-semibold text-slate-900">
                          {new Date(event.date).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🕐</span>
                      <div>
                        <p className="text-sm text-slate-500">Time</p>
                        <p className="font-semibold text-slate-900">
                          {new Date(event.date).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📍</span>
                      <div>
                        <p className="text-sm text-slate-500">Location</p>
                        <p className="font-semibold text-slate-900">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">👥</span>
                      <div>
                        <p className="text-sm text-slate-500">Capacity</p>
                        <p className="font-semibold text-slate-900">{event.capacity} participants</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-3">Description</h2>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{event.description}</p>
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

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-500">Event Status</p>
                      <p className="font-semibold text-slate-900 mt-1">
                        {new Date(event.date) > new Date() ? '🟢 Upcoming' : '🔴 Ended'}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={isRegistering || new Date(event.date) <= new Date()}
                      onClick={handleRegister}
                      className="w-full rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isRegistering ? 'Registering...' : new Date(event.date) <= new Date() ? 'Event Ended' : 'Register Now'}
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
