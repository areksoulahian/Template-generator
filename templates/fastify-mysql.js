// This is a template for a Fastify API endpoint with PostgreSQL integration

import fastify from 'fastify';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify();
const port = process.env.PORT || 3000; // Use the environment variable PORT or fallback to 3000let dbURL = 'your_database';

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

app.get('<%= route %>', async (request, reply) => {
  try {
    // Implement your logic here
    // Use the PostgreSQL pool to query the database
    // Example: const { rows } = await pool.query('SELECT * FROM your_table');
    // Return the response
    // return { message: 'Hello, Fastify with PostgreSQL!' };
    const welcomeMessage = 'Hello, Fastify with MySQL!';

    reply.header('Content-Type', 'text/html').send(`
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
    `);
  } catch (error) {
    console.error('Error occurred:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server running on http://localhost:${port}`);
  }
});
