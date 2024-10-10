import '../../pages/hr/style/index.css'
import profile2 from '../hr/assets/profile2.png'
import MessagingFloat from '../hr/MessageFloat.jsx'
import HRheader from '../hr/HRheader.jsx';

function HomePage(){
    return(
        <>
        <HRheader/>
        <div className="homecontent">
           <h4 className='greeting'>Welcome Timothy Haimbodi</h4>
           <div className='innerhomecontent'>
           <div className='innercontent1'>
               <h4>Profile</h4>
               <img src={profile2} alt='Profile Image'></img>
               <table className='detailtable'>
                <tr>
                    <td className='hrdetails'>Name: </td>
                    <td>Antony Lingus</td>
                </tr>
                <tr>
                    <td className='hrdetails'>Surname: </td>
                    <td> Codriano</td>
                </tr>
                <tr>
                    <td className='hrdetails'>ID Number: </td>
                    <td>123456789</td>
                </tr>
                <tr>
                    <td className='hrdetails'>Date of Birth: </td>
                    <td>Yesterday</td>
                </tr>
                <tr>
                    <td className='hrdetails'>Gender: </td>
                    <td> Male</td>
                </tr>
                <tr>
                    <td className='hrdetails'>Nationality: </td>
                    <td> Namibian</td>
                </tr>
                <tr>
                    <td className='hrdetails'>Language: </td>
                    <td> Damara</td>
                </tr>
                <tr>
                    <td className='hrdetails'>Position: </td>
                    <td> Human Resources</td>
                </tr>
               
               </table>
           </div>
           <div>
           <div className='clockingsection'>
            <hr></hr>
            <div className='clockingtimes'>
            <p>Current time: <h5>10:31</h5></p>
            <p>Time clocked-In: <h5>07:45</h5></p>
            <p>Time-clocked-out:  <h5>None</h5></p>
            </div>
                <button className='clockinbutton'>Clock-In</button>
                <button className='clockoutbutton'>Clock-Out</button>
                <hr></hr>
           </div>
           <MessagingFloat/>
           </div>
          </div>
        </div>
        </>
    );
}
export default HomePage