import React, { useState, useEffect } from 'react';
import LoginSimulator from './pages/LoginSimulator';
import TrapDashboard from './pages/TrapDashboard';
import ExitSimulator from './features/ExitSimulator';

export default function App() {
  const [route, setRoute] = useState('/login');
  const [isExiting, setIsExiting] = useState(false);

  const navigate = (path) => setRoute(path);

  const handleReset = () => {
    setIsExiting(false);
    navigate('/login');
  };

  useEffect(() => {
    const styleId = 'app-animations';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
    `;
    document.head.appendChild(style);
  }, []);

  const renderRoute = () => {
    switch (route) {
      case '/dashboard':
        return <TrapDashboard onExitAttempt={() => setIsExiting(true)} />;
      case '/login':
      default:
        return <LoginSimulator navigateTo={navigate} />;
    }
  };

  return (
    <div>
      {renderRoute()}
      {isExiting && <ExitSimulator onCancel={() => setIsExiting(false)} onReset={handleReset} />}
    </div>
  );
}
