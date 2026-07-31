import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { MyEventsPage } from './pages/MyEventsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';

function App() {
  const { user, isRestoringSession, logout } = useAuth();
  const [activePage, setActivePage] = useState<'home' | 'my-events' | 'event-detail'>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  if (isRestoringSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#e3e3e3] font-['Poppins',sans-serif] text-lg font-medium text-black/65">
        Restoring your session...
      </main>
    );
  }

  if (user) {
    if (activePage === 'my-events') {
      return <MyEventsPage onBack={() => setActivePage('home')} />;
    }

    if (activePage === 'event-detail' && selectedEventId) {
      return (
        <EventDetailPage
          eventId={selectedEventId}
          user={user}
          onBack={() => {
            setActivePage('home');
            setSelectedEventId(null);
          }}
          onLogout={logout}
        />
      );
    }

    return (
      <HomePage
        user={user}
        onLogout={logout}
        onViewMyEvents={() => setActivePage('my-events')}
        onViewEventDetail={(eventId) => {
          setSelectedEventId(eventId);
          setActivePage('event-detail');
        }}
      />
    );
  }

  if (window.location.pathname === '/register') {
    return <RegisterPage />;
  }

  return <LoginPage />;
}

export default App;
