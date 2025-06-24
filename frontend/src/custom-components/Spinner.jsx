import React from 'react';
import { HashLoader } from 'react-spinners';

const Spinner = () => {
  // Detect dark mode via class on <html> or <body>
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className="w-full min-h-[600px] flex justify-center items-center">
      <HashLoader size={130} color={isDarkMode ? '#fdba88' : '#D6482B'} />
    </div>
  );
};

export default Spinner;
