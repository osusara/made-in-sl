const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  products: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
      },
      image: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      qty: {
        type: Number,
        default: 1
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

module.exports = Cart = mongoose.model("cart", CartSchema);