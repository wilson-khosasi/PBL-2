import { useState } from 'react';
import { RegisterPage } from './pages/RegisterPage';
import LoginPage from './pages/AuthLoginPage';
import { HomePage } from './pages/HomePage';
import { MyEventsPage } from './pages/MyEventsPage';
import type { AuthResult } from './types/auth';

function App() {
  const [auth, setAuth] = useState<AuthResult | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [activePage, setActivePage] = useState<'home' | 'my-events'>('home');

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

  return (
    <HomePage
      auth={auth}
      onLogout={() => setAuth(null)}
      onViewMyEvents={() => setActivePage('my-events')}
    />
  );
}

export default App;