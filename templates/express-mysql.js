// This is a template for an Express.js API endpoint with MySQL integration

import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

// to load static files
app.use(express.static('./'));
// Define your routes
app.get('<%= route %>', (req, res) => {
  // Implement your logic here
  // Use the MySQL connection to query the database
  // Example: connection.query('SELECT * FROM your_table', (error, results) => { ... });
  // Return the response
  const indexHTMLPath = path.join('index.html');

  // Read the HTML file
  fs.readFile(indexHTMLPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Send the HTML content in the response
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
