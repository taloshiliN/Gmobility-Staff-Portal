import '../../styles/AdminHomePage.css';
import Header from '../../components/header';
import SidebarNav from '../../components/sidebarNav';
import { useSelector } from 'react-redux';
import { useState } from 'react'; 
import register from '../../assets/register.png'
import staffProfile from '../../assets/staffProfile.png'
import approve from '../../assets/approve.png'
import reject from '../../assets/reject.png'
import clock from '../../assets/clock.png'
import MessageFloat from '../hr/MessageFloat';


function AdminHomePage() {
  const position = useSelector((state) => state.auth.position);
  const adminName = useSelector((state) => state.auth.data[0]);

  const [showPopup, setShowPopup] = useState(false);

  console.log("User Data:", adminName);
  if (!adminName) {
    return <div>Loading...</div>;
  }

  // Array of department titles
  const departments = [
    'Super Admin',
    'Admin',
    'HR',
    'DevOps',
    'Technical',
    'Accounting',
    'Printing',
  ];

  const handleAdminClick = () => {
    setShowPopup(true); // Show the admin action card pop-up
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the admin action card pop-up
  };

  return (
    <>
      <Header />
      <SidebarNav position={position} />
      <MessageFloat />
      <div className={`profile-card ${showPopup ? 'blur-background' : ''}`}>
        <h2>Welcome Admin {adminName.Name}</h2> {/* Welcome message */}
      </div>

      {/* Department Containers */}
      <div className={`department-containers ${showPopup ? 'blur-background' : ''}`}>
        {departments.map((department, index) => (
          <div 
          key={index} 
          className='department-container'
          onClick={department === 'Admin' ? handleAdminClick : undefined}>
            <h3>{department}</h3>
          </div>
        ))}
      </div>

      {/* Admin Action Pop-up */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>As an Admin you can:</h2>
            <ul>
              <li>
                <img
                  src={register}
                  alt="Register staff"
                />
                Register staff
              </li>
              <li>
                <img
                  src={staffProfile}
                  alt="View staff profiles"
                />
                View staff profiles
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
                  alt="Clock in/out times"
                />
                View clock in/clock out times
              </li>
            </ul>
            <button className="return-button" onClick={handleClosePopup}>
              Return
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminHomePage;
