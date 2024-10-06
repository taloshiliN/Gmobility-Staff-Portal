import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../../components/header";
import AdminSidebar from "../../components/adminSidebar";

function ChangeStaffInfo() {
    const navigate = useNavigate(); 
    const [staffList, setStaffList] = useState([
        { name: 'Marietjie', surname: 'Van-der Styl', position: 'Human Resource' },
        { name: 'Daniela', surname: 'Van-Rooi', position: 'Human Resource' }
    ]);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editedStaff, setEditedStaff] = useState({ name: '', surname: '', position: '' });

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedStaff(staffList[index]);
    };

    const handleDelete = (index) => {
        const updatedList = [...staffList];
        updatedList.splice(index, 1);
        setStaffList(updatedList);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedStaff((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
        const updatedList = [...staffList];
        updatedList[editingIndex] = editedStaff;
        setStaffList(updatedList);
        setEditingIndex(null); // Exit edit mode
        setEditedStaff({ name: '', surname: '', position: '' });
    };

    const handleSave = () => {
        // Navigate back to StaffProfiles page
        navigate("/staffProfiles");
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    };

    const thTdStyle = {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left'
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#f2f2f2'
    };

    const btnStyle = {
        padding: '6px 12px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px'
    };

    const btnEditStyle = {
        ...btnStyle,
        backgroundColor: '#007bff',
        color: 'white'
    };

    const btnDeleteStyle = {
        ...btnStyle,
        backgroundColor: '#dc3545',
        color: 'white'
    };

    const btnSaveStyle = {
        ...btnStyle,
        backgroundColor: '#28a745',
        color: 'white',
        marginTop: '20px'
    };

    return (
        <>
            <Header/>
            <AdminSidebar/>
            <div style={{ marginLeft: '250px', padding: '20px' }}>
                <h1>Change Staff Information</h1>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Surname</th>
                            <th style={thStyle}>Position</th>
                            <th style={thStyle} colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.map((staff, index) => (
                            <tr key={index}>
                                {editingIndex === index ? (
                                    <>
                                        <td style={thTdStyle}>
                                            <input
                                                type="text"
                                                name="name"
                                                value={editedStaff.name}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td style={thTdStyle}>
                                            <input
                                                type="text"
                                                name="surname"
                                                value={editedStaff.surname}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td style={thTdStyle}>
                                            <input
                                                type="text"
                                                name="position"
                                                value={editedStaff.position}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td style={thTdStyle} colSpan="2">
                                            <button style={btnSaveStyle} onClick={handleSaveEdit}>
                                                Save
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={thTdStyle}>{staff.name}</td>
                                        <td style={thTdStyle}>{staff.surname}</td>
                                        <td style={thTdStyle}>{staff.position}</td>
                                        <td style={thTdStyle}>
                                            <button style={btnEditStyle} onClick={() => handleEdit(index)}>
                                                Edit
                                            </button>
                                        </td>
                                        <td style={thTdStyle}>
                                            <button style={btnDeleteStyle} onClick={() => handleDelete(index)}>
                                                Delete
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button style={btnSaveStyle} onClick={handleSave}>Save</button>
            </div>
        </>
    );
}

export default ChangeStaffInfo;
