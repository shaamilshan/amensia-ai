import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HubLobby = ({ onNavigate }) => {
  const [timeWasted, setTimeWasted] = useState(0);
  const [sessionStart] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeWasted(Math.floor((Date.now() - sessionStart) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStart]);

  const modules = [
    {
      id: 'notes',
      title: 'Our Notes',
      description: 'A notes app that forgets everything after 10 seconds. Because your thoughts aren\'t worth remembering.',
      icon: '📝',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'trap',
      title: 'Entry/Exit Trap',
      description: 'Login and logout buttons that do the opposite of what they say. Question your reality.',
      icon: '🌀',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'bomb',
      title: 'Bomb Diffuser Simulator',
      description: 'A fake bomb panel with a 3-minute countdown. No controls work. You\'re welcome.',
      icon: '💣',
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 'buttons',
      title: 'Mystery Button Room',
      description: 'A grid of unlabeled buttons that do random things. Like your life choices.',
      icon: '🔘',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'therapist',
      title: 'AI Therapist Who Makes It Worse',
      description: 'A chatbot that gives sarcastic responses to make you feel even worse.',
      icon: '🧠',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'color',
      title: 'Color Picker That Judges You',
      description: 'Pick a color and get judged for it. Because even your color choices matter.',
      icon: '🎨',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'loading',
      title: 'Loading Simulator',
      description: 'A fullscreen loading animation with existential messages. Pure productivity.',
      icon: '⏳',
      color: 'from-gray-500 to-slate-600'
    },
    {
      id: 'form',
      title: 'Existence Feedback Form',
      description: 'Answer existential questions with only one option: "I don\'t know."',
      icon: '📄',
      color: 'from-emerald-500 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Useless Hub</span>
        </h1>
        <p className="text-xl text-white/60 mb-4">
          A collection of intentionally pointless, humorous mini-projects
        </p>
        <div className="text-sm text-white/40 font-mono">
          Time Wasted: {Math.floor(timeWasted / 60)}m {timeWasted % 60}s
        </div>
      </motion.div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(module.id)}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-pointer hover:border-white/20 transition-all duration-300 group"
          >
            <div className="text-4xl mb-4">{module.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
              {module.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {module.description}
            </p>
            <div className="mt-4 flex items-center text-xs text-white/40">
              <span>Click to waste more time</span>
              <span className="ml-auto">→</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-16 text-white/30 text-sm"
      >
        <p>Built with existential dread and copious amounts of caffeine</p>
        <p className="mt-2">Remember: Nothing matters, but at least you're having fun</p>
      </motion.div>
    </div>
  );
};

export default HubLobby; 