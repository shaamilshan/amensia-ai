import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FakeLogin = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotten, setShowForgotten] = useState(false);

  const steps = [
    {
      title: "Welcome Back",
      subtitle: "Please sign in to continue",
      showForm: true
    },
    {
      title: "Authenticating...",
      subtitle: "Verifying your credentials with our neural network",
      showForm: false
    },
    {
      title: "Access Granted",
      subtitle: "Welcome to Amnesia AI",
      showForm: false
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentStep(1);
    
    // Simulate authentication delay
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-8 max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-cyan-400 font-mono mb-4"
          >
            NEURAL MEMORY SCAN COMPLETE
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-4xl font-light text-white/90 mb-6"
          >
            What was your name again?
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-lg text-white/60 mb-8 leading-relaxed"
          >
            Our AI seems to have forgotten your identity. 
            <br />
            <span className="text-cyan-300">Nevermind, let's work with notes instead.</span>
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            onClick={handleForgottenName}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-medium"
          >
            Continue to Notes
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
    >
      <div className="text-center px-8 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-cyan-400 font-mono mb-4"
        >
          AMNESIA AI - SECURE LOGIN
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-light text-white/90"
            >
              {steps[currentStep].title}
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-light text-cyan-300"
            >
              {steps[currentStep].subtitle}
            </motion.h2>
            
            {steps[currentStep].showForm && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-medium"
                >
                  Sign In
                </button>
              </motion.form>
            )}
            
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
              </motion.div>
            )}
            
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 text-sm"
              >
                ✓ Authentication successful
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FakeLogin; 