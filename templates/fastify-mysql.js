// This is a template for a Fastify API endpoint with PostgreSQL integration

import fastify from 'fastify';
import mysql from 'mysql';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';

dotenv.config();

const app = fastify();
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
