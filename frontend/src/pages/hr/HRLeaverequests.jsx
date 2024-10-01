import './style/index.css'
import HRheader from './HRheader.jsx'
import defaultimg from './assets/defaulticon.png'

function HRLeaverequests(){
    return(
      <>
      <HRheader/>
      <div className='requestcontainer'>
      <div className='hrleaverequests'>
        <div className='tablediv'>
       <table className='fromtable'>
          <tr><img src={defaultimg}></img><p> Anthony</p></tr>
          <tr><img src={defaultimg}></img><p> William</p></tr>
          <tr><img src={defaultimg}></img><p> James</p></tr>
          <tr><img src={defaultimg}></img><p> Adolf</p></tr>
          <tr><img src={defaultimg}></img><p> Robert</p></tr>
          <tr><img src={defaultimg}></img><p> Martha</p></tr>
          <tr><img src={defaultimg}></img><p> Sunny</p></tr>
          <tr><img src={defaultimg}></img><p> Tom</p></tr>
          <tr><img src={defaultimg}></img><p> Jerry</p></tr>
        </table>
        </div>
        <div className='requeststructure'>
        <h3>Leave Requests</h3>
            <table>
          <tr>
            <td><p className='titl'>From:</p></td>
            <td><p>Petrus Oshili</p></td>
            <td><p className='titl'>Start Date:</p></td>
            <td><p>23 September 2024</p></td>
            </tr>
          <tr>
            <td><p className='titl'>Position:</p></td>
            <td><p>Software Intern</p></td>
            
          <td><p className='titl'>End Date:</p></td>
          <td><p>25 September 2024</p></td>
           
            </tr>
        
          <tr>
          <td><p className='titl'>Total Days:</p></td>
          <td><p>3 Days</p></td>
          </tr>
          </table>
          <div id='leavereason'>
            <div id='leavereasontext'>
            <p>A dog fell from the sky, hit me on the head and caused my cat Benard to run awway. WBenard then 
                proceeded to run into the street away from the dog so i chased him so he doesnt get
                bumped but upon doing so a taxi bumped me now im hospitalized.</p>
                </div>
          </div>
          <button className='leavebuttons' id='but1'>Approve</button>
          <button className='leavebuttons' id='but2'>Reject</button>
      </div>
      </div>
     
      </div>
      </>
    );
}
export default HRLeaverequests