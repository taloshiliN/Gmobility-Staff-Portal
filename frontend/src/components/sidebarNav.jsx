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
    navigate('/login')
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
//       <div className='Employee-sidebar'>
//         <img className='arrow' src={arrow}></img>
//         <ul>
//           {/*Employee */}
//           {position === 'Employee' && (
//             <>
//              <li>
//                 <NavLink to="/home">Home</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/leaverequest">Leave Requests</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/overtimerequest">Overtime Request</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/overtimeview">View Overtime</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/clockinclockout">View Clock in and Clock out times</NavLink>
//               </li>
//               <li>
//                 <NavLink to='/printingrequest'>Printing request</NavLink>
//               </li>
//             </>
//           )}
//           {/*Human Resource */}
//           {position === 'Human Resource' && (
//             <>
//             <li>
//               <NavLink to="/HRhomePage">Home Page</NavLink>
//             </li>
            
//             <li>
//               <NavLink to="/hrhome">Home</NavLink>
//             </li>
        
//             <li>
//               <NavLink to="/staffregistration">Staff registration</NavLink>
//             </li>

//             <li>
//               <NavLink to="/hrpayroll">View Payrolls</NavLink>
//             </li>
//             <li>
//                 <NavLink to='/hrrequests'>View requests</NavLink>
//               </li>
//             </>
//           )}
//           {/*Admin */}
//           {position === 'Admin' && (
//             <>
//               <li>
//                 <NavLink to="/adminhomepage">Home Page</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/staffregistrationadmin">Manage employees</NavLink>
//               </li>

//               <li>
//                 <NavLink to="/staffProfiles">View Staff Profiles</NavLink>
//               </li>

//               {/*<li>
//                 <NavLink to="/leaverequestview">View Leave Requests</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/overtimerequestview">View Overtime Requests</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/printingrequestview">View Clock in and Clock out times</NavLink>
//               </li>*/}

//               <li>
//                 <NavLink to="/adminRequests">View Requests</NavLink>
//               </li>
//             </>
//           )}
//         </ul>
//         <button className='hrlogout' onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
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
        <NavLink to="/hrhomepage">
          <li>Home</li>
        </NavLink>
        <NavLink to="/hremployees">
          <li>View Employees</li>
        </NavLink>
        <NavLink to="/staffregistration">
          <li>Staff registration</li>
        </NavLink>
        <NavLink to="/hrrequests">
          <li>View Requests</li>
        </NavLink>
        <NavLink to="/hrpayroll">
          <li>View Payroll</li>
        </NavLink>
        <NavLink to="/hrdocupload">
          <li>Upload document</li>
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
        <NavLink to="/viewrequests">
          <li>View Requests</li>
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
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
    </>
  )
}

export default SidebarNav;