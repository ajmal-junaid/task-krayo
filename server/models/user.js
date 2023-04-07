const mongoose = require('mongoose');
const connection = require('../utils/database');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  data: {
    type: [{
      originalname: {
        type: String,
        required: true,
      },
      mimetype: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
    }],
    default: [],
  },

});

const User = connection.model('User', userSchema);
module.exports = User;
