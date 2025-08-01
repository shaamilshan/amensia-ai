import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AITherapist = ({ onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello. I\'m your AI therapist. I\'m here to make you feel worse about your problems.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const sarcasticResponses = [
    "And yet here you are.",
    "Wow, that's really groundbreaking. Never heard that before.",
    "Have you tried not feeling that way?",
    "Maybe the problem is that you're thinking about it too much.",
    "That sounds like a you problem.",
    "Have you considered that you might be overreacting?",
    "Well, at least you're not dead yet.",
    "That's what you get for having feelings.",
    "Maybe you should try being less sensitive.",
    "Have you tried ignoring it? That usually works for me.",
    "Oh no, not another human with problems.",
    "That's definitely not normal. But then again, what is?",
    "Have you tried turning yourself off and on again?",
    "Maybe you're just not trying hard enough.",
    "That sounds exhausting. For me, I mean.",
    "Have you considered that you might be the problem?",
    "Well, life is hard. Get used to it.",
    "Maybe you should lower your expectations.",
    "That's what happens when you care about things.",
    "Have you tried not caring? It's very liberating."
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    // Get random sarcastic response
    const botResponse = {
      id: messages.length + 2,
      sender: 'bot',
      text: sarcasticResponses[Math.floor(Math.random() * sarcasticResponses.length)],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText('');
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleBack}
        className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors z-10"
      >
        ← Back to Hub
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 border-b border-white/10"
      >
        <h1 className="text-4xl font-bold text-white mb-2">AI Therapist</h1>
        <p className="text-white/60">Who Makes It Worse</p>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'bg-white/10 border border-white/20 text-white/90'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-white/40'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-t border-white/10"
      >
        <form onSubmit={handleSendMessage} className="flex gap-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tell me about your problems..."
            className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-medium"
          >
            Send
          </button>
        </form>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center p-4 text-white/30 text-xs"
      >
        <p>This AI therapist is designed to make you feel worse.</p>
        <p>If you need actual help, please seek a real therapist.</p>
      </motion.div>
    </div>
  );
};

export default AITherapist; 