import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";


// Server initialization
const app = express();


// Allow incoming json data
app.use(express.json());
// Morgan function
app.use(morgan("dev"));


// Env file Initialization
dotenv.config({path: "config/config.env"});
const port = process.env.PORT || 9000;


/* Configuring database */
import dbConfig from "./config/dbConfig.js";
dbConfig();


// Importing Routes
import productRoutes from "./routes/productRoutes.js";
app.use("/api/products", productRoutes);

import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});