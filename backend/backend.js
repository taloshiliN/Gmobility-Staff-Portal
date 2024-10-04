const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
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
    const { firstname, surname, id_Number, DOB, nationality, homeLanguage, otherLanguages, position, password } = req.body;

    db.query(
        "INSERT INTO staff_members (Name, Surname, ID_Number, DOB, Nationality, Home_Language, Other_Languages, Position, Password) VALUES (?,?,?,?,?,?,?,?,?)",
        [firstname, surname, id_Number, DOB, nationality, homeLanguage, otherLanguages, position, password],
        (err) => {
            if (err) throw err;
            const newData = {
                Name: firstname,
                Surname: surname,
                ID_Number: id_Number,
                DOB: DOB,
                Nationality: nationality,
                Home_Language: homeLanguage,
                Other_Languages: otherLanguages,
                Position: position,
                Password: password
            };
            res.json(newData);
        }
    );
});

// Login endpoint
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
});

app.post("/api/overtime", (req, res) => {
    const {employeeName, date, startTime, endTime, duration, reason} = req.body;

    db.query(
        "INSERT INTO overtime_requests (employee_name, date, start_time, end_time, duration, reason) VALUES (?,?,?,?,?,?)",
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
    const { action, time, date } = req.body;

    db.query(
        "INSERT INTO clock_log (action, time, date) VALUES (?,?,?)",
        [action, time, date],
        (err) => {
            if (err) throw err;
            const newClockLog = {
                action,
                time,
                date,
            };
            res.json(newClockLog);
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

// Get users
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

// Update user
app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const sql = "UPDATE staff_members SET Name = ?, Surname = ?, DOB = ?, Nationality = ?, Home_Language = ?, Other_Languages = ?, Position = ? WHERE ID_Number = ?";
    const values = [
        updatedData.firstname,
        updatedData.lastname,
        updatedData.dateofbirth,
        updatedData.nationality,
        updatedData.languages, // Assuming these correspond correctly
        updatedData.languages, // Assuming this is your home language
        updatedData.position,
        id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ message: "Error updating employee", error: err });
        }
        res.json({ ID_Number: id, ...updatedData }); // Return updated employee info
    });
});

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

// Leave request operations

////
app.get('/leaverequests', (req, res) => {
    const sql = "SELECT * FROM leaverequests ORDER BY id DESC"; // Replace 'created_at' with your actual date column name
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
    const sql = "SELECT * FROM overtimerequests";
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

    const sql = "UPDATE overtimerequests SET status = ?, reqstatus = ? WHERE id = ?";
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
    const sql = "SELECT * FROM payroll";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching leave requests:', err);
            return res.status(500).json({ message: "Error fetching leave requests", error: err });
        }
        return res.json(data);
    });
});

// Start server
app.listen(8080, () => {
    console.log("Server started on port 8080");
})

// Get users
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


// Update user
app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const sql = "UPDATE staff_members SET Name = ?, Surname = ?, DOB = ?, Nationality = ?, Home_Language = ?, Other_Languages = ?, Position = ? WHERE ID_Number = ?";
    const values = [
        updatedData.firstname,
        updatedData.lastname,
        updatedData.dateofbirth,
        updatedData.nationality,
        updatedData.languages, // Assuming these correspond correctly
        updatedData.languages, // Assuming this is your home language
        updatedData.position,
        id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ message: "Error updating employee", error: err });
        }
        res.json({ ID_Number: id, ...updatedData }); // Return updated employee info
    });
});

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

// Leave request operations

////
app.get('/leaverequests', (req, res) => {
    const sql = "SELECT * FROM leaverequests";
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
    const sql = "SELECT * FROM overtimerequests";
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

    const sql = "UPDATE overtimerequests SET status = ?, reqstatus = ? WHERE id = ?";
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
