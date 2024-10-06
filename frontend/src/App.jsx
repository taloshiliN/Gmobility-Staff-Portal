import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
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
import StaffRegistrationAdmin from "./pages/admin/staffRegistrationAdmin"
import ViewLeaveRequest from "./pages/admin/viewleaveRequest"
import ViewOvertimeRequests from "./pages/admin/viewovertimeRequests"
import ViewPrintingrequest from "./pages/admin/viewPrintingRequests"
import HRhome from "./pages/hr/HRhome"
import HREmployees from "./pages/hr/HREmployees"
import StaffProfiles from "./pages/admin/staffProfiles"
import ChangeStaffInfo from "./pages/admin/changeStaffInfo"
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
      {/* Login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />}/>
      
      {/* Protected Routes - Home Page */}
        <Route 
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
        />



        {/* Employee Portal*/}
        <Route path="/home" element={<HomePage />}/>
        {/* Protected Routes - Employee */}
        <Route 
        path="/leaverequest" 
        element={
        <ProtectedRoute>
          <LeaveRequest />
        </ProtectedRoute>
        }
        />
        <Route 
        path="/overtimerequest" 
        element={
        <ProtectedRoute>
          <OvertimerequestPage />
        </ProtectedRoute>
        }
        />
        <Route 
        path="/overtimeview" 
        element={
        <ProtectedRoute>
          <OvertimeviewPage />
        </ProtectedRoute>
        }
        />
        <Route 
        path="/passwordrequest" 
        element={
        <ProtectedRoute>
          <PasswordrequestPage />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/printingrequest" 
        element={
        <ProtectedRoute>
          <PrintingrequestPage />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/clockinclockout" 
        element={
        <ProtectedRoute>
          <ClockinclockoutPage />
        </ProtectedRoute>
        }
        />

        {/* Human Resource Portal */}
        {/* Protected Routes - human resource */}

        <Route 
        path="/hrhome" 
        element={
        <ProtectedRoute>
          <HRhome />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/hremployees" 
        element={
        <ProtectedRoute>
          <HREmployees />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/staffregistration" 
        element={
        <ProtectedRoute>
          <StaffRegistrationForm />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/hrleaverequest" 
        element={
        <ProtectedRoute>
          <HRLeaverequests />
        </ProtectedRoute>
        } 
        />

        <Route 
        path="/hrhome" 
        element={
        <ProtectedRoute>
          <HRheader />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/hrovertimerequests" 
        element={
        <ProtectedRoute>
          <HROvertimerequests />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/hrprofile" 
        element={
        <ProtectedRoute>
          <HRProfile />
        </ProtectedRoute>
        }
        />

        {/* Admin Portal*/}
        {/* Protected Routes - Employee */}
        <Route 
        path="/adminHomePage" 
        element={
        <ProtectedRoute>
          <AdminHomePage />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/staffRegistrationAdmin" 
        element={
        <ProtectedRoute>
          <StaffRegistrationAdmin />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/staffProfiles" 
        element={
        <ProtectedRoute>
        <StaffProfiles />
        </ProtectedRoute>
        }  />

        <Route 
        path="/changeStaffInfo" 
        element={
        <ProtectedRoute>
          <ChangeStaffInfo />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/viewleaveRequest" 
        element={
        <ProtectedRoute>
          <ViewLeaveRequest />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/viewovertimeRequests" 
        element={
        <ProtectedRoute>
          <ViewOvertimeRequests />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/viewPrintingRequests" 
        element={
        <ProtectedRoute>
          <ViewPrintingrequest />
        </ProtectedRoute>
        }
        />

        {/* Super Admin Portal*/}
        
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
