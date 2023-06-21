export const generateFastifySqlite3JS = (answers) => {
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

  return `// This is a template for a Fastify API endpoint with PostgreSQL integration

  import fastify from 'fastify';
  import sqlite3 from 'sqlite3';
  import dotenv from 'dotenv';
  import path from 'path';
  import fs from 'fs-extra';
  ${socketVar}
  
  dotenv.config();
  
  const app = fastify();
  const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';
  
  // Create a SQLite database connection
  const db = new sqlite3.Database(process.env.SQLITE_DB_PATH, (err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the SQLite database');
    }
  });

  ${socketConfig}
  
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
      console.log(\`Server running on http://localhost:${port}\`);
    }
  });
  
        `;
};
