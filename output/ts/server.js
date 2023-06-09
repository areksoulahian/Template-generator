// This is a template for a Hapi.js API endpoint with MongoDB integration

const Hapi = require("hapi");
const mongoose = require("mongoose");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

// Define your routes
server.route({
  method: "GET",
  path: "/",
  handler: async (request, h) => {
    // Implement your logic here
    // Use mongoose to interact with MongoDB
    // Example: const result = await YourModel.find();
    // Return the response
    return { message: "Hello, Hapi.js with MongoDB!" };
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
