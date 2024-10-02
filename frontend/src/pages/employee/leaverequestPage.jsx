import React, { useEffect } from 'react'
import SidebarNav from '../../components/sidebarNav'
import Header from '../../components/header'
import '../../styles/leaverequest.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLeaveRequest } from '../../leaveSlice'

function LeaveRequest() {
  const position = useSelector((state) => state.auth.position);

  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [leaveType, setLeaveType] = useState({
    vacation: false,
    leaveOfAbsence: false,
    sickFamily: false,
    sickSelf:false,
    drAppointment: false,
    funeral: false,
    other:false,
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0); // Change to number
  const [resumingWorkDay, setResumingWorkDay] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyAddress, setEmergencyAddress] = useState("");
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
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Including the start day
      setTotalDays(diffDays);
    } else {
      setTotalDays(0); // Reset to 0 if no valid dates
    }
  };

  useEffect(() => {
    calculateResumingWorkDay();
    calculateTotalDays();
  }, [startDate, endDate]);

  const handleLeaveTypeChange = (e) => {
    const {name, checked} = e.target;
    setLeaveType((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", {
      employeeName,
      date,
      supervisorName,
      leaveType,
      startDate,
      endDate,
      totalDays,
      resumingWorkDay,
      emergencyName,
      emergencyAddress,
      emergencyPhone,
    });
    if (
      employeeName &&
      date &&
      supervisorName &&
      leaveType &&
      startDate &&
      endDate &&
      totalDays > 0 && 
      resumingWorkDay &&
      emergencyName &&
      emergencyAddress &&
      emergencyPhone
    ) {
      dispatch(createLeaveRequest({
        employeeName,
        date,
        supervisorName,
        leaveType,
        startDate,
        endDate,
        totalDays,
        resumingWorkDay,
        emergencyName,
        emergencyAddress,
        emergencyPhone,
      }));
      // Clear form fields after submission
      setEmployeeName("");
      setDate("");
      setSupervisorName("");
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setTotalDays(0);
      setResumingWorkDay("");
      setEmergencyName("");
      setEmergencyAddress("");
      setEmergencyPhone("");
    }
  };

  return (
    <>
    <div className='contain'>
      <Header />
      <SidebarNav position={position}/>
        <div className='main-content'>
          <div className='head'>
            <form className='leave_request_form' onSubmit={handleSubmit}>
              <h2>Employee Leave Application form</h2>
                <table>
                  <tr>
                    <td>Employee Name</td>
                    <td><input 
                    type="text" 
                    name="EmployeeName" 
                    value={employeeName} 
                    onChange={e=>setEmployeeName(e.target.value)}
                    required/>
                    </td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td><input 
                    type="date" 
                    name="date" 
                    value={date} 
                    onChange={e=>setDate(e.target.value)}
                    required/>
                    </td>
                  </tr>
                  <tr>
                    <td>Supervisor Name</td>
                    <td><input 
                    type="text" 
                    name="SupervisorName" 
                    value={supervisorName} 
                    onChange={e=>setSupervisorName(e.target.value)}
                    required/>
                    </td>
                  </tr>
                </table>
              {/* Leave Request*/}
              <h3>Reason For Leave</h3>
        <table>
          <tbody>
            <tr>
              <td><input 
              type="checkbox"
              name="vacation"
              checked={leaveType.vacation}
              className="leave-type" 
              onChange={handleLeaveTypeChange}
              /> Vacation</td>

              <td><input 
              type="checkbox" 
              name="LeaveOfAbsence"
              checked={leaveType.leaveOfAbsence}
              className="leave-type" 
              onChange={handleLeaveTypeChange}
              /> Leave of Absence</td>

              <td><input 
              type="checkbox" 
              name="SickFamily"
              checked={leaveType.sickFamily}
              className="leave-type" 
              onChange={handleLeaveTypeChange}
              /> Sick - Family</td>

            </tr>
            <tr>
              <td><input 
              type="checkbox"
              checked={leaveType.sickSelf}
              className="leave-type"
              onChange={handleLeaveTypeChange}
              /> Sick - Self</td>

              <td><input 
              type="checkbox" 
              checked={leaveType.drAppointment}
              className="leave-type"
              onChange={handleLeaveTypeChange}
              /> Dr. Appointment</td>

            </tr>
            <tr>
              <td>
                <input 
                type="checkbox" 
                checked={leaveType.sickFamily}
                className="leave-type"
                onChange={handleLeaveTypeChange}
                /> Sick for Family</td>

              <td><input 
              type="text" 
              name="sick-family-member"
              /></td>

            </tr>
            <tr>
              <td><input 
              type="checkbox" 
              checked={leaveType.funeral}
              className="leave-type"
              onChange={handleLeaveTypeChange}
              /> Funeral for</td>

              <td><input type="text" name="late-person"/></td>
            </tr>
            <tr>
              <td><input 
              type="checkbox" 
              checked={leaveType.other}
              className="leave-type"
              onChange={handleLeaveTypeChange}
              /> Other</td>
              <td><input type="text" name="Other"/></td>
            </tr>
          </tbody>
        </table>
        {/*leave Details*/}
        <h3>Leave Requested</h3>
        <table>
                <tbody>
                  <tr>
                    <td>Start Date:</td>
                    <td><input 
                      type="date" 
                      name="start_date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      required /></td>
                  </tr>
                  <tr>
                    <td>End Date:</td>
                    <td><input 
                      type="date" 
                      name="end_date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      required /></td>
                  </tr>
                  <tr>
                    <td>Total Days:</td>
                    <td><input 
                      type="number" 
                      name="total_days"
                      value={totalDays}
                      readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td>Resuming Work Day:</td>
                    <td><input 
                      type="date" 
                      name="resuming_work_day"
                      value={resumingWorkDay}
                      readOnly /></td>
                  </tr>
                </tbody>
              </table>
        {/**emergency contact */}
        <h3>Emergency Contact</h3>
        <table>
            <tr>
                <td>Name:</td>
                <td><input 
                type="text" 
                name="emergency_name"
                value={emergencyName}
                onChange={e => setEmergencyName(e.target.value)}
                required/></td>
            </tr>
            <tr>
                <td>Address:</td>
                <td><input 
                type="text" 
                name="emergency_address"
                value={emergencyAddress}
                onChange={e => setEmergencyAddress(e.target.value)}
                required/></td>
            </tr>
            <tr>
                <td>Phone Number:</td>
                <td><input 
                type="text" 
                name="emergency_phone"
                value={emergencyPhone}
                onChange={e=>setEmergencyPhone(e.target.value)}
                required/></td>
            </tr>
        </table>
        <div class="instructions">
            <h4>How to Submit Leave Permission</h4>
            <ol>
                <li>Employee has to submit leave application form at least 14 days prior to leave taken.</li>
                <li>Leave application must be verified by HR.</li>
                <li>Verified application will be taken to direct superior.</li>
                <li>The original application will be given back to HR. Employee will be given a copy.</li>
            </ol>
        </div>
        <button>Clear</button>
        <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
          </div>  
        </div>
    </div>
    </>
  )
}

export default LeaveRequest