import React, { useEffect, useState } from 'react';
import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './style/index.css';
import defaulticon from './assets/defaulticon.png'

function HRChosenemployee() {
    const position = useSelector((state) => state.auth.position);
    const location = useLocation();
    const { employee } = location.state;

    const [editedEmployee, setEditedEmployee] = useState({
        firstname: employee.Name,
        lastname: employee.Surname,
        id_number: employee.ID_Number,
        DOB: employee.DOB ? employee.DOB.split('T')[0] : '', // Format to YYYY-MM-DD for input
        Supervisor: employee.Supervisor || '',
        Gender: employee.Gender,
        nationality: employee.Nationality,
        languages: employee.Other_Languages || '',
        position: employee.Position,
    });

    const [data, setData] = useState([]);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateEmployee = () => {
        fetch(`http://localhost:8080/users/${editedEmployee.id_number}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...editedEmployee,
                DOB: editedEmployee.DOB // Ensure DOB is sent as a date
            }),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update employee');
            }
            return res.json();
        })
        .then(updatedEmployee => {
            setData(prevData => 
                prevData.map(emp => emp.ID_Number === updatedEmployee.ID_Number ? updatedEmployee : emp)
            );
            setEditedEmployee(updatedEmployee);
        })
        .catch(err => console.error('Update error:', err));
    };

    const handleDeleteEmployee = () => {
        fetch(`http://localhost:8080/users/${editedEmployee.id_number}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to delete employee');
            }
            setData(prevData => prevData.filter(emp => emp.ID_Number !== editedEmployee.id_number));
        })
        .catch(err => console.error('Delete error:', err));
    };

    return (
        <>
            <Header />
            <SidebarNav position={position} />
            <div className="chosenemployee">
                <div id="innerchosenemployee">
                    <table>
                        <thead>
                        <tr id="empimage">  
                                <td className='chosendetails'>Profile Picture:</td>
                               <td id="imginner">
                                    <img 
                                        className="chosenimage" 
                                        src={employee.profilepicture || defaulticon} 
                                        alt='Profile' 
                                        onError={(e) => { e.target.src = defaulticon; }} // Fallback image
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
                                        name="id_number" 
                                        value={editedEmployee.id_number} 
                                        readOnly // Prevent editing ID number
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
        </>
    );
}

export default HRChosenemployee;
