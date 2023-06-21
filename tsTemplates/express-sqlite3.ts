import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';
dotenv.config();

// Create a SQLite database connection
const db = new sqlite3.Database(process.env.SQLITE_DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Create Express app
const app = express();
app.use(express.json());

// Define API routes
app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
});

app.get('/examples', async (req: Request, res: Response) => {
  try {
    // Retrieve all examples from the database
    const db = await dbPromise;
    const examples = await db.all('SELECT * FROM examples');
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/examples', async (req: Request, res: Response) => {
  try {
    // Create a new example record in the database
    const { name, age } = req.body;
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO examples (name, age) VALUES (?, ?)',
      [name, age],
    );
    const insertedId = result.lastID;
    res.status(201).json({ id: insertedId, name, age });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
