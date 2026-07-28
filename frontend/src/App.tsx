import { useState } from 'react';
import { RegisterPage } from './pages/RegisterPage';
import LoginPage from './pages/AuthLoginPage';
import { HomePage } from './pages/HomePage';
import { MyEventsPage } from './pages/MyEventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import type { AuthResult } from './types/auth';

function App() {
  const [auth, setAuth] = useState<AuthResult | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [activePage, setActivePage] = useState<'home' | 'my-events' | 'event-detail'>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  if (!auth) {
    return showLogin ? (
      <LoginPage
        onLoggedIn={(result: AuthResult) => setAuth(result)}
        onSwitchToRegister={() => setShowLogin(false)}
      />
    ) : (
      <RegisterPage
        onRegistered={(result: AuthResult) => setAuth(result)}
        onSwitchToLogin={() => setShowLogin(true)}
      />
    );
  }

  if (activePage === 'my-events') {
    return (
      <MyEventsPage
        auth={auth}
        onLogout={() => setAuth(null)}
        onBack={() => setActivePage('home')}
      />
    );
  }

  if (activePage === 'event-detail' && selectedEventId) {
    return (
      <EventDetailPage
        eventId={selectedEventId}
        auth={auth}
        onBack={() => {
          setActivePage('home');
          setSelectedEventId(null);
        }}
        onLogout={() => setAuth(null)}
      />
    );
  }

  return (
    <HomePage
      auth={auth}
      onLogout={() => setAuth(null)}
      onViewMyEvents={() => setActivePage('my-events')}
      onViewEventDetail={(eventId: string) => {
        setSelectedEventId(eventId);
        setActivePage('event-detail');
      }}
    />
  );
}

export default App;