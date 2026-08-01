import type { AuthUser } from '../types/auth';

interface NavbarProps {
  user: AuthUser;
  onLogout: () => void;
  onViewMyEvents: () => void;
}

export function Navbar({ user, onLogout, onViewMyEvents }: NavbarProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <p className="text-sm text-blue-700 font-semibold">Eventify</p>
          <p className="text-sm text-slate-500">Hi, {user.fullName}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onViewMyEvents}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            My Events
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
  );
}
