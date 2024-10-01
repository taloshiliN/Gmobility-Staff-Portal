import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/sidebarstyling.css'
import profile from '../assets/defaulticon.png'
import image1 from '../assets/person3.png'
import image2 from '../assets/time.png'
import image3 from '../assets/person.png'
import image4 from '../assets/person2.png'
import arrow from '../assets/arrow.png'
import Header from './header'

function SidebarNav({position}) {

  if (!position) {
    console.warn('Position is undefined in SidebarNav component');
    return <div>Position is not available</div>; // A fallback message
  }


  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
      <div className='Employee-sidebar'>
        <img className='arrow' src={arrow}></img>
        <ul>
          {/*Employee */}
          {position === 'Employee' && (
            <>
              <li>
                <NavLink to="/leaverequest">Leave Requests</NavLink>
              </li>
              <li>
                <NavLink to="/overtimerequest">Overtime Request</NavLink>
              </li>
              <li>
                <NavLink to="/overtimeview">View Overtime</NavLink>
              </li>
              <li>
                <NavLink to="/clockinclockout">View Clock in and Clock out times</NavLink>
              </li>
              <li>
                <NavLink to='/printingrequest'>Printing request</NavLink>
              </li>
            </>
          )}

          {/*Human Resource */}
          {position === 'Human Resource' && (
            <>
            <li>
              <NavLink to="/staffregistration">Staff registration</NavLink>
            </li>
              <li>
                <NavLink to="/hrleaverequest">View Leave Request</NavLink>
              </li>
              <li>
                <NavLink to="/overtimerequest">View Overtime Request</NavLink>
              </li>
              <li>
                <NavLink to="/hrovertimerequests">View Overtime</NavLink>
              </li>
              <li>
                <NavLink to="/clockinclockout">View Employee Clock In Hours</NavLink>
              </li>
            </>
          )}

          {/*Admin */}
          {position === 'Admin' && (
            <>
              <li>
                <NavLink to="/adminhomepage">Home Page</NavLink>
              </li>
              <li>
                <NavLink to="/staffregistrationadmin">Manage employees</NavLink>
              </li>
              <li>
                <NavLink to="/leaverequestview">View Leave Requests</NavLink>
              </li>
              <li>
                <NavLink to="/overtimerequestview">View Overtime Requests</NavLink>
              </li>
              <li>
                <NavLink to="/printingrequestview">View Clock in and Clock out times</NavLink>
              </li>
            </>
          )}
        </ul>
        <button className='hrlogout'>Logout</button>
      </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </>
  )
}

export default SidebarNav