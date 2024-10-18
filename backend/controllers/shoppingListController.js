const jwt = require("jsonwebtoken");
const ShoppingList = require("../models/shoppingListModel");

// Middleware to extract user ID from the token
const extractUserId = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return null;

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user.userId;
    } catch (err) {
        return null;
    }
};

// Add an item to the shopping list
const addItem = async (req, res) => {
    const { item, quantity } = req.body;
    const userId = extractUserId(req);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const newItem = new ShoppingList({ item, quantity, userId });
        await newItem.save();
        res.status(201).json({ message: "Item added successfully", newItem });
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all items in the shopping list for a user
const getItems = async (req, res) => {
    const userId = extractUserId(req);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const items = await ShoppingList.find({ userId });
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Edit an item in the shopping list
const editItem = async (req, res) => {
    const { id } = req.params;
    const { item, quantity } = req.body;
    const userId = extractUserId(req);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const updatedItem = await ShoppingList.findOneAndUpdate(
            { _id: id, userId },
            { item, quantity },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item updated successfully", updatedItem });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete an item from the shopping list
const deleteItem = async (req, res) => {
    const { id } = req.params;
    const userId = extractUserId(req);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const deletedItem = await ShoppingList.findOneAndDelete({ _id: id, userId });
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addItem, getItems, editItem, deleteItem };