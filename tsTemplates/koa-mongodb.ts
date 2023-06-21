import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';

const app = new Koa();
const router = new Router();

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

router.get('/', async (ctx) => {
  ctx.body = 'Hello, Koa TypeScript!';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
