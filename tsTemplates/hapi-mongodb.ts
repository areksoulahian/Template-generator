import Hapi from 'hapi';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server as SocketIOServer, Socket } from 'socket.io';

dotenv.config();

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
});

// MongoDB database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Mongoose schema and model example
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});
const User = mongoose.model('User', UserSchema);

// Socket.IO integration
const io = new SocketIOServer(server.listener);
io.on('connection', (socket: Socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // Handle custom events here
});

// Load index.html on the root route
server.route({
  method: 'GET',
  path: '/',
  handler: (_, h) => {
    return h.file(path.join(__dirname, 'public', 'index.html'));
  },
});

const startServer = async () => {
  try {
    await server.start();
    console.log('Server running at:', server.info.uri);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
