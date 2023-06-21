export const generateKoaSqlite3JS = (answers) => {
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

  return `// This is a template for a Koa API endpoint with SQLite integration
  import Koa from 'koa';
  import koaStatic from 'koa-static';
  import Router from 'koa-router';
  import sqlite3 from 'sqlite3';
  import dotenv from 'dotenv';
  import path from 'path';
  import fs from 'fs-extra';
  ${socketVar}
  
  dotenv.config();
  
  const app = new Koa();
  const router = new Router();
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
  app.use(koaStatic(path.join(__dirname, './')));
  
  app.use(async (ctx) => {
    const indexHTMLPath = path.join(__dirname, 'index.html');
  
    try {
      const data = await fs.readFile(indexHTMLPath, 'utf-8');
      ctx.body = data;
    } catch (err) {
      console.error('Error reading file:', err);
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
    }
  });
  
  // Define your routes
  router.get('<%= route %>', async (ctx) => {
    try {
    } catch (error) {
      console.error('Error occurred:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  });
  
  // Apply the router middleware
  app.use(router.routes());
  
  // Start the server
  app.listen(port, () => {
    console.log(\`Server running on http://localhost:${port}\`);
  });
  
  `;
};
