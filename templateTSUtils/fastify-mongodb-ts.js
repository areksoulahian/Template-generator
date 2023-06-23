export const generateExpressMongoTS = (answers) => {
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
    koaServerVar = ``;
  } else if (answers.framework.toLowerCase() === 'hapi') {
    hapiImportVar = `import hapi from 'hapi';
    import dotenv from 'dotenv';
    dotenv.config();
    import path from 'path';
    import fs from 'fs-extra';`;
    hapiServerVar = ``;
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
    mongoVar = `const mongodbURI = process.env.MONGODB_URI;
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
    

    const port = process.env.PORT || 3000; 
    ${mongoVar}
    ${mongodbConfig}

    ${mysqlVar}
    ${mysqlConfig}

    ${pgVar}
    ${pgConfig}

    ${sqlite3Var}
    ${sqlite3Config}
  
    ${socketConfig}
    
    ${fastifyServer}
      
      `;
};
