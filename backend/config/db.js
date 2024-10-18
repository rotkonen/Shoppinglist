const mongoose = require("mongoose");
require('dotenv').config();

const MONGODB_URI = process.env.DATABASE_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
};

module.exports = connectDB;