const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  date: {
    type: Date,
    default: Date.now()
  },
  total: {
    type: Number,
    required: true
  },
  delivered: {
    type: Boolean,
    default: false
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
      }
    }
  ]
});

module.exports = Order = mongoose.model("order", OrderSchema);
