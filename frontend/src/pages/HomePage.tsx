import { useEffect, useMemo, useState } from 'react';
import logoImage from '../assets/logo_himti.png';
import welcomeBanner from '../assets/welcome_banner.png';
import categoryIcon from '../assets/categori_icon.png';
import searchIcon from '../assets/search_icon.png';
import { eventApi } from '../api/eventApi';
import { registrationApi } from '../api/registrationApi';
import { withEventExtras } from '../data/dummyEvents';
import type { AuthUser } from '../types/auth';
import type { Event } from '../types/registration';

interface HomePageProps {
  user: AuthUser;
  onLogout: () => void;
  onViewMyEvents: () => void;
  onViewEventDetail: (eventId: string) => void;
}

export function HomePage({ user, onLogout, onViewMyEvents, onViewEventDetail }: HomePageProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'upcoming' | 'popular'>('upcoming');
  const [selectedCategories, setSelectedCategories] = useState({
    all: true,
    workshop: true,
    seminar: true,
    competition: true,
  });
  const [dateFilter, setDateFilter] = useState<'all' | 'week' | 'month'>('all');
  const [location, setLocation] = useState('All Locations');

  const handleCategoryToggle = (key: keyof typeof selectedCategories) => {
    setSelectedCategories((prev) => {
      if (key === 'all') {
        const newValue = !prev.all;
        return {
          all: newValue,
          workshop: newValue,
          seminar: newValue,
          competition: newValue,
        };
      }

      const next = {
        ...prev,
        [key]: !prev[key],
      };
      next.all = next.workshop && next.seminar && next.competition;
      return next;
    });
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const data = await eventApi.getAll();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const locations = useMemo(
    () => [
      'All Locations',
      ...new Set(events.map((event) => event.location.split(',')[0].trim())),
    ],
    [events],
  );

  const filteredEvents = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    const matchesCategory = (event: Event) => {
      if (selectedCategories.all) return true;
      const category = withEventExtras(event).category.toLowerCase();

      if (category === 'workshop') return selectedCategories.workshop;
      if (category === 'seminar') return selectedCategories.seminar;
      if (category === 'competition') return selectedCategories.competition;

      return false;
    };

    const matchesDate = (event: Event) => {
      if (dateFilter === 'all') return true;
      const eventDate = new Date(event.date);
      const now = new Date();
      const diffDays = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      if (dateFilter === 'week') return diffDays >= 0 && diffDays <= 7;
      return diffDays >= 0 && diffDays <= 30;
    };

    return [...events]
      .filter((event) => {
        if (normalized) {
          const text = `${event.title} ${event.description} ${event.location}`.toLowerCase();
          if (!text.includes(normalized)) return false;
        }

        if (!matchesCategory(event)) return false;
        if (!matchesDate(event)) return false;
        const eventLocation = event.location.split(',')[0].trim();
        if (location !== 'All Locations' && eventLocation !== location) return false;

        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortBy === 'upcoming' ? dateA - dateB : dateB - dateA;
      });
  }, [events, searchTerm, sortBy, selectedCategories, dateFilter, location]);

  const handleRegister = async (eventId: string) => {
    try {
      setRegisteringId(eventId);
      setSuccessMessage(null);
      await registrationApi.register(eventId);
      setSuccessMessage('Registration successful! Check your My Events page.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setRegisteringId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
            <button
              type="button"
              onClick={onViewMyEvents}
              className="rounded-full px-4 py-2 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              My Events
            </button>
            <div className="ml-3 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800">
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
        <section className="mb-8 overflow-hidden rounded-3xl shadow-lg">
          <img src={welcomeBanner} alt="Welcome back" className="h-auto w-full object-cover" />
        </section>

        {successMessage && (
          <div className="mb-6 rounded-2xl bg-emerald-100 px-5 py-4 text-emerald-900 shadow-sm">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl bg-rose-100 px-5 py-4 text-rose-900 shadow-sm">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-slate-500">Loading events...</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
                <p className="mt-2 text-sm text-slate-500">Refine your event search</p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <img src={categoryIcon} alt="Category icon" className="h-10 w-10 object-cover" />
                    Category
                  </div>
                  <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    {['all', 'workshop', 'seminar', 'competition'].map((key) => (
                      <label key={key} className="flex items-center gap-3 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={selectedCategories[key as keyof typeof selectedCategories]}
                          onChange={() => handleCategoryToggle(key as keyof typeof selectedCategories)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-700"
                        />
                        <span>{key === 'all' ? 'All Categories' : key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <img src={categoryIcon} alt="Date icon" className="h-10 w-10 object-cover" />
                    Date
                  </div>
                  <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    {[
                      { value: 'all', label: 'All Dates' },
                      { value: 'week', label: 'This Week' },
                      { value: 'month', label: 'This Month' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 text-sm text-slate-700">
                        <input
                          type="radio"
                          name="date-filter"
                          value={option.value}
                          checked={dateFilter === option.value}
                          onChange={() => setDateFilter(option.value as 'all' | 'week' | 'month')}
                          className="h-4 w-4 text-blue-700"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <img src={categoryIcon} alt="Location icon" className="h-10 w-10 object-cover" />
                    Location
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      {locations.map((locationOption) => (
                        <option key={locationOption} value={locationOption}>
                          {locationOption}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategories({
                    all: true,
                    workshop: true,
                    seminar: true,
                    competition: true,
                  });
                  setDateFilter('all');
                  setLocation('All Locations');
                  setSearchTerm('');
                }}
                className="mt-6 w-full rounded-3xl border border-blue-700 bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Reset Filters
              </button>
            </aside>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="relative w-full lg:w-2/3">
                    <label className="relative block">
                      <span className="sr-only">Search events</span>
                      <img src={searchIcon} alt="Search icon" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search events..."
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">Sort by</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'upcoming' | 'popular')}
                      className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="popular">Popular</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-500">Showing 1 - {filteredEvents.length} of {events.length} events</div>
                  <div className="text-sm text-slate-500">Updated just now</div>
                </div>
              </div>

              <div className="space-y-4">
                {filteredEvents.map((event) => {
                  const formattedDate = new Date(event.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  });

                  return (
                    <article key={event.id} className="grid gap-4 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm sm:grid-cols-[240px_1fr]">
                      <div className="relative h-44 overflow-hidden bg-slate-200 sm:h-auto">
                        {event.imageUrl ? (
                          <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-400">No image</div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Event</span>
                          <span className="text-sm text-slate-500">{formattedDate}</span>
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-slate-900">{event.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-3">{event.description}</p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>📅</span>
                            <span>{formattedDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>📍</span>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onViewEventDetail(event.id)}
                            className="rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                          >
                            See Details
                          </button>
                          <button
                            type="button"
                            disabled={registeringId === event.id}
                            onClick={() => handleRegister(event.id)}
                            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {registeringId === event.id ? 'Registering...' : 'Register'}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {filteredEvents.length === 0 && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <p className="text-slate-500">No events match your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-900">HIMIT Event Organizer</p>
            <p className="text-sm text-slate-500">Organize events, manage attendance, and keep your community connected.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span>Support</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
