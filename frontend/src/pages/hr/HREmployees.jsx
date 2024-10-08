import HRheader from './HRheader.jsx';
import './style/index.css';
import search from './assets/searchicon.png';
import propic2 from './assets/defaultpropic.png';
import { useEffect, useState } from 'react';

function HREmployees() {
    const [data, setData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [editedEmployee, setEditedEmployee] = useState({
        firstname: '',
        lastname: '',
        id_number: '',
        DOB: '',
        Supervisor: '',
        Gender: '',
        nationality: '',
        languages: '',
        position: '',
    });

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

    const handleRowClick = (employee) => {
        setSelectedEmployee(employee);
        setEditedEmployee({
            firstname: employee.Name,
            lastname: employee.Surname,
            Supervisor: employee.Supervisor,
            id_number: employee.ID_Number,
            DOB: employee.DOB.stringify ? employee.DOB.split('T')[0] : '', // Format to YYYY-MM-DD for input
            Gender: employee.Gender,
            nationality: employee.Nationality,
            languages: employee.Other_Languages,
            position: employee.Position,
        });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

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
            setSelectedEmployee(updatedEmployee);
            setEditedEmployee(updatedEmployee);
        })
        .catch(err => console.error('Update error:', err));
    };

    const handleDeleteEmployee = () => {
        if (!selectedEmployee) return;

        fetch(`http://localhost:8080/users/${selectedEmployee.ID_Number}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to delete employee');
            }
            setData(prevData => prevData.filter(emp => emp.ID_Number !== selectedEmployee.ID_Number));
            setSelectedEmployee(null);
            setEditedEmployee({
                firstname: '',
                lastname: '',
                id_number: '',
                Supervisor: '',
                DOB: '',
                Gender: '',
                nationality: '',
                languages: '',
                position: '',
            });
        })
        .catch(err => console.error('Delete error:', err));
    };

    const filteredData = data.filter(employee => {
        return (
            employee.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.Surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.Supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.Position.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <>
            <HRheader />
            <div className='viewemployees'>
                <div className='employeesearch'>
                    <img className='searchicon' src={search} alt="Search" />
                    <input 
                        type="text" 
                        placeholder='Search' 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                    />
                </div>
                <div className='employeecontents'>
                    <table className='employeestable'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Position</th>
                                <th>Supervisor</th>
                                <th>Clock-In Time</th>
                                <th>Clock-Out Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan="5">No employees found.</td>
                                </tr>
                            ) : (
                                filteredData.map((d, i) => (
                                    <tr key={i} onClick={() => handleRowClick(d)}>
                                        <td>{d.Name}</td>
                                        <td>{d.Surname}</td>
                                        <td>{d.Position}</td>
                                        <td>{d.Supervisor || 'N/A'}</td>
                                        <td>{d.ClockInTime || 'N/A'}</td>
                                        <td>{d.ClockOutTime || 'N/A'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className='chosenemployee'>
                        <img className='chosenimage' src={propic2} alt='Loading...' />
                        <table>
                            <thead>
                                <tr>
                                    <td className='chosendetails'>Name:</td>
                                    <td>
                                        {selectedEmployee ? (
                                            <input 
                                                type="text" 
                                                name="firstname" 
                                                value={editedEmployee.firstname} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : '-----'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Surname:</td>
                                    <td>
                                        {selectedEmployee ? (
                                            <input 
                                                type="text" 
                                                name="lastname" 
                                                value={editedEmployee.lastname} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : '-----'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Supervisor:</td>
                                    <td>
                                        {selectedEmployee ? (
                                            <input 
                                                type="text" 
                                                name="Supervisor" // Changed to match state
                                                value={editedEmployee.Supervisor} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : '-----'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>ID Number:</td>
                                    <td>
                                        {selectedEmployee ? (
                                            <input 
                                                type="text" 
                                                name="id_number" 
                                                value={editedEmployee.id_number} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : '-----'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Date of Birth:</td>
                                    <td>
                                        {selectedEmployee ? (
                                            <input 
                                                type="date" 
                                                name="DOB" 
                                                value={editedEmployee.DOB} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : '-----'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Gender:</td>
                                    <td>
                                        {selectedEmployee ? (
                                            <input 
                                                type="text" 
                                                name="Gender" // Changed to match state
                                                value={editedEmployee.Gender} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : '-----'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Nationality:</td>
                                    <td>
                                        {selectedEmployee ? (
                                            <input 
                                                type="text" 
                                                name="nationality" 
                                                value={editedEmployee.nationality} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : '-----'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Language:</td>
                                    <td>
                                        {selectedEmployee ? (
                                            <input 
                                                type="text" 
                                                name="languages" 
                                                value={editedEmployee.languages} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : '-----'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Position:</td>
                                    <td>
                                        {selectedEmployee ? (
                                            <input 
                                                type="text" 
                                                name="position" 
                                                value={editedEmployee.position} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : '-----'}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        {selectedEmployee && (
                            <>
                                <button id="editbutton" onClick={handleUpdateEmployee}>Update Profile</button>
                                <button id="deletebutton" onClick={handleDeleteEmployee}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HREmployees;