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

});

const User = connection.model('User', userSchema);
module.exports = User;