import React from 'react'
import SidebarNav from '../../components/sidebarNav'
import Header from '../../components/header'
import '../../styles/printingrequest.css'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPrintingRequest } from '../../printingSlice'
import { useState } from 'react'
function PrintingrequestPage() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const position = useSelector((state)=> state.auth.position)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(
      from &&
      to &&
      subject &&
      message
    ) {
      dispatch(
        createPrintingRequest({
          from,
          to,
          subject,
          message,
        })
      );
      setFrom("")
      setTo("")
      setSubject("")
      setMessage("")
    } else {
      alert("please fill in all required fields")
    }
  }


  return (
    <>
      <Header />
      <SidebarNav position={position}/>
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
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="to">To:</label>
              <input
                type="text"
                id="to"
                name="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
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