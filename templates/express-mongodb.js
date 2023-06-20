// This is a template for an Express.js API endpoint with MongoDB integration

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';
const mongodbURI = process.env.MONGODB_URI;
const mongodbDB = process.env.MONGODB_DB;

// Connect to MongoDB
mongoose.connect(`${mongodbURI}${mongodbDB}`, {
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
const Example = mongoose.model('Example', exampleSchema);

// to load static files
app.use(express.static('./'));
// Define your routes
app.get('<%= route %>', async (req, res) => {
  try {
    // Implement your logic here
    // Use mongoose to interact with MongoDB
    // Example: const result = await YourModel.find();
    // Return the response
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
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
