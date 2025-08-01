import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MysteryButtons = ({ onBack }) => {
  const [clickCount, setClickCount] = useState(0);
  const [currentEffect, setCurrentEffect] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('from-slate-900 via-purple-900 to-slate-900');
  const [showMessage, setShowMessage] = useState(false);

  const effects = [
    {
      type: 'color',
      message: 'The background changed. How profound.',
      action: () => {
        const colors = [
          'from-red-900 via-pink-900 to-red-900',
          'from-green-900 via-emerald-900 to-green-900',
          'from-blue-900 via-cyan-900 to-blue-900',
          'from-yellow-900 via-orange-900 to-yellow-900',
          'from-purple-900 via-indigo-900 to-purple-900',
          'from-gray-900 via-slate-900 to-gray-900'
        ];
        setBackgroundColor(colors[Math.floor(Math.random() * colors.length)]);
      }
    },
    {
      type: 'text',
      message: 'You clicked a button. Revolutionary.',
      action: () => {}
    },
    {
      type: 'sound',
      message: 'Beep. That was a sound.',
      action: () => {
        // Simulate sound with visual feedback
        document.body.style.filter = 'brightness(1.2)';
        setTimeout(() => {
          document.body.style.filter = 'brightness(1)';
        }, 200);
      }
    },
    {
      type: 'shake',
      message: 'Everything is shaking. Or maybe it\'s just you.',
      action: () => {
        document.body.style.animation = 'shake 0.5s';
        setTimeout(() => {
          document.body.style.animation = '';
        }, 500);
      }
    },
    {
      type: 'invert',
      message: 'The world is upside down. Or is it?',
      action: () => {
        document.body.style.filter = 'invert(1)';
        setTimeout(() => {
          document.body.style.filter = 'invert(0)';
        }, 1000);
      }
    },
    {
      type: 'random',
      message: 'Something random happened. Or did it?',
      action: () => {
        const randomActions = [
          () => setBackgroundColor('from-pink-900 via-rose-900 to-pink-900'),
          () => document.body.style.transform = 'scale(0.95)',
          () => document.body.style.transform = 'scale(1.05)',
          () => document.body.style.transform = 'rotate(1deg)',
          () => document.body.style.transform = 'rotate(-1deg)'
        ];
        const action = randomActions[Math.floor(Math.random() * randomActions.length)];
        action();
        setTimeout(() => {
          document.body.style.transform = '';
        }, 500);
      }
    }
  ];

  const handleButtonClick = () => {
    const effect = effects[Math.floor(Math.random() * effects.length)];
    effect.action();
    setCurrentEffect(effect.message);
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 10) {
        setShowMessage(true);
      }
      return newCount;
    });

    setTimeout(() => {
      setCurrentEffect(null);
    }, 2000);
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundColor} transition-all duration-1000 p-8`}>
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleBack}
        className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors"
      >
        ← Back to Hub
      </motion.button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Mystery Button Room</h1>
          <p className="text-white/60">Click the buttons. See what happens. Or don't.</p>
        </motion.div>

        {/* Effect Message */}
        <AnimatePresence>
          {currentEffect && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 inline-block">
                <p className="text-white/80">{currentEffect}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mb-8"
        >
          {Array.from({ length: 35 }, (_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9, rotate: -5 }}
              onClick={handleButtonClick}
              className="w-16 h-16 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white/60 hover:text-white"
            >
              ?
            </motion.button>
          ))}
        </motion.div>

        {/* Click Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 inline-block">
            <p className="text-white/60">Buttons clicked: {clickCount}</p>
          </div>
        </motion.div>

        {/* Existential Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                <div className="text-2xl mb-2">🤔</div>
                <h3 className="text-xl text-white mb-2">Now imagine doing this with your actual life.</h3>
                <p className="text-white/60 text-sm">
                  You've clicked {clickCount} buttons. 
                  <br />
                  How many of your life choices were this random?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-white/40 text-sm"
        >
          <p>Each button does something different. Or maybe it doesn't.</p>
          <p className="mt-1">Keep clicking to find out. Or don't.</p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default MysteryButtons; 