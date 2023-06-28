const mysql = require('mysql');
require('dotenv').config();

// Establish MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
  