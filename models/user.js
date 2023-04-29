const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  }
});

module.exports = mongoose.model('user', userSchema);
