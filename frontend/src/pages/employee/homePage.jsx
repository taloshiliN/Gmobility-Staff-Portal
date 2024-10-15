import '../../styles/HomePage.css';
import Header from '../../components/header';
import SidebarNav from '../../components/sidebarNav';
import { useSelector } from 'react-redux';
import { useState } from 'react'; 
import staffProfile from '../../assets/staffProfile.png';
import leaveRequest from '../../assets/leaveRequest.png';
import requestOvertime from '../../assets/requestOvertime.png' 
import requestPrint from '../../assets/requestPrint.png'
import viewRequests from '../../assets/viewRequests.png'
import payroll from '../../assets/payroll.png'
import clockinout from '../../assets/clockinout.png'
import MessageFloat from '../hr/MessageFloat';

function HomePage() {
  const position = useSelector((state) => state.auth.position);
  const employeeName = useSelector((state) => state.auth.data[0]);

  const [showPopup, setShowPopup] = useState(false);

  console.log("User Data:", employeeName);
  if (!employeeName) {
    return <div>Loading...</div>;
  }

  // Array of department titles (if necessary, or replace with other employee-relevant data)
  const departments = [
    'Super Admin',
    'Admin',
    'HR',
    'DevOps',
    'Technical',
    'Accounting',
    'Printing',
  ];

  const handleEmployeeClick = () => {
    setShowPopup(true); 
  };

  const handleClosePopup = () => {
    setShowPopup(false); 
  };

  return (
    <>
      <Header />
      <SidebarNav position={position} />
      <MessageFloat />
      <div className={`profile-card2 ${showPopup ? 'blur-background' : ''}`}>
        <h2>Welcome Employee {employeeName.Name}</h2>
      </div>

      {/* Department Containers (can adjust this to reflect employee roles or actions) */}
      <div className={`department-containers2 ${showPopup ? 'blur-background' : ''}`}>
        {departments.map((department, index) => (
          <div 
          key={index} 
          className='department-container2'
          onClick={department === 'DevOps' ? handleEmployeeClick : undefined}>
            <h3>{department}</h3>
          </div>
        ))}
      </div>

      {/* Employee Action Pop-up */}
      {showPopup && (
        <div className="popup-container2">
          <div className="popup-content2">
            <h2>As a DevOps you can:</h2>
            <ul>
            <li>
                <img
                  src={staffProfile}
                  alt="View your profile"
                />
                View your profile
              </li>
              <li>
                <img
                  src={leaveRequest}
                  alt="Request leave"
                />
                Request for leave
              </li>
              <li>
                <img
                  src={requestOvertime}
                  alt="Request to work overtime"
                />
              Request to work overtime
              </li>
              <li>
                <img
                  src={requestPrint}
                  alt="Request to print"
                />
                Request to print
              </li>
              <li>
                <img
                  src={viewRequests}
                  alt="View feedback for your requests"
                />
                View feedback for your requests 
              </li>
              <li>
                <img
                  src={payroll}
                  alt="payroll information"
                />
                View your payroll information
              </li>
              <li>
                <img
                  src={clockinout}
                  alt=" Clock in/out"
                />
                Clock in/out
              </li>
            </ul>
            <button className="return-button2" onClick={handleClosePopup}>
              Return
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
