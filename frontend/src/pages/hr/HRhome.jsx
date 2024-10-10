import React, { useState, useEffect } from "react";
import './style/index.css';
import profile2 from './assets/profile2.png'; // Placeholder image
import MessagingFloat from './MessageFloat.jsx';
import HRheader from './HRheader.jsx';
import SidebarNav from "../../components/sidebarNav.jsx";

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
      <SidebarNav />
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
=======
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';
import './style/index.css';
import search from './assets/searchicon.png';
import MessagingFloat from './MessageFloat.jsx';
import personicon from './assets/personicon.png';
import defaultimg from './assets/default.png'

function HRhome() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.data[0]); // Accessing the first user object
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = data.filter(employee => {
        return (
            employee.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.Surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.Supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.Position.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    console.log("User Data:", user); // Log user data for debugging

    if (!user) {
        return <div>Loading...</div>; // Display loading state if user data is not yet available
    }

    const position = useSelector((state) => state.auth.position);

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(err => console.error('Fetch error:', err));
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <Header />
            <SidebarNav position={position} />
            <MessagingFloat />
            <div className='main-content'>
                <div className="homecontent">
                    <h4 className='greeting'>Welcome {user.Name}</h4>

                    <div id="totalemployees">
                        <p><img src={personicon} alt="Person Icon" /> {data.length}</p>
                    </div>
                    
                    <div className='employeesearch'>
                        <img className='searchicon' src={search} alt="Search" />
                        <input 
                            type="text" 
                            placeholder='Search' 
                            value={searchQuery} 
                            onChange={handleSearchChange} 
                        />
                    </div>

                    <div className='innerhomecontent'>
                        {filteredData.length === 0 ? (
                            <p>No employees found</p>
                        ) : (
                            filteredData.map((d, i) => (
                                <div 
                                    key={i} 
                                    className="employeecard" 
                                    onClick={() => navigate('/hrchosenemployee', { state: { employee: d } })} // Pass selected employee data
                                >
                                    <img src={d.profilepicture  || defaultimg} alt='Profile Image' />
                                    <div id="employeeinner">
                                        <p id="employeename">{`${d.Name} ${d.Surname}`}</p>
                                        <p id="employeeposition">{d.Position}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                   
                </div>
            </div>
        </>
    );
}

export default HRhome;
