import React, { useEffect } from 'react';
import '../../styles/leaverequest.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLeaveRequest } from '../../leaveSlice';
import HRheader from './HRheader';

function HRrequestleave() {
  const staffposition = useSelector((state) => state.auth.position);

  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [resumingWorkDay, setResumingWorkDay] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyAddress, setEmergencyAddress] = useState("");
  const [reason, setReason] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const dispatch = useDispatch();

  const calculateResumingWorkDay = () => {
    if (endDate) {
      const end = new Date(endDate);
      const resumingDay = new Date(end);
      resumingDay.setDate(resumingDay.getDate() + 1);
      setResumingWorkDay(resumingDay.toISOString().split("T")[0]);
    } else {
      setResumingWorkDay("");
    }
  };

  const calculateTotalDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(diffDays);
    } else {
      setTotalDays(0);
    }
  };

  useEffect(() => {
    calculateResumingWorkDay();
    calculateTotalDays();
  }, [startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", {
      employeeName,
      position: staffposition, // Use staffposition here
      date,
      supervisorName,
      startDate,
      endDate,
      totalDays,
      resumingWorkDay,
      reason,
      emergencyName,
      emergencyAddress,
      emergencyPhone,
    });
    
    if (
      employeeName &&
      staffposition && // Check staffposition here
      date &&
      supervisorName &&
      startDate &&
      endDate &&
      totalDays > 0 && 
      resumingWorkDay &&
      reason &&
      emergencyName &&
      emergencyAddress &&
      emergencyPhone
    ) {
      dispatch(createLeaveRequest({
        employeeName,
        position: staffposition, // Use staffposition here
        date,
        supervisorName,
        startDate,
        endDate,
        totalDays,
        reason,
        resumingWorkDay,
        emergencyName,
        emergencyAddress,
        emergencyPhone,
      }));
      
      // Clear form fields after submission
      setEmployeeName("");
      setDate("");
      setSupervisorName("");
      setStartDate("");
      setEndDate("");
      setTotalDays(0);
      setReason("");
      setResumingWorkDay("");
      setEmergencyName("");
      setEmergencyAddress("");
      setEmergencyPhone("");
    }
  };

  return (
    <div className='contain'>
      <HRheader />
      <div className='main-content'>
        <div className='head'>
          <form className='leave_request_form' onSubmit={handleSubmit}>
            <h2>Employee Leave Application form</h2>
            <table>
              <tbody>
                <tr>
                  <td>Employee Name</td>
                  <td>
                    <input 
                      type="text" 
                      name="EmployeeName" 
                      value={employeeName} 
                      onChange={e => setEmployeeName(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>
                    <input 
                      type="date" 
                      name="date" 
                      value={date} 
                      onChange={e => setDate(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Supervisor Name</td>
                  <td>
                    <input 
                      type="text" 
                      name="SupervisorName" 
                      value={supervisorName} 
                      onChange={e => setSupervisorName(e.target.value)}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>Reason For Leave</h3>
            <table>
              <tbody>
                <tr>
                  <td>Reason for leave</td>
                  <td>
                    <input 
                      type="text" 
                      name="reason" 
                      value={reason} 
                      onChange={e => setReason(e.target.value)}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>Leave Requested</h3>
            <table>
              <tbody>
                <tr>
                  <td>Start Date:</td>
                  <td>
                    <input 
                      type="date" 
                      name="start_date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>End Date:</td>
                  <td>
                    <input 
                      type="date" 
                      name="end_date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Total Days:</td>
                  <td>
                    <input 
                      type="number" 
                      name="total_days"
                      value={totalDays}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>Resuming Work Day:</td>
                  <td>
                    <input 
                      type="date" 
                      name="resuming_work_day"
                      value={resumingWorkDay}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>Emergency Contact</h3>
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>
                    <input 
                      type="text" 
                      name="emergency_name"
                      value={emergencyName}
                      onChange={e => setEmergencyName(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>
                    <input 
                      type="text" 
                      name="emergency_address"
                      value={emergencyAddress}
                      onChange={e => setEmergencyAddress(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Phone Number:</td>
                  <td>
                    <input 
                      type="text" 
                      name="emergency_phone"
                      value={emergencyPhone}
                      onChange={e => setEmergencyPhone(e.target.value)}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="instructions">
              <h4>How to Submit Leave Permission</h4>
              <ol>
                <li>Employee has to submit leave application form at least 14 days prior to leave taken.</li>
                <li>Leave application must be verified by HR.</li>
                <li>Verified application will be taken to direct superior.</li>
                <li>The original application will be given back to HR. Employee will be given a copy.</li>
              </ol>
            </div>
            <button type='button' onClick={() => {
              // Clear logic here if needed
            }}>Clear</button>
            <button type='submit'>Submit</button>
          </form>
        </div>  
      </div>
    </div>
  );
}

export default HRrequestleave;