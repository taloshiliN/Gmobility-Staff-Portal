import React, { useEffect, useState } from 'react';
import '../../styles/OvertimerequestPage.css'; // Assuming you use a CSS file for styles
import { useDispatch, useSelector } from 'react-redux';
import { createOvertimeRequest } from '../../overtimeSlice';
import HRheader from './HRheader';
import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';

function HROvertimerequestPage() {

  const [employeeName, setName] = useState("");
  const [date, setDate] = useState("")
  const [duration, setDuration] = useState("")
  const [reason, setReason] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const dispatch = useDispatch();

  const position = useSelector((state)=> state.auth.position)
  // State to handle form inputs
  // const [formData, setFormData] = useState({
  //   employeeName: '',
  //   date: '',
  //   hoursWorked: '',
  //   reason: '',
  // });

  // // Handle input changes
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form data:', formData);
  //   // Add form submission logic (e.g., API call)
  // };

  const calculateDuration = (start, end) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute);

    const diffInMs = endDate - startDate;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    return diffInHours > 0 ? diffInHours : 0;
  }

  useEffect(()=>{
    if (startTime && endTime) {
      const calculatedDuration = calculateDuration(startTime, endTime);
      setDuration(calculatedDuration.toFixed(2));
    }
  }, [startTime, endTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedStartTime = startTime.includes(':') ? `${startTime}:00` : startTime;
    const formattedEndTime = endTime.includes(':') ? `${endTime}:00` : endTime;

    if(
      employeeName &&
      date &&
      startTime &&
      endTime &&
      duration &&
      reason
    ) {
      dispatch(createOvertimeRequest({
        employeeName,
        date,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        duration,
        reason
      }))
    };

    setName("");
    setDate("");
    setStartTime();
    setEndTime();
    setDuration("");
    setReason("");
  }

  return (
    <>
    <HRheader />
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
            onChange={e=>setName(e.target.value)}
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
            onChange={e=>setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Overtime Start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">Overtime End Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            />
        </div>
        <div className="form-group">
          <label htmlFor="hoursWorked">Duration</label>
          <input
            type="number"
            id="hoursWorked"
            name="hoursWorked"
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
            onChange={e=>setReason(e.target.value)}
            required
          />
        </div>
        <button 
        type="submit" 
        className="submit-btn"
        onClick={handleSubmit}>
          Submit Request</button>
      </form>
    </div>
      </div>
    </>
  );
}

export default HROvertimerequestPage;
