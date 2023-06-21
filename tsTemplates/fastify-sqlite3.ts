import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'path';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

dotenv.config();

const app = fastify();
const port = process.env.PORT || 3000;

// Serve static files
app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

// SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
});

// Define a model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to SQLite database');
  })
  .catch((err: Error) => {
    console.error('Error connecting to SQLite database:', err);
  });

// Create a basic HTTP server
const server = createServer(app);

// Socket.IO integration
const io = new Server(server);
io.on('connection', (socket: Socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // Handle custom events here
});

// Load index.html on the root route
app.get('/', async () => {
  return {
    html: await app.inject('/index.html'),
  };
});

// Start the server
server.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`Server is listening on port ${port}`);
});
