import Koa from 'koa';
import Router from 'koa-router';
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

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello, Koa TypeScript!';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
