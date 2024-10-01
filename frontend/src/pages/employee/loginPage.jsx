import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../dataloginslice'
import '../../styles/login.css'
import glogo from '../../assets/glogo.png'

function LoginPage() {
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const position = useSelector((state) => state.auth.position);
  const error = useSelector((state)=> state.auth.error);
  // const isAuthenticated = auth?.isAuthenticated;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:",{firstname, password})
    dispatch(loginUser({
      firstname, 
      password
    }));
  };

  useEffect(() => {
    console.log("Authentication status updated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("User Position:", position);
      if(position === 'Human Resource'){
        navigate('/home');
      } else if (position === 'Employee') {
        navigate('/home');
      } else if (position === 'Admin'){
        navigate('/home');
      }
    }
  }, [isAuthenticated, position, navigate]);

  return (
    <>
        <div className='loginform'>
            <form className="form-container animated fadeInDown" onSubmit={handleSubmit}>
              <div className='heading-for-login-form'>
                <img src={glogo} alt="glogo" />
                <h1>Log in to G Mobility's Staff Portal</h1>
              </div>
            <input 
                className="form-input" 
                type="firstname" 
                value={firstname}
                onChange={(e)=>setFirstname(e.target.value)}
                placeholder="Firstname"
                required
            />
            <input 
                className="form-input" 
                type="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            {error && <p className='error'>{error}</p>}
            <p>Forgot Password?</p>
            <button className="form-button" type="submit">
              login
            </button>
        </form>
    </div>
    </>
  )
}

export default LoginPage