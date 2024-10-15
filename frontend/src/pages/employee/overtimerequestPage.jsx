import React, { useEffect, useState } from 'react';
import '../../styles/OvertimerequestPage.css';
import Header from '../../components/header';
import SidebarNav from '../../components/sidebarNav';
import { useDispatch, useSelector } from 'react-redux';
import { createOvertimeRequest } from '../../overtimeSlice';

function OvertimerequestPage() {
  const auth = useSelector((state) => state.auth);
  const userData = auth.data && auth.data[0];
  const username = userData?.Name || 'User';
  const position = auth.position || 'Employee';

  const [employeeName, setEmployeeName] = useState(username);
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [reason, setReason] = useState("");
  const [startTime] = useState("17:00");  // Fixed to 17:00
  const [endTime, setEndTime] = useState("18:00");  // Default to 18:00
  const dispatch = useDispatch();

  useEffect(() => {
    setEmployeeName(username);
  }, [username]);

  const calculateDuration = (start, end) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    let startDate = new Date(0, 0, 0, startHour, startMinute);
    let endDate = new Date(0, 0, 0, endHour, endMinute);

    // If end time is 00:00, set it to next day
    if (endHour === 0 && endMinute === 0) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const diffInMs = endDate - startDate;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    return diffInHours > 0 ? diffInHours : 0;
  };

  useEffect(() => {
    if (startTime && endTime) {
      const calculatedDuration = calculateDuration(startTime, endTime);
      setDuration(calculatedDuration.toFixed(2));
    }
  }, [startTime, endTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      employeeName &&
      date &&
      startTime &&
      endTime &&
      duration &&
      reason
    ) {
      dispatch(createOvertimeRequest({
        employeeName,
        position, // Include the position here
        date,
        startTime,
        endTime,
        duration,
        reason
      }));
    }

    // Reset form fields
    setDate("");
    setEndTime("18:00");
    setDuration("");
    setReason("");
  };

  

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 18; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(<option key={time} value={time}>{time}</option>);
      }
    }
    // Add 00:00 (midnight) option
    options.push(<option key="00:00" value="00:00">00:00</option>);
    return options;
  }

  return (
    <>
      <Header />
      <SidebarNav position={position} />
      <div className='main-content'>
        <div className="overtime-request-page">
          <h2>Overtime Request Form</h2>
          <form onSubmit={handleSubmit} className="overtime-form">
            <div className="form-group">
              <label htmlFor="employeeName">Employee Name</label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                value={employeeName}
                readOnly
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startTime">Overtime Start Time</label>
              <input
                type="text"
                id="startTime"
                name="startTime"
                value={startTime}
                readOnly
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endTime">Overtime End Time</label>
              <select
                id="endTime"
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              >
                {generateTimeOptions()}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration (hours)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={duration}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason for Overtime</label>
              <textarea
                id="reason"
                name="reason"
                value={reason}
                onChange={e => setReason(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="submit-btn">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  );

}
export default OvertimerequestPage;