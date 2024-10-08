import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import passport from "./helpers/passport.js";
import googleAuthRoutes from "./routes/googleauthRoute.js";
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
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

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

import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoutes);

import paymentRoutes from "./routes/paymentRoutes.js";
app.use('/api/v1', paymentRoutes);

import uploadRoutes from './routes/upload.js';
app.use('/api', uploadRoutes);

// Initialize Passport for Google OAuth
app.use(passport.initialize()); // No more sessions

// Google OAuth routes
app.use(googleAuthRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});