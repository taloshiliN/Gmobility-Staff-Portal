import React from 'react'
import SidebarNav from '../../components/sidebarNav'
import Header from '../../components/header'
import { useSelector } from 'react-redux'

function ClockinclockoutPage() {
  const position = useSelector((state)=> state.auth.position)

  return (
    <>
      <Header />
      <SidebarNav position={position}/>
        <div className="main-content">
          <div className="header">
            <h2>Clock in and clock out times</h2>
          </div>

    {/* Sidebar and Main Content */}
          <div className="content">
      {/* Sidebar */}
            <div className="sidebar">
              <ul>
                <li>Leave request</li>
                <li>Overtime request</li>
                <li>View Overtime</li>
                <li>Clock in and clock out times</li>
                <li>Printing request</li>
              </ul>
            </div>

      {/* Main Content */}
            <div className="main-content">
        {/* Calendar Table */}
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Clock In</th>
                    <th>Clock Out</th>
                  </tr>
                </thead>
            <tbody>
              <tr>
                <td>Day</td>
                <td>WeekDates</td>
                <td className="highlight">
                  clockin
                </td>
                <td className="highlight">
                  clockout
                </td>
              </tr>
            </tbody>
          </table>

        {/* Buttons */}
          <div className="buttons">
            {/* Clock In Button */}
            <button
              // onClick={handleClockIn}
              // disabled={isClockedIn}
              // style={isClockedIn ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              Clock In
            </button>

            {/* Clock Out Button */}
            <button
              // onClick={handleClockOut}
              // disabled={!isClockedIn || isClockedOut}
              // style={isClockedOut ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              Clock Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClockinclockoutPage