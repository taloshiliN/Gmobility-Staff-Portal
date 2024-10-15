const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const json = require("body-parser/lib/types/json");
const router = express.Router();
const mysql = require("mysql");
const app = express();

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

// Insert staff member
app.post("/api/data", (req, res) => {
//     const { firstname, surname, id_Number, DOB, nationality, homeLanguage, otherLanguages, position, password } = req.body;
    const { firstname, surname, id_Number, DOB,Gender, nationality, Supervisor, homeLanguage, otherLanguages, position,profilepicture, password } = req.body;

    db.query(
        "INSERT INTO staff_members (Name, Surname, ID_Number, DOB,Gender, Nationality, Supervisor, Home_Language, Other_Languages, Position,profilepicture, Password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [firstname, surname, id_Number, DOB, Gender, nationality, Supervisor, homeLanguage, otherLanguages, position,profilepicture, password],
        (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ message: "Error inserting data", error: err });
            }
            const newData = {
                id: results.insertId,
                Name: firstname,
                Surname: surname,
                ID_Number: id_Number,
                DOB: DOB,
                Gender: Gender,
                Nationality: nationality,
                Home_Language: homeLanguage,
                Other_Languages: otherLanguages,
                Position: position,
                Supervisor: Supervisor,
                profilepicture: profilepicture,
                Password: password
            };
            res.json(newData);
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
    const {employeeName, date, supervisorName, startDate, endDate, totalDays, resumingWorkDay, emergencyName, emergencyAddress, emergencyPhone} = req.body;

    db.query(
        "INSERT INTO leave_requests (employee_name, date, supervisor_name, start_date, end_date, total_days, resuming_work_days, emergency_name, emergency_address, emergency_phone_number) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [employeeName, date, supervisorName, startDate, endDate, totalDays, resumingWorkDay, emergencyName, emergencyAddress, emergencyPhone],
        (err) => {
            if (err) throw err;
            const newLeaveRequest = {
                EmployeeName:employeeName,
                Date:date,
                SuperVisorName:supervisorName,
                StartDate:startDate,
                EndDate:endDate,
                TotalDays:totalDays,
                ResumingWorkDay:resumingWorkDay,
                EmergencyName:emergencyName,
                EmergencyAddress:emergencyAddress,
                EmergencyPhone:emergencyPhone
            };
            res.json(newLeaveRequest);
        }
    );
        res.json({ ID_Number: id, ...updatedData }); // Return updated employee info
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
    const {employeeName, date, startTime, endTime, duration, reason} = req.body;

    db.query(
        "INSERT INTO overtime_requests (employee_name, date, start_time, end_time, duration, reason, status, reqstatus) VALUES (?,?,?,?,?,?,'Pending', 'unseen')",
        [employeeName, date, startTime, endTime, duration, reason],
        (err) => {
            if (err) throw err;
            const newOvertimeRequest = {
                EmployeeName:employeeName,
                Date:date,
                StartTime:startTime,
                EndTime:endTime,
                Duration:duration,
                Reason:reason
            };
            res.json(newOvertimeRequest);
        }
    )
})

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
        return res.json(data);
    });
});

// // Update user
// app.patch('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const updatedData = req.body;

    // const sql = "UPDATE staff_members SET Name = ?, Surname = ?, DOB = ?, Nationality = ?, Home_Language = ?, Other_Languages = ?, Position = ? WHERE ID_Number = ?";
    // const values = [
    //     updatedData.firstname,
    //     updatedData.lastname,
    //     updatedData.dateofbirth,
    //     updatedData.nationality,
    //     updatedData.languages, // Assuming these correspond correctly
    //     updatedData.languages, // Assuming this is your home language
    //     updatedData.position,
    //     id
    // ];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error updating employee:', err);
//             return res.status(500).json({ message: "Error updating employee", error: err });
//         }
//         res.json({ ID_Number: id, ...updatedData }); // Return updated employee info
//     });
// });

// Delete user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM staff_members WHERE ID_Number = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).json({ message: "Error deleting employee", error: err });
        }
        res.sendStatus(204); // No content response
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
// app.get('/overtimerequest', (req, res) => {
//     const sql = "SELECT * FROM overtimerequests";
//     db.query(sql, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });

// // Update the status of an overtime request
// app.patch('/overtimerequest/:id', (req, res) => {
//     const requestId = req.params.id;
//     const { status, reqstatus } = req.body;

//     console.log(`Updating request ID: ${requestId}, status: ${status}, reqstatus: ${reqstatus}`);

//     const sql = "UPDATE overtime_requests SET status = ?, reqstatus = ? WHERE id = ?";
//     db.query(sql, [status, reqstatus, requestId], (err, result) => {
//         if (err) {
//             console.error('Error updating status:', err);
//             return res.status(500).json(err);
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Request not found' });
//         }
//         return res.json({ message: 'Status updated successfully', result });
//     });
// });

// // Start server
// // app.listen(8080, () => {
// //     console.log("Server started on port 8080");
// // })

// // Get users
// app.get('/users', (req, res) => {
//     const sql = "SELECT * FROM staff_members ";
//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error('Error fetching users:', err);
//             return res.status(500).json({ message: "Error fetching users", error: err });
//         }
//         return res.json(data);
//     });
// });


// // Update user
// app.patch('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const updatedData = req.body;

//     const sql = "UPDATE staff_members SET Name = ?, Surname = ?, DOB = ?, Gender = ?, Nationality = ?, Supervisor = ?, Home_Language = ?, Other_Languages = ?, Position = ? WHERE ID_Number = ?";
//     const values = [
//         updatedData.firstname,
//         updatedData.lastname,
//         updatedData.dateofbirth,
//         updatedData.Gender,
//         updatedData.nationality,
//         updatedData.Supervisor,
//         updatedData.languages, // Assuming these correspond correctly
//         updatedData.languages, // Assuming this is your home language
//         updatedData.position,
//         id
//     ];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error updating employee:', err);
//             return res.status(500).json({ message: "Error updating employee", error: err });
//         }
//         res.json({ ID_Number: id, ...updatedData }); // Return updated employee info
//     });
// });

// // Delete user
// app.delete('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = "DELETE FROM staff_members WHERE ID_Number = ?";
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error('Error deleting employee:', err);
//             return res.status(500).json({ message: "Error deleting employee", error: err });
//         }
//         res.sendStatus(204); // No content response
//     });
// });

// Leave request operations
////
// app.get('/leaverequests', (req, res) => {
//     const sql = "SELECT * FROM leaverequests";
//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error('Error fetching leave requests:', err);
//             return res.status(500).json({ message: "Error fetching leave requests", error: err });
//         }
//         return res.json(data);
//     });
// });

// Update leave request
app.patch('/leaverequests/:id', (req, res) => {
    const { id } = req.params;
    const { status, msgstatus } = req.body;

    const sql = "UPDATE leaverequests SET status = ?, msgstatus = ? WHERE id = ?";
    db.query(sql, [status, msgstatus, id], (err, result) => {
        if (err) {
            console.error('Error updating leave request:', err);
            return res.status(500).json({ message: "Error updating leave request", error: err });
        }
        res.json({ id, status, msgstatus }); // Return updated leave request info
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

// Start server
app.listen(8080, () => {
    console.log("Server started on port 8080");
});
