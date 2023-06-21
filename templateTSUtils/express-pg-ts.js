export const generateExpressPgTS = (answers) => {
  let pgVar = '';
  let sequelizeVar = '';
  let pgConfig = '';
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

  // Sequelizer ORM
  if (answers.orm.toLowerCase() === 'sequelizer') {
    sequelizeVar = `import sequelizer from 'sequelizer';`;
  }

  // PG Const
  if (answers.database.toLowerCase() === 'pg') {
    pgVar = ``;
    pgConfig = ``;
  }

  return `// This is a template for an Express.js API endpoint with MongoDB integration
      
      import express, { Request, Response } from 'express';
      import dotenv from 'dotenv';
      import path from 'path';
      import fs from 'fs-extra';
      ${socketVar}
      ${sequelizeVar}
      
      dotenv.config();
      
      // Create Express app
      const app = express();
      app.use(express.json());
      const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';
    
      ${socketConfig}
      
      // to load static files
      app.use(express.static('./'));
      
    // Connect to MongoDB
    const mongodbURI = process.env.MONGODB_URI;
    const mongodbDB = process.env.MONGODB_DB;
    const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';
    
    // Connect to MongoDB
    mongoose.connect(\`${mongodbURI}${mongodbDB}\`, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
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
    const Example = mongoose.model('Example', exampleSchema);
    
    // to load static files
    app.use(express.static('./'));
    
    // route
    app.get('/', (req: Request, res: Response) => {
      const indexHTMLPath = path.join(__dirname, 'index.html');
      fs.readFile(indexHTMLPath, 'utf-8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.send(data);
      });
    });
    
    app.get('/examples', async (req: Request, res: Response) => {
      try {
        // Retrieve all examples from the database
        const examples = await Example.find();
        res.json(examples);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    app.post('/examples', async (req: Request, res: Response) => {
      try {
        // Create a new example object based on the request body
        const example = new Example(req.body);
        // Save the example object to the database
        await example.save();
        res.status(201).json(example);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    // Start the server
    app.listen(port, () => {
      console.log(\`Server running on http://localhost:${port}\`);
    });
        `;
};
