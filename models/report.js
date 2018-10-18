const mongoose = require('mongoose');

const schema = mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', default: undefined },
  reason: { type: String, require: true },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: undefined },
  title: { type: String, require: true }

}, {
  collection: 'report',
  timestamps: true,
});

module.exports = mongoose.model('report', schema);
