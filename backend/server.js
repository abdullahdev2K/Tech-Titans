import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

// Initialize dotenv
dotenv.config({ path: "config/config.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server initialization
const app = express();

// Allow incoming json data
app.use(express.json());

// Morgan function
app.use(morgan("dev"));

// Use CORS middleware
app.use(cors());

const port = process.env.PORT || 9000;

/* Configuring database */
import dbConfig from "./config/dbConfig.js";
dbConfig();

// Importing Routes
import productRoutes from "./routes/productRoutes.js";
app.use("/api/products", productRoutes);

import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

import cartRoutes from "./routes/cartRoutes.js";
app.use("/api/cart", cartRoutes);

import uploadRoutes from './routes/upload.js';
app.use('/api', uploadRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});