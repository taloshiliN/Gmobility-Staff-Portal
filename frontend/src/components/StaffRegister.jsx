import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createData } from "../dataSlice";
import Header from './header';
import SidebarNav from './sidebarNav';

function StaffRegistrationForm() {
  const userposition = useSelector((state) => state.auth.position);
  const [firstname, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [id_Number, setIdNumber] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [nationality, setNationality] = useState("");
  const [homeLanguage, setHomeLanguage] = useState("");
  const [otherLanguages, setOtherLanguages] = useState("");
  const [position, setPosition] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstname, 
      surname, 
      id_Number, 
      gender,
      DOB, 
      nationality, 
      homeLanguage, 
      otherLanguages, 
      position, 
      supervisor,
      password
    });

    if (
      firstname && 
      surname && 
      id_Number.trim() !== "" && 
      gender &&
      DOB && 
      nationality && 
      homeLanguage && 
      otherLanguages && 
      position && 
      supervisor &&
      password
    ) {
      dispatch(createData({
        firstname, 
        surname, 
        id_Number, 
        gender,
        DOB, 
        nationality, 
        homeLanguage, 
        otherLanguages, 
        position, 
        supervisor,
        password
      }));

      // Reset form fields
      setName("");
      setSurname("");
      setIdNumber("");
      setGender("");
      setDOB("");
      setSupervisor("");
      setNationality("");
      setHomeLanguage("");
      setOtherLanguages("");
      setPosition("");
      setPassword("");
    } else {
      alert("Please fill in all required fields!");
    }
  };

  return (
    <>
      <Header />
      <SidebarNav position={userposition} />
      <div className='main-content'>
        <div className="overtime-view-page">
          <form onSubmit={handleSubmit}>
            <h2>Register a staff member</h2>
            <div className="form-group">
              <label htmlFor="firstname">Name</label>
              <input 
                type="text" 
                id="firstname" 
                placeholder='Firstname'
                value={firstname}
                onChange={e => setName(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input 
                type="text" 
                id="surname" 
                placeholder='Surname'
                value={surname}
                onChange={e => setSurname(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="idNumber">ID Number</label>
              <input 
                type="text" 
                id="idNumber" 
                placeholder='ID number'
                value={id_Number}
                onChange={e => setIdNumber(e.target.value)}
                required 
              />
            </div>

            <div className='form-group'>
              <label htmlFor="gender">Gender</label>
              <select
                id='gender'
                value={gender}
                onChange={e => setGender(e.target.value)}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input 
                type="date" 
                id="dateOfBirth" 
                value={DOB}
                onChange={e => setDOB(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="nationality">Nationality</label>
              <input 
                type="text" 
                id="nationality" 
                placeholder='Nationality'
                value={nationality}
                onChange={e => setNationality(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="homeLanguage">Home Language</label>
              <input 
                type="text" 
                id="homeLanguage"  
                placeholder='Home Language'
                value={homeLanguage}
                onChange={e => setHomeLanguage(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="otherLanguages">Other Languages</label>
              <input 
                type="text" 
                id="otherLanguages" 
                placeholder='Other Languages'
                value={otherLanguages}
                onChange={e => setOtherLanguages(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position</label>
              <select
                id="position" 
                value={position} 
                onChange={e => setPosition(e.target.value)}
                required 
              >
                <option value="" disabled>Select</option>
                <option value="Employee">Employee</option>
                <option value="Human Resource">Human Resource</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor="supervisor">Supervisor</label>
              <input 
                type="text" 
                id='supervisor'
                placeholder='Supervisor'
                value={supervisor}
                onChange={e => setSupervisor(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder='Password'
                value={password} 
                onChange={e => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default StaffRegistrationForm;
