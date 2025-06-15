import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);

const allowedOrigin =
  process.env.NODE_ENV === "development"
    ? process.env.CLIENT_URL_DEV || "http://localhost:5173"
    : process.env.CLIENT_URL_PROD || "http://your-production-domain.com";

if (!allowedOrigin) {
  console.warn("No CLIENT_URL provided in environment variables.");
}

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap: { [key: string]: string } = {}; // {userId: socketId}

function getReceiverSocketId(receiverID: string) {
  return userSocketMap[receiverID];
}

io.on("connection", (socket) => {
  const userId =
    typeof socket.handshake.query.userId === "string"
      ? socket.handshake.query.userId
      : null;

  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });

  if (process.env.NODE_ENV === "development") {
    console.log(`Socket connected: ${socket.id} (userId: ${userId})`);
  }
});

export { app, server, io, getReceiverSocketId };
