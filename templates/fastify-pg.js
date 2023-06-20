// This is a template for a Fastify API endpoint with PostgreSQL integration

import fastify from 'fastify';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';

dotenv.config();

const app = fastify();
const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';

// Create a PostgreSQL pool
const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.connect((error) => {
  if (error) {
    console.error('Error connecting to PG:', error);
  } else {
    console.log('Connected to PG database');
  }
});

// Serve static files
app.register(fastifyStatic, {
  root: path.join(__dirname, './'),
  prefix: '/',
});

//define route
app.get('<%= route %>', async (request, reply) => {
  try {
    // Implement your logic here
    // Use the PostgreSQL pool to query the database
    // Example: const { rows } = await pool.query('SELECT * FROM your_table');
    // Return the response
    // return { message: 'Hello, Fastify with PostgreSQL!' };
    const indexHTMLPath = path.join('index.html');

    // Read the HTML file
    fs.readFile(indexHTMLPath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        reply.code(500).send('Internal Server Error');
        return;
      }

      // Send the HTML content in the response
      reply.send(data);
    });
  } catch (error) {
    console.error('Error occurred:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server running on http://localhost:${port}`);
  }
});
