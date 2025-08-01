import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExistenceForm = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Why are you here?",
      options: ["I don't know."]
    },
    {
      id: 2,
      question: "What do you expect from this form?",
      options: ["I don't know."]
    },
    {
      id: 3,
      question: "Do you have a purpose?",
      options: ["I don't know."]
    },
    {
      id: 4,
      question: "What is the meaning of life?",
      options: ["I don't know."]
    },
    {
      id: 5,
      question: "Are you making a difference?",
      options: ["I don't know."]
    },
    {
      id: 6,
      question: "Do you matter?",
      options: ["I don't know."]
    },
    {
      id: 7,
      question: "What will you accomplish today?",
      options: ["I don't know."]
    },
    {
      id: 8,
      question: "Are you happy with your choices?",
      options: ["I don't know."]
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    onBack();
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="text-8xl mb-6">📄</div>
          <h1 className="text-5xl font-bold text-white mb-4">Form Submitted</h1>
          <p className="text-xl text-white/60 mb-6">
            Thanks. Nothing has changed.
          </p>
          <p className="text-lg text-white/40 mb-8">
            Your answers have been processed and immediately forgotten.
            <br />
            Just like your existence.
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

      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-8">
            Existence Feedback Form
          </h1>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
            {/* Progress */}
            <div className="mb-6">
              <div className="text-white/40 text-sm mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-8"
              >
                <h2 className="text-2xl text-white mb-6">
                  {questions[currentQuestion].question}
                </h2>
                
                {/* Options */}
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/40 text-sm"
          >
            <p>Answer the questions. Or don't. It doesn't matter.</p>
            <p className="mt-1">There's only one option anyway.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExistenceForm; 