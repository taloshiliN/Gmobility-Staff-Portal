import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';
import profile2 from './assets/profile2.png';
import MessagingFloat from './MessageFloat.jsx';
import personicon from './assets/personicon.png';

function HRhome() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const user = useSelector((state) => state.auth.data[0]); 

    console.log("User Data:", user); 
    if (!user) {
        return <div>Loading...</div>;
    }

    const position = useSelector((state)=> state.auth.position)

    return (
        <>
            {/* <HRheader /> */}
            <Header />
            <SidebarNav position={position}/>
            <div className='main-content'>
            <div className="homecontent">
                <h4 className='greeting'>Welcome {user.Name}</h4>
                <div className='innerhomecontent'>
                    <div className='innercontent1'>
                        <h4>Profile</h4>
                        <img src={profile2} alt="Profile Image" style={{ width: '150px', height: '150px' }} />
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
                                    <td>{user.Gender || "Not specified"}</td> {/* Assuming Gender is part of user data */}
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
//                         <div className='clockingsection'>
//                             <hr />
//                             <div className='clockingtimes'>
//                                 <p>Current time: <h5>10:31</h5></p>
//                                 <p>Time clocked-In: <h5>07:45</h5></p>
//                                 <p>Time-clocked-out: <h5>None</h5></p>
//                             </div>
//                             <button className='clockinbutton'>Clock-In</button>
//                             <button className='clockoutbutton'>Clock-Out</button>
//                             <hr />
//                         </div>
                        <MessagingFloat />
                    <div className='innerhomecontent'>
                        {filteredData.length === 0 ? (
                            <p>No employees found</p>
                        ) : (
                            filteredData.map((d, i) => (
                                <div 
                                    key={i} 
                                    className="employeecard" 
                                    onClick={() => navigate('/hrchosenemployee', { state: { employee: d } })} 
                                >
                                    <img  
                                        src={`http://localhost:8080/staff/${d.id}/profile-image`} 
                                        alt='Profile Image' 
                                    />

                                    <div id="employeeinner">
                                        <p id="employeename">{d.Name} {d.Surname}</p>
                                        <p id="employeeposition">{d.Position}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default HRhome;
