import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import mysql, { Connection, MysqlError } from 'mysql';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';
dotenv.config();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
  } else {
    console.log('Connected to MySQL database');
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
