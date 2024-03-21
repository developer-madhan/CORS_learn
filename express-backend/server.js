// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Import the cors middleware
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS middleware

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react_task_db'
};

const pool = mysql.createPool(dbConfig);

// Routes
app.post('/api/submit-form-db', async (req, res) => {
    try {
      const formData = req.body;
      
      const connection = await pool.getConnection();
  
      await connection.query('INSERT INTO tryform2 SET ?', formData);
  
      connection.release();
  
      res.status(200).json({ message: 'Form data saved successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error saving form data' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
