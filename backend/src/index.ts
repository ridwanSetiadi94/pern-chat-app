import express from "express"; // for creating the server
import cookieParser from "cookie-parser"; // for parsing cookies
import authRoutes from "./routes/auth.route.js"; // for authentication routes
import messageRoutes from "./routes/message.route.js"; // for message routes

import dotenv from "dotenv"; // for loading environment variables
dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json

app.use("/api/auth", authRoutes); // for authentication routes
app.use("/api/messages", messageRoutes); // for message routes

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000"); // for testing
});
