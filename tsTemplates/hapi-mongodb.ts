import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';

// Connect to MongoDB
const mongodbURI = process.env.MONGODB_URI;
const mongodbDB = process.env.MONGODB_DB;
const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';

// Connect to MongoDB
mongoose.connect(`${mongodbURI}${mongodbDB}`, {
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

const init = async () => {
  const server: Server = new Server({
    port: 3000,
    host: 'localhost',
  });
  server.route({
    method: 'GET',
    path: '/',
    handler: (request: Request, h: ResponseToolkit) => {
      return 'Hello World!';
    },
  });
  await server.start();
  console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
init();
