import React from 'react';

const Modal = ({ children, show }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-sm w-full text-center animate-fade-in-up">
        {children}
      </div>
    </div>
  );
};

export default Modal;
