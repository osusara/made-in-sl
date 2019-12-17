const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  avatar: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isSeller: {
    type: Boolean,
    default: true
  }
});

const User = mongoose.model("seller", UserSchema);
module.exports = User;
