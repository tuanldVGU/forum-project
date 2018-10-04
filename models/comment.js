const mongoose = require('mongoose');

const schema = mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', default: undefined },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: undefined },
  content: { type: String, require: true }

}, {
  collection: 'comment',
  timestamps: true,
});

module.exports = mongoose.model('comment', schema);
