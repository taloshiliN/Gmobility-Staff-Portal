import HRheader from './HRheader.jsx'
import './style/HRstyle.css'
import defaultimg from './assets/defaulticon.png'

function HROvertimerequests(){
    return(
        <>
        <HRheader/>
        <div className='overtimediv'>
           <div className='fromtablecontainer'>
           <table className='fromtable'>
             <tr><img src={defaultimg}></img><p>  Anthony</p></tr>
             <tr><img src={defaultimg}></img><p> Steven</p></tr>
             <tr><img src={defaultimg}></img><p> Michael</p></tr>
             <tr><img src={defaultimg}></img><p> Jackson</p></tr>
             <tr><img src={defaultimg}></img><p> Crimson</p></tr>
           </table>
           </div>
        <div className='overtimecontent'>
            <h4>Overtime Requests</h4>
            <table>
             <tr>
             <td><p className='titl'>From: </p></td>
             <td><p>Geps Fillipi</p></td>

                </tr> 

             <tr>
             <td><p className='titl'>Position: </p></td>
             <td><p>Software Intern</p></td>

                </tr> 

             <tr>
             <td><p className='titl'>Start date: </p></td>
             <td><p>29 September 2024</p></td>

                </tr> 

             <tr>
             <td><p className='titl'>End date: </p></td>
             <td><p>04 October 2024</p></td>

                </tr> 

             <tr>
             <td><p className='titl'>Timeframe: </p></td>
             <td><p>17:00 - 19:00</p></td>

                </tr> 
             </table>
             <p id='status'>Status:  Pending</p>
             <button className='overtimeapprove'>Approve</button>
             <button className='overtimereject'>Reject</button>

        </div>
        </div>
        </>
    );
}
export default HROvertimerequests