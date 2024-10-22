const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const json = require("body-parser/lib/types/json");
const router = express.Router();
const mysql = require("mysql");
const app = express();
const fs = require('fs');
const path = require('path');

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
//     password: "Shagina03!!",
    password: "",
    database: "sp_db"
});

// Check database connection
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage to handle file uploads in memory
const upload = multer({ storage: storage });


// Insert staff member
app.post("/api/data", upload.single('profileImg'), (req, res) => {
    const { Name, Surname, ID_Number, DOB, Gender, Nationality, Supervisor, Home_Language, Other_Languages, Position, password } = req.body;
    const profileImg = req.file; // The uploaded file (from 'profileImg')

    if (!profileImg) {
        return res.status(400).json({ message: "Profile picture is required" });
    }

    // Insert the staff member details into the database
    db.query(
        "INSERT INTO staff_members (Name, Surname, ID_Number, DOB, Gender, Nationality, Supervisor, Home_Language, Other_Languages, Position, profileImg, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            Name,
            Surname,
            ID_Number,
            DOB,
            Gender,
            Nationality,
            Supervisor,
            Home_Language,
            Other_Languages,
            Position,
            profileImg.buffer, // Use the buffer for insertion
            password
        ],
        (err) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ message: "Error inserting data", error: err });
            }
            res.status(201).json({ message: "Staff member added successfully" });
        }
    );
});


// post methods
app.post("/api/login", (req, res) => {
    const { firstname, password } = req.body;
    db.query(
        "SELECT * FROM staff_members WHERE Name = ? AND Password = ?",
        [firstname, password],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error checking login", error: err });
            }

            if (results.length > 0) {
                res.json({ message: "Login successful", user: results[0] });
            } else {
                res.status(401).json({ message: "Invalid username or password" });
            }
        }
    );
});

// Get users
// app.get('/users', (req, res) => {
//     const sql = "SELECT * FROM staff_members";
//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error('Error fetching users:', err);
//             return res.status(500).json({ message: "Error fetching users", error: err });
//         }
//         return res.json(data);
//     });
// });

app.get('/getStaffDetails/:id', (req, res) => {
    const staffId = req.params.id; 
  
    //Query database to get staff details for this ID
    db.query('SELECT * FROM staff_members WHERE Id = ?', [staffId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error retrieving staff details' });
      }
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: 'Staff member not found' });
      }
    });
  });

//   //Retrieving profile image
  app.get('/staff/:id/profile-image', (req, res) => {
    const staffId = req.params.id;
    
    db.query('SELECT profileImg FROM staff_members WHERE Id = ?', [staffId], (err, result) => {
      if (err) {
        return res.status(500).send('Error fetching image');
      }
      
      if (result.length > 0) {
        const image = result[0].profileImg; 
        
    
        res.set('Content-Type', 'image/jpg'); 
        
        // Send the image data as the response
        res.send(image);
      } else {
        res.status(404).send('Image not found');
      }
    });
  });

 
// //Change Staff Info
app.get('/api/staff', (req, res) => {
    const query = 'SELECT Name, Surname, Position FROM staff_members'; 
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving staff data' });
        }
        console.log(results); 
        res.json(results);  
    });
});

// // Update user
app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const sql = "UPDATE staff_members SET Name = ?, Surname = ?, DOB = ?, Nationality = ?, Home_Language = ?, Other_Languages = ?, Position = ? WHERE ID_Number = ?";
    const values = [
        updatedData.firstname,
        updatedData.lastname,
        updatedData.dateofbirth,
        updatedData.nationality,
        updatedData.languages, 
        updatedData.languages, 
        updatedData.position,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ message: "Error updating employee", error: err });
        }
    });
});

app.post("/api/leave", (req, res) => {
    const { employeeName, position, date, supervisorName, startDate, endDate, totalDays, reason, resumingWorkDay, emergencyName, emergencyAddress, emergencyPhone } = req.body;

    db.query(
        "INSERT INTO leave_requests (employee_name, position, date, supervisor_name, start_date, end_date, total_days, reason, resuming_work_days, emergency_name, emergency_address, emergency_phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [employeeName, position, date, supervisorName, startDate, endDate, totalDays, reason, resumingWorkDay, emergencyName, emergencyAddress, emergencyPhone],
        (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database insertion failed" }); // Handle error and send response
            }

            // Create newLeaveRequest object inside the callback
            const newLeaveRequest = {
                EmployeeName: employeeName,
                position: position,
                Date: date,
                SuperVisorName: supervisorName,
                StartDate: startDate,
                EndDate: endDate,
                TotalDays: totalDays,
                reason: reason,
                ResumingWorkDay: resumingWorkDay,
                EmergencyName: emergencyName,
                EmergencyAddress: emergencyAddress,
                EmergencyPhone: emergencyPhone,
                ID_Number: result.insertId // Include the generated ID from the database
            };

            // Send response only once
            return res.json(newLeaveRequest);
        }
    );
});


