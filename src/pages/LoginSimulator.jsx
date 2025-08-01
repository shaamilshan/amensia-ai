import React, { useState, useEffect } from 'react';
import DodgeButton from '../components/DodgeButton';

const LoginSimulator = ({ navigateTo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("We promise we won't steal your data. Probably.");
  const [captchaImages, setCaptchaImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState(new Set());

  const gaslightMessages = ["Are you sure?", "Try again. With feeling.", "That's... not it."];
  
  const allCaptchaOptions = [
    { src: 'https://placehold.co/150x150/F87171/FFFFFF?text=Rage', label: 'Rage', isSad: true },
    { src: 'https://placehold.co/150x150/FBBF24/FFFFFF?text=Mild+Annoyance', label: 'Mild Annoyance', isSad: true },
    { src: 'https://placehold.co/150x150/34D399/FFFFFF?text=A+Happy+Puppy', label: 'A Happy Puppy', isSad: false },
    { src: 'https://placehold.co/150x150/60A5FA/FFFFFF?text=Existential+Dread', label: 'Existential Dread', isSad: true },
    { src: 'https://placehold.co/150x150/A78BFA/FFFFFF?text=That+Sunday+Feeling', label: 'That Sunday Feeling', isSad: true },
    { src: 'https://placehold.co/150x150/EC4899/FFFFFF?text=Ice+Cream', label: 'Ice Cream', isSad: false },
  ];

  useEffect(() => {
    setCaptchaImages(allCaptchaOptions.sort(() => 0.5 - Math.random()));
  }, []);

  const handleInputChange = (e, setter) => {
    const { value } = e.target;
    if (value.toLowerCase() === 'i give up') {
      navigateTo('/dashboard');
      return;
    }
    setter(value);
  };

  const handleLoginClick = () => {
    setMessage(gaslightMessages[Math.floor(Math.random() * gaslightMessages.length)]);
  };

  const toggleCaptcha = (label) => {
    const newSelection = new Set(selectedImages);
    newSelection.has(label) ? newSelection.delete(label) : newSelection.add(label);
    setSelectedImages(newSelection);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-500">
        <h1 className="text-4xl font-bold text-center text-purple-400 mb-2">Welcome Back?</h1>
        <p className="text-center text-gray-400 mb-6">{message}</p>
        <div className="space-y-6">
          <input type="text" placeholder="Username (or your deepest fear)" value={username} onChange={(e) => handleInputChange(e, setUsername)} className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" />
          <input type="password" placeholder="Password (the one you forgot)" value={password} onChange={(e) => handleInputChange(e, setPassword)} className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" />
        </div>
        <div className="mt-8">
          <h3 className="text-lg text-center text-gray-300 mb-4">CAPTCHA: Click all images of sadness.</h3>
          <div className="grid grid-cols-3 gap-4">
            {captchaImages.map(img => (
              <div key={img.label} onClick={() => toggleCaptcha(img.label)} className={`cursor-pointer border-4 rounded-lg transition-all ${selectedImages.has(img.label) ? 'border-cyan-400 scale-105' : 'border-transparent'}`}>
                <img src={img.src} alt={img.label} className="rounded-md" />
                <p className="text-xs text-center mt-1">{img.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <DodgeButton onClick={handleLoginClick} className="w-1/2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">Log In</DodgeButton>
        </div>
        <p className="text-center text-xs text-gray-500 mt-6">Hint: Sometimes, the only winning move is to give up.</p>
      </div>
    </div>
  );
};

export default LoginSimulator;
