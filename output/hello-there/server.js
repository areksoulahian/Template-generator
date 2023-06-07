// This is a template for an Express.js API endpoint with MySQL integration

const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Define your routes
app.get("/api/example", (req, res) => {
  // Implement your logic here
  // Use the MySQL connection to query the database
  // Example: connection.query('SELECT * FROM your_table', (error, results) => { ... });
  // Return the response
  res.send("Hello, Express.js with MySQL!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
