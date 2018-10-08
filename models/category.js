const mongoose = require('mongoose');

const schema = mongoose.Schema({
  transportType: { type: String, require: true },
  transportModel: { type: String, require: true },
  transportYear :{ type: Number, require: true },
  transportManufacture: { type: String, require: true },
}, {
  collection: 'category',
  timestamps: true,
});

module.exports = mongoose.model('category', schema);
