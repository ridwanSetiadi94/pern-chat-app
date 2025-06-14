import express from "express"; // for creating the server
import cookieParser from "cookie-parser"; // for parsing cookies
import path from "path"; // for handling file paths
import { fileURLToPath } from "url"; // for converting URL to file path
import authRoutes from "./routes/auth.route.js"; // for authentication routes
import messageRoutes from "./routes/message.route.js"; // for message routes
import dotenv from "dotenv"; // for loading environment variables
import { app, server } from "./socket/socket.js";
dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 5001; // Set the port from environment variables or default to 5000
// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json
app.use("/api/auth", authRoutes); // for authentication routes
app.use("/api/messages", messageRoutes); // for message routes
// previously:
// frontend in localhost:5173
// backend in localhost:5001
// now, frontend & backend in same domain localhost:5001
const frontendPath = path.resolve(__dirname, "../../../frontend/dist");
if (process.env.NODE_ENV !== "development") {
    app.use(express.static(frontendPath));
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`); // for testing
});
//# sourceMappingURL=index.js.map