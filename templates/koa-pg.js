// This is a template for a Koa API endpoint with SQLite integration
import Koa from 'koa';
import Router from 'koa-router';
import pg from 'pg';
import dotenv from 'dotenv';

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

// Define your routes
router.get('<%= route %>', async (ctx) => {
  try {
    // Implement your logic here
    // Use the SQLite database connection to execute queries
    // Example: db.all('SELECT * FROM your_table', (err, rows) => { ... });
    // Return the response
    // ctx.body = 'Hello, Koa with postgres!';
    const welcomeMessage = 'Hello, Koa with Postgres!';

    ctx.type = 'html';
    ctx.body = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instigate Template Generator</title>
</head>

<body>
    <div class="container">
        <div class="content">
            <h1 class="title">${welcomeMessage}</h1>
            <div class="counter-container">
                <button id="counter-btn" class="counter-btn">0</button>
            </div>
        </div>
        <div id="app"></div>
    </div>
    <script>
        //counter code
        const counterBtn = document.getElementById('counter-btn');
        let count = 0;
        //
        counterBtn.addEventListener('click', () => {
            count++;
            counterBtn.textContent = count;
        });
    </script>
    <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
    }
    
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-image: linear-gradient(to bottom right, #edc988, #f9da8b);
    }
    
    .content {
      text-align: center;
    }
    
    .title {
      font-size: 48px;
      font-weight: bold;
      color: #333;
      margin-bottom: 20px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
    
    .description {
      font-size: 24px;
      color: #666;
      margin-bottom: 40px;
    }
    
    .counter-container {
      margin-top: 40px;
    }
    
    .counter-btn {
      background-color: #fff;
      color: #333;
      font-size: 18px;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    
    .container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.4);
      z-index: -1;
    }
    
    .container::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      width: 80%;
      height: 80%;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
      z-index: -1;
    }  
    </style>
</body>

</html>
  `;
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
