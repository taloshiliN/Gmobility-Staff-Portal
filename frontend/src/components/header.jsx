import React from 'react'
import glogo from '../assets/glogo.png'
import '../styles/headerstyling.css'
function Header() {
  return (
    <div className="header w-100 p-3">
        <img src={glogo}></img><p> Staff Portal</p>
    </div>
  )
}

export default Header