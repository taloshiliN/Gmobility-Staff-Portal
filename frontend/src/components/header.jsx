import React, { useState, useEffect } from 'react';
import glogo from '../assets/glogo.png';
import '../styles/headerstyling.css';
import MessageFloat from '../pages/hr/MessageFloat'
function Header() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000); // Update time every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="headerheader ">
      <img src={glogo} alt="Logo" />
      <p>Staff Portal</p>
      <h4 id='currenttime'>{currentTime}</h4>
      {/*<MessageFloat></MessageFloat> */}
     </div>
  );
}

export default Header;
