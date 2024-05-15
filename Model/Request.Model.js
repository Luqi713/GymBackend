
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports.Request = mongoose.model('Request', requestSchema);
