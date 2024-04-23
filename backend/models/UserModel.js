const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  method: {
    type: String,
    default: 'email',
    required: true,
  },
  language: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
    required: true,
  }},{
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);
