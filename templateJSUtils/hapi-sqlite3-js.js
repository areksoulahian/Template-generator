export const generateHapiSqlite3JS = (answers) => {
  let socketVar = '';
  let socketConfig = '';

  // if socketio
  if (answers.websocket.toLowerCase() === 'socketio') {
    socketVar = `import { Server as SocketIOServer } from 'socket.io';`;
    socketConfig = `// Socket.IO integration
      const io = new SocketIOServer(server);
      io.on('connection', (socket) => {
          console.log('A client connected');
      
          socket.on('disconnect', () => {
          console.log('A client disconnected');
          });
      
          // Handle custom events here
      });`;
  }

  return `// This is a template for a Hapi.js API endpoint with SQLite integration

  import Hapi from 'hapi';
  import sqlite3 from 'sqlite3';
  import dotenv from 'dotenv';
  import path from 'path';
  import fs from 'fs-extra';
  ${socketVar}
  
  dotenv.config();
  
  const server = Hapi.server({
    port: process.env.PORT || 3000, // Use the environment variable PORT or fallback to 3000
    host: 'localhost',
  });
  
  // Create a SQLite database connection
  const db = new sqlite3.Database(process.env.SQLITE_DB_PATH, (err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the SQLite database');
    }
  });

  ${socketConfig}
  
  // Define your routes
  server.route({
    method: 'GET',
    path: '<%= route %>',
    handler: async (request, h) => {
      try {
        // Implement your logic here
        // Use the SQLite database connection to execute queries
        // Example: db.all('SELECT * FROM your_table', (err, rows) => { ... });
        // Return the response
        // return { message: 'Hello, Hapi.js with SQLite!' };
      } catch (error) {
        console.error('Error occurred:', error);
        return h.response({ error: 'Internal Server Error' }).code(500);
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
      console.log(\`Server running on http://localhost:${port}\`);
    } catch (error) {
      console.error('Error starting server:', error);
    }
  };
  
  startServer();  
        `;
};
