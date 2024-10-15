import React, { useEffect, useState } from 'react';
import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './style/index.css';
import defaulticon from './assets/defaulticon.png';

function HRChosenemployee() {
    const navigate = useNavigate();
    const position = useSelector((state) => state.auth.position);
    const location = useLocation();
    const { employee } = location.state || {};

    if (!employee || !employee.id) {
        console.error('Employee data is missing or invalid');
        return <div>Error: Employee data not found.</div>;
    }

    const [editedEmployee, setEditedEmployee] = useState({
        id: employee.id,
        firstname: employee.Name,
        lastname: employee.Surname,
        ID_Number: employee.ID_Number,
        DOB: employee.DOB ? employee.DOB.split('T')[0] : '',
        Supervisor: employee.Supervisor || '',
        Gender: employee.Gender,
        nationality: employee.Nationality,
        languages: employee.Other_Languages || '',
        position: employee.Position,
    });

    const [data, setData] = useState([]);
    const [missedDays, setMissedDays] = useState([]); // State for missed days

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8080/users');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setData(data);
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        fetchData();
    }, []);

    // Fetch missed days for the employee
    useEffect(() => {
        const fetchMissedDays = async () => {
            try {
                const res = await fetch(`http://localhost:8080/employeemisseddays/${editedEmployee.id}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setMissedDays(data);
            } catch (err) {
                console.error('Fetch missed days error:', err);
            }
        };

        fetchMissedDays();
    }, [editedEmployee.id]); // Dependency array includes employee id

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateEmployee = async () => {
        if (!editedEmployee.id) {
            console.error('Employee ID is undefined');
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/updateuser/${editedEmployee.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: editedEmployee.firstname,
                    Surname: editedEmployee.lastname,
                    ID_Number: editedEmployee.ID_Number,
                    DOB: editedEmployee.DOB,
                    Gender: editedEmployee.Gender,
                    Nationality: editedEmployee.nationality,
                    Supervisor: editedEmployee.Supervisor,
                    Home_Language: editedEmployee.languages,
                    Other_Languages: editedEmployee.languages,
                    Position: editedEmployee.position,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to update employee');
            }
            const updatedEmployee = await res.json();
            setData(prevData => 
                prevData.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
            );
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    const handleDeleteEmployee = async () => {
        if (!editedEmployee.id) {
            console.error('Employee ID is undefined');
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/deleteuser/${editedEmployee.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete employee');
            }
            setData(prevData => prevData.filter(emp => emp.id !== editedEmployee.id));
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <>
            <Header />
            <SidebarNav position={position} />
            <div id="chosencontent">
                <div className="chosenemployee">
                    <div id="innerchosenemployee">
                        <table>
                            <thead>
                                <tr id="empimage">
                                    <td className='chosendetails'>Profile Picture:</td>
                                    <td id="imginner">
                                        <img 
                                            className="chosenimage" 
                                            src={`http://localhost:8080/staff/${editedEmployee.id}/profile-image` || defaulticon} 
                                            alt='Profile' 
                                            onError={(e) => { e.target.src = defaulticon; }} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Name:</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="firstname" 
                                            value={editedEmployee.firstname} 
                                            onChange={handleInputChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Surname:</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="lastname" 
                                            value={editedEmployee.lastname} 
                                            onChange={handleInputChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Supervisor:</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="Supervisor" 
                                            value={editedEmployee.Supervisor} 
                                            onChange={handleInputChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>ID Number:</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="ID_Number" 
                                            value={editedEmployee.ID_Number} 
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Date of Birth:</td>
                                    <td>
                                        <input 
                                            type="date" 
                                            name="DOB" 
                                            value={editedEmployee.DOB} 
                                            onChange={handleInputChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Gender:</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="Gender" 
                                            value={editedEmployee.Gender} 
                                            onChange={handleInputChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Nationality:</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="nationality" 
                                            value={editedEmployee.nationality} 
                                            onChange={handleInputChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Language:</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="languages" 
                                            value={editedEmployee.languages} 
                                            onChange={handleInputChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Position:</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="position" 
                                            value={editedEmployee.position} 
                                            onChange={handleInputChange} 
                                        />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <button id="editbutton" onClick={handleUpdateEmployee}>Update Profile</button>
                        <button id="deletebutton" onClick={handleDeleteEmployee}>Delete</button>
                    </div>
                </div>
                <div id="chosenbelongingssection">
                    <div id="chosendocuments">
                        <div id="doctitle">
                            <h4>Documents</h4>
                        </div>
                        <div id="doccontent">
                            <ul>
                                <li><p>Hello how are you.pdf </p></li>
                            </ul>
                        </div>
                    </div>
                    <div id="chosenmissedsection">
                        <h4>Days Missed</h4>
                        <table id="missedtable">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Clockin Time</th>
                                    <th>Clockout Time</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {missedDays.length > 0 ? (
                                    missedDays.map((day) => (
                                        <tr key={day.id}>
                                            <td>{new Date(day.date).toLocaleDateString()}</td>
                                            <td>{day.clockinTime || '----'}</td>
                                            <td>{day.clockoutTime || '----'}</td>
                                            <td>
                                            <button onClick={() => navigate('/hrmisseddays', { state: { missedDay: day, employeeId: editedEmployee.id, employeeName: editedEmployee.firstname + ' ' + editedEmployee.lastname } })}>Edit</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No missed days found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HRChosenemployee;
