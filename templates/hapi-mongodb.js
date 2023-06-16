// This is a template for a Hapi.js API endpoint with MongoDB integration

import Hapi from 'hapi';
import mongoose from 'mongoose';

const server = Hapi.server({
  port: process.env.PORT || 3000, // Use the environment variable PORT or fallback to 3000
  host: 'localhost',
});

// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/${dbURL}`, {
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
    // Implement your logic here
    // Use mongoose to interact with MongoDB
    // Example: const result = await YourModel.find();
    // Return the response
    return { message: 'Hello, Hapi.js with MongoDB!' };
  },
});

const startServer = async () => {
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
