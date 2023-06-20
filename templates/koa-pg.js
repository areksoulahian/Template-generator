// This is a template for a Koa API endpoint with SQLite integration
import Koa from 'koa';
import koaStatic from 'koa-static';
import Router from 'koa-router';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';

dotenv.config();

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';

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

// Serve static files
app.use(koaStatic(path.join(__dirname, './')));

app.use(async (ctx) => {
  const indexHTMLPath = path.join(__dirname, 'index.html');

  try {
    const data = await fs.readFile(indexHTMLPath, 'utf-8');
    ctx.body = data;
  } catch (err) {
    console.error('Error reading file:', err);
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
});

// Define your routes
router.get('<%= route %>', async (ctx) => {
  try {
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// Apply the router middleware
app.use(router.routes());

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
