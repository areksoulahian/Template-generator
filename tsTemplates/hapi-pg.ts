import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';
dotenv.config();

// Create a PostgreSQL pool
const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.connect((error) => {
  if (error) {
    console.error('Error connecting to PG:', error);
  } else {
    console.log('Connected to PG database');
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
