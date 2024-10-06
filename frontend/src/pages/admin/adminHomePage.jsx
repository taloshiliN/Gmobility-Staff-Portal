import '../../styles/AdminHomePage.css'; 
import Header from '../../components/header';
import AdminSidebar from '../../components/adminSidebar';
import { useNavigate } from 'react-router-dom';

function AdminHomePage() {
  const adminName = "Samantha"; 

  return (
    <>
    <Header />
      <AdminSidebar />
      <div className="profile-card">
        <h2>Welcome {adminName}</h2> {/* Welcome message */}
        <img className="profile-image" src="https://via.placeholder.com/150" alt="Profile" />
        <div className="profile-info">
          <div className="profile-row">
            <span className="label">Name:</span>
            <span className="value">Samantha</span>
          </div>
          <div className="profile-row">
            <span className="label">Surname:</span>
            <span className="value">Smith</span>
          </div>
          <div className="profile-row">
            <span className="label">ID Number:</span>
            <span className="value">4567899876</span>
          </div>
          <div className="profile-row">
            <span className="label">Date of Birth:</span>
            <span className="value">06/11/1982</span>
          </div>
          <div className="profile-row">
            <span className="label">Nationality:</span>
            <span className="value">Namibian</span>
          </div>
          <div className="profile-row">
            <span className="label">Position:</span>
            <span className="value">HR</span>
          </div>
          <div className="profile-row">
            <span className="label">Languages:</span>
            <span className="value">Oshiwambo, English, French</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHomePage;





