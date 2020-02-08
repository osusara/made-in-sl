const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
      },
      qty: {
        type: Number,
        default: 1
      },
      date: {
        type: Date,
        default: Date.now()
      },
      isPurchased: {
        type: Boolean,
        default: false
      }
    }
  ]
});

module.exports = Cart = mongoose.model("cart", CartSchema);