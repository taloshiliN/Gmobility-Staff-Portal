import '../styles/ClockinPage.css'
import SidebarNav from './sidebarNav.jsx';
import Header from './header.jsx';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function ClockinPage() {
    const position = useSelector((state) => state.auth.position);
    const userDetails = useSelector((state) => state.auth.data[0]);

    const [clockin, setClockin] = useState([]); // State for clockin details
    const [inputDate, setInputDate] = useState(''); // State for date input

    useEffect(() => {
        const fetchClockinDetails = async () => {
            try {
                const res = await fetch(`http://localhost:8080/clockin/${userDetails.id}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setClockin(data);
            } catch (err) {
                console.error('Fetch missed days error:', err);
            }
        };

        fetchClockinDetails();
    }, [userDetails.id]); // Dependency array includes employee id

    const handleDateChange = (event) => {
        setInputDate(event.target.value); // Update input date state
    };

    // Function to convert date string (DD/MM/YYYY or MM/DD/YYYY) to YYYY-MM-DD for comparison
    const formatDateString = (dateString) => {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parts[0].length === 2 ? parts[0] : parts[1];  // Handle both DD/MM/YYYY and MM/DD/YYYY
            const month = parts[1].length === 2 ? parts[1] : parts[0];
            const year = parts[2];
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        return null;
    };

    // Filter clockin records based on the input date (only if a date is entered)
    const filteredClockin = inputDate ? clockin.filter(day => {
        const formattedInputDate = formatDateString(inputDate); // Format input date to YYYY-MM-DD
        if (!formattedInputDate) return false; // Skip filtering if input date is invalid
        const dayDate = new Date(day.date).toISOString().split('T')[0]; // Format DB date to YYYY-MM-DD
        return dayDate === formattedInputDate; // Compare the formatted dates
    }) : clockin; // Show all records if no date is entered

    return (
        <>
            <Header />
            <SidebarNav position={position} />
            <div id="clocksection">
                <div id="currentclockinsection">
                    <div id="innercurrentclockin">
                        <h4>Today's Log</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Clock-In Time</th>
                                    <th>Clock-Out Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>08:00</td>
                                    <td>---</td>
                                </tr>
                            </tbody>
                        </table>
                        <button>Clock-Out</button>
                        <p style={{ color: 'green' }}>You've Clocked Out for today!</p>
                    </div>
                </div>
                <div id="lastclockinsection">
                    <h4>Clocking History</h4>
                    <div>
                        <input
                            type="text"
                            placeholder="DD/MM/YYYY or MM/DD/YYYY"
                            value={inputDate}
                            onChange={handleDateChange} // Update date input state
                        />
                    </div>
                    <div id="clockhistorydiv">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Clock-In Time</th>
                                    <th>Clock-Out Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClockin.length > 0 ? (
                                    filteredClockin.map((day) => (
                                        <tr key={day.id}>
                                            <td>{new Date(day.date).toLocaleDateString()}</td>
                                            <td>{day.clockinTime || '----'}</td>
                                            <td>{day.clockoutTime || '----'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No Clocking details found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClockinPage;
