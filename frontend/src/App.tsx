import { useState } from 'react';
import { RegisterPage } from './pages/RegisterPage';
import LoginPage from './pages/AuthLoginPage';
import { MyEventsPage } from './pages/MyEventsPage';
import type { AuthResult } from './types/auth';

function App() {
  const [auth, setAuth] = useState<AuthResult | null>(null);
  const [showLogin, setShowLogin] = useState(true);

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

  return <MyEventsPage />;
}

export default App;