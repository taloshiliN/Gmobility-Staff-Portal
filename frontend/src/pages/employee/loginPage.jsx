import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../dataloginslice';
import '../../styles/login.css';
import glogo from '../../assets/glogo.png';
import '../../styles/MainPage.css';
import Loader from '../../components/loader';

function LoginPage() {
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, status } = useSelector((state) => state.auth);
  const position = useSelector((state) => state.auth.position);
  const employeeId = useSelector((state) => state.auth.data[0]?.id); // Assuming employee ID is in the auth data
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { firstname, password });
    dispatch(loginUser({
      firstname,
      password,
    }));
  };

  useEffect(() => {
    if (isAuthenticated && employeeId) {
      // Call clockInEmployee after successful login
      clockInEmployee(employeeId);
      
      // Fetch roles after login
      fetchRoles(employeeId);

      console.log("User Position:", position);
      if (position === 'Human Resource') {
        navigate('/hrhomepage');
      } else if (position === 'Employee') {
        navigate('/homePage');
      } else if (position === 'Admin') {
        navigate('/adminHomePage');
      }
      else if (position === 'Super Admin') {
        navigate('/superregister');
      }
    }
  }, [isAuthenticated, position, navigate, employeeId]);

  const clockInEmployee = async (id) => {
    // Create a new date object for today at 01:00:00
    const todayDate = new Date();
    const clockInDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate(),
      5, // Set hours to 05:00:00
      0, // Set minutes to 00
      0 // Set seconds to 00
    );

    const formattedDate = clockInDate.toISOString().split('.')[0].replace('T', ' '); // Format to 'YYYY-MM-DD HH:MM:SS'

    const clockinData = {
      date: formattedDate, // Today's date at 05:00:00
      employee_id: id,
    };

    console.log("Clock-in data to send:", clockinData); // Log the data being sent

    try {
      const response = await fetch('http://localhost:8080/clockinset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clockinData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Clock-in successful:', result);
    } catch (error) {
      console.error('Error during clock-in:', error);
    }
  };

// Fetch roles based on employee ID
const fetchRoles = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/roles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch roles');
    }

    const result = await response.json();
    console.log("Roles fetched:", result);

    // Save roles in Redux and create 'role' constant for direct access
    dispatch((result)); // Dispatch to Redux store

    // Set the constant 'role' to the roles object
    const userRoles = result[0]; // Assuming the first object is what you need
    console.log("Role object:", userRoles); // Log to ensure it's retrieved correctly

  } catch (error) {
    console.error("Error fetching roles:", error);
  }
};


  return (
    <>
      {status === 'loading' && <Loader />}
      <div className='logo-container'>
        <img src={glogo} alt="Gmobility Logo" className="logo" />
      </div>
      <div className='everything'>
        <div className='loginform'>
          <form className="form-container animated fadeInDown" onSubmit={handleSubmit}>
            <div className='heading-for-login-form'>
              <h1>Login to Staff Portal</h1>
            </div>
            <input
              className="form-input"
              type="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Firstname"
              required
            />
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            {error && <p style={{ color: 'red' }} className='error'>{error}</p>}
            <p>Forgot Password?</p>
            <button className="form-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
