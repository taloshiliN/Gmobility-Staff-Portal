import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';
import { useSelector } from 'react-redux';

function HRChosenemployee(){
    const position = useSelector((state) => state.auth.position);

    return(
        <>
        <Header />
        <SidebarNav position={position} />
        <div className="chosenemployee">

        </div>
        </>
    );
}
export default HRChosenemployee