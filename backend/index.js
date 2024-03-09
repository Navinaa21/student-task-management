const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 8081;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  user: 'navinaa',
  password: 'Navin@111',
  host: 'fsdtask.database.windows.net',
  database: 'task_2024-03-09T09-33Z_2024-03-09T15-51Z',
  port: 1433,
  ssl: {
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2',
    ca: fs.readFileSync("file/DigiCertGlobalRootCA.crt.pem")
  },
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM login WHERE username = ? AND password = ?`;

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        const username = results[0];
        const { role } = username;
        if (role === 'admin') {
            res.json({ success: true, role: 'admin', message: 'Login successful' });
          } else if (role === 'student') {
            res.json({ success: true, role: 'student', message: 'Login successful' });
          } else {
            res.status(401).json({ error: 'Invalid role' });
          }
      } 
      else {
        // Incorrect credentials
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});


// Add this route in your Express backend

app.post('/admin/add-task', (req, res) => {
  const {ID, name, task, deadline } = req.body;
  const query = `INSERT INTO studtask (stud_id,username, task, deadline) VALUES (?,?, ?, ?)`;

  db.query(query, [ID,name, task, deadline], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newTask = { username: name, task, deadline, ID: results.insertId };
      res.json(newTask);
    }
  });
});




app.get('/admin', (req, res) => {
    const { username } = req.query;
    const query = `SELECT * FROM studtask`;
  
    db.query(query, [username], (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });




  // ... (previous code)

app.get('/student/tasks', (req, res) => {
    const { username } = req.query;
    const query = `SELECT * FROM studtask WHERE username = ?`;
  
    db.query(query, [username], (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  
  app.post('/student/mark-completed', (req, res) => {
    const { taskId } = req.body;
    const query = `UPDATE studtask SET status = 'completed' WHERE task = ?`;
  
    db.query(query, [taskId], (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true, message: 'Task marked as completed' });
      }
    });
  });
  
  // ... (remaining code)
  


  app.post('/', (req, res) => {
    const { ID,username, password } = req.body;
    const query = `INSERT INTO login (ID,username, password) VALUES (?, ?, ?)`;
  
    db.query(query, [ID, username, password], (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true, message: 'Signup successful' });
      }
    });
  });
  




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
