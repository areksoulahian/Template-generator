import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import fs from 'fs-extra';

import sequelizer, { Sequelize, DataTypes } from 'sequelizer';
import { Server as SocketIOServer } from 'socket.io';

const port = process.env.PORT || 3000;

// Socket.IO integration
const io = new SocketIOServer(server);
io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // Handle custom events here
});

// Create Express app
const app = express();
app.use(express.json());
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
// Get
app.get('/examples', async (req: Request, res: Response) => {
  try {
    // Retrieve all examples from the database
    const examples = await Example.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Post
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
  console.log(`Server running on http://localhost:${port}`);
});
