export const generateExpressMongoJS = (answers) => {
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

  return `// This is a template for an Express.js API endpoint with MongoDB integration

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';
${mongooseVar}
${socketVar}

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';
${mongoVar}

${mongodbConfig}

${socketConfig}

// to load static files
app.use(express.static('./'));
// Define your routes
app.get('<%= route %>', async (req, res) => {
    const indexHTMLPath = path.join('index.html');

    // Read the HTML file
    fs.readFile(indexHTMLPath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
        return;
    }

    // Send the HTML content in the response
    res.send(data);
    });
});

app.listen(port, () => {
console.log(\`Server running on http://localhost:${port}\`);
});
  `;
};
