import './style/index.css'
import profile from './assets/defaulticon.png'
import image1 from './assets/person3.png'
import image2 from './assets/time.png'
import image3 from './assets/person.png'
import image4 from './assets/person2.png'
import glogo from './assets/glogo.png'
import arrow from './assets/arrow.png'

function HRheader() {
  return (
    <>
      <div className="hrheader w-100 p-3">
        <img src={glogo}></img><p> Staff Portal</p>
      </div>
      <div className='hrsidebar'>
        <img className='profileimg' src={profile} alt="Profile" />
        <p className='usersname'>Hafeni Neliwa</p>
        <img className='arrow' src={arrow}></img>
        <ul>
          <li onClick={event =>  window.location.href='./hrleaverequests'}>
            <img className='icons' src={image1} alt="Leave Requests" /> Leave Requests
            </li>

          <li onClick={event =>  window.location.href='./hrovertimerequests'}>
            <img className='icons' src={image2} alt="Work Hours" /> Overtime Requests
            </li>

          <li onClick={event =>  window.location.href='./hremployees'}>
            <img className='icons' src={image3} alt="Attendance" /> Staff
          </li>

          <li onClick={event =>  window.location.href='./hrhome'}>
            <img className='icons' src={image4} alt="Edit Profile" /> Edit Profile
            </li>
        </ul>
        <button className='hrlogout'>Logout</button>
      </div>
    </>
  );
}

export default HRheader;
