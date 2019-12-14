const mongoose = require("mongoose");

const BuyerProfileSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "buyer"
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  phone: {
    type: String
  },
  address: [
    {
      no: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      postalcode: {
        type: String,
        required: true
      },
      province: {
        type: String,
        required: true
      },
      region: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = BuyerProfile = mongoose.model('buyerProfile', BuyerProfileSchema);