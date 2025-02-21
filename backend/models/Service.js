const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['restaurant', 'spa', 'laundry', 'transport', 'other']
  },
  available: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Service', serviceSchema); 