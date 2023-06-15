export const generateSocket = (answers) => {
  return `
import socketIO from "socket.io";

const io = socketIO(server);

io.on("connection", (socket) => {
console.log("A user connected");

socket.on("disconnect", () => {
    console.log("A user disconnected");
});

// Add your Socket.IO event listeners and logic here

// Example: Broadcasting a message to all connected clients
    socket.on("chatMessage", (message) => {
        io.emit("chatMessage", message);
    });
});
`;
};
