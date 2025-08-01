import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ColorPicker = ({ onBack }) => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [judgment, setJudgment] = useState(null);
  const [showJudgment, setShowJudgment] = useState(false);

  const judgments = [
    "People who pick this color often have unresolved issues.",
    "This color choice reveals deep-seated insecurities.",
    "Only someone with questionable taste would choose this.",
    "This color suggests you're trying too hard to be different.",
    "People who pick this color are usually compensating for something.",
    "This color choice indicates a lack of self-awareness.",
    "Only someone with no sense of style would pick this.",
    "This color reveals your true personality - and it's not good.",
    "People who choose this color are often emotionally unstable.",
    "This color suggests you're living in denial.",
    "Only someone with poor judgment would pick this color.",
    "This color choice indicates you're not very creative.",
    "People who pick this color are usually attention seekers.",
    "This color reveals your inner turmoil.",
    "Only someone with no taste would choose this.",
    "This color suggests you're trying to hide something.",
    "People who pick this color often have trust issues.",
    "This color choice indicates you're not very sophisticated.",
    "Only someone with questionable morals would pick this.",
    "This color reveals your lack of imagination."
  ];

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleGetJudgment = () => {
    const randomJudgment = judgments[Math.floor(Math.random() * judgments.length)];
    setJudgment(randomJudgment);
    setShowJudgment(true);
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
            Color Picker That Judges You
          </h1>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
            <div className="text-6xl mb-6">🎨</div>
            <h2 className="text-2xl text-white mb-6">
              Pick a Color
            </h2>
            
            <div className="mb-6">
              <input
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
                className="w-32 h-32 rounded-lg cursor-pointer border-4 border-white/20"
              />
            </div>
            
            <div className="mb-6">
              <div 
                className="w-full h-16 rounded-lg mb-2"
                style={{ backgroundColor: selectedColor }}
              />
              <p className="text-white/60 font-mono">{selectedColor}</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetJudgment}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
            >
              Get Judged
            </motion.button>
          </div>

          {/* Judgment */}
          <AnimatePresence>
            {showJudgment && judgment && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-6"
              >
                <div className="text-2xl mb-2">🤨</div>
                <h3 className="text-xl text-white mb-2">The Verdict</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  "{judgment}"
                </p>
                <div className="mt-4 text-white/40 text-sm">
                  Based on extensive psychological research (not really)
                </div>
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
            <p>Pick any color. We'll judge you for it.</p>
            <p className="mt-1">Because even your color choices matter.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ColorPicker; 