app.get('/employeeovertime/:name', (req, res) => {
    const employeeName = req.params.name;
    const sql = "SELECT * FROM overtime_requests WHERE employee_name = ?";
    db.query(sql, [employeeName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching overtime requests' });
        }
        res.json(results);
    });
});


app.post("/api/overtime", (req, res) => {
    const { employeeName, position, date, start_time, end_time, duration, reason } = req.body;

    // Log the incoming request body
    console.log("Received data:", req.body);

    // Check for required fields
    if (!employeeName || !position || !date || !start_time || !end_time || !duration || !reason) {
        return res.status(400).json({ message: "All fields are required." });
    }

    db.query(
        "INSERT INTO overtime_requests (employee_name, position, date, start_time, end_time, duration, reason, status, reqstatus) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', 'unseen')",
        [employeeName, position, date, start_time, end_time, duration, reason],
        (err) => {
            if (err) {
                console.error("Database insertion error:", err);
                return res.status(500).json({ message: "Database error" });
            }
            const newOvertimeRequest = {
                employeeName,
                position,
                date,
                start_time,
                end_time,
                duration,
                reason
            };
            res.json(newOvertimeRequest);
        }
    );
});


app.post("/api/clock", (req, res) => {
    console.log(req.body)
    const { action, time, date, userId } = req.body;

    db.query(
        "INSERT INTO clock_log (action, time, date, userId) VALUES (?,?,?,?)",
        [action, time, date, userId],
        (err) => {
            if (err) throw err;
            const newClockLog = {
                action,
                time,
                date,
                userId,
            };
            res.json(newClockLog);
        }
    );
});

app.get("/api/clock/:userId", (req, res)=> {
    const {userId} = req.params;

    db.query(
        "SELECT * FROM clock_log WHERE user_id = ? ORDER BY date DESC, time DESC",
        [userId],
        (err, results) => {
            if (err) return res.status(500).json({message: "Error fetching clock logs", error: err});
            res.json(results)
        }
    );
});

app.post("/api/printing", (req, res) => {
    const {from, to, subject, message} = req.body;

    db.query(
        "INSERT INTO printing_requests (`from`, `to`, `subject`, `message`) VALUES (?,?,?,?)",
        [from, to, subject, message],
        (err) => {
            if (err) throw err;
            const newPrintingRequest = {
                from,
                to,
                subject,
                message,
            }
            res.json(newPrintingRequest);
        }
    )
});

// get requests
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM staff_members";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: "Error fetching users", error: err });
        }

        // Convert BLOB to base64
        const usersWithBase64Images = data.map(user => {
            if (user.profilepicture) {
                const base64Image = Buffer.from(user.profilepicture).toString('base64');
                user.profilepicture = `data:image/jpeg;base64,${base64Image}`; // Adjust MIME type based on the actual image type
            } else {
                user.profilepicture = null; // Handle case where there's no profile picture
            }
            return user;
        });

        return res.json(usersWithBase64Images);
    });
});
// app.get('/getStaffDetails/:id', (req, res) => {
//     const staffId = req.params.id; 
  
//     //Query database to get staff details for this ID
//     db.query('SELECT * FROM staff_members WHERE Id = ?', [staffId], (error, results) => {
//       if (error) {
//         return res.status(500).json({ error: 'Error retrieving staff details' });
//       }
//       if (results.length > 0) {
//         res.json(results[0]);
//       } else {
//         res.status(404).json({ error: 'Staff member not found' });
//       }
//     });
//   });

  //Retrieving profile image
// API to get all users images on HR side
app.get('/staff/:id/profile-image', (req, res) => {
    const staffId = req.params.id;
    
    db.query('SELECT profileImg FROM staff_members WHERE Id = ?', [staffId], (err, result) => {
      if (err) {
        return res.status(500).send('Error fetching image');
      }
      
      if (result.length > 0) {
        const image = result[0].profileImg; 
        
        res.set('Content-Type', 'image/jpg'); 
        
        // Send the image data as the response
        res.send(image);
      } else {
        res.status(404).send('Image not found');
      }
    });
  });
 
