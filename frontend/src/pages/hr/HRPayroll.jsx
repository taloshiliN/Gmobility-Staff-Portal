import React, { useEffect, useState } from 'react';
import HRheader from "./HRheader";
import './style/index.css';
import Header from '../../components/header';
import SidebarNav from '../../components/sidebarNav';
import { useSelector } from 'react-redux';

function HRPayroll() {
    const position = useSelector((state)=> state.auth.position)
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/hrpayroll') // Update this to your actual endpoint
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setEmployees(data);
                setLoading(false); // Set loading to false after fetching data
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setError(err.message);
                setLoading(false); // Set loading to false even on error
            });
    }, []);

    const handleRowClick = (employee) => {
        setSelectedEmployee(employee); // Set the selected employee
    };

    const filteredPayrollInfo = selectedEmployee
        ? employees.filter(emp => emp.id === selectedEmployee.id) // Assuming each employee has a unique `id`
        : [];

    return (
        <>
            <HRheader />
            <Header />
            <SidebarNav position={position}/>
            <div id="hrpayrolldiv">
                <h4>Staff Payroll</h4>
                <div id="hrpayroll">
                    <table id="payrollemployees">
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td>No employees found.</td>
                                </tr>
                            ) : (
                                employees.map((employee, index) => (
                                    <tr key={index} onClick={() => handleRowClick(employee)}>
                                        <td>{employee.Name} {employee.Surname}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div id="hrpayinfo">
                        <table id="hrpayrollinfo">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Position</th>
                                    <th>Regular Rate</th>
                                    <th>Overtime Rate</th>
                                    <th>Gross Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6">Loading...</td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="6">Error: {error}</td>
                                    </tr>
                                ) : filteredPayrollInfo.length === 0 ? (
                                    <tr>
                                        <td colSpan="6">Select an employee to view payroll info.</td>
                                    </tr>
                                ) : (
                                    filteredPayrollInfo.map((d, i) => (
                                        <tr key={i}>
                                            <td>{d.Name}</td>
                                            <td>{d.Surname}</td>
                                            <td>{d.Position}</td>
                                            <td>{d.regular_rate || 'N/A'}</td>
                                            <td>{d.overtime_rate || 'N/A'}</td>
                                            <td>{d.gross_pay || 'N/A'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HRPayroll;
