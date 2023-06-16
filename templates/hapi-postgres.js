// This is a template for a Hapi.js API endpoint with PostgreSQL integration

import Hapi from 'hapi';
import { Pool } from 'pg';

const server = Hapi.server({
  port: process.env.PORT || 3000, // Use the environment variable PORT or fallback to 3000
  host: 'localhost',
});

// Create a PostgreSQL pool
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Define your routes
server.route({
  method: 'GET',
  path: '<%= route %>',
  handler: async (request, h) => {
    try {
      // Implement your logic here
      // Use the PostgreSQL pool to execute queries
      // Example: pool.query('SELECT * FROM your_table', (error, results) => { ... });
      // Return the response
      return { message: 'Hello, Hapi.js with PostgreSQL!' };
    } catch (error) {
      console.error('Error occurred:', error);
      return h.response({ error: 'Internal Server Error' }).code(500);
    }
  },
});

const startServer = async () => {
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
