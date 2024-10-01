import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import {Provider} from 'react-redux'
import { store } from "./store"
import LoginPage from "./pages/employee/loginPage"
import HomePage from "./pages/employee/homePage"
import LeaveRequest from "./pages/employee/leaverequestPage"
import OvertimeviewPage from "./pages/employee/overtimeviewPage"
import './styles/standard.css'
import OvertimerequestPage from "./pages/employee/overtimerequestPage"
import PasswordrequestPage from "./pages/employee/passwordrequestPage"
import PrintingrequestPage from "./pages/employee/printingrequestPage"
import ClockinclockoutPage from "./pages/employee/clockinclockoutPage"
import StaffRegistrationForm from "./components/StaffRegister"
import HRLeaverequests from "./pages/hr/HRLeaverequests"
import HRheader from "./pages/hr/HRheader"
import HROvertimerequests from "./pages/hr/HROvertimerequests"
import HRProfile from "./pages/hr/HRProfile"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminHomePage from "./pages/admin/adminHomePage"
import StaffRegistration from "./pages/admin/staffRegistration"
import ViewLeaveRequest from "./pages/admin/viewleaveRequest"
import ViewOvertimeRequests from "./pages/admin/viewovertimeRequests"
import ViewPrintingrequest from "./pages/admin/viewPrintingRequests"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Admindashboard from "./pages/AdminDashBoard"
function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route 
        path="/"
        element={
          <ProtectedRoute>
            
          </ProtectedRoute>
        }
        />

        {/* Login */}
        <Route path="/login" element={<LoginPage />}/>


        {/* Employee Portal*/}
        <Route path="/home" element={<HomePage />}/>
        <Route path="/leaverequest" element={<LeaveRequest />}/>
        <Route path="/overtimerequest" element={<OvertimerequestPage />}/>
        <Route path="/overtimeview" element={<OvertimeviewPage />}/>
        <Route path="/passwordrequest" element={<PasswordrequestPage />}/>
        <Route path="/printingrequest" element={<PrintingrequestPage />}/>
        <Route path="/clockinclockout" element={<ClockinclockoutPage />}/>

        {/* Human Resource Portal */}
        <Route path="/staffregistration" element={<StaffRegistrationForm />}/>
        <Route path="/hrleaverequest" element={<HRLeaverequests />} />
        <Route path="/hrhome" element={<HRheader />}/>
        <Route path="/hrovertimerequests" element={<HROvertimerequests />}/>
        <Route path="/hrprofile" element={<HRProfile />}/>

        {/* Admin Portal*/}
        <Route path="/adminhomepage" element={<AdminHomePage />}/>
        <Route path="/staffregistrationadmin" element={<StaffRegistration />}/>
        <Route path="/leaverequestview" element={<ViewLeaveRequest />}/>
        <Route path="/overtimerequestview" element={<ViewOvertimeRequests />}/>
        <Route path="/printingrequestview" element={<ViewPrintingrequest />}/>

        {/* Super Admin Portal*/}
        
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Provider } from 'react-redux';
// import { store } from "./store";
// import LoginPage from "./pages/employee/loginPage";
// import HomePage from "./pages/employee/homePage";
// import LeaveRequest from "./pages/employee/leaverequestPage";
// import OvertimeviewPage from "./pages/employee/overtimeviewPage";
// import './styles/standard.css';
// import OvertimerequestPage from "./pages/employee/overtimerequestPage";
// import PasswordrequestPage from "./pages/employee/passwordrequestPage";
// import PrintingrequestPage from "./pages/employee/printingrequestPage";
// import ClockinclockoutPage from "./pages/employee/clockinclockoutPage";
// import StaffRegistrationForm from "./components/StaffRegister";
// import HRLeaverequests from "./pages/hr/HRLeaverequests";
// import HRheader from "./pages/hr/HRheader";
// import HROvertimerequests from "./pages/hr/HROvertimerequests";
// import HRProfile from "./pages/hr/HRProfile";
// import ProtectedRoute from "./components/ProtectedRoute";

// function Logout() {
//   localStorage.clear();
//   return <Navigate to="/login" />;
// }

// function App() {

//   // Assuming you store user authentication status in local storage or redux
//   const isAuthenticated = localStorage.getItem("isAuthenticated"); // You can modify this based on your auth logic

//   return (
//     <>
//       <Provider store={store}>
//         <BrowserRouter>
//           <Routes>
//             {/* If the user is authenticated, redirect them to the homepage, otherwise, redirect to the login page */}
//             <Route
//               path="/"
//               element={
//                 isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
//               }
//             />
            
//             {/* Login route */}
//             <Route path="/login" element={<LoginPage />} />

//             {/* Authenticated routes */}
//             <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
//             <Route path="/leaverequest" element={<ProtectedRoute><LeaveRequest /></ProtectedRoute>} />
//             <Route path="/overtimerequest" element={<ProtectedRoute><OvertimerequestPage /></ProtectedRoute>} />
//             <Route path="/overtimeview" element={<ProtectedRoute><OvertimeviewPage /></ProtectedRoute>} />
//             <Route path="/passwordrequest" element={<ProtectedRoute><PasswordrequestPage /></ProtectedRoute>} />
//             <Route path="/printingrequest" element={<ProtectedRoute><PrintingrequestPage /></ProtectedRoute>} />
//             <Route path="/clockinclockout" element={<ProtectedRoute><ClockinclockoutPage /></ProtectedRoute>} />
//             <Route path="/staffregistration" element={<ProtectedRoute><StaffRegistrationForm /></ProtectedRoute>} />
//             <Route path="/hrleaverequest" element={<ProtectedRoute><HRLeaverequests /></ProtectedRoute>} />
//             <Route path="/hrhome" element={<ProtectedRoute><HRheader /></ProtectedRoute>} />
//             <Route path="/hrovertimerequests" element={<ProtectedRoute><HROvertimerequests /></ProtectedRoute>} />
//             <Route path="/hrprofile" element={<ProtectedRoute><HRProfile /></ProtectedRoute>} />

//             {/* Logout route */}
//             <Route path="/logout" element={<Logout />} />
//           </Routes>
//         </BrowserRouter>
//       </Provider>
//     </>
//   );
// }

// export default App;
