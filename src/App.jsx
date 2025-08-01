import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import FakeLogin from './components/FakeLogin';
import MainApp from './components/MainApp';
import HubLobby from './components/HubLobby';
import EntryExitTrap from './components/EntryExitTrap';
import BombDiffuser from './components/BombDiffuser';
import MysteryButtons from './components/MysteryButtons';
import AITherapist from './components/AITherapist';
import ColorPicker from './components/ColorPicker';
import LoadingSimulator from './components/LoadingSimulator';
import ExistenceForm from './components/ExistenceForm';

const App = () => {
  const [currentStep, setCurrentStep] = useState('onboarding'); // 'onboarding', 'login', 'hub', 'module'
  const [currentModule, setCurrentModule] = useState(null);

  const handleOnboardingComplete = () => {
    setCurrentStep('login');
  };

  const handleLoginComplete = () => {
    setCurrentStep('hub');
  };

  const handleNavigateToModule = (moduleId) => {
    setCurrentModule(moduleId);
    setCurrentStep('module');
  };

  const handleBackToHub = () => {
    setCurrentStep('hub');
    setCurrentModule(null);
  };

  const renderModule = () => {
    switch (currentModule) {
      case 'notes':
        return <MainApp onBack={handleBackToHub} />;
      case 'trap':
        return <EntryExitTrap onBack={handleBackToHub} />;
      case 'bomb':
        return <BombDiffuser onBack={handleBackToHub} />;
      case 'buttons':
        return <MysteryButtons onBack={handleBackToHub} />;
      case 'therapist':
        return <AITherapist onBack={handleBackToHub} />;
      case 'color':
        return <ColorPicker onBack={handleBackToHub} />;
      case 'loading':
        return <LoadingSimulator onBack={handleBackToHub} />;
      case 'form':
        return <ExistenceForm onBack={handleBackToHub} />;
      default:
        return <HubLobby onNavigate={handleNavigateToModule} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {currentStep === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      {currentStep === 'login' && (
        <FakeLogin onComplete={handleLoginComplete} />
      )}
      {currentStep === 'hub' && (
        <HubLobby onNavigate={handleNavigateToModule} />
      )}
      {currentStep === 'module' && (
        renderModule()
      )}
    </div>
  );
};

export default App;