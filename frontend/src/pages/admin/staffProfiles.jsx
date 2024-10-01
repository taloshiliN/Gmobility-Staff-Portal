import React, { useState } from 'react';
import AdminSidebar from '../../components/adminSidebar';
import '../../styles/StaffProfiles.css'; // Importing CSS for styling

const StaffProfiles = () => {
  const staffList = [
    'Erastus', 'Talo', 'Hozei', 'David', 'Domingo', 'Owen', 'Hafeni', 'Selma', 'Emily', 'Christy'
  ];

  const [selectedStaff, setSelectedStaff] = useState({
    name: 'Hozei',
    surname: 'Naubeb',
    idNumber: '4567899876',
    dateOfBirth: '06/11/1982',
    nationality: 'Namibian',
    homeLanguage: 'Oshiwambo',
    otherLanguages: 'English, French',
    position: 'Software Intern',
    profilePicture: '/images/profile-picture.jpg',
  });

  // State to track whether we are in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handler for saving changes
  const handleSave = () => {
    setIsEditing(false); // Exit edit mode
  };

// Retrieve profile picture URL from database when user logs in
const handleLogin = async (username, password) => {
  // Make API call to backend to retrieve profile picture URL
  const response = await fetch('/api/user/profile-picture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const profilePictureUrl = await response.json();

    // Update selectedStaff state with the retrieved profile picture URL
    setSelectedStaff({ ...selectedStaff, profilePicture: profilePictureUrl });
  };

  // Simulate login functionality
  const handleLoginClick = () => {
    handleLogin('username', 'password');
  };

  return (
    <>
      <AdminSidebar />
      <div className="staff-profiles-container">
        <header className="header">
          <h1>Staff profiles</h1>
        </header>

        <div className="content-container">
          <div className="staff-list">
            <ul>
              {staffList.map((staff, index) => (
                <li
                  key={index}
                  className={staff === selectedStaff.name ? 'selected' : ''}
                  onClick={() => setSelectedStaff({
                    name: staff, 
                    surname: 'Naubeb',
                    idNumber: '4567899876',
                    dateOfBirth: '06/11/1982',
                    nationality: 'Namibian',
                    homeLanguage: 'Oshiwambo',
                    otherLanguages: 'English, French',
                    position: 'Software Intern',
                    profilePicture: '/images/profile-picture.jpg',
                  })}
                >
                  {staff}
                </li>
              ))}
            </ul>
          </div>

          <div className="profile-card">
            <div className="profile-picture">
              <img src={selectedStaff.profilePicture} alt="Profile" />
            </div>

            <div className="profile-details">
              {isEditing ? (
                <>
                  <p><strong>Name:</strong> <input value={selectedStaff.name} onChange={(e) => setSelectedStaff({ ...selectedStaff, name: e.target.value })} /></p>
                  <p><strong>Surname:</strong> <input value={selectedStaff.surname} onChange={(e) => setSelectedStaff({ ...selectedStaff, surname: e.target.value })} /></p>
                  <p><strong>ID Number:</strong> <input value={selectedStaff.idNumber} onChange={(e) => setSelectedStaff({ ...selectedStaff, idNumber: e.target.value })} /></p>
                  <p><strong>Date of Birth:</strong> <input value={selectedStaff.dateOfBirth} onChange={(e) => setSelectedStaff({ ...selectedStaff, dateOfBirth: e.target.value })} /></p>
                  <p><strong>Nationality:</strong> <input value={selectedStaff.nationality} onChange={(e) => setSelectedStaff({ ...selectedStaff, nationality: e.target.value })} /></p>
                  <p><strong>Home language:</strong> <input value={selectedStaff.homeLanguage} onChange={(e) => setSelectedStaff({ ...selectedStaff, homeLanguage: e.target.value })} /></p>
                  <p><strong>Other languages:</strong> <input value={selectedStaff.otherLanguages} onChange={(e) => setSelectedStaff({ ...selectedStaff, otherLanguages: e.target.value })} /></p>
                  <p><strong>Position:</strong> <input value={selectedStaff.position} onChange={(e) => setSelectedStaff({ ...selectedStaff, position: e.target.value })} /></p>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> <span>{selectedStaff.name}</span></p>
                  <p><strong>Surname:</strong> <span>{selectedStaff.surname}</span></p>
                  <p><strong>ID Number:</strong> <span>{selectedStaff.idNumber}</span></p>
                  <p><strong>Date of Birth:</strong> <span>{selectedStaff.dateOfBirth}</span></p>
                  <p><strong>Nationality:</strong> <span>{selectedStaff.nationality}</span></p>
                  <p><strong>Home language:</strong> <span>{selectedStaff.homeLanguage}</span></p>
                  <p><strong>Other languages:</strong> <span>{selectedStaff.otherLanguages}</span></p>
                  <p><strong>Position:</strong> <span>{selectedStaff.position}</span></p>
                </>
              )}
            </div>

            <button 
              className="edit-btn" 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffProfiles;
