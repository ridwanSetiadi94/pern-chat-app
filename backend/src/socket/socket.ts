import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app); // Create an HTTP server using the Express app
const io = new Server(server, {
  // Create a new Socket.IO server instance
  cors: {
    // Configure CORS to allow requests from the frontend
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST"], // Allow GET and POST methods
    credentials: true, // Allow cookies to be sent
  },
});

function getReceiverSocketId(receiverID: string) {
  // This function retrieves the socket ID of a user based on their user ID
  return userSocketMap[receiverID]; // If the user is online, return their socket ID
}

// This map will store the mapping of user IDs to their respective socket IDs
// This allows us to send messages to specific users later if needed
const userSocketMap: { [key: string]: string } = {}; // {userId: socketId}

// Start the server
io.on("connection", (socket) => {
  // console.log("A user connected", socket.id);
  // Emit a welcome message to the newly connected user
  const userId = socket.handshake.query.userId as string; // Assuming userId is passed as a query parameter

  if (userId) userSocketMap[userId] = socket.id; // Store the socket ID for the user
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit the list of online users to all connected clients

  // Handle disconnection
  socket.on("disconnect", () => {
    // console.log("A user disconnected", socket.id); // Log the disconnection
    delete userSocketMap[userId]; // Remove the user from the userSocketMap
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit the updated list of online users
  });
});

export { app, server, io, getReceiverSocketId }; // Export the app, server, io instance, and the function to get receiver socket ID
// This allows us to use the same server instance in other parts of the application, such as in the main server file
