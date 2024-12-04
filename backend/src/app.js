import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/auth.router.js";
import eventRoutes from "./routes/event.router.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // Import path
import { fileURLToPath } from "url"; // Needed for ES module compatibility

// Load environment variables
dotenv.config({
  path: "./.env",
});

// Initialize the app
const app = express();

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, "dist")));

// Middleware
app.use(cors({
  origin: "*",
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Catch-all route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

export default app;
