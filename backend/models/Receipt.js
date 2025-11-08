const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  name: String,
  email: String,
  total: Number,
  receiptId: String,
  timestamp: Date,
});

module.exports = mongoose.model('Receipt', receiptSchema);
