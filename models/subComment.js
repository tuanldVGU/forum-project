const mongoose = require('mongoose');

const schema = mongoose.Schema({
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'comment', default: undefined },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', default: undefined },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: undefined },
  content: { type: String, require: true }

}, {
  collection: 'subComment',
  timestamps: true,
});

module.exports = mongoose.model('subComment', schema);
