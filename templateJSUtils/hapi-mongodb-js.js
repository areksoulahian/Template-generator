export const generateHapiMongoJS = (answers) => {
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

  return `// This is a template for a Hapi.js API endpoint with MongoDB integration

  import Hapi from 'hapi';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  import path from 'path';
  import fs from 'fs-extra';
  ${socketVar}
  
  dotenv.config();
  
  const server = Hapi.server({
    port: process.env.PORT || 3000, // Use the environment variable PORT or fallback to 3000
    host: 'localhost',
  });
  
  const mongodbURI = process.env.MONGODB_URI;
  const mongodbDB = process.env.MONGODB_DB;
  
  // Connect to MongoDB
  mongoose.connect(\`${mongodbURI}${mongodbDB}\`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

  ${socketConfig}
  
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
      console.log(\`Server running on http://localhost:${port}\`);
    } catch (error) {
      console.error('Error starting server:', error);
    }
  };
  
  startServer();
  
    `;
};
