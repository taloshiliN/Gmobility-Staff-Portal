import React, { useState, useEffect } from "react";
import './style/index.css';
import profile2 from './assets/profile2.png'; // Placeholder image
import MessagingFloat from './MessageFloat.jsx';
import HRheader from './HRheader.jsx';

function HRhome() {
  
  const userId = localStorage.getItem('userId'); 

  // State to track the staff details
  const [staffDetails, setStaffDetails] = useState(null); // Start with null to handle loading state
  const [isEditing, setIsEditing] = useState(false); // State to track if we're in edit mode
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State for error handling

  // Fetch staff details from the backend using the unique user ID
  const fetchStaffDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getStaffDetails/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStaffDetails(data);
      setLoading(false); // Set loading to false once data is retrieved
    } catch (error) {
      console.error('Error fetching staff details:', error);
      setError(error.message);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    if (userId) {
      fetchStaffDetails(); // Fetch data when the component mounts, only if userId exists
    }
  }, [userId]);

  // Function to handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffDetails({ ...staffDetails, [name]: value });
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Display error message if data retrieval fails
  }

  if (!staffDetails) {
    return <p>No staff details found</p>; // Display error if no data is found
  }

  return (
    <>
      <HRheader />
      <div className="homecontent">
        <h4 className='greeting'>Welcome, {staffDetails.Name}</h4>
        <div className='innerhomecontent'>
          <div className='innercontent1'>
            <h4>Profile</h4>
            <img src={profile2} alt='Profile Image' />
            <table className='detailtable'>
              <tbody>
                <tr>
                  <td className='hrdetails'>Name: </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={staffDetails.Name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      staffDetails.Name
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='hrdetails'>Surname: </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="surname"
                        value={staffDetails.Surname}
                        onChange={handleInputChange}
                      />
                    ) : (
                      staffDetails.Surname
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='hrdetails'>ID Number: </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="idNumber"
                        value={staffDetails.ID_Number}
                        onChange={handleInputChange}
                      />
                    ) : (
                      staffDetails.ID_Number
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='hrdetails'>Date of Birth: </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="dob"
                        value={staffDetails.DOB}
                        onChange={handleInputChange}
                      />
                    ) : (
                      staffDetails.dob
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='hrdetails'>Gender: </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="gender"
                        value={staffDetails.gender}
                        onChange={handleInputChange}
                      />
                    ) : (
                      staffDetails.gender
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='hrdetails'>Nationality: </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="nationality"
                        value={staffDetails.nationality}
                        onChange={handleInputChange}
                      />
                    ) : (
                      staffDetails.nationality
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='hrdetails'>Language: </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="language"
                        value={staffDetails.language}
                        onChange={handleInputChange}
                      />
                    ) : (
                      staffDetails.language
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='hrdetails'>Position: </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="position"
                        value={staffDetails.position}
                        onChange={handleInputChange}
                      />
                    ) : (
                      staffDetails.position
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={toggleEditMode} className='editButton'>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <div>
            <div className='clockingsection'>
              <hr />
              <div className='clockingtimes'>
                <p>Current time: <h5>10:31</h5></p>
                <p>Time clocked-In: <h5>07:45</h5></p>
                <p>Time-clocked-out: <h5>None</h5></p>
              </div>
              <button className='clockinbutton'>Clock-In</button>
              <button className='clockoutbutton'>Clock-Out</button>
              <hr />
            </div>
            <MessagingFloat />
          </div>
        </div>
      </div>
    </>
  );
}

export default HRhome;
