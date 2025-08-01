import React, { useState } from 'react';
import Modal from '../components/Modal';
import DodgeButton from '../components/DodgeButton';

const ExitSimulator = ({ onCancel, onReset }) => {
  const [popupIndex, setPopupIndex] = useState(0);
  const [showBSOD, setShowBSOD] = useState(false);

  const guiltTrips = [
    { title: "Are you sure?", message: "You just got here. The fun is just beginning.", yes: "Yes, I'm sure", no: "Stay a bit" },
    { title: "Really?", message: "What if you miss the grand finale?", yes: "I need to leave", no: "What finale?" },
    { title: "Your cat will be sad.", message: "It told me so. It said 'Meow meow meow'.", yes: "My cat understands", no: "For the cat!" },
    { title: "You disappoint me.", message: "This is why your code doesn't compile. Commitment issues.", yes: "That's harsh", no: "Fine, I'll refactor" },
    { title: "Final Warning!", message: "Leaving now could cause a paradigm shift in the space-time continuum.", yes: "Let's risk it", no: "Maybe not..." }
  ];

  const handleYes = () => {
    if (popupIndex < guiltTrips.length - 1) {
      setPopupIndex(popupIndex + 1);
    } else {
      setShowBSOD(true);
      setTimeout(() => {
        setShowBSOD(false);
        onReset();
      }, 4000);
    }
  };

  if (showBSOD) {
    return (
      <div className="fixed inset-0 bg-blue-800 text-white font-mono flex flex-col items-center justify-center z-50 p-4">
        <p className="text-lg md:text-2xl text-center">A problem has been detected and your session has been terminated to prevent damage.</p>
        <p className="mt-4">SESSION_TERMINATION_FAILED</p>
        <p className="mt-8 text-sm">*** STOP: 0x000000D1 (0x0000000C, 0x00000002, 0x00000000, 0xF86B5A84)</p>
      </div>
    );
  }

  const currentPopup = guiltTrips[popupIndex];
  return (
    <Modal show={true}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentPopup.title}</h2>
      <p className="text-gray-600 mb-6">{currentPopup.message}</p>
      <div className="flex justify-around items-center">
        <DodgeButton onClick={handleYes} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg">
          {currentPopup.yes}
        </DodgeButton>
        <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg">
          {currentPopup.no}
        </button>
      </div>
    </Modal>
  );
};

export default ExitSimulator;
