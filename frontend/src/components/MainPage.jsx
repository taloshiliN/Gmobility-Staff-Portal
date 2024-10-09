import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css'
import gif from '../assets/gif.gif'
import glogo from '../assets/glogo.png'
import DigitalClock from './clock';

function MAINPAGE() {

    return(
        <>
        
        <div className='logo-container'>
        <img src={glogo} alt="Gmobility Logo" className="logo" /> {/* Add logo here */}
        </div>
        <div className='main-container'>
        <div className='mainpage-content'>
        <img src={gif} alt="GIF Description" className="bottom-left-gif" />
        </div>
        </div>
        <div className='heading-container'>
        <h1>WELCOME</h1>
        </div>
        <div className='heading2-container'>
        <h6>TO GMOBILITY'S STAFF PORTAL</h6>
        </div>
        <DigitalClock />
        <Link to="/loginPage" className='login-text'>Login</Link> 
        
        </>
    )
}

export default MAINPAGE