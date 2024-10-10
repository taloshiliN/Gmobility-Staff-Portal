import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../authslice'
import { useNavigate } from 'react-router-dom'
import '../styles/sidebarstyling.css'
import arrow from '../assets/arrow.png'

function SidebarNav({position}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false); // State for sidebar expansion

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  if (!position) {
    console.warn('Position is undefined in SidebarNav component');
    return <div>Position is not available</div>; // Fallback message
  }

  const toggleSidebar = () => {
    setIsExpanded(prev => !prev); // Toggle sidebar expansion state
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
      <div className={`Employee-sidebar ${isExpanded ? 'expanded' : ''}`} onClick={toggleSidebar}>
  <img className='arrow' src={arrow} alt="Toggle Sidebar" />
  <ul className={`${isExpanded ? '' : 'disabled-links'}`}>
    {/*Employee */}
    {position === 'Employee' && (
      <>
        <NavLink to="/home">
          <li>Home</li>
        </NavLink>
        <NavLink to="/leaverequest">
          <li>Leave Requests</li>
        </NavLink>
        <NavLink to="/overtimerequest">
          <li>Overtime Request</li>
        </NavLink>
        <NavLink to="/overtimeview">
          <li>View Overtime</li>
        </NavLink>
        <NavLink to="/clockinclockout">
          <li>View Clock in and Clock out times</li>
        </NavLink>
        <NavLink to='/printingrequest'>
          <li>Printing request</li>
        </NavLink>
      </>
    )}
    {/*Human Resource */}
    {position === 'Human Resource' && (
      <>
        <NavLink to="/hrhome">
          <li>Home</li>
        </NavLink>
        <NavLink to="/hremployees">
          <li>Employees</li>
        </NavLink>
        <NavLink to="/staffregistration">
          <li>Staff registration</li>
        </NavLink>
        <NavLink to="/hrleaverequests">
          <li>View Leave Request</li>
        </NavLink>
        <NavLink to="/hrovertimerequests">
          <li>View Overtime Requests</li>
        </NavLink>
      </>
    )}
    {/*Admin */}
    {position === 'Admin' && (
      <>
        <NavLink to="/adminhomepage">
          <li>Home Page</li>
        </NavLink>
        <NavLink to="/staffregistrationadmin">
          <li>Manage employees</li>
        </NavLink>
        <NavLink to="/leaverequestview">
          <li>View Leave Requests</li>
        </NavLink>
        <NavLink to="/overtimerequestview">
          <li>View Overtime Requests</li>
        </NavLink>
        <NavLink to="/printingrequestview">
          <li>View Clock in and Clock out times</li>
        </NavLink>
      </>
    )}
  </ul>
  <button className={`hrlogout ${isExpanded ? '' : 'disabled-button'}`} onClick={isExpanded ? handleLogout : null}>
    Logout
  </button>
</div>
    </>
  )
}

export default SidebarNav;