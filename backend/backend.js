const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const mysql = require("mysql")
const app = express();


const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"sp_db"
})

app.post("/api/data", (req, res) => {
    const {firstname, surname, id_Number, DOB, nationality, homeLanguage, otherLanguages, position, password} = req.body;
    
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
                Home_Language:homeLanguage,
                Other_Languages:otherLanguages,
                Position:position,
                Password:password
            }
            res.json(newData)
        }
    )
})

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
        "INSERT INTO leave_requests (employee_name, date, start_time, end_time, duration, reason) VALUES (?,?,?,?,?,?)",
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

app.listen(8080, ()=>{
    console.log("Server started on port 8080");
})

