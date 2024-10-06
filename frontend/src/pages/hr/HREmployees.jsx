import HRheader from './HRheader.jsx';
import './style/index.css';
import search from './assets/searchicon.png';
import propic2 from './assets/defaultpropic.png';
import { useEffect, useState } from 'react';

function HRProfile() {
    const [data, setData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null); // State to hold selected employee
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

    useEffect(() => {
        fetch('http://localhost:5173/users')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data); // Log the fetched data to inspect its structure
                setData(data);
            })
            .catch(err => console.error('Fetch error:', err));
    }, []);

    const handleRowClick = (employee) => {
        setSelectedEmployee(employee); // Set the clicked employee
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update search query
    };

    // Filter data based on search query
    const filteredData = data.filter(employee => {
        return (
            employee.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchQuery.toLowerCase())
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
                                    <tr key={i} onClick={() => handleRowClick(d)}> {/* Add click handler */}
                                        <td>{d.firstname}</td>
                                        <td>{d.lastname}</td>
                                        <td>{d.position}</td>
                                        <td>{d.clockInTime}</td>
                                        <td>{d.clockOutTime}</td>
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
                                    <td>{selectedEmployee ? selectedEmployee.firstname : '-----'}</td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Surname:</td>
                                    <td>{selectedEmployee ? selectedEmployee.lastname : '-----'}</td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>ID Number:</td>
                                    <td>{selectedEmployee ? selectedEmployee.id_number : '-----'}</td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Date of Birth:</td>
                                    <td>{selectedEmployee ? selectedEmployee.dateofbirth : '-----'}</td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Gender:</td>
                                    <td>{selectedEmployee ? selectedEmployee.gender : '-----'}</td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Nationality:</td>
                                    <td>{selectedEmployee ? selectedEmployee.nationality : '-----'}</td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Language:</td>
                                    <td>{selectedEmployee ? selectedEmployee.languages : '-----'}</td>
                                </tr>
                                <tr>
                                    <td className='chosendetails'>Position:</td>
                                    <td>{selectedEmployee ? selectedEmployee.position : '-----'}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HRProfile;
