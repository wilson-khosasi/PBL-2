import { useState } from 'react';
import { RegisterPage } from './pages/RegisterPage';
import { MyEventsPage } from './pages/MyEventsPage';
import type { AuthResult } from './types/auth';

function App() {
  const [auth, setAuth] = useState<AuthResult | null>(null);

  if (!auth) {
    return (
      <RegisterPage
        onRegistered={(result) => setAuth(result)}
        onSwitchToLogin={() => {
          /* placeholder for switching to login */
        }}
      />
    );
  }

  return <MyEventsPage />;
}

export default App;