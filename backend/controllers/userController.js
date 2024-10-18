const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;

// User signup
const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ username, passwordHash });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            res.status(400).json({ message: "Username already exists" });
        } else {
            console.error("Error signing up:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

// User login
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { signup, login };