const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const User = require("./models/userModel");
const Item = require("./models/itemModel");
require('dotenv').config();

const authenticateJWT = require('./middleware/authenticateJWT');

const MONGODB_URI = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

const server = express();
server.use(express.json());

server.use(cors({
    origin: 'http://localhost:4200', // URL of your Angular app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Database connection
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log("Database connected");
})
.catch((error) => {
  console.error("Error connecting to database:", error);
});

//User signup
server.post(
    '/signup', 
    [
        // Validate username and password
        body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            // Check if username already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: "Username already exists" });
            }

            // Hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                username,
                passwordHash
            });

            // Save the user to the database
            await newUser.save();

            // Generate JWT
            const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ message: "User created successfully", token });
        } catch (error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                // Handle duplicate key error from MongoDB
                res.status(400).json({ message: "Username already exists" });
            } else {
                // Handle other errors
                console.error("Error signing up:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        }
});

//User login
server.post(
    '/login',
    [
        // Validate username and password
        body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            // Check if user exists
            const existingUser = await User.findOne({ username });
            if (!existingUser) {
                return res.status(400).json({ message: "Invalid username or password" });
            }

            // Compare the password with the stored hash
            const passwordMatch = await bcrypt.compare(password, existingUser.passwordHash);
            if (!passwordMatch) {
                return res.status(400).json({ message: "Invalid username or password" });
            }

            // Generate JWT
            const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });

            // If authentication is successful
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

server.get('/protected-route', authenticateJWT, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

// Get a specific item by name
server.get('/items', authenticateJWT, async (req, res) => {
    const { name } = req.query;  // Extract name from the query parameters

    if (!name) {
        return res.status(400).json({ message: "Item name is required" });
    }

    try {
        // Find the item by name
        const item = await Item.findOne({ name });

        // Check if the item exists
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
