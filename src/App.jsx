import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import FakeLogin from './components/FakeLogin';
import MainApp from './components/MainApp';

const App = () => {
  const [currentStep, setCurrentStep] = useState('onboarding'); // 'onboarding', 'login', 'main'

  const handleOnboardingComplete = () => {
    setCurrentStep('login');
  };

  const handleLoginComplete = () => {
    setCurrentStep('main');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {currentStep === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      {currentStep === 'login' && (
        <FakeLogin onComplete={handleLoginComplete} />
      )}
      {currentStep === 'main' && (
        <MainApp />
      )}
    </div>
  );
};

export default App;