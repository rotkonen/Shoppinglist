const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;