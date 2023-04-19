const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const websiteSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  lastChecked: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Website', websiteSchema);
