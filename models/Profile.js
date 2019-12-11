const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
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

module.exports = Profile = mongoose.model('profile', ProfileSchema);