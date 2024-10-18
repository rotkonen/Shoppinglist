const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const shoppingListRoutes = require("./routes/shoppingListRoutes");
require("dotenv").config();

const PORT = process.env.PORT;

const server = express();
server.use(express.json());

// Enable CORS
server.use(cors({
    origin: 'http://localhost:4200', // URL of your Angular app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

connectDB();

// Routes
server.use('/', userRoutes);
server.use('/', shoppingListRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});