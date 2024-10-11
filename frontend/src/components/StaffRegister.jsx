import Header from './header';
import SidebarNav from './sidebarNav';
import React from 'react'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {createData} from "../dataSlice";


function StaffRegistrationForm() {
  const uposition = useSelector((state)=> state.auth.position)

  const [firstname, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [id_Number, setIdNumber] = useState("")
  const [Gender, setGender] = useState("")
  const [DOB, setDOB] = useState("")
  const [Supervisor, setSupervisor] = useState("")
  const [nationality, setNationality] = useState("")
  const [homeLanguage, setHomeLanguage] = useState("")
  const [otherLanguages, setOtherLanguages] = useState("")
  const [position, setPosition] = useState("")
  const [profilepicture, setProfilePicture] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  
  // const {loading, error, isAuthenticated} = useSelector((state)=>state.auth)
  // const name = method === "register" ? "Register":"User";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstname && 
      surname && 
      id_Number.trim() !== "" && 
      DOB && 
      Supervisor &&
      Gender &&
      nationality && 
      homeLanguage && 
      otherLanguages && 
      position && 
      password
    ) {
      dispatch(createData({
        firstname, 
        surname, 
        id_Number, 
        DOB, 
        Supervisor,
        Gender,
        nationality, 
        homeLanguage, 
        otherLanguages, 
        position, 
        profilepicture,
        password
      }));

      setName("");
      setSurname("");
      setIdNumber("");
      setDOB("");
      setSupervisor("");
      setGender("");
      setNationality("");
      setHomeLanguage("");
      setOtherLanguages("");
      setPosition("");
      setProfilePicture("");
      setPassword("");
    } else {
      alert("Please fill in all required fields!"); // Add an alert or error message
    }
  }

  // if (isAuthenticated){
  //   navigate('')
  // }
  return (
    <>
     <Header />
     <SidebarNav position={uposition}/>
        <div className='main-content'>
        <div className="overtime-view-page">
        <form onSubmit={handleSubmit}>
         <h2>Register a staff member</h2>
         <div className="form-group">
           <label htmlFor="name">Name</label>
           <input 
            type="text" 
            id="firstname" 
            name="firstname" 
            placeholder='Firstname'
            value={firstname}
            onChange={e=>setName(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input 
            type="text" 
            id="surname" 
            name="surname" 
            placeholder='Surname'
            value={surname}
            onChange={e=>setSurname(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="idNumber">ID Number</label>
          <input 
            type="text" 
            id="idNumber" 
            name="idNumber"
            placeholder='ID number'
            value={id_Number}
            onChange={e=>setIdNumber(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="Gender">Gender</label>
          <input 
            type="text" 
            id="Gender" 
            name="Gender"
            placeholder='Gender'
            value={Gender}
            onChange={e=>setGender(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input 
            type="date" 
            id="dateOfBirth" 
            name="dateOfBirth"
            placeholder='DOB'
            value={DOB}
            onChange={e=>setDOB(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input 
            type="text" 
            id="nationality" 
            name="nationality" 
            placeholder='Nationality'
            value={nationality}
            onChange={e=>setNationality(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="Supervisor">Supervisor</label>
          <input 
            type="text" 
            id="Supervisor" 
            name="Supervisor" 
            placeholder='Supervisor'
            value={Supervisor}
            onChange={e=>setSupervisor(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="homeLanguage">Home Language</label>
          <input 
            type="text" 
            id="homeLanguage" 
            name="homeLanguage"  
            placeholder='Home Language'
            value={homeLanguage}
            onChange={e=>setHomeLanguage(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="otherLanguages">Other Languages</label>
          <input 
            type="text" 
            id="otherLanguages" 
            name="otherLanguages"
            placeholder='Other Languages'
            value={otherLanguages}
            onChange={e=>setOtherLanguages(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Position</label>
          <select
            type="text" 
            id="position" 
            name="position"
            placeholder='Position'
            value={position} 
            onChange={e=>setPosition(e.target.value)}
            required 
          > 
            <option value=" ">Select an option</option>
            <option value="Employee">Employee</option>
            <option value="Human Resource">Human Resource</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="profilepicture">Profile Picture </label>
          <input 
            type="file" 
            id="profilepicture" 
            name="otherLprofilepictureanguages"
            placeholder='Image.png'
            value={profilepicture}
            onChange={e=>setProfilePicture(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder='Password'
            value={password} 
            onChange={e=>setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">
          submit
        </button>
      </form>
        </div>
    </div>
    </>
  )
}

export default StaffRegistrationForm;