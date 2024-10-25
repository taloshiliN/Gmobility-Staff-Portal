import '../styles/ClockinPage.css';
import SidebarNav from './sidebarNav.jsx';
import Header from './header.jsx';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function ClockinPage() {
    const position = useSelector((state) => state.auth.position);
    const userDetails = useSelector((state) => state.auth.data[0]);
    const userRoles = useSelector((state) => state.auth.userRoles); // Access user roles from Redux state
    const userPermissions = useSelector((state) => state.auth.userPermissions);

    const [clockin, setClockin] = useState([]); // State for clockin details
    const [inputDate, setInputDate] = useState(''); // State for date input
    const [currentClockin, setCurrentClockin] = useState(null); // State for current day's clockin details

    useEffect(() => {
        const fetchClockinDetails = async () => {
            try {
                const res = await fetch(`http://localhost:8080/clockin/${userDetails.id}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                console.log("Fetched clockin data:", data); // Log fetched data
                setClockin(data);

                // Get today's date in local timezone
                const todayLocal = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
                console.log("Today's local date:", todayLocal); // Log today's local date

                // Find today's clock-in details
                const todayClockin = data.find(day => {
                    const dbDateUTC = new Date(day.date).toISOString().split('T')[0]; // Get the date in UTC format
                    const localDate = todayLocal.toISOString().split('T')[0]; // Get today's date in UTC for comparison
                    console.log("Comparing with DB date:", dbDateUTC, "Local date:", localDate); // Log DB date for comparison
                    return dbDateUTC === localDate; // Compare the date part
                });

                console.log("Today's clock-in details:", todayClockin); // Log today's clock-in details

                // If found, adjust only the time (increase by 2 hours)
                if (todayClockin) {
                    const adjustedDate = new Date(todayClockin.date);
                    adjustedDate.setHours(adjustedDate.getHours() + 2); // Increase by 2 hours
                    todayClockin.date = adjustedDate.toISOString(); // Store the adjusted date
                    console.log("Adjusted clock-in details:", todayClockin); // Log adjusted clock-in details
                } else {
                    console.log("No clock-in details found for today."); // Log when there's no entry for today
                }

                setCurrentClockin(todayClockin); // Store the current day's clockin details
            } catch (err) {
                console.error('Fetch missed days error:', err);
            }
        };

        fetchClockinDetails();
    }, [userDetails.id]); // Dependency array includes employee id

    const handleDateChange = (event) => {
        setInputDate(event.target.value); // Update input date state
    };

    const handleClear = () => {
        setInputDate(''); // Clear the date input
    };

    const formatDateToLocal = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const filteredClockin = inputDate ? clockin.filter(day => {
        const formattedDbDate = formatDateToLocal(day.date); // Convert DB date to 'YYYY-MM-DD' in local time
        return formattedDbDate === inputDate; // Compare directly with the input date
    }) : clockin; // Show all records if no date is entered

    const handleClockOut = async () => {
        if (!currentClockin) {
            console.warn("No current clock-in details available for clocking out."); // Warning if there's no clock-in
            return;
        }
    
        // Use the adjusted date from currentClockin
        const dateFromCurrentClockin = new Date(currentClockin.date);
        const formattedDate = dateFromCurrentClockin.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'
    
        const clockoutData = {
            date: formattedDate, // Use the correctly formatted date
            employee_id: userDetails.id,
        };
    
        console.log('Clock-out request received:', clockoutData); // Log the clockout data
    
        try {
            const response = await fetch('http://localhost:8080/clockout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clockoutData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Clock-out successful:', result); // Log the successful response
            
            // Notify the user of successful clock-out
            alert('Clock-out successful!');
    
            // Update state with new clock-out time
            setCurrentClockin((prev) => ({
                ...prev,
                clockoutTime: new Date().toLocaleTimeString([], { hour12: false })    
            }));
               } catch (error) {
            console.error('Clock-out error:', error);
            alert('Clock-out failed. Please try again.');
        }
    };
    
    console.log('User Permissions:', userPermissions);
    return (
        <>
            <Header />
            <SidebarNav position={position} />
            <div className='main-content'>
            <div id="clocksection">
            {userPermissions.includes(2) && (
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
                                {currentClockin ? (
                                    <tr>
                                        <td>{currentClockin.clockinTime || '----'}</td>
                                        <td>{currentClockin.clockoutTime || '----'}</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="2">No clock-in details for today.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {currentClockin && currentClockin.clockoutTime === null && (
                            <button onClick={handleClockOut}>Clock-Out</button>
                        )}
                        {currentClockin && currentClockin.clockoutTime !== null && (
                            <p style={{ color: 'green' }}>You've already clocked out for today!</p>
                        )}
                    </div>
                </div>
            )}
                <div id="lastclockinsection">
                    <h4>Clocking History</h4>
                    <div>
                        <input
                            type="date"
                            value={inputDate}
                            onChange={handleDateChange} // Update date input state
                        />
                        <button id="clockinclear" onClick={handleClear}>Clear</button>
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
                                            <td>{new Date(day.date).toLocaleDateString("en-US", { timeZone: "Europe/Berlin" })}</td>
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
            </div>
        </>
    );
}

export default ClockinPage;
