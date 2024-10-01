import HRheader from './HRheader.jsx'
import './style/index.css'
import search from './assets/searchicon.png'
import propic2 from './assets/defaultpropic.png'

function HRProfile(){
    return(
        <>
        <HRheader/>
        <div className='viewemployees'>
            <div className='employeesearch'>
               <img className='searchicon' src={search}></img>
               <input type="text" placeholder='Search'></input>
            </div>
            <div className='employeecontents'>
           <table className='employeestable'>
            <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Position</th>
            <th>Clock-In Time</th>
            <th>Clock-Out Time</th>
            </tr>
            <tr>
                <td>Anothony</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Anothony</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Anothony</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Anothony</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Edward</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Edward</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Edward</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Edward</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Edward</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Edward</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Edward</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Edward</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Edward</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
            <tr>
                <td>Edward</td>
                <td>Shikonjo</td>
                <td>Software Intern</td>
                <td>07:46</td>
                <td>None</td>                
            </tr>
           </table>
           <div className='chosenemployee'>
            <img className='chosenimage'src={propic2} alt='Loading...'></img>
            <table>
            <tr>
                    <td className='chosendetails'>Name: </td>
                    <td>-----</td>
                </tr>
                <tr>
                    <td className='chosendetails'>Surname: </td>
                    <td> -----</td>
                </tr>
                <tr>
                    <td className='chosendetails'>ID Number: </td>
                    <td>-----</td>
                </tr>
                <tr>
                    <td className='chosendetails'>Date of Birth: </td>
                    <td>-----</td>
                </tr>
                <tr>
                    <td className='chosendetails'>Gender: </td>
                    <td> -----</td>
                </tr>
                <tr>
                    <td className='chosendetails'>Nationality: </td>
                    <td> -----</td>
                </tr>
                <tr>
                    <td className='chosendetails'>Language: </td>
                    <td> -----</td>
                </tr>
                <tr>
                    <td className='chosendetails'>Position: </td>
                    <td> -----</td>
                </tr>
               
               </table>
           </div>
           </div>
        </div>
        </>
    );
}
export default HRProfile