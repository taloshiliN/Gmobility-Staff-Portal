import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SidebarNav from '../../components/sidebarNav'
import Header from '../../components/header'
import { createPrintingRequest } from '../../printingSlice'
import '../../styles/printingrequest.css'

function PrintingrequestPage() {
  const auth = useSelector((state) => state.auth);
  const userData = auth.data && auth.data[0];
  const username = userData?.Name || 'User';
  const position = auth.position || 'Employee';
  const [from, setFrom] = useState('You');
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to && subject && message) {
      dispatch(createPrintingRequest({ from: username, to, subject, message }));
      setTo("");
      setSubject("");
      setMessage("");
    } else {
      alert("Please fill in all required fields");
    }
  }

  return (
    <>
      <Header />
      <SidebarNav position={position} />
      <div className='main-content'>
        <div className='head'>
          <form className='Printing_Request_Page' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="from">From:</label>
              <input
                type="text"
                id="from"
                name="from"
                value={from}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="to">To:</label>
              <select
                id="to"
                name="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              >
                <option value="">Select recipient</option>
                <option value="HR Department">Bra G</option>
                <option value="IT Department">Ms Maritgie</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <select
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option value="">Select subject</option>
                <option value="Progress Report">Progress Report</option>
                <option value="For Work">For Work</option>
                <option value="Outside Work(school)">Outside Work(school)</option>
                <option value="Doctors Note">Doctors Note</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                className="message-box"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="button-container">
              <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="request-button">
                Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default PrintingrequestPage