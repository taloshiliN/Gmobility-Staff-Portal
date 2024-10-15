import '../../styles/HRHomePage.css';
import Header from '../../components/header';
import SidebarNav from '../../components/sidebarNav';
import { useSelector } from 'react-redux';
import { useState } from 'react'; 
import register from '../../assets/register.png'
import staffProfile from '../../assets/staffProfile.png'
import approve from '../../assets/approve.png'
import reject from '../../assets/reject.png'
import clock from '../../assets/clock.png'
import payroll from '../../assets/payroll.png'
import MessageFloat from '../hr/MessageFloat';

function HRHomePage() {
  const position = useSelector((state) => state.auth.position);
  const HRName = useSelector((state) => state.auth.data[0]);

  const [showPopup, setShowPopup] = useState(false);

  console.log("User Data:", HRName);
  if (!HRName) {
    return <div>Loading...</div>;
  }

  // HR-specific actions or departments
  const departments = [
    'Super Admin',
    'Admin',
    'HR',
    'DevOps',
    'Technical',
    'Accounting',
    'Printing',
  ];

  const handleHRClick = () => {
    setShowPopup(true); // Show the HR action card pop-up
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the HR action card pop-up
  };

  return (
    <>
      <Header />
      <SidebarNav position={position} />
      <MessageFloat />
      <div className={`profile-card3 ${showPopup ? 'blur-background' : ''}`}>
        <h2>Welcome HR {HRName.Name}</h2> {/* Welcome message for HR */}
      </div>

      {/* Department Containers for HR actions */}
      <div className={`department-containers3 ${showPopup ? 'blur-background' : ''}`}>
        {departments.map((department, index) => (
          <div 
          key={index} 
          className='department-container3'
          onClick={department === 'HR' ? handleHRClick : undefined}>
            <h3>{department}</h3>
          </div>
        ))}
      </div>

      {/* HR Action Pop-up */}
      {showPopup && (
        <div className="popup-container3">
          <div className="popup-content3">
            <h2>As HR, you can:</h2>
            <ul>
            <li>
                <img
                  src={register}
                  alt="register staff"
                />
                Register staff
              </li>
              <li>
                <img
                  src={staffProfile}
                  alt="Manage employee profiles"
                />
                Manage employee profiles
              </li>
              <li>
                <img
                  src={approve}
                  alt="Approve requests"
                />
                Approve leave/overtime/printing requests
              </li>
              <li>
                <img
                  src={reject}
                  alt="Reject requests"
                />
                Reject leave/overtime/printing requests
              </li>
              <li>
                <img
                  src={clock}
                  alt=" View clock in/clock out times"
                />
                View clock in/clock out times
              </li>
              <li>
                <img
                  src={payroll}
                  alt="Handle employee payroll information"
                />
                Handle employee payroll information
              </li>
            </ul>
            <button className="return-button3" onClick={handleClosePopup}>
              Return
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default HRHomePage;
