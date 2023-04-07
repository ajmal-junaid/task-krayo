const mongoose = require('mongoose');

const connection = mongoose.createConnection(process.env.MONGO_URI);
module.exports = connection;
