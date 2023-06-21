export const generateFastifyMongoJS = (answers) => {
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

  return `// This is a template for a Fastify API endpoint with PostgreSQL integration

  import fastify from 'fastify';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  import path from 'path';
  import fs from 'fs-extra';
  ${socketVar}
  
  dotenv.config();
  
  const app = fastify();
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
  app.register(fastifyStatic, {
    root: path.join(__dirname, './'),
    prefix: '/',
  });
  
  // define route
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
