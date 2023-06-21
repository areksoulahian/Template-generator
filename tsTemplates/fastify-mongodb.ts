import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'path';
import { Server as SocketIOServer, Socket } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify();
const port = process.env.PORT || 3000;

// Serve static files
app.register(fastifyStatic, {
  root: path.join(__dirname, 'index.html'),
});

// Socket.IO integration
const io = new SocketIOServer(app.server);
io.on('connection', (socket: Socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Mongoose connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'mydatabase';

mongoose
  .connect(mongoURI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    dbName,
  })
  .then(() => {
    console.log('Connected to MongoDB');

    // Add your Mongoose-related code here
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Start the server
app.listen(port, (err, address) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`Server is listening on ${address}`);
});
