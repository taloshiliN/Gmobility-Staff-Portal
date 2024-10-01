import '../../styles/AdminHomePage.css'; // Ensure this CSS file exists
import Header from '../../components/header';
import SidebarNav from '../../components/sidebarNav';
import { useSelector } from 'react-redux';

function AdminHomePage() {
  const position = useSelector((state)=> state.auth.position)

  const adminName = "Samantha"; // Replace with the dynamic name if needed

  return (
    <>
    <Header />
    <SidebarNav position={position}/>
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





