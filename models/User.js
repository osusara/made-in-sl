const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  avatar: {
    type: String,
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
  isActive: {
    type: Boolean,
    default: true
  },
  isSeller: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;