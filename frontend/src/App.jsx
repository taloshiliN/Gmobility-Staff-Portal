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
import HROvertimerequests from "./pages/hr/HROvertimerequests"
import HRrequestovertime from './pages/hr/HRrequestovertime'
import ProtectedRoute from "./components/ProtectedRoute"
import AdminHomePage from "./pages/admin/adminHomePage"
import StaffRegistrationAdmin from "./pages/admin/staffRegistrationAdmin"
import ViewLeaveRequest from "./pages/admin/viewleaveRequest"
import ViewOvertimeRequests from "./pages/admin/viewovertimeRequests"
import ViewPrintingrequest from "./pages/admin/viewPrintingRequests"
import HRhome from "./pages/hr/HRhome"
import HREmployees from "./pages/hr/HREmployees"
import HRPayroll from "./pages/hr/HRPayroll"
import HRrequestleave from "./pages/hr/HRrequestleave"
import HRrequestovertime from "./pages/hr/HRrequestovertime"
import HRViewStaffProfiles from "./pages/hr/HRViewStaff"
import EditStaffInfo from "./pages/hr/editStaffInfo"
import MAINPAGE from "./components/MainPage"
import StaffProfiles from "./pages/admin/staffProfiles"
import ChangeStaffInfo from "./pages/admin/changeStaffInfo"
// import HRPayroll from "./pages/hr/HRPayroll"
import HRrequestleave from "./pages/hr/HRrequestleave"
import HRChosenemployee from "./pages/hr/HRChosenemployee"
import HRRequests from "./pages/hr/HRRequests"

// import 'bootstrap/dist/css/bootstrap.min.css';
// import Admindashboard from "./pages/AdminDashBoard"
function Logout(){
  localStorage.clear()
  return <Navigate to="/MainPage" />
}

function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
      {/* Login */}
      <Route path="/" element={<MAINPAGE />} />
      <Route path="/loginPage" element={<LoginPage />}/>

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
        path="/staffregistration" 
        element={
        <ProtectedRoute>
          <StaffRegistrationForm />
        </ProtectedRoute>
        }
        />

     

        <Route 
        path="/hrrequests" 
        element={
        <ProtectedRoute>
          <HRRequests />
        </ProtectedRoute>
        } 
        />

        
        <Route 
        path="/HRViewStaff" 
        element={
        <ProtectedRoute>
          <HRViewStaffProfiles />
        </ProtectedRoute>
        }
        />

       <Route 
        path="/editStaffInfo" 
        element={
        <ProtectedRoute>
          <EditStaffInfo />
        </ProtectedRoute>
        }
        />


        <Route 
        path="/hrleaverequests" 
//         path="/hrpayroll" 
        element={
        <ProtectedRoute>
          <HRPayroll />
        </ProtectedRoute>
        } 
        />

    <Route 
        path="/hrpayroll" 
        element={
        <ProtectedRoute>
          <HRPayroll />
        </ProtectedRoute>
        } 
        />

          <Route 
        path="/hrrequestleave" 
        element={
        <ProtectedRoute>
          <HRrequestleave />
        </ProtectedRoute>
        } 


        <Route 
        path="/HROvertimerequests" 
//         path="/hrrequestovertime" 
        element={
        <ProtectedRoute>
          <HRrequestovertime />
        </ProtectedRoute>
        } 
        />

        <Route 
        path="/hrrequestovertime" 
        element={
        <ProtectedRoute>
          <HRrequestovertime />

 <Route 
        path="/hrchosenemployee" 
        element={
        <ProtectedRoute>
          <HRChosenemployee />
        </ProtectedRoute>
        } 
        />


        {/* Admin Portal*/}
        {/* Protected Routes - Employee */}
        <Route 
        path="/adminhomepage" 
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
        }
        />

<Route 
        path="/changeStaffInfo" 
        element={
        <ProtectedRoute>
          <ChangeStaffInfo />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/leaverequestview" 
        element={
        <ProtectedRoute>
          <ViewLeaveRequest />
        </ProtectedRoute>
        }
        />

        <Route 
        path="/overtimerequestview" 
        element={
        <ProtectedRoute>
          <ViewOvertimeRequests />
        </ProtectedRoute>
        }
        />


        <Route 
        path="/printingrequestview" 
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
