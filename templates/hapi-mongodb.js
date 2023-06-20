// This is a template for a Hapi.js API endpoint with MongoDB integration

import Hapi from 'hapi';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';

dotenv.config();

const server = Hapi.server({
  port: process.env.PORT || 3000, // Use the environment variable PORT or fallback to 3000
  host: 'localhost',
});

const mongodbURI = process.env.MONGODB_URI;
const mongodbDB = process.env.MONGODB_DB;

// Connect to MongoDB
mongoose.connect(`${mongodbURI}${mongodbDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB schema and model if needed
// Example: const yourSchema = new mongoose.Schema({ ... });
// const YourModel = mongoose.model('YourModel', yourSchema);

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
