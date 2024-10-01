import React from 'react';
import '../../styles/OvertimeViewPage.css'; // Assuming you use a CSS file for styles
import Header from '../../components/header';
import SidebarNav from '../../components/sidebarNav';
import { useSelector } from 'react-redux';


function OvertimeViewPage() {

  const position = useSelector((state)=> state.auth.position)
  // Sample overtime requests data
  const overtimeRequests = [
    {
      id: 1,
      employeeName: 'David Ndantsi',
      date: '2024-09-15',
      hoursWorked: 5,
      reason: 'Project deadline',
      status: 'Approved',
    },
    {
      id: 2,
      employeeName: 'Taloshili',
      date: '2024-09-18',
      hoursWorked: 3,
      reason: 'System maintenance',
      status: 'Pending',
    },
    // Add more sample data as needed
  ];

  return (
    <>
  <Header />
  <SidebarNav position={position}/>
  <div className='main-content'>
  <div className="overtime-view-page">
      <h2>Overtime Requests</h2>
      <table className="overtime-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {overtimeRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.employeeName}</td>
              <td>{request.date}</td>
              <td>{request.hoursWorked}</td>
              <td>{request.reason}</td>
              <td className={`status ${request.status.toLowerCase()}`}>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    </>
  );
  
}


export default OvertimeViewPage;
 