import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BombDiffuser = ({ onBack }) => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isActive, setIsActive] = useState(true);
  const [switches, setSwitches] = useState({
    switch1: false,
    switch2: false,
    switch3: false,
    switch4: false
  });
  const [sliders, setSliders] = useState({
    slider1: 50,
    slider2: 25,
    slider3: 75
  });
  const [wires, setWires] = useState({
    red: false,
    blue: false,
    green: false,
    yellow: false
  });
  const [showBoom, setShowBoom] = useState(false);
  const [timeWasted, setTimeWasted] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      if (isActive) {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            setShowBoom(true);
            setTimeWasted(Math.floor((Date.now() - startTime) / 1000));
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSwitch = (switchName) => {
    setSwitches(prev => ({
      ...prev,
      [switchName]: !prev[switchName]
    }));
  };

  const handleSlider = (sliderName, value) => {
    setSliders(prev => ({
      ...prev,
      [sliderName]: value
    }));
  };

  const handleWire = (wireName) => {
    setWires(prev => ({
      ...prev,
      [wireName]: !prev[wireName]
    }));
  };

  const handleBack = () => {
    onBack();
  };

  if (showBoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">💥</div>
          <h1 className="text-5xl font-bold text-white mb-4">BOOM</h1>
          <p className="text-xl text-white/60 mb-6">
            You wasted {Math.floor(timeWasted / 60)} minutes and {timeWasted % 60} seconds of your life.
          </p>
          <p className="text-lg text-white/40 mb-8">
            None of the controls worked. You were doomed from the start.
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
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
          <h1 className="text-4xl font-bold text-white mb-4">Bomb Diffuser Simulator</h1>
          <p className="text-white/60">Defuse the bomb before it explodes. Good luck.</p>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 inline-block">
            <div className="text-6xl font-mono text-red-400 mb-2">
              {formatTime(timeLeft)}
            </div>
            <div className="text-white/60">Time Remaining</div>
          </div>
        </motion.div>

        {/* Bomb Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Switches */}
            <div>
              <h3 className="text-xl text-white mb-4">Switches</h3>
              <div className="space-y-4">
                {Object.entries(switches).map(([name, isOn]) => (
                  <div key={name} className="flex items-center justify-between">
                    <span className="text-white/60">{name}</span>
                    <button
                      onClick={() => handleSwitch(name)}
                      className={`w-16 h-8 rounded-full transition-all duration-300 ${
                        isOn ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                        isOn ? 'translate-x-8' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div>
              <h3 className="text-xl text-white mb-4">Sliders</h3>
              <div className="space-y-6">
                {Object.entries(sliders).map(([name, value]) => (
                  <div key={name}>
                    <div className="flex justify-between text-white/60 mb-2">
                      <span>{name}</span>
                      <span>{value}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleSlider(name, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wires */}
          <div className="mt-8">
            <h3 className="text-xl text-white mb-4">Wires</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(wires).map(([color, isCut]) => (
                <button
                  key={color}
                  onClick={() => handleWire(color)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    isCut 
                      ? 'border-gray-500 bg-gray-500/20' 
                      : `border-${color}-500 bg-${color}-500/20 hover:bg-${color}-500/30`
                  }`}
                >
                  <div className={`w-full h-2 rounded ${
                    isCut ? 'bg-gray-500' : `bg-${color}-500`
                  }`} />
                  <div className="text-white/60 text-sm mt-2 capitalize">
                    {color} wire
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center text-white/40 text-sm">
            <p>Try adjusting the controls. They might work. Or not.</p>
            <p className="mt-1">The timer is real though. That's definitely counting down.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BombDiffuser; 