//Change Staff Info
app.get('/api/staff', (req, res) => {
    const query = 'SELECT Name, Surname, Position FROM staff_members'; 
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving staff data' });
        }
        console.log(results); 
        res.json(results);  
    });
});

// Update user
app.patch('/updateuser/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const sql = "UPDATE staff_members SET Name = ?, Surname = ?, ID_Number = ?, DOB = ?, Gender = ?, Nationality = ?, Supervisor = ?, Home_Language = ?, Other_Languages = ?, Position = ? WHERE id = ?";
    const values = [
        updatedData.Name,
        updatedData.Surname,
        updatedData.ID_Number,
        updatedData.DOB,
        updatedData.Gender,
//         updatedData.nationality,
//         updatedData.languages, 
//         updatedData.languages, 
//         updatedData.position
        updatedData.Nationality,
        updatedData.Supervisor,
        updatedData.Home_Language,
        updatedData.Other_Languages,
        updatedData.Position,
        id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ message: "Error updating employee", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json({ id: id, ...updatedData });
    });
});


// Delete user
app.delete('/deleteuser/:id', (req, res) => {
    const { id } = req.params;

    const checkSql = "SELECT * FROM staff_members WHERE id = ?";
    db.query(checkSql, [id], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking employee existence:', checkErr);
            return res.status(500).json({ message: "Error checking employee", error: checkErr });
        }
        if (checkResult.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const sql = "DELETE FROM staff_members WHERE id = ?";
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting employee:', err);
                return res.status(500).json({ message: "Error deleting employee", error: err });
            }
            console.log(`Deleted employee with ID: ${id}, affected rows: ${result.affectedRows}`);
            res.sendStatus(204);
        });
    });
});


// // Leave request operations

////
app.get('/leave_requests', (req, res) => {
    const sql = "SELECT * FROM leave_requests";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching leave requests:', err);
            return res.status(500).json({ message: "Error fetching leave requests", error: err });
        }
        return res.json(data);
    });
});

// // Update leave request
// app.patch('/leaverequests/:id', (req, res) => {
//     const { id } = req.params;
//     const { status, msgstatus } = req.body;

//     const sql = "UPDATE leaverequests SET status = ?, msgstatus = ? WHERE id = ?";
//     db.query(sql, [status, msgstatus, id], (err, result) => {
//         if (err) {
//             console.error('Error updating leave request:', err);
//             return res.status(500).json({ message: "Error updating leave request", error: err });
//         }
//         res.json({ id, status, msgstatus }); // Return updated leave request info
//     });
// });

// Overtime request section
app.get('/overtimerequest', (req, res) => {
    const sql = "SELECT * FROM overtime_requests ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/employeeovertime/:Name', (req, res) => {
    const { Name } = req.params;
    const sql = "SELECT * FROM overtime_requests WHERE employee_name = ? "; 

    db.query(sql, [Name], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "No overtime records found for this user" });
        }
        return res.json(data); // Return all matching records
    });
});

// Update the status of an overtime request
app.patch('/overtimerequest/:id', (req, res) => {
    const requestId = req.params.id;
    const { status, reqstatus } = req.body;

    console.log(`Updating request ID: ${requestId}, status: ${status}, reqstatus: ${reqstatus}`);

    const sql = "UPDATE overtime_requests SET status = ?, reqstatus = ? WHERE id = ?";
    db.query(sql, [status, reqstatus, requestId], (err, result) => {
        if (err) {
            console.error('Error updating status:', err);
            return res.status(500).json(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }
        return res.json({ message: 'Status updated successfully', result });
    });
});

///payroll section
app.get('/hrpayroll', (req, res) => {
    const sql = "SELECT * FROM pay_roll ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching leave requests:', err);
            return res.status(500).json({ message: "Error fetching leave requests", error: err });
        }
        return res.json(data);
    });
});


// Leave request operations

 app.get('/leaverequests', (req, res) => {
     const sql = "SELECT * FROM leave_requests ORDER BY id DESC";
     db.query(sql, (err, data) => {
         if (err) {
             console.error('Error fetching leave requests:', err);
             return res.status(500).json({ message: "Error fetching leave requests", error: err });
         }
         return res.json(data);
     });
 });

