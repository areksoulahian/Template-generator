import fastify from 'fastify';
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

const server = fastify();

server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
