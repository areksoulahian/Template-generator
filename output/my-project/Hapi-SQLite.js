// This is a template for a Hapi.js API endpoint with SQLite integration

const Hapi = require("hapi");
const sqlite3 = require("sqlite3").verbose();

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

// Create a SQLite database connection
const db = new sqlite3.Database(":memory:");

// Define your routes
server.route({
  method: "GET",
  path: "/api/example",
  handler: async (request, h) => {
    try {
      // Implement your logic here
      // Use the SQLite database connection to execute queries
      // Example: db.all('SELECT * FROM your_table', (err, rows) => { ... });
      // Return the response
      return { message: "Hello, Hapi.js with SQLite!" };
    } catch (error) {
      console.error("Error occurred:", error);
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  },
});

const startServer = async () => {
  try {
    await server.start();
    console.log("Server running on %s", server.info.uri);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
