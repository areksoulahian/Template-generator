export const generateKoaSqlite3TS = (answers) => {
  let mongoVar = '';
  let mongodbConfig = '';
  let mongooseVar = '';
  let mysqlVar = '';
  let mysqlConfig = '';
  let sqlite3Var = '';
  let pgVar = '';
  let pgConfig = '';
  let sqlite3Config = '';
  let sequelizeVar = '';
  let socketVar = '';
  let socketConfig = '';
  let expressImportVar = '';
  let fastifyImportVar = '';
  let koaImportVar = '';
  let hapiImportVar = '';
  let expressServerVar = '';
  let fastifyServerVar = '';
  let koaServerVar = '';
  let hapiServerVar = '';

  // framework headers import
  if (answers.framework.toLowerCase() === 'express') {
    expressImportVar = `import express, { Request, Response } from 'express';
      import dotenv from 'dotenv';
      dotenv.config();
      import path from 'path';
      import fs from 'fs-extra';`;
    expressServerVar = `// Create Express app
      const app = express();
      app.use(express.json());
      // to load static files
      app.use(express.static('./'));`;
  } else if (answers.framework.toLowerCase() === 'fastify') {
    fastifyImportVar = `import fastify from 'fastify';
      import fastifyStatic from 'fastify-static';
      import dotenv from 'dotenv';
      dotenv.config();
      import path from 'path';
      import fs from 'fs-extra';`;
    fastifyServerVar = `ket: Socket) => {
          console.log('A client connected');
        
          socket.on('disconnect', () => {
            console.log('A client disconnected');
          });
        });
        
        
        // Start the server
        app.listen(port, (err, address) => {
          if (err) {
            console.error('Error starting server:', err);
            process.exit(1);
          }
          console.log(\`Server is listening on ${address}\`);
        });`;
  } else if (answers.framework.toLowerCase() === 'koa') {
    koaImportVar = `import koa from 'koa';
      import dotenv from 'dotenv';
      dotenv.config();
      import path from 'path';
      import fs from 'fs-extra';`;
  } else if (answers.framework.toLowerCase() === 'hapi') {
    hapiImportVar = `import hapi from 'hapi';
      import dotenv from 'dotenv';
      dotenv.config();
      import path from 'path';
      import fs from 'fs-extra';`;
  } else {
    return null;
  }

  // if socketio
  if (answers.websocket.toLowerCase() === 'socketio') {
    socketVar = `import { Server as SocketIOServer } from 'socket.io';`;
    socketConfig = `// Socket.IO integration
  const io = new SocketIOServer(server);
  io.on('connection', (socket) => {
      console.log('A client connected');
  
      socket.on('disconnect', () => {
      console.log('A client disconnected');
      });
  
      // Handle custom events here
  });`;
  }

  //  ORM Config
  if (answers.orm.toLowerCase() === 'mongoose') {
    mongooseVar = `import mongoose from 'mongoose';`;
  } else if (answers.orm.toLowerCase() === 'sequelize') {
    sequelizeVar = `import sequelizer from 'sequelizer';`;
  }

  // DB Config
  if (answers.database.toLowerCase() === 'mongodb') {
    mongoVar = `// Connect to MongoDB
      const mongodbURI = process.env.MONGODB_URI;
      const mongodbDB = process.env.MONGODB_DB;`;
    mongodbConfig = `// Connect to MongoDB
          mongoose.connect(\`${mongodbURI}${mongodbDB}\`, {
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
          const Example = mongoose.model('Example', exampleSchema);`;
  } else if (answers.database.toLowerCase() === 'mysql') {
    mysqlVar = ``;
    mysqlConfig = ``;
  } else if (answers.database.toLowerCase() === 'sqlite3') {
    sqlite3Var = ``;
    sqlite3Config = ``;
  } else if (answers.database.toLowerCase() === 'pg') {
    pgVar = ``;
    pgConfig = ``;
  } else {
    return null;
  }

  return `
    ${expressImportVar}
    ${koaImportVar}
    ${hapiImportVar}
    ${fastifyImportVar}
    ${mongooseVar}
    ${sequelizeVar}
    ${socketVar}
      
    // Create Express app
    const app = express();
    app.use(express.json());
    const port = process.env.PORT || 3000; 
    ${mongoVar}
    
    ${mongodbConfig}
  
    ${socketConfig}
    
    import Koa from 'koa';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { Server as SocketIOServer } from 'socket.io';
import serve from 'koa-static';

dotenv.config();

// SQLite3 database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH,
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

sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(\`Server listening on port ${PORT}\`);
    });
  })
  .catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
  });
      `;
};
