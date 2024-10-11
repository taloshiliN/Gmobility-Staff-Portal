import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../dataloginslice'
import '../../styles/login.css'
import glogo from '../../assets/glogo.png'
import '../../styles/MainPage.css'
import Loader from '../../components/loader'

function LoginPage() {
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, status } = useSelector((state) => state.auth);
  const position = useSelector((state) => state.auth.position);
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
    console.log("Authentication status updated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("User Position:", position);
      if(position === 'Human Resource'){
        navigate('/hrhome');
      } else if (position === 'Employee') {
        navigate('/home');
      } else if (position === 'Admin'){
        navigate('/adminHomePage');
      }
    }
  }, [isAuthenticated, position, navigate]);

  return (
    <>
    {status === 'loading' && <Loader />}
       <div className='logo-container'>
        <img src={glogo} alt="Gmobility Logo" className="logo" /> {/* Add logo here */}
        </div>
        <div className='everything'>
        <div className='loginform'>
            <form className="form-container animated fadeInDown" onSubmit={handleSubmit}>
              <div className='heading-for-login-form'>
                <h1>Login to Staff Portal</h1>
              </div>
            <input 
                className="form-inpu
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
            {error && <p style={{color: 'red' }} className='error'>{error}</p>}
            <p>Forgot Password?</p>
            <button className="form-button" type="submit">
              Login
            </button>
        </form>
    </div>
    </div>
//       <div className='loginform'>
//         <form className="form-container animated fadeInDown" onSubmit={handleSubmit}>
//           <div className='heading-for-login-form'>
//             <img src={glogo} alt="glogo" />
//             <h1>Log in to G Mobility's Staff Portal</h1>
//           </div>
//           <input
//             className="form-input"
//             type="firstname"
//             value={firstname}
//             onChange={(e) => setFirstname(e.target.value)}
//             placeholder="Firstname"
//             required
//           />
//           <input
//             className="form-input"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//           />
//           {error && <p className='error'>{error}</p>}
//           <p>Forgot Password?</p>
//           <button className="form-button" type="submit">
//             Login
//           </button>
//         </form>
//       </div>
    </>
  );
}

export default LoginPage;
