// This is a template for a Hapi.js API endpoint with MySQL integration

import Hapi from 'hapi';
import mysql from 'mysql';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';

dotenv.config();

const server = Hapi.server({
  port: process.env.PORT || 3000, // Use the environment variable PORT or fallback to 3000
  host: 'localhost',
});

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

// Define your routes
server.route({
  method: 'GET',
  path: '<%= route %>',
  handler: async (request, h) => {
    const indexHTMLPath = path.join(__dirname, 'index.html');

    try {
      const data = fs.readFileSync(indexHTMLPath, 'utf-8');
      return h.response(data).type('text/html');
    } catch (err) {
      console.error('Error reading file:', err);
      return h.response('Internal Server Error').code(500);
    }
  },
});

const startServer = async () => {
  // Serve static files
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, './'),
        redirectToSlash: true,
        index: true,
      },
    },
  });
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
    console.log(`Server running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
