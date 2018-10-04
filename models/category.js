const mongoose = require('mongoose');

const schema = mongoose.Schema({
  content: { type: String, require: true },
}, {
  collection: 'category',
  timestamps: true,
});

module.exports = mongoose.model('category', schema);
