import React, { useState, useEffect } from 'react';
import glogo from '../assets/glogo.png';
import '../styles/headerstyling.css';

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000); // Update time every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="header w-100 p-3">
      <img src={glogo} alt="Logo" />
      <p>Staff Portal</p>
      <p id='currenttime'>{currentTime}</p>
    </div>
  );
}

export default Header;
