import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const mongodbURI = process.env.MONGODB_URI;
const mongodbDB = process.env.MONGODB_DB;

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

// Create Express app
const app = express();
app.use(express.json());

// Define API routes
app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
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
const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
