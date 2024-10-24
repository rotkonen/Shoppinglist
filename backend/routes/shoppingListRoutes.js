const express = require("express");
const { body } = require("express-validator");
const { addItem, getItems, editItem, deleteItem, updateCollectedStatus } = require("../controllers/shoppingListController");

const router = express.Router();

// Add an item
router.post(
    "/items",
    [
        body("item").trim().notEmpty().withMessage("Item name is required"),
        body("quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
    ],
    addItem
);

// Get all items for user
router.get("/items", getItems);

// Edit an item
router.put("/items/:id", editItem);

// Delete an item
router.delete("/items/:id", deleteItem);

// Route to update collected status
router.put('/items/:id/collected', updateCollectedStatus);

module.exports = router;