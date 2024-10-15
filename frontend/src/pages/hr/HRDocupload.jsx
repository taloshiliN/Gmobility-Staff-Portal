import React, { useState } from 'react';
import SidebarNav from '../../components/sidebarNav.jsx';
import Header from '../../components/header.jsx';
import { useSelector } from 'react-redux';

function HRDocupload() {
    const position = useSelector((state) => state.auth.position);
    const HRdetails = useSelector((state) => state.auth.data[0]);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("employee_id", HRdetails.id); // Assuming HRdetails.id contains the employee ID
        formData.append("doc", file);

        try {
            const response = await fetch("/uploaddocument", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("File uploaded successfully:", data);
                // You can add logic here to update the UI or notify the user
            } else {
                console.error("Upload failed:", response.statusText);
                alert("File upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred while uploading the file.");
        }
    };

    return (
        <>
            <Header />
            <SidebarNav position={position} />
            <div id="hruploadsection">
                <div id="uploadedsection">
                    <h4>Your documents</h4>
                    <p>Hello {HRdetails.Name} with id {HRdetails.id}</p>
                    <div id="uploadedcontent">
                        <table>
                            <tbody>
                                <tr>
                                    <td>MyCV.pdf</td>
                                    <td id="uploaddeletebutton"><button>Delete</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="newuploadsection">
                    <p>Upload file</p>
                    <form onSubmit={handleSubmit}>
                        <input type='file' onChange={handleFileChange} />
                        <input type='submit' value='Upload' />
                    </form>
                </div>
            </div>
        </>
    );
}

export default HRDocupload;
