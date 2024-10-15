import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';
import './style/index.css';
import profile2 from './assets/profile2.png';
import MessagingFloat from './MessageFloat.jsx';
import HRheader from './HRheader.jsx';


function HRhome() {
    // Get user data from Redux state
    const user = useSelector((state) => state.auth.data[0]); // Accessing the first user object

    console.log("User Data:", user); // Log user data for debugging
    if (!user) {
        return <div>Loading...</div>;
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
            <div className='innerhomecontent'>
                <div className='innercontent1'>
                    <h4>Profile</h4>
                    <img src={profile2} alt='Profile Image' />
                    <table className='detailtable'>
                        <tbody>
                            <tr>
                                <td className='hrdetails'>Name: </td>
                                <td>{user.Name}</td>
                            </tr>
                            <tr>
                                <td className='hrdetails'>Surname: </td>
                                <td>{user.Surname}</td>
                            </tr>
                            <tr>
                                <td className='hrdetails'>ID Number: </td>
                                <td>{user.ID_Number}</td>
                            </tr>
                            <tr>
                                <td className='hrdetails'>Date of Birth: </td>
                                <td>{user.DOB}</td>
                            </tr>
                            <tr>
                                <td className='hrdetails'>Gender: </td>
                                <td>{user.Gender || "Not specified"}</td>
                            </tr>
                            <tr>
                                <td className='hrdetails'>Nationality: </td>
                                <td>{user.Nationality}</td>
                            </tr>
                            <tr>
                                <td className='hrdetails'>Language: </td>
                                <td>{user.Home_Language}</td>
                            </tr>
                            <tr>
                                <td className='hrdetails'>Position: </td>
                                <td>{user.Position}</td>
                            </tr>
                        </tbody>
                    </table>
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
    </div>
    </>
);
}

export default HRhome;