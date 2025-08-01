import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FakeLogin = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotten, setShowForgotten] = useState(false);

  const steps = [
    {
      title: "Welcome",
      subtitle: "Please Enter Your Details to continue",
      showForm: true
    },
    {
      title: "Authenticating...",
      subtitle: "Verifying your data with our neural network",
      showForm: false
    },
    {
      title: "Access Granted",
      subtitle: "Welcome to Useless Hub",
      showForm: false
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentStep(1);
    setTimeout(() => {
      setCurrentStep(2);
      setTimeout(() => {
        setShowForgotten(true);
      }, 2000);
    }, 3000);
  };

  const handleForgottenName = () => {
    onComplete();
  };

  if (showForgotten) {
    return (
      <motion.div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 max-w-xl"
        >
          {/* <div className="text-sm text-cyan-400 font-mono mb-4">NEURAL MEMORY SCAN COMPLETE</div> */}
          <h1 className="text-4xl font-light text-white/90 mb-6">What was your name again?</h1>
          <p className="text-lg text-white/60 mb-8">
            Our AI seems to have forgotten your identity. <br />
            <span className="text-cyan-300">Nevermind, let's work with notes instead.</span>
          </p>
          <button
            onClick={handleForgottenName}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all font-medium"
          >
            Continue to Useless Hub
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex flex-col md:flex-row bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Left: Image or Illustration */}
      {/* <div className="hidden md:flex w-1/2 items-center justify-center relative">
        <img
          src="assets/login-illustration.svg" // <-- Update with your actual image path
          alt="Login Illustration"
          className="max-w-lg"
        />
        <div className="absolute bottom-10 text-cyan-400 font-mono text-xs opacity-30">AMNESIA AI SYSTEM V3</div>
      </div> */}

      {/* Right: Form Section */}
      <div className="h-screen w-full flex items-center justify-center bg-black">
  <div className="w-full md:w-1/2 flex items-center justify-center p-8">
    <div className="w-full max-w-md space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-cyan-400 font-mono text-center"
      >
        Useless Hub - SECURE LOGIN
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <h1 className="text-3xl font-light text-white/90">{steps[currentStep].title}</h1>
          <h2 className="text-lg font-light text-cyan-300">{steps[currentStep].subtitle}</h2>

          {steps[currentStep].showForm && (
            <motion.form
              onSubmit={handleLogin}
              className="space-y-4 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all font-medium"
              >
                Sign Up
              </button>
            </motion.form>
          )}

          {currentStep === 1 && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-green-400 text-sm">
              ✓ Authentication successful
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</div>

    </motion.div>
  );
};

export default FakeLogin;
