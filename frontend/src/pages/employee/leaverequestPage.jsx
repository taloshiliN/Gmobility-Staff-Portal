import React from 'react'
import SidebarNav from '../../components/sidebarNav'
import Header from '../../components/header'
import '../../styles/leaverequest.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function LeaveRequest() {
  const position = useSelector((state)=> state.auth.position)

  const [employeeName, setEmployeeName] = useState("")
  const [date, setDate] = useState("")
  const [supervisorName, setSupervisorName] = useState("")
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [resumingWorkDay, setResumingWorkDay] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyAddress, setEmergencyAddress] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(
      employeeName &&
      date &&
      supervisorName &&
      leaveType &&
      startDate &&
      endDate &&
      totalDays &&
      resumingWorkDay &&
      emergencyName &&
      emergencyAddress &&
      emergencyPhone
    ) {
      console.log('Form submitted', {
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
      setEmployeeName("");
      setDate("");
      setSupervisorName("");
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setTotalDays("");
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
                    onChange={e=>setEmployeeName(e.target.value)}/>
                    
                    </td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td><input 
                    type="date" 
                    name="date" 
                    value={date} 
                    onChange={e=>setDate(e.target.value)}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Supervisor Name</td>
                    <td><input 
                    type="text" 
                    name="SupervisorName" 
                    value={supervisorName} 
                    onChange={e=>setSupervisorName(e.target.value)}/>
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
              className="leave-type" 
              /> Vacation</td>

              <td><input 
              type="checkbox" 
              className="leave-type" 
              /> Leave of Absence</td>

              <td><input 
              type="checkbox" 
              className="leave-type" 
              /> Sick - Family</td>

            </tr>
            <tr>
              <td><input type="checkbox" className="leave-type"/> Sick - Self</td>
              <td><input type="checkbox" className="leave-type"/> Dr. Appointment</td>
            </tr>
            <tr>
              <td><input type="checkbox" className="leave-type"/> Sick for Family</td>
              <td><input type="text" name="sick-family-member"/></td>
            </tr>
            <tr>
              <td><input type="checkbox" className="leave-type"/> Funeral for</td>
              <td><input type="text" name="late-person"/></td>
            </tr>
            <tr>
              <td><input type="checkbox" className="leave-type"/> Other</td>
              <td><input type="text" name="Other"/></td>
            </tr>
          </tbody>
        </table>
        {/*leave Details*/}
        <h3>Leave Requested</h3>
        <table>
            <tr>
                <td>Start Date:</td>
                <td><input type="date" name="start_date"/></td>
            </tr>
            <tr>
                <td>End Date:</td>
                <td><input type="date" name="end_date"/></td>
            </tr>
            <tr>
                <td>Total Days:</td>
                <td><input type="number" name="total_days"/></td>
            </tr>
            <tr>
                <td>Resuming Work Day:</td>
                <td><input type="date" name="resuming_work_day"/></td>
            </tr>
        </table>
        {/**emergency contact */}
        <h3>Emergency Contact</h3>
        <table>
            <tr>
                <td>Name:</td>
                <td><input type="text" name="emergency_name"/></td>
            </tr>
            <tr>
                <td>Address:</td>
                <td><input type="text" name="emergency_address"/></td>
            </tr>
            <tr>
                <td>Phone Number:</td>
                <td><input type="text" name="emergency_phone"/></td>
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
        <button type='submit'>Submit</button>
            </form>
          </div>  
        </div>
    </div>
    </>
  )
}

export default LeaveRequest