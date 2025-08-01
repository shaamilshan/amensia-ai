import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

const FORGET_DELAY = 10000;

const MainApp = ({ onBack }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [vanishingNoteId, setVanishingNoteId] = useState(null);
  const [instantRegretMode, setInstantRegretMode] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [lastNoteText, setLastNoteText] = useState('');
  const [ghostWord, setGhostWord] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const welcomeTimer = setTimeout(() => { setShowWelcome(false); }, 3000);
    return () => clearTimeout(welcomeTimer);
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    if (newNote.trim() === '') return;
    
    // Show fake save toast
    setShowSaveToast(true);
    setTimeout(() => {
      setShowSaveToast(false);
    }, 2000);
    
    const noteId = Date.now();
    const newNoteObj = {
      id: noteId,
      text: newNote.trim(),
      createdAt: Date.now(),
      timeLeft: instantRegretMode ? 0 : FORGET_DELAY / 1000
    };
    
    setLastNoteText(newNote.trim());
    setNotes(prev => [...prev, newNoteObj]);
    setNewNote('');
    
    // Start countdown for this note
    const timer = setTimeout(() => {
      // Glitch effect before deletion
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
        setVanishingNoteId(noteId);
        setTimeout(() => {
          setNotes(prev => prev.filter(note => note.id !== noteId));
          setVanishingNoteId(null);
          
          // Occasionally show ghost word
          if (Math.random() < 0.3) {
            const words = lastNoteText.split(' ');
            const randomWord = words[Math.floor(Math.random() * words.length)];
            setGhostWord(randomWord);
            setTimeout(() => setGhostWord(''), 3000);
          }
        }, 2000);
      }, 500);
    }, instantRegretMode ? 100 : FORGET_DELAY);
    
    return () => clearTimeout(timer);
  };

  const handleAnimationComplete = () => {
    // This will be called when particle animation completes
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="h-full w-full relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleBack}
        className="absolute top-4 left-4 text-white/60 hover:text-white transition-colors z-10"
      >
        ← Back to Hub
      </motion.button>

      {/* AI Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 right-4 flex justify-between items-center text-sm text-white/60 font-mono z-10"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>NEURAL CORE ACTIVE</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>AMNESIA AI v2.1.0</span>
        </div>
      </motion.div>

      {/* Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4 z-10"
      >
        <button
          onClick={() => setInstantRegretMode(!instantRegretMode)}
          className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
            instantRegretMode 
              ? 'bg-red-500/20 text-red-400 border border-red-400/30' 
              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
          }`}
        >
          {instantRegretMode ? 'Instant Regret' : '10s Mode'}
        </button>
      </motion.div>

      {/* Ghost Word */}
      <AnimatePresence>
        {ghostWord && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="text-2xl text-white/30 font-mono italic">
              "{ghostWord}"
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Toast */}
      <AnimatePresence>
        {showSaveToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white/80">
              <span className="text-cyan-400">Saving...</span>
              <span className="ml-2 text-white/60">Just kidding.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center items-center h-full text-center px-8 max-w-2xl mx-auto"
          >
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-cyan-400 font-mono mb-4"
              >
                NEURAL MEMORY INTERFACE READY
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-3xl text-white/80 font-sans px-4 text-center mb-4"
              >
                Welcome to your digital mind
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-lg text-white/50 text-center"
              >
                Add notes to your list - each will be forgotten in exactly {instantRegretMode ? '0' : '10'} seconds
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="notes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col h-full pt-20 px-8 ${isGlitching ? 'animate-pulse' : ''}`}
          >
            {/* Add Note Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <form onSubmit={addNote} className="max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder={`Add a new note... (will be forgotten ${instantRegretMode ? 'instantly' : 'in 10 seconds'})`}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-medium"
                  >
                    Add Note
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto">
              {notes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-white/40 mt-20"
                >
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl mb-2">No notes yet</h3>
                  <p>Add your first note above to begin your digital amnesia experience</p>
                </motion.div>
              ) : (
                <div className="max-w-4xl mx-auto space-y-4">
                  <AnimatePresence>
                    {notes.map((note) => (
                      <NoteItem
                        key={note.id}
                        note={note}
                        isVanishing={vanishingNoteId === note.id}
                        onAnimationComplete={handleAnimationComplete}
                        instantRegretMode={instantRegretMode}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Individual Note Component
const NoteItem = ({ note, isVanishing, onAnimationComplete, instantRegretMode }) => {
  const [timeLeft, setTimeLeft] = useState(instantRegretMode ? 0 : FORGET_DELAY / 1000);
  const [showOopsiee, setShowOopsiee] = useState(false);

  useEffect(() => {
    if (isVanishing || instantRegretMode) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 3) {
          setShowOopsiee(true);
        }
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isVanishing, instantRegretMode]);

  if (isVanishing) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        <div className="text-center py-8">
          <div className="text-white/70 mb-4">🧠 Processing neural patterns...</div>
          <ParticleCanvas onAnimationComplete={onAnimationComplete} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="bg-white/5 border border-white/20 rounded-lg p-6 hover:border-white/30 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <p className="text-white/90 text-lg leading-relaxed flex-1">
          {note.text}
        </p>
        <div className="ml-4 text-right">
          <AnimatePresence mode="wait">
            {instantRegretMode ? (
              <motion.div
                key="instant"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-sm font-mono text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-400/20"
              >
                instant regret
              </motion.div>
            ) : showOopsiee ? (
              <motion.div
                key="oopsiee"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-sm font-mono text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-400/20"
              >
                oopsiee i got my db cleared
              </motion.div>
            ) : (
              <motion.div
                key="normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-mono text-cyan-400"
              >
                {timeLeft}s
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-xs text-white/40 mt-1">
            Memory erasure
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      {!instantRegretMode && (
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: FORGET_DELAY / 1000, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default MainApp;