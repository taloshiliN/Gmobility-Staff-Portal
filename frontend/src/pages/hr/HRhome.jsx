import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';
import './style/index.css';
import search from './assets/searchicon.png';
import MessagingFloat from './MessageFloat.jsx';
import personicon from './assets/personicon.png'

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
            <div className='main-content'>
                <div className="homecontent">
                    <h4 className='greeting'>Welcome {user.Name}</h4>

                    <div id="totalemployees">
                        <p><img src={personicon}></img> {data.length}</p>
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
                                    onClick={() => navigate('/hrchosenemployee')}
                                >
                                    <img src={d.profilepicture} alt='Profile Image' />
                                    <div id="employeeinner">
                                        <p id="employeename">{`${d.Name} ${d.Surname}`}</p>
                                        <p id="employeeposition">{d.Position}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <MessagingFloat />
                </div>
            </div>
        </>
    );
}

export default HRhome;
