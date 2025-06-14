import express from "express"; // for creating the server
import cookieParser from "cookie-parser"; // for parsing cookies
import path from "path"; // for handling file paths

import authRoutes from "./routes/auth.route.js"; // for authentication routes
import messageRoutes from "./routes/message.route.js"; // for message routes

import dotenv from "dotenv"; // for loading environment variables
import { app, server } from "./socket/socket.js";
dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5001; // Set the port from environment variables or default to 5000
const __dirname = path.resolve(); // Get the current directory path

app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json

app.use("/api/auth", authRoutes); // for authentication routes
app.use("/api/messages", messageRoutes); // for message routes

// previously:
// frontend in localhost:5173
// backend in localhost:5001
// now, frontend & backend in same domain localhost:5001
if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "frontend/dist"))); // Serve static files from the frontend build directory
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html")); // Serve the index.html file for all other routes
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`); // for testing
});
