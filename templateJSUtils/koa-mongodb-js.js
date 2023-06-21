export const generateKoaMongoJS = (answers) => {
  let mongoVar = '';
  let mongooseVar = '';
  let mongodbConfig = '';
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

  // Mongoose ORM
  if (answers.orm.toLowerCase() === 'mongoose') {
    mongooseVar = `import mongoose from 'mongoose';`;
  }

  // Mongo Const
  if (answers.database.toLowerCase() === 'mongodb') {
    mongoVar = `const mongodbURI = process.env.MONGODB_URI;
      const mongodbDB = process.env.MONGODB_DB;`;
    mongodbConfig = `// Connect to MongoDB
      mongoose.connect(\`${mongodbURI}${mongodbDB}\`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      });
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'MongoDB connection error:'));
      db.once('open', () => {
      console.log('Connected to MongoDB');
      });
      
      // Define a Mongoose schema for a simple example collection
      const exampleSchema = new mongoose.Schema({
      name: String,
      age: Number,
      });
      
      // Define a Mongoose model based on the schema
      const Example = mongoose.model('Example', exampleSchema);`;
  }

  return `// This is a template for a Koa API endpoint with SQLite integration
  import Koa from 'koa';
  import koaStatic from 'koa-static';
  import Router from 'koa-router';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  import path from 'path';
  import fs from 'fs-extra';
  ${socketVar}
  
  dotenv.config();
  
  const app = new Koa();
  const router = new Router();
  const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';
  
  const mongodbURI = process.env.MONGODB_URI;
  const mongodbDB = process.env.MONGODB_DB;
  
  // Connect to MongoDB
  mongoose.connect(\`${mongodbURI}${mongodbDB}\`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
