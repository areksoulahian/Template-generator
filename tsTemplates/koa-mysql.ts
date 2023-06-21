import Koa from 'koa';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { Server as SocketIOServer } from 'socket.io';
import serve from 'koa-static';

dotenv.config();

// PostgreSQL database connection
const sequelize = new Sequelize({
  dialect: 'postgres',
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

// Create Koa app and HTTP server
const app = new Koa();
const server = http.createServer(app.callback());

// Socket.IO integration
const io = new SocketIOServer(server);
io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // Handle custom events here
});

// Serve static files (e.g., index.html)
app.use(serve(path.join(__dirname, 'public')));

// Rest of the Koa app setup and routes

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
