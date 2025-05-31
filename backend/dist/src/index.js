import express from "express"; // for creating the server
import cookieParser from "cookie-parser"; // for parsing cookies
import authRoutes from "./routes/auth.route.js"; // for authentication routes
import messageRoutes from "./routes/message.route.js"; // for message routes
import dotenv from "dotenv"; // for loading environment variables
import { app, server } from "./socket/socket.js";
dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 5001; // Set the port from environment variables or default to 5000
app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json
app.use("/api/auth", authRoutes); // for authentication routes
app.use("/api/messages", messageRoutes); // for message routes
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`); // for testing
});
//# sourceMappingURL=index.js.map