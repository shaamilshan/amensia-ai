import React, { useState } from 'react';

const DodgeButton = ({ children, onClick, className }) => {
  const [isDodging, setIsDodging] = useState(false);
  const [style, setStyle] = useState({ transition: 'all 0.3s ease' });

  const handleMouseEnter = (e) => {
    setIsDodging(true);
    const buttonRect = e.target.getBoundingClientRect();
    const newTop = Math.random() * (window.innerHeight - buttonRect.height);
    const newLeft = Math.random() * (window.innerWidth - buttonRect.width);
    
    setStyle({
      position: 'fixed',
      top: `${newTop}px`,
      left: `${newLeft}px`,
      transition: 'top 0.3s ease, left 0.3s ease',
      zIndex: 50,
    });
  };

  const handleMouseLeave = () => {
    setIsDodging(false);
    setStyle({ transition: 'all 0.3s ease' });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
};

export default DodgeButton;
