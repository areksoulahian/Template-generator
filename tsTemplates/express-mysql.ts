import express, { Request, Response } from 'express';
import mysql, { Connection, MysqlError } from 'mysql';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';
dotenv.config();

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

// Create Express app
const app = express();
app.use(express.json());

// Define API routes
app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
});

app.get('/examples', (req: Request, res: Response) => {
  // Retrieve all examples from the database
  pool.query(
    'SELECT * FROM examples',
    (error: MysqlError | null, results: any[]) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    },
  );
});

app.post('/examples', (req: Request, res: Response) => {
  // Create a new example record in the database
  const { name, age } = req.body;
  pool.query(
    'INSERT INTO examples (name, age) VALUES (?, ?)',
    [name, age],
    (error: MysqlError | null, result: any) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const insertedId = result.insertId;
        res.status(201).json({ id: insertedId, name, age });
      }
    },
  );
});

// Start the server
const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
