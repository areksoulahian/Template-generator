import Hapi from 'hapi';
import path from 'path';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import { Server as SocketIOServer, Socket } from 'socket.io';

dotenv.config();

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
});

// MySQL database connection
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
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
    console.log('Connected to MySQL database');
  })
  .catch((err: Error) => {
    console.error('Error connecting to MySQL database:', err);
  });

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
