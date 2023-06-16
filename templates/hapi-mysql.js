// This is a template for a Hapi.js API endpoint with MySQL integration

import Hapi from 'hapi';
import mysql from 'mysql';

const server = Hapi.server({
  port: process.env.PORT || 3000, // Use the environment variable PORT or fallback to 3000
  host: 'localhost',
});

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

// Define your routes
server.route({
  method: 'GET',
  path: '<%= route %>',
  handler: async (request, h) => {
    try {
      // Implement your logic here
      // Use the MySQL connection pool to execute queries
      // Example: pool.query('SELECT * FROM your_table', (error, results) => { ... });
      // Return the response
      return { message: 'Hello, Hapi.js with MySQL!' };
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
