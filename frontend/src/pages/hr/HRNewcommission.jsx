import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './style/index.css'; // Make sure to add your styles

function HRNewCommission() {
    const position = useSelector((state) => state.auth.position);
    const navigate = useNavigate(); // Initialize useNavigate hook
    
    // State to hold form inputs
    const [formData, setFormData] = useState({
        employee_id: '',
        employee_name: '',
        employee_surname: '',
        item_name: '',
        sale_type: '',
        product_cost: '',
        vat: '',
        commission: '',
        date: ''
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Send data to the backend API
        fetch('http://localhost:8080/addcommission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log('Commission added successfully:', data);
            // Optionally reset the form after submission
            setFormData({
                employee_id: '',
                employee_name: '',
                employee_surname: '',
                item_name: '',
                sale_type: '',
                product_cost: '',
                vat: '',
                commission: '',
                date: ''
            });
        })
        .catch(err => console.error('Fetch error:', err));
    };

    return (
        <>
            <Header />
            <SidebarNav position={position} />
            <div className='main-content'>
            <div className="newcommission">
                <h2>New Commission Entry</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="employee_id">Employee ID</label>
                        <input
                            type="text"
                            id="employee_id"
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div id="commissiondetailform1">
                    <div className="form-group">
                        <label htmlFor="employee_name">Employee Name</label>
                        <input
                            type="text"
                            id="employee_name"
                            name="employee_name"
                            placeholder="First name"
                            value={formData.employee_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="employee_surname"
                            name="employee_surname"
                            placeholder="Last name"
                            value={formData.employee_surname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="item_name">Item Name</label>
                        <input
                            type="text"
                            id="item_name"
                            name="item_name"
                            value={formData.item_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sale_type">Sale Type</label>
                        <input
                            type="text"
                            id="sale_type"
                            name="sale_type"
                            value={formData.sale_type}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_cost">Product Cost</label>
                        <input
                            type="number"
                            id="product_cost"
                            name="product_cost"
                            value={formData.product_cost}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="vat">VAT (%)</label>
                        <input
                            type="number"
                            id="vat"
                            name="vat"
                            value={formData.vat}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="commission">Commission</label>
                        <input
                            type="number"
                            id="commission"
                            name="commission"
                            value={formData.commission}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div id="buttonsec">
                        <button type="submit">Add Commission</button>
                        <button
                            type="button" // Set type to button to prevent default form submission
                            id="comissioncancel"
                            onClick={() => navigate(-1)} // Navigate back on click
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
}

export default HRNewCommission;
