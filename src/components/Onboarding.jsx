import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showParticles, setShowParticles] = useState(false);

  const steps = [
    {
      title: "Welcome to Useless Hub",
      subtitle: "A Collection of Intentionally Pointless Projects",
      description: "Where productivity goes to die and existential dread thrives. Each module is designed to waste your time in the most entertaining way possible.",
      features: ["🎭 Satirical", "⏰ Time-Wasting", "🤔 Existential"],
      image: "🎪"
    },
    {
      title: "How It Works",
      subtitle: "Pure Pointlessness",
      description: "Browse through our collection of useless modules. Each one serves no purpose other than to make you question why you're spending time on it.",
      features: ["🔘 Click Modules", "🎮 Interact", "😵 Question Reality"],
      image: "🎯"
    },
    {
      title: "What You'll Find",
      subtitle: "Uselessness at Its Finest",
      description: "From notes that forget themselves to buttons that do nothing, from fake bomb diffusers to AI therapists who make it worse. Pure entertainment through pointlessness.",
      features: ["📝 Forgetting Notes", "💣 Fake Bombs", "🧠 Sarcastic AI"],
      image: "🎨"
    },
    {
      title: "Ready to Waste Time?",
      subtitle: "Embrace the Pointlessness",
      description: "Join thousands of users who have already wasted countless hours on our intentionally useless creations. Your productivity will thank you later.",
      features: ["🚀 Start Wasting", "✨ Premium Uselessness", "🎯 100% Pointless"],
      image: "🎉"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  const handleClick = () => {
    setShowParticles(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (showParticles) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-white text-4xl font-light text-center"
        >
          Initializing Uselessness...
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 cursor-pointer"
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex h-full"
        >
          {/* Left Half - Text Content */}
          <div className="w-1/2 flex items-center justify-center px-12">
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-cyan-400 font-mono mb-4"
              >
                USELESS HUB v1.0.0 - POINTLESS CORE ACTIVE
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-light text-white/90 mb-6 leading-tight"
              >
                {steps[currentStep].title}
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-light text-cyan-300 mb-8"
              >
                {steps[currentStep].subtitle}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-white/70 leading-relaxed mb-10"
              >
                {steps[currentStep].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {steps[currentStep].features.map((feature, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-sm text-white/60 bg-white/10 px-4 py-2 rounded-full border border-white/20"
                  >
                    {feature}
                  </motion.span>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-white/30 text-sm"
              >
                Click anywhere to continue • {currentStep + 1}/{steps.length}
              </motion.div>
            </div>
          </div>

          {/* Right Half - Image/Visual */}
          <div className="w-1/2 flex items-center justify-center px-12">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Main Icon */}
              <div className="text-9xl mb-8 text-center">
                {steps[currentStep].image}
              </div>
              
              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -right-4 text-2xl opacity-60"
              >
                {currentStep === 0 && "🎭"}
                {currentStep === 1 && "🎯"}
                {currentStep === 2 && "🎨"}
                {currentStep === 3 && "🎉"}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-4 -left-4 text-2xl opacity-60"
              >
                {currentStep === 0 && "⏰"}
                {currentStep === 1 && "🎮"}
                {currentStep === 2 && "💣"}
                {currentStep === 3 && "✨"}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute top-1/2 -right-8 text-xl opacity-40"
              >
                {currentStep === 0 && "🤔"}
                {currentStep === 1 && "😵"}
                {currentStep === 2 && "🧠"}
                {currentStep === 3 && "🚀"}
              </motion.div>
              
              {/* Background Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute inset-0 -z-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Onboarding;