// Update leave request
app.patch('/leaverequests/:id', (req, res) => {
    const { id } = req.params;
    const { status, reqstatus } = req.body;

    const sql = "UPDATE leave_requests SET status = ?, reqstatus = ? WHERE id = ?";
    db.query(sql, [status, reqstatus, id], (err, result) => {
        if (err) {
            console.error('Error updating leave request:', err);
            return res.status(500).json({ message: "Error updating leave request", error: err });
        }
        res.json({ id, status, reqstatus }); // Return updated leave request info
    });
});

// Overtime request section
app.get('/overtimerequest', (req, res) => {
    const sql = "SELECT * FROM overtime_requests ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Update the status of an overtime request
app.patch('/overtimerequest/:id', (req, res) => {
    const requestId = req.params.id;
    const { status, reqstatus } = req.body;

    console.log(`Updating request ID: ${requestId}, status: ${status}, reqstatus: ${reqstatus}`);

    const sql = "UPDATE overtime_requests SET status = ?, reqstatus = ? WHERE id = ?";
    db.query(sql, [status, reqstatus, requestId], (err, result) => {
        if (err) {
            console.error('Error updating status:', err);
            return res.status(500).json(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }
        return res.json({ message: 'Status updated successfully', result });
    });
});

//retrieves missed days for specific user
app.get('/employeemisseddays/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM clockin WHERE employee_id = ? AND (clockinTime IS NULL OR clockinTime = '' OR clockoutTime IS NULL OR clockoutTime = '')";

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "No Missed days found for this user" });
        }
        return res.json(data); // Return all matching records
    });
});

// Update the status of a missed day
app.patch('/updatemissedday/:id', (req, res) => {
    const requestId = req.params.id;
    const { clockinTime, clockoutTime } = req.body; // Get these values from the body

    console.log('Updating missed day with ID:', requestId); // Log the ID for debugging

    const sql = "UPDATE clockin SET clockinTime = ?, clockoutTime = ? WHERE id = ?";
    db.query(sql, [clockinTime, clockoutTime, requestId], (err, result) => {
        if (err) {
            console.error('Error updating missed day:', err);
            return res.status(500).json(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No missed day found with the provided ID.' });
        }
        return res.json({ message: 'Missed day updated successfully', result });
    });
});

// Insert missed day into the database
app.post("/misseddayinsert", (req, res) => {
    const { employee_id, employee_name, date, clockinTime, clockoutTime, reason } = req.body;

    db.query(
        "INSERT INTO missed_days (`employee_id`, `employee_name`, `date`, `clockinTime`, `clockoutTime`, `reason`) VALUES (?,?,?,?,?,?)",
        [employee_id, employee_name, date, clockinTime, clockoutTime, reason],
        (err) => {
            if (err) {
                console.error('Error inserting missed day:', err);
                return res.status(500).json(err);
            }
            const misseddaydata = {
                employee_id,
                employee_name,
                date,
                clockinTime,
                clockoutTime,
                reason
            };
            res.json(misseddaydata);
        }
    );
});

//Uploading documents api

//Getting all docs for user
app.get('/getdocuments/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM documents WHERE employee_id = ? "; 

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "No documents found for this user" });
        }
        return res.json(data); // Return all matching records
    });
});

app.get('/getdocumentblob/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT doc FROM documents WHERE id = ?"; 

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error fetching document blob:', err);
            return res.status(500).json({ message: "Error fetching document", error: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Document not found" });
        }
        const document = data[0].doc;
        res.setHeader('Content-Type', 'application/pdf'); // or other appropriate mime type
        res.send(document); // Send the BLOB as the response
    });
});

