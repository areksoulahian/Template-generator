import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';
dotenv.config();

// Create a SQLite database connection
const db = new sqlite3.Database(process.env.SQLITE_DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the SQLite database');
  }
});

const init = async () => {
  const server: Server = new Server({
    port: 3000,
    host: 'localhost',
  });
  server.route({
    method: 'GET',
    path: '/',
    handler: (request: Request, h: ResponseToolkit) => {
      return 'Hello World!';
    },
  });
  await server.start();
  console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
init();
