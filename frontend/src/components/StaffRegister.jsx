import Header from './header';
import SidebarNav from './sidebarNav';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function StaffRegistrationForm() {
  const uposition = useSelector((state) => state.auth.position);
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [ID_Number, setIdNumber] = useState("");
  const [Gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [Supervisor, setSupervisor] = useState("");
  const [Nationality, setNationality] = useState("");
  const [Home_Language, setHomeLanguage] = useState("");
  const [Other_Languages, setOtherLanguages] = useState("");
  const [Position, setPosition] = useState("");
  const [profileImg, setProfileImage] = useState(null);
  const [password, setPassword] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file); // Log file details
    setProfileImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDOB = DOB.split('T')[0];

    if (
      Name &&
      Surname &&
      ID_Number.trim() !== "" &&
      formattedDOB &&
      Supervisor &&
      Gender &&
      Nationality &&
      Home_Language &&
      Other_Languages &&
      Position &&
      profileImg &&
      password
    ) {
      const formData = new FormData();
      formData.append('Name', Name);
      formData.append('Surname', Surname);
      formData.append('ID_Number', ID_Number);
      formData.append('DOB', formattedDOB);
      formData.append('Supervisor', Supervisor);
      formData.append('Gender', Gender);
      formData.append('Nationality', Nationality);
      formData.append('Home_Language', Home_Language);
      formData.append('Other_Languages', Other_Languages);
      formData.append('Position', Position);
      formData.append('profileImg', profileImg); // Append image file
      formData.append('password', password);

      fetch('http://localhost:8080/api/data', {
        method: 'POST',
        body: formData, // Send the form data with image as multipart/form-data
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((response) => {
          console.log('Success:', response);
          // Reset form fields after successful submission
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
          setProfileImage(null);
          setPassword("");
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('There was a problem submitting the form. Please try again.');
        });
    } else {
      alert("Please fill in all required fields!");
    }
  };

  return (
    <>
      <Header />
      <SidebarNav position={uposition} />
      <div className='main-content'>
        <div className="overtime-view-page">
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <h2>Register a staff member</h2>

            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder='Name'
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Surname">Surname</label>
              <input
                type="text"
                id="Surname"
                name="Surname"
                placeholder='Surname'
                value={Surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ID_Number">ID Number</label>
              <input
                type="text"
                id="ID_Number"
                name="ID_Number"
                placeholder='ID Number'
                value={ID_Number}
                onChange={(e) => setIdNumber(e.target.value)}
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
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="DOB">Date of Birth</label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
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
                onChange={(e) => setSupervisor(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Nationality">Nationality</label>
              <input
                type="text"
                id="Nationality"
                name="Nationality"
                placeholder='Nationality'
                value={Nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Home_Language">Home Language</label>
              <input
                type="text"
                id="Home_Language"
                name="Home_Language"
                placeholder='Home Language'
                value={Home_Language}
                onChange={(e) => setHomeLanguage(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Other_Languages">Other Languages</label>
              <input
                type="text"
                id="Other_Languages"
                name="Other_Languages"
                placeholder='Other Languages'
                value={Other_Languages}
                onChange={(e) => setOtherLanguages(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Position">Position</label>
              <select
                id="Position"
                name="Position"
                value={Position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="Employee">Employee</option>
                <option value="Human Resource">Human Resource</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="profileImg">Profile Picture</label>
              <input
                type="file"
                id="profileImg"
                name="profileImg"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default StaffRegistrationForm;
