const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const json = require("body-parser/lib/types/json");
const app = express();
const router = express.Router();

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shagina03!!",
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
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ message: "Error inserting data", error: err });
            }
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

  //Retrieving profile image
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


// Start server
app.listen(8080, () => {
    console.log("Server started on port 8080");
});