// Deleting specific document
app.delete('/deletedocument/:id', (req, res) => {
    const { id } = req.params;

    // Get the document path first
    const sqlSelect = "SELECT doc FROM documents WHERE id = ?";
    db.query(sqlSelect, [id], (err, result) => {
        if (err) {
            console.error("Error retrieving document:", err);
            return res.status(500).json({ error: "Error retrieving document" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Document not found" });
        }

        const documentPath = result[0].doc; // Still retrieving the path, but not using it

        // Delete the document from the database
        const sqlDelete = "DELETE FROM documents WHERE id = ?";
        db.query(sqlDelete, [id], (err, deleteResult) => {
            if (err) {
                console.error('Error deleting document:', err);
                return res.status(500).json({ message: "Error deleting document", error: err });
            }

            if (deleteResult.affectedRows === 0) {
                return res.status(404).json({ message: "Document not found" });
            }

            // Log the deletion, but do not delete the file
            console.log(`Deleted document record with ID: ${id}, file path was: ${documentPath}`);
            res.sendStatus(204); // No content to send back
        });
    });
});


// Inserting document with path storage
app.post("/uploaddocument", upload.single("doc"), (req, res) => {
    console.log("Received data:", req.body); // Debugging log
    console.log("Received file:", req.file); // Debugging log

    const employee_id = req.body.employee_id;

    // Ensure the file and employee_id are present
    if (!req.file || !employee_id) {
        return res.status(400).json({ error: "File or employee_id is missing" });
    }

    const fileBuffer = req.file.buffer; // Access the file buffer
    const fileName = req.file.originalname; // Get the original filename
    const mimeType = req.file.mimetype; // Get the mime type of the file
    const date = new Date(); // Current date/time

    // Save the file metadata and buffer to the database as a BLOB
    db.query(
        "INSERT INTO documents (employee_id, doc, file_name, mime_type, date) VALUES (?, ?, ?, ?, ?)",
        [employee_id, fileBuffer, fileName, mimeType, date],
        (err, result) => {
            if (err) {
                console.error("Database insert error:", err);
                return res.status(500).json({ error: "Database insert error" });
            }

            const doclog = {
                id: result.insertId, // ID of the inserted document
                employee_id,
                file_name: fileName, // Name of the uploaded file
                mime_type: mimeType, // File MIME type
                date, // Submission date
            };

            res.json(doclog); // Return the inserted document details
        }
    );
});



// Endpoint to download a document by ID
app.get('/download/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT doc, file_name, mime_type FROM documents WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).send('Document not found');
        }

        const document = result[0].doc; // Binary data (BLOB)
        const fileName = result[0].file_name; // Original file name
        const mimeType = result[0].mime_type; // MIME type of the file

        // Set appropriate headers to handle the download
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', mimeType); // Set the correct MIME type
        res.end(document); // Send the file data (BLOB) to the client
    });
});


/////////Commissions apis
app.get('/getcommissions', (req, res) => {
    db.query('SELECT * FROM commissions ORDER BY id DESC', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error retrieving commissions' });
        }
        console.log('Query Results:', results); // Log results for verification
        res.json(results); // Return all commission records
    });
});

////new commission
app.post('/addcommission', (req, res) => {
    const { employee_id, employee_name, employee_surname, item_name, sale_type, product_cost, vat, commission, date } = req.body;

    const query = 'INSERT INTO commissions (employee_id, employee_name, employee_surname, item_name, sale_type, product_cost, vat, commission, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [employee_id, employee_name, employee_surname, item_name, sale_type, product_cost, vat, commission, date], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error adding commission' });
        }
        res.json({ message: 'Commission added successfully', commissionId: results.insertId });
    });
});

//retrieves clockin details for specific user
app.get('/clockin/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM clockin WHERE employee_id = ? ORDER BY id DESC";

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "No clocked days found for this user" });
        }
        return res.json(data); // Return all matching records
    });
});

app.post("/clockout", (req, res) => {
    console.log("Clock-out request received:", req.body);
    const { clockoutTime, date, employee_id } = req.body;

    db.query(
        "UPDATE clockin SET clockoutTime = ? WHERE date = ? AND employee_id = ?",
        [clockoutTime, date, employee_id],
        (err, result) => {
            if (err) {
                console.error("Error updating clockout:", err);
                return res.status(500).json({ error: 'Database error occurred' });
            }

            if (result.affectedRows === 0) {
                console.log("No rows updated. Check if the record exists.");
                return res.status(404).json({ message: 'Record not found' });
            }

            const newClockLog = {
                clockoutTime,
                date,
                employee_id,
            };
            console.log("Clock-out successful:", newClockLog);
            res.json(newClockLog);
        }
    );
});

app.post("/clockinset", (req, res) => {
    console.log("Clock-in request received:", req.body);
    const { date, employee_id } = req.body;

    db.query(
        "UPDATE clockin SET clockinTime = NOW() WHERE date = ? AND employee_id = ? AND clockinTime IS NULL",
        [date, employee_id],
        (err, result) => {
            if (err) {
                console.error("Error updating clockin:", err);
                return res.status(500).json({ error: 'Database error occurred' });
            }

            if (result.affectedRows === 0) {
                console.log("No rows updated. Check if the record exists or if clockinTime is not NULL.");
                return res.status(404).json({ message: 'Record not found or already clocked in.' });
            }

            const newClockLog = {
                date,
                employee_id,
            };
            console.log("Clock-in successful:", newClockLog);
            res.json(newClockLog);
        }
    );
});



// Start server
app.listen(8080, () => {
    console.log("Server started on port 8080");
});