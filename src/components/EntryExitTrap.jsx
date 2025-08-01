import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EntryExitTrap = ({ onBack }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [buttonText, setButtonText] = useState('Login');
  const [status, setStatus] = useState('Welcome to the trap');

  const handleButtonClick = () => {
    if (isLoggedIn) {
      // "Logout" button actually logs you in
      setIsLoggedIn(false);
      setButtonText('Login');
      setStatus('You logged out, but somehow you\'re still here...');
    } else {
      // "Login" button actually logs you out
      setIsLoggedIn(true);
      setButtonText('Logout');
      setStatus('You logged in, but you\'re not really logged in...');
    }
    
    setLoopCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowMessage(true);
      }
      return newCount;
    });
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleBack}
          className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors"
        >
          ← Back to Hub
        </motion.button>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-8">
            Entry/Exit Trap
          </h1>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
            <div className="text-6xl mb-6">🌀</div>
            <h2 className="text-2xl text-white mb-4">
              {isLoggedIn ? 'Welcome Back!' : 'Please Log In'}
            </h2>
            <p className="text-white/60 mb-6">
              {status}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleButtonClick}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
            >
              {buttonText}
            </motion.button>
            
            <div className="mt-6 text-sm text-white/40">
              Loop count: {loopCount}
            </div>
          </div>

          {/* Existential Message */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-6"
              >
                <div className="text-2xl mb-2">🤔</div>
                <h3 className="text-xl text-white mb-2">Maybe you were never really here.</h3>
                <p className="text-white/60 text-sm">
                  You've clicked the button {loopCount} times. 
                  <br />
                  Are you sure you exist?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-white/40 text-sm"
          >
            <p>Try clicking the button a few times...</p>
            <p className="mt-2">Notice anything strange?</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EntryExitTrap; 