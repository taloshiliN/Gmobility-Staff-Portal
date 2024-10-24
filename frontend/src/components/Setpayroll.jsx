import SidebarNav from './sidebarNav.jsx';
import Header from './header.jsx';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import '../styles/Setpayroll.css';
import { useNavigate } from 'react-router-dom';

function Setpayroll() {
    const navigate = useNavigate();
    const position = useSelector((state) => state.auth.position);
    const userDetails = useSelector((state) => state.auth.data[0]);

    // State to hold form data
    const [formData, setFormData] = useState({
        employee_id: '',
        Name: '',
        Surname: '',
        Position: '',
        regular_rate: '',
        overtime_rate: '',
        gross_pay: ''
    });

    // State for error handling
    const [error, setError] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch('http://localhost:8080/api/setpayroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify(formData), // Convert form data to JSON
            });

            if (!response.ok) {
                // If response is not ok, throw an error
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error creating payroll');
            }

            const data = await response.json(); // Parse the response data
            console.log('Payroll created:', data); // Handle success response
            // Optionally reset the form or show a success message
        } catch (err) {
            console.error('Error creating payroll:', err); // Handle error response
            setError(err.message); // Set error message to state
        }
    };

    return (
        <>
            <Header />
            <SidebarNav position={position} />
            <div className="setnewpayroll">
                <div id="setnewpayrollinner">
                    <h3>Create New Payroll</h3>
                    {error && <p className="error">{error}</p>} {/* Display error message */}
                    <form onSubmit={handleSubmit}>
                        <div className="setnewpayformdiv">
                            <p>Employee ID</p>
                            <input type='text' name='employee_id' value={formData.employee_id} onChange={handleChange} required />
                        </div>

                        <div className="setnewpayformdiv">
                            <p>Employee Name</p>
                            <input type='text' name='Name' value={formData.Name} onChange={handleChange} required />
                        </div>

                        <div className="setnewpayformdiv">
                            <p>Employee Surname</p>
                            <input type='text' name='Surname' value={formData.Surname} onChange={handleChange} required />
                        </div>

                        <div className="setnewpayformdiv">
                            <p>Employee Position</p>
                            <input type='text' name='Position' value={formData.Position} onChange={handleChange} required />
                        </div>

                        <div className="setnewpayformdiv">
                            <p>Regular Rate (%)</p>
                            <input type='number' name='regular_rate' value={formData.regular_rate} onChange={handleChange} required />
                        </div>

                        <div className="setnewpayformdiv">
                            <p>Overtime Rate (%)</p>
                            <input type='number' name='overtime_rate' value={formData.overtime_rate} onChange={handleChange} required />
                        </div>

                        <div className="setnewpayformdiv">
                            <p>Gross Rate (%)</p>
                            <input type='number' name='gross_pay' value={formData.gross_pay} onChange={handleChange} required />
                        </div>
                        <br />
                        <button onClick={() => navigate(-1)} id="payrollcancel">Cancel</button>
                        <button type="submit" id="payrollsubmit" onClick={() => navigate(-1)}>Submit</button>
                    </form>
                </div>
                
                
            </div>
        </>
    );
}

export default Setpayroll;
