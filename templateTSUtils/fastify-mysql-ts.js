export const generateExpressMysqlTS = (answers) => {
  let mysqlVar = '';
  let sequelizeVar = '';
  let mysqlConfig = '';
  let socketVar = '';
  let socketConfig = '';

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

  // Sequelizer ORM
  if (answers.orm.toLowerCase() === 'sequelizer') {
    sequelizeVar = `import sequelizer from 'sequelizer';`;
  }

  // Mongo Const
  if (answers.database.toLowerCase() === 'mysql') {
    mysqlVar = ``;
    mysqlConfig = ``;
  }

  return `// This is a template for an Fastify.js API endpoint with Mysql integration
      
      import express, { Request, Response } from 'express';
      import dotenv from 'dotenv';
      import path from 'path';
      import fs from 'fs-extra';
      ${socketVar}
      ${sequelizeVar}
      
      dotenv.config();
      
      const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';
    
      ${socketConfig}
      

        `;
};
