export const generateDBconfig = (answers) => {
  let dbConfigCode = '';

  // MongoDB
  if (answers.database.toLowerCase() === 'mongodb') {
    dbConfigCode += `const mongoose = require('mongoose');
require('dotenv').config();

// Establish MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = mongoose.connection;
  `;
  }

  // MySQL
  else if (answers.database.toLowerCase() === 'mysql') {
    dbConfigCode += `const mysql = require('mysql');
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
  `;
  }

  // SQLite3
  else if (answers.database.toLowerCase() === 'sqlite3') {
    dbConfigCode += `const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

// Establish SQLite3 connection
const db = new sqlite3.Database(process.env.SQLITE3_DATABASE, (err) => {
  if (err) {
    console.error('SQLite3 connection error:', err);
    return;
  }
  console.log('Connected to SQLite3');
});

module.exports = db;`;
  }

  // PostgreSQL (pg)
  else if (answers.database.toLowerCase() === 'pg') {
    dbConfigCode += `const { Pool } = require('pg');
require('dotenv').config();

// Establish PostgreSQL connection
const pool = new Pool({
  user: process.env.PG_USER,
  host: 'localhost',
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('PostgreSQL connection error:', err);
    return;
  }
  console.log('Connected to PostgreSQL');
});

module.exports = pool;`;
  } else {
    return null;
  }

  return `${dbConfigCode}`;
};
