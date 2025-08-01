import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSimulator = ({ onBack }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const messages = [
    "Rebuilding meaning...",
    "Calibrating emptiness...",
    "Processing existential dread...",
    "Loading purpose...",
    "Initializing disappointment...",
    "Preparing for nothing...",
    "Calculating pointlessness...",
    "Synchronizing with the void...",
    "Preparing your disappointment...",
    "Loading more nothing...",
    "Processing your life choices...",
    "Preparing to waste more time...",
    "Loading existential crisis...",
    "Preparing for the inevitable...",
    "Processing your regrets...",
    "Loading more loading...",
    "Preparing for disappointment...",
    "Processing your existence...",
    "Loading meaninglessness...",
    "Preparing for nothing special..."
  ];

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 2000);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsLoading(false);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 500);

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressTimer);
    };
  }, [messages.length]);

  const handleBack = () => {
    onBack();
  };

  if (!isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-5xl font-bold text-white mb-4">Loading Complete!</h1>
          <p className="text-xl text-white/60 mb-6">
            You've successfully wasted time watching a loading screen.
          </p>
          <p className="text-lg text-white/40 mb-8">
            Nothing has changed. Nothing will change. Welcome to existence.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            Return to Hub
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleBack}
        className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors"
      >
        ← Back to Hub
      </motion.button>

      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">
            Loading Simulator
          </h1>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
            <div className="text-6xl mb-6">⏳</div>
            
            {/* Loading Message */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl text-white/80 mb-6 min-h-[2rem]"
              >
                {messages[currentMessage]}
              </motion.div>
            </AnimatePresence>
            
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="text-white/60 font-mono">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/40 text-sm"
          >
            <p>This is a loading screen that loads nothing.</p>
            <p className="mt-1">Pure productivity at its finest.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSimulator; 