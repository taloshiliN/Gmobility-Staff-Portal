import '../../pages/hr/style/index.css';
import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';
import DigitalClock from '../../components/clock.jsx';
import { useSelector } from 'react-redux';

function HomePage() {
  const auth = useSelector((state) => state.auth);
  const userData = auth.data && auth.data[0];
  const position = userData?.Position || auth.position || 'Employee';
  const firstname = userData?.Name || 'User';

  const mainContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)', // Adjust 60px to match your header height
    marginLeft: '250px', // Adjust this to match your sidebar width
  };

  const welcomeStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    animation: 'welcomeAnimation 2s ease-in-out infinite alternate',
  };

  return (
    <>
      <div>
        <Header />
        <SidebarNav position={position} />
        <div className='main-content'>
          <div style={mainContentStyle}>
            <DigitalClock />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
