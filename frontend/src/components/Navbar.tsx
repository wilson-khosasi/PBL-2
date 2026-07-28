import himtiLogo from '../assets/logo_himti.png';

interface NavbarProps {
  userName?: string;
}

export function Navbar({ userName = '[User name]' }: NavbarProps) {
  return (
    <nav className="border-b border-gray-200 px-6 py-3 flex items-center justify-between bg-gray">
      <div className="flex items-center gap-2">
        <img src={himtiLogo} alt="HIMTI Logo" className="w-8 h-8 object-contain" />
        <div>
          <p className="font-semibold text-sm leading-tight">HIMTI Student</p>
          <p className="text-xs text-gray-500 leading-tight">Organization</p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm font-medium">
        <a href="/" className="text-gray-900 hover:text-blue-700">Home</a>
        <a href="/events" className="text-gray-900 hover:text-blue-700">Events</a>
        <a href="/my-events" className="text-blue-700 font-semibold">My Events</a>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
          👤
        </div>
        <span className="text-sm text-gray-700">{userName}</span>
      </div>
    </nav>
  );
}