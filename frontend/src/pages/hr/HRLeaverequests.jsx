import './style/index.css';
import HRheader from './HRheader.jsx';
import defaultimg from './assets/defaulticon.png';
import unseen from './assets/unseen.png';
import seen from './assets/seenstatus.png';
import { useEffect, useState } from 'react';

function HRLeaverequests() {
  const [data, setData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/leaverequests')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data); // Log the fetched data to inspect its structure
        setData(data);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const updateRequestStatus = (requestId, status, msgstatus) => {
    fetch(`http://localhost:3000/leaverequests/${requestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, msgstatus }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log('Status updated:', data);
    })
    .catch(err => console.error('Error updating status:', err));
  };

  const handleClick = (request) => {
    const updatedData = data.map(d =>
      d.id === request.id ? { ...d, msgstatus: 'seen' } : d
    );
    setData(updatedData);
    setSelectedRequest(request);
    updateRequestStatus(request.id, request.status, 'seen');
  };

  const handleApprove = (request) => {
    const updatedData = data.map(d =>
      d.id === request.id ? { ...d, status: 'Approved', msgstatus: 'seen' } : d
    );
    setData(updatedData);
    setSelectedRequest(request);
    updateRequestStatus(request.id, 'Approved', 'seen');
  };

  const handleReject = (request) => {
    const updatedData = data.map(d =>
      d.id === request.id ? { ...d, status: 'Rejected', msgstatus: 'seen' } : d
    );
    setData(updatedData);
    setSelectedRequest(request);
    updateRequestStatus(request.id, 'Rejected', 'seen');
  };

  return (
    <>
      <HRheader />
      <div className='requestcontainer'>
        <div className='hrleaverequests'>
          <div className='tablediv'>
            <table className='fromtable'>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="3">No employees found.</td>
                  </tr>
                ) : (
                  data.map((d, i) => (
                    <tr key={i} onClick={() => handleClick(d)}>
                      <td>
                        <img id="innerpropic" src={d.profile || defaultimg} alt="profile" />
                      </td>
                      <td>{d.sender}</td>
                      <td>
                        {d.msgstatus === 'unseen' && <img id="msgstatus" src={unseen} alt="unseen" />}
                        {d.msgstatus === 'seen' && <img id="msgstatus" src={seen} alt="seen" />}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className='requeststructure'>
            <h3>Leave Requests</h3>
            {selectedRequest ? (
              <table>
                <tbody>
                  <tr>
                    <td><p className='titl'>From:</p></td>
                    <td><p>{selectedRequest.sender}</p></td>
                    <td><p className='titl'>Start Date:</p></td>
                    <td><p>{selectedRequest.startDate || 'N/A'}</p></td>
                  </tr>
                  <tr>
                    <td><p className='titl'>Position:</p></td>
                    <td><p>{selectedRequest.position || 'N/A'}</p></td>
                    <td><p className='titl'>End Date:</p></td>
                    <td><p>{selectedRequest.endDate || 'N/A'}</p></td>
                  </tr>
                  <tr>
                    <td><p className='titl'>Total Days:</p></td>
                    <td><p>{selectedRequest.duration || 'N/A'}</p></td>
                    <td><p className='titl'>Status:</p></td>
                    <td><p>{selectedRequest.status || 'Pending'}</p></td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>Select a request to see the details.</p>
            )}
            {selectedRequest && (
              <div id='leavereason'>
                <div id='leavereasontext'>
                  <p>{selectedRequest.reason || 'N/A'}</p>
                </div>
              </div>
            )}
            {selectedRequest && selectedRequest.status === 'Pending' && (
              <>
                <button className='leavebuttons' id='but1' onClick={() => handleApprove(selectedRequest)}>Approve</button>
                <button className='leavebuttons' id='but2' onClick={() => handleReject(selectedRequest)}>Reject</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HRLeaverequests;