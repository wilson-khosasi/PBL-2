import { useAuth } from './hooks/useAuth';
import { MyEventsPage } from './pages/MyEventsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  const { user, isRestoringSession } = useAuth();

  if (isRestoringSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#e3e3e3] font-['Poppins',sans-serif] text-lg font-medium text-black/65">
        Restoring your session...
      </main>
    );
  }

  if (user) {
    return <MyEventsPage />;
  }

  if (window.location.pathname === '/register') {
    return <RegisterPage />;
  }

  return <LoginPage />;
}

export default App;
