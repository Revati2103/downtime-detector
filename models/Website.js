const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['up', 'down'],
    default: 'up',
  },
  lastChecked: {
    type: Date,
    default: Date.now,
  },
});

const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;
