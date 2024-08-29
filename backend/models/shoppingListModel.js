const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true }
      }
    ]
  });
  
  const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);

  module.exports = ShoppingList;