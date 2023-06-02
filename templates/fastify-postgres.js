// This is a template for a Fastify API endpoint with PostgreSQL integration

const fastify = require("fastify");
const { Pool } = require("pg");

const app = fastify();

// Create a PostgreSQL pool
const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "your_database",
  password: "your_password",
  port: 5432,
});

app.get("<%= route %>", async (request, reply) => {
  try {
    // Implement your logic here
    // Use the PostgreSQL pool to query the database
    // Example: const { rows } = await pool.query('SELECT * FROM your_table');
    // Return the response
    return { message: "Hello, Fastify with PostgreSQL!" };
  } catch (error) {
    console.error("Error occurred:", error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("Server running on http://localhost:3000");
  }